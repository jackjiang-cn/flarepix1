# FlarePix SEO 工作记录

> 最后更新：2026-06-04

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

## 验证清单（部署后检查）

- [ ] https://flarepix.com/about — About 页面正常
- [ ] https://flarepix.com/services/ai-video — metadata + schema 正常
- [ ] https://flarepix.com/services/brand-film — metadata + schema 正常
- [ ] https://flarepix.com/contact — 信任信号正常
- [ ] https://flarepix.com/pricing — How We Quote 页面正常
- [ ] https://flarepix.com/ai-tools — 页面内容已更新
- [ ] https://flarepix.com/faq — FAQ 扩充正常
- [ ] https://flarepix.com/blog — 3 篇新博客可见
- [ ] `npm run build` — 无错误