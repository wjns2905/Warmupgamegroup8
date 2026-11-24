# PLAN.md - Master Production Plan: LEVEL UP! SWOT & SMART

## 1. Executive Summary & Production Objectives
Dự án "LEVEL UP! – SWOT & SMART" là trò chơi Visual Novel giáo dục tương tác phục vụ bài thuyết trình, hoạt động warm-up và rèn luyện kỹ năng sinh viên đại học.
Mục tiêu cốt lõi:
- **Phong cách mỹ thuật**: Western 2D Cartoon, năng lượng Cartoon Network kết hợp indie game hiện đại (bold navy line, flat vibrant color, cell shading, geometric silhouette). Tuyệt đối KHÔNG sử dụng anime/manga/chibi hay 3D photorealistic.
- **Quy chuẩn tạo ảnh**: 100% hình ảnh phải do ChatGPT Image Generation (DALL-E 3 / GPT-4o Image Gen) tạo ra. Không vẽ code, không dùng generator khác.
- **Ưu tiên hàng đầu (Phase 01)**: Khóa Art Bible và Character Reference Sheets trước khi sinh ảnh hàng loạt để bảo toàn 100% tính nhất quán.

---

## 2. Production Phases & Workflow Architecture

```
                                  [MASTER CONCEPT ART]
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │            PHASE 01: REFERENCE LOCK              │
                  │  - Master Art Bible & Style Guide                │
                  │  - 3 Character Reference Sheets (Minh, Linh, Tick)│
                  │  - Brand Identity & UI Design System Specs       │
                  │  - Asset Manifest & ChatGPT Prompt Packs         │
                  └─────────────────────────┬────────────────────────┘
                                            │
               ┌────────────────────────────┼───────────────────────────┐
               ▼                            ▼                           ▼
    ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
    │ PHASE 02: CHARACTERS │    │ PHASE 03: ENVIRONMENTS│   │ PHASE 04: UI & BRAND │
    │ - 12 Minh Sprites    │    │ - 12 16:9 Backgrounds│    │ - Dialogue Boxes     │
    │ - 10 Linh Sprites    │    │ - Day / Night shifts │    │ - Buttons & Panels   │
    │ - 10 Tick Sprites    │    │ - Challenge Rooms    │    │ - Progress & Clocks  │
    └──────────┬───────────┘    └──────────┬───────────┘    └──────────┬───────────┘
               │                           │                           │
               └────────────────────────────┼───────────────────────────┘
                                            │
               ┌────────────────────────────┴───────────────────────────┐
               ▼                                                        ▼
    ┌──────────────────────┐                                 ┌──────────────────────┐
    │  PHASE 05: CONTENT   │                                 │ PHASE 06: CINEMATIC  │
    │ - 8 SWOT Questions   │                                 │ - 8 Story Cutscenes  │
    │ - 5 SMART Elements   │                                 │ - 15 Key Game Screens│
    │ - Props & Rewards    │                                 │ - Victory Assets     │
    └──────────┬───────────┘                                 └──────────┬───────────┘
               │                                                        │
               └────────────────────────────┬───────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │       PHASE 07: QUALITY ASSURANCE & EXPORT       │
                  │  - Checklist QC (Anatomy, Line, Palette, Ratio)   │
                  │  - VN Game Engine Integration & Live Verification│
                  │  - Final Delivery Package                        │
                  └──────────────────────────────────────────────────┘
```

---

## 3. Subagent Operational Roles & Responsibilities
1. **Subagent 01 – Creative Director**: Đảm nhiệm Art Bible, Style Lock, giám sát sự nhất quán với concept art ban đầu.
2. **Subagent 02 – Character Asset Coordinator**: Quản lý 3 Reference Sheets và 32 Sprites (Minh: 12, Linh: 10, Tick: 10).
3. **Subagent 03 – Environment Coordinator**: Quản lý 12 backgrounds 16:9, đảm bảo chừa 25-30% diện tích đáy màn hình cho HUD/UI.
4. **Subagent 04 – Brand Identity Coordinator**: Quản lý hệ thống Logo, Mascot Tick, bảng màu HEX và decorative graphics.
5. **Subagent 05 – UI Asset Coordinator**: Quản lý hệ thống HUD, Dialogue Box rỗng (không text cứng), Quiz cards, Progress trackers.
6. **Subagent 06 – Content & Story Coordinator**: Khớp 8 câu hỏi SWOT và tình huống SMART 5 ngày 9 chương vào game script.
7. **Subagent 07 – Quality Assurance (QA)**: Thẩm định ảnh sinh ra theo 18 tiêu chí QC tại Section 19.
8. **Subagent 08 – Asset Manager**: Kiểm soát file naming, folder tree `LEVEL_UP_GAME/`, cập nhật `Asset_Manifest.md`.

---

## 4. Execution Roadmap
- **Mốc 1**: Tạo cấu trúc thư mục sản xuất `LEVEL_UP_GAME/` & copy Master Reference Image.
- **Mốc 2**: Hoàn thành `Art_Bible.md` và `Storyboard.md`.
- **Mốc 3**: Lập `Asset_Manifest.md` và toàn bộ Prompts ChatGPT (đúng Template Section 17).
- **Mốc 4**: Đồng bộ logic mã nguồn React Visual Novel với kịch bản và tên nhân vật mới.
- **Mốc 5**: Kiểm tra, đối soát và tự động commit Git.
