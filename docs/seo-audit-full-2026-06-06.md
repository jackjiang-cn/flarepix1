# FlarePix 全站 SEO + 竞品差距审计报告
**日期：** 2026-06-06
**审计范围：** 全站 16 个页面 + 6 大竞品对比
**基于：** 逐文件代码扫描（直接读取源码，非爬虫）

---

## 一、整体健康度评分

| 维度 | 评分 | 说明 |
|------|------|------|
| **技术 SEO** | 3/5 | Schema 基础好，但 AI Imagery 页面完全缺失 OG+schema；sitemap 缺少 /about |
| **On-Page SEO** | 3.5/5 | 大部分页面标题/meta 到位，但核心盈利词未落地 |
| **内容质量** | 3.5/5 | 内容深度足够，但信任信号薄弱（无客户 Logo/评价）|
| **竞品差距** | 2.5/5 | 有差异化定位，但关键词占位几乎为零 |
| **营销入口** | 2.5/5 | 无即时咨询入口、无价格暗示、无社会证明 |

---

## 二、🔴 P0 问题（阻塞索引 / 社交分享）

### P0-1：AI Imagery 页面 — 完全缺少 OpenGraph + Twitter Card + 所有 Schema
- **文件：** `src/app/services/ai-imagery/page.tsx`
- **现状：** 只有 `title` + `description`，没有任何社交标签和结构化数据
- **对比：** 同级页面 `/services/ai-video` 有 `VideoObject + HowTo`；`/services/brand-film` 有 `VideoObject + HowTo`
- **后果：** 社交分享（LinkedIn/Facebook/Twitter）无预览图；Google 无法理解页面类型
- **修复：** 添加与 `/services/ai-video` 同等规模的 metadata（OG + Twitter Card）+ `Service` 或 `WebPage` schema

### P0-2：Sitemap 缺少 /about 条目
- **文件：** `src/app/sitemap.ts`
- **现状：** `staticPages` 有 13 个页面，但遗漏 `about`
- **后果：** About 含 Organization schema，是 E-E-A-T 核心页面，Google 可能无法发现
- **修复：** 加 `{ path: "about", priority: 0.7, changeFrequency: "monthly" }`

### P0-3：Footer Privacy 链接 → 404
- **文件：** `src/components/footer.tsx` 第 138 行
- **现状：** `<Link href="/privacy">` → 实际页面是 `/privacy-policy`
- **后果：** 用户点击 Privacy → 404；Google 爬到错误路径
- **修复：** 改 `href="/privacy"` → `href="/privacy-policy"`

---

## 三、🟡 P1 问题（影响 SEO 质量 / 本周修复）

### P1-1：/services 页面 — 缺少 OpenGraph + Twitter Card
- **文件：** `src/app/services/page.tsx`
- **现状：** 有 `title` + `description` + JSON-LD，但无 OG/Twitter
- **后果：** 在 LinkedIn/Facebook 分享服务总览页无预览图

### P1-2：Blog Article Schema — publisher logo URL 错误
- **文件：** `src/app/blog/[slug]/page.tsx` 第 136 行
- **现状：** `logo.url: "https://flarepix.com/logo/flarepix-logo-800.png"` → 文件不存在
- **正确路径：** `https://media.flarepix.com/logo/flarepix-logo-800.png`
- **缺失：** `dateModified` 字段（Article schema 建议包含）

### P1-3：/about — Organization Schema 缺 telephone
- **文件：** `src/app/about/page.tsx`
- **现状：** Schema 有 `PostalAddress` + `email`，但缺 `telephone`
- **contact.ts 有电话：** `+86-156-6682-0406`，但 About 页面 UI 没有展示电话
- **后果：** 本地 SEO 信号弱；信任信号不完整

### P1-4：/contact — Organization Schema 缺完整信息
- **文件：** `src/app/contact/page.tsx`
- **现状：** 只有 `name` + `email` + `url`
- **缺失：** `telephone`、`PostalAddress`、`areaServed`

### P1-5：/work — 页面无任何 Schema
- **文件：** `src/app/work/page.tsx`
- **现状：** 作品集页面完全无 JSON-LD
- **建议：** 加 `CreativeWork` 或 `ItemList` schema

### P1-6：/privacy-policy — 缺 Twitter Card
- **文件：** `src/app/privacy-policy/page.tsx`
- **现状：** 有 OpenGraph，无 Twitter Card

### P1-7：/terms — 缺 Twitter Card
- **文件：** `src/app/terms/page.tsx`
- **现状：** 有 OpenGraph，无 Twitter Card

### P1-8：/pricing — WebPage Schema 缺 priceRange
- **文件：** `src/app/pricing/page.tsx`
- **现状：** 有 `WebPage` schema，但无价格语义化信息
- **建议：** 加 `priceRange: "$$"-"$$$$"` 语义化价格层级

---

## 四、🟢 P2 问题（下一阶段优化）

### P2-1：AI Tools 页面 — Emoji 图标违反设计规则
- **文件：** `src/app/ai-tools/page.tsx` 第 81 行
- **现状：** `div className="text-3xl">{t.icon}</div>` → 渲染 emoji `👤 🏖️ 📸 🎬`
- **规则：** 项目要求只用 inline SVG（与 footer social icons 统一风格）
- **影响：** 专业感下降，竞品 shootify.us 无此问题

### P2-2：首页 — 无 Schema
- **文件：** `src/app/page.tsx`
- **现状：** 完全没有 JSON-LD Schema
- **建议：** 加 `LocalBusiness` 或 `Organization` schema（匹配 About 的 Organization 主实体）

### P2-3：服务页 — 无 FAQPage schema
- **现状：** 只有 `/faq` 有 FAQPage schema
- **建议：** 在 `/services/ai-imagery`、`/services/ai-video`、`/services/brand-film` 底部加 FAQ block + FAQPage schema → 触发 Google 富摘要

---

## 五、关键词落地页矩阵（核心盈利词未占位）

| 目标关键词 | 当前落地页 | Title 包含关键词？ | 问题 |
|-----------|-----------|------------------|------|
| `amazon product video production` | /services/ai-video | ⚠️ 部分（"AI Product Video Production for Amazon"）| 可优化 |
| `product video for amazon listing` | /services/ai-video | ❌ 否 | Title 无此词 |
| `ai product video amazon` | /services/ai-video | ⚠️ 部分 | 可优化 |
| `amazon product photography studio` | /services | ❌ 否 | Title 是"Product Photography & Video Services" |
| `ai product imagery ecommerce` | /services/ai-imagery | ❌ 否 | Title 是"AI Product Imagery for Amazon" |
| `brand film ecommerce` | /services/brand-film | ⚠️ 部分 | Title 是"Brand Film Production for Ecommerce" |
| `amazon listing video service` | /services/ai-video | ❌ 否 | 未占位 |

**最大机会词（竞品几乎无占位）：**
- `amazon product video production` — 竞品仅 ProductVideoStudio 有，但 Title 不精准
- `product video for amazon listing` — 完全空白
- `ai product video amazon` — Hi-Light 有但标题具有误导性（"一键 AI"）
- `amazon listing video` — 完全空白

---

## 六、竞品关键词占位对比

| 关键词 | ProductVideoStudio | Filma | Vidico | Hi-Light | FlarePix | 机会 |
|--------|-------------------|-------|--------|----------|----------|------|
| `amazon product video production` | ✅ Title | ❌ | ❌ | ❌ | ❌ | **最大** |
| `product video for amazon listing` | ❌ | ❌ | ❌ | ❌ | ❌ | **最大** |
| `ai product video amazon` | ❌ | ❌ | ❌ | ✅ 误导 | ❌ | 中 |
| `brand film ecommerce` | ❌ | ✅ | ✅ | ❌ | ⚠️ 部分 | 中 |
| `amazon listing video` | ❌ | ❌ | ❌ | ❌ | ❌ | **最大** |
| `ai product imagery ecommerce` | ❌ | ❌ | ❌ | ❌ | ⚠️ 部分 | 中 |

---

## 七、E-E-A-T 信号缺口

| E-E-A-T 维度 | 当前状态 | 竞品 shootify.us 怎么做的 |
|-------------|---------|--------------------------|
| **Experience** | ✅ 制作流程说明 + 案例品类展示 | 有真实案例 |
| **Expertise** | ✅ About 页面有团队专业描述 | 有团队介绍 |
| **Authoritativeness** | ❌ 无外部引用、无行业认可 | 有 Trustpilot 4.9 |
| **Trustworthiness** | ⚠️ About 有地址但页面 UI 不展示电话 | 每页顶部显示电话 |
| **社会证明** | ❌ 无客户 Logo、无真实评价、无案例数据 | 有 Logo + 数字指标 |
| **实时咨询入口** | ❌ 无 WhatsApp、无在线聊天 | 无（但有电话）|

---

## 八、优先执行计划

### 第一优先（可直接动手）：
```
P0-1: src/app/services/ai-imagery/page.tsx — 补 OG + Twitter + Service schema
P0-2: src/app/sitemap.ts — 加入 /about 条目
P0-3: src/components/footer.tsx — /privacy → /privacy-policy
P1-1: src/app/services/page.tsx — 补 OG + Twitter Card
P1-2: src/app/blog/[slug]/page.tsx — 修正 logo URL + 加 dateModified
P1-3: src/app/about/page.tsx — Organization schema 补 telephone + 页面展示电话
P1-4: src/app/contact/page.tsx — Organization schema 补 telephone + PostalAddress
P1-5: src/app/work/page.tsx — 加 CreativeWork schema
P1-6: src/app/privacy-policy/page.tsx — 加 Twitter Card
P1-7: src/app/terms/page.tsx — 加 Twitter Card
P1-8: src/app/pricing/page.tsx — WebPage schema 加 priceRange
P2-1: src/app/ai-tools/page.tsx — Emoji → inline SVG
```

### 第二优先（关键词重写）：
```
/services/ai-video — Title 重写：包含 "amazon product video production"
/services/ai-imagery — Title 重写：包含 "ai product imagery ecommerce"
/services/brand-film — Title 重写：包含 "brand film ecommerce"
首页 — Title 重写：包含 "amazon product photography" + "amazon product video"
```

### 第三优先（需你提供素材）：
```
- 客户 Logo（需客户书面授权）→ 加到首页
- 真实评价（需客户授权）→ 加到 About 或首页
- WhatsApp 号码确认 → 加到 Contact + About
- 实际价格框架确认 → Pricing 页面加"Starting from $XX"
```

---

## 九、你没想到的事情

**1. 品牌电影关键词「amazon listing video」完全空白**
竞品没有占位这个词，但搜索量存在。这是低成本高回报的博客文章主题。

**2. AI Tools 页面 Emoji 图标影响专业感**
竞品 shootify.us 的页面图标统一用 SVG/图片，FlarePix 的 emoji 在移动端会显示异常。

**3. 首页没有 Schema — 错失 LocalBusiness 富摘要机会**
首页完全没有 JSON-LD，Google 无法理解这是一家"产品摄影+视频工作室"。

**4. 作品集页面（/work）完全无结构化数据**
这是 Google 展示"视频 + 图片"富片段的最大机会，但目前零 schema。

**5. 博客文章没有内嵌 Related Services 的 UTM 参数**
博客里的 CTA 链接到服务页，没有追踪参数，无法区分博客来的流量。

**6. 没有 404 页面检测**
没有检查全站哪些内链指向不存在页面（404 检测）。

**7. 移动端视频没有 poster 属性**
`src/app/services/ai-video/page.tsx` 第 291 行用 `<img src="...">` 而不是 Next.js 的 `<Image>` + `poster` 属性。

---

## 十、验证工具

| 验证项 | 工具 |
|--------|------|
| 所有 JSON-LD Schema | Google Rich Results Test |
| 所有社交分享标签 | Twitter Card Validator |
| Sitemap 提交 | Google Search Console → Sitemap |
| 页面索引状态 | Google Search Console → URL Inspection |
| 页面速度 | PageSpeed Insights |

---

*审计时间：2026-06-06*
*工具：逐文件代码扫描 + 竞品对比分析*
*版本：v1.0*

---

## 十一、执行进度记录

### 已完成（2026-06-06 当天）

**P0 修复（commit `8efced5` + `f7e1571`）：**
- ✅ AI Imagery：补 OG + Twitter Card + Service + BreadcrumbList schema
- ✅ Sitemap：加入 /about 条目，BASE URL 改为 www
- ✅ Footer：/privacy → /privacy-policy

**P1 修复（commit `8efced5` + `f7e1571`）：**
- ✅ Services 页面：补 OG + Twitter Card
- ✅ Blog [slug]：修正 publisher logo URL（flarepix.com → media.flarepix.com）
- ✅ About：Organization schema 补 telephone
- ✅ Contact：Organization schema 补 telephone + PostalAddress
- ✅ Work：补 OG + Twitter Card + CollectionPage schema
- ✅ Privacy-policy：补 OG + Twitter Card
- ✅ Terms：补 OG + Twitter Card
- ✅ Pricing：WebPage schema 补 priceRange

**P2 修复（commit `04709f7` + `e39cc46` + `06c0878` + `d123392` + `3aad56a` + `15b7a2d`）：**
- ✅ AI Tools：Emoji → inline SVG
- ✅ Homepage：补 Organization schema + OG image
- ✅ AI Video：FAQ 内容区 + FAQPage schema
- ✅ Brand Film：FAQ 内容区 + FAQPage schema
- ✅ AI Imagery：FAQ 内容区 + FAQPage schema
- ✅ robots.ts：sitemap URL 改为 www 版本
- ✅ 关键词 Title 重写（commit `e39cc46`）
  - AI Video：`Amazon Product Video Production — AI Video for Amazon Listings | FlarePix`
  - AI Imagery：`AI Product Imagery for Ecommerce — Lifestyle Scenes & On-Model Shots | FlarePix`
  - Brand Film：`Brand Film for Ecommerce — Cinematic Production for Amazon & Online Brands | FlarePix`
  - Homepage：`FlarePix — Amazon Product Photography, Video & AI Visuals for Ecommerce`
- ✅ 全站 `<img>` → `<Image>`（commit `06c0878` + `d123392`）
  - gallery-lightbox、brand-marquee、clickable-video-card、ai-showcase、video-carousel、portfolio-carousel
  - 作用：修复 CLS，提升 Core Web Vitals
- ✅ 博客 CTA + 相关链接加 UTM 参数（commit `3aad56a`）
  - 所有 `/contact` 和服务页链接追加 `utm_source=blog&utm_medium=...`
- ✅ Work 页面照片加点击 Lightbox + hover 放大效果（commit `15b7a2d`）
  - 新建 `PhotoGallery` 组件，替代原有静态 `<Image>` 渲染
- ✅ 全站 404 内链扫描：无死链

**索引修复（commit `f7e1571`，Vercel deploy 后验证）：**
- ✅ `https://www.flarepix.com/blog` — Page fetch 从 "Redirect error" → "Page is indexed"
- ✅ Video schema 被 Google 识别（1 valid video item）

**新建文件：**
- `src/components/service-faq.tsx` — 可复用的 FAQ 手风琴组件
- `src/components/photo-gallery.tsx` — Work 页面照片点击+hover 组件
- `docs/google-indexing-redirect-error-resolution-2026-06-06.md` — 索引问题完整排查记录

### 待完成

**内容营销（需提供素材）：**
- [ ] 4 篇博客文章（审计报告 Section 九、Part 1）
  - "Why AI-Generated Product Videos Can't Be Fully Automated"
  - "How We Shot a Real Amazon Product Video: Behind the Scenes"
  - "Amazon Product Video Requirements: What Every Seller Needs to Know"
  - "10 Questions to Ask Before Hiring a Product Video Studio"

**GSC 持续验证（用户自行操作）：**
- [ ] 各服务页（/services、/services/ai-video 等）Request Indexing 后验证 Page fetch 状态

---

## 十二、技术知识点（本次修复）

### Sitemap BASE URL 与 Google 索引的关系
- Sitemap 中的 URL 必须使用**最终希望 Google 索引的主域名版本**
- 如果 Vercel 配置了裸域→www redirect，sitemap 应使用 www 版本，避免 Google 抓取时遇到 redirect
- 307 临时 redirect：Google 不合并权重，不更新索引
- 301 永久 redirect：Google 合并权重，更新索引

### 为什么首页没有 Redirect error？
- `next.config.ts` 中 `/:path*` 这个 pattern **不匹配根路径 `/`**
- `https://flarepix.com/` → 不匹配 `/:path*` → 不 redirect → Google 正常抓取
- `https://flarepix.com/blog` → 匹配 `/:path*` → 触发 redirect → Google 报错

### next/image 的 OG image 要求
- 所有页面的 `openGraph.images` 应包含 `width`、`height`、`alt` 字段
- `og-image.jpg` 应存在于 `/public/` 目录（CDN 路径 `/og-image.jpg` 会解析为 `https://flarepix.com/og-image.jpg`）

### CLS 修复原理
- `<img>` 无尺寸，浏览器下载完才知道多大，图片加载时页面跳动
- `<Image>` 要求声明尺寸（width/height/fill），浏览器提前留空间，加载时页面不跳动
- CLS < 0.1 是 Google Core Web Vitals 指标，影响 SEO 排名
