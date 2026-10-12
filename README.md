# Modular Markdown Site — 業務員版

給業務員（保險、房仲、理財顧問…）的個人網站系統。**改 Markdown 就更新網站**，不用碰程式碼。

展示站：https://modular-markdown-site-sales.brown1dawn.workers.dev/（虛構人物「林建宏」示範內容）

## 設計概念：印信

紙墨為底、一印硃砂。暖米紙 `#f6f3ea`、暖墨 `#1e1b15`、硃砂印紅 `#a33327`——沉穩、可信，和市面上常見的 AI 模板（漸層、玻璃擬態、紫藍色）徹底拉開距離。

標誌性元素：
- **印章**：硃砂紅方印＋姓氏，hero 與頁尾都有，像用印落款
- **直式文字**：hero 旁的「誠信為本．專業陪伴」直書
- **拱形肖像框**：溫潤、不呆板
- **細線＋大留白**：印刷品的剋制感

## 架構

```
content/site/{zh,en}/*.md   ← 全部文案在這裡（8 個區塊 × 中英）
        │  scripts/build-content.mjs（prebuild 自動執行）
        │    檢查 frontmatter 必填欄位、圖片路徑、同步圖片、產生 manifest
        ▼
Vite + React                 ← 讀取編譯產物，輸出靜態站
        ▼
Cloudflare Workers           ← 純靜態資源託管（SPA fallback）
```

**單一管線**：只有 `pnpm run build` 一條路徑，沒有第二套 renderer 會漂移。

## 使用者工作流（給業務員／客戶看的版本）

1. **改文字**：在 GitHub 上打開 `content/site/zh/`（中文）或 `content/site/en/`（英文），點檔案、按鉛筆圖示編輯、Commit。內文用 Markdown；標題、服務、見證等結構化資料寫在檔案上方的 frontmatter（YAML），欄位說明見 `FORMAT.md`。
2. **換照片**：把照片拖進 `content/images/`（建議 800×1000 px，取名 `portrait.jpg`），再到 `hero.md` 把 `portrait: ""` 改成 `portrait: "portrait.jpg"`。詳細步驟見 `content/images/README.md`。
3. **等部署**：Cloudflare Workers Builds 偵測到 push 會自動 `pnpm run build`＋部署，約一分鐘後上線。

> 編譯器會做基本檢查：缺檔案、缺 frontmatter 欄位、`portrait` 指向不存在的圖片，build 會直接報錯，不會讓破圖上線。

## 本地開發

```bash
pnpm install
pnpm run dev        # 先編譯內容，再起 Vite dev server（http://localhost:3000）
pnpm run build      # 內容編譯＋正式建置 → dist/public
pnpm run check      # TypeScript 型別檢查
pnpm run deploy     # 建置＋部署到 Cloudflare Workers
```

## 聯絡我

「聯絡我」頁有三張聯絡卡：**電話**（`tel:` 直接撥打）、**LINE**（顯示 ID，點了開 LINE）、**信箱**（`mailto:`）。聯絡資訊全在 `site.json` 的 `contact`：`phone`／`phoneHref`／`lineId`／`lineHref`／`email`。

## PWA（可安裝到手機）

`client/public/sw.js`（Service Worker，手寫、無依賴）＋ `manifest.webmanifest`（編譯器在 prebuild 時用 `site.json` 產生，不進版控）。圖示在 `client/public/icons/`（硃砂底＋姓氏）。

## 檔案結構

```
content/site/{zh,en}/    8 個內容區塊（hero、home、story、services、
                         testimonials、process、honors、connect）
content/images/         上傳的圖片（同步到網站 /images/）
site.json               網站名稱、雙語導覽列、聯絡資訊（電話／LINE／信箱）
scripts/build-content.mjs  內容編譯器（prebuild 自動執行）
client/src/
  pages/Home.tsx        唯一頁面：7 個路由的版面（設計層，只讀內容，不寫文案）
  content.ts            內容模型的 TypeScript 型別
  content.generated.ts  編譯器產物（git 不追蹤，每次 build 重新產生）
  main.tsx / App.tsx    React 入口
wrangler.jsonc          Worker 名稱、靜態資源目錄、SPA fallback
```

## 注意事項

- `content.generated.ts` 是編譯產物，不要手動改，改了下次 build 會被覆蓋。
- 換一位業務員使用時，改 `site.json`（姓名、導覽列、電話／LINE／信箱）＋重寫 `content/site/` 的 16 個 Markdown 檔＋重畫 `client/public/icons/` 兩張圖（換姓氏）即可，設計層完全不用動。
- 中文標題的行高有特別處理（`html:lang(zh)` 覆寫），改字級時注意 CJK 需要比拉丁字母寬鬆的行高。
- 次要文字色 `--muted: #6e665a` 在紙色上的對比為 5.10:1（通過 WCAG AA），調色時請保持 ≥ 4.5:1。
