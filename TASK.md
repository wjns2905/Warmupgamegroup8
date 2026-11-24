# TASK.md - LEVEL UP! SWOT & SMART Production Management

## Project Information
- **Project**: LEVEL UP! – SWOT & SMART (AI Educational Visual Novel)
- **Role**: Main Production Agent (Điều phối toàn bộ quá trình sản xuất mỹ thuật & nội dung)
- **Image Generation Engine**: ChatGPT Image Generation (DALL-E 3 / GPT-4o Image Gen) - *Exclusive*
- **Current Phase**: Phase 01 - Reference Lock & Production Infrastructure (COMPLETED)
- **Last Updated**: 2026-11-24

---

## Task Progress Checklist

- [x] **Step 1: Khảo sát tài liệu nguồn & Concept Art đã duyệt**
  - [x] Đọc và đối chiếu `Warm up TDSTKN.docx` (Phân công công việc).
  - [x] Đọc và trích xuất 8 câu hỏi SWOT chuẩn từ `Warm up TDSTKN (1).docx`.
  - [x] Đọc và trích xuất kịch bản SMART (5 ngày, 9 chương, video phân tích, 5 tiêu chí) từ `Warm up TDSTKN (2).docx`.
  - [x] Phân tích visual reference từ ảnh concept đã duyệt `media_1795518628241_9a896bda.jpg` / `LEVEL UP_ Bứt phá SWOT SMART.png`.

- [x] **Step 2: Thiết lập cấu trúc thư mục sản xuất chuẩn hóa**
  - [x] Tạo cây thư mục `LEVEL_UP_GAME/` theo Section 20 của Master Prompt.
  - [x] Copy master reference image vào `01_Brand_Identity/Brand_Guidelines/` và `00_Project_Documentation/`.

- [x] **Step 3: Xây dựng Master Art Bible & Character Reference Sheet Specs**
  - [x] Soạn thảo `Art_Bible.md` chi tiết (phong cách Western 2D Cartoon, bảng màu HEX, giải phẫu nhân vật, cấm chỉ định phong cách).
  - [x] Soạn thảo `Storyboard.md` tích hợp 8 câu hỏi SWOT và mục tiêu SMART 5 ngày 9 chương.
  - [x] Đặc tả chi tiết 3 nhân vật: Minh (Protagonist), Linh (Mentor / Companion), Tick (Clock Mascot).
  - [x] Thiết lập prompt chuẩn ChatGPT theo Template Section 17 cho 3 Character Reference Sheets, Brand Board và VN UI Mockup.

- [x] **Step 4: Thiết lập Asset Manifest & Toàn bộ Prompts ChatGPT**
  - [x] Soạn thảo `Asset_Manifest.md` quản lý 155 assets với đầy đủ mã định danh, loại, tỷ lệ, nền, trạng thái và quy chuẩn đặt tên.
  - [x] Soạn thảo bộ prompt chuẩn cho Character Sprites (32 sprites) trong `Generation_Prompts_Characters.md`.
  - [x] Soạn thảo bộ prompt chuẩn cho Backgrounds (12 BGs) trong `Generation_Prompts_Backgrounds.md`.
  - [x] Soạn thảo bộ prompt chuẩn cho SWOT, SMART & Cinematic Cutscenes trong `Generation_Prompts_SWOT_and_SMART.md`.
  - [x] Soạn thảo bộ prompt chuẩn cho UI & Brand Assets trong `Generation_Prompts_UI_and_Brand.md`.
  - [x] Soạn thảo `README_PRODUCTION_GUIDE.md` hướng dẫn quy trình 4 bước sản xuất và 18 tiêu chí kiểm tra chất lượng (QC).

- [x] **Step 5: Đồng bộ hóa Game Engine (React / Vite VN Engine)**
  - [x] Cập nhật `src/data/gameContent.ts` từ tên cũ sang tên chuẩn (Minh, Linh, Tick).
  - [x] Cập nhật `TitleScene.tsx` và `PresenterModal.tsx`.
  - [x] Tích hợp master concept banner mới vào `public/images/banner.png` và `public/images/banner.jpg`.
  - [x] Build thử nghiệm thành công 100% với `npm run build` (tsc + vite).

- [x] **Step 6: Kiểm tra chất lượng & Bàn giao Phase 01**
  - [x] Đối chiếu với QC Checklist (Section 19).
  - [x] Chuẩn bị sẵn sàng 5 Master Prompts Phase 01 để người dùng đưa ngay vào ChatGPT khóa thiết kế gốc.
  - [x] Git commit tự động theo quy chuẩn của máy chủ.
