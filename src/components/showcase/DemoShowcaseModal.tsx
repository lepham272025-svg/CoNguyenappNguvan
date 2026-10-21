import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  BookOpen,
  PenTool,
  Scale,
  GitBranch,
  Download,
  BarChart3,
  Award,
} from 'lucide-react';

interface DemoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateModule: (moduleIndex: number) => void;
}

const SHOWCASE_STEPS = [
  {
    step: 1,
    title: '1. Trải nghiệm Đọc hiểu AI 4 cấp độ',
    moduleIndex: 1, // Reading
    icon: BookOpen,
    desc: 'Học sinh đọc văn bản "Bài học đường đời đầu tiên" (Tô Hoài), trả lời câu hỏi 4 mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) và nghe AI đọc diễn cảm.',
    highlight: 'Hệ thống câu hỏi bám sát văn bản, có trích dẫn chứng cứ và lời giải thích sư phạm chuẩn GDPT 2018.',
  },
  {
    step: 2,
    title: '2. Lập dàn ý & Chấm bài văn tại Xưởng viết AI',
    moduleIndex: 2, // Writing
    icon: PenTool,
    desc: 'Chọn dạng bài Nghị luận xã hội, xem dàn ý gợi ý, viết đoạn văn và nhận phản hồi chi tiết từ AI theo 7 tiêu chí.',
    highlight: 'AI không làm hộ bài thi mà chỉ ra câu văn cần nâng cấp, kèm câu viết lại tham khảo giàu hình ảnh.',
  },
  {
    step: 3,
    title: '3. Tham gia Tòa án Nhân vật Văn học AI',
    moduleIndex: 3, // Courtroom
    icon: Scale,
    desc: 'Nhập vai Luật sư tranh biện vụ án Dế Mèn và Dế Choắt. Nhân vật AI đối đáp kịch tính, viện dẫn đúng tình tiết tác phẩm.',
    highlight: 'Phán quyết của Hội thẩm đoàn AI đúc kết bài học đạo đức về lòng trắc ẩn và tinh thần trách nhiệm.',
  },
  {
    step: 4,
    title: '4. Tạo Sơ đồ tư duy bằng Gemini AI',
    moduleIndex: 9, // Mind Map
    icon: GitBranch,
    desc: 'Từ chủ đề "Bài học đường đời đầu tiên - Dế Mèn", AI phân tích và tự động tạo 6 nhánh chính cùng 18 nhánh phụ chi tiết.',
    highlight: 'Cấu trúc dữ liệu động, tự động chia màu sắc sư phạm và biểu tượng cho từng nhánh.',
  },
  {
    step: 5,
    title: '5. Chỉnh sửa tương tác & Xuất ảnh PNG độ nét cao',
    moduleIndex: 9, // Mind Map
    icon: Download,
    desc: 'Kéo thả vị trí, đổi 4 kiểu bố cục (Tỏa tròn, Cây ngang, Cây dọc, Hai phía), chỉnh sửa nội dung và bấm "Xuất ảnh PNG".',
    highlight: 'Tính toán toàn bộ vùng sơ đồ, giữ trọn vẹn đường nối, chữ tiếng Việt có dấu chuẩn đẹp và lề an toàn.',
  },
  {
    step: 6,
    title: '6. Xem Bảng điều khiển năng lực & Báo cáo',
    moduleIndex: 8, // Dashboard
    icon: BarChart3,
    desc: 'Xem biểu đồ Radar 5 năng lực cốt lõi, tiến độ học tập 4 tuần và xuất báo cáo CSV dành cho Ban giám khảo & Thầy cô.',
    highlight: 'Minh bạch số liệu hoạt động thực tế, tích hợp huy hiệu thành tích và danh sách học sinh cần hỗ trợ.',
  },
];

export const DemoShowcaseModal: React.FC<DemoShowcaseModalProps> = ({
  isOpen,
  onClose,
  onNavigateModule,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const currentInfo = SHOWCASE_STEPS[currentStep];
  const StepIcon = currentInfo.icon;

  const handleGoToModule = () => {
    onNavigateModule(currentInfo.moduleIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#102A43] via-[#0F9D92] to-[#102A43] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#E6B450] text-slate-900 rounded-2xl shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B450]">
                Chế độ Trình diễn Cuộc thi AI Giáo dục 2026
              </span>
              <h3 className="text-lg font-black">
                TRẢI NGHIỆM HỆ SINH THÁI AI THEO LỘ TRÌNH 6 BƯỚC
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center justify-between px-6">
          {SHOWCASE_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-1.5 text-xs font-bold py-1 px-2.5 rounded-lg transition ${
                currentStep === idx
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : idx < currentStep
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>{s.step}</span>
              {idx < currentStep && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>

        {/* Main Step Detail */}
        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-emerald-50 text-[#0F9D92] border border-emerald-200 rounded-2xl shrink-0 shadow-xs">
              <StepIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#0F9D92] uppercase">
                Bước {currentInfo.step} / 6
              </span>
              <h4 className="text-xl font-black text-[#102A43]">
                {currentInfo.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {currentInfo.desc}
              </p>
            </div>
          </div>

          {/* Highlight Callout */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
            <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Điểm nhấn sáng tạo sư phạm:</strong>
              {currentInfo.highlight}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 disabled:opacity-40 rounded-xl transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Bước trước
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGoToModule}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <Play className="w-3.5 h-3.5" />
              Mở và trải nghiệm phân hệ này ngay
            </button>

            {currentStep < SHOWCASE_STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#102A43] hover:bg-[#0A1A2A] rounded-xl shadow transition flex items-center gap-1.5"
              >
                Bước tiếp theo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-[#E6B450] hover:bg-[#D9A33E] rounded-xl shadow transition"
              >
                Hoàn tất lộ trình
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
