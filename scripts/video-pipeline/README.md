# FlarePix Video Pipeline

将博客文章自动转化为 YouTube/TikTok/LinkedIn 营销视频。

## 工作流程

```
博客文章 → Step 1 (Claude) → 视频脚本
         ↓ [你确认]
  Step 2 (ElevenLabs) → TTS 配音 MP3
         ↓
  Step 3 (你操作 Kling) → 生成视频片段
         ↓
  Step 4 (FFmpeg) → 合成 3 种尺寸视频
                  16:9 (YouTube)
                   9:16 (TikTok/Shorts)
                   1:1 (LinkedIn/IG)
```

## 快速开始

### 1. 配置文件

```bash
cp scripts/video-pipeline/config.js scripts/video-pipeline/config.local.js
```

编辑 `config.local.js`，填入 API Key：

```js
module.exports = {
  anthropicApiKey: "sk-ant-api03-xxxx",      // console.anthropic.com
  elevenlabsApiKey: "xxxx",                  // elevenlabs.io
  elevenlabsVoiceId: "JBFqnCBsdWDwmVDXI8z8", // 可选，有默认值
};
```

### 2. 设置环境变量（备选）

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-xxxx
export ELEVENLABS_API_KEY=xxxx
```

### 3. 运行

```bash
cd scripts/video-pipeline
node run.js --list          # 查看可用博客 slug
node run.js <slug>          # 运行完整流水线
node run.js --status <slug> # 查看状态
```

**示例：**
```bash
node run.js ai-product-videos-cannot-be-fully-automated
```

## 流水线会做什么

|步骤 | 操作 | 你的动作 |
|------|------|---------|
| Step 1 | Claude读取博客内容 → 生成视频脚本 | 确认脚本内容 |
| Step 2 | ElevenLabs 生成英文配音 MP3 | 无 |
| Step 3 | 显示 Kling 提示词 | 去 Kling 网站生成视频片段，下载放到 `kling-prompts/` |
| Step 4 | FFmpeg 合成 3 种尺寸视频 | 无 |

## Step 3详细操作（关键）

Kling 视频需要你手动生成：

1. 流水线运行完后，`kling-prompts/` 目录里会有提示词文件
2. 打开 `kling-prompts/ai-product-videos-cannot-be-fully-automated.kling-prompts.txt`
3. 每次取一段提示词 → 打开 https://kling.klingai.com → 粘贴 → 生成 → 下载
4. 文件命名：`scene_0.mp4`、`scene_1.mp4`、`scene_2.mp4` ...
5. 放到 `scripts/video-pipeline/kling-prompts/`
6. 再次运行：`node run.js --continue <slug>`

**注意：** Kling 是会员积分制，每次生成消耗积分。每个片段 5-10 秒。

## 输出文件

```
scripts/video-pipeline/output/
├── 16x9/ai-product-videos-cannot-be-fully-automated.mp4  ← YouTube
├── 9x16/ai-product-videos-cannot-be-fully-automated.mp4  ← TikTok
└── 1x1/ai-product-videos-cannot-be-fully-automated.mp4 ← LinkedIn
```

每个视频包含：TTS 配音 + 字幕 + FlarePix logo 水印。

## 工具要求

| 工具 | 安装方式 |
|------|---------|
| FFmpeg | `winget install FFmpeg` (Windows) / `brew install ffmpeg` (Mac) |
| Node.js | 已有项目环境 |

验证 FFmpeg：`ffmpeg -version`

## 可用博客列表

运行 `node run.js --list` 查看所有 slug。

## 故障排除

**Step 1 卡住 / API错误**
→ 检查 `ANTHROPIC_API_KEY` 是否正确

**Step 2 没有声音**
→ 检查 `ELEVENLABS_API_KEY` 是否有效；检查信用卡是否支持国际支付

**Step 4 报错 "No valid video clips"**
→ 检查 `kling-prompts/` 里的文件名是否是 `scene_0.mp4`、`scene_1.mp4`...

**FFmpeg 未找到**
→ Windows: `winget install GyanDotNet.FFmpeg` 然后重启终端