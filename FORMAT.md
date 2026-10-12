# 內容寫作指南（給業務員看的版本）

這個網站的**所有文字**都在 `content/site/` 裡，分 `zh`（中文）、`en`（英文）兩種語言。每個區塊一個 `.md` 檔。

## 8 個區塊

| 檔案 | 內容 |
| --- | --- |
| `hero.md` | 首頁橫幅：稱謂、姓名、主標、標語、按鈕、印章字 |
| `home.md` | 首頁：引言＋六個快速連結（標題／說明／路徑） |
| `story.md` | 關於我：引言、故事內文、證照列表 |
| `services.md` | 服務項目：最多放 4 項（標題＋說明） |
| `testimonials.md` | 客戶見證：引言（客戶姓名／身分＋感言），放 3 則最剛好 |
| `process.md` | 服務流程：4 個步驟（標題＋說明） |
| `honors.md` | 榮譽實績：4 個數字（數字／單位／說明）＋獲獎列表 |
| `connect.md` | 聯絡我：三種聯絡方式的標籤文字 |

每個檔案都有 `zh`（中文）和 `en`（英文）兩個版本，放在 `content/site/zh/` 和 `content/site/en/`。

## 寫作格式

檔案分成兩部分：上方的 `---` 之間是 **frontmatter**（YAML，結構化資料），下方是 **內文**（Markdown，會變成段落）。

- `links:`／`services:`／`steps:`／`credentials:` — 標題＋說明的列表，每筆 `title`／`detail`
- `quotes:` — 見證，每筆 `text`（感言）／`name`（姓名）／`role`（身分）
- `stats:` — 數字，每筆 `number`（數字）／`suffix`（單位，如「年」「%」）／`label`（說明）
- `awards:` — 獲獎，每筆 `year`／`text`
- `title` 支援 `\n` 換行（標題太長時手動斷行）
- `hero.md` 的 `sealChar` 是印章上的字（通常是姓氏），`verticalText` 是直式裝飾文字
- `portrait: ""` 留空會顯示佔位圖；上傳照片後填檔名（見 `content/images/README.md`）

## 全站設定（site.json）

網站名稱、瀏覽器分頁標題、導覽列 7 個按鈕的中英文、頁尾、聯絡資訊，都在根目錄的 `site.json`：

- `name` — 網站名稱（同時是瀏覽器分頁標題）
- `shortName` — 短名（PWA 安裝後的 App 名稱、頁尾）
- `chrome.zh.nav`／`chrome.en.nav` — 導覽列按鈕（`label` 文字＋`path` 路徑，順序對應 `routes`）
- `contact.phone`、`contact.phoneHref`（`tel:` 連結）、`contact.lineId`、`contact.lineHref`、`contact.email`、`contact.officeHours`、`contact.company` — 聯絡資訊（中英分開寫在 `officeHours`／`company`）
- `theme` — 主題色（給 PWA manifest 用，一般不用動）

## 圖片

見 `content/images/README.md`：上傳圖片到 `content/images/`，在 Markdown 裡用檔名引用，build 會自動同步到網站的 `/images/` 路徑。

## 檢查清單（交給客戶前）

- [ ] 16 個 Markdown 檔的中英文都填完（不要留「林建宏」這種示範文字）
- [ ] `portrait` 已上傳真實形象照
- [ ] `site.json` 的姓名、電話、LINE ID、信箱、公司已換成客戶的
- [ ] `client/public/icons/` 的兩張圖已重畫（換成客戶的姓氏）
- [ ] 見證內容已取得客戶本人同意
- [ ] 用手機＋電腦各看一次，確認中文標題沒有重疊、文字沒有被背景蓋掉
