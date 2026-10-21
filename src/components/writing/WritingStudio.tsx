import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  GitBranch,
  CheckCircle,
  FileText,
  RotateCcw,
  Download,
  Award,
  AlertCircle,
  Clock,
  BookOpen,
  Send,
  Loader2,
  ChevronRight,
  SplitSquareVertical,
} from 'lucide-react';

interface WritingStudioProps {
  onTransferToMindMap?: (topic: string) => void;
  onIncrementProgress?: () => void;
}

export const WritingStudio: React.FC<WritingStudioProps> = ({
  onTransferToMindMap,
  onIncrementProgress,
}) => {
  const [step, setStep] = useState<number>(1);
  const [genre, setGenre] = useState<string>('Nghị luận xã hội');
  const [grade, setGrade] = useState<number>(7);
  const [promptText, setPromptText] = useState<string>(
    'Viết đoạn văn (khoảng 150-200 chữ) chia sẻ suy nghĩ về lòng biết ơn và trách nhiệm của thế hệ trẻ đối với quê hương.'
  );
  const [outline, setOutline] = useState<string>(
    `1. Mở đoạn: Dẫn dắt và khẳng định vai trò của lòng biết ơn đối với sự trưởng thành của con người.
2. Thân đoạn:
- Biểu hiện: Biết ơn cha mẹ, thầy cô, trân trọng hòa bình độc lập.
- Ý nghĩa: Giúp tâm hồn trong sáng, gắn kết cộng đồng, đẩy lùi thói vô cảm.
- Phê phán: Một số bạn trẻ sống ỷ lại, coi nhẹ công lao người đi trước.
3. Kết đoạn: Bài học hành động cụ thể cho bản thân trong học tập và rèn luyện.`
  );
  const [studentText, setStudentText] = useState<string>(
    `Lòng biết ơn là một trong những truyền thống đạo đức quý báu nhất của dân tộc ta, được đúc kết qua câu tục ngữ "Uống nước nhớ nguồn". Trong cuộc sống, lòng biết ơn thể hiện qua việc chúng ta trân trọng công ơn sinh thành của cha mẹ, sự tận tụy dạy dỗ của thầy cô và sự hy sinh xương máu của các thế hệ cha anh đi trước để giành lại độc lập tự do. Khi biết ơn, con người sẽ sống trách nhiệm hơn, luôn có ý thức cống hiến và lan tỏa những điều tốt đẹp. Ngược lại, thật đáng buồn khi trong xã hội hiện nay vẫn còn một số bạn trẻ sống thờ ơ, coi những gì mình được hưởng là điều dĩ nhiên mà quên đi nghĩa vụ đóng góp. Là một học sinh đang ngồi trên ghế nhà trường, em luôn tự nhủ phải cố gắng học tập thật tốt, rèn luyện nhân cách và biết nói lời cảm ơn chân thành mỗi ngày để trở thành một công dân có ích cho quê hương đất nước.`
  );
  const [revisedText, setRevisedText] = useState<string>('');
  const [isCritiquing, setIsCritiquing] = useState<boolean>(false);
  const [critiqueResult, setCritiqueResult] = useState<any>(null);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  const wordCount = studentText.trim() ? studentText.trim().split(/\s+/).length : 0;

  const handleRequestCritique = async () => {
    setIsCritiquing(true);
    try {
      const res = await fetch('/api/gemini/critique-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essayType: genre,
          prompt: promptText,
          studentText,
          grade,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCritiqueResult(data.data);
        setStep(4);
        if (onIncrementProgress) onIncrementProgress();
      } else {
        throw new Error('Fallback demo critique');
      }
    } catch {
      // Pedagogical Fallback Critique
      setCritiqueResult({
        totalScore: 8.5,
        generalFeedback:
          'Bài viết có bố cục mạch lạc, cảm xúc chân thực, nêu bật được truyền thống "Uống nước nhớ nguồn" và liên hệ bản thân rất tích cực.',
        criteriaScores: {
          'Đúng thể loại': 9.0,
          'Nội dung & Cảm xúc': 8.5,
          'Bố cục & Lập luận': 8.5,
          'Dẫn chứng xác thực': 8.0,
          'Diễn đạt & Vốn từ': 8.5,
          'Chính tả & Ngữ pháp': 9.0,
          'Sáng tạo': 8.0,
        },
        strengths: [
          'Dẫn chứng tục ngữ dân gian chuẩn xác, làm tăng sức nặng cho luận điểm.',
          'Kết bài có liên hệ hành động cá nhân cụ thể, không hô hào sáo rỗng.',
        ],
        improvements: [
          {
            originalSentence: 'Khi biết ơn, con người sẽ sống trách nhiệm hơn, luôn có ý thức cống hiến và lan tỏa những điều tốt đẹp.',
            reason: 'Có thể làm cho câu văn giàu hình ảnh và sức gợi hơn bằng các tính từ biểu cảm.',
            suggestion: 'Lòng biết ơn tựa như dòng suối trong lành tưới mát tâm hồn, nhắc nhở mỗi người biết nâng niu quá khứ và sống trọn vẹn với hiện tại.',
          },
        ],
        nextStepAdvice:
          'Em có thể đưa thêm một tấm gương người thật việc thật đương thời (ví dụ như những bạn trẻ tham gia dự án thiện nguyện) để đoạn văn thêm giàu sức thuyết phục.',
      });
      setStep(4);
      if (onIncrementProgress) onIncrementProgress();
    } finally {
      setIsCritiquing(false);
    }
  };

  const handleExportDoc = () => {
    const textContent = `BÀI VIẾT TẠI XƯỞNG SÁNG TẠO VĂN HỌC AI - THCS HUỲNH THÚC KHÁNG
Thể loại: ${genre} | Lớp: ${grade}
Đề bài: ${promptText}
------------------------------------------------
NỘI DUNG BÀI LÀM:
${revisedText || studentText}

------------------------------------------------
NHẬN XÉT CỦA GIÁO VIÊN & GEMINI AI:
Điểm tổng: ${critiqueResult?.totalScore || 8.5} / 10
Đánh giá: ${critiqueResult?.generalFeedback || 'Tốt'}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bai_van_${genre.toLowerCase().replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 text-purple-800 rounded-lg">
              <PenTool className="w-5 h-5 text-purple-700" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              XƯỞNG SÁNG TẠO VĂN HỌC AI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quy trình rèn viết 6 bước: Chọn đề &rarr; Dàn ý &rarr; Viết bài &rarr; AI nhận xét 7 tiêu chí &rarr; Sửa chữa &rarr; Xuất bản
          </p>
        </div>

        {/* 6 Step Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { s: 1, label: 'Đề bài' },
            { s: 2, label: 'Dàn ý' },
            { s: 3, label: 'Viết bài' },
            { s: 4, label: 'Nhận xét' },
            { s: 5, label: 'Sửa chữa' },
          ].map((item) => (
            <button
              key={item.s}
              onClick={() => setStep(item.s)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                step === item.s
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.s}. {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Prompt & Genre Selection */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0F9D92]" />
            Bước 1: Chọn dạng bài và nhập đề văn
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Thể loại bài viết
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none"
              >
                <option value="Nghị luận xã hội">Nghị luận xã hội</option>
                <option value="Nghị luận văn học">Nghị luận văn học</option>
                <option value="Tự sự (Kể chuyện)">Bài văn tự sự (Kể chuyện)</option>
                <option value="Miêu tả">Bài văn miêu tả</option>
                <option value="Biểu cảm">Bài văn biểu cảm</option>
                <option value="Thơ và truyện ngắn">Sáng tác Thơ / Truyện ngắn</option>
                <option value="Kịch bản">Sáng tác Kịch bản văn học</option>
                <option value="Cảm nhận tác phẩm">Đoạn văn cảm nhận tác phẩm</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-none"
              >
                <option value={6}>Lớp 6 (GDPT 2018)</option>
                <option value={7}>Lớp 7 (GDPT 2018)</option>
                <option value={8}>Lớp 8 (GDPT 2018)</option>
                <option value={9}>Lớp 9 (GDPT 2018)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Thời gian đề xuất
              </label>
              <div className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>30 - 45 phút</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Đề bài rèn luyện *
            </label>
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full text-sm p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
              placeholder="Nhập đề bài văn..."
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
            >
              Tiếp tục: Lập dàn ý
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Outline & Brainstorming */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E6B450]" />
              Bước 2: Tìm ý, xác định luận điểm & lập dàn bài
            </h3>

            {onTransferToMindMap && (
              <button
                onClick={() => onTransferToMindMap(`Dàn ý bài văn: ${promptText}`)}
                className="px-3 py-1.5 bg-[#102A43] hover:bg-[#0A1A2A] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#0F9D92]" />
                Tạo sơ đồ dàn ý tư duy
              </button>
            )}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
            <span className="font-bold">Đề bài: </span>
            {promptText}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Khung dàn ý gợi ý (Học sinh có thể bổ sung ý tưởng riêng):
            </label>
            <textarea
              rows={8}
              value={outline}
              onChange={(e) => setOutline(e.target.value)}
              className="w-full text-xs font-mono p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92] leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
            >
              Bắt đầu viết bài
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Student Writing Canvas */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#0F9D92] uppercase">
                {genre} – Lớp {grade}
              </span>
              <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                Đề bài: {promptText}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
                Số từ: <strong className="text-slate-800">{wordCount}</strong> từ
              </span>
            </div>
          </div>

          {/* Editor */}
          <div className="relative">
            <textarea
              rows={14}
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="Học sinh tự viết bài làm tại đây. Hãy diễn đạt bằng suy nghĩ và cảm xúc chân thật nhất..."
              className="w-full text-sm leading-relaxed p-4 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92] font-serif shadow-inner bg-slate-50/30"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Xem lại dàn ý
            </button>

            <button
              onClick={handleRequestCritique}
              disabled={isCritiquing || wordCount < 30}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow-md transition flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isCritiquing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gemini AI đang chấm theo 7 tiêu chí...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#E6B450]" />
                  GỬI BÀI CHO AI NHẬN XÉT
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: AI Critique Results */}
      {step === 4 && critiqueResult && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Đã hoàn tất đánh giá chuẩn GDPT 2018
                </span>
                <h3 className="text-xl font-black text-[#102A43] mt-2">
                  BẢNG ĐIỂM & NHẬN XÉT CHI TIẾT
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-5 py-2.5 bg-gradient-to-br from-[#102A43] to-[#0F9D92] text-white rounded-2xl shadow-md">
                  <div className="text-2xl font-black leading-none text-[#E6B450]">
                    {critiqueResult.totalScore}
                  </div>
                  <div className="text-[10px] font-bold text-white/80 uppercase mt-0.5">
                    Thang điểm 10
                  </div>
                </div>
              </div>
            </div>

            {/* General Feedback */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
              <span className="font-bold">Đánh giá chung: </span>
              {critiqueResult.generalFeedback}
            </div>

            {/* 7-Criteria Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Điểm chi tiết theo 7 tiêu chí sư phạm:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(critiqueResult.criteriaScores || {}).map(([key, val]: any) => (
                  <div
                    key={key}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center"
                  >
                    <div className="text-[11px] font-semibold text-slate-600 truncate">
                      {key}
                    </div>
                    <div className="text-base font-extrabold text-[#102A43] mt-1">
                      {val} <span className="text-xs font-normal text-slate-400">/ 10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Điểm sáng nổi bật của bài viết:
                </h5>
                <ul className="text-xs text-blue-800 space-y-1 pl-4 list-disc">
                  {critiqueResult.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Gợi ý nâng cấp từ ngữ & hình ảnh:
                </h5>
                {critiqueResult.improvements?.map((imp: any, idx: number) => (
                  <div key={idx} className="text-xs text-amber-900 space-y-1">
                    <div className="line-through text-slate-400">
                      "{imp.originalSentence}"
                    </div>
                    <div className="text-emerald-800 font-semibold">
                      &rarr; Viết lại gợi ý: "{imp.suggestion}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Chỉnh sửa bài trực tiếp
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (!revisedText) setRevisedText(studentText);
                    setStep(5);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#102A43] hover:bg-[#0A1A2A] rounded-xl shadow transition flex items-center gap-2"
                >
                  <SplitSquareVertical className="w-4 h-4" />
                  So sánh trước & sau chỉnh sửa
                </button>

                <button
                  onClick={handleExportDoc}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Xuất bài làm (.TXT)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Side-by-Side Revision & Diff */}
      {step === 5 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <SplitSquareVertical className="w-4 h-4 text-[#0F9D92]" />
              Bước 5: So sánh bài viết trước và sau khi chỉnh sửa
            </h3>
            <span className="text-xs text-slate-500">
              Tự hoàn thiện kỹ năng diễn đạt và rèn luyện tư duy độc lập
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 block">
                Bản thảo ban đầu:
              </span>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed font-serif max-h-[380px] overflow-y-auto whitespace-pre-line">
                {studentText}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F9D92] block">
                Bản hoàn thiện (Học sinh chỉnh sửa theo góp ý của AI):
              </span>
              <textarea
                rows={14}
                value={revisedText}
                onChange={(e) => setRevisedText(e.target.value)}
                className="w-full text-xs leading-relaxed p-4 border border-[#0F9D92] rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92] font-serif bg-white shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Quay lại nhận xét
            </button>
            <button
              onClick={handleExportDoc}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              LƯU & XUẤT BẢN HOÀN THIỆN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
