# FlarePix SEO + 营销总体规划
**版本：v2 — 2026-06-05 完全重新审计**
**工具：seo-audit skill（完整 SEO 审计框架）+ 逐文件代码扫描 + 竞品对比分析**

---

## 执行摘要

### 整体健康度：3.5 / 5

| 维度 | 评分 | 说明 |
|------|------|------|
| 技术 SEO | 3/5 | Schema 基础好，但 AI Imagery 页面完全缺失 OG+schema |
| On-Page SEO | 4/5 | 大部分页面标题/meta 到位，services页面缺社交标签 |
| 内容质量 | 3.5/5 | 内容深度足够，但信任信号薄弱（无评价、无客户 Logo）|
| 竞争定位 | 3/5 | 有差异化，但首页定位语言不够聚焦 |
| 营销能力 | 2.5/5 |缺少社会证明、实时咨询入口、价格透明度 |

### 五大优先问题（立即行动）
1. **AI Imagery 页面缺 OG + schema** — 唯一没有社交标签的服务页面
2. **Services 页面缺 OpenGraph + Twitter Card** — 主服务页面社交分享无预览
3. **Sitemap 缺少 /about** — About 是 E-E-A-T 核心页面，必须在 sitemap 里
4. **Footer Privacy 链接 404** — `/privacy` →实际路径 `/privacy-policy`
5. **Blog posts 缺少 dateModified + logo URL 错误** — 影响 Article schema 验证

---

## 一、技术 SEO 完整问题清单

### 🔴 P0 —立即修复（阻塞索引/分享）

**P0-1：/services/ai-imagery — 完全缺少 OpenGraph + Twitter Card + 所有 Schema**

| 属性 | 当前状态 |
|------|---------|
| title | ✅ 有 |
| description | ✅ 有 |
| OpenGraph | ❌ 无 |
| Twitter Card | ❌ 无 |
| JSON-LD Schema | ❌ 无 |

- **对比：** `/services/ai-video` 有 VideoObject + HowTo；`/services/brand-film` 有 VideoObject + HowTo；`/services/ai-imagery` 完全空白
- **后果：** 社交分享无预览图；Google 无法理解页面内容类型
- **文件：** `src/app/services/ai-imagery/page.tsx`

**P0-2：/services — 缺少 OpenGraph + Twitter Card**

- **当前状态：** 只有 `title` + `description`，无 OG，无 Twitter Card
- **影响：** 主服务页面在 Facebook/Twitter/LinkedIn 分享时无预览图
- **文件：** `src/app/services/page.tsx`

**P0-3：Sitemap 缺少 /about**

- sitemap.ts 的 `staticPages` 有 13 个页面，但遗漏 `/about`
- About 页面含 Organization schema，是 E-E-A-T 核心信号，必须被 Google 发现
- **文件：** `src/app/sitemap.ts`

**P0-4：Footer Privacy 链接 404**

- Footer 指向 `/privacy`，实际路径 `/privacy-policy`
- **文件：** `src/components/footer.tsx`

---

### 🟡 P1 — 本周修复

**P1-1：Blog listing缺少 Twitter Card**

- `/blog` 有 OpenGraph，无 Twitter Card
- **文件：** `src/app/blog/page.tsx`

**P1-2：/privacy-policy 和 /terms 缺少 Twitter Card**

- 两个页面有 OpenGraph，无 Twitter Card
- **文件：** `src/app/privacy-policy/page.tsx`、`src/app/terms/page.tsx`

**P1-3：Blog Article — publisher logo URL 错误 + 缺 dateModified**

- `blog/[slug]/page.tsx` 中 logo指向 `https://flarepix.com/logo/flarepix-logo-800.png`（文件不存在）
- 正确 CDN路径：`https://media.flarepix.com/logo/flarepix-logo-800.png`
- 缺少 `dateModified` 字段

**P1-4：/work 页面无任何 Schema**

- 作品集页面完全没有 JSON-LD
- 建议加 `CreativeWork` schema 或 `ItemList`

**P1-5：About — Organization schema 缺 telephone**

- About 页面 `contact.ts` 有电话 `+86-156-6682-0406`，但 schema 里没有 `telephone` 字段
-页面 UI也没有展示电话

---

### 🟢 P2 — 下一阶段优化

**P2-1：各 Service 页加 FAQPage schema**
- 目前只有 `/faq` 有 FAQPage schema
- 在 `/services/ai-imagery`、`/services/ai-video`、`/services/brand-film` 底部加 FAQ block + FAQPage schema → 触发 Google 富摘要

**P2-2：Pricing 页面加 priceRange**
- 当前只有 `WebPage` schema，语义化价格范围能帮助用户判断价格层级

**P2-3：Contact schema 补全**
- 补充 `PostalAddress`、`telephone`、`areaServed`

**P2-4：AI Tools 页面加 Schema**
- 当前 `/ai-tools` 无任何 JSON-LD
- 建议加 `Service` schema 或 `WebPage` schema

**P2-5：Services 页面加 breadcrumbList**
- `/services` 有 `Service` schema，但缺少 `BreadcrumbList`（其他主页面都有）

---

## 二、关键词策略（基于竞品对比）

### 竞品关键词占位分析

| 关键词 | ProductVideoStudio | Filma | Vidico | Hi-Light | Neverframe | FlarePix | 机会 |
|--------|-------------------|-------|--------|----------|------------|----------|------|
| `amazon product video production` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | **最大机会** |
| `amazon product video` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 大 |
| `ai product video amazon` | ❌ | ❌ | ❌ | ✅ | ❌ |❌ | 中 |
| `product photography amazon` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 中 |
| `brand film ecommerce` | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | 中 |
| `ai imagery ecommerce` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **空白** |
| `amazon listing video` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **空白** |
| `product video studio` | ❌ | ✅ | ✅ | ❌ |❌ | ❌ | 小 |

### FlarePix 关键词落地页矩阵

| 目标关键词 | 落地页 | 当前 Title 是否包含关键词 | 建议 Title |
|-----------|--------|-------------------------|------------|
| `amazon product video production` | /services/ai-video | ⚠️ 部分 | "Amazon Product Video Production — AI + Real Footage \| FlarePix" |
| `product video for amazon listing` | /services/ai-video | ❌ 否 | "AI Product Video for Amazon Listings \| FlarePix" |
| `ai product video amazon` | /services/ai-video |⚠️ 部分 | "AI Product Video for Amazon — Professional Team, Not a Tool \| FlarePix" |
| `amazon product photography` | /services |❌ 否 | "Amazon Product Photography Studio \| FlarePix" |
| `ai imagery for ecommerce` | /services/ai-imagery | ❌ 否 | "AI Product Imagery for Ecommerce — FlarePix" |
| `brand film ecommerce` | /services/brand-film | ⚠️ 部分 | "Brand Film for Ecommerce — Hybrid Production \| FlarePix" |

### 内容缺口的关键词机会

以下关键词在竞品中**无人占位**，FlarePix 可优先写博客文章占位：

1. **`amazon product video production`** — 竞品 ProductVideoStudio 有但不在 Title 里，可超车
2. **`ai product video workflow`** — 教育型内容，适合博客，可建立专业权威
3. **`hybrid product photography studio`** — 差异化词，直接打 FlarePix 定位
4. **`amazon listing video cost`** — 信息型，可触发"People also ask"

---

## 三、On-Page SEO 问题清单（逐页审查）

### 16 个页面完整审查结果

| 页面 | Title | Description | OG | Twitter | Schema | H1 关键词 |
|------|-------|-------------|-----|---------|--------|---------|
| `/` 首页 | ✅ 50-60字 | ✅ 150字 | ✅ | ✅ | ❌ 无 | ❌ 无"amazon" |
| `/services` | ✅ | ✅ | ❌ | ❌ | ✅ Service+List | ❌ 无"amazon" |
| `/services/ai-imagery` | ✅ | ✅ | ❌ | ❌ | ❌ 无 | ❌ 无"amazon" |
| `/services/ai-video` | ✅ | ✅ | ✅ | ✅ | ✅ VideoObject+HowTo | ⚠️ 部分 |
| `/services/brand-film` | ✅ | ✅ | ✅ | ✅ | ✅ VideoObject+HowTo | ⚠️ 部分 |
| `/services/[category]` | ✅ | ✅ | ✅ | ✅ | ✅ Breadcrumb+Video | ✅ |
| `/work` | ✅ | ✅ | ❌ | ❌ | ❌ 无 | ❌ |
| `/about` | ✅ | ✅ | ✅ | ✅ | ✅ Org+ Breadcrumb | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | ⚠️ 缺电话 | ✅ |
| `/pricing` | ✅ | ✅ | ✅ | ✅ | ⚠️ 缺priceRange | ✅ |
| `/faq` | ✅ | ✅ | ✅ | ✅ | ✅ FAQPage | ✅ |
| `/blog` | ✅ | ✅ | ✅ | ❌ | ✅ Blog | ✅ |
| `/blog/[slug]` | ✅ | ✅ | ✅ | ❌ | ⚠️ logo错+无dateModified | ✅ |
| `/ai-tools` | ✅ | ✅ | ✅ | ✅ | ❌ 无 | ❌ 无"amazon" |
| `/privacy-policy` | ✅ | ✅ | ✅ | ❌ | ✅ WebPage | ✅ |
| `/terms` | ✅ | ✅ | ✅ | ❌ | ✅ WebPage | ✅ |

---

## 四、竞争定位核心发现

### 市场定位空白（最大机会）

**当前市场无人同时做到：**
- ✅ 实拍能力（ProductVideoStudio、Filma、Vidico、Neverframe、C&I 有）
- ✅ AI能力（Hi-Light、Neverframe 有，但 Hi-Light 无实拍）
- ✅ 专攻亚马逊卖家（ProductVideoStudio 部分做到）

**结论：** "实拍 + AI + 专攻亚马逊" = 中间地带无人占据

### USP 语言建议（对标竞品弱点）

| USP | 对标竞品弱点 |
|-----|-------------|
| "Professional team, not a self-serve tool" | Hi-Light 的纯 AI 自助工具 |
| "Real footage + AI post-production" | Hi-Light 无实拍；ProductVideoStudio 无 AI |
| "Based in Qingdao — world's manufacturing hub" | 西方竞品做不到的中国供应链优势 |
| "For Amazon sellers who source from China" | 最精准的差异化定位语言 |

### 定价透明化机会

| 竞品 | 定价策略 |
|------|---------|
| ProductVideoStudio | 咨询报价（不透明）|
| Filma | 咨询报价 |
| Vidico | 部分透明（vidi.so 子品牌：$24/张）|
| Hi-Light | 咨询报价 |
| Neverframe | 高端定制 |
| **FlarePix 机会** | 加"Starting from $XX" — 唯一透明定价的竞品 |

---

## 五、SEO 工作计划（按优先级）

### 第一周：P0 修复 + 基础设施

```
Day 1-2：
├── 1. src/app/services/ai-imagery/page.tsx — 补 OG + Twitter + WebPage/Service schema
├── 2. src/app/services/page.tsx — 补 OG + Twitter Card
└── 3. src/app/sitemap.ts — 加入 /about 条目

Day 3：
├── 4. src/components/footer.tsx — /privacy → /privacy-policy
└── 5. src/app/blog/page.tsx — 加 Twitter Card

Day 4-5：
├── 6. src/app/blog/[slug]/page.tsx — 修正 logo URL + 加 dateModified
├── 7. src/app/work/page.tsx — 加 CreativeWork schema
└── 8. src/app/about/page.tsx — schema补 telephone + 页面展示电话

Day 6-7：
├── npm run build 验证
└── Google Rich Results Test 验证所有页面
```

### 第二周：内容 +关键词优化

```
Day 8-9：AI Video 页面 Title/meta 重写
├──目标词：amazon product video production, ai product video amazon
└── 新 Title："AI Product Video for Amazon — Professional Team, Not a Tool | FlarePix"

Day 10-11：AI Imagery 页面 Title/meta 重写
├── 目标词：ai product imagery, ai imagery ecommerce
└── 新 Title："AI Product Imagery for Amazon — Lifestyle Scenes & On-Model | FlarePix"

Day 12-13：Brand Film 页面 Title/meta 重写
├── 目标词：brand film ecommerce, amazon brand film
└── 新 Title："Brand Film for Ecommerce — Real Footage + AI Production | FlarePix"

Day 14：首页 Title/meta 重写
├── 目标词：amazon product photography, amazon product video
└── 新 Title："FlarePix — Amazon Product Photography & Video Studio | FlarePix"
```

### 第三周：Schema 扩充 + 富摘要

```
Day 15-16：AI Imagery 加 FAQPage schema（触发富摘要）
Day 17-18：Services 页面加 BreadcrumbList schema
Day 19-20：Pricing 加 priceRange + Offer schema
Day 21：AI Tools 加 WebPage/Service schema
```

### 第四周：技术 SEO + 监控建立

```
Day 22-23：next/image 完整审计（所有页面 LCP优化）
Day 24-25：Google Search Console 提交 sitemap，检测覆盖率
Day 26-27：PageSpeed Insights 审计（移动端）
Day 28-30：博客文章 × 2（覆盖关键词空白）
```

---

## 六、营销工作计划

### 当前最大营销缺口（按影响排序）

| 缺口 | 影响 | 解决难度 | 需要的材料 |
|------|------|----------|-----------|
| 无客户 Logo / 社会证明 | 高 | 高（需授权）| 客户 Logo |
| 无真实评价 / Testimonial | 高 | 高（需授权）| 客户评价 |
| 无价格透明度 | 高 | 低（可直接加）| 参考 vidi.so 定价 |
| 无实时咨询入口 | 中 | 低（可加 WhatsApp）| WhatsApp 号码 |
| AI Tools 页面专业感差 | 中 | 低（SVG换 Emoji）| 无需材料 |

### 营销行动时间表

**立即可做（无需素材）：**
- WhatsApp 即时咨询链接加到 Contact + About页面
- Pricing 页面加"Starting from $XX"价格提示
- AI Tools 页面：Emoji → inline SVG

**需要素材（你提供后我做）：**
- 客户 Logo 加到首页（需客户书面授权）
- 真实评价加到 About 或首页（需客户授权）
- 交付数据展示（如"已服务 XXX 个亚马逊卖家"）

**品牌内容（需要你提供真实信息）：**
- 创始人/团队介绍（About 页面）
- 真实案例故事（不使用客户名字，只说品类）

---

## 七、验证工具清单

| 验证项 | 工具 |
|--------|------|
| 所有 JSON-LD Schema | [Google Rich Results Test](https://search.google.com/test/rich-results) |
| 所有社交分享标签 | [Twitter Card Validator](https://cards.twitter.com/validator) |
| Sitemap 提交 + 覆盖率 | Google Search Console → Sitemap |
| 页面索引状态 | Google Search Console → URL Inspection |
| 页面速度（LCP/CLS/INP）| [PageSpeed Insights](https://pagespeed.web.dev/) |
| 移动端友好度 | [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) |
| 关键词排名追踪 | 暂无（建议安装 Google Search Console） |

---

*审计时间：2026-06-05*
*工具：seo-audit skill + 逐文件代码扫描 + 竞品对比分析*
*版本：v2.0 — 完全重新审计，不参考之前记录*