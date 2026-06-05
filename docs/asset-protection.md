# FlarePix 资产保护手册

> 创建日期：2026-06-04
> 最后更新：2026-06-04

---

## 核心原则

资产在低价值阶段建立保护习惯，成本最低。等资产大了再补救，成本高得多。

---

## 1. 媒体资产保护

### 记录清单（最优先）

每次上传新文件到 R2，顺手在清单里加一行：

| 文件名 | 上传日期 | 用途 | R2 路径 |
|--------|----------|------|---------|
| product-video-01.m4v | 2026-01 | AI Video 页面示例 | /works/video/Electronics/ |
| ... | | | | |

表格位置：`e:\flarepix\docs\media-assets.md`（可在 Git 中追踪）

### 备份策略

| 阶段 | 备份方式 | 频率 |
|------|----------|------|
| 现在（资产少） | 本地 NAS 或外接硬盘 + R2 | 每季度一次全量同步 |
| 1-2 年后（资产多） | 冷存储 + 增量备份 | 每月增量，每季度全量 |

### R2 版本控制

Cloudflare R2 支持对象版本控制（Object Versioning）：
- 开启后每次覆盖会保留历史版本
- 适合防止误操作覆盖

操作：R2 Dashboard → Bucket → Management → Versioning → Enable

---

## 2. SEO 权重保护

### Vercel Rollback Point

每次做重大改动之前，在 Vercel Dashboard 创建 rollback point：

1. Vercel Dashboard → Deployments
2. 找到当前正常的 deployment
3. 点 "..." → Create Rollback
4. 改动完成确认正常后，可删除无用的 rollback point

### Rollback 操作（出问题时）

Vercel Dashboard → Deployments → 问题 deployment → "..." → Create Rollback

### SEO 基线记录

趁现在，在 Google Search Console 保存截图：
- 索引页面列表
- 关键字排名
- 曝光/点击数

保存位置：`e:\flarepix\docs\seo-baseline-2026-06.md`

以后如果更新导致排名下降，可以对比参照。

---

## 3. 代码保护

### 每次 commit 前

1. 确认 `npm run build` 通过
2. 检查是否有 URL 结构变更（可能影响 SEO）
3. 重大功能用 feature branch

### 破坏性改动之前

创建 rollback point（见上），然后再操作。

### Git commit 记录格式

```
类型: 简短描述

详细说明（如果有）
```

类型前缀：feat / fix / docs / chore / perf

---

## 4. 内容备份

博客内容在 `src/config/blog-posts.ts`（已在 Git 中）。

草稿/未完成内容备份：`e:\flarepix\docs\blog-drafts.md`

---

## 5. 长期保护计划

### 阶段一：现在（低资产）
- [x] 建立媒体清单
- [x] 确认 Vercel rollback 操作流程
- [ ] 导出 SEO 基线截图
- [ ] 草稿内容本地备份

### 阶段二：1年后（资产增长）
- [ ] 开启 R2 对象版本控制
- [ ] 建立本地 + 异地双备份
- [ ] 配置 GitHub Actions 自动备份配置到 Gitee

### 阶段三：规模化后
- [ ] 媒体资产管理系统（数字资产管理）
- [ ] CI/CD 自动化备份
- [ ] 异地冷存储

---

## 关键联系人

| 用途 | 联系方式 |
|------|----------|
| Vercel 技术支持 | vercel.com/support |
| Cloudflare R2 | dash.cloudflare.com |
| 域名 DNS | 你的域名注册商 |
| 紧急回滚 | Vercel Dashboard |

---

## 快速参考

### Vercel Rollback
Dashboard → Deployments → 选择 deployment → ... → Create Rollback

### R2 文件上传
Cloudflare Dashboard → R2 → 选择 Bucket → Upload

### SEO 基线导出
Google Search Console → 截图保存到本地 docs/ 目录

### 本地备份
```bash
# 备份 blog-posts.ts 和配置文件
cp src/config/blog-posts.ts docs/backup/
cp src/config/contact.ts docs/backup/
```

---

*此文件应在每次重要更新后检查是否需要更新。*