# LEVEL UP! – HƯỚNG DẪN ĐIỀU PHỐI SẢN XUẤT HÌNH ẢNH (PRODUCTION GUIDE)

**Dự án**: LEVEL UP! – SWOT & SMART (Visual Novel Giáo Dục Tương Tác)  
**Đơn vị điều phối**: Main Production Agent  
**Đơn vị tạo ảnh độc quyền**: **ChatGPT Image Generation** (DALL-E 3 / GPT-4o Image Gen)

---

## 1. QUY TẮC BẮT BUỘC (MANDATORY POLICY)
Theo chỉ thị tối cao của Master Prompt:
- **100% hình ảnh sáng tạo trong dự án phải được tạo bằng ChatGPT Image Generation.**
- **KHÔNG ĐƯỢC**: Dùng Midjourney, Stable Diffusion, Flux, Gemini, Imagen, không tự vẽ bằng code/SVG/Canvas, không dùng stock photo hay clipart.
- Mọi asset phải tuân thủ nghiêm ngặt phong cách **Western 2D Cartoon** (viền Deep Navy `#151C45`, flat vibrant colors, tỷ lệ hình học), **tuyệt đối KHÔNG sử dụng phong cách Anime / Manga / Chibi**.

---

## 2. QUY TRÌNH 4 BƯỚC SẢN XUẤT HÀNG LOẠT TRÊN CHATGPT

```
  ┌─────────────────────────────────────────────────────────────┐
  │ BƯỚC 1: CHỌN PROMPT TỪ HỆ THỐNG PROMPT PACK                │
  │ Mở file tương ứng trong LEVEL_UP_GAME/00_Project_Documentation│
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ BƯỚC 2: GỬI PROMPT KÈM ẢNH REFERENCE VÀO CHATGPT            │
  │ - Đính kèm MASTER_CONCEPT_REF.png hoặc Reference Sheet      │
  │ - Dán toàn bộ nội dung prompt theo chuẩn Section 17         │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ BƯỚC 3: KIỂM SOÁT CHẤT LƯỢNG (QC CHECKLIST)                │
  │ - Đối chiếu 18 tiêu chí QC (Đúng nhân vật, nét, màu, tỷ lệ) │
  │ - Nếu chưa chuẩn: Yêu cầu ChatGPT vẽ lại/chỉnh sửa          │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ BƯỚC 4: TẢI VỀ & LƯU VÀO THƯ MỤC CHUẨN CỦA DỰ ÁN            │
  │ Đổi tên đúng theo quy chuẩn không dấu (VD: CHAR_MINH_...png) │
  │ và cập nhật trạng thái APPROVED trong Asset_Manifest.md     │
  └─────────────────────────────────────────────────────────────┘
```

---

## 3. THỨ TỰ ƯU TIÊN SẢN XUẤT (EXECUTION BATCHES)

### ĐỢT 1: KHÓA THIẾT KẾ GỐC (PHASE 01 - BẮT BUỘC LÀM ĐẦU TIÊN)
> *Mục đích: Cố định khuôn mặt, trang phục, bảng màu của 3 nhân vật và bộ nhận diện thương hiệu để làm tài liệu tham chiếu (Reference) cho tất cả các đợt sau, tránh tình trạng mỗi ảnh một kiểu.*

1. **Minh Reference Sheet**: File prompt `CHAR_MINH_REF_V01` trong `Generation_Prompts_Phase01_ReferenceLock.md`.
2. **Linh Reference Sheet**: File prompt `CHAR_LINH_REF_V01`.
3. **Tick Mascot Reference Sheet**: File prompt `CHAR_TICK_REF_V01`.
4. **Brand Guideline Board**: File prompt `BRAND_GUIDELINE_BOARD_V01`.
5. **VN Layout Sample**: File prompt `UI_VN_MOCKUP_SAMPLE_V01`.

*Sau khi ChatGPT tạo xong 5 ảnh này, tải về và lưu vào thư mục `LEVEL_UP_GAME/02_Characters/Reference_Sheets/` và `LEVEL_UP_GAME/01_Brand_Identity/Brand_Guidelines/`.*

---

### ĐỢT 2: SẢN XUẤT CHARACTER SPRITES (32 SPRITES)
> *File prompt: `LEVEL_UP_GAME/00_Project_Documentation/Generation_Prompts_Characters.md`*
- **Minh (12 sprites)**: Lưu vào `LEVEL_UP_GAME/02_Characters/Minh/`
- **Linh (10 sprites)**: Lưu vào `LEVEL_UP_GAME/02_Characters/Linh/`
- **Tick (10 sprites)**: Lưu vào `LEVEL_UP_GAME/02_Characters/Tick/`

---

### ĐỢT 3: SẢN XUẤT BACKGROUNDS (12 BỐI CẢNH 16:9)
> *File prompt: `LEVEL_UP_GAME/00_Project_Documentation/Generation_Prompts_Backgrounds.md`*
- Tỷ lệ: 16:9 ngang (1920×1080 px).
- Chừa 25-30% diện tích bên dưới màn hình cho hộp thoại Dialogue Box.
- Lưu vào các thư mục con trong `LEVEL_UP_GAME/03_Backgrounds/`.

---

### ĐỢT 4: SẢN XUẤT NỘI DUNG SWOT & SMART (MINH HỌA & CẢNH KỂ CHUYỆN)
> *File prompt: `LEVEL_UP_GAME/00_Project_Documentation/Generation_Prompts_SWOT_and_SMART.md`*
- 8 hình ảnh minh họa cho 8 câu hỏi SWOT (Lưu tại `LEVEL_UP_GAME/05_SWOT/Question_Illustrations/`).
- 5 thẻ kỹ năng SMART + Bảng tổng hợp + Lịch học 5 ngày (Lưu tại `LEVEL_UP_GAME/06_SMART/`).
- 8 cảnh kể chuyện Cinematic (Lưu tại `LEVEL_UP_GAME/07_Story_Illustrations/`).

---

### ĐỢT 5: SẢN XUẤT UI & THƯƠNG HIỆU (BLANK CONTAINERS)
> *File prompt: `LEVEL_UP_GAME/00_Project_Documentation/Generation_Prompts_UI_and_Brand.md`*
- Hộp thoại rỗng, thẻ đáp án rỗng, khung đếm ngược 120s, logo và huy hiệu.
- Lưu vào `LEVEL_UP_GAME/04_UI_Assets/` và `LEVEL_UP_GAME/01_Brand_Identity/`.

---

## 4. BẢNG KIỂM TRA CHẤT LƯỢNG (18-POINT QC CHECKLIST)
Mỗi hình ảnh sau khi nhận từ ChatGPT phải đạt tối thiểu các tiêu chí:
1. [ ] Đúng phong cách Western 2D Cartoon (nét vẽ cartoon phương Tây hiện đại).
2. [ ] Tuyệt đối KHÔNG có yếu tố anime / manga / mắt long lanh nhiều chi tiết.
3. [ ] Nét viền màu Deep Navy (`#151C45`) dày dặn, sắc gọn, không bị đứt đoạn.
4. [ ] Đúng bảng màu chuẩn (Navy, Electric Purple, Energy Orange, Mint Green, Warm Cream, Yellow, Coral).
5. [ ] Minh đúng nhận diện: Tóc nâu đen hơi rối, áo hoodie Mint Green, quần tối màu, điện thoại tím.
6. [ ] Linh đúng nhận diện: Tóc bob kẹp vàng, áo khoác cam, tai nghe tím quanh cổ, sổ checklist.
7. [ ] Tick đúng nhận diện: Thân vuông tím bo góc, 2 chuông vàng, mặt cười hoạt hình, găng tay trắng.
8. [ ] Không bị lỗi giải phẫu (không thừa/thiếu ngón tay, không dị tật tay chân).
9. [ ] Không bị biến dạng khuôn mặt hoặc méo mó tỉ lệ ngoài chủ đích.
10. [ ] Không bị cắt mất các bộ phận quan trọng (đầu, chân, tay, đạo cụ).
11. [ ] Không chứa watermark của AI hoặc trang web khác.
12. [ ] Không có chữ rác hoặc chữ AI méo mó vô nghĩa.
13. [ ] Đúng tỷ lệ khung hình (16:9 cho Background & Cảnh; Đứng toàn thân cho Sprite).
14. [ ] Nền sạch sẽ (trong suốt đối với sprite/UI; hoặc nền solid dễ tách).
15. [ ] Background chừa trống 25-30% diện tích dưới đáy cho giao diện Visual Novel.
16. [ ] Minh họa câu hỏi SWOT không trực tiếp làm lộ đáp án A, B, C, D trước.
17. [ ] Thẻ UI, hộp thoại, khung câu hỏi ở dạng BLANK (rỗng) để chèn chữ tiếng Việt động.
18. [ ] Ảnh do chính thức ChatGPT Image Generation tạo ra.

---

## 5. ĐỒNG BỘ VÀO GAME ENGINE & SLIDE THUYẾT TRÌNH
- **Engine Visual Novel**: Thư mục `src/` và `public/` đã được đồng bộ 100% với kịch bản Minh, Linh, Tick và 8 câu hỏi SWOT + SMART. Khi có ảnh từ ChatGPT, chỉ cần copy vào thư mục `public/assets/` tương ứng.
- **PowerPoint / Canva**: Toàn bộ asset hộp thoại, nút bấm, thẻ bài rỗng có thể chèn trực tiếp vào slide và gõ text tiếng Việt lên trên một cách linh hoạt, sắc nét.
