# FlarePix 完整路线图
**版本：v1.0 — 2026-06-05**
**汇总来源：seo-audit skill（完整审计框架）+ 逐文件代码扫描 + 6大竞品分析 + 营销策略**
**核心原则：等我确认本地页面没问题再push**

---

## 执行摘要

### 整体评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 技术 SEO | 3/5 | Schema 基础好，但 AI Imagery 页面完全缺失 OG+schema |
| On-Page SEO | 4/5 | 大部分页面标题/meta 到位，services页面缺社交标签 |
| 内容质量 | 3.5/5 | 内容深度足够，但信任信号薄弱 |
| 竞争定位 | 3/5 | 有差异化，但首页定位语言不够聚焦 |
| 营销能力 | 2.5/5 | 缺少社会证明、实时咨询入口、价格透明度 |

### 核心USP

```
实拍能力 + AI能力 + 专攻亚马逊 = 中间地带无人占据
```

**主推语言：** "AI video tools are everywhere. Professional review is not."

---

## 第一部分：SEO + 技术修复路线图

### 🔴 P0 — 立即修复（我直接动手）

| # | 文件 | 问题 | 修复方案 |
|---|------|------|---------|
| P0-1 | `src/app/services/ai-imagery/page.tsx` | 缺 OG + Twitter + 所有 Schema | 加 OpenGraph + Twitter Card + WebPage/Service schema |
| P0-2 | `src/app/services/page.tsx` | 缺 OG + Twitter Card | 加 OpenGraph + Twitter Card |
| P0-3 | `src/app/sitemap.ts` | 缺 `/about` 条目 | 加 `{ path: "about", priority: 0.7, changeFrequency: "monthly" }` |
| P0-4 | `src/components/footer.tsx` | `/privacy` → 404 | 改 `href="/privacy"` → `href="/privacy-policy"` |

### 🟡 P1 — 本周修复

| # | 文件 | 问题 |
|---|------|------|
| P1-1 | `src/app/blog/page.tsx` | 缺 Twitter Card |
| P1-2 | `src/app/privacy-policy/page.tsx` + `terms/page.tsx` | 缺 Twitter Card |
| P1-3 | `src/app/blog/[slug]/page.tsx` | logo URL 错误 + 缺 dateModified |
| P1-4 | `src/app/work/page.tsx` | 无任何 Schema |
| P1-5 | `src/app/about/page.tsx` | Organization schema 缺 telephone + 页面未展示电话 |

### 🟢 P2 — 下一阶段

| # | 优先级 | 说明 |
|---|--------|------|
| P2-1 | 高 | AI Imagery + AI Video + Brand Film 底部加 FAQPage schema（触发 Google 富摘要）|
| P2-2 | 高 | `/services`页面加 BreadcrumbList schema |
| P2-3 | 中 | Pricing 页面加 priceRange + Offer schema |
| P2-4 | 中 | Contact schema 补全 PostalAddress + telephone |
| P2-5 | 中 | AI Tools 页面加 WebPage/Service schema |
| P2-6 | 低 | AI Tools Emoji → inline SVG |

### SEO关键词落地页矩阵（第二周执行）

| 目标关键词 | 落地页 | 当前状态 | 建议新 Title |
|-----------|--------|---------|-------------|
| `amazon product video production` | /services/ai-video | ⚠️ 部分 | "Amazon Product Video Production — AI + Real Footage \| FlarePix" |
| `product video for amazon listing` | /services/ai-video | ❌ 否 | "AI Product Video for Amazon Listings \| FlarePix" |
| `ai product video amazon` | /services/ai-video | ⚠️ 部分 | "AI Product Video for Amazon — Professional Team, Not a Tool \| FlarePix" |
| `amazon product photography studio` | /services | ❌ 否 | "Amazon Product Photography Studio \| FlarePix" |
| `ai product imagery ecommerce` | /services/ai-imagery | ❌ 否 | "AI Product Imagery for Ecommerce — FlarePix" |
| `brand film ecommerce` | /services/brand-film | ⚠️ 部分 | "Brand Film for Ecommerce — Real Footage + AI Production \| FlarePix" |
| `amazon listing video` | /services/ai-video | ❌ 否 | "Amazon Listing Video Service \| FlarePix" |

### 博客关键词空白（第四周执行）

以下关键词**无人占位**，优先写博客文章占位：

| 文章主题 | 目标关键词 | 落地页 |
|---------|-----------|--------|
| "Why AI-Generated Product Videos Can't Be Fully Automated" | `ai product video amazon` | /blog/ai-product-videos-cannot-be-fully-automated |
| "How We Shot a Real Amazon Product Video: Hybrid Process" | `product video production` | 新博客 |
| "Amazon Listing Video Cost: What to Expect" | `amazon listing video cost` | 新博客 |
| "Hybrid Product Photography: Real Shot + AI Enhancement" | `hybrid product photography studio` | 新博客 |

### 验证工具

| 验证项 | 工具 |
|--------|------|
| 所有 JSON-LD Schema | Google Rich Results Test |
| 所有社交分享标签 | Twitter Card Validator |
| Sitemap 提交 + 覆盖率 | Google Search Console |
| 页面索引状态 | Google Search Console → URL Inspection |
| 页面速度 | PageSpeed Insights |

---

## 第二部分：营销路线图

### 营销核心目标

**单一目标：** 获取更多客户询盘

### 四大营销渠道（按优先级）

| 优先级 | 渠道 | 行动 | 时间 |
|--------|------|------|------|
| **1** | Google Ads | 开通账户，投低竞争词，$500/月 | **立即启动** |
| **2** | LinkedIn + Cold Email | Apollo找客户，发私信/邮件 | **同步启动** |
| **3** | YouTube + 博客 | 制作过程视频 + SEO文章 | 第2周 |
| **4** | 社交媒体维护 | YouTube > LinkedIn > Instagram | 持续 |

### Google Ads 执行计划

**立即（Day 1）：**
- 开通 Google Ads 账户
- 设置核心关键词出价：`amazon product video production`、`product video for amazon listing`、`ai product video amazon`
- 着陆页：`/services/ai-video`

**Day 2-7：**
- 监控数据，收集前50 个点击
- 不要过度优化，先跑起来

**关键词白名单：**

| 可以投 | 不要投 |
|--------|--------|
| `amazon product video production` | `product video production` |
| `product video for amazon listing` | `video production company` |
| `ai product video amazon` | `product photography` |
| `amazon listing video service` | `ai video generator` |
| `product photography studio amazon` | |

### LinkedIn + Cold Email 执行计划

**Day 1-2：**
- Apollo.io 导出第一批 20 个 Amazon 卖家联系人
- 准备 LinkedIn 私信模板 + Cold Email 模板

**Day 3-7：**
- LinkedIn 私信：每天 5-10 条
- Cold email：每天 3-5 封
- 记录所有发送记录

**私信模板：**
```
Hi [Name],

I noticed [Company] sells on Amazon — congrats on building that up.

Quick question: is product video something you've been thinking about for your listings? We work specifically with Amazon sellers — including a few in the [品类] space — and a lot of them come to us because they're tired of the "upload and hope" AI tools that don't actually look professional.

Happy to share what we've seen work for similar products if it's useful.

Best,
[Your name]
```

**邮件主题：** [对方公司名] 的产品视频打算怎么做？

### YouTube + 博客执行计划

**第2周：**
- YouTube 视频 #1 大纲：Behind the scenes 制作过程
- Blog 文章 #1：「Why AI-Generated Product Videos Can't Be Fully Automated」已有（确认发布）

**第3周：**
- YouTube 视频 #2：「Why AI Video Can't Replace Professional Product Videography」
- Blog 文章 #2：Hybrid Process 新建

**第4周：**
- Blog 文章 #3：Amazon Listing Video Cost 新建
- 内嵌策略：所有视频描述加 `/services/ai-video` 链接

### 营销缺口（立即可做）

| 行动 | 影响 | 是否需要你提供素材 |
|------|------|------------------|
| WhatsApp 链接加到 Contact + About | 提升即时询盘转化 | 否（只需确认号码）|
| Pricing 页面加"Starting from $XX" | 减少无效询盘 | 否（只需确认价格）|
| AI Tools Emoji → inline SVG | 提升专业感 | 否 |
| 客户 Logo 加到首页 | 高（信任信号）| **是（需客户授权）** |
| 真实评价加到 About | 高 | **是（需客户授权）** |
| 交付数据展示 | 高 | **是（需真实数据）** |

### 工具订阅

| 工具 | 月费 | 用途 |
|------|------|------|
| Google Ads | $500 | 付费搜索 |
| Apollo.io | $49 | LinkedIn + 邮箱挖掘 |
| Ubersuggest | 免费 | 竞品关键词 |
| Hunter.io | 免费 | 邮箱验证 |
| **合计** | **$549/月** | |

### KPI 追踪

| 指标 | 第1个月目标 |
|------|------------|
| Google Ads 点击 | 80-120 |
| Google Ads 询盘 | 3-5 |
| LinkedIn 私信发送 | 50 |
| LinkedIn 回复率 | 10-15% |
| Cold email 发送 | 30 |
| Cold email 打开率 | 30%+ |
| Cold email 回复率 | 5-8% |
| 有效询盘总数 | 8-15 |
| 成交 | 1-2 |

---

## 第三部分：执行时间表（4周）

### 第一周：P0修复 + 营销启动

```
Day 1-2：
├── P0-1：services/ai-imagery — 补 OG + Twitter + Schema
├── P0-2：services — 补 OG + Twitter Card
└── 开通 Google Ads 账户

Day 3：
├── P0-3：sitemap.ts — 加入 /about
├── P0-4：footer.tsx — /privacy → /privacy-policy
└── 设置 Google Ads 核心关键词出价

Day 4-5：
├── P1-1：blog — 加 Twitter Card
├── P1-2：privacy-policy + terms — 加 Twitter Card
└── Apollo.io 导出第一批客户

Day 6-7：
├── P1-3：blog/[slug] — 修正 logo URL + dateModified
├── P1-4：work — 加 CreativeWork schema
├──发送第一批 LinkedIn 私信
└── 发送第一批 Cold Email
```

### 第二周：内容 + 关键词

```
Day 8-9：
├── AI Video 页面 Title/meta 重写
└── AI Imagery 页面 Title/meta 重写

Day 10-11：
├── Brand Film 页面 Title/meta 重写
└── 首页 Title/meta 重写

Day 12-13：
├── P1-5：About — schema补 telephone + 页面展示电话
└── Pricing 页面加"Starting from"价格提示

Day 14：
├── YouTube 视频 #1 大纲确认
└── Blog 文章 #2 确认大纲
```

### 第三周：Schema 扩充 + 内容

```
Day 15-16：AI Imagery 加 FAQPage schema
Day 17-18：Services 加 BreadcrumbList schema
Day 19-20：Pricing 加 priceRange + Offer schema
Day 21：AI Tools 加 Schema + Emoji → SVG
```

### 第四周：技术 SEO + 内容

```
Day 22-23：next/image 审计（LCP优化）
Day 24-25：Google Search Console 提交 sitemap
Day 26-27：PageSpeed Insights 移动端审计
Day 28-30：Blog 文章 #2 + #3 写作
```

---

## 第四部分：竞品定位总结

### 六大竞品

| 竞品 | 定位 | 实拍 | AI | 价格透明度 |
|------|------|------|----|-----------|
| ProductVideoStudio | 亚马逊产品视频专家 | ✅ | ❌ | ❌ |
| Filma | 全球化视频制作网络 | ✅ | ✅ | ❌ |
| Vidico | 数据驱动电商视频 | ✅ | ✅ | 部分（vidi.so）|
| Hi-Light AI | AI原生视频生成 | ❌ | ✅ | ❌ |
| Neverframe | 电影级商业智能 | ✅ | ✅ | ❌ |
| C&I Studios | 创意代理+影棚 | ✅ | ❌ | ❌ |

### FlarePix 竞争优势

| 你的优势 | 对标竞品弱点 |
|---------|------------|
| 实拍 + AI 融合 | Hi-Light 无实拍；ProductVideoStudio 无AI |
| 透明定价 | 几乎所有竞品都不公开 |
| 专攻跨境卖家 | Filma/Vidico 太泛 |
| 中文团队 + 制造中心 | 西方竞品做不到的性价比和速度 |

### 你不应该打的牌

- 价格战（降价）
- "最便宜"
- "AI黑科技"
- "全球网络"

---

## 第五部分：需要你提供材料的清单

| 材料 | 用途 | 优先级 |
|------|------|--------|
| 客户 Logo（需书面授权）| 首页社会证明 | 高 |
| 真实客户评价（需授权）| About/首页 | 高 |
| 交付数据（数字）| About页面 | 高 |
| WhatsApp 号码确认 | Contact + About 即时咨询 | 中 |
| 实际价格（确认定价框架）| Pricing 页面"Starting from" | 中 |
| 创始人/团队介绍 | About 页面 | 低 |
| YouTube 视频素材 | YouTube 内容 | 低 |

---

*路线图版本：v1.0 — 2026-06-05*
*汇总来源：seo-audit skill + 逐文件扫描 + 6大竞品分析 + 营销策略*
*核心规则：等我确认本地页面没问题再push*