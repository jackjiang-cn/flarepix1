# FlarePix 全站 SEO + 营销审计报告

**审计日期：** 2026-06-05
**审计范围：** 全站所有页面（16个页面）
**参考技能：** seo-audit（完整 SEO 审计框架）
**分析工具：** 逐文件代码扫描 + 静态分析

---

## 一、技术 SEO 问题（优先级排序）

### 🔴 P0 — 必须立即修复

**P0-1：/services/ai-imagery 缺少 OpenGraph + Twitter Card + 所有 Schema**

- **影响页面：** `/services/ai-imagery`
- **问题：** 页面只有 `title` 和 `description`，没有任何社交分享标签（OpenGraph / Twitter Card），也没有任何结构化数据（JSON-LD Schema）
- **对比：** 同级别的 `/services/ai-video` 有 `VideoObject + HowTo` schema，`/services/brand-film` 有 `VideoObject + HowTo` schema
- **后果：** Google 无法理解这个页面的内容类型；社交分享时无预览图；竞品页面信息更完整则优先被索引
- **修复方案：** 添加与 `/services/ai-video` 同等规模的 metadata（OG + Twitter Card）+ `WebPage` 或 `Service` schema

**P0-2：Sitemap 缺少 /about 页面**

- **影响页面：** `/about`
- **问题：** `src/app/sitemap.ts` 的 `staticPages` 数组包含 13 个页面，但遗漏了 `/about`
- **后果：** Google 可能无法发现并索引 About 页面 — About 页面包含完整的 Organization schema，是 E-E-A-T 信号的核心页面
- **修复方案：** 在 `staticPages` 中添加：
  ```ts
  { path: "about", priority: 0.7, changeFrequency: "monthly" }
  ```

**P0-3：Footer 隐私链接路径错误**

- **影响页面：** 全站所有页面 Footer
- **问题：** `footer.tsx` 中的 Privacy 链接指向 `/privacy`，实际页面路径是 `/privacy-policy`，Terms 链接指向 `/terms`（正确）
- **后果：** 用户点击 Privacy → 404 页面，影响信任和 SEO（Google 爬到 404）
- **修复方案：** 将 `href="/privacy"` 改为 `href="/privacy-policy"`

---

### 🟡 P1 — 重要修复

**P1-1：Blog listing 缺少 Twitter Card**

- **影响页面：** `/blog`
- **问题：** Blog listing 页面有 OpenGraph（`og:title` 等）但缺少 `twitter:card`
- **后果：** 博客文章在 Twitter 分享时无法生成卡片预览，影响社交引流量
- **修复方案：** 在 `twitter` metadata 中添加 `card: "summary_large_image"` 和 `images`

**P1-2：Blog Article schema — publisher logo URL 错误**

- **影响页面：** `/blog/[slug]`
- **文件：** `src/app/blog/[slug]/page.tsx`
- **问题：** Article schema 中的 publisher logo URL 指向 `https://flarepix.com/logo/flarepix-logo-800.png`，但 `public/logo/` 目录在 git 中不存在（所有媒体在 R2 上）
- **后果：** Google Rich Results Test 会报告 logo URL 失效，影响 Article schema 验证
- **修复方案：** 改为正确的 CDN URL：`https://media.flarepix.com/logo/flarepix-logo-800.png`
- **补充：** 同时缺少 `dateModified` 字段（Article schema 建议包含）

**P1-3：/work 页面无结构化数据**

- **影响页面：** `/work`
- **问题：** 作品集页面完全没有任何 JSON-LD Schema
- **建议：** 添加 `CreativeWork` schema 或 `ItemList` schema（包含所有作品列表），帮助 Google 理解这是作品展示页面

**P1-4：About页面 Organization schema 不完整**

- **影响页面：** `/about`
- **问题：** Organization schema 有 `PostalAddress` 和 `contactPoint`（email），但：
  1. 缺少电话号码（`contact.ts` 中有 `+86-156-6682-0406`）
  2. 缺少 `telephone` 字段
  3. About 页面本身没有展示电话，竞品 shootify.us 每个页面都显示电话
- **后果：** 本地 SEO 信号弱；信任信号不完整
- **修复方案：** 在 Organization schema 中加入 `telephone`；在 About 页面 UI 中展示电话

---

### 🟢 P2 — 优化项

**P2-1：Blog Article 缺少 dateModified**

- **文件：** `src/app/blog/[slug]/page.tsx`
- **问题：** Article schema 有 `datePublished` 但缺少 `dateModified`
- **后果：** Google 无法判断内容是否更新过，影响内容新鲜度信号

**P2-2：各 Service 页无 FAQPage schema**

- **影响页面：** `/services/ai-imagery`、`/services/[category]` 等
- **现状：** 只有 `/faq` 有 FAQPage schema
- **建议：** 在各 Service 页面底部添加 FAQ block + FAQPage schema，可触发 Google 富摘要（FAQ Rich Results），增加搜索结果展示面积

**P2-3：Pricing 页面无价格相关 Schema**

- **影响页面：** `/pricing`
- **问题：** 页面使用 "How We Quote" 概念，无 `priceRange` 或 `Offer` schema
- **建议：** 添加 `priceRange: "$$"-"$$$$"`（语义化价格范围）到 WebPage schema，帮助用户判断价格层级

**P2-4：Contact schema 过简**

- **影响页面：** `/contact`
- **现状：** 只有 `ContactPage + Organization`（name + email）
- **建议：** 补充 `PostalAddress`（完整地址）、`telephone`、`areaServed`

**P2-5：AI Tools 页面使用 Emoji 做图标**

- **影响页面：** `/ai-tools`
- **文件：** `src/app/ai-tools/page.tsx`
- **问题：** 工具卡片使用 `emoji` 图标（👤 🏖️ 📸 🎬），违反项目设计规则"只用 inline SVG"
- **建议：** 替换为 inline SVG 图标（与 footer/social icons风格统一）

---

## 二、营销能力缺口分析

### 竞品对比：FlarePix vs shootify.us

| 维度 | FlarePix | shootify.us | 差距 |
|------|----------|-------------|------|
| 实体信任信号（地址+电话）| About 页有文字，无 schema，电话未展示 | 顶部公告栏 + 每个页面显示 | **落后** |
| 客户 Logo 展示 | 无 | 有 | **落后** |
| 案例数据（数字指标）| 无 | 有（多处出现）| **落后** |
| AI 能力 | ✅ 完整 | ❌ 无 | **领先** |
| FAQ Schema | ✅ 有 | 部分 | **领先** |
| 博客 | ✅ 有（4篇）| ❌ 无 | **领先** |
| Schema 完整性 | ⚠️ 部分页面缺失 | ⚠️ 基本完整 | 相当 |
| 社交分享标签 | ⚠️1个页面缺失 | 基本完整 | 需改进 |

### 具体营销缺口

**1. 首页无社会证明区块**
- 首页没有客户 Logo，没有真实评价，没有数据化的案例成果
- B2B 采购决策最需要信任信号，这是最大缺口
- **需要：** 客户 Logo（需授权）+真实评价 + 案例数据

**2. About 页面缺电话号码展示**
- `contact.ts` 中有电话 `+86-156-6682-0406`，About 页面 UI 没有展示
- 竞品在每个页面顶部都显示电话
- **需要：** 在 About + Contact 页面展示电话，以及 WhatsApp 链接

**3. Pricing 页面无价格层级暗示**
- "How We Quote" 页面完全没有价格范围信息
- 客户无法在联系前自评是否负担得起 — 增加无效询盘
- **建议：** 加上语义化价格范围（如 "Starting from $299/project"）

**4. 无实时咨询入口**
- 没有在线聊天 widget（Tawk.to / Crisp）
- 没有 WhatsApp 即时咨询链接
- 客户想快速提问只能填表单 — 增加转化摩擦
- **建议：** 至少加 WhatsApp 链接（低成本，高转化）

**5. AI Tools 页面专业感不足**
- Emoji 图标影响专业形象
- 与 FlarePix "专业工作室" 的品牌定位不符

---

## 三、优先执行计划

```
P0（立即修复 — 我可以直接动手）：
├── P0-1：/services/ai-imagery — 补 OG + Twitter + WebPage schema
├── P0-2：sitemap.ts — 加入 /about
└── P0-3：footer.tsx — /privacy → /privacy-policy

P1（本周修复）：
├── P1-1：Blog listing — 加 Twitter Card
├── P1-2：blog/[slug] — 修正 publisher logo URL + 加 dateModified
├── P1-3：/work — 加 CreativeWork 或 ItemList schema
└── P1-4：About — Organization schema 补全 telephone + 页面展示电话

P2（下一阶段）：
├── P2-1：各 Service 页加 FAQPage schema（触发富摘要）
├── P2-2：Pricing 加 priceRange schema
├── P2-3：Contact schema 补全 PostalAddress + telephone
├── P2-4：AI Tools — Emoji → inline SVG
└── P2-5：/work — 结构化数据

营销缺口（需要你提供素材）：
├── M-1：客户 Logo（需客户书面授权）
├── M-2：真实评价/Testimonial（需客户授权）
└── M-3：案例数据（交付成果数字：交付量、转化提升数据等）

营销入口优化（可直接做）：
├── M-4：加 WhatsApp 即时咨询链接
├── M-5：加在线聊天 widget（Tawk.to / Crisp）
└── M-6：Pricing 页面加价格层级暗示文字
```

---

## 四、验证方法

| 修复项 | 验证工具 |
|--------|----------|
| 所有 Schema | [Google Rich Results Test](https://search.google.com/test/rich-results) |
| 所有社交标签 | [Twitter Card Validator](https://cards.twitter.com/validator) |
| Sitemap | Google Search Console → Sitemap → 提交并检测 |
| 所有页面索引状态 | Google Search Console → URL Inspection |
| 页面速度 | [PageSpeed Insights](https://pagespeed.web.dev/) |

---

*审计时间：2026-06-05*
*工具：seo-audit skill + 逐文件代码扫描*
---

## 五、六大竞品全景分析（2026-06-05）

*来源：用户提供的竞品调研数据 + 代码分析*

### 竞品总览

| 维度 | ProductVideoStudio | Filma | Vidico | Hi-Light AI | Neverframe | C&I Studios |
|------|-------------------|-------|--------|-------------|------------|-------------|
| **定位** | 亚马逊产品视频专家 | 全球化视频制作网络 | 数据驱动电商视频 | AI原生视频生成 | 电影级商业智能 | 创意代理+影棚 |
| **核心卖点** | 视频+摄影+A+内容一站式 | 六大洲全球制作网络 | 14亿播放+ROI验证 | 成本削减90%+多智能体 | Cinematic Intelligence | 增长导向+全链路 |
| **价格** | 未公开（咨询） | 未公开（咨询） | 照片$24/张，视频$24/张，$63/视频起 | 未公开（咨询） | 未公开（高端定制） | 未公开（咨询） |
| **目标客户** | 亚马逊消费电子卖家 | 跨国电商品牌 | 电商+科技/SaaS | 跨境电商小团队 | 高端全球化品牌 | 电商品牌 |
| **实拍能力** | ✅ 有 | ✅ 有 | ✅ 有 | ❌纯AI | ✅ 有 | ✅ 有 |
| **AI能力** | ❌ 无 | ✅ 辅助 | ✅ 加速流程 | ✅ 核心 | ✅ CEO Avatar | ❌ 无 |
| **差异化信号** | Trustpilot 4.9 + 16品牌案例 | 全球数百城市本地制作 | ROI数据背书+免费脚本 | 90%降本+RAG知识库 | Engineered UGC | 自有影棚 |

### 关键洞察

**洞察1：定价黑洞**
几乎所有竞品（除 Vidico 子品牌 vidi.so 外）都不公开定价。这说明：
- 客单价不低（需要"教育"客户后才报价）
- 行业信息不对称，客户难以比价
- FlarePix 如果能做透明定价（如"Starting from $XX"），能建立差异化信任

**洞察2：市场定位空白**
目前没有竞品同时做到：
- ✅ 实拍能力
- ✅ AI能力
- ✅ 专攻亚马逊卖家

最接近的是：
- ProductVideoStudio（实拍为主，无AI）
- Hi-Light AI（纯AI，无实拍）

**FlarePix 的独特定位 = 中间地带无人占据**

### FlarePix 竞争优势矩阵

| 你的优势 | 对标竞品弱点 |
|----------|-------------|
| 实拍 + AI 融合 | Hi-Light 无实拍；ProductVideoStudio 无AI |
| 透明定价 | 几乎所有竞品都不公开价格 |
| 专攻跨境卖家 | Filma/Vidico 太泛，不聚焦 |
| 中文团队 + 深圳供应链 | 西方竞品做不到的性价比和速度 |

---

## 六、战略行动建议（基于竞品分析）

### 6.1 定位语言重构（最优先级）

**当前问题：** 首页标题 "Product Photography, Video & AI Visuals for Ecommerce" 太泛
**竞品对标：** ProductVideoStudio 直接打"Amazon product video"，Vidico 打"14亿播放"
**建议标题方向：**
> "Amazon Product Video & Photography Studio — Real Footage + AI Production"

在 Title、H1、Meta description 中强化：
- "Amazon" — 明确垂类
- "Real Footage + AI" — 差异化
- "Studio" — 专业感（非平台/工具）

### 6.2 定价透明化

**竞品现状：** 几乎全部咨询报价，客户体验差
**机会点：** 在 Pricing 页面加价格起点，让客户自评是否值得询盘
**建议：**
```
Product Photography: starting from $XX / image
Product Video: starting from $XX / video
AI Video: starting from $XX / video
Brand Film: contact for quote
```
参考 Vidico 子品牌 vidi.so 的透明定价策略

### 6.3 信任信号强化（对标 ProductVideoStudio）

ProductVideoStudio 有 Trustpilot 4.9 + 16品牌案例，FlarePix 缺：
- 无客户评价展示
- 无数字化的交付成果
- 无第三方评分

**建议（需你提供素材）：**
- 客户 Logo（需授权）
- 真实评价 Testimonial
- 交付数据（如"已为 XXX 个 Amazon 卖家交付"）

**过渡方案（可直接做）：**
- About 页面加电话号码（contact.ts 已有）
- 展示合作品类（已有：电子秤、儿童玩具、纸巾）
- 展示交付数量/客户数量估算

### 6.4 AI 差异化强化（对标 Hi-Light 但不打价格战）

Hi-Light 的核心诉求是"成本削减90%"，如果 FlarePix 也打价格，会输。
**正确打法：** 强调"AI 是工具，专业团队才是核心"

USP 语言：
> "AI video tools are everywhere. Professional review is not."

在 AI Video 页面已有这个方向，继续强化，不要降价竞争。

### 6.5 内容关键词布局（基于竞品关键词）

| 竞品占位词 | 机会 | FlarePix 落地页 |
|------------|------|-----------------|
| `amazon product video production` | 基本空白 | AI Video + Brand Film |
| `product video for amazon listing` | 低竞争 | AI Video 页面 |
| `ai product video amazon` | 中竞争 | AI Video 页面 |
| `brand film ecommerce` | Neverframe 占位 | Brand Film 页面 |
| `amazon listing video` | 机会词 | AI Video 页面 |

---

*竞品分析补充：2026-06-05*
