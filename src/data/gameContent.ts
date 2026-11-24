import { DialogueLine, QuizQuestion, SmartCard, SmartMinigameQuestion } from '../types/game';

export const PROLOGUE_DIALOGUES: DialogueLine[] = [
  {
    id: 'p1',
    speaker: 'alex',
    name: 'Minh',
    expression: 'sleepy',
    text: 'Chỉ còn 6 ngày nữa là thi rồi…',
    subtext: 'EXAM: 6 DAYS LEFT | CHAPTERS: 0/9',
    background: 'bedroom',
    soundCue: 'prologue'
  },
  {
    id: 'p2',
    speaker: 'alex',
    name: 'Minh',
    expression: 'worried',
    text: 'Chín chương cần ôn mà mình vẫn chưa bắt đầu được chương nào cả.',
    background: 'bedroom'
  },
  {
    id: 'p3',
    speaker: 'alex',
    name: 'Minh',
    expression: 'determined',
    text: 'Thôi, hôm nay nhất định phải ngồi vào bàn học nghiêm túc!',
    background: 'bedroom'
  },
  {
    id: 'p4',
    speaker: 'system',
    name: 'SYSTEM NOTIFICATION',
    expression: 'neutral',
    text: '📱 [Ting!] Bạn có 1 thông báo mới từ ứng dụng Video.',
    background: 'bedroom'
  },
  {
    id: 'p5',
    speaker: 'glitch',
    name: 'Tick',
    expression: 'sneaky',
    text: 'Khoan đã Minh ơi! Kênh yêu thích vừa ra video mới kìa!',
    subtext: 'Cám dỗ của sự trì hoãn',
    background: 'bedroom',
    soundCue: 'glitch'
  },
  {
    id: 'p6',
    speaker: 'glitch',
    name: 'Tick',
    expression: 'laugh',
    text: 'Xem thêm 5 phút nữa thôi mà, rồi học cũng có muộn gì đâu!',
    background: 'bedroom'
  },
  {
    id: 'p7',
    speaker: 'alex',
    name: 'Minh',
    expression: 'confused',
    text: 'Ừm… chắc 5 phút cũng không sao đâu nhỉ?',
    background: 'bedroom'
  },
  {
    id: 'p8',
    speaker: 'system',
    name: 'SYSTEM',
    expression: 'neutral',
    text: '⏳ Vài giờ sau… Đồng hồ điểm 23:30.',
    background: 'bedroom'
  },
  {
    id: 'p9',
    speaker: 'alex',
    name: 'Minh',
    expression: 'worried',
    text: 'Khoan… sao đã hết cả buổi tối rồi?! Mình vẫn chưa đọc được trang nào!',
    background: 'bedroom'
  },
  {
    id: 'p10',
    speaker: 'glitch',
    name: 'Tick',
    expression: 'sneaky',
    text: 'Không sao đâu! Ngày mai bắt đầu vẫn kịp chán mà, đi ngủ thôi!',
    background: 'bedroom'
  },
  {
    id: 'p11',
    speaker: 'system',
    name: 'SYSTEM GATEWAY',
    expression: 'neutral',
    text: '⚡ [BẤT NGỜ MÀN HÌNH LAPTOP PHÁT SÁNG RỰC RỠ] \n✨ "NEW QUEST AVAILABLE: YOUR NEXT LEVEL IS WAITING."',
    background: 'gateway'
  }
];

export const MEET_NOVA_DIALOGUES: DialogueLine[] = [
  {
    id: 'mn1',
    speaker: 'nova',
    name: 'Linh',
    expression: 'smile',
    text: 'Chào mừng Minh đến với thế giới LEVEL UP!',
    subtext: 'The Mentor – Người bạn đồng hành & Cố vấn chiến lược',
    background: 'swot_room',
    soundCue: 'swot'
  },
  {
    id: 'mn2',
    speaker: 'nova',
    name: 'Linh',
    expression: 'confident',
    text: 'Tôi là Linh, người sẽ đồng hành cùng cậu tìm ra chiến lược bứt phá kỳ thi này!',
    background: 'swot_room'
  },
  {
    id: 'mn3',
    speaker: 'alex',
    name: 'Minh',
    expression: 'confused',
    text: 'Chiến lược ư? Nhưng tôi chỉ đang lo sốt vó cho kỳ thi đại học 6 ngày nữa thôi mà!',
    background: 'swot_room'
  },
  {
    id: 'mn4',
    speaker: 'nova',
    name: 'Linh',
    expression: 'explain',
    text: 'Trước khi xây dựng bất kỳ kế hoạch nào, cậu phải hiểu rõ bản thân mình đang đứng ở đâu.',
    background: 'swot_room'
  },
  {
    id: 'mn5',
    speaker: 'nova',
    name: 'Linh',
    expression: 'thinking',
    text: 'Cậu có những điểm mạnh nào? Điều gì đang cản trở cậu? Xung quanh có cơ hội nào có thể tận dụng?',
    background: 'swot_room'
  },
  {
    id: 'mn6',
    speaker: 'nova',
    name: 'Linh',
    expression: 'confident',
    text: 'Và đó chính là lý do ma trận SWOT xuất hiện. Hãy cùng nhau giải mã 8 thử thách trí tuệ ngay bây giờ!',
    background: 'swot_room'
  }
];

export const SWOT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'THE FIRST KEY',
    question: 'Thuật ngữ SWOT là viết tắt của các từ tiếng Anh nào sau đây?',
    options: [
      { key: 'A', text: 'Strategy, Weakness, Opportunity, Target.' },
      { key: 'B', text: 'Strengths, Weaknesses, Opportunities, Threats.' },
      { key: 'C', text: 'Service, Wage, Output, Training.' },
      { key: 'D', text: 'Strengths, Weaknesses, Operations, Time.' }
    ],
    correctKey: 'B',
    explanation: 'SWOT là viết tắt của Strengths (Điểm mạnh), Weaknesses (Điểm yếu), Opportunities (Cơ hội) và Threats (Thách thức).',
    correctDialogue: {
      speaker: 'nova',
      expression: 'celebrate',
      text: 'Chính xác! Cậu đã mở khóa bốn yếu tố nền tảng của SWOT.'
    },
    rewardXP: 100,
    unlockedEffect: 'Mở khóa 4 yếu tố SWOT'
  },
  {
    id: 2,
    title: "THE STRATEGIST'S MIND",
    question: 'Tại sao việc thực hiện ma trận SWOT được coi là một “nghệ thuật”?',
    options: [
      { key: 'A', text: 'Vì nó đòi hỏi sự phán đoán và tài năng của các nhà quản trị trong việc lựa chọn các kết hợp tối ưu.' },
      { key: 'B', text: 'Vì nó chỉ dựa trên các bản vẽ thiết kế mỹ thuật.' },
      { key: 'C', text: 'Vì nó không cần dữ liệu thực tế.' },
      { key: 'D', text: 'Vì nó chỉ dành riêng cho những người học chuyên ngành nghệ thuật.' }
    ],
    correctKey: 'A',
    explanation: 'Xây dựng và vận dụng SWOT không chỉ liệt kê các yếu tố mà còn cần tư duy chiến lược, tài năng và sự phán đoán của nhà quản trị để phối hợp các tổ hợp như SO, WO, ST, WT.',
    correctDialogue: {
      speaker: 'nova',
      expression: 'confident',
      text: 'Phân tích chỉ là bước đầu. Điều quan trọng là biết kết hợp thông tin để đưa ra chiến lược phù hợp.'
    },
    rewardXP: 100,
    unlockedEffect: 'Kết nối chiến lược SO, WO, ST, WT'
  },
  {
    id: 3,
    title: 'DETECT THE THREAT',
    question: 'Trong phân tích kinh doanh, yếu tố nào sau đây là Thách thức (Threats)?',
    options: [
      { key: 'A', text: 'Đội ngũ nhân sự có tay nghề cao.' },
      { key: 'B', text: 'Thương hiệu đã có uy tín lâu năm.' },
      { key: 'C', text: 'Đối thủ cạnh tranh mới gia nhập thị trường với giá thành rẻ.' },
      { key: 'D', text: 'Quy trình sản xuất chưa tự động hóa.' }
    ],
    correctKey: 'C',
    explanation: 'Đối thủ mới giá rẻ là yếu tố bất lợi từ môi trường bên ngoài (Threats). A và B là Điểm mạnh (S), D là Điểm yếu (W).',
    correctDialogue: {
      speaker: 'nova',
      expression: 'explain',
      text: 'Đúng rồi! Thách thức là những yếu tố bất lợi đến từ môi trường bên ngoài.'
    },
    rewardXP: 100,
    unlockedEffect: 'Kích hoạt Threat Scanner'
  },
  {
    id: 4,
    title: 'THE BUSINESS CHALLENGE',
    question: 'Một cửa hàng thời trang có điểm mạnh là thiết kế riêng theo mùa và lượng khách trung thành ổn định. Trong khi xu hướng mua sắm trực tuyến và livestream bán hàng đang tăng mạnh. Cửa hàng nên chọn hành động nào theo chiến lược SO?',
    options: [
      { key: 'A', text: 'Đóng cửa hàng trực tuyến để tập trung giữ khách cũ.' },
      { key: 'B', text: 'Livestream giới thiệu bộ sưu tập mới để tiếp cận khách mua sắm online.' },
      { key: 'C', text: 'Giảm giá sâu để xả hàng tồn kho do đối thủ cạnh tranh.' },
      { key: 'D', text: 'Thu hẹp quy mô nhân sự để cắt giảm chi phí cố định.' }
    ],
    correctKey: 'B',
    explanation: 'Chiến lược SO tận dụng ưu điểm thiết kế độc quyền và uy tín (S) để nắm bắt cơ hội thị trường livestream & mua sắm online đang bùng nổ (O).',
    correctDialogue: {
      speaker: 'nova',
      expression: 'smile',
      text: 'Khi điểm mạnh gặp đúng cơ hội, một chiến lược hiệu quả có thể được hình thành.'
    },
    rewardXP: 100,
    unlockedEffect: 'Ghép nối thẻ chiến lược SO',
    background: 'fashion_store'
  },
  {
    id: 5,
    title: 'COMBINE YOUR POWER',
    question: 'Chiến lược S-O trong ma trận SWOT được hiểu là gì?',
    options: [
      { key: 'A', text: 'Sử dụng điểm mạnh để khai thác cơ hội.' },
      { key: 'B', text: 'Khắc phục điểm yếu để tận dụng cơ hội.' },
      { key: 'C', text: 'Sử dụng điểm mạnh để hạn chế thách thức.' },
      { key: 'D', text: 'Khắc phục điểm yếu để hạn chế rủi ro.' }
    ],
    correctKey: 'A',
    explanation: 'Chiến lược S-O (Strengths - Opportunities) là sử dụng những điểm mạnh nội tại sẵn có để đón đầu và tận dụng tối đa các cơ hội từ bên ngoài.',
    correctDialogue: {
      speaker: 'nova',
      expression: 'celebrate',
      text: 'Xuất sắc! Cậu đã biết cách biến lợi thế thành hành động.'
    },
    rewardXP: 100,
    unlockedEffect: 'Kích hoạt Thẻ S-O Phát Sáng'
  },
  {
    id: 6,
    title: 'LOOK INSIDE YOURSELF',
    question: 'Trong phân tích SWOT, yếu tố nào sau đây thuộc môi trường bên trong của cá nhân?',
    options: [
      { key: 'A', text: 'Cơ hội và thách thức.' },
      { key: 'B', text: 'Điểm mạnh và cơ hội.' },
      { key: 'C', text: 'Điểm mạnh và điểm yếu.' },
      { key: 'D', text: 'Điểm yếu và thách thức.' }
    ],
    correctKey: 'C',
    explanation: 'Điểm mạnh (S) và Điểm yếu (W) thuộc về nội tại cá nhân/tổ chức; còn Cơ hội (O) và Thách thức (T) bắt nguồn từ môi trường bên ngoài.',
    correctDialogue: {
      speaker: 'nova',
      expression: 'explain',
      text: 'Muốn phát triển bản thân, trước hết phải nhận diện được những gì thuộc về chính mình.'
    },
    rewardXP: 100,
    unlockedEffect: 'Phân loại Internal vs External Factors'
  },
  {
    id: 7,
    title: 'FIND YOUR OPPORTUNITY',
    question: 'Một sinh viên muốn tìm kiếm cơ hội thực tập tại công ty du lịch. Hiện tại, sinh viên này có khả năng ngoại ngữ tốt nhưng chưa có kinh nghiệm làm việc thực tế. Nhà trường đang tổ chức chương trình kết nối sinh viên với các doanh nghiệp. Theo SWOT, chương trình của nhà trường được xếp vào yếu tố nào?',
    options: [
      { key: 'A', text: 'Điểm mạnh (S).' },
      { key: 'B', text: 'Điểm yếu (W).' },
      { key: 'C', text: 'Cơ hội (O).' },
      { key: 'D', text: 'Thách thức (T).' }
    ],
    correctKey: 'C',
    explanation: 'Chương trình kết nối doanh nghiệp do nhà trường tổ chức là cơ hội thuận lợi từ môi trường bên ngoài (Opportunities) để sinh viên tiếp cận nhà tuyển dụng.',
    correctDialogue: {
      speaker: 'nova',
      expression: 'confident',
      text: 'Cơ hội luôn có thể xuất hiện xung quanh chúng ta. Điều quan trọng là nhận ra và tận dụng chúng.'
    },
    rewardXP: 100,
    unlockedEffect: 'Mở khóa Opportunity Finder',
    background: 'career_fair'
  },
  {
    id: 8,
    title: 'THE FINAL SWOT TRIAL',
    question: 'Một sinh viên giỏi ngoại ngữ nhưng thiếu tự tin khi thuyết trình. Hai đặc điểm này lần lượt thuộc yếu tố nào trong SWOT?',
    options: [
      { key: 'A', text: 'Điểm mạnh và điểm yếu.' },
      { key: 'B', text: 'Cơ hội và thách thức.' },
      { key: 'C', text: 'Điểm mạnh và thách thức.' },
      { key: 'D', text: 'Cơ hội và điểm yếu.' }
    ],
    correctKey: 'A',
    explanation: 'Giỏi ngoại ngữ là năng lực cá nhân sẵn có (Điểm mạnh - S), còn thiếu tự tin thuyết trình là rào cản kỹ năng nội tại cần cải thiện (Điểm yếu - W).',
    correctDialogue: {
      speaker: 'nova',
      expression: 'celebrate',
      text: 'Hoàn hảo! Hiểu được điểm mạnh và điểm yếu không phải để tự ti, mà để biết mình cần phát triển như thế nào.'
    },
    rewardXP: 100,
    unlockedEffect: 'Hoàn thành Ma trận SWOT Hoàn Chỉnh'
  }
];

export const SMART_CARDS_DATA: SmartCard[] = [
  {
    key: 'S',
    letter: 'S',
    titleVi: 'Cụ thể',
    titleEn: 'Specific',
    iconName: 'Target',
    guidingQuestion: 'Cụ thể cậu muốn hoàn thành điều gì?',
    definition: 'Mục tiêu phải xác định rõ công việc cần thực hiện, tránh diễn đạt chung chung mơ hồ.',
    caseApplication: [
      'Đọc hiểu, tóm tắt và ôn tập đủ 9 chương của môn thi.',
      'Học từng trang, giải quyết từng chương dứt điểm.',
      'Hạn chế hoặc cách ly hoàn toàn điện thoại trong phiên học.'
    ],
    alexDialogue: 'Thay vì nói chung chung "sẽ học chăm hơn", tôi cần xác định rõ mình phải hoàn thành đủ 9 chương!',
    unlockedNotification: 'SPECIFIC UNLOCKED'
  },
  {
    key: 'M',
    letter: 'M',
    titleVi: 'Đo lường được',
    titleEn: 'Measurable',
    iconName: 'BarChart2',
    guidingQuestion: 'Làm thế nào để biết cậu đang thực sự tiến bộ?',
    definition: 'Mục tiêu cần có chỉ số hoặc tiêu chí rõ ràng để theo dõi và đánh giá mức độ hoàn thành.',
    caseApplication: [
      'Theo dõi số chương đã hoàn thành cụ thể từ 0/9 đến 9/9.',
      'Đánh giá tiến độ từng ngày hoàn thành đúng mục tiêu.',
      'Theo dõi các phiên học tập trung trọn vẹn không chạm điện thoại.'
    ],
    alexDialogue: 'Tôi có thể dùng một checklist để đánh dấu số chương mình đã hoàn thành theo từng ngày!',
    unlockedNotification: 'MEASURABLE UNLOCKED'
  },
  {
    key: 'A',
    letter: 'A',
    titleVi: 'Khả thi',
    titleEn: 'Achievable',
    iconName: 'CheckCircle2',
    guidingQuestion: 'Kế hoạch này có thực sự nằm trong khả năng của cậu không?',
    definition: 'Mục tiêu cần phù hợp với năng lực, thời gian, nguồn lực và điều kiện thực tế.',
    caseApplication: [
      'Chia 9 chương thành các phần nhỏ trong 5 ngày (trung bình 1,8 – 2 chương/ngày).',
      'Bắt đầu ngay từ từng trang đầu tiên, không trì hoãn.',
      'Tránh dồn toàn bộ 9 chương vào 1–2 ngày cuối gây kiệt sức.',
      'Nhờ bạn bè hoặc người đồng hành hỗ trợ nhắc nhở.'
    ],
    alexDialogue: 'Chín chương nghe rất choáng ngợp, nhưng chia nhỏ ra 2 chương mỗi ngày thì hoàn toàn trong tầm tay!',
    unlockedNotification: 'ACHIEVABLE UNLOCKED'
  },
  {
    key: 'R',
    letter: 'R',
    titleVi: 'Liên quan, phù hợp',
    titleEn: 'Relevant',
    iconName: 'Compass',
    guidingQuestion: 'Mục tiêu này có thực sự phục vụ điều cậu muốn đạt được không?',
    definition: 'Mục tiêu phải gắn liền với nhu cầu, mục đích cốt lõi và định hướng của người thực hiện.',
    caseApplication: [
      'Phục vụ trực tiếp kỳ thi môn học sắp diễn ra sau 6 ngày.',
      'Giải quyết triệt để thói quen trì hoãn và thói quen lướt điện thoại vô thức.',
      'Hướng đến hoàn thành ôn tập với tâm lý tự tin, không bị quá tải.'
    ],
    alexDialogue: 'Tôi cần tập trung vào việc ôn thi ngay thay vì làm những việc linh tinh khác!',
    unlockedNotification: 'RELEVANT UNLOCKED'
  },
  {
    key: 'T',
    letter: 'T',
    titleVi: 'Có thời hạn',
    titleEn: 'Time-bound',
    iconName: 'Clock',
    guidingQuestion: 'Khi nào cậu phải hoàn thành mục tiêu này?',
    definition: 'Mục tiêu cần có khung thời gian thực hiện và hạn chót (deadline) cụ thể, dứt khoát.',
    caseApplication: [
      'Thực hiện kế hoạch trong vòng 5 ngày tới.',
      'Có mốc kiểm tra tiến độ hàng ngày vào các buổi sáng/chiều.',
      'Hoàn thành toàn bộ 9 chương trước 22:00 ngày trước kỳ thi.'
    ],
    alexDialogue: 'Lần này tôi sẽ không nói "để mai tính". Tôi sẽ có mốc 22:00 cụ thể!',
    unlockedNotification: 'TIME-BOUND UNLOCKED'
  }
];

export const SMART_MINIGAME_QUESTIONS: SmartMinigameQuestion[] = [
  {
    key: 'S',
    element: 'Specific (Cụ thể)',
    options: [
      { key: 'A', text: 'Cố gắng học chăm chỉ hơn.' },
      { key: 'B', text: 'Đọc hiểu, tóm tắt và ôn tập đủ 9 chương.' },
      { key: 'C', text: 'Học bất cứ khi nào có thời gian rảnh.' }
    ],
    correctKey: 'B',
    rewardXP: 100
  },
  {
    key: 'M',
    element: 'Measurable (Đo lường được)',
    options: [
      { key: 'A', text: 'Theo dõi số chương đã hoàn thành trên checklist 9 chương.' },
      { key: 'B', text: 'Học đến khi nào cảm thấy mệt thì thôi.' },
      { key: 'C', text: 'Không cần ghi chép hay kiểm tra tiến độ.' }
    ],
    correctKey: 'A',
    rewardXP: 100
  },
  {
    key: 'A',
    element: 'Achievable (Khả thi)',
    options: [
      { key: 'A', text: 'Thức trắng đêm học hết 9 chương trong 1 buổi.' },
      { key: 'B', text: 'Chờ đến sát ngày thi rồi mới bắt đầu học.' },
      { key: 'C', text: 'Chia 9 chương thành các phần nhỏ trong 5 ngày (mỗi ngày ~2 chương).' }
    ],
    correctKey: 'C',
    rewardXP: 100
  },
  {
    key: 'R',
    element: 'Relevant (Liên quan, phù hợp)',
    options: [
      { key: 'A', text: 'Dành thời gian xem thêm video giải trí cho đỡ căng thẳng.' },
      { key: 'B', text: 'Tập trung vào kiến thức môn thi và hạn chế tối đa xao nhãng.' },
      { key: 'C', text: 'Làm những công việc không liên quan đến bài thi sắp tới.' }
    ],
    correctKey: 'B',
    rewardXP: 100
  },
  {
    key: 'T',
    element: 'Time-bound (Có thời hạn)',
    options: [
      { key: 'A', text: 'Hoàn thành toàn bộ trước 22 giờ ngày trước kỳ thi.' },
      { key: 'B', text: 'Hoàn thành lúc nào có hứng thì nộp.' },
      { key: 'C', text: 'Không cần đặt deadline vì sẽ tạo áp lực.' }
    ],
    correctKey: 'A',
    rewardXP: 100
  }
];

export const PRESENTER_SITUATIONS = [
  {
    id: 1,
    title: 'Tình huống 1: Khán giả đề xuất đạt ít nhất 80% câu hỏi ôn tập đúng ở mỗi chương',
    guidance: 'Đây là một cách đo lường chất lượng đầu ra rất tốt nếu có ngân hàng câu hỏi phù hợp. Tuy nhiên, trong tình huống nhân vật chưa bắt đầu học và đang quá tải, nên ưu tiên hoàn thành tiến độ 9 chương trước, sau đó sử dụng tỷ lệ câu đúng làm chỉ số nâng cao.'
  },
  {
    id: 2,
    title: 'Tình huống 2: Khán giả đề xuất chia mục tiêu thành nhiệm vụ riêng từng ngày',
    guidance: 'Đây là bước cụ thể hóa kế hoạch rất thiết thực. Mục tiêu tổng thể xác định đích đến, còn lịch trình từng ngày (Action Plan) giúp chuyển mục tiêu thành hành động ngay lập tức.'
  },
  {
    id: 3,
    title: 'Tình huống 3: Khán giả cho rằng mốc 22 giờ hoặc nhịp 2 chương mỗi ngày chưa hợp lý',
    guidance: 'Có thể linh hoạt điều chỉnh theo độ dài từng chương, năng lực, thời gian và nhịp sinh hoạt cá nhân, miễn vẫn đảm bảo nguyên tắc chia nhỏ khối lượng và có thời hạn hoàn thành dứt khoát.'
  },
  {
    id: 4,
    title: 'Tình huống 4: Khán giả đề xuất nhờ bạn bè hoặc người đồng hành nhắc nhở',
    guidance: 'Sự hỗ trợ từ bạn bè là nguồn lực bên ngoài giúp tăng tính khả thi. Tuy nhiên phần cốt lõi vẫn phải gắn với hành vi và kỷ luật tự giác mà chính người học có thể kiểm soát.'
  }
];
