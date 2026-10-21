import React from 'react';
import {
  BookOpen,
  PenTool,
  Scale,
  Mic,
  Heart,
  Trophy,
  FolderOpen,
  BarChart3,
  GitBranch,
  Sparkles,
  Play,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { LearningProgress } from '../../types';

interface HomeViewProps {
  onSelectModule: (index: number) => void;
  onOpenShowcase: () => void;
  progress: LearningProgress;
}

const MODULE_CARDS = [
  {
    idx: 1,
    title: 'Phòng Đọc Hiểu AI',
    desc: 'Đọc sâu tác phẩm theo 4 mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao. Có giọng đọc mẫu & trợ lý giải nghĩa.',
    icon: BookOpen,
    badge: 'GDPT 2018',
    color: 'from-emerald-500 to-teal-700',
    btnText: 'Vào phòng đọc',
  },
  {
    idx: 2,
    title: 'Xưởng Sáng Tạo Văn Học AI',
    desc: 'Quy trình 6 bước viết văn: Tìm ý, lập dàn ý, soạn thảo, AI nhận xét 7 tiêu chí và so sánh bản thảo trước – sau.',
    icon: PenTool,
    badge: 'Chấm điểm 7 tiêu chí',
    color: 'from-purple-500 to-indigo-700',
    btnText: 'Vào xưởng viết',
  },
  {
    idx: 3,
    title: 'Tòa Án Nhân Vật Văn Học AI',
    desc: 'Phiên tòa giả định tranh biện kịch tính: Nhập vai Luật sư, đối đáp với nhân vật Dế Mèn, Thạch Sanh, Kiều Phương.',
    icon: Scale,
    badge: 'Tranh biện tương tác',
    color: 'from-amber-500 to-orange-700',
    btnText: 'Mở phiên tòa',
  },
  {
    idx: 4,
    title: 'Sân Khấu Nói Và Nghe AI',
    desc: 'Luyện đọc diễn cảm, thuyết trình sách, đóng vai nhân vật với nhận dạng giọng nói và phản hồi phong thái học thuật.',
    icon: Mic,
    badge: 'Thu âm & AI phản hồi',
    color: 'from-blue-500 to-cyan-700',
    btnText: 'Lên sân khấu',
  },
  {
    idx: 5,
    title: 'Văn Học & Bài Học Làm Người',
    desc: 'Tích hợp Ngữ văn và GDCD: 10 phẩm chất đạo đức, tình huống xử lý văn hóa ứng xử trên mạng & trách nhiệm công dân.',
    icon: Heart,
    badge: 'Tích hợp GDCD 2018',
    color: 'from-rose-500 to-pink-700',
    btnText: 'Khám phá bài học',
  },
  {
    idx: 6,
    title: 'Đấu Trường Ngữ Văn AI',
    desc: '9 chế độ trò chơi: Ai là nhà văn thông thái, Ghép tác giả – tác phẩm, Biện pháp tu từ, Rung chuông vàng và bảng xếp hạng.',
    icon: Trophy,
    badge: '9 Trò chơi học tập',
    color: 'from-yellow-500 to-amber-700',
    btnText: 'Vào đấu trường',
  },
  {
    idx: 7,
    title: 'Thư Viện Học Liệu & Trợ Lý GV',
    desc: 'Kho học liệu dùng chung Tổ chuyên môn: Soạn phiếu học tập phân hóa, kế hoạch bài dạy, ma trận đề thi & rubric chấm.',
    icon: FolderOpen,
    badge: 'Dành cho GV & HS',
    color: 'from-teal-500 to-emerald-700',
    btnText: 'Mở thư viện',
  },
  {
    idx: 8,
    title: 'Hồ Sơ Tiến Bộ & Bảng Điều Khiển',
    desc: 'Dashboard theo dõi năng lực học tập chuẩn GDPT 2018, biểu đồ radar 5 kỹ năng, danh sách nhiệm vụ & xuất báo cáo CSV.',
    icon: BarChart3,
    badge: 'Biểu đồ Recharts',
    color: 'from-slate-700 to-slate-900',
    btnText: 'Xem hồ sơ',
  },
  {
    idx: 9,
    title: 'SƠ ĐỒ TƯ DUY NGỮ VĂN AI',
    desc: 'Trọng tâm hệ thống: AI sinh sơ đồ logic, kéo thả tương tác, 4 bố cục (Tỏa tròn, Cây ngang, Cây dọc, Hai phía) & XUẤT ẢNH PNG.',
    icon: GitBranch,
    badge: 'CHỨC NĂNG TRỌNG TÂM',
    color: 'from-[#0F9D92] to-[#102A43]',
    isFocus: true,
    btnText: 'Tạo sơ đồ ngay',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectModule,
  onOpenShowcase,
  progress,
}) => {
  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102A43] via-[#14324F] to-[#0A1A2A] text-white p-8 sm:p-12 shadow-xl border border-white/10">
        {/* Background glow and decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F9D92]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#E6B450]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#E6B450]">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B450]" />
            <span>TRƯỜNG THCS HUỲNH THÚC KHÁNG – TỔ NGỮ VĂN – GDCD</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            HUỲNH THÚC KHÁNG <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F9D92] via-[#E6B450] to-white">
              VĂN HỌC SỐNG AI
            </span>
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#EFF8FC]/90 tracking-wide">
            HỆ SINH THÁI HỌC TẬP NGỮ VĂN THÔNG MINH (GDPT 2018 LỚP 6, 7, 8, 9)
          </p>

          <div className="inline-block px-4 py-1.5 rounded-xl bg-white/10 text-xs font-black tracking-widest text-[#E6B450] uppercase border border-white/15">
            ĐỌC SÂU – VIẾT THẬT – NÓI HAY – SỐNG ĐẸP – TƯ DUY SÁNG RÕ
          </div>

          <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed pt-1">
            Ứng dụng công nghệ AI tiên phong trong giáo dục Ngữ văn và Giáo dục công dân. Tích hợp 9 phân hệ học tập tương tác thực sự, nổi bật với công cụ tạo, chỉnh sửa và xuất ảnh Sơ đồ tư duy chất lượng cao.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onSelectModule(1)}
              className="px-6 py-3 text-xs sm:text-sm font-bold bg-[#0F9D92] hover:bg-[#0D877E] text-white rounded-xl shadow-lg transition flex items-center gap-2 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              Bắt đầu học tập
            </button>

            <button
              onClick={() => onSelectModule(7)}
              className="px-5 py-3 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md border border-white/20 transition flex items-center gap-2"
            >
              Khám phá bài học
            </button>

            {/* HIGHLIGHTED MIND MAP BUTTON */}
            <button
              onClick={() => onSelectModule(9)}
              className="px-6 py-3 text-xs sm:text-sm font-black bg-gradient-to-r from-[#E6B450] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl shadow-xl transition flex items-center gap-2 active:scale-95 border-2 border-white/40 ring-4 ring-amber-400/30"
            >
              <GitBranch className="w-4 h-4 text-slate-950" />
              TẠO SƠ ĐỒ TƯ DUY AI
            </button>

            {/* COMPETITION SHOWCASE BUTTON */}
            <button
              onClick={onOpenShowcase}
              className="px-5 py-3 text-xs sm:text-sm font-bold bg-white text-[#102A43] hover:bg-slate-100 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-[#0F9D92] fill-current" />
              Trải nghiệm hệ sinh thái AI (6 bước)
            </button>
          </div>
        </div>
      </section>

      {/* Quick Progress Banner */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-[#0F9D92] rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">
              Tiến độ học tập cá nhân (DEMO)
            </span>
            <div className="text-base font-extrabold text-[#102A43] flex items-center gap-2">
              <span>Đã hoàn thành {progress.readingCompleted + progress.essaysWritten + progress.mindMapsCreated} hoạt động rèn luyện</span>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                Xếp loại Tốt
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Sơ đồ tư duy</span>
            <strong className="text-sm font-black text-[#0F9D92]">{progress.mindMapsCreated}</strong>
          </div>
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Bài đọc hiểu</span>
            <strong className="text-sm font-black text-[#102A43]">{progress.readingCompleted}</strong>
          </div>
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Bài văn viết</span>
            <strong className="text-sm font-black text-purple-700">{progress.essaysWritten}</strong>
          </div>
          <button
            onClick={() => onSelectModule(8)}
            className="px-3.5 py-1.5 text-xs font-bold text-[#0F9D92] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center gap-1"
          >
            Chi tiết hồ sơ
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 9 Feature Cards Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-[#102A43]">
              9 PHÂN HỆ HỌC TẬP TÍCH HỢP
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn phân hệ để bắt đầu trải nghiệm các chức năng giáo dục thông minh
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.idx}
                className={`group bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                  card.isFocus
                    ? 'border-2 border-[#E6B450] ring-4 ring-[#E6B450]/20 bg-gradient-to-b from-white to-amber-50/20'
                    : 'border-slate-200 hover:border-[#0F9D92]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        card.isFocus
                          ? 'bg-[#E6B450] text-slate-950 shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-[#102A43] group-hover:text-[#0F9D92] transition">
                    {card.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    Phân hệ {card.idx}
                  </span>
                  <button
                    onClick={() => onSelectModule(card.idx)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                      card.isFocus
                        ? 'bg-[#E6B450] hover:bg-[#D9A33E] text-slate-950 font-black shadow'
                        : 'bg-slate-100 group-hover:bg-[#0F9D92] text-slate-700 group-hover:text-white'
                    }`}
                  >
                    <span>{card.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Educational Guidelines & Pedagogical Note */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase">
              Bám sát GDPT 2018
            </h5>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tích hợp đầy đủ các bộ sách giáo khoa: Kết nối tri thức, Cánh diều, Chân trời sáng tạo cho học sinh từ Lớp 6 đến Lớp 9.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-emerald-50 text-[#0F9D92] rounded-xl shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase">
              Định hướng AI hỗ trợ – Không làm thay
            </h5>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              AI gợi ý luận điểm, phân tích dẫn chứng và khích lệ tư duy độc lập; không viết thay toàn bộ bài kiểm tra của học sinh.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase">
              Xuất ảnh Sơ đồ tư duy độ nét cao
            </h5>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Hỗ trợ 4 bố cục chuyển đổi mượt mà và xuất file ảnh PNG/JPG chuẩn 16:9 và A4 ngang, an toàn không mất chữ tiếng Việt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
