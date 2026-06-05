# FlarePix SEO 工作记录

> 最后更新：2026-06-05

---

## 当前 git 状态

**分支：** main
**已推送 GitHub：** `94b792c`

**未提交的改动（不影响网站）：**
- `.gitignore`
- `package-lock.json`
- `package.json`
- `KEYWORD-RESEARCH.md`
- `SEO-AUDIT-REPORT.md`
- `scripts/`

**未推送的文档（不影响网站）：**
- `CONTEXT.md` — 项目记忆（本地文件）
- `DEPLOYMENT-RECORD.md` — 本文件
- `docs/priority-plan-2026-06-05.md` — 优先工作任务策划报告

---

## GitHub 推送历史（已部署）

| Commit | 内容 | 日期 |
|--------|------|------|
| `94b792c` | layout.tsx 更新 | 2026-06-04 |
| `95313e3` | Day 5-17：SEO + 内容 + 信任信号 + 博客初稿 | 2026-06-04 |
| `65ec2f0` | Day 1-3：robots.ts + AI Video + Brand Film + About + 导航 | 2026-06-04 之前 |

---

## 已部署的改动清单（commit 95313e3）

### Day 4：Contact 页面
- 电话 + 邮箱 + 地址信任信号（3 列 grid）

### Day 5：视频分类页
- Gallery 后增加"适用场景"段落（4 用例卡片，视频/照片各自一套）

### Day 6：Blog Article schema
- `publisher.logo` + `dateModified` 补全

### Day 8-9：AI Video 页面
- 重写"What is AI product video"段落，打自助式 AI 工具弱点
- 强调 human QC layer 是核心差异

### Day 9-10：Brand Film 页面
- 重写"Why the hybrid approach"段落，对比 full-production vs AI-only 各自弱点
- 强调"AI feel"识别问题

### Day 10：FAQ 扩充
- 新增 4 题：AI look 问题、人工审核、Hybrid 工作流、AI vs Brand Film 区别

### Day 11：Homepage
- Hero 下方新增 TrustSignals 区块（电话 + 邮箱 + 地址 + 案例品类）

### Day 12：AI Tools 页面
- 标题改为"AI Production Tools"
- 说明工具是内部使用，非自助平台
- 移除"Try AI tools" CTA

### Day 13：Pricing 页面
- 标题改为"How We Quote"
- 移除固定套餐表，改成 4 个定制化报价因素说明

### Day 15-17：Blog Posts A/B/C（初稿，内容待提升）
- Post A：Why AI-Generated Product Videos Can't Be Fully Automated
- Post B：How We Shot a Real Amazon Product Video: Behind the Scenes
- Post C：Amazon Product Video Requirements: What Every Seller Needs to Know

---

## claude-seo 插件决策记录

**日期：** 2026-06-05

**插件：** claude-seo（GitHub: agricidaniel/claude-seo）
- 25 个子技能 + 18 个子代理 + 8 个可选 MCP 扩展
- 核心命令：audit / page / technical / content / schema / geo / sitemap / images 等 22 个

**决策：** 暂不安装

**原因：**
1. 核心功能与现有 skill（seo-audit / schema / ai-seo / content-strategy）高度重叠
2. 当前阶段（Day 1-30 SEO 建设）不需要 backlink 分析、drift 监控、cluster 聚类等高级功能
3. 安装有额外依赖成本（Python 3.10+、PowerShell 脚本）

**未来安装条件（满足任一即可）：**
- 开始系统性做外链建设（需要 backlink 分析 + 有毒链接检测）
- 需要 SEO 漂移监控（drift baseline/compare）
- 关键词库规模足够大，需要语义主题聚类（cluster）
- 主动生产竞品对比页（"X vs Y" 页面）
- GSC/GA4/PageSpeed API 集成监控需求

**参考文档：**
- GitHub: https://github.com/AgriciDaniel/claude-seo
- 安装命令已保存在本文件备注

---

## 待完成

### 高优先级
- Day 18：内部链接（blog → service pages）— relatedServices 已配，实际已包含
- Day 19：Blog 分类过滤 UI
- Day 22-23：next/image 迁移
- Day 27：PageSpeed Insights 移动端审计
- Day 28：Blog Post D — "10 Questions Before Hiring a Video Studio"
- Day 29：全站 404 检查
- Day 30：月度总结报告

### 内容质量改进（暂停中，需素材）
Blog Posts A/B/C 底子已有，需要真实素材才能变专业：
- **Post A**：加入真实 AI 工具 failure case、供应商选择问题清单
- **Post B**：加入 Hybrid 局限性说明、你自己用 AI 工具的观察
- **Post C**：揭露采购陷阱、Amazon video reject 真实原因、报价隐藏收费

---

## 部署方式

**Vercel 自动部署** — 已连接到 GitHub `jackjiang-cn/flarepix1`

Push 到 GitHub main 分支后 Vercel 自动部署（约 1-2 分钟）。

---

## P0 重定向问题处理记录（2026-06-05）

### 问题描述
HTTP + HTTPS + www 三个版本同时存在，需要配置 301 重定向统一到 https://flarepix.com

### 已完成
- DNS 已迁移到 Cloudflare，flarepix.com 和 www.flarepix.com 均已设为 Proxied 状态
- next.config.ts 已修改：删除了 www→non-www 重定向（避免与 Cloudflare 规则冲突导致循环），只保留 HTTP→HTTPS 重定向

### 遗留问题
- 需要 Cloudflare 侧删除或关闭 "Redirect from WWW to root" 规则，只保留 HTTP→HTTPS 重定向
- Vercel 自动处理 HTTP→HTTPS，Cloudflare 处理 www→non-www，两边各司其职不重叠
- 临时解决：先关闭 Cloudflare 的 "Redirect from WWW to root" 规则

### next.config.ts 当前配置（2026-06-05 更新）
只配置了 HTTP→HTTPS 重定向，注释说明了 Cloudflare 负责 www→non-www

### 验证方式
访问以下 URL 应该都最终跳转到 https://flarepix.com：
- http://flarepix.com → https://flarepix.com
- https://www.flarepix.com → https://flarepix.com
- http://www.flarepix.com → https://flarepix.com

---

## GSC 数据诊断记录（2026-06-05）

### 索引状态

| 页面 | 状态 | 说明 |
|------|------|------|
| https://flarepix.com/ | ✅ 已索引 | 6月4日抓取，canonical 正确 |
| https://flarepix.com/blog/amazon-product-video-requirements-guide | ✅ 已索引 | 通过 sitemap 发现 |
| /services/ai-video | ❌ 发现但未索引 | sitemap 有，但尚未抓取 |
| /services/brand-film | ❌ 完全未知 | sitemap 未检测到，Google 尚未爬取 |
| 其他服务页 /about /contact 等 | ❌ 尚未索引 | 等待 Google 爬取 |

### 发现的问题

1. **Soft 404 已排除** — 首页标记为 Soft 404，实际已正常（数据延迟）
2. **HTTP + HTTPS + www 三版本同时存在** — 需要配置 301 重定向
3. **Canonical N/A** — 服务页 metadata 中 alternates.canonical 可能有配置问题，待查
4. **垃圾外链** — kabarwaykanan.com 链接农场，已知悉，无需处理
5. **0 自然搜索点击** — 正常，新站 + 核心词尚未建立排名

## 更新记录（2026-06-05 下午）

### 今天完成的工作
- ✅ P0-2 重定向循环问题解决：删除了 next.config.ts 中的 www→non-www 规则，Cloudflare 侧也删除了对应规则
- ✅ P1-1 Organization schema 增强（添加了 PostalAddress）
- ✅ P1-2 FAQPage schema — 已存在，无需修改
- ✅ P1-3 HowTo schema — 已添加到 AI Video + Brand Film 页面
- ✅ P1-4 BreadcrumbList schema — 已添加到博客文章页
- ⏳ GSC 索引请求 — 配额超限，明日继续（每天 2-3 个 URL）
- ⏳ schema 改动已 commit，待网络恢复后 push 到 GitHub

### 待推送（已 commit，GitHub 网络问题暂停）
- `src/app/services/ai-video/page.tsx` — HowTo schema
- `src/app/services/brand-film/page.tsx` — HowTo schema
- `src/app/blog/[slug]/page.tsx` — BreadcrumbList schema
- `src/app/layout.tsx` — Organization schema 增强

### 新发现的严重问题
1. **视频 416 错误** — R2 上的视频文件可能不支持 Range Request，需要检查具体文件和 Cloudflare Stream 配置
2. **网站无任何流量渠道** — Google Ads / LinkedIn 外展 / YouTube 全部未启动

### 经验教训
- P0-2 重定向花了太多时间，原因是 Cloudflare + Vercel 两边同时配置冲突，应该先规划架构再操作
- GSC 索引请求应第一天就做，越早越好，现在服务页拖了 2 周还没索引
- 没有流量渠道的短期计划：SEO 需要 3-6 个月，但除了 Google Ads 没有启动任何获客渠道
- 博客内容质量不够，没有真实数据，Google 看到薄内容会伤害排名
- 视频文件状态未知，416 错误直接影响用户体验和询盘转化

---

## 立即行动项（2026-06-06 继续）

- [ ] GSC 分散请求索引：每天 2-3 个 URL，分 2 天完成 5 个核心页
- [ ] 网络恢复后推送 schema 改动到 GitHub
- [ ] DevTools Network 定位视频 416 错误
- [ ] Google Ads 开通 + 配置核心关键词
- [ ] LinkedIn / Apollo 外展开始
- [ ] Blog Posts A/B/C 内容加厚