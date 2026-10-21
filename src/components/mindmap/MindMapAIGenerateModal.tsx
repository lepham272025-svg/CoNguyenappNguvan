import React, { useState } from 'react';
import { Sparkles, X, Wand2, Loader2, BookOpen, AlertCircle } from 'lucide-react';

interface MindMapAIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (topic: string, grade: number, detailLevel: string) => Promise<void>;
  isLoading: boolean;
}

const SAMPLE_PROMPT_SUGGESTIONS = [
  'Phân tích nhân vật Dế Mèn (ngoại hình, tính cách, hành động, bài học)',
  'Phân tích bài thơ Đồng chí (Chính Hữu) - Tình đồng đội thời kháng chiến',
  'Hệ thống kiến thức các biện pháp tu từ Tiếng Việt THCS',
  'Tóm tắt cốt truyện và nhân vật Bức tranh của em gái tôi (Tạ Duy Anh)',
  'Dàn ý bài văn nghị luận xã hội: Lòng biết ơn và trách nhiệm giới trẻ',
  'Phòng chống bạo lực học đường và xây dựng tình bạn đẹp (GDCD)',
];

export const MindMapAIGenerateModal: React.FC<MindMapAIGenerateModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isLoading,
}) => {
  if (!isOpen) return null;

  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState<number>(6);
  const [detailLevel, setDetailLevel] = useState<'standard' | 'deep'>('standard');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    await onGenerate(topic.trim(), grade, detailLevel);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-[#102A43] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0F9D92] rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">TẠO SƠ ĐỒ TƯ DUY BẰNG GEMINI AI</h3>
              <p className="text-xs text-white/80">Phân tích tác phẩm, tạo nhánh chính & nhánh phụ logic</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Chủ đề bài học / Tác phẩm / Nội dung cần sơ đồ hóa *
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: Phân tích nhân vật Dế Mèn trong Bài học đường đời đầu tiên..."
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F9D92] focus:border-transparent outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full text-sm p-2.5 border border-slate-300 rounded-xl outline-none"
              >
                <option value={6}>Lớp 6 (GDPT 2018)</option>
                <option value={7}>Lớp 7 (GDPT 2018)</option>
                <option value={8}>Lớp 8 (GDPT 2018)</option>
                <option value={9}>Lớp 9 (GDPT 2018)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Độ chi tiết
              </label>
              <select
                value={detailLevel}
                onChange={(e) => setDetailLevel(e.target.value as any)}
                className="w-full text-sm p-2.5 border border-slate-300 rounded-xl outline-none"
              >
                <option value="standard">Tiêu chuẩn (4-5 nhánh)</option>
                <option value="deep">Chuyên sâu (6 nhánh + dẫn chứng)</option>
              </select>
            </div>
          </div>

          {/* Quick suggestions */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#0F9D92]" />
              Gợi ý chủ đề nhanh:
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {SAMPLE_PROMPT_SUGGESTIONS.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setTopic(item)}
                  className="text-[11px] text-left p-1.5 px-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg border border-slate-200 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Sơ đồ sinh ra sẽ tự động chia nhánh có màu sắc, biểu tượng và tự căn chỉnh bố cục để học sinh chỉnh sửa và xuất ảnh được ngay.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow-md transition flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gemini đang phân tích & tạo sơ đồ...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  BẮT ĐẦU TẠO BẰNG AI
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
