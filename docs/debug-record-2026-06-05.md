# 问题记录 — 2026-06-05

记录今天发现的所有 Bug 和修复过程，供以后参考。

---

## 规则变更

### Push 确认规则（已写入 CLAUDE.md）
**规则**：commit 先执行，**不等 user 确认不 push**。等 user 说"没问题"或"OK" 之后再 `git push`。
**原因**：避免修完就 push，用户还没来得及在本地验证就被部署了。

```markdown
### Build Rules
- **Push rule**: commit first, but DO NOT push until the user confirms the local/dev page looks correct.
```

---

## Bug 1：Services 导航"Services"文字无法点击

**发现时间**：2026-06-05
**影响页面**：`/work`、`/services` 等所有页面顶部导航

**根因**：
`header.tsx` 里 "Services" 是一个 `<button>`，只触发 dropdown 开关，不跳转。用户点击文字无法进入 `/services` 页面，只能点击 dropdown 里的子菜单。

**修复**：
```tsx
// 改前：
<button onClick={() => setDropdownOpen(!dropdownOpen)}>Services</button>

// 改后：
<Link href="/services" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>Services</Link>
```

**文件**：`src/components/header.tsx`

---

## Bug 2：Services 页面 Video Production 卡片视频海报不显示

**发现时间**：2026-06-05
**影响页面**：`/services`、`/services#video-production`

**根因**：
`next/image` 的 `fill` 属性需要父容器有 `position: relative`。`<Link>` 包裹的卡片没有 `relative`，导致 `Image fill` 无法计算尺寸，图片不显示。

**修复**：
```tsx
// 改前：
<Link className="group block rounded-2xl ... overflow-hidden ... hover:border-black/[0.15]">

// 改后：
<Link className="group relative block rounded-2xl ... overflow-hidden ... hover:border-black/[0.15]">
```

**文件**：`src/app/services/page.tsx`

---

## Bug 3：Services 页面 Photography 区块卡片图片不显示

**发现时间**：2026-06-05
**影响页面**：`/services#product-photography`

**根因**：
Photography 区块用的是 CSS `columns` masonry 布局（`columns-2 sm:columns-3`），这个布局里图片高度不固定，`Image fill` 在 masonry 布局下无法正确计算尺寸。

**修复**：
```tsx
// 改前：
<Image src={cdnUrl(previewImg)} alt={cat.label} fill className="object-cover" loading="lazy" />

// 改后：
<Image src={cdnUrl(previewImg)} alt={cat.label} width={400} height={267} className="object-cover" loading="lazy" />
```

**文件**：`src/app/services/page.tsx`

---

## Bug 4：brand-film 视频卡片缩略图为空白

**发现时间**：2026-06-05
**影响页面**：`/services/brand-film`

**根因**：
`posterFor()` 从视频路径生成 poster 文件名：
- 视频：`/works/brand-film/brand-film-01.m4v`
- 生成的 poster：`/works/posters/brand-film-01.jpg`
- **实际情况**：R2 上 `brand-film-01.jpg` 不存在，只有 `brand-film-07.jpg`

所以 6 个视频卡片都显示空白 poster。

**修复**：
方案 A（临时）：6 个视频共用已有的 `brand-film-07.jpg`
```tsx
// brandFilms 加上 poster 字段：
{ src: "/works/brand-film/brand-film-01.m4v", title: "Brand Film 01", poster: "/works/posters/brand-film-07.jpg" },
```
方案 B（正确）：上传各自的 poster 后改为各自路径
```tsx
// posterFor() 生成的是 brand-film-01.jpg（1-6 各自对应）
// GalleryLightbox 增加 poster 字段支持：
type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt?: string;
  title?: string;
  poster?: string;  // ← 新增
};
// 使用时：item.poster ?? posterFor(item.src)
```

**修复文件**：
- `src/components/gallery-lightbox.tsx` — 新增 `poster` 字段
- `src/app/services/brand-film/page.tsx` — 传入各自的 poster

**生成 poster 的命令**（FFmpeg 从视频提取首帧）：
```bash
for i in 01 02 03 04 05 06; do
  ffmpeg -i "public/works/brand-film/brand-film-$i.m4v" \
    -ss 00:00:01 -vframes 1 \
    "public/works/posters/brand-film-$i.jpg" -y
done
```

**poster 文件路径约定**：
```
/works/posters/brand-film-01.jpg  ← brand-film-01.m4v 的首帧
/works/posters/brand-film-02.jpg  ← brand-film-02.m4v 的首帧
/works/posters/brand-film-03.jpg  ← brand-film-03.m4v 的首帧
/works/posters/brand-film-04.jpg  ← brand-film-04.m4v 的首帧
/works/posters/brand-film-05.jpg  ← brand-film-05.m4v 的首帧
/works/posters/brand-film-06.jpg  ← brand-film-06.m4v 的首帧
```

---

## Bug 5：what-we-do.tsx 图片/视频容器缺少 position:relative

**发现时间**：2026-06-05
**影响页面**：`/`、`/about`

**根因**：
`what-we-do.tsx` 的 image 父容器没有 `position: relative`，`next/image fill` 无法定位。

**修复**：
```tsx
// 改前：
<div className={`overflow-hidden rounded-2xl ... ${item.kind === "video" ? "aspect-video" : "aspect-[4/3]"} ...`}>

// 改后：
<div className={`relative overflow-hidden rounded-2xl ... ${item.kind === "video" ? "aspect-video" : "aspect-[4/3]"} ...`}>
```

**文件**：`src/components/what-we-do.tsx`

---

## Bug 6：Homepage video 背景视频可访问性问题

**发现时间**：2026-06-05
**影响页面**：`/` Hero 区块

**问题**：
背景装饰视频（autoplay + opacity:0.3）没有 `aria-hidden`，screen reader 可能尝试播报"视频"。

**建议修复**：
```tsx
<video
  autoPlay loop muted playsInline
  preload="none"
  aria-hidden="true"
  disablePictureInPicture
  poster={cdnUrl("/works/posters/hero-reel.jpg")}
  className="h-full w-full object-cover opacity-30"
>
```

---

## 通用原则

### `next/image fill` 使用规范
- **需要父容器有 `position: relative` 或 `position: absolute`**
- **`fill` 不能用于 masonry 布局**（高度不固定的 columns 布局）—— masonry 用显式 `width/height`
- **`fill` 不能用于 CSS columns 布局** — 必须用显式宽高

### poster 文件名生成规则
`posterFor()` 从视频路径生成 poster：
```js
// 例如：
"/works/brand-film/brand-film-01.m4v" → "/works/posters/brand-film-01.jpg"
"/works/ai/videos/ai-video-01.mp4" → "/works/posters/ai-video-01.jpg"
"/works/video/Electronics/product-video-09.m4v" → "/works/posters/product-video-09.jpg"
```

**在添加新视频时**，必须同步上传对应的 poster 到 R2，且路径必须与 `posterFor()` 生成的一致。R2 poster 必须存在于以下路径：
```
/works/posters/[视频文件名去除扩展名].jpg
```

### 本地开发 CDN 图片不显示
`cdnUrl()` 返回 `https://media.flarepix.com/...`，本地开发时 CDN 请求不加载是**正常行为**，只有 Vercel 部署后 CDN 图片才会显示。

**验证 CDN 文件是否存在的正确方式**：在 Vercel 部署后，在线上 URL 测试，不要在 `localhost` 测试。

---

*记录时间：2026-06-05*
