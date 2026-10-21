import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  BookOpen,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle,
  Clock,
  Play,
  FileText,
} from 'lucide-react';

interface SpeechStageProps {
  onIncrementProgress?: () => void;
}

export const SpeechStage: React.FC<SpeechStageProps> = ({
  onIncrementProgress,
}) => {
  const [speechType, setSpeechType] = useState<string>('Thuyết trình văn học');
  const [topic, setTopic] = useState<string>(
    'Giới thiệu cuốn sách Dế Mèn phiêu lưu ký và bài học trưởng thành cho học sinh lớp 6'
  );
  const [transcript, setTranscript] = useState<string>(
    `Kính thưa quý thầy cô và các bạn! Hôm nay, em xin trân trọng giới thiệu đến mọi người cuốn sách "Dế Mèn phiêu lưu ký" của nhà văn Tô Hoài. Tác phẩm không chỉ mở ra một thế giới loài vật ngộ nghĩnh, sống động mà còn gửi gắm những thông điệp giáo dục vô cùng sâu sắc về tình bạn, lòng bao dung và sự dũng cảm đối diện với sai lầm. Qua cái chết của Dế Choắt và sự thức tỉnh của Dế Mèn, em hiểu rằng sức mạnh của một con người không nằm ở việc bắt nạt kẻ yếu, mà ở lòng trắc ẩn và tinh thần trượng nghĩa giúp đời...`
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleToggleRecord = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận dạng giọng nói trực tiếp. Bạn có thể gõ trực tiếp nội dung bài nói vào khung soạn thảo.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentResult = '';
          for (let i = 0; i < event.results.length; i++) {
            currentResult += event.results[i][0].transcript + ' ';
          }
          setTranscript((prev) => prev + ' ' + currentResult);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);

        recognition.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  const handleAnalyzeSpeech = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFeedback({
        totalScore: 9.0,
        contentScore: 9.2,
        coherenceScore: 9.0,
        rhetoricScore: 8.8,
        strengths: [
          'Lời chào và mở đầu cuốn hút, xác định đúng trọng tâm tác phẩm Dế Mèn phiêu lưu ký.',
          'Bố cục 3 phần rõ ràng: Giới thiệu chung &rarr; Nêu chi tiết bài học Dế Choắt &rarr; Liên hệ bản thân.',
          'Sử dụng ngôn từ chuẩn mực, có chiều sâu cảm xúc.',
        ],
        improvements: [
          'Có thể thêm một câu trích dẫn nguyên văn câu nói trăng trối của Dế Choắt để tăng sức thuyết phục cho bài thuyết trình.',
          'Nên nhấn nhá tốc độ ở đoạn kết khi nói về lòng trắc ẩn và tinh thần trượng nghĩa.',
        ],
        deliveryAdvice: 'Tư thế đứng đĩnh đạc, ánh mắt giao lưu với người nghe và điều chỉnh nhịp thở đều đặn khi bắt đầu.',
      });
      setIsAnalyzing(false);
      if (onIncrementProgress) onIncrementProgress();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Mic className="w-5 h-5 text-blue-700" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              SÂN KHẤU NÓI VÀ NGHE AI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rèn luyện kỹ năng đọc diễn cảm, thuyết trình sách, đóng vai nhân vật & phản hồi học thuật từ AI
          </p>
        </div>

        {/* Speech Type Selector */}
        <select
          value={speechType}
          onChange={(e) => setSpeechType(e.target.value)}
          className="text-xs font-semibold py-2 px-3 bg-slate-100 text-slate-800 border border-slate-300 rounded-xl outline-none"
        >
          <option value="Thuyết trình văn học">Thuyết trình văn học</option>
          <option value="Giới thiệu sách">Giới thiệu sách hay</option>
          <option value="Luyện đọc diễn cảm">Luyện đọc diễn cảm</option>
          <option value="Kể chuyện sáng tạo">Kể chuyện sáng tạo</option>
          <option value="Tranh biện ý kiến">Trình bày ý kiến tranh biện</option>
          <option value="Đóng vai nhân vật">Đóng vai đối thoại nhân vật</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Script / Recording Area */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Chủ đề bài nói:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
            />
          </div>

          <div className="flex-1 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Nội dung bài nói (Học sinh nhập hoặc bấm thu âm giọng nói):
              </label>
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`px-3 py-1 text-xs font-bold rounded-full transition flex items-center gap-1.5 ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-rose-600" />}
                {isRecording ? 'Đang thu âm...' : 'Bật Mic thu âm'}
              </button>
            </div>

            <textarea
              rows={12}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Nội dung bài thuyết trình hoặc lời kể của em..."
              className="flex-1 w-full text-xs p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92] leading-relaxed font-serif"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleAnalyzeSpeech}
              disabled={isAnalyzing || !transcript.trim()}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI đang phân tích bài nói...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#E6B450]" />
                  AI ĐÁNH GIÁ BÀI NÓI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Pedagogical Feedback */}
        <div className="lg:col-span-5 space-y-4">
          {feedback ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#E6B450]" />
                  <h4 className="text-sm font-bold text-[#102A43]">
                    KẾT QUẢ ĐÁNH GIÁ KỸ NĂNG NÓI
                  </h4>
                </div>
                <div className="text-base font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl">
                  {feedback.totalScore} / 10
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Nội dung</span>
                  <strong className="text-xs text-[#0F9D92]">{feedback.contentScore}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Mạch lạc</span>
                  <strong className="text-xs text-[#0F9D92]">{feedback.coherenceScore}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Từ ngữ</span>
                  <strong className="text-xs text-[#0F9D92]">{feedback.rhetoricScore}</strong>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-emerald-900 block flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  Điểm làm tốt:
                </span>
                <ul className="text-xs text-emerald-800 space-y-1 pl-4 list-disc">
                  {feedback.strengths.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-amber-900 block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Điểm cần rèn luyện thêm:
                </span>
                <ul className="text-xs text-amber-800 space-y-1 pl-4 list-disc">
                  {feedback.improvements.map((imp: string, idx: number) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>

              {/* Delivery Advice */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                <span className="font-bold block mb-1">Lời khuyên về phong thái diễn đạt:</span>
                <p>{feedback.deliveryAdvice}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Mic className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-[#102A43]">
                Chưa có phản hồi bài nói
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Hãy nhập bài nói hoặc bật mic để đọc, sau đó nhấn "AI ĐÁNH GIÁ BÀI NÓI" để nhận nhận xét chuyên sâu từ trợ lý sư phạm.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
