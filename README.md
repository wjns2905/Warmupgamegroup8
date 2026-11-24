# LEVEL UP! – The Self-Discovery Quest
> **Slogan:** *Hiểu bản thân – Làm chủ mục tiêu – Nâng cấp chính mình*  
> *(Know Yourself. Set Your Goals. Level Up.)*

Dự án Web Game Visual Novel 2D tương tác phục vụ bài thuyết trình, hoạt động Warm-up về phương pháp **SWOT** và **SMART** dành cho sinh viên đại học.

---

## 🎮 Cách Khởi Động Trò Chơi Nhanh Nhất
Bạn có thể khởi động game theo 1 trong 2 cách sau:

### Cách 1: Click đúp vào file `start-game.bat` (Đơn giản nhất trên Windows)
- Bấm đúp vào file **`start-game.bat`** trên thư mục dự án.
- Trình duyệt sẽ tự động mở game tại `http://localhost:3000`.

### Cách 2: Sử dụng dòng lệnh terminal
```bash
npm run dev
```
Hoặc chạy bản đã đóng gói (Production build):
```bash
npm run preview
```

---

## ⌨️ Phím Tắt Tiện Lợi Khi Trình Chiếu Trong Lớp
| Phím tắt | Chức năng |
| :--- | :--- |
| **Space** hoặc **Enter** | Tiếp tục thoại, chuyển câu kế tiếp |
| **A**, **B**, **C**, **D** (hoặc **1, 2, 3, 4**) | Lựa chọn nhanh đáp án trắc nghiệm |
| **P** | **Mở Bảng Điều Khiển Người Thuyết Trình (Presenter Mode)** |
| **F** | Bật / Tắt chế độ Toàn Màn Hình (16:9 HD) |
| **M** | Bật / Tắt âm thanh (Mute/Unmute) |
| **Esc** | Đóng menu hoặc thoát toàn màn hình |

---

## 🎯 Bảng Đáp Án & Kịch Bản Thuyết Trình

### 1. 8 Câu Hỏi SWOT (Chương 01)
1. **Câu 1:** SWOT là viết tắt của từ nào? ➔ **B** (*Strengths, Weaknesses, Opportunities, Threats*)
2. **Câu 2:** Tại sao SWOT là "nghệ thuật"? ➔ **A** (*Đòi hỏi sự phán đoán và tài năng của nhà quản trị*)
3. **Câu 3:** Yếu tố nào là Thách thức (Threats)? ➔ **C** (*Đối thủ cạnh tranh mới giá rẻ*)
4. **Câu 4:** Cửa hàng thời trang độc quyền + xu hướng livestream? ➔ **B** (*Livestream bộ sưu tập mới*)
5. **Câu 5:** Chiến lược S-O là gì? ➔ **A** (*Sử dụng điểm mạnh để khai thác cơ hội*)
6. **Câu 6:** Yếu tố bên trong của cá nhân? ➔ **C** (*Điểm mạnh và điểm yếu*)
7. **Câu 7:** Ngày hội việc làm và kết nối doanh nghiệp? ➔ **C** (*Cơ hội - O*)
8. **Câu 8:** Giỏi ngoại ngữ nhưng thiếu tự tin thuyết trình? ➔ **A** (*Điểm mạnh và điểm yếu*)

### 2. Mini-Game SMART (Chương 02)
- **S (Specific):** ➔ **B** (*Đọc hiểu, tóm tắt và ôn tập đủ 9 chương*)
- **M (Measurable):** ➔ **A** (*Theo dõi trên checklist 9 chương*)
- **A (Achievable):** ➔ **C** (*Chia 9 chương thành các phần nhỏ trong 5 ngày*)
- **R (Relevant):** ➔ **B** (*Tập trung vào kiến thức môn thi và hạn chế xao nhãng*)
- **T (Time-bound):** ➔ **A** (*Hoàn thành trước 22 giờ ngày trước kỳ thi*)

---

## 🌟 Tính Năng Nổi Bật
- **Thiết Kế Visual Novel Đích Thực:** Sử dụng hình ảnh nhân vật Alex, Nova, Iris và quái vật Glitch chuẩn theo Character Design Sheet và Brand Identity Board.
- **Presenter Mode Thông Minh:** Bấm phím `P` để nhảy trực tiếp tới bất kỳ phân cảnh hoặc câu hỏi nào, xem trước đáp án, điều khiển đồng hồ 2 phút và đọc gợi ý thảo luận.
- **Hệ Thống Âm Thanh Độc Lập:** Tự động tổng hợp âm thanh qua Web Audio API (nhạc nền chiptune/lo-fi cho từng cảnh, hiệu ứng âm thanh click, typewriter, chime chiến thắng, chuông báo hết giờ, tiếng glitch) 100% không lo lỗi file mạng.
- **Đồng Hồ Thảo Luận 2:00 Chuẩn:** Đổi màu vàng ở 30s, đỏ ở 10s, phát chuông báo khi hết giờ, có nút tạm dừng và kết thúc linh hoạt.
- **Roadmap 5 Ngày & Checklist 9 Chương:** Có nút *Mô phỏng kế hoạch (Simulate)* minh họa tiến trình học, làm Glitch nhỏ dần khi hoàn thành bài học!
- **Lưu Tiến Trình:** Tự động ghi nhớ tiến độ vào trình duyệt (LocalStorage).
