
// Giả lập dữ liệu hồ sơ y tế kế thừa
// Định dạng chuẩn: [Loại:2 ký tự]-[Năm:4 ký tự]-[Khoa:4 ký tự]-[ID:5 ký tự]
const medicalRecords = [
    "HS-2026-CARD-98765", // Khoa Tim mạch (Cardiology)
    "BA-2025-ONCO-12345", // Khoa Ung bướu (Oncology)
    "HS-2026-NEUR-00099"  // Khoa Thần kinh (Neurology)
];

/**
 * Hàm phân tích và trích xuất thông tin mã hồ sơ
 * Tuân thủ quy tắc: Chỉ sử dụng .slice() để thống nhất toàn bộ codebase
 * @param {string} rawCode - Mã hồ sơ thô
 * @returns {Object} Thông tin đã bóc tách
 */
function extractPatientInfo(rawCode) {
    // Trích xuất bằng các chỉ số index cố định từ đầu chuỗi
    const type = rawCode.slice(0, 2);             
    const year = rawCode.slice(3, 7);             
    const department = rawCode.slice(8, 12);      
    
    // Ưu điểm vượt trội của .slice(): Lấy phần tử từ cuối chuỗi dễ dàng bằng index âm
    const patientId = rawCode.slice(-5);          

    return { type, year, department, patientId };
}

// Chạy thử nghiệm hệ thống
console.log("--- KẾT QUẢ BÓC TÁCH DỮ LIỆU Y TẾ ---");
medicalRecords.forEach(record => {
    const data = extractPatientInfo(record);
    console.log(`ID: ${data.patientId} | Khoa: ${data.department} | Năm: ${data.year} | Loại: ${data.type}`);
});

// Demo các trường hợp biên với .slice()
console.log("\n--- TEST TRƯỜNG HỢP BIÊN VỚI SLICE ---");
const testString = "TEST-DATA";
console.log(`- Chỉ số âm (-4): "${testString.slice(-4)}"`);
console.log(`- Start > End (5, 2): "${testString.slice(5, 2)}" (Trả về chuỗi rỗng)`);