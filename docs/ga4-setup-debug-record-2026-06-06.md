# GA4 安装调试记录

**日期：** 2026-06-06
**问题：** Google Analytics 4 迟迟无法在网站上生效
**耗时：** 约 40 分钟

---

## 调试过程

### 第 1 步：代码修改

在 `src/app/layout.tsx` 的 `<head>` 中添加了 GA4 的 gtag.js 脚本。

**第 1 版代码：**

```tsx
<head>
  <script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  />
  <script
    dangerouslySetInnerHTML={{
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
      `,
    }}
  />
</head>
```

**问题 1：** `NEXT_PUBLIC_` 环境变量在 Vercel 构建时为空，导致整个 script 标签被渲染成空值。

---

### 第 2 步：Vercel 环境变量填错

在 Vercel → Environment Variables 中，`NEXT_PUBLIC_GA_ID` 的 **Value 被错误填写为 `https://api.example.com`**，而不是真正的 Measurement ID `G-G8Y36DFMBG`。

用户花了较长时间才定位到这个问题（Value 栏显示的不是 ID，而是一个示例 URL）。

---

### 第 3 步：环境变量修改后仍不生效

修改 Value 为 `G-G8Y36DFMBG` 并 Redeploy 后，view-source 中仍然找不到 GA4 脚本。

**原因：** `process.env.NEXT_PUBLIC_GA_ID` 在构建时（`npm run build`）就已经被编译进 JS bundle 了。如果构建时环境变量为空，Vercel 构建出的静态页面中该变量就是空字符串，导致整个 GA4 脚本不渲染。

**解决：**

```tsx
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      ...
    </html>
  );
}
```

使用 `?? ""` 提供 fallback，并加 `{gaId && (...)}` 条件渲染——即使环境变量为空，页面也能正常构建，不会报错。

---

## 关键教训

### 1. `NEXT_PUBLIC_` 环境变量的编译时特性

`NEXT_PUBLIC_` 前缀的变量在 **Next.js 构建时**（`next build`）就被替换进代码了，不是在运行时。Vercel 的 Environment Variables 设置的是**运行时**环境，但 Next.js 的 server-side build 发生在部署构建阶段。

**正确的流程：**
1. 本地设置 `.env.local` 文件（含 `NEXT_PUBLIC_GA_ID=G-G8Y36DFMBG`）
2. Vercel 也设置相同的 Environment Variable
3. 每次改环境变量后必须 Redeploy 才能生效

### 2. Vercel Environment Variable 的 Value 填写

在 Vercel Dashboard 添加环境变量时，**Key** 和 **Value** 是两个独立的输入框。填 Value 时要仔细确认填的是真实值而不是示例。

### 3. 环境变量为空时的容错处理

即使环境变量未设置，页面也应该能正常构建。代码中加 fallback 避免空值导致的 JS 错误。

---

## 最终代码改动

**文件：** `src/app/layout.tsx`

在 `RootLayout` 组件的 `<head>` 中添加了 GA4 脚本，并通过条件渲染确保只有在 `NEXT_PUBLIC_GA_ID` 有值时才输出脚本。

**Commit：** `186ec11` — `fix: add fallback for GA4 env var and conditional render`

---

## 验证结果

GA4 Realtime 面板确认：
- Active users：1
- Events：page_view、session_start、first_visit 全部正常收到
- 页面标题正确匹配

---

*记录时间：2026-06-06*