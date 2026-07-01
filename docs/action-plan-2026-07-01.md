# FlarePix 行动计划 — 2026-07-01

> 基于今天全天 SEO/收录审计 + 战略讨论整理。
> 一条一条做,每条做完把结果写在「📋 记录」里。完成就打勾。

---

## 🧠 今日关键结论(先读这个,知道为什么做下面的事)

1. **网站技术/SEO 没有大病。** canonical 已确认修好(Google 6/24 爬虫、Google 选定 canonical = www)。之前两轮修的是对的。
2. **"9 收录 / 68 未收录"不是代码 bug**,是两个原因叠加:
   - 数据停在 6/12 的旧快照(那时 canonical 还在打架)
   - 新站才 1 个月 + **0 外链** → Google 不愿爬深层页("Discovered - currently not indexed")
3. **根治杠杆 = 站点权威/外链。** 这靠时间和内容,不靠改代码。
4. **视频内容(YouTube)是最对的权威建设路径** —— Google 自家收录快、能排进搜索结果、每个视频描述链接 = 一条外链。同时直接引流。**做视频不是 SEO 之外的事,它就是 SEO 的解药。**
5. **GE / Arboleaf 案例已确认真实**,保留,是 YouTube 头号素材。
6. **不能干等 SEO**(要 3–6 个月)。本月获客要靠 Google Ads / LinkedIn 外展今天就开始。
7. **403 的 `/wp-admin` 是幽灵路径,无害**,不用管。

---

## ✅ 今日行动清单

### 👤 你做

- [ ] **1. GSC property 确认 + 看 www 数据(5 分钟)**
  - 左上角 property 切换器,确认现在看的是哪个;切到 `https://www.flarepix.com`(或 Domain property)看 Page indexing 的"已收录"数
  - 📋 记录:当前 property = `__________`;www 那边已收录数 = `____`(对比非 www 的 9)

- [ ] **2. Request Indexing × 10 关键页(10 分钟)**
  - 在 GSC URL Inspection 里对这 10 个 URL 逐个点 Request Indexing:
    - `https://www.flarepix.com/`
    - `/services`、`/services/ai-video`、`/services/brand-film`、`/services/ai-imagery`
    - `/about`、`/pricing`、`/contact`
    - `/blog/amazon-product-video-requirements-guide`
    - `/blog/ai-product-videos-cannot-be-fully-automated`
  - 📋 记录:今天请求了 `__` 个(配额每天约 10),日期 2026-07-01。注:这是弱杠杆,做了不一定立竿见影,但免费,做无妨。

- [ ] **3. 选一个获客渠道,今天迈出第一步(本月询盘靠它)**
  - **A) Google Ads**:今天开通账户 + 建第一个广告组(核心词 `amazon product video`、`amazon product video production`)。最快见效,但有预算($500/月)。
  - **B) LinkedIn 外展**:今天找 10 个亚马逊/电商卖家 + 发第一批私信。0 成本,靠腿。
  - 二选一(或都做)。推荐**先 A**(最快出询盘)。
  - 📋 记录:今天选了 `____`;具体做了 `__________`

### 🤖 我做(你说"做"我就动)

- [ ] **4. 写视频 #3(GE 案例拆解)完整脚本框架**
  - 分镜 + 每段解说 + 用哪个镜头素材 + 描述栏怎么写(带 flarepix 落地页链接)
  - 这条你素材最齐,做完当模板,后面 9 条照套
- [ ] **5. 修正 DEPLOYMENT-RECORD.md 里过时的"假案例"标记**
  - 把"Post B 编造、必须下线"改成"GE/Arboleaf 已确认真实(2026-07-01)",免得以后误删
- [ ] **6. 修 [footer.tsx](src/components/footer.tsx) 4 个失效锚点链接**
  - `#photography`→`#product-photography`、`#video`→`#video-production`、`#ai-images`→`#ai-imagery`、`#3d`→去掉或改对 → 改完 `npm run build` 验证

---

## 🔧 代码层 · 待办(来自 2026-07-01 `/seo audit`)

> 审计查出的代码/配置问题,和上面获客/内容线并行推进。按性价比排序。

- [~] **A1. www 重定向 307→301** — ⏸ 暂缓(价值低)
  - **已查证:不在代码里**。[next.config.ts](next.config.ts) 无跳转、项目无 middleware.ts。307 是 **Vercel 域名级自动跳转**(响应带 `X-Vercel-Id`)
  - 改法只能在 Cloudflare 加 Redirect Rule(301 边缘)或 Vercel 后台改域名配置 —— 有"两边规则成环"的历史风险
  - **价值低**:Google 对 GET 的 307≈301;且站点 0 外链,无 link equity 可丢。审计列了但属最不重要项
  - 决定:先做 A3–A5,这条以后顺手再弄
- [ ] **A2. Cloudflare 托管的 robots.txt 屏蔽了 AI 爬虫**(已验证:不在代码里,是 Cloudflare 注入的 managed block)
  - 实测线上 robots.txt 禁了 GPTBot / Google-Extended / ClaudeBot / CCBot / Bytespider / Applebot-Extended / meta-externalagent / Amazonbot
  - 现状 = 主动放弃 AI 搜索曝光(ChatGPT / Google AI Overviews / Claude 都读不到你)
  - **建议**:放开搜索类(GPTBot / Google-Extended / ClaudeBot),继续禁纯训练类(CCBot / Bytespider 等);文件里 `Content-Signal: ai-train=no` 已开 = 允许爬但不准训练,两件事不冲突
  - **改的地方**:Cloudflare 后台(AI Audit / "Block AI bots" 开关),**不是改代码**
  - **需你拍板**:放不放行?
- [ ] **A3. HowTo schema 已废弃**(ai-video、brand-film 两页)→ 移除或换类型
- [x] **A4. Organization schema 重复** — ✅ 已查证为**误报**,跳过。`/services/*` 的 Organization 是嵌套在 `Service.provider` 里的(Service 必填字段,正确用法,不是独立重复实体,删了反而破坏 Service schema)。独立 Organization 只在根 layout.tsx 一份(正版)。首页 page.tsx 另有一份独立但 Google 会自动合并,无害
- [ ] **A5. FAQ 页缺 H1 + 答案没进 HTML**(手风琴)→ 加 H1、答案写进 SSR
- [ ] **A6. 缺案例页 `/work/[slug]`**(现在 case study 只在 blog)→ 考虑单独案例页
- [ ] **A7. 缺关键词落地页**(如 `/services/amazon-product-photography`)→ 占 P0/P1 词
- [ ] **A8. 加 `/llms.txt`** → AI 爬虫友好(配合 A2 放行)

---

## 🎬 附:前 10 个 YouTube 选题(方向已定)

| # | 标题 | 搜索词 | 引流到 | 用什么素材 |
|---|------|--------|--------|-----------|
| 1 | Amazon Main Image Video: The First 3 Seconds That Stop the Scroll | amazon product video | /blog/amazon-product-video-requirements-guide | GE/Arboleaf 开场正例 |
| 2 | AI Video vs Real Shoot for Amazon — What Actually Gets Approved | ai product video amazon | /services/ai-video | 裸 AI 瑕疵 vs 你们 QC 成片(打 hi-light.ai) |
| 3 | We Made a Body Composition Scale Video for Amazon — Full Breakdown | product video case study | /blog/hybrid-production-behind-the-scenes | **GE 成片 + 幕后**(先做这条) |
| 4 | Amazon Rejected Your Video? 7 Reasons It Got Blocked (2026) | amazon video rejected | /blog/amazon-product-video-requirements-guide | 规格知识 |
| 5 | How We Generate 30 Lifestyle Images From One Photo (AI Pipeline Demo) | ai product images | /services/ai-imagery | AI 自动化流水线实拍 |
| 6 | Ghost Mannequin vs Flat Lay: Pick the Wrong One, Lose on Returns | ghost mannequin vs flat lay | /blog/ghost-mannequin-vs-flat-lay | fashion 分类作品 |
| 7 | Amazon Product Photography Requirements 2026 (Don't Get Suppressed) | amazon photography requirements | /blog/amazon-product-photography-requirements-2026 | 规格知识 |
| 8 | Behind the Scenes: One Day in Our Qingdao Product Video Studio | product video studio | /about | 工作室/团队/流程(治信任顾虑) |
| 9 | From 1 SKU to 50: Scaling Product Video Across a Catalog | product video at scale | /services/ai-video | 流水线 + Arboleaf 回头客 |
| 10 | 10 Questions to Ask Before Hiring a Product Video Studio | hire product video studio | /contact | 姿态建信任 |

**先做 #3、#2、#8**(素材齐 / 命中 P0 词 / 治信任)。

---

## 📝 今日结果汇总(做完回填)

- **Performance 数据分析(2026-07-01)**:3 个月 **0 点击 / 16 展示**。展示里印度(7)>美国(4),`/contact` 页占 10 次(被 `"hello* com" inurl:contact` 采集指令扫的),唯一真实商业词 `premium brand film production` 排第 66 名。→ 坐实"有机=0,本月靠 Ads/外展,根治靠视频建权威"。导出来自 Domain property(同时含 www+non-www,www 展示 3:1 领先,印证 www 是主版本)。
- **次要注意**:contact 页被邮箱采集机器人盯上(第 2 次出现此信号),`hello@flarepix.com` 明文暴露。不紧急,垃圾邮件多了再考虑表单化/混淆。
- 其余条目待填。
