# FlarePix SEO 工作记录 — 待部署

> 最后更新：2026-06-04

---

## 当前 git 状态

**分支：** main
**本地领先 origin/main 3 个 commit：**
- `65ec2f0` — Day 1-3 SEO 修复（最新，尚未推 GitHub）
- `e31beae` — docs: clean up CLAUDE.md
- `479e502` — docs: add R2 media upload workflow guide

**未提交的改动（不包含在上面的 commit）：**
- `.gitignore`
- `package-lock.json`
- `package.json`
- `src/app/layout.tsx`
- `src/app/services/ai-imagery/page.tsx`

---

## 待推 GitHub 的内容（commit 65ec2f0）

修改的文件：

### 1. `src/app/robots.ts`
- 删除 `crawlDelay: 1`（影响 Google 爬虫抓取速度）

### 2. `src/app/services/ai-video/page.tsx`
- metadata 重写：强调"专业团队生成 AI 视频，不是自助工具"
- 添加 OpenGraph + Twitter Card
- 添加 VideoObject schema

### 3. `src/app/services/brand-film/page.tsx`
- metadata 重写：强调 Hybrid 工作流（真人拍摄 + AI 后期）
- 添加 OpenGraph + Twitter Card
- 添加 VideoObject schema

### 4. `src/app/services/[category]/page.tsx`
- 视频分类页添加 VideoObject schema（条件渲染，仅视频分类）
- 添加 OpenGraph + Twitter Card

### 5. `src/app/about/page.tsx`（新建）
- About 页面：团队背景 + Hybrid 工作流 + 真实案例品类（电子秤、儿童玩具、抽纸巾）
- 5 步工作流程图
- 添加 AboutPage schema

### 6. `src/config/contact.ts`
- 导航添加 "About" 链接

---

## 部署方式

**Vercel 自动部署**（已连接到 GitHub 仓库 `jackjiang-cn/flarepix1`）

触发方式（任选其一）：
1. **GitHub PR 手动合并**：创建 feature 分支 → 推 GitHub → GitHub 网页创建 PR → 手动合并 → Vercel 自动部署
2. **Vercel Dashboard 手动 Redeploy**：连上 VPN 后在 Vercel Dashboard 点击 Redeploy

---

## 部署后验证

1. 访问 https://flarepix.com/about — About 页面正常显示
2. 访问 https://flarepix.com/services/ai-video — metadata + OG + schema 正常
3. 访问 https://flarepix.com/services/brand-film — metadata + OG + schema 正常
4. 运行 `npm run build` — 无错误

---

## 下一步（Day 4 起，可离线继续）

- Day 18：内部链接（blog → service pages）
- Day 19：Blog 分类过滤 UI
- Day 22-23：next/image 迁移
- Day 25：Google Search Console
- Day 27：PageSpeed 审计
- Day 28：Blog Post D — "10 Questions Before Hiring a Video Studio"
- Day 29：全站 404 检查
- Day 30：月度总结报告

### 内容质量改进（待素材）
Blog Posts A/B/C 需要重写方向：
- Post A：围绕"怎么判断 AI 视频质量"、"该问供应商什么问题"展开
- Post B：加入 Hybrid 局限性、真实案例细节、自己使用 AI 工具的 failure case
- Post C：揭露"没有 studio 会主动告诉你的"采购陷阱、Amazon video reject 真实原因

等 GitHub 连通后，统一 push 到 GitHub 触发 Vercel 部署。

---

## 网络问题说明

- **GitHub (github.com)**：国内网络完全不可达（443 连接超时）
- **Gitee (gitee.com)**：正常，已推送最新 commit
- **解决方案**：需要 VPN 或代理才能 push 到 GitHub