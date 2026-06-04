# FlarePix R2 Media Workflow

## 媒体文件存储
- CDN: `https://media.flarepix.com`
- 存储: Cloudflare R2（不在 git 仓库里）
- 本地 `public/works/` 已被 `.gitignore` 排除

## CDN URL 生成
```ts
import { cdnUrl } from "@/config/cdn";
cdnUrl("/works/photo/foo.jpg")  // → https://media.flarepix.com/works/photo/foo.jpg
```

## 替换图片流程

1. **压缩图片**
   - 工具: https://squoosh.app 或 `scripts/compress-hero-images.mjs`
   - 目标大小: masonry 图片 < 80KB，AI 图片 < 50KB

2. **上传到 R2**
   - Cloudflare Dashboard → R2 → 找到对应路径 → 覆盖上传
   - 上传新文件会自动清除旧缓存

3. **验证**
   - 访问 CDN URL 确认返回 200

## 压缩脚本
- `scripts/compress-hero-images.mjs` — 压缩 hero 区域 6 张关键图片
- 输出目录: `public/works/compressed/`