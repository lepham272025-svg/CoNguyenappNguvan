import React, { useState } from 'react';
import { SAMPLE_COURT_CASES } from '../../data/sampleData';
import { CourtCase, CourtDebateMessage } from '../../types';
import {
  Scale,
  Gavel,
  ShieldAlert,
  User,
  Sparkles,
  Send,
  Loader2,
  Award,
  BookOpen,
  MessageSquare,
  RotateCcw,
  Save,
  CheckCircle2,
} from 'lucide-react';

interface CharacterCourtProps {
  onIncrementProgress?: () => void;
}

export const CharacterCourt: React.FC<CharacterCourtProps> = ({
  onIncrementProgress,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-de-men');
  const [userRole, setUserRole] = useState<string>('Luật sư đại diện Dế Choắt');
  const [isTrialActive, setIsTrialActive] = useState<boolean>(false);
  const [userArgument, setUserArgument] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [messages, setMessages] = useState<CourtDebateMessage[]>([]);
  const [verdict, setVerdict] = useState<any>(null);
  const [saveNote, setSaveNote] = useState<string | null>(null);

  const currentCase =
    SAMPLE_COURT_CASES.find((c) => c.id === selectedCaseId) ||
    SAMPLE_COURT_CASES[0];

  const handleStartTrial = () => {
    setIsTrialActive(true);
    setVerdict(null);
    const initialOpening: CourtDebateMessage = {
      id: `msg-${Date.now()}`,
      speaker: 'Chủ tọa phiên tòa (Thẩm phán AI)',
      role: 'Chủ tọa',
      text: `Chào mừng toàn thể phiên xét xử văn học tại Trường THCS Huỳnh Thúc Kháng! Hôm nay, chúng ta xem xét vụ việc: "${currentCase.title}". Bối cảnh: ${currentCase.conflict}. Các bên tranh biện xin mời trình bày lập luận và viện dẫn chứng cứ chính xác từ tác phẩm!`,
      timestamp: '10:00',
      isAi: true,
    };
    setMessages([initialOpening]);
    if (onIncrementProgress) onIncrementProgress();
  };

  const handleSendArgument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userArgument.trim()) return;

    const userMsg: CourtDebateMessage = {
      id: `user-${Date.now()}`,
      speaker: `Em (${userRole})`,
      role: userRole,
      text: userArgument.trim(),
      timestamp: '10:05',
      isAi: false,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setUserArgument('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/gemini/court-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          literaryWork: currentCase.literaryWork,
          character: currentCase.character,
          conflict: currentCase.conflict,
          userRole: userRole,
          debateHistory: newMessages.slice(-4),
          userArgument: userMsg.text,
        }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        const aiMsg: CourtDebateMessage = {
          id: `ai-${Date.now()}`,
          speaker: resData.data.speaker || currentCase.character,
          role: resData.data.role || 'Nhân vật văn học',
          text: resData.data.responseMessage,
          timestamp: '10:06',
          isAi: true,
        };
        setMessages([...newMessages, aiMsg]);
      } else {
        throw new Error('Fallback AI response');
      }
    } catch {
      // In-character fallback response based on Dế Mèn / literary text
      const fallbackReply =
        userRole.includes('Choắt') || userRole.includes('phản biện')
          ? `(Dế Mèn run rẩy cúi đầu, giọng nghẹn ngào): "Thưa quý tòa và bạn Choắt! Tôi vô cùng ân hận... Tôi thừa nhận chỉ vì thói hung hăng, hiếu thắng muốn ra oai trước mắt bà con mà trêu ghẹo chị Cốc. Nhưng tôi không hề có ác tâm muốn hại chết Choắt! Giờ đây, đứng trước nấm mồ của bạn, tim tôi như bị xé nát. Tôi xin nhận mọi lời phán xét và nguyện mang theo bài học xương máu này suốt cuộc đời!"`
          : `(Chủ tọa gõ búa): "Hội đồng xét xử ghi nhận lập luận rất sắc sảo của vị luật sư! Dẫn chứng về chi tiết Dế Mèn đắp mộ và khóc Choắt cho thấy sự thức tỉnh lương tâm, dù cái giá phải trả là quá đắt!"`;

      const aiMsg: CourtDebateMessage = {
        id: `ai-${Date.now()}`,
        speaker: 'Dế Mèn (Bị can)',
        role: 'Nhân vật văn học',
        text: fallbackReply,
        timestamp: '10:06',
        isAi: true,
      };
      setMessages([...newMessages, aiMsg]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleEndTrial = () => {
    setVerdict({
      title: 'TỔNG KẾT PHÁN QUYẾT & BÀI HỌC NHÂN VĂN',
      argumentScore: 9.0,
      evidenceScore: 8.5,
      moralScore: 9.5,
      summary: `Phiên tòa văn học đã khép lại thành công. Dế Mèn phải chịu trách nhiệm đạo đức to lớn vì sự nông nổi và kiêu ngạo của mình. Tuy nhiên, thái độ chân thành ăn năn và sự thay đổi nhận thức đã giúp nhân vật mở ra một hành trình sống đẹp hơn sau này.`,
      moralLesson: `Bài học cho mỗi học sinh: Sức mạnh thể chất hay trí tuệ chỉ thực sự có giá trị khi dùng để che chở, nâng đỡ những người yếu thế, tuyệt đối không dùng để bắt nạt hay mua vui nhất thời.`,
    });
    if (onIncrementProgress) onIncrementProgress();
  };

  return (
    <div className="space-y-6">
      {/* Court Header */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0F9D92] to-[#102A43] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Gavel className="w-8 h-8 text-[#E6B450]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#E6B450]">
              Tòa án Giả định Văn học – THCS Huỳnh Thúc Kháng
            </div>
            <h2 className="text-2xl font-black">
              TÒA ÁN NHÂN VẬT VĂN HỌC AI
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              Nhập vai, tranh biện đa chiều, soi sáng tâm lý nhân vật & bài học trách nhiệm công dân
            </p>
          </div>
        </div>

        {/* Case Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCaseId}
            onChange={(e) => {
              setSelectedCaseId(e.target.value);
              setIsTrialActive(false);
              setMessages([]);
              setVerdict(null);
            }}
            className="text-xs font-semibold py-2.5 px-3.5 bg-white text-slate-800 rounded-xl shadow outline-none"
          >
            {SAMPLE_COURT_CASES.map((c) => (
              <option key={c.id} value={c.id}>
                Vụ án: {c.character} ({c.literaryWork})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trial Setup or Trial Canvas */}
      {!isTrialActive ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-[#0F9D92] uppercase">
              Hồ sơ vụ án văn học số: {currentCase.id}
            </span>
            <h3 className="text-xl font-black text-[#102A43] mt-1">
              {currentCase.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Tác phẩm: <strong>{currentCase.literaryWork}</strong> | Nhân vật trọng tâm: <strong>{currentCase.character}</strong>
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block">Tình huống tranh tụng:</span>
            <p>{currentCase.conflict}</p>
            <p className="italic text-slate-500">{currentCase.context}</p>
          </div>

          {/* Select User Role */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Chọn vai trò em muốn tham gia trong phiên tòa:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentCase.defaultRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`p-3 text-xs font-semibold rounded-xl border text-left transition flex items-center gap-2 ${
                    userRole === role
                      ? 'bg-[#102A43] text-white border-[#102A43] shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4 text-[#0F9D92] shrink-0" />
                  <span className="truncate">{role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleStartTrial}
              className="px-8 py-3 text-sm font-black text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Gavel className="w-5 h-5 text-[#E6B450]" />
              BẮT ĐẦU PHIÊN TÒA TRANH BIỆN
            </button>
          </div>
        </div>
      ) : (
        /* Active Courtroom Canvas */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Court Dialogue History */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#0F9D92]" />
                <h4 className="text-sm font-bold text-[#102A43]">
                  Diễn biến tranh biện tại phiên tòa
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">
                Vai của em: {userRole}
              </span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
              {messages.map((m) => {
                const isUser = !m.isAi;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                      <span>{m.speaker}</span>
                      <span className="text-[10px] font-normal text-slate-400">
                        ({m.role})
                      </span>
                    </div>
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#102A43] text-white rounded-tr-none'
                          : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none font-serif'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#0F9D92]" />
                  Nhân vật AI đang chuẩn bị lý lẽ phản biện dựa trên tác phẩm...
                </div>
              )}
            </div>

            {/* Input Argument Form */}
            <form onSubmit={handleSendArgument} className="pt-3 border-t border-slate-100 mt-2 flex gap-2">
              <input
                type="text"
                value={userArgument}
                onChange={(e) => setUserArgument(e.target.value)}
                placeholder={`Nhập lập luận và dẫn chứng của ${userRole}...`}
                className="flex-1 text-xs p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
              />
              <button
                type="submit"
                disabled={isAiThinking || !userArgument.trim()}
                className="px-5 py-3 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-1.5 disabled:bg-slate-300"
              >
                <Send className="w-4 h-4" />
                Phản biện
              </button>
            </form>
          </div>

          {/* Right Column: Court Info, Controls & Verdict */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Điều phối phiên tòa:
              </h4>

              <div className="space-y-2">
                <button
                  onClick={handleEndTrial}
                  className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E6B450] to-amber-600 rounded-xl shadow transition flex items-center justify-center gap-2 text-slate-900"
                >
                  <Gavel className="w-4 h-4 text-slate-900" />
                  KẾT THÚC PHIÊN TÒA & XEM PHÁN QUYẾT
                </button>

                <button
                  onClick={() => {
                    setIsTrialActive(false);
                    setMessages([]);
                    setVerdict(null);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Bắt đầu lại phiên tòa khác
                </button>
              </div>

              {/* Assessment Criteria Note */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
                <span className="font-bold block">Tiêu chí đánh giá tranh tụng:</span>
                <p>&bull; Bám sát sự thật và diễn biến trong tác phẩm.</p>
                <p>&bull; Lập luận chặt chẽ, dẫn chứng xác thực.</p>
                <p>&bull; Tôn trọng ý kiến khác biệt, đề cao tính nhân văn.</p>
              </div>
            </div>

            {/* Verdict Box */}
            {verdict && (
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E6B450] shadow-md space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#102A43]">
                  <Award className="w-5 h-5 text-[#E6B450]" />
                  <h5 className="text-xs font-black uppercase">
                    {verdict.title}
                  </h5>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Lập luận</span>
                    <strong className="text-xs text-[#0F9D92]">{verdict.argumentScore}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Dẫn chứng</span>
                    <strong className="text-xs text-[#0F9D92]">{verdict.evidenceScore}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Nhân văn</span>
                    <strong className="text-xs text-[#0F9D92]">{verdict.moralScore}</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-serif">
                  {verdict.summary}
                </p>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                  <span className="font-bold">Bài học đạo đức: </span>
                  {verdict.moralLesson}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
