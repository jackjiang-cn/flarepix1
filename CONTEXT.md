# FlarePix — 项目记忆

> 最后更新：2026-06-04

---

## 核心事实（长期不变）

### 业务模型
- **产品**：专业视频制作工作室，AI 是工具不是产品
- **主要盈利**：Amazon 产品视频 + Brand Film（真人拍摄）
- **增长区**：AI 视频（需要专业团队生成，质量可控）
- **目标市场**：US + Europe，英文，Amazon 卖家

### USP（差异化定位）
> "Professional video production studio using AI tools — not an AI tool you're using yourself."

- AI 图片可以自学（无壁垒）→ 引流用
- AI 视频不能自学（需要专业团队）→ 真正壁垒
- 竞品弱点：hi-light.ai 宣称"一键 AI 视频"，实际做不到

### 竞品分析
| 竞品 | 核心弱点 | FlarePix 打法 |
|------|----------|---------------|
| productvideostudio.com | 无 AI、无差异化 | 先占 `amazon product video production` 词 |
| hi-light.ai | 定位"一键 AI"，实际做不到 | 公开说明"AI 视频需要专业团队"的真相 |
| neverframe.com | AI-first，无真实拍摄能力 | 强调 Hybrid 工作流，真人+AI 都有 |
| vidico.com | 非亚马逊垂类 | 专注亚马逊卖家，更精准 |

### 真实案例品类
- 电子秤（厨房秤、体重秤）
- 儿童玩具
- 抽纸巾/纸巾产品

### 联系人配置（src/config/contact.ts）
- 电话：+86-156-6682-0406
- 地址：Qingdao, Shandong, China
- 邮箱：hello@flarepix.com

---

## 目标关键词矩阵

| 优先级 | 关键词 | 对应页面 | 竞品占位情况 |
|--------|--------|----------|-------------|
| P0 | `amazon product video production` | AI Video + Brand Film | 基本空白 |
| P0 | `amazon product video` | AI Video 页面 | productvideostudio.com 弱 |
| P1 | `ai product video amazon` | AI Video 页面 | hi-light.ai 有但误导 |
| P1 | `brand film ecommerce` | Brand Film | neverframe.com 占位 |
| P2 | `professional video production studio` | About + Homepage | 空白 |
| P2 | `product photography studio amazon` | Photography 分类页 | 有机会 |
| P3 | 信息型博客词 | Blog | 4 篇已有，内容方向需调整 |

---

## 技术栈

- Next.js 16.2.6（App Router）
- Tailwind CSS v4 + CSS @theme
- 内联 SVG 图标（无 icon 库）
- 媒体在 Cloudflare R2（CDN：`https://media.flarepix.com`）
- 本地 `public/works/` 不 push 到 Git（.gitignore）

---

## 营销执行约束

| 条件 | 数值 |
|------|------|
| 可用时间 | 54 小时/周（9h × 6天）|
| 每月预算 | $500 |
| 目标 | 获取客户询盘 |
| 已有资源 | 视频团队、无邮箱列表 |
| 广告预算 | $500/月 |

### 工具清单
| 工具 | 月费 | 用途 |
|------|------|------|
| Apollo.io | $49 | LinkedIn + 邮箱挖掘 |
| Google Ads | $500/月 | 付费搜索 |
| Ubersuggest | 免费 | 竞品关键词 |
| Hunter.io | 免费 | 域名邮箱验证 |
| Canva | 免费 | 制作外展图片素材 |
| YouTube | 免费 | 视频内容平台 |

### 三条执行线
```
第一优先线（付费）：Google Ads — 第1天启动
第二优先线（外展）：LinkedIn + cold email — 第2天启动
第三优先线（内容）：YouTube + blog — 第3天启动
```

---

## 当前进度

### 已完成（待部署）
- ✅ Day 1：robots.ts — 删除 crawlDelay
- ✅ Day 1：AI Video 页面 — metadata 重写 + OG + Twitter + VideoObject schema
- ✅ Day 1：Brand Film 页面 — metadata 重写 + OG + Twitter + VideoObject schema
- ✅ Day 2：视频分类页 — VideoObject schema
- ✅ Day 3：About 页面新建（团队背景 + Hybrid 工作流 + 案例品类 + 5步流程图）
- ✅ Day 3：导航添加 About 链接
- ✅ Day 4：Contact 页面 — 加地址 + 电话 + 邮箱（信任信号）
- ✅ Day 5：视频分类页内容加厚（Gallery 后增加"适用场景"段落）
- ✅ Day 6：Blog Article schema — publisher.logo + dateModified
- ✅ Day 8-9：AI Video 页面 — "什么是 AI 产品视频"段落重写
- ✅ Day 9-10：Brand Film 页面 — USP 区块重写
- ✅ Day 10：FAQ 扩充 — 增加 4 个问题（AI vs 真人拍摄区别、人工审核、Hybrid 工作流）
- ✅ Day 11：Homepage — Hero 下方信任信号区块（电话 + 邮箱 + 地址 + 案例品类）
- ✅ Day 12：AI Tools 页面 — 说明工具是内部使用，非自助平台
- ✅ Day 13：Pricing 页面 — 改成"如何报价"，去掉套餐表，改成定制化报价说明
- ✅ Day 15：Blog Post A — "Why AI-Generated Product Videos Can't Be Fully Automated"
- ✅ Day 16：Blog Post B — "Behind the Scenes: Hybrid Production Process"
- ✅ Day 17：Blog Post C — "Amazon Product Video Requirements Guide"

### 内容质量待提升（暂停中）
- ⏸ Blog Posts A/B/C — 需要增加真实素材、数据来源、第三方引用，减少 AI 味儿；内容方向调整为"让买家变聪明"而非"宣传 FlarePix"

### 待完成
- ⏳ Day 18：内部链接（blog → service pages）
- ⏳ Day 19：Blog 分类过滤 UI
- ⏳ Day 22-23：next/image 迁移
- ⏳ Day 24：OG Image 质量检查
- ⏳ Day 25：Google Search Console
- ⏳ Day 27：PageSpeed 审计
- ⏳ Day 28：Blog Post D — "10 Questions Before Hiring a Video Studio"
- ⏳ Day 29：全站 404 检查
- ⏳ Day 30：月度总结报告

---

## 营销 KPI（第一个月目标）

| 指标 | 目标 |
|------|------|
| Google Ads 点击 | 80-120 |
| Google Ads 询盘 | 3-5 |
| LinkedIn 私信发送 | 50 |
| LinkedIn 回复率 | 10-15% |
| Cold email 发送 | 30 |
| Cold email 打开率 | 30%+ |
| Cold email 回复率 | 5-8% |
| 有效询盘总数 | 8-15 |
| 成交 | 1-2 |

### 询盘转化流程
```
点击 Ad / 收到回复
    ↓
24h 内回复（邮件或 LinkedIn）
    ↓
安排 15-min Zoom 初步沟通
    ↓
发送报价（根据项目复杂度定价）
    ↓
2 轮跟进（48h 内 + 1 周后）
    ↓
成交或归档（记录到 Sheet）
```

---

## GitHub 部署状态

- **当前问题**：国内网络无法访问 GitHub（443 超时），Gitee 正常
- **已推送**：Gitee（`https://gitee.com/jianglaosi/flarepix.git`）
- **待推送**：GitHub（`https://github.com/jackjiang-cn/flarepix1.git`）
- **触发方式**：开 VPN 后 push 到 GitHub → Vercel 自动部署
- **待部署 commit**：`65ec2f0` — Day 1-3 SEO 修复

---

## 待记录事项

- [ ] 社交媒体账号（LinkedIn Company Page、YouTube Channel）待创建
- [ ] Apollo.io 账号待开通
- [ ] Google Ads 账号待开通
- [ ] 案例素材待上传到 R2