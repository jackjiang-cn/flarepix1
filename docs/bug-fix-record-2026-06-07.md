# Bug Fix Record — 2026-06-07

## 1. VideoObject uploadDate 时区缺失

**发现方式：** Google Search Console 报告
**影响：** 视频富媒体搜索结果无法正确展示
**根因：** Schema 里 `uploadDate: "2026-01-15"` 只有日期，缺少时区
**修复：** 改为完整 ISO 8601：`"2026-01-15T00:00:00Z"`

| 文件 | 修改 |
|------|------|
| `src/app/layout.tsx` | `uploadDate` 加时区 |
| `src/app/services/brand-film/page.tsx` | 同上 |
| `src/app/services/ai-video/page.tsx` | 同上 |
| `src/app/services/[category]/page.tsx` | 同上 |

---

## 2. PortfolioCarousel fill image position 问题

**发现方式：** dev server log 警告
**影响：** 图片 `fill` 但父元素无 `position: relative`，图片无法正确定位
**根因：** 按钮 `button` 默认 `position: static`，与 `fill` 图片不兼容
**修复：** 给按钮加 `relative` class

```diff
- className="group aspect-[5/6] w-56 ..."
+ className="group relative aspect-[5/6] w-56 ..."
```

文件：`src/components/portfolio-carousel.tsx`

---

## 3. layout.tsx gaId 空字符串 hydration error

**发现方式：** Next.js 16 dev server 报错
**影响：** `<head>` 里出现空白文本节点导致 hydration error
**根因：** `gaId && (<>...</>)` 当 `gaId=""` 时返回 `""`（React 渲染成空白节点）
**修复：** 改用条件表达式

```diff
- {gaId && (<>...</>)}
+ {gaId ? (<>...</>) : null}
```

文件：`src/app/layout.tsx`

**备注：** 这是 Next.js 16 dev mode 新检测出的严格警告。之前版本不报错，生产 build也不受影响。如果 `.env.local` 未配置 `NEXT_PUBLIC_GA_ID` 则 `gaId=""`，此时不输出任何内容（GA4 本身就没生效）。

---

*记录日期：2026-06-07*