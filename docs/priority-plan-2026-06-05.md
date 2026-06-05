# FlarePix 优先工作任务策划报告

> 日期：2026-06-05

---

## P0 — 阻断性问题（影响所有 SEO 效果，必须第一时间解决）

这些问题是"做了其他所有工作都等于白做"级别的阻塞。

| # | 任务 | 操作方式 | 预计耗时 |
|---|------|----------|---------|
| P0-1 | GSC 对 5 个核心页请求"请求编入索引" | Google Search Console → URL Inspection → "请求编入索引" | 10 分钟 |
| P0-2 | Vercel 配置 HTTP→HTTPS + www→根域 301 重定向 | Vercel Dashboard → Domain Settings → Redirect | 15 分钟 |
| P0-3 | 推送 @vercel/analytics 到 GitHub | `git add + commit + push` | 5 分钟 |
| P0-4 | 检查并修复服务页 alternates.canonical（N/A 问题）| 查看 ai-video 和 brand-film 页面是否有 alternates 配置 | 20 分钟 |

**为什么 P0 最高优先：**
- 不请求索引 → Google 不知道这些页重要 → 服务页永远不会进入索引 → 核心词永远没有排名
- 不做 301 重定向 → HTTP/HTTPS/www 三个版本分走权重 → 排名永远上不去
- analytics 不推送 → 看不到任何运营数据 → 无法评估任何工作的效果

---

## P1 — SEO 基础设施（直接决定排名能力）

| # | 任务 | 说明 | 预计耗时 |
|---|------|------|---------|
| P1-1 | Organization schema（全站）| 在 layout.tsx 或 About 页面部署，声明公司信息 | 30 分钟 |
| P1-2 | FAQPage schema（FAQ 页面）| Google 精选摘要机会，直接影响长尾词排名 | 20 分钟 |
| P1-3 | HowTo schema（AI Video / Brand Film 服务页）| 覆盖"如何制作 AI 产品视频"等长尾词 | 30 分钟 |
| P1-4 | BreadcrumbList schema（博客文章页）| 内链权重传递，提升博客文章排名 | 20 分钟 |
| P1-5 | next/image 迁移（首页 + 服务页）| LCP 改善，Core Web Vitals 影响排名 | 2 小时 |
| P1-6 | 服务页内容差异化（避免 AI Video 和 Brand Film 内容重叠）| 明确区分两个页面主题，避免 Google 判断重复内容 | 1 小时 |

**说明：** P1 的 6 项任务是 SEO 的"基础设施"。基础设施不完善，P2 和 P3 做再多也没有意义。FAQPage 和 HowTo 是目前最容易拿到精选摘要的两个机会，应该优先做。

---

## P2 — 转化率优化（直接决定询盘数量）

没有转化能力，流量来了也是浪费。

| # | 任务 | 说明 | 预计耗时 |
|---|------|------|---------|
| P2-1 | About 页面添加团队成员（真实照片 + 姓名 + 职位）| B2B 买家第一件事是"确认对方是真人"，没有人脸等于没有信任 | 2 小时 |
| P2-2 | Contact 页面表单优化（减少字段 + 预填问题列表）| 超过 4 个字段开始流失，加"大多数买家关心的问题"降低填写门槛 | 1 小时 |
| P2-3 | 服务页 CTA 强化（AI Video / Brand Film / Pricing）| 每个服务页至少 2 个 CTA（联系表单 + 邮箱直接联系）| 30 分钟/页 |
| P2-4 | 第一个客户 testimonial（即使非公开案例描述）| 哪怕一句"我们在 FlarePix 做了产品视频，转化率提升了 X%"都比没有强 | — |
| P2-5 | 嵌入 Showreel 视频（首页 + About 页面）| 视频是最强的 E-E-A-T 信号，竞品 vidico 就是靠这个建立权威的 | 1 小时 |

---

## P3 — 营销基础设施（决定获客渠道宽度）

没有营销基础设施，内容做得再好也无法转化为收入。

| # | 任务 | 说明 | 预计耗时 |
|---|------|------|---------|
| P3-1 | 创建 LinkedIn Company Page | 外展和内容营销的"身份背书"，没有 Company Page 外展效果减半 | 1 小时 |
| P3-2 | 开通 Apollo.io 账号，建立第1批客户搜索 | Amazon seller / FBA / ecommerce 决策者，50 条数据 | 2 小时 |
| P3-3 | 创建 YouTube Channel | 长期内容资产，第三个获客渠道 | 1 小时 |
| P3-4 | Google Ads 账号开通 + 核心关键词配置 | 目标词：amazon product video production / ai product video amazon | 2 小时 |
| P3-5 | 制作外展 Case Study 单页（PDF）| 发 LinkedIn 私信和 cold email 时的附件，提高回复率 | 2 小时 |

---

## P4 — 内容建设（持续积累排名权重）

P4 依赖 P0-P3 完成后开始，以 blog 为核心。

| # | 任务 | 说明 |
|---|------|------|
| P4-1 | Blog Post D — "10 Questions Before Hiring a Video Studio" | 链接到 Pricing + Contact，转化导向 |
| P4-2 | 博客内容去掉"AI 味儿"（Posts A/B/C 改写）| 减少 em dash、过渡词、过于流畅的句子，加入真实数据和案例 |
| P4-3 | 博客内 CTA 优化（每篇至少 2 个服务页入口）| 当前内链不足，权重传递效率低 |
| P4-4 | YouTube 视频 #1 — Behind the Scenes Hybrid Process | 4-6 分钟，建立真实感 |
| P4-5 | YouTube 视频 #2 — "Why AI Video Can't Replace Professional Production" | 打竞品自助式 AI |

---

## 执行顺序建议

```
第1步（今天）：P0-1 → P0-2 → P0-3 → P0-4
                    （4 项同时推进，半天完成）

第2步（本周）：P1-1 → P1-2 → P1-3 → P1-4
               完成后做一次 GSC 覆盖率检查

第3步（下周）：P1-5（性能）→ P2 系列（转化）
               同时启动 P3-1 → P3-2（营销渠道）

第4步（持续）：P4 内容建设 + P3-3/4/5 营销渠道完成
```

**核心原则：**
- P0 做不完，其他全部白做
- P1 是排名能力，不做 P1 做再多内容也上不去
- P2 决定询盘数量，流量来了转化不了等于零
- P3 决定获客宽度，只靠 SEO 增长太慢，必须多渠道并行