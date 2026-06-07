# 视频内容自动化生产流水线 — 实施记录

**制定日期：** 2026-06-07
**最后更新：** 2026-06-07（完成迁移到独立项目）

---

## 现状：已完成

### 迁移结果

已将 `scripts/video-pipeline/` 从网站仓库迁移到**独立项目** `E:\flarepix-video-pipeline\`，保持两个项目的联系。

### 最终目录结构

```
E:\flarepix\                            ← 网站仓库（git 管理）
├── src/config/blog-posts.ts ← 博客数据源（pipeline读取）
└── public/videos/                      ← 视频输出目录（pipeline 写入）
    ├── 16x9/
    ├── 9x16/
    └── 1x1/

E:\flarepix-video-pipeline\ ← 独立工具仓库（不在网站 git 里）
├── run.js ← 主入口
├── config.js                           ← 配置模板
├── step1-script.js                     ← Step 1：博客 → Claude 视频脚本
├── step2-tts.js                        ← Step 2：脚本 → ElevenLabs MP3
├── step4-compile.js ← Step 4：FFmpeg 合成 3 种尺寸
├── kling-prompts/                      ← Kling 提示词 + 用户下载的视频片段
├── logo/                               ← Logo 文件（自动从网站复制）
├── output/                             ← 临时输出（中间文件）
└── README.md
```

---

## 两个项目的联系

| 方向 | 联系 |方式 |
|------|------|------|
| Pipeline → 网站 | 读取博客数据 |绝对路径 `E:/flarepix/src/config/blog-posts.ts` |
| Pipeline → 网站 | 输出最终视频 | `E:/flarepix/public/videos/` |
| 网站 → Pipeline | Logo 文件 | 自动从 `public/logo/` 复制到 `logo/` |

---

## 代码文件

| 文件 | 功能 | 状态 |
|------|------|------|
| `run.js` | 主入口，含用户确认流程 | ✅ 完成 |
| `config.js` | API密钥配置模板 | ✅ 完成 |
| `step1-script.js` | 博客 → Claude 视频脚本 | ✅ 完成 |
| `step2-tts.js` | 脚本 → ElevenLabs MP3 | ✅ 完成 |
| `step4-compile.js` | FFmpeg 合成 3 种尺寸 | ✅ 完成 |
| `README.md` | 使用说明 | ✅ 完成 |

---

## 已修改的路径引用

| 文件 | 修改内容 |
|------|---------|
| `step1-script.js` | `BLOG_POSTS_PATH` → `"E:/flarepix/src/config/blog-posts.ts"` |
| `run.js` | `WEBSITE_ROOT` → `"E:/flarepix"`，`OUTPUT_DIR` → `"E:/flarepix/public/videos"` |
| `step4-compile.js` | `WEBSITE_ROOT` → `"E:/flarepix"`，`OUTPUT_DIR` → `"E:/flarepix/public/videos"`，`LOGO_DIR` → 本地 logo 文件夹 |

---

## 网站 .gitignore 更新

已更新 `E:\flarepix\.gitignore`，添加：

```
# Video pipeline output
public/videos/
```

同时移除了之前在 `scripts/video-pipeline/` 下的旧规则（因为 pipeline 已移出）。

---

## 流水线工作流程

```
博客文章（E:\flarepix\src\config\blog-posts.ts）
  ↓
Step 1 (Claude) → 生成视频脚本 JSON
  ↓ [用户确认脚本内容]
Step 2 (ElevenLabs) → 生成英文 TTS 配音 MP3
  ↓
Step 3 (用户手动) → 去 Kling 网站生成视频片段
  ↓ [把下载的视频放到 kling-prompts/]
Step 4 (FFmpeg) → 合成 3 种尺寸视频
                  (含配音 + 字幕 + logo 水印)
  ↓
输出到: E:\flarepix\public\videos\
```

---

## 用户选择

- **运行方式：** AI Agent 模式（我写代码，用户一键运行）
- **AI 视频生成：** 用户已有 Kling 会员（积分消耗，非 API）
- **配音：** ElevenLabs TTS（不需要用户露脸/说话）
- **脚本确认：** 每条视频生成后需用户确认再继续

---

## 待用户配置

1. **API Key 配置** — 创建 `E:\flarepix-video-pipeline\config.local.js`
   - `anthropicApiKey` — [console.anthropic.com](https://console.anthropic.com) 的 API Key
   - `elevenlabsApiKey` — [elevenlabs.io](https://elevenlabs.io) 的 API Key

2. **选择第一篇博客** — 用户待确认

---

## 使用步骤

### 第一次运行

```bash
# 1. 配置 API Key
cd E:\flarepix-video-pipeline
cp config.js config.local.js
# 编辑 config.local.js，填入 API Key

# 2. 运行流水线
node run.js ai-product-videos-cannot-be-fully-automated
```

### Step 3 手动操作（关键）

```
1. 流水线显示 Kling 提示词
2. 用户复制提示词 → 打开 https://kling.klingai.com
3. 粘贴提示词 + 上传参考图片 → 生成 → 下载
4. 文件命名：scene_0.mp4, scene_1.mp4, ...
5. 放到 E:\flarepix-video-pipeline\kling-prompts\
6. 再次运行：node run.js --continue <slug>
```

---

## 内容优先级（用户待确认顺序）

| 顺序 | 博客标题 |
|------|---------|
| 1 | Why AI-Generated Product Videos Can't Be Fully Automated |
| 2 | How We Shot a Real Amazon Product Video — Behind the Scenes |
| 3 | Why AI Product Images Convert Better in 2026 |
| 4 | Amazon Product Video Requirements: What Every Seller Needs to Know |
| 5 | Ghost Mannequin vs Flat Lay |
| 6 | How to Prepare Your Products for a Photo Shoot |

---

## 成本估算（月度）

| 工具 | 费用 |
|------|------|
| ElevenLabs | $5/月 |
| Claude API（脚本生成）| ~$5/月 |
| Kling | 用户已有积分 |
| **合计** | **~$10/月** |

---

*记录日期：2026-06-07*
*最后更新：2026-06-07（完成迁移到独立项目）*