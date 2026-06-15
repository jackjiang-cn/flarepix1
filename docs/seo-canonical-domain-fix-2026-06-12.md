# SEO Canonical 域名对齐修复全记录

**日期：** 2026-06-07 ~ 2026-06-12
**核心问题：** Google 选择的 canonical 域名与代码声明的 canonical 不一致，导致页面不被收录

---

## 一、事件时间线

| 日期 | 操作 | 修改内容 | 原因 |
|------|------|---------|------|
| 6月6日 | Google 开始索引 | — | 收到 Google 通知 |
| 6月7日 | 第一次修复 | Sitemap 改为非www (`flarepix.com`) | 当时代码 canonical 是非www，试图对齐 |
| 6月9日 | Google 第一次抓取 | — | 发现 Google 选择 **www** 作为 canonical |
| 6月11日 | 第二次修复 | Sitemap + robots + layout.tsx 改为 www | 跟 Google 保持一致 |
| 6月11日 | 发现问题 | Vercel 重定向删了但还在跳转 | 排查了 Cloudflare DNS、Page Rules、WAF |
| 6月11日 | 尝试方案A | DNS 改为 A record 直连 | 失败 — Vercel 不支持 A record 方式停用 www 跳转 |
| 6月11日 | 恢复并采用方案B | DNS 改回 CNAME，代码全部改为 www | 接受 www 版本 |
| 6月12日 | 发现漏改 | 16个 page.tsx 的 canonical 还是非www | 上次只改了 layout.tsx，页面级 canonical 覆盖了 layout |
| 6月12日 | 最终修复 | 所有 page.tsx、schema、OG URL 统一为 www | batch sed 替换 |

---

## 二、根本原因

### 直接原因

1. **Vercel 默认行为**：`flarepix.com` CNAME 到 `cname.vercel-dns.com` 时，Vercel 自动将非www重定向到 www（307 Temporary Redirect）
2. **代码 canonical 与 Google 选择不一致**：代码声明非www，但 Google 通过重定向链看到了 www 版本，选择了 www

### 深层原因

1. **站点创建时未明确选择 www vs 非www**，导致 Vercel 用了默认的 www 重定向
2. **代码 canonical 改了多个层面**，但只改了 layout.tsx，遗漏了每个 page.tsx 里的独立 canonical — Next.js 页面级 metadata 会覆盖 layout 级
3. **根域名重定向无法在 Vercel 面板关闭** — 这是 Vercel CNAME 模式的内置行为

---

## 三、涉及文件

### 第一次修复（6月7日）
| 文件 | 修改 |
|------|------|
| `src/app/sitemap.ts` | `BASE = "https://flarepix.com"` |
| `src/app/robots.ts` | `sitemap: "https://flarepix.com/..."` |

### 第二次修复（6月11日）
| 文件 | 修改 |
|------|------|
| `src/app/sitemap.ts` | `BASE = "https://www.flarepix.com"` |
| `src/app/robots.ts` | `sitemap: "https://www.flarepix.com/..."` |
| `src/app/layout.tsx` | `metadataBase`、`canonical`、`og:url`、`Organization.url` → www |

### 最终修复（6月12日）
| 文件 | 涉及的URL类型 |
|------|-------------|
| `src/app/page.tsx` | canonical, og:url, Organization.url |
| `src/app/about/page.tsx` | canonical, og:url, breadcrumb |
| `src/app/faq/page.tsx` | canonical, og:url |
| `src/app/blog/page.tsx` | canonical, og:url |
| `src/app/blog/[slug]/page.tsx` | canonical, breadcrumb |
| `src/app/contact/page.tsx` | canonical, og:url |
| `src/app/pricing/page.tsx` | canonical, og:url |
| `src/app/terms/page.tsx` | canonical, og:url |
| `src/app/privacy-policy/page.tsx` | canonical, og:url |
| `src/app/work/page.tsx` | canonical, og:url |
| `src/app/ai-tools/page.tsx` | canonical, og:url |
| `src/app/services/page.tsx` | canonical, og:url, breadcrumb |
| `src/app/services/[category]/page.tsx` | canonical, og:url, breadcrumb |
| `src/app/services/ai-imagery/page.tsx` | canonical, og:url, breadcrumb |
| `src/app/services/ai-video/page.tsx` | canonical, og:url |
| `src/app/services/brand-film/page.tsx` | canonical, og:url |

**共 16 个 page.tsx 文件**（加上 layout.tsx 共 17 个）

---

## 四、关键技术教训

### 教训 1：Next.js metadata 覆盖层级
```
page.tsx metadata > layout.tsx metadata
```
如果 page.tsx 里声明了 `alternates: { canonical: "..." }`，会**完全覆盖** layout.tsx 里的 canonical。修改 layout 不会生效。

### 教训 2：Vercel + CNAME = 不可关闭的 www 重定向
- Vercel 对 CNAME 接入的域名会**自动做非www→www重定向**
- 用 A record 直连虽然可以避开，但 Vercel 不保证 A record IP 不变
- 解决方案：接受 www 版本，代码全部对齐 www

### 教训 3：批量修改检查清单
```
修改 canonical 时，必须同时改：
  ☐ src/app/sitemap.ts        — sitemap URL base
  ☐ src/app/robots.ts         — sitemap 引用
  ☐ src/app/layout.tsx        — metadataBase + canonical
  ☐ 每个 page.tsx             — 页面级 canonical + og:url
  ☐ 每个 layout.tsx (子路由)  — 页面级 layout canonical
  ☐ Schema JSON-LD 中的所有 url 字段
  ☐ BreadcrumbList 中的 item URL
```

### 教训 4：不要过早信任自己的修复
- 6月7日修了 sitemap，以为解决了，但没去 Search Console 看 Google 选的是哪个域名
- **发布修复后，必须去 Search Console URL Inspection 验证 Google 视角的状态**

---

## 五、防止再犯的规则

### 规则 1：新站创建时明确 www 决策
> 创建新站点时，在第一行代码写之前决定用 www 还是非www。Vercel 默认 www。

### 规则 2：修改 canonical 时执行 check-list
> 上面的教训 3 清单必须逐项打勾，不允许跳过

### 规则 3：修复后 24 小时内在 Search Console 验证
> 任何 SEO 修改后，24 小时内去 Search Console → URL Inspection 查看 Google 视角的结果

### 规则 4：用 grep 验证不留遗漏
```bash
# 修改完后运行这个确认全部替换
grep -rn "https://flarepix.com" src/app/ | grep -v "www.flarepix.com"
```
> 应该有零输出（或只有显示文本，不是 href/canonical/og:url）

---

## 六、最终状态

| 检查项 | 状态 |
|--------|------|
| Sitemap 域名 | www.flarepix.com ✅ |
| 所有页面 canonical | www.flarepix.com ✅ |
| robots.txt sitemap 引用 | www.flarepix.com ✅ |
| Schema JSON-LD URL | www.flarepix.com ✅ |
| OG/Twitter URL | www.flarepix.com ✅ |
| BreadcrumbList URL | www.flarepix.com ✅ |
| Google 选择的 canonical | www.flarepix.com ✅ |
| 三方一致 | ✅ |

---

*记录日期：2026-06-12*
