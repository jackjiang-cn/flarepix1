# Google 索引 Redirect Error — 完整排查与修复记录
**日期：** 2026-06-06
**问题状态：** ✅ 已修复，已验证（2026-06-06 10:56 AM）

---

## 一句话总结

Sitemap 中的 URL 使用了裸域 `https://flarepix.com` 而非 `https://www.flarepix.com`，导致 Google 抓取时触发 Vercel 的裸域→www redirect（307），Google 无法完成索引。

**修复：Sitemap BASE URL 改为 www 版本，Google 索引恢复正常。**

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
| `f7e1571` | 修正 sitemap.ts BASE URL（flarepix.com → www.flarepix.com）+ 所有 P0+P1 SEO 修复 |
| `04709f7` | 后续 SEO 修复（FAQPage、首页 schema、robots sitemap URL） |

> ⚠️ `f7e1571` 包含了一个关键修复：`sitemap.ts` 的 BASE URL 修改在 `8efced5` 时未正确 staged，amend 后才真正提交进仓库。

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

## 验证结果（2026-06-06）

### Vercel 部署状态
- Deploy `f7e1571` 状态：**Ready**（11 min ago）
- 部署完成时间：约 10:56 AM

### Google Search Console 验证
- 检查 URL：`https://www.flarepix.com/blog`
- **结果：** ✅ `Page is indexed`
- **Video 检测：** 1 valid item detected（VideoObject schema 工作正常）
- **Redirect error：** 完全消失

### 修复时间线
```
~20h 前  问题开始（Sitemap 使用裸域 URL）
06-06 09:xx   开始排查
06-06 10:20   发现 next.config.ts redirect 问题，commit 3d6c703
06-06 10:xx   发现 sitemap BASE URL 是根本原因
06-06 10:xx   修改 sitemap.ts BASE → www（未正确 staged）
06-06 10:xx   --amend 修正 commit → f7e1571
06-06 10:xx   force push
06-06 10:56   Vercel deploy 完成
06-06 10:56   GSC 请求索引
06-06 10:56   ✅ Page is indexed — Redirect error 消失
```

### 关键教训
1. `git add` 有变更的文件后要 `git status` 确认 staged 内容
2. `--amend` 可以补救未正确 staged 的修改
3. Sitemap URL 必须使用最终主域名版本（带 www），否则触发 Vercel 裸域 redirect
4. 307 redirect Google 不合并索引权重 — 必须是 301

---

*记录时间：2026-06-06*
*修复人：Claude Code*
*问题持续：约 20+ 小时*
