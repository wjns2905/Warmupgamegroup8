import { DialogueLine, QuizQuestion, SmartPillar } from '../types/game';

export const PROLOGUE_DIALOGUES: DialogueLine[] = [
  {
    id: 'p1',
    speaker: 'minh',
    name: 'Minh',
    expression: 'worried',
    text: 'Chỉ còn 6 ngày nữa là đến kỳ thi rồi…',
    subtext: 'EXAM: 6 DAYS LEFT • CHƯA ÔN TẬP CHƯƠNG NÀO'
  },
  {
    id: 'p2',
    speaker: 'minh',
    name: 'Minh',
    expression: 'worried',
    text: 'Tận 9 chương kiến thức dày đặc mà mình vẫn chưa bắt đầu được trang nào cả.',
    subtext: '9 CHAPTERS WAITING'
  },
  {
    id: 'p3',
    speaker: 'minh',
    name: 'Minh',
    expression: 'determined',
    text: 'Thôi! Hôm nay nhất định phải ngồi vào bàn học thật nghiêm túc, không chần chừ nữa!',
  },
  {
    id: 'p4',
    speaker: 'system',
    name: 'THÔNG BÁO ĐIỆN THOẠI',
    expression: 'neutral',
    text: '📱 [Ting!] Kênh yêu thích vừa phát video ngắn mới: "Top 10 mẹo lướt web giải trí cực cuốn"...',
  },
  {
    id: 'p5',
    speaker: 'minh',
    name: 'Minh',
    expression: 'distracted',
    text: 'Ủa... video mới hả? Xem lướt qua một xíu 5 phút thôi chắc không sao đâu nhỉ?',
    subtext: 'CÁM DỖ: "JUST FIVE MORE MINUTES..."'
  },
  {
    id: 'p6',
    speaker: 'system',
    name: 'THỜI GIAN TRÔI QUA',
    expression: 'neutral',
    text: '⏳ Vài giờ sau... Đồng hồ điểm 23:30 đêm!',
  },
  {
    id: 'p7',
    speaker: 'minh',
    name: 'Minh',
    expression: 'confused',
    text: 'Khoan đã... sao đã nửa đêm rồi?! Cuốn sách vẫn mở ở trang bìa, mình chưa đọc được chữ nào!',
  },
  {
    id: 'p8',
    speaker: 'system',
    name: 'CẢNH BÁO LEVEL UP!',
    expression: 'neutral',
    text: '⚡ BẤT NGỜ MÀN HÌNH LAPTOP PHÁT SÁNG! CỔNG THỬ THÁCH MỞ RA...',
  }
];

export const MEET_LINH_DIALOGUES: DialogueLine[] = [
  {
    id: 'm1',
    speaker: 'linh',
    name: 'Linh',
    expression: 'greeting',
    text: 'Chào Minh! Đừng hoảng hốt, cậu không hề cô đơn trên hành trình này đâu!',
    subtext: 'Người bạn đồng hành & Hướng dẫn phương pháp'
  },
  {
    id: 'm2',
    speaker: 'tick',
    name: 'Tick',
    expression: 'warning',
    text: 'Reng reng reng! Báo động đỏ cấp độ thi cử! Chỉ còn 6 ngày thôi đấy!',
    subtext: 'Mascot Đồng Hồ Báo Thức'
  },
  {
    id: 'm3',
    speaker: 'minh',
    name: 'Minh',
    expression: 'confused',
    text: 'Hai người là ai vậy? Tôi đang lo sốt vó cho kỳ thi 9 chương đây!',
  },
  {
    id: 'm4',
    speaker: 'linh',
    name: 'Linh',
    expression: 'explaining',
    text: 'Để giải quyết tình trạng trì hoãn và lập kế hoạch ôn thi bứt phá, trước tiên cậu phải HIỂU RÕ VỊ THẾ BẢN THÂN!',
  },
  {
    id: 'm5',
    speaker: 'linh',
    name: 'Linh',
    expression: 'explaining',
    text: 'Và công cụ tuyệt vời nhất chính là Ma trận SWOT: Strengths (Điểm mạnh), Weaknesses (Điểm yếu), Opportunities (Cơ hội), Threats (Thách thức).',
  },
  {
    id: 'm6',
    speaker: 'tick',
    name: 'Tick',
    expression: 'countdown',
    text: 'Hãy cùng cả lớp vượt qua 8 câu hỏi thử thách tư duy SWOT ngay bây giờ nào!',
  }
];

export const SWOT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'ALL',
    title: 'Câu 1: Thuật ngữ SWOT',
    question: 'Thuật ngữ SWOT là viết tắt của các từ tiếng Anh nào sau đây?',
    options: [
      { key: 'A', text: 'Strategy, Weakness, Opportunity, Target' },
      { key: 'B', text: 'Strengths, Weaknesses, Opportunities, Threats' },
      { key: 'C', text: 'Service, Wage, Output, Training' },
      { key: 'D', text: 'Strengths, Weaknesses, Operations, Time' }
    ],
    correctKey: 'B',
    explanation: 'SWOT là viết tắt của: Strengths (Điểm mạnh), Weaknesses (Điểm yếu), Opportunities (Cơ hội), Threats (Thách thức).',
    rewardXP: 100
  },
  {
    id: 2,
    category: 'ALL',
    title: 'Câu 2: Bản chất ma trận SWOT',
    question: 'Tại sao việc thực hiện ma trận SWOT được coi là một "nghệ thuật"?',
    options: [
      { key: 'A', text: 'Vì nó đòi hỏi sự phán đoán và tài năng của các nhà quản trị trong việc lựa chọn các kết hợp tối ưu' },
      { key: 'B', text: 'Vì nó chỉ dựa trên các bản vẽ thiết kế' },
      { key: 'C', text: 'Vì nó không cần dữ liệu thực tế' },
      { key: 'D', text: 'Vì nó chỉ dành cho những người học chuyên ngành nghệ thuật' }
    ],
    correctKey: 'A',
    explanation: 'Xây dựng và vận dụng SWOT đòi hỏi tư duy chiến lược, khả năng phán đoán và sáng tạo để phối hợp hiệu quả các yếu tố bên trong và bên ngoài (như SO, WO, ST, WT).',
    rewardXP: 100
  },
  {
    id: 3,
    category: 'T',
    title: 'Câu 3: Nhận diện Thách thức (Threats)',
    question: 'Trong phân tích kinh doanh, yếu tố nào sau đây là Thách thức (Threats)?',
    options: [
      { key: 'A', text: 'Đội ngũ nhân sự có tay nghề cao' },
      { key: 'B', text: 'Thương hiệu đã có uy tín lâu năm' },
      { key: 'C', text: 'Đối thủ cạnh tranh mới gia nhập thị trường với giá thành rẻ' },
      { key: 'D', text: 'Quy trình sản xuất chưa tự động hoá' }
    ],
    correctKey: 'C',
    explanation: 'Đối thủ mới giá rẻ là tác động bất lợi đến từ môi trường bên ngoài. A, B là Điểm mạnh; D là Điểm yếu.',
    rewardXP: 100
  },
  {
    id: 4,
    category: 'O',
    title: 'Câu 4: Vận dụng Chiến lược S-O',
    question: 'Một cửa hàng thời trang có điểm mạnh là thiết kế riêng theo mùa và lượng khách trung thành ổn định. Trong khi xu hướng mua sắm trực tuyến và livestream bán hàng đang tăng mạnh, cửa hàng nên chọn hành động nào theo chiến lược SO?',
    options: [
      { key: 'A', text: 'Đóng cửa hàng trực tuyến để tập trung giữ khách cũ' },
      { key: 'B', text: 'Livestream giới thiệu bộ sưu tập mới để tiếp cận khách mua sắm online' },
      { key: 'C', text: 'Giảm giá sâu để xả hàng tồn kho do đối thủ cạnh tranh' },
      { key: 'D', text: 'Thu hẹp quy mô nhân sự để cắt giảm chi phí cố định' }
    ],
    correctKey: 'B',
    explanation: 'Chiến lược SO tận dụng ưu điểm nội tại (thiết kế độc quyền, uy tín) để nắm bắt cơ hội thị trường (xu hướng livestream, mua online bùng nổ).',
    rewardXP: 100
  },
  {
    id: 5,
    category: 'S',
    title: 'Câu 5: Khái niệm Chiến lược S-O',
    question: 'Chiến lược S-O trong ma trận SWOT được hiểu là gì?',
    options: [
      { key: 'A', text: 'Sử dụng điểm mạnh để khai thác cơ hội' },
      { key: 'B', text: 'Khắc phục điểm yếu để tận dụng cơ hội' },
      { key: 'C', text: 'Sử dụng điểm mạnh để hạn chế thách thức' },
      { key: 'D', text: 'Khắc phục điểm yếu để hạn chế rủi ro' }
    ],
    correctKey: 'A',
    explanation: 'Chiến lược S-O là sử dụng những điểm mạnh sẵn có để tối đa hóa và tận dụng các cơ hội từ môi trường bên ngoài.',
    rewardXP: 100
  },
  {
    id: 6,
    category: 'W',
    title: 'Câu 6: Môi trường bên trong cá nhân',
    question: 'Trong phân tích SWOT, yếu tố nào sau đây thuộc môi trường bên trong của cá nhân?',
    options: [
      { key: 'A', text: 'Cơ hội và thách thức' },
      { key: 'B', text: 'Điểm mạnh và cơ hội' },
      { key: 'C', text: 'Điểm mạnh và điểm yếu' },
      { key: 'D', text: 'Điểm yếu và thách thức' }
    ],
    correctKey: 'C',
    explanation: 'Điểm mạnh (S) và Điểm yếu (W) thuộc nội tại cá nhân, phản ánh năng lực, kỹ năng, thói quen và hạn chế của mỗi người.',
    rewardXP: 100
  },
  {
    id: 7,
    category: 'O',
    title: 'Câu 7: Tình huống Cơ hội (O)',
    question: 'Một sinh viên muốn tìm kiếm cơ hội thực tập tại công ty du lịch. Sinh viên này có ngoại ngữ tốt nhưng chưa có kinh nghiệm thực tế. Nhà trường đang tổ chức chương trình kết nối sinh viên với các doanh nghiệp. Theo SWOT, chương trình của trường được xếp vào yếu tố nào?',
    options: [
      { key: 'A', text: 'Điểm mạnh (S)' },
      { key: 'B', text: 'Điểm yếu (W)' },
      { key: 'C', text: 'Cơ hội (O)' },
      { key: 'D', text: 'Thách thức (T)' }
    ],
    correctKey: 'C',
    explanation: 'Chương trình ngày hội kết nối do nhà trường tổ chức là điều kiện thuận lợi đến từ môi trường bên ngoài (Cơ hội - O).',
    rewardXP: 100
  },
  {
    id: 8,
    category: 'S',
    title: 'Câu 8: Nhận diện S & W cá nhân',
    question: 'Một sinh viên giỏi ngoại ngữ nhưng thiếu tự tin khi thuyết trình trước đám đông. Hai đặc điểm này lần lượt thuộc yếu tố nào trong SWOT?',
    options: [
      { key: 'A', text: 'Điểm mạnh và điểm yếu' },
      { key: 'B', text: 'Cơ hội và thách thức' },
      { key: 'C', text: 'Điểm mạnh và thách thức' },
      { key: 'D', text: 'Cơ hội và điểm yếu' }
    ],
    correctKey: 'A',
    explanation: 'Giỏi ngoại ngữ là Điểm mạnh (Strengths) về năng lực cá nhân; thiếu tự tin khi thuyết trình là Điểm yếu (Weaknesses) cần rèn luyện.',
    rewardXP: 100
  }
];

export const SMART_PILLARS: SmartPillar[] = [
  {
    letter: 'S',
    nameVi: 'Cụ thể',
    nameEn: 'Specific',
    tagline: 'Mục tiêu rõ ràng, không mơ hồ',
    description: 'Xác định chính xác điều cần làm, phạm vi và ranh giới hành động.',
    application: 'Ôn tập trọn vẹn 9 chương môn thi, học cuốn chiếu từng trang/từng chương, tắt thông báo và cách ly điện thoại khi ngồi vào bàn học.',
    detailPoints: [
      'Gắn đúng bài toán "9 chapters" thay vì chỉ nói "cố gắng học chăm".',
      'Xóa bỏ sự mơ hồ bằng nguyên tắc: đọc hiểu, tóm tắt và làm bài tập từng chương.'
    ]
  },
  {
    letter: 'M',
    nameVi: 'Đo lường được',
    nameEn: 'Measurable',
    tagline: 'Theo dõi tiến độ định lượng',
    description: 'Gắn mục tiêu với các con số, chỉ số kiểm tra thực tế để biết mình đang ở đâu.',
    application: 'Theo dõi số chương hoàn thành trên checklist từ 0/9 → 9/9, duy trì nhịp độ tối thiểu 2 chương/ngày, và đếm số phiên học không chạm điện thoại.',
    detailPoints: [
      'Có checklist tick hoàn thành trực quan.',
      'Định lượng tốc độ tối thiểu: 2 chương/ngày.'
    ]
  },
  {
    letter: 'A',
    nameVi: 'Khả thi',
    nameEn: 'Achievable',
    tagline: 'Vừa sức, hạ rào cản khởi đầu',
    description: 'Chia nhỏ khối lượng để tránh cảm giác quá tải gây bỏ cuộc.',
    application: 'Chia đều 9 chương trong 5 ngày (~1,8 – 2 chương/ngày) thay vì dồn hết vào 2 ngày cuối; bắt đầu từ việc dễ nhất là lật trang sách đầu tiên.',
    detailPoints: [
      'Tránh tâm lý "nước đến chân mới nhảy" dồn 9 chương vào đêm trước thi.',
      'Khởi động nhẹ nhàng với nguyên tắc "One page at a time".'
    ]
  },
  {
    letter: 'R',
    nameVi: 'Thực tế / Phù hợp',
    nameEn: 'Relevant',
    tagline: 'Đánh trúng gốc rễ vấn đề',
    description: 'Phục vụ trực tiếp cho mục đích quan trọng nhất ở thời điểm hiện tại.',
    application: 'Giải quyết triệt để thói quen lướt điện thoại và tâm lý trì hoãn "thêm 5 phút"; hướng thẳng đến kết quả thi cử tốt mà không bị kiệt sức.',
    detailPoints: [
      'Tập trung cao độ vào kỳ thi sắp tới thay vì làm các việc râu ria.',
      'Bảo vệ giấc ngủ và sức khỏe tinh thần trước ngày thi.'
    ]
  },
  {
    letter: 'T',
    nameVi: 'Có thời hạn',
    nameEn: 'Time-bound',
    tagline: 'Hạn chót dứt khoát',
    description: 'Có mốc thời gian bắt đầu và kết thúc cụ thể, không trì hoãn.',
    application: 'Thực hiện liên tục trong 5 ngày (từ mốc còn 6 ngày đến trước thi 1 ngày), chốt hạn hoàn tất toàn bộ 9 chương trước 22:00 ngày trước kỳ thi.',
    detailPoints: [
      'Khung thời gian 5 ngày bám sát lịch thi.',
      'Mốc 22:00 giúp đêm cuối ngủ đủ giấc, sẵn sàng bước vào phòng thi.'
    ]
  }
];

export const SMART_GOAL_FULL = "Trong vòng 5 ngày tiếp theo (từ ngày còn 6 ngày đến trước ngày thi 1 ngày), hoàn thành việc đọc hiểu, tóm tắt và làm bài tập ôn tập đủ 9 chương của môn thi bằng cách học tối thiểu 2 chương mỗi ngày (trong các khung tập trung không dùng điện thoại, bắt đầu từ từng trang đầu tiên) và tích hoàn thành trên bảng theo dõi 9 chương trước 22:00 ngày trước kỳ thi.";

export const FIVE_DAY_SCHEDULE = [
  { day: 1, title: 'Ngày 1 (Còn 6 ngày)', chapters: 'Chương 1 & Chương 2', note: 'Hạ rào cản, đọc trang đầu tiên, cách ly điện thoại' },
  { day: 2, title: 'Ngày 2 (Còn 5 ngày)', chapters: 'Chương 3 & Chương 4', note: 'Duy trì nhịp độ tập trung, tóm tắt ý chính' },
  { day: 3, title: 'Ngày 3 (Còn 4 ngày)', chapters: 'Chương 5 & Chương 6', note: 'Vượt dốc kiến thức khó, làm bài tập mẫu' },
  { day: 4, title: 'Ngày 4 (Còn 3 ngày)', chapters: 'Chương 7 & Chương 8', note: 'Tăng tốc về đích, ôn tập cuốn chiếu' },
  { day: 5, title: 'Ngày 5 (Còn 1-2 ngày)', chapters: 'Chương 9 & Tổng ôn', note: 'Hoàn tất trước 22:00, ngủ sớm giữ sức khỏe' }
];

export const PRESENTER_FAQ = [
  {
    q: 'Khán giả đề xuất mục tiêu đạt ≥ 80% câu đúng mỗi chương?',
    a: 'Rất tốt cho đo lường chất lượng! Tuy nhiên ở bối cảnh nhân vật còn chưa bắt đầu và đang quá tải, nên ưu tiên hoàn thành tiến độ 9 chương trước, sau đó dùng tỷ lệ đúng làm KPI nâng cao.'
  },
  {
    q: 'Khán giả muốn chia mục tiêu theo từng ngày riêng lẻ?',
    a: 'Mục tiêu 5 ngày là "khung đích đến lớn", còn lịch trình từng ngày là "kế hoạch hành động chi tiết" cắm vào bên trong—hai cách này bổ trợ cho nhau!'
  },
  {
    q: 'Mốc 22:00 hoặc nhịp 2 chương/ngày có bị cứng nhắc không?',
    a: 'Hoàn toàn có thể điều chỉnh linh hoạt theo độ dài chương và nhịp sinh học cá nhân, miễn giữ vững nguyên tắc chia nhỏ và có deadline dứt khoát trước đêm thi.'
  },
  {
    q: 'Nhờ bạn bè hỗ trợ nhắc nhở có phải là mục tiêu SMART?',
    a: 'Bạn bè hỗ trợ là nguồn lực bên ngoài giúp tăng tính Khả thi (A), nhưng cốt lõi mục tiêu vẫn phải gắn với hành vi và kỷ luật tự giác do chính người học kiểm soát.'
  }
];
