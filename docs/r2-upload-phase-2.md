# R2 上传清单 — Phase 2

> 生成时间：2026-06-02
> 适用变更：feature/perf-phase-2 (commit db33431)

## 重要顺序

⚠️ **必须先上传 R2，再合并 PR**。否则生产环境会 broken image（代码引用新 R2 路径但文件还没上传）。

## 需要上传的文件

### A. 压缩后的视频（19 个，覆盖原文件）

| 本地路径 | R2 路径 |
|----------|---------|
| `public/works/hero-reel.mp4` | `works/hero-reel.mp4` |
| `public/works/brand-film/brand-film-07.m4v` | `works/brand-film/brand-film-07.m4v` |
| `public/works/ai/videos/ai-video-02.mp4` | `works/ai/videos/ai-video-02.mp4` |
| `public/works/ai/videos/ai-video-04.mp4` | `works/ai/videos/ai-video-04.mp4` |
| `public/works/video/Electronics/product-video-08.mp4` | `works/video/Electronics/product-video-08.mp4` |
| `public/works/video/Electronics/product-video-09.m4v` | `works/video/Electronics/product-video-09.m4v` |
| `public/works/video/Electronics/product-video-10.m4v` | `works/video/Electronics/product-video-10.m4v` |
| `public/works/video/Kids & Toys/product-video-12.m4v` | `works/video/Kids & Toys/product-video-12.m4v` |
| `public/works/video/Kids & Toys/product-video-13.m4v` | `works/video/Kids & Toys/product-video-13.m4v` |
| `public/works/video/Kids & Toys/product-video-14.m4v` | `works/video/Kids & Toys/product-video-14.m4v` |
| `public/works/video/Kids & Toys/product-video-15.m4v` | `works/video/Kids & Toys/product-video-15.m4v` |
| `public/works/video/Home & Kitchen/product-video-02.mp4` | `works/video/Home & Kitchen/product-video-02.mp4` |
| `public/works/video/Home & Kitchen/product-video-03.m4v` | `works/video/Home & Kitchen/product-video-03.m4v` |
| `public/works/video/Sports & Fitness/product-video-04.mp4` | `works/video/Sports & Fitness/product-video-04.mp4` |
| `public/works/video/Sports & Fitness/product-video-05.m4v` | `works/video/Sports & Fitness/product-video-05.m4v` |
| `public/works/video/Sports & Fitness/product-video-07.m4v` | `works/video/Sports & Fitness/product-video-07.m4v` |
| `public/works/video/Sports & Fitness/product-video-08.m4v` | `works/video/Sports & Fitness/product-video-08.m4v` |
| `public/works/video/Others/product-video-09.mp4` | `works/video/Others/product-video-09.mp4` |
| `public/works/video/Others/product-video-13.m4v` | `works/video/Others/product-video-13.m4v` |

### B. Poster 缩略图（28 个新文件）

整个 `public/works/posters/` 目录（28 个 jpg）需要上传到 `works/posters/`。

文件清单（按字母排序）：
- `ai-video-01.jpg` (31K)
- `ai-video-02.jpg` (52K)
- `ai-video-03.jpg` (26K)
- `ai-video-04.jpg` (46K)
- `brand-film-07.jpg` (12K)
- `hero-reel.jpg` (28K)
- `product-video-01.jpg` (39K)
- `product-video-02.jpg` (29K)
- `product-video-03.jpg` (20K)
- `product-video-04.jpg` (28K)
- `product-video-05.jpg` (39K)
- `product-video-06.jpg` (45K)
- `product-video-07.jpg` (80K)
- `product-video-08.jpg` (42K)
- `product-video-09.jpg` (31K)
- `product-video-10.jpg` (23K)
- `product-video-11.jpg` (19K)
- `product-video-12.jpg` (44K)
- `product-video-13.jpg` (66K)
- `product-video-14.jpg` (62K)
- `product-video-15.jpg` (45K)

## 验证清单

上传完成后，浏览器访问以下 URL 验证（应能看到图片/视频）：

```
https://media.flarepix.com/works/posters/hero-reel.jpg
https://media.flarepix.com/works/posters/brand-film-07.jpg
https://media.flarepix.com/works/posters/ai-video-01.jpg
https://media.flarepix.com/works/posters/product-video-09.jpg
```

视频验证（应该能播放）：

```
https://media.flarepix.com/works/hero-reel.mp4
https://media.flarepix.com/works/brand-film/brand-film-07.m4v
```

## ⚠️ 缓存注意

R2 默认会缓存视频文件。`brand-film-07.m4v` 是 m4v 扩展名但内容是 mp4 容器。
如果上传后仍播放旧文件，可能需要：
- 在 R2 路径加 `?v=2` query string 强制刷新
- 或在 Cloudflare Dashboard 上 purge cache
