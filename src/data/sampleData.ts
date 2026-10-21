import { MindMapData, ReadingPassage, CourtCase, EthicsDilemma, ArenaQuizQuestion, TeacherResource, LearningProgress } from '../types';

// 1. MIND MAP PRE-BUILT TEMPLATES
export const SAMPLE_MINDMAPS: MindMapData[] = [
  {
    id: 'mindmap-de-men',
    title: 'Bài học đường đời đầu tiên – Nhân vật Dế Mèn',
    grade: 6,
    layout: 'radial',
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-01T08:00:00Z',
    nodes: [
      {
        id: 'node-root',
        parentId: null,
        label: 'DẾ MÈN\nBài học đường đời đầu tiên',
        description: 'Tác phẩm Tô Hoài - GDPT 2018 Lớp 6',
        color: '#102A43',
        icon: 'book-open',
        x: 0,
        y: 0,
        level: 0,
      },
      // Branch 1: Ngoại hình (4 subbranches)
      {
        id: 'b1',
        parentId: 'node-root',
        label: '1. Ngoại hình & Vóc dáng',
        description: 'Chàng dế thanh niên cường tráng, đẹp đẽ',
        color: '#0F9D92',
        icon: 'user',
        x: 280,
        y: -180,
        level: 1,
      },
      {
        id: 'b1-1',
        parentId: 'b1',
        label: 'Càng mẫm bóng',
        description: 'Những cái vuốt ở chân, ở khoeo cứng dần và nhọn hoắt',
        color: '#0F9D92',
        x: 480,
        y: -240,
        level: 2,
      },
      {
        id: 'b1-2',
        parentId: 'b1',
        label: 'Cánh dài tận chấm đuôi',
        description: 'Một màu nâu bóng mỡ soi gương được',
        color: '#0F9D92',
        x: 480,
        y: -180,
        level: 2,
      },
      {
        id: 'b1-3',
        parentId: 'b1',
        label: 'Đầu to nổi từng tảng',
        description: 'Hai cái răng đen nhánh như hai lưỡi liềm máy',
        color: '#0F9D92',
        x: 480,
        y: -120,
        level: 2,
      },
      {
        id: 'b1-4',
        parentId: 'b1',
        label: 'Sợi râu dài uốn cong',
        description: 'Đi đứng oai vệ, điệu bộ rất đỗi hào hùng',
        color: '#0F9D92',
        x: 480,
        y: -60,
        level: 2,
      },

      // Branch 2: Tính cách & Tâm lý (4 subbranches)
      {
        id: 'b2',
        parentId: 'node-root',
        label: '2. Tính cách & Tâm lý',
        description: 'Kiêu căng, tự phụ và hiếu thắng',
        color: '#E6B450',
        icon: 'sparkles',
        x: 320,
        y: 60,
        level: 1,
      },
      {
        id: 'b2-1',
        parentId: 'b2',
        label: 'Tự tin thái quá',
        description: 'Tự hào coi mình là tay ghê gớm, có thể đứng đầu thiên hạ',
        color: '#E6B450',
        x: 520,
        y: 20,
        level: 2,
      },
      {
        id: 'b2-2',
        parentId: 'b2',
        label: 'Coi thường láng giềng',
        description: 'Khinh khỉnh chê Dế Choắt ốm yếu, lười nhác và bẩn thỉu',
        color: '#E6B450',
        x: 520,
        y: 80,
        level: 2,
      },
      {
        id: 'b2-3',
        parentId: 'b2',
        label: 'Thích ra oai bắt nạt',
        description: 'Cà khịa với tất cả bà con trong xóm cỏ',
        color: '#E6B450',
        x: 520,
        y: 140,
        level: 2,
      },
      {
        id: 'b2-4',
        parentId: 'b2',
        label: 'Nông nổi thiếu chín chắn',
        description: 'Hành động theo bản năng không lường trước hậu quả',
        color: '#E6B450',
        x: 520,
        y: 200,
        level: 2,
      },

      // Branch 3: Hành động sai lầm (3 subbranches)
      {
        id: 'b3',
        parentId: 'node-root',
        label: '3. Hành động sai lầm',
        description: 'Trêu chọc chị Cốc dẫn tới tai họa',
        color: '#E11D48',
        icon: 'scale',
        x: 180,
        y: 240,
        level: 1,
      },
      {
        id: 'b3-1',
        parentId: 'b3',
        label: 'Từ chối giúp Choắt',
        description: 'Ích kỷ không cho Choắt đào ngách thông sang hang mình',
        color: '#E11D48',
        x: 320,
        y: 300,
        level: 2,
      },
      {
        id: 'b3-2',
        parentId: 'b3',
        label: 'Hát véo von trêu Cốc',
        description: 'Đọc câu thơ châm chọc chị Cốc để thị uy với Dế Choắt',
        color: '#E11D48',
        x: 240,
        y: 360,
        level: 2,
      },
      {
        id: 'b3-3',
        parentId: 'b3',
        label: 'Lẩn trốn hèn nhát',
        description: 'Chui tọt vào hang sâu, nằm im thin thít mặc Choắt gánh chịu',
        color: '#E11D48',
        x: 140,
        y: 410,
        level: 2,
      },

      // Branch 4: Hậu quả đau đớn (3 subbranches)
      {
        id: 'b4',
        parentId: 'node-root',
        label: '4. Hậu quả đau đớn',
        description: 'Cái chết tức tưởi của Dế Choắt',
        color: '#8B5CF6',
        icon: 'heart',
        x: -240,
        y: 220,
        level: 1,
      },
      {
        id: 'b4-1',
        parentId: 'b4',
        label: 'Choắt bị Cốc mổ gãy lưng',
        description: 'Cơn thịnh nộ oan khiên giáng xuống người bạn yếu ớt',
        color: '#8B5CF6',
        x: -440,
        y: 270,
        level: 2,
      },
      {
        id: 'b4-2',
        parentId: 'b4',
        label: 'Lời trăng trối của Choắt',
        description: 'Khuyên Mèn bỏ thói hung hăng ngỗ nghịch kẻo rước vạ',
        color: '#8B5CF6',
        x: -440,
        y: 210,
        level: 2,
      },
      {
        id: 'b4-3',
        parentId: 'b4',
        label: 'Nỗi ăn năn tột cùng',
        description: 'Mèn ôm xác Choắt, khóc lóc và đắp nấm mộ sâu trong cỏ',
        color: '#8B5CF6',
        x: -440,
        y: 150,
        level: 2,
      },

      // Branch 5: Sự thay đổi nhận thức (3 subbranches)
      {
        id: 'b5',
        parentId: 'node-root',
        label: '5. Thay đổi nhận thức',
        description: 'Thức tỉnh nhân tâm và lòng trắc ẩn',
        color: '#2563EB',
        icon: 'lightbulb',
        x: -320,
        y: -40,
        level: 1,
      },
      {
        id: 'b5-1',
        parentId: 'b5',
        label: 'Soi xét lại bản thân',
        description: 'Hiểu rằng khỏe mạnh chỉ có ý nghĩa khi bảo vệ điều tốt đẹp',
        color: '#2563EB',
        x: -520,
        y: -80,
        level: 2,
      },
      {
        id: 'b5-2',
        parentId: 'b5',
        label: 'Trút bỏ tính kiêu ngạo',
        description: 'Chấm dứt thói trêu ghẹo, cà khịa láng giềng',
        color: '#2563EB',
        x: -520,
        y: -20,
        level: 2,
      },
      {
        id: 'b5-3',
        parentId: 'b5',
        label: 'Khao khát sống đẹp',
        description: 'Khởi đầu cho hành trình phiêu lưu trượng nghĩa cứu đời',
        color: '#2563EB',
        x: -520,
        y: 40,
        level: 2,
      },

      // Branch 6: Bài học rút ra (4 subbranches)
      {
        id: 'b6',
        parentId: 'node-root',
        label: '6. Bài học rút ra',
        description: 'Giá trị nhân văn & rèn luyện nhân cách',
        color: '#10B981',
        icon: 'award',
        x: -260,
        y: -200,
        level: 1,
      },
      {
        id: 'b6-1',
        parentId: 'b6',
        label: 'Không cậy sức ức hiếp',
        description: 'Sức mạnh đích thực nằm ở lòng trắc ẩn và sự bao dung',
        color: '#10B981',
        x: -460,
        y: -260,
        level: 2,
      },
      {
        id: 'b6-2',
        parentId: 'b6',
        label: 'Suy nghĩ trước khi làm',
        description: 'Mọi lời nói và hành vi bộc phát đều có thể gây hậu quả khôn lường',
        color: '#10B981',
        x: -460,
        y: -200,
        level: 2,
      },
      {
        id: 'b6-3',
        parentId: 'b6',
        label: 'Biết nhận lỗi & sửa sai',
        description: 'Dũng cảm nhận trách nhiệm và tự hoàn thiện nhân cách',
        color: '#10B981',
        x: -460,
        y: -140,
        level: 2,
      },
      {
        id: 'b6-4',
        parentId: 'b6',
        label: 'Tình thân ái cộng đồng',
        description: 'Sống sẻ chia, giúp đỡ những người có hoàn cảnh khó khăn hơn mình',
        color: '#10B981',
        x: -460,
        y: -80,
        level: 2,
      },
    ],
  },
  {
    id: 'mindmap-dong-chi',
    title: 'Phân tích bài thơ Đồng chí (Chính Hữu)',
    grade: 8,
    layout: 'bilateral',
    createdAt: '2026-03-02T08:00:00Z',
    updatedAt: '2026-03-02T08:00:00Z',
    nodes: [
      {
        id: 'root-dc',
        parentId: null,
        label: 'BÀI THƠ ĐỒNG CHÍ\nChính Hữu',
        description: 'Tượng đài tình đồng chí thiêng liêng thời kháng chiến',
        color: '#102A43',
        icon: 'book-open',
        x: 0,
        y: 0,
        level: 0,
      },
      {
        id: 'dc-1',
        parentId: 'root-dc',
        label: '1. Cơ sở tình đồng chí',
        description: 'Nguồn gốc xuất thân nghèo khó và chung lý tưởng',
        color: '#0F9D92',
        x: 260,
        y: -120,
        level: 1,
      },
      {
        id: 'dc-1-1',
        parentId: 'dc-1',
        label: 'Quê hương nghèo khó',
        description: 'Nước mặn đồng chua / Đất cày lên sỏi đá',
        color: '#0F9D92',
        x: 460,
        y: -150,
        level: 2,
      },
      {
        id: 'dc-1-2',
        parentId: 'dc-1',
        label: 'Chung lý tưởng chiến đấu',
        description: 'Súng bên súng, đầu sát bên đầu',
        color: '#0F9D92',
        x: 460,
        y: -90,
        level: 2,
      },
      {
        id: 'dc-2',
        parentId: 'root-dc',
        label: '2. Biểu hiện cảm động',
        description: 'Sự thấu hiểu tâm tư và sẻ chia gian lao',
        color: '#E6B450',
        x: 260,
        y: 80,
        level: 1,
      },
      {
        id: 'dc-2-1',
        parentId: 'dc-2',
        label: 'Gửi lại quê nhà',
        description: 'Ruộng nương gửi bạn thân cày, gian nhà không mặc kệ gió lung lay',
        color: '#E6B450',
        x: 460,
        y: 50,
        level: 2,
      },
      {
        id: 'dc-2-2',
        parentId: 'dc-2',
        label: 'Cái nắm tay ấm nóng',
        description: 'Thương nhau tay nắm lấy bàn tay truyền hơi ấm diệu kỳ',
        color: '#E6B450',
        x: 460,
        y: 110,
        level: 2,
      },
      {
        id: 'dc-3',
        parentId: 'root-dc',
        label: '3. Hình tượng kết tinh',
        description: 'Đêm phục kích rừng hoang sương muối',
        color: '#2563EB',
        x: -260,
        y: -60,
        level: 1,
      },
      {
        id: 'dc-3-1',
        parentId: 'dc-3',
        label: 'Hiện thực khốc liệt',
        description: 'Rừng hoang sương muối buốt giá',
        color: '#2563EB',
        x: -460,
        y: -90,
        level: 2,
      },
      {
        id: 'dc-3-2',
        parentId: 'dc-3',
        label: 'Đầu súng trăng treo',
        description: 'Sự kết hợp kỳ vĩ giữa hiện thực chiến đấu và lãng mạn thi ca',
        color: '#2563EB',
        x: -460,
        y: -30,
        level: 2,
      },
      {
        id: 'dc-4',
        parentId: 'root-dc',
        label: '4. Đặc sắc nghệ thuật',
        description: 'Ngôn từ hàm súc, mộc mạc mà lắng đọng',
        color: '#10B981',
        x: -260,
        y: 120,
        level: 1,
      },
      {
        id: 'dc-4-1',
        parentId: 'dc-4',
        label: 'Chi tiết chân thực',
        description: 'Áo rách vai, quần vài mảnh vá, chân không giày',
        color: '#10B981',
        x: -460,
        y: 90,
        level: 2,
      },
      {
        id: 'dc-4-2',
        parentId: 'dc-4',
        label: 'Câu thơ đặc biệt',
        description: 'Bản lề khép mở cảm xúc: Đồng chí! (câu đặc biệt hai chữ)',
        color: '#10B981',
        x: -460,
        y: 150,
        level: 2,
      },
    ],
  },
  {
    id: 'mindmap-rhetoric',
    title: 'Hệ thống Biện pháp tu từ Tiếng Việt THCS',
    grade: 7,
    layout: 'horizontal_tree',
    createdAt: '2026-03-03T08:00:00Z',
    updatedAt: '2026-03-03T08:00:00Z',
    nodes: [
      {
        id: 'root-rh',
        parentId: null,
        label: 'BIỆN PHÁP TU TỪ\nTiếng Việt THCS',
        description: 'Nâng cao tính hình tượng và cảm xúc trong văn bản',
        color: '#102A43',
        icon: 'feather',
        x: 0,
        y: 0,
        level: 0,
      },
      {
        id: 'rh-1',
        parentId: 'root-rh',
        label: '1. So sánh',
        description: 'Đối chiếu hai sự vật có nét tương đồng',
        color: '#0F9D92',
        x: 250,
        y: -180,
        level: 1,
      },
      {
        id: 'rh-1-1',
        parentId: 'rh-1',
        label: 'Cấu tạo mô hình',
        description: 'Vế A (Sự vật so sánh) - Từ so sánh - Vế B (Sự vật dùng để so sánh)',
        color: '#0F9D92',
        x: 500,
        y: -210,
        level: 2,
      },
      {
        id: 'rh-1-2',
        parentId: 'rh-1',
        label: 'Tác dụng biểu đạt',
        description: 'Tạo nên hình ảnh cụ thể, gợi cảm và sinh động cho lời văn',
        color: '#0F9D92',
        x: 500,
        y: -150,
        level: 2,
      },
      {
        id: 'rh-2',
        parentId: 'root-rh',
        label: '2. Ẩn dụ',
        description: 'So sánh ngầm dựa trên mối liên hệ tương đồng',
        color: '#E6B450',
        x: 250,
        y: -60,
        level: 1,
      },
      {
        id: 'rh-2-1',
        parentId: 'rh-2',
        label: 'Các kiểu ẩn dụ',
        description: 'Hình thức, Cách thức, Phẩm chất, Chuyển đổi cảm giác',
        color: '#E6B450',
        x: 500,
        y: -90,
        level: 2,
      },
      {
        id: 'rh-2-2',
        parentId: 'rh-2',
        label: 'Ví dụ tiêu biểu',
        description: 'Người Cha mái tóc bạc (Bác Hồ) - Ẩn dụ phẩm chất bao la',
        color: '#E6B450',
        x: 500,
        y: -30,
        level: 2,
      },
      {
        id: 'rh-3',
        parentId: 'root-rh',
        label: '3. Nhân hóa',
        description: 'Gán thuộc tính con người cho vật hoặc hiện tượng',
        color: '#2563EB',
        x: 250,
        y: 60,
        level: 1,
      },
      {
        id: 'rh-3-1',
        parentId: 'rh-3',
        label: 'Cách thực hiện',
        description: 'Dùng từ gọi người, từ chỉ tính chất người hoặc trò chuyện như với người',
        color: '#2563EB',
        x: 500,
        y: 30,
        level: 2,
      },
      {
        id: 'rh-3-2',
        parentId: 'rh-3',
        label: 'Hiệu quả nghệ thuật',
        description: 'Thế giới loài vật, cỏ cây trở nên gần gũi, có hồn và tâm trạng',
        color: '#2563EB',
        x: 500,
        y: 90,
        level: 2,
      },
      {
        id: 'rh-4',
        parentId: 'root-rh',
        label: '4. Điệp từ, Điệp ngữ',
        description: 'Lặp lại từ ngữ hoặc cấu trúc câu',
        color: '#E11D48',
        x: 250,
        y: 180,
        level: 1,
      },
      {
        id: 'rh-4-1',
        parentId: 'rh-4',
        label: 'Hình thức lặp',
        description: 'Điệp cách quãng, điệp nối tiếp, điệp chuyển tiếp (vòng tròn)',
        color: '#E11D48',
        x: 500,
        y: 150,
        level: 2,
      },
      {
        id: 'rh-4-2',
        parentId: 'rh-4',
        label: 'Sức mạnh gợi cảm',
        description: 'Nhấn mạnh ý niệm, tạo nhịp điệu dồn dập hoặc da diết cho câu văn',
        color: '#E11D48',
        x: 500,
        y: 210,
        level: 2,
      },
    ],
  },
  {
    id: 'mindmap-gdcd-friendship',
    title: 'Phòng chống bạo lực học đường & Xây dựng tình bạn đẹp',
    grade: 7,
    layout: 'radial',
    createdAt: '2026-03-04T08:00:00Z',
    updatedAt: '2026-03-04T08:00:00Z',
    nodes: [
      {
        id: 'root-blhd',
        parentId: null,
        label: 'TÌNH BẠN ĐẸP\n& Trường học hạnh phúc',
        description: 'Chủ đề Giáo dục công dân và Kỹ năng sống THCS',
        color: '#102A43',
        icon: 'heart',
        x: 0,
        y: 0,
        level: 0,
      },
      {
        id: 'bl-1',
        parentId: 'root-blhd',
        label: '1. Nhận diện bạo lực học đường',
        description: 'Các biểu hiện thân thể, tinh thần và không gian mạng',
        color: '#E11D48',
        x: 240,
        y: -120,
        level: 1,
      },
      {
        id: 'bl-1-1',
        parentId: 'bl-1',
        label: 'Bạo lực thể xác',
        description: 'Đánh đập, xô đẩy, hủy hoại đồ dùng cá nhân',
        color: '#E11D48',
        x: 440,
        y: -150,
        level: 2,
      },
      {
        id: 'bl-1-2',
        parentId: 'bl-1',
        label: 'Bạo lực tinh thần & mạng',
        description: 'Cô lập, thóa mạ, bêu riếu hình ảnh trên mạng xã hội',
        color: '#E11D48',
        x: 440,
        y: -90,
        level: 2,
      },
      {
        id: 'bl-2',
        parentId: 'root-blhd',
        label: '2. Nguyên nhân sâu xa',
        description: 'Nhận thức nông nổi và áp lực tâm lý tuổi mới lớn',
        color: '#E6B450',
        x: 240,
        y: 120,
        level: 1,
      },
      {
        id: 'bl-2-1',
        parentId: 'bl-2',
        label: 'Cái tôi chưa chín chắn',
        description: 'Hiếu thắng, thích thể hiện quyền uy như Dế Mèn thuở nhỏ',
        color: '#E6B450',
        x: 440,
        y: 90,
        level: 2,
      },
      {
        id: 'bl-2-2',
        parentId: 'bl-2',
        label: 'Thiếu kỹ năng giải quyết mâu thuẫn',
        description: 'Không biết lắng nghe và kiềm chế cơn nóng giận nhất thời',
        color: '#E6B450',
        x: 440,
        y: 150,
        level: 2,
      },
      {
        id: 'bl-3',
        parentId: 'root-blhd',
        label: '3. Kỹ năng ứng phó thông minh',
        description: 'Nguyên tắc an toàn và tìm kiếm trợ giúp',
        color: '#2563EB',
        x: -240,
        y: 120,
        level: 1,
      },
      {
        id: 'bl-3-1',
        parentId: 'bl-3',
        label: 'Bình tĩnh tránh đối đầu',
        description: 'Không kích động bạo lực, tìm đường thoát an toàn',
        color: '#2563EB',
        x: -440,
        y: 150,
        level: 2,
      },
      {
        id: 'bl-3-2',
        parentId: 'bl-3',
        label: 'Báo ngay cho thầy cô & cha mẹ',
        description: 'Lên tiếng bảo vệ nạn nhân, không im lặng làm ngơ',
        color: '#2563EB',
        x: -440,
        y: 90,
        level: 2,
      },
      {
        id: 'bl-4',
        parentId: 'root-blhd',
        label: '4. Xây dựng văn hóa yêu thương',
        description: 'Lắng nghe, thấu cảm và tôn trọng sự khác biệt',
        color: '#0F9D92',
        x: -240,
        y: -120,
        level: 1,
      },
      {
        id: 'bl-4-1',
        parentId: 'bl-4',
        label: 'Thấu cảm & sẻ chia',
        description: 'Đặt mình vào hoàn cảnh bạn bè để bao dung hơn',
        color: '#0F9D92',
        x: -440,
        y: -150,
        level: 2,
      },
      {
        id: 'bl-4-2',
        parentId: 'bl-4',
        label: 'Lời nói tử tế mỗi ngày',
        description: 'Thực hành văn hóa ứng xử văn minh trong lớp học và trên mạng',
        color: '#0F9D92',
        x: -440,
        y: -90,
        level: 2,
      },
    ],
  },
];

// 2. READING PASSAGES SAMPLES (DEMO)
export const SAMPLE_READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'passage-de-men',
    title: 'Bài học đường đời đầu tiên',
    author: 'Tô Hoài',
    grade: 6,
    bookSet: 'Kết nối tri thức với cuộc sống',
    topic: 'Tôi và các bạn - Khám phá bản thân',
    content: `Bởi tôi ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn lắm. Chẳng bao lâu tôi đã trở thành một chàng dế thanh niên cường tráng. Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ cứng dần và nhọn hoắt. Thỉnh thoảng, muốn thử sự lợi hại của những chiếc vuốt, tôi co cẳng lên, đạp phanh phách vào các ngọn cỏ. Những ngọn cỏ gãy rạp, y như có nhát dao vừa lia qua. Đôi cánh tôi, trước kia ngắn hủn hoẳn, bây giờ thành cái áo dài kín xuống tận chấm đuôi. Mỗi khi tôi vũ lên, đã nghe tiếng phành phạch giòn giã. Lúc tôi đi bách bộ thì cả người tôi rung rinh một màu nâu bóng mỡ soi gương được và rất ưa nhìn. Đầu tôi to ra và nổi từng tảng, rất bướng. Hai cái răng đen nhánh lúc nào cũng nhai ngoàm ngoạp như hai lưỡi liềm máy làm việc. Sợi râu tôi dài và uốn cong một vẻ rất đỗi hùng dũng. Tôi lấy làm hãnh diện với bà con về cặp râu ấy lắm. Cứ chốc chốc tôi lại trịnh trọng và khoan thai đưa cả hai chân trước lên vuốt râu.
Tôi tợn lắm. Dám cà khịa với tất cả mọi bà con trong xóm. Khi tôi đi bách bộ thì cả người tôi vươn lên oai vệ... Tôi quát mấy chị Cào Cào ngụ ngoài đầu bờ, khiến mỗi lần thấy tôi đi qua, các chị phải núp khuôn mặt xanh xao dưới nhánh cỏ... Tôi ngỡ tôi là tay ghê gớm, có thể sắp đứng đầu thiên hạ rồi.
Chao ôi, có biết đâu rằng: hung hăng, hống hách láo chỉ tổ đem thân mà trả nợ những cử chỉ ngu dại của mình thôi. Tôi đã phải trải qua một bài học đắt giá đầu tiên trong đời...`,
    questions: [
      {
        id: 1,
        level: 'Nhận biết',
        question: 'Những chi tiết nào dưới đây miêu tả chính xác ngoại hình cường tráng của Dế Mèn?',
        options: [
          'A. Đôi càng mẫm bóng, vuốt ở chân nhọn hoắt, đôi cánh dài tận chấm đuôi',
          'B. Đôi mắt lờ đờ, cánh ngắn hủn hoẳn, người gầy gò ốm yếu',
          'C. Cặp râu rụng hết, hai hàm răng lung lay không nhai được',
          'D. Thân hình mềm yếu, bước đi run rẩy trong bụi cỏ'
        ],
        correctOptionIndex: 0,
        textEvidence: 'Đoạn 1: "Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ cứng dần và nhọn hoắt... Đôi cánh tôi... dài kín xuống tận chấm đuôi."',
        explanation: 'Văn bản sử dụng hàng loạt tính từ sắc sảo và động từ sinh động để khắc họa vẻ ngoài khỏe khoắn của Dế Mèn.'
      },
      {
        id: 2,
        level: 'Thông hiểu',
        question: 'Thái độ của Dế Mèn đối với bà con trong xóm cỏ bộc lộ nét tính cách gì?',
        options: [
          'A. Khiêm nhường, luôn giúp đỡ những người có hoàn cảnh khó khăn',
          'B. Kiêu căng, tự phụ, hung hăng, thích ra oai bắt nạt kẻ yếu',
          'C. Nhút nhát, e dè, không dám tiếp xúc với bất kỳ ai',
          'D. Thờ ơ, vô cảm, không quan tâm đến thế giới xung quanh'
        ],
        correctOptionIndex: 1,
        textEvidence: 'Chi tiết: "Dám cà khịa với tất cả mọi bà con trong xóm... Tôi quát mấy chị Cào Cào... ngỡ tôi là tay ghê gớm đứng đầu thiên hạ."',
        explanation: 'Dế Mèn lầm tưởng sức mạnh thể chất cho phép mình lấn lướt, khinh thường người khác.'
      },
      {
        id: 3,
        level: 'Vận dụng',
        question: 'Theo em, lời tự trách "hung hăng, hống hách láo chỉ tổ đem thân mà trả nợ những cử chỉ ngu dại của mình thôi" có ý nghĩa gì đối với tuổi học trò?',
        hint: 'Liên hệ đến thói thích thể hiện cái tôi bốc đồng, trêu chọc bạn bè hoặc gây hấn trong trường học.',
        sampleAnswer: 'Lời tự nhận thức của Dế Mèn nhắc nhở học sinh cần khiêm tốn, biết kiểm soát cảm xúc và hành vi; không ỷ lại vào thế mạnh bản thân để chèn ép hay trêu chọc bạn bè, tránh gây nên những hậu quả đau lòng không thể khắc phục.'
      },
      {
        id: 4,
        level: 'Vận dụng cao',
        question: 'Nếu được gặp Dế Mèn vào khoảnh khắc chú ta đứng vuốt râu kiêu hãnh trước cửa hang, em sẽ nói điều gì để cảnh tỉnh chú trước khi bi kịch xảy ra?',
        hint: 'Thể hiện thái độ chân thành, tôn trọng sự khỏe mạnh của bạn nhưng khuyên bạn hướng sức mạnh vào việc trượng nghĩa.',
        sampleAnswer: 'Em sẽ khen ngợi thể lực khỏe mạnh tuyệt vời của Dế Mèn, nhưng chân thành nhắn nhủ: "Sức mạnh thực sự của một dũng sĩ không nằm ở việc làm kẻ khác sợ hãi, mà ở khả năng che chở và bảo vệ những người bạn yếu thế như Dế Choắt. Đừng để lòng kiêu ngạo đánh mất đi tình bạn chân thành bạn nhé!".'
      }
    ]
  },
  {
    id: 'passage-dong-chi',
    title: 'Đồng chí',
    author: 'Chính Hữu',
    grade: 8,
    bookSet: 'Cánh Diều',
    topic: 'Vẻ đẹp người lính trong kháng chiến',
    content: `Quê hương anh nước mặn, đồng chua
Làng tôi nghèo đất cày lên sỏi đá.
Anh với tôi đôi người xa lạ
Tự phương trời chẳng hẹn quen nhau,
Súng bên súng, đầu sát bên đầu,
Đêm rét chung chăn thành đôi tri kỷ.
Đồng chí!

Ruộng nương anh gửi bạn thân cày
Gian nhà không mặc kệ gió lung lay
Giếng nước gốc đa nhớ người ra lính.
Anh với tôi biết từng cơn ớn lạnh,
Sốt run người vầng trán ướt mồ hôi.
Áo anh rách vai
Quần tôi có vài mảnh vá
Miệng cười buốt giá
Chân không giày
Thương nhau tay nắm lấy bàn tay.

Đêm nay rừng hoang sương muối
Đứng cạnh bên nhau chờ giặc tới
Đầu súng trăng treo.`,
    questions: [
      {
        id: 1,
        level: 'Nhận biết',
        question: 'Hai câu thơ mở đầu bài thơ giới thiệu điều gì về người lính?',
        options: [
          'A. Xuất thân nghèo khó từ những vùng quê lam lũ',
          'B. Trình độ học vấn cao từ chốn đô thành',
          'C. Gia đình giàu có đi tòng quân',
          'D. Những người lính chuyên nghiệp lâu năm'
        ],
        correctOptionIndex: 0,
        textEvidence: '"Quê hương anh nước mặn, đồng chua / Làng tôi nghèo đất cày lên sỏi đá"',
        explanation: 'Thành ngữ dân gian phản ánh hoàn cảnh nông dân nghèo khó bước vào kháng chiến.'
      },
      {
        id: 2,
        level: 'Thông hiểu',
        question: 'Câu thơ đặc biệt "Đồng chí!" có vị trí và tác dụng gì trong mạch thơ?',
        options: [
          'A. Là câu hỏi tu từ để mở đầu đoạn thơ mới',
          'B. Là bản lề khép lại cơ sở hình thành và mở ra những biểu hiện cảm động của tình đồng đội',
          'C. Chỉ là lời chào xã giao thông thường trong quân ngũ',
          'D. Để tạo vần điệu cho bài thơ'
        ],
        correctOptionIndex: 1,
        textEvidence: 'Câu thơ đứng riêng thành 1 dòng, khép lại 6 câu đầu và mở ra toàn bộ phần sau.',
        explanation: 'Hai tiếng "Đồng chí!" vang lên như một phát hiện, một sự đúc kết thiêng liêng và sâu lắng.'
      },
      {
        id: 3,
        level: 'Vận dụng',
        question: 'Chi tiết "Thương nhau tay nắm lấy bàn tay" thể hiện tình cảm gì của người chiến sĩ?',
        hint: 'Hơi ấm tình người giữa giá rét mùa đông và sự truyền lửa tinh thần vượt qua cái chết.',
        sampleAnswer: 'Cái nắm tay mộc mạc không lời nhưng truyền cho nhau hơi ấm giữa rừng sương buốt giá, thể hiện tình cảm gắn bó ruột thịt và ý chí quyết tâm son sắt cùng chiến đấu, cùng hy sinh.'
      },
      {
        id: 4,
        level: 'Vận dụng cao',
        question: 'Hình tượng "Đầu súng trăng treo" ở cuối bài thơ gợi cho em suy nghĩ gì về vẻ đẹp tâm hồn người lính Việt Nam?',
        hint: 'Biểu tượng của hiện thực khốc liệt (súng) gắn liền với ước mơ hòa bình, thi vị và lãng mạn (trăng).',
        sampleAnswer: 'Hình ảnh vừa hiện thực vừa lãng mạn: súng bảo vệ cuộc sống bình yên, trăng biểu trưng cho vẻ đẹp thanh bình. Người lính cầm súng chiến đấu không phải vì hận thù mà vì tình yêu thiết tha với vầng trăng hòa bình của Tổ quốc.'
      }
    ]
  }
];

// 3. COURT CASES (TÒA ÁN NHÂN VẬT VĂN HỌC)
export const SAMPLE_COURT_CASES: CourtCase[] = [
  {
    id: 'case-de-men',
    title: 'Vụ án Trêu Chọc Chị Cốc & Trách Nhiệm Về Sự Ra Đi Của Dế Choắt',
    literaryWork: 'Dế Mèn phiêu lưu ký (Tô Hoài)',
    character: 'Dế Mèn',
    conflict: 'Dế Mèn trêu chị Cốc rồi lẩn trốn, khiến Dế Choắt ốm yếu bị mổ oan uổng dẫn đến tử vong.',
    context: 'Phiên tòa giả định tại khu vườn bãi cỏ ven đầm nước. Hội đồng xét xử đánh giá ranh giới giữa sự đùa nghịch vô ý thức và trách nhiệm đạo đức trước mạng sống đồng loại.',
    defaultRoles: ['Chủ tọa phiên tòa (Thẩm phán)', 'Luật sư bảo vệ Dế Mèn', 'Luật sư đại diện Dế Choắt', 'Dế Mèn (Bị can)', 'Chị Cốc (Nhân chứng)', 'Hội thẩm đoàn AI']
  },
  {
    id: 'case-thach-sanh',
    title: 'Phiên Xét Xử Lý Thông: Tội Lừa Bạn Thân & Cướp Công Trảm Xà Tinh',
    literaryWork: 'Truyện cổ tích Thạch Sanh',
    character: 'Lý Thông',
    conflict: 'Lý Thông lợi dụng lòng tin của người em kết nghĩa Thạch Sanh, nhiều lần lừa vào chỗ chết để cướp công.',
    context: 'Cung đình cổ kính nơi công lý của nhân dân được thực thi. Tranh biện về sự bội tín, lòng tham và luật nhân quả trong văn hóa ứng xử.',
    defaultRoles: ['Bao Công / Quan Tòa', 'Luật sư công lý', 'Lý Thông (Bị cáo)', 'Thạch Sanh (Nhân chứng & Bị hại)', 'Mẹ Lý Thông', 'Hội thẩm đoàn AI']
  },
  {
    id: 'case-anh-trai-kieu-phuong',
    title: 'Tòa Án Lương Tâm: Sự Đố Kỵ Của Người Anh Trước Tài Năng Của Em Gái',
    literaryWork: 'Bức tranh của em gái tôi (Tạ Duy Anh)',
    character: 'Người anh trai',
    conflict: 'Người anh ghen tị, hắt hủi Kiều Phương khi em gái bộc lộ tài năng hội họa.',
    context: 'Tòa án nội tâm nơi người anh đối diện với chính sự nhỏ nhen của mình trước bức tranh "Anh trai tôi" tràn ngập ánh sáng yêu thương.',
    defaultRoles: ['Thẩm phán lương tâm', 'Người anh trai', 'Bé Kiều Phương (Mèo)', 'Họa sĩ chú Tiến', 'Cha mẹ', 'Hội thẩm đoàn AI']
  }
];

// 4. ETHICS DILEMMAS (GDCD & VĂN HỌC)
export const SAMPLE_ETHICS_DILEMMAS: EthicsDilemma[] = [
  {
    id: 'dilemma-cyberbullying',
    title: 'Hành vi xúc phạm và phát tán video bạn học trên nhóm mạng xã hội',
    gdcdTopic: 'Văn hóa ứng xử trên mạng xã hội & Trách nhiệm công dân số',
    literaryConnection: 'Hành vi bồng bột của Dế Mèn trêu chọc chị Cốc gián tiếp hại chết bạn.',
    scenario: 'Trong nhóm chat kín của lớp 7A, một số bạn chế giễu ngoại hình của bạn M. (bạn mới chuyển trường) bằng hình ảnh và lời lẽ khiếm nhã. Em là thành viên trong nhóm, em sẽ lựa chọn hành động nào?',
    choices: [
      {
        id: 'opt-1',
        text: 'Thả biểu cảm cười cùng các bạn để không bị xem là "lập dị" hay bị tẩy chay.',
        consequence: 'Góp phần tiếp tay cho hành vi bạo lực mạng, khiến bạn M. chịu tổn thương tâm lý trầm trọng.',
        moralAnalysis: 'Thiếu dũng khí đạo đức, a dua theo số đông tiêu cực, giống như sự vô cảm ban đầu của Dế Mèn.',
        recommended: false
      },
      {
        id: 'opt-2',
        text: 'Im lặng rời nhóm, coi như không liên quan đến bản thân.',
        consequence: 'Bảo vệ được bản thân tạm thời nhưng bỏ rơi người bạn yếu thế đang bị bắt nạt.',
        moralAnalysis: 'Thái độ thờ ơ, né tránh trách nhiệm công dân và tinh thần tương thân tương ái.',
        recommended: false
      },
      {
        id: 'opt-3',
        text: 'Lên tiếng nhắc nhở nhóm dừng lại vì đó là xúc phạm danh dự; đồng thời an ủi M. và báo với thầy cô giáo chủ nhiệm.',
        consequence: 'Ngăn chặn kịp thời làn sóng bắt nạt học đường, bảo vệ bạn M. và giữ gìn môi trường lớp học đoàn kết.',
        moralAnalysis: 'Hành động dũng cảm, thể hiện sự đồng cảm sâu sắc và tinh thần trách nhiệm công dân số văn minh.',
        recommended: true
      }
    ]
  },
  {
    id: 'dilemma-honesty',
    title: 'Lòng trung thực khi nhặt được của rơi hoặc thi cử',
    gdcdTopic: 'Sự trung thực và danh dự cá nhân',
    literaryConnection: 'Nhân vật Lão Hạc trong truyện ngắn của Nam Cao thà chết chứ không xâm phạm tài sản dành cho con.',
    scenario: 'Trong giờ kiểm tra học kỳ môn Ngữ văn, bạn ngồi cạnh lén chuyền cho em tờ phao chép dàn ý bài văn đạt điểm cao. Em đang phân vân vì đề bài khá khó.',
    choices: [
      {
        id: 'opt-hon-1',
        text: 'Chép theo dàn ý của bạn để lấy điểm 9, điểm 10 làm cha mẹ vui lòng.',
        consequence: 'Đạt điểm số giả tạo, đánh mất lòng tự trọng và rèn luyện thói quen gian dối.',
        moralAnalysis: 'Vi phạm quy chế thi, phản bội lại thông điệp "Đọc sâu - Viết thật - Sống đẹp".',
        recommended: false
      },
      {
        id: 'opt-hon-2',
        text: 'Từ chối phao thi một cách lịch sự, tự dùng kiến thức và cảm xúc thật của mình để làm bài.',
        consequence: 'Điểm số có thể vừa sức nhưng là thành quả chân chính do công sức của chính mình.',
        moralAnalysis: 'Khẳng định lòng trung thực, dũng cảm đối diện với năng lực thực chất để tiến bộ bền vững.',
        recommended: true
      }
    ]
  }
];

// 5. ARENA QUIZ QUESTIONS (ĐẤU TRƯỜNG NGỮ VĂN)
export const SAMPLE_ARENA_QUESTIONS: ArenaQuizQuestion[] = [
  {
    id: 'q1',
    gameType: 'author_work',
    question: 'Tác phẩm "Bài học đường đời đầu tiên" được trích từ tiểu thuyết thiếu nhi nổi tiếng nào của nhà văn Tô Hoài?',
    options: ['Dế Mèn phiêu lưu ký', 'O chuột', 'Vợ chồng A Phủ', 'Quê người'],
    correctAnswer: 0,
    explanation: 'Bài học đường đời đầu tiên là đoạn trích trong chương I của "Dế Mèn phiêu lưu ký" xuất bản năm 1941.',
    grade: 6
  },
  {
    id: 'q2',
    gameType: 'rhetoric',
    question: 'Câu thơ "Người Cha mái tóc bạc / Đốt lửa cho anh nằm" (Minh Huệ) sử dụng biện pháp tu từ nào?',
    options: ['So sánh', 'Ẩn dụ phẩm chất', 'Hoán dụ', 'Nói quá'],
    correctAnswer: 1,
    explanation: 'Hình ảnh "Người Cha" là ẩn dụ chỉ Bác Hồ dựa trên sự tương đồng về tình yêu thương bao la và sự chăm sóc ân cần đối với các chiến sĩ.',
    grade: 6
  },
  {
    id: 'q3',
    gameType: 'rhetoric',
    question: 'Trong câu văn "Tiếng suối trong như tiếng hát xa" (Hồ Chí Minh), tác giả sử dụng biện pháp nghệ thuật gì?',
    options: ['Ẩn dụ', 'So sánh', 'Chơi chữ', 'Liệt kê'],
    correctAnswer: 1,
    explanation: 'Từ so sánh "như" đối chiếu âm thanh của tiếng suối thiên nhiên với tiếng hát thanh thoát của con người.',
    grade: 7
  },
  {
    id: 'q4',
    gameType: 'trivia',
    question: 'Bài thơ "Đồng chí" của Chính Hữu được sáng tác vào năm nào?',
    options: ['Năm 1948 (Kháng chiến chống Pháp)', 'Năm 1954 (Chiến dịch Điện Biên Phủ)', 'Năm 1968 (Kháng chiến chống Mỹ)', 'Năm 1975'],
    correctAnswer: 0,
    explanation: 'Bài thơ "Đồng chí" được Chính Hữu sáng tác đầu năm 1948, sau khi ông cùng đồng đội tham gia chiến dịch Việt Bắc thu đông 1947.',
    grade: 8
  },
  {
    id: 'q5',
    gameType: 'bell',
    question: 'Câu tục ngữ "Ăn quả nhớ kẻ trồng cây" nhắc nhở học sinh phẩm chất đạo đức quan trọng nào?',
    options: ['Lòng biết ơn', 'Tính cần cù', 'Lòng dũng cảm', 'Tính tự lập'],
    correctAnswer: 0,
    explanation: 'Câu tục ngữ nhắc nhở con cháu luôn ghi nhớ công ơn của những người đã tạo dựng thành quả, cội nguồn văn hóa uống nước nhớ nguồn.',
    grade: 7
  }
];

// 6. TEACHER LIBRARY RESOURCES
export const SAMPLE_TEACHER_RESOURCES: TeacherResource[] = [
  {
    id: 'res-1',
    title: 'Phiếu học tập phân hóa: Khám phá nhân vật Dế Mèn và Dế Choắt',
    grade: 6,
    type: 'worksheet',
    topic: 'Chủ đề: Tôi và các bạn (Ngữ văn 6)',
    content: `PHIẾU HỌC TẬP SỐ 01 (DÀNH CHO HỌC SINH LỚP 6)
I. KHỞI ĐỘNG (Nhận biết):
- Em hãy điền các từ ngữ miêu tả ngoại hình Dế Mèn vào bảng so sánh (càng, vuốt, cánh, râu).
II. TĂNG TỐC (Thông hiểu):
- Phân tích nguyên nhân cái chết của Dế Choắt: Do ai gây ra? Vì sao Dế Mèn lại trêu chọc chị Cốc?
III. VỀ ĐÍCH (Vận dụng & Vận dụng cao):
- Hãy viết một đoạn văn (khoảng 5-7 câu) ghi lại lời xin lỗi chân thành mà Dế Mèn có thể nói với hương hồn Dế Choắt.`,
    status: 'approved',
    createdAt: '2026-03-01'
  },
  {
    id: 'res-2',
    title: 'Khung tiêu chí đánh giá bài văn tự sự (Rubric 7 tiêu chí GDPT 2018)',
    grade: 7,
    type: 'rubric',
    topic: 'Kỹ năng Viết bài văn kể lại một sự việc có thật',
    content: `RUBRIC ĐÁNH GIÁ BÀI VĂN TỰ SỰ THCS HUỲNH THÚC KHÁNG:
1. Đúng thể loại tự sự & ngôi kể phù hợp (2.0 điểm)
2. Bố cục 3 phần Mở - Thân - Kết rõ ràng (1.5 điểm)
3. Cốt truyện mạch lạc, sự việc tiêu biểu (2.0 điểm)
4. Kết hợp yếu tố miêu tả và biểu cảm nội tâm (1.5 điểm)
5. Diễn đạt trong sáng, không lặp từ (1.0 điểm)
6. Chính tả, dấu câu chuẩn mực (1.0 điểm)
7. Bài học nhân văn và tính sáng tạo (1.0 điểm)`,
    status: 'approved',
    createdAt: '2026-03-02'
  }
];

// 7. INITIAL LEARNING PROGRESS STATS (DEMO DATA)
export const INITIAL_LEARNING_PROGRESS: LearningProgress = {
  readingCompleted: 8,
  essaysWritten: 5,
  courtTrialsJoined: 4,
  speechesDelivered: 3,
  ethicsResolved: 6,
  arenaMatchesWon: 14,
  mindMapsCreated: 7,
  totalStudyMinutes: 240,
  skillScores: {
    reading: 88,
    writing: 84,
    speaking: 80,
    ethics: 95,
    criticalThinking: 89,
  },
};
