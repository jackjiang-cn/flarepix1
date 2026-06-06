# FlarePix 执行路线图

**制定日期：** 2026-06-06
**执行人：** Jackjiang
**核心原则：** 先拿数据，再放大。不要同时开太多战线。

---

## 执行阶段总览

| 阶段 | 名称 | 核心目标 | 预计周期 |
|------|------|---------|---------|
| **Phase 0** | 基础设施 | 数据追踪建立 | 第 1 周 |
| **Phase 1** | 流量验证 | 付费广告跑起来，拿到第一批数据 | 第 2-3 周 |
| **Phase 2** | 外展冷启动 | LinkedIn + Cold Email 发出第一批 | 第 3-4 周 |
| **Phase 3** | 内容积累 | YouTube + 博客持续填充 | 持续 |

---

## Phase 0：基础设施（第 1 周）

目标是**建立数据追踪**，没有数据所有决策都是猜的。

### Step 0-1：Google Analytics 4（30 分钟）

1. 登录 [Google Analytics](https://analytics.google.com) 用 Google 账号创建媒体资源
2. 创建"FlarePix"媒体资源，网站 URL：`https://www.flarepix.com`
3. 选择"Web"平台，复制 GA4 Measurement ID（格式：`G-XXXXXXXXXX`）
4. 在 Vercel 环境变量中添加：`NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
5. 在 `src/app/layout.tsx` 的 `<head>` 中添加：

```tsx
<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
`}} />
```

**验证：** 访问网站 → GA4 Real-time 面板看到自己

---

### Step 0-2：Google Ads 账户开通（30 分钟）

1. 登录 [Google Ads](https://ads.google.com) 用 Google 账号创建账户
2. 选择"Expert mode"（不要选 Smart Campaigns）
3. 设置账单信息：**先充值 $100**，不要一上来充 $500
4. 创建第一个广告系列：

```
类型：Search（搜索广告）
名称：ai-video-amazon-test
每日预算：$10/天
出价方式：尽可能争取点击
```

**关键词（先跑这 3 个）：**
- `amazon product video production`
- `ai product video amazon`
- `product video for amazon listing`

**着陆页：** `https://www.flarepix.com/services/ai-video`

5. 广告文案（先跑一个版本）：

```
标题1：AI Product Video for Amazon
标题2：Professional Team, Not a Tool
描述：We generate, review, and deliver your AI product video.
  No self-serve tools. Just finished files ready to upload.
```

**预期：** $100 大约跑 5-10 天拿到 30-80 点击，看清 CPC 实际价格。

---

### Step 0-3：询盘追踪表建立（15 分钟）

创建 Google Sheet，包含以下标签页：

**Tab 1：广告数据**
| 日期 | 广告系列 | 点击数 | 花费 | 询盘数 | CPC | 转化率 |
|------|---------|-------|------|-------|-----|--------|

**Tab 2：外展记录**
| 日期 | 渠道 | 对方公司 | 发送人 | 内容摘要 | 回复状态 | 备注 |
|------|------|---------|--------|---------|---------|------|

**Tab 3：询盘跟进**
| 日期 | 来源 | 公司 | 联系产品 | 需求描述 | 报价 | 状态 | 下次跟进 |
|------|------|------|---------|---------|------|------|---------|
（状态：未回复 / 跟进中 / 报价中 / 成交 / 归档）

---

## Phase 1：流量验证（第 2-3 周）

Google Ads 测试跑 1 周后，根据数据决定下一步。

### Step 1-1：Google Ads 数据分析（第 8 天）

**每天花 15 分钟看数据：**
- 哪些关键词有点击但无转化 → 暂停
- 哪些关键词 CPC 太贵（>$5）→ 降出价或暂停
- 哪些广告文案 CTR > 5% → 保留；< 1% → 换

**决策节点（第 8 天）：**

```
如果 CPC < $3 且有询盘：
  → 加预算到 $20/天，继续优化
如果 CPC > $5 或无点击：
  → 换关键词，重新测试
如果花费 >$80 但 0 询盘：
  → 检查着陆页是否有问题
```

---

### Step 1-2：着陆页优化（根据数据）

**可能的问题及修复方向：**

| 问题 | 修复 |
|------|------|
| 用户到达后立即离开 | 页面加载速度问题 → PageSpeed Insights 检查 |
| 用户停留 < 30 秒 | Hero 内容不匹配广告预期 → 调整广告文案或页面内容 |
| 有点击无询盘 | 页面 CTA 不够明显 → 在 AI Video 页面增加显眼的"Get a Quote"按钮 |
| 跳出率高 | 页面内容不够 → 加 FAQ 或客户案例 |

---

## Phase 2：外展冷启动（第 3-4 周）

Google Ads 跑了 2 周有基础数据后，启动外展。

### Step 2-1：Apollo.io 账号 + 数据导出（第 1-2 天）

1. 注册 [Apollo.io](https://apollo.io)（选 Professional 套餐 $49/月）
2. 创建"Amazon Seller"搜索：
   - 搜索词：`amazon seller` OR `amazon fba` OR `ecommerce seller`
   - 职位：Founder / CEO / Head of Marketing / Operations Manager / VP
   - 地区：美国、英国、德国
   - 公司规模：10-500 人（排除超大型企业）
3. 导出前 100 个联系人，包含：姓名、邮箱、公司名、职位、LinkedIn URL
4. **数据清洗**：删除无邮箱或无 LinkedIn 的记录

**目标：100 个高质量联系人（不是 50 个）**

---

### Step 2-2：LinkedIn 私信（第 3 天起，每天 5-10 条）

**模板（每条个性化修改）：**

```
Hi [Name],

I noticed [Company] sells on Amazon — congrats on building that up.

Quick question: is product video something you've been thinking about for your listings? We work specifically with Amazon sellers — including a few in the [品类] space — and a lot of them come to us because they're tired of the "upload and hope" AI tools that don't actually look professional.

Happy to share what we've seen work for similar products if it's useful.

Best,
[Your name]
```

**操作：**
- 用 LinkedIn 付费版或手动发（每天上限 50 条）
- 记录每天发送数量到 Google Sheet
- 回复的人进入 Tab 3 询盘跟进

---

### Step 2-3：Cold Email（第 4 天起，每天 3-5 封）

**邮件主题：** [对方公司名] 的产品视频打算怎么做？

**模板：**

```
Hi [Name],

I'm reaching out because I've been following [Company]'s Amazon presence — you're doing [具体观察，如 "a solid job with the Kitchen category listing"].

One thing we're seeing now in 2026: sellers who add a product video to their listing see a real lift in conversion — but the AI-only tools are creating content that actually hurts brand perception when customers see a generic result.

We've been making product videos for Amazon sellers for a while now — including a few in the [品类] space. Not AI-only, but a hybrid approach: real footage edited with AI-assisted post-production. Works better, costs less than a full shoot.

If you're currently evaluating options, happy to share what we've built for similar products. No pitch — just a quick 15-min call if it's useful.

[Your name]
FlarePix
```

**发送注意：**
- 每批 10 封，间隔 30 分钟
- 用邮箱验证工具（Hunter.io 免费版）验证邮箱有效性再发
- 记录每封邮件的发送状态

---

## Phase 3：内容积累（持续，每周 2-4 小时）

### 优先级排序

| 任务 | 频率 | 时间 |
|------|------|------|
| YouTube Shorts（制作过程，手机拍摄）| 每周 1 条 | 2 小时 |
| 博客文章（基于广告中真实搜索词）| 每 2 周 1 篇 | 3 小时 |
| LinkedIn 个人账号内容发布 | 每周 2-3 条 | 1 小时 |

### YouTube 最小可行内容（手机即可）

**视频 #1（本周拍）：** "What a real AI product video looks like for Amazon"

- 用手机拍屏幕演示一个 AI 视频生成过程（不露客户信息）
- 3 分钟以内
- 标题：How We Make AI Product Videos for Amazon（不是 "AI Video Production Workflow"）
- 描述里放：`/services/ai-video`

**视频 #2（第 3 周）：** "Why AI video tools alone don't work for Amazon"

- 真人对着镜头说 2-3 分钟
- 不用专业灯光和设备
- 直接打竞品的弱点

---

## 关键决策节点

| 时间 | 决策点 |
|------|--------|
| 第 8 天 | Google Ads：加预算/换词/暂停 |
| 第 21 天 | Google Ads：$100 是否加到 $500 |
| 第 21 天 | Apollo：是否有回复率（>3%算正常）|
| 第 30 天 | 总结第一个月：多少询盘，多少成交 |

---

## 每周固定动作清单

**每星期一（30 分钟）：**
1. 打开 GA4 → 看上周自然搜索流量变化
2. 打开 Google Ads → 看上周数据，更新 Excel
3. 处理 Apollo 回复

**每星期五（30 分钟）：**
1. LinkedIn 外展：发完本周剩余的 25-30 条
2. Cold email：发完本周剩余的 15-20 封
3. 更新询盘跟进表

---

## 工具订阅清单

| 工具 | 费用 | 状态 |
|------|------|------|
| Google Ads | $100-500/月 | 待开通 |
| Apollo.io | $49/月 | 待注册 |
| Google Analytics | 免费 | 待开通 |
| Hunter.io | 免费 | 可选 |

---

## 第一周执行清单

```
Day 1：
  □ 开通 Google Analytics 4，拿到 Measurement ID
  □ 在 Vercel 添加 NEXT_PUBLIC_GA_ID 环境变量
  □ 本地测试 GA4 是否收到数据
  □ commit + push 到 GitHub

Day 2：
  □ 开通 Google Ads 账户
  □ 充值 $100
  □ 创建第一个广告系列（3 个关键词，着陆页 /services/ai-video）
  □ 创建询盘追踪 Google Sheet

Day 3-5：
  □ Google Ads 跑起来，观察数据
  □ 注册 Apollo.io

Day 6-7：
  □ 检查 GA4 real-time 数据
  □ 检查 Google Ads 点击和花费
  □ 开始 Apollo 导出第一批 100 个联系人
```

---

*路线图制定日期：2026-06-06*
*基于：work-summary-2026-06-06.md*
*执行人：Jackjiang*