# Google 索引 Redirect Error — 完整排查与修复记录
**日期：** 2026-06-06
**问题状态：** 已修复，等待 Vercel 部署验证

---

## 问题概述

Google Search Console 显示多个页面 `Page fetch: Failed: Redirect error`，无法被索引：

| 页面 | 状态 |
|------|------|
| `https://flarepix.com/` | ✅ 已索引（无 redirect error）|
| `https://flarepix.com/blog` | ❌ Redirect error |
| `https://flarepix.com/services` | ❌ Redirect error |
| 其他所有页面 | ❌ Redirect error（几乎全部）|

**持续时间：** 约 20+ 小时（2026-06-05 → 2026-06-06）

---

## 排查过程（按时间顺序）

### 第一天（2026-06-05）：初步发现
- 发现 Google Search Console 多个页面报 "Redirect error"
- 当时未深入排查，未形成文字记录

### 第二天上午（2026-06-06）

#### Step 1：确认问题范围
- 首页正常，其他几乎所有页面 redirect error
- 首页 URL 是 `/`（根路径），不匹配 `/:path*` pattern，所以跳过了 redirect
- 其他所有页面都匹配 `/:path*`，触发 redirect

#### Step 2：检查 next.config.ts
找到 `next.config.ts` 里有 HTTP→HTTPS redirect 规则：
```ts
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
      destination: "https://flarepix.com/:path*",
      permanent: true,  // 301
    },
  ];
}
```

**问题：** `/:path*` 不匹配 `/`，所以首页正常。但其他页面都匹配。

#### Step 3：修复方案
**删除 next.config.ts 中的 HTTP→HTTPS redirect 规则**，因为：
1. Vercel 自动处理 HTTPS
2. Cloudflare 在做 SSL Termination（已确认 SSL 模式为 "Full"）
3. 两层 redirect 导致 Googlebot 无法正确跟随

**修改文件：** `next.config.ts`
- 删除整个 `async redirects()` 块
- 保留 `images` 配置

#### Step 4：commit 并 push
```
commit 3d6c703
fix: remove HTTP→HTTPS redirect causing Google indexing block
```

#### Step 5：新问题出现
push 后 Vercel 部署的是旧 commit `5297160`，不是新 commit `3d6c703`。

等待 Vercel 自动触发新 deploy。

---

### 第二天中午：发现更根本的问题

新 deploy 完成后（commit `3d6c703`），Google Search Console 仍然报 redirect error，但现象变了：

- 首页索引成功 ✅
- 其他页面仍然 redirect error ❌
- **关键发现：** 所有 redirect error 的页面都是通过 sitemap 提交的 URL

**再次排查发现：**
sitemap.xml 里的所有 URL 都是 `https://flarepix.com/...`（裸域），而不是 `https://www.flarepix.com/...`。

Vercel 配置了**裸域 → www 的 redirect（307 Temporary Redirect）**：
```
flarepix.com/* → www.flarepix.com/* (307 Temporary Redirect)
```

Google 抓取 sitemap 中的 URL 时：
1. 请求 `https://flarepix.com/blog`
2. 遇到 307 临时重定向到 `https://www.flarepix.com/blog`
3. Googlebot **不合并** 307 临时重定向的索引权重 → 报 Redirect error

**首页 `/` 为什么正常？**
首页 sitemap URL 是 `https://flarepix.com`（裸域根路径），但 Google 可能直接抓根域名而不是通过 sitemap，且根路径的 redirect 行为不同。

---

## 修复方案

### 方案：修改 sitemap.ts base URL

**文件：** `src/app/sitemap.ts`

**修改前：**
```ts
const BASE = "https://flarepix.com";
```

**修改后：**
```ts
const BASE = "https://www.flarepix.com";
```

所有 sitemap URL 改为 www 版本，Google 抓取时不再触发裸域 redirect。

---

## 同时处理：Vercel 裸域 redirect 类型

Vercel Dashboard → Domains 设置中：
- `flarepix.com` → `www.flarepix.com`
- 原来是 **307 Temporary Redirect**
- 手动改为 **301 Moved Permanently**（用户自行操作）

---

## 提交记录

| Commit | 内容 |
|--------|------|
| `3d6c703` | 删除 next.config.ts 中的 HTTP→HTTPS redirect 规则 |
| `8efced5` | P0+P1 SEO 修复（OG/Twitter/schema）+ sitemap base URL 改为 www |

---

## 验证步骤（待 Vercel 部署后执行）

1. 确认 Vercel 新 deploy（commit `8efced5`）状态为 "Ready"
2. Google Search Console → 输入 `https://www.flarepix.com/blog`
3. 点 **"Request indexing"**
4. 等 5-15 分钟
5. 确认 `Page fetch` 变为 "Successful"（无 redirect）

**验证所有受影响页面：**
- `https://www.flarepix.com/services`
- `https://www.flarepix.com/work`
- `https://www.flarepix.com/about`
- `https://www.flarepix.com/contact`
- 等等

---

## 技术知识点

### 为什么首页不触发 redirect error？
`/:path*` 这个 pattern 不匹配根路径 `/`：
- `https://flarepix.com/` → 不匹配 `/:path*` → 不 redirect → Google 正常抓取
- `https://flarepix.com/blog` → 匹配 `/:path*` → 触发 redirect → Google 报错

### 307 vs 301 的区别
- **307 Temporary Redirect**：Google 不会合并权重，不会更新索引
- **301 Permanent Redirect**：Google 合并权重，更新索引

即使 redirect 最终返回 200，Google 对 307 的处理也不如 301 友好。

### Sitemap URL 应使用哪个域名？
Sitemap 中的所有 URL 应该使用**你希望 Google 索引的主域名版本**。

如果 Vercel 配置了裸域→www redirect，sitemap 应该使用 www 版本，避免 Google 抓取时遇到 redirect。

---

## 待验证清单（明天）

- [ ] Vercel deploy `8efced5` 状态为 "Ready"
- [ ] `https://www.flarepix.com/blog` URL Inspection 显示 "Successful"
- [ ] 其他页面 redirect error 全部消失
- [ ] 如果仍有问题，检查 Cloudflare 是否有额外的 redirect 规则

---

*记录时间：2026-06-06*
*修复人：Claude Code*
*问题持续：约 20+ 小时*
