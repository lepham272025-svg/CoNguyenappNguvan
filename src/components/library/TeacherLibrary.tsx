import React, { useState } from 'react';
import { SAMPLE_TEACHER_RESOURCES } from '../../data/sampleData';
import { TeacherResource } from '../../types';
import {
  FolderOpen,
  Plus,
  Sparkles,
  GitBranch,
  Search,
  CheckCircle,
  FileText,
  Download,
  BookOpen,
  Filter,
  Check,
  Loader2,
} from 'lucide-react';

interface TeacherLibraryProps {
  onTransferToMindMap?: (topic: string) => void;
  onIncrementProgress?: () => void;
}

export const TeacherLibrary: React.FC<TeacherLibraryProps> = ({
  onTransferToMindMap,
  onIncrementProgress,
}) => {
  const [resources, setResources] = useState<TeacherResource[]>(SAMPLE_TEACHER_RESOURCES);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeResource, setActiveResource] = useState<TeacherResource | null>(SAMPLE_TEACHER_RESOURCES[0]);

  // AI Assistant Generator State
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [genLesson, setGenLesson] = useState<string>('Bài học đường đời đầu tiên (Tô Hoài)');
  const [genGrade, setGenGrade] = useState<number>(6);
  const [genType, setGenType] = useState<'worksheet' | 'lesson_plan' | 'rubric' | 'quiz_bank'>('worksheet');
  const [genRequirements, setGenRequirements] = useState<string>(
    'Thiết kế phiếu học tập phân hóa 3 mức độ (Cơ bản, Khá, Giỏi) cho học sinh lớp 6 về vẻ đẹp tính cách và bài học nhận thức của Dế Mèn.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const filtered = resources.filter((r) => {
    const matchGrade = selectedGrade === 'all' || r.grade === selectedGrade;
    const matchType = selectedType === 'all' || r.type === selectedType;
    const matchSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGrade && matchType && matchSearch;
  });

  const handleGenerateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/curriculum-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: genGrade,
          lessonName: genLesson,
          materialType: genType,
          requirements: genRequirements,
        }),
      });
      const data = await res.json();
      const generatedContent = data.content || `TÀI LIỆU SƯ PHẠM ĐƯỢC TẠO TỰ ĐỘNG BỞI GEMINI AI
Chủ đề: ${genLesson} | Khối: ${genGrade}
Yêu cầu: ${genRequirements}
Nội dung chi tiết được thiết kế theo chuẩn GDPT 2018.`;

      const newRes: TeacherResource = {
        id: `res-${Date.now()}`,
        title: `${genType === 'worksheet' ? 'Phiếu học tập' : genType === 'lesson_plan' ? 'Kế hoạch bài dạy' : 'Tiêu chí đánh giá'}: ${genLesson}`,
        grade: genGrade,
        type: genType,
        topic: `Bài học: ${genLesson}`,
        content: generatedContent,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setResources([newRes, ...resources]);
      setActiveResource(newRes);
      setIsGeneratorOpen(false);
      if (onIncrementProgress) onIncrementProgress();
    } catch {
      // Fallback draft
      const newRes: TeacherResource = {
        id: `res-${Date.now()}`,
        title: `Phiếu học tập phân hóa: ${genLesson}`,
        grade: genGrade,
        type: genType,
        topic: `Bài học: ${genLesson}`,
        content: `PHIẾU HỌC TẬP PHÂN HÓA SƯ PHẠM (BẢN DỰ THẢO DEMO)
Trường THCS Huỳnh Thúc Kháng - Tổ Ngữ văn & GDCD
Bài: ${genLesson} - Lớp ${genGrade}
Yêu cầu: ${genRequirements}
1. Mức độ 1: Tìm hiểu chi tiết văn bản
2. Mức độ 2: Phân tích nghệ thuật và dụng ý tác giả
3. Mức độ 3: Liên hệ thực tiễn và bài học cuộc sống.`,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setResources([newRes, ...resources]);
      setActiveResource(newRes);
      setIsGeneratorOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveStatus = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    if (activeResource && activeResource.id === id) {
      setActiveResource({ ...activeResource, status: 'approved' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <FolderOpen className="w-5 h-5 text-[#0F9D92]" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              THƯ VIỆN HỌC LIỆU & TRỢ LÝ GIÁO VIÊN AI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kho học liệu dùng chung Tổ Ngữ văn – GDCD: Soạn phiếu học tập, dàn ý bài dạy, rubric & sơ đồ kiến thức
          </p>
        </div>

        <button
          onClick={() => setIsGeneratorOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#E6B450]" />
          SOẠN HỌC LIỆU BẰNG AI
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Grade filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1 rounded-lg transition ${
                selectedGrade === 'all' ? 'bg-[#102A43] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Tất cả khối
            </button>
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedGrade === g ? 'bg-[#102A43] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 bg-white border border-slate-300 rounded-xl outline-none"
          >
            <option value="all">Tất cả thể loại</option>
            <option value="worksheet">Phiếu học tập</option>
            <option value="lesson_plan">Kế hoạch bài dạy</option>
            <option value="rubric">Tiêu chí chấm (Rubric)</option>
            <option value="quiz_bank">Ngân hàng đề</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên bài, chủ đề học liệu..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
          />
        </div>
      </div>

      {/* Main Grid: List on Left, Active Document on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((item) => {
            const isSelected = activeResource?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveResource(item)}
                className={`p-4 bg-white rounded-2xl border transition cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-[#0F9D92] ring-2 ring-[#0F9D92]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    Lớp {item.grade}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'approved' ? 'Đã duyệt' : 'Dự thảo'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#102A43] line-clamp-2">
                  {item.title}
                </h4>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{item.topic}</span>
                  <span className="font-mono text-[10px]">{item.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Document Viewer */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
          {activeResource ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold text-[#0F9D92] uppercase">
                    {activeResource.type} – Lớp {activeResource.grade}
                  </span>
                  <h3 className="text-base font-bold text-[#102A43] mt-1">
                    {activeResource.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{activeResource.topic}</p>
                </div>

                <div className="flex items-center gap-2">
                  {onTransferToMindMap && (
                    <button
                      onClick={() =>
                        onTransferToMindMap(`Sơ đồ học liệu: ${activeResource.title}`)
                      }
                      className="px-3 py-1.5 bg-[#102A43] hover:bg-[#0A1A2A] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-[#0F9D92]" />
                      Tạo sơ đồ từ học liệu
                    </button>
                  )}

                  {activeResource.status === 'draft' && (
                    <button
                      onClick={() => handleApproveStatus(activeResource.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Duyệt học liệu
                    </button>
                  )}
                </div>
              </div>

              {/* Document Text Body */}
              <div className="flex-1 overflow-y-auto max-h-[500px] p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                {activeResource.content}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    const blob = new Blob([activeResource.content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${activeResource.title.toLowerCase().replace(/\s+/g, '_')}.txt`;
                    a.click();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Tải văn bản tệp đính kèm
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              Chọn một học liệu bên trái để xem nội dung chi tiết.
            </div>
          )}
        </div>
      </div>

      {/* AI Material Generator Modal */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-[#102A43] text-white flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E6B450]" />
                TRỢ LÝ GIÁO VIÊN SOẠN HỌC LIỆU AI
              </h3>
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="text-white/60 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleGenerateResource} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tên bài học / Tác phẩm *
                </label>
                <input
                  type="text"
                  value={genLesson}
                  onChange={(e) => setGenLesson(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={genGrade}
                    onChange={(e) => setGenGrade(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none"
                  >
                    <option value={6}>Lớp 6</option>
                    <option value={7}>Lớp 7</option>
                    <option value={8}>Lớp 8</option>
                    <option value={9}>Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Loại học liệu
                  </label>
                  <select
                    value={genType}
                    onChange={(e) => setGenType(e.target.value as any)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none"
                  >
                    <option value="worksheet">Phiếu học tập phân hóa</option>
                    <option value="lesson_plan">Dàn ý kế hoạch bài dạy</option>
                    <option value="rubric">Rubric tiêu chí đánh giá</option>
                    <option value="quiz_bank">Ngân hàng câu hỏi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Yêu cầu sư phạm cụ thể của giáo viên:
                </label>
                <textarea
                  rows={4}
                  value={genRequirements}
                  onChange={(e) => setGenRequirements(e.target.value)}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
                  placeholder="Ví dụ: Thiết kế câu hỏi theo 4 mức độ đọc hiểu GDPT 2018..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGeneratorOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gemini đang soạn thảo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E6B450]" />
                      BẮT ĐẦU SOẠN HỌC LIỆU
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
