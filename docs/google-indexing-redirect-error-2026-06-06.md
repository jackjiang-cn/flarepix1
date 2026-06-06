# Google Search Console — Redirect Error 排查记录
**日期：** 2026-06-06
**问题持续时间：** 约 20 小时
**最终状态：** 已修复，等待 Vercel 部署生效

---

## 问题描述

Google Search Console 显示多个页面 `Page fetch: Failed: Redirect error`，无法被索引：

| 页面 | 状态 |
|------|------|
| `https://flarepix.com/` | ✅ 已索引（无 redirect error）|
| `https://flarepix.com/blog` | ❌ Redirect error |
| `https://flarepix.com/services` | ❌ Redirect error |
| 其他页面 | ❌ Redirect error（几乎全部）|

**关键特征：** 首页无问题，所有其他页面都有 redirect error。

---

## 排查过程

### Step 1：确认问题范围
- 首页正常，其他几乎所有页面都 redirect error
- 说明不是 Cloudflare SSL "Flexible" 模式的问题（否则首页也会报错）

### Step 2：检查 next.config.ts
找到 `next.config.ts` 里有这段 HTTP→HTTPS 重定向规则：

```ts
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
      destination: "https://flarepix.com/:path*",
      permanent: true,  // 301 — Google 会永久缓存
    },
  ];
}
```

### Step 3：找到根因
`/:path*` 这个 pattern 不匹配根路径 `/`，所以：
- `https://flarepix.com/` → 不匹配 `/:path*` → 跳过 redirect → 正常
- `https://flarepix.com/blog` → 匹配 `/:path*` → 触发 HTTP→HTTPS redirect → Googlebot 遇到 redirect → "Redirect error"

**本质问题：**
Cloudflare SSL 如果是 "Flexible" 模式，会用 HTTP 连接 Vercel 源站 → Vercel 收到 `x-forwarded-proto: http` → 触发这个 redirect → Googlebot 无法跟随这个 redirect。

---

## 修复方案

**删除 `next.config.ts` 中的 HTTP→HTTPS redirect 规则**，保留 `images` 配置即可。

原因：
1. Vercel 会自动为自定义域名处理 HTTPS
2. Cloudflare 在做 SSL Termination，不需要在 Next.js 层重复做 redirect
3. 两层 redirect 会导致 ERR_TOO_MANY_REDIRECTS（已在上次修改中注释说明）

---

## 修改文件

**文件：** `next.config.ts`

**修改前（第 13-26 行）：**
```ts
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
      destination: "https://flarepix.com/:path*",
      permanent: true,
    },
  ];
},
```

**修改后：**
```ts
// 整个 async redirects() 块删除，只保留 images 配置
```

---

## Commit 信息

```
commit 3d6c703
fix: remove HTTP→HTTPS redirect causing Google indexing block

Cloudflare handles SSL termination; Vercel handles HTTPS automatically.
Having a second redirect layer triggers 'Redirect error' for Googlebot
when Cloudflare SSL mode is Flexible (HTTP origin).

Fixes Google Search Console: 'Page fetch: Failed: Redirect error' on all pages.
```

---

## 部署验证

**Commit push 时间：** 2026-06-06（当日）

**Vercel 部署状态：**
- 部署 URL：`flarepix1-ps9trenwn-jackjiang-cns-projects.vercel.app`
- 部署触发方式：GitHub push 自动触发
- deploy 前一个 commit（问题 commit）：`5297160`（fix(work): video section above photos...）
- deploy 后新 commit（修复 commit）：`3d6c703`

**验证方法：**
1. 等待 Vercel 新 deploy 变为绿色 "Ready"
2. Google Search Console → URL Inspection → 对 `/blog` 点 "Request indexing"
3. 等待 5-15 分钟，Google 重新抓取
4. 确认 `Page fetch` 变为 "Successful"（无 redirect）

---

## 待确认（明天检查）

- [ ] Vercel 新 deploy（commit `3d6c703`）是否已变为 "Ready"
- [ ] `/blog` 的 URL Inspection 是否显示 "Successful" 或 "Redirect error" 消失
- [ ] 其他页面的 redirect error 是否全部消失
- [ ] 如果仍然有 redirect error，检查 Cloudflare SSL/TLS 设置是否为 "Full" 或 "Full (strict)"（不是 "Flexible"）

---

## 预防建议

1. **不要在 next.config.ts 中添加 HTTP→HTTPS redirect** — Vercel 和 Cloudflare 已经各自处理
2. **如果 Cloudflare SSL 是 "Flexible" 模式，尽快改为 "Full"** — Flexible 模式会让 Cloudflare 用 HTTP 连接源站，容易触发此类问题
3. **下次遇到 "Redirect error" 先查 next.config.ts 的 redirect 规则** — 特别是 pattern 为 `/:path*` 的规则

---

*记录时间：2026-06-06*
*修复人：Claude Code*
*问题持续：约 20 小时（2026-06-05 → 2026-06-06）*
