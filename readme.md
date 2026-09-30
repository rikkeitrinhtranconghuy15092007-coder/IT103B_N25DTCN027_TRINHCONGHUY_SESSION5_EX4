# Phân tích Trade-off: Các phương thức cắt chuỗi trong JavaScript

## 1. Mục tiêu
- So sánh chi tiết sự khác nhau giữa các phương thức trích xuất chuỗi con: `.slice()`, `.substring()`.
- Làm rõ lý do vì sao `.substr()` không còn được khuyến nghị sử dụng.
- Đưa ra tiêu chuẩn sử dụng phương thức cắt chuỗi cho các dự án phần mềm hiện đại (đặc biệt trong quá trình tái cấu trúc hệ thống y tế kế thừa).

## 2. Ngữ cảnh & Bài toán
Trong hệ thống y tế kế thừa của bệnh viện, các lập trình viên trước đây đã sử dụng lẫn lộn cả 3 hàm cắt chuỗi (`slice`, `substring`, `substr`) khiến mã nguồn thiếu tính nhất quán và khó bảo trì. Đáng chú ý, phương thức `.substr()` đã bị MDN (Mozilla Developer Network) gắn nhãn **Deprecated** (lỗi thời) trong các tiêu chuẩn Web hiện đại. Do đó, toàn bộ dự án cần được chuẩn hóa để chỉ sử dụng một phương thức tối ưu nhất.

## 3. Bảng so sánh kỹ thuật (Trade-off Table)

| Đặc điểm | `String.prototype.slice(start, end)` | `String.prototype.substring(start, end)` |
| :--- | :--- | :--- |
| **Xử lý chỉ số âm (Negative Index)** | Đếm ngược từ cuối chuỗi (rất tiện lợi) | Coi như bằng 0 |
| **Khi start > end** | Trả về chuỗi rỗng `""` | Tự động hoán đổi 2 chỉ số cho nhau |
| **Khuyến nghị chuẩn ES6+** | **Nên dùng mặc định** (nhất quán với Array) | Chỉ dùng khi có lý do đặc biệt |

## 4. Các trường hợp biên (Edge Cases) minh họa

Lấy ví dụ chuỗi: `const str = "BỆNHÁNYTẾ";`

**Trường hợp 1: Sử dụng chỉ số âm (VD: -3)**
- `str.slice(-3)` ➔ Lấy 3 ký tự cuối cùng ➔ kết quả: `"YTẾ"`
- `str.substring(-3)` ➔ Hiểu -3 thành 0, lấy từ đầu đến cuối ➔ kết quả: `"BỆNHÁNYTẾ"`

**Trường hợp 2: Chỉ số bắt đầu lớn hơn kết thúc (VD: start = 4, end = 2)**
- `str.slice(4, 2)` ➔ Tuân thủ logic chặt chẽ, sai thứ tự sẽ trả về chuỗi rỗng ➔ kết quả: `""`
- `str.substring(4, 2)` ➔ Tự động đảo ngược thành (2, 4) ➔ kết quả: `"NH"` (dễ che giấu lỗi logic tiềm ẩn trong code).

## 5. Kết luận
Trong môi trường phát triển hiện đại, **`.slice()` là phương thức chuẩn mực quốc tế nên được sử dụng mặc định**. Nó không chỉ hỗ trợ lấy chỉ số âm cực kỳ tiện lợi mà còn có hành vi xử lý ngoại lệ chặt chẽ, giúp lập trình viên dễ dàng phát hiện lỗi sai logic (bugs) sớm hơn, đồng thời tạo sự đồng nhất với phương thức `.slice()` của Array.