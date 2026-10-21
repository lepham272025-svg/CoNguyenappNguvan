import React, { useState } from 'react';
import { SAMPLE_READING_PASSAGES } from '../../data/sampleData';
import { ReadingPassage, ReadingQuestion } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Award,
} from 'lucide-react';

interface ReadingRoomProps {
  onTransferToMindMap?: (topic: string) => void;
  onOpenAIChat?: (initialPrompt: string) => void;
  onIncrementProgress?: () => void;
}

export const ReadingRoom: React.FC<ReadingRoomProps> = ({
  onTransferToMindMap,
  onOpenAIChat,
  onIncrementProgress,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedPassageId, setSelectedPassageId] = useState<string>('passage-de-men');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);

  const currentPassage =
    SAMPLE_READING_PASSAGES.find((p) => p.id === selectedPassageId) ||
    SAMPLE_READING_PASSAGES[0];

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowFeedback((prev) => ({ ...prev, [qId]: true }));
    if (onIncrementProgress) onIncrementProgress();
  };

  const handleResetQuestion = (qId: number) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setShowFeedback((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 400));
        utterance.lang = 'vi-VN';
        utterance.onend = () => setIsReadingAloud(false);
        setIsReadingAloud(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <BookOpen className="w-5 h-5 text-[#0F9D92]" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              PHÒNG ĐỌC HIỂU AI THCS
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rèn năng lực đọc sâu tác phẩm, giải mã chi tiết và phát triển tư duy phản biện 4 mức độ
          </p>
        </div>

        {/* Grade and Text Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  selectedGrade === g
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          <select
            value={selectedPassageId}
            onChange={(e) => {
              setSelectedPassageId(e.target.value);
              setAnswers({});
              setShowFeedback({});
            }}
            className="text-xs font-semibold py-2 px-3 bg-white text-slate-800 border border-slate-300 rounded-xl outline-none"
          >
            {SAMPLE_READING_PASSAGES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} – {p.author} (Lớp {p.grade})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Grid: Left Text, Right Interactive Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Passage Content */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {currentPassage.bookSet}
              </span>
              <h3 className="text-lg font-bold text-[#102A43] mt-1">
                {currentPassage.title}
              </h3>
              <p className="text-xs text-slate-500">Tác giả: {currentPassage.author}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(currentPassage.content)}
                title="Nghe giọng đọc mẫu"
                className={`p-2 rounded-xl border text-xs font-medium transition flex items-center gap-1 ${
                  isReadingAloud
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                {isReadingAloud ? 'Dừng đọc' : 'Đọc mẫu'}
              </button>

              {onTransferToMindMap && (
                <button
                  onClick={() =>
                    onTransferToMindMap(
                      `Phân tích tác phẩm ${currentPassage.title} (${currentPassage.author})`
                    )
                  }
                  className="px-3 py-2 bg-[#0F9D92] hover:bg-[#0D877E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <GitBranch className="w-4 h-4" />
                  Chuyển thành Sơ đồ tư duy
                </button>
              )}
            </div>
          </div>

          {/* Passage scrollable body */}
          <div className="flex-1 overflow-y-auto max-h-[560px] pr-2 text-slate-700 text-sm leading-relaxed whitespace-pre-line font-serif bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            {currentPassage.content}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Chủ đề: {currentPassage.topic}</span>
            <button
              onClick={() =>
                onOpenAIChat &&
                onOpenAIChat(
                  `Hãy giúp em tìm các chi tiết đắt giá nhất trong văn bản "${currentPassage.title}" của ${currentPassage.author}.`
                )
              }
              className="text-[#0F9D92] hover:underline font-semibold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Hỏi Bạn đồng hành AI về văn bản
            </button>
          </div>
        </div>

        {/* Right Column: 4-Level Comprehension Questions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E6B450]" />
              <span className="text-sm font-bold text-[#102A43]">
                Hệ thống câu hỏi đọc hiểu 4 cấp độ
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Đã làm: {Object.keys(answers).length} / {currentPassage.questions.length} câu
            </span>
          </div>

          {currentPassage.questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = answers[q.id] === q.correctOptionIndex;
            const badgeColors = {
              'Nhận biết': 'bg-blue-100 text-blue-800 border-blue-200',
              'Thông hiểu': 'bg-amber-100 text-amber-800 border-amber-200',
              'Vận dụng': 'bg-purple-100 text-purple-800 border-purple-200',
              'Vận dụng cao': 'bg-rose-100 text-rose-800 border-rose-200',
            };

            return (
              <div
                key={q.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 transition hover:border-[#0F9D92]/50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      badgeColors[q.level]
                    }`}
                  >
                    Mức độ: {q.level}
                  </span>
                  {isAnswered && (
                    <button
                      onClick={() => handleResetQuestion(q.id)}
                      className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Làm lại
                    </button>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#102A43] leading-snug">
                  Câu {idx + 1}: {q.question}
                </h4>

                {/* Multiple Choice Options if available */}
                {q.options && (
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === oIdx;
                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (showFeedback[q.id]) {
                        if (oIdx === q.correctOptionIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-50 border-blue-400 text-blue-800';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={showFeedback[q.id]}
                          onClick={() => handleSelectAnswer(q.id, oIdx)}
                          className={`w-full text-left p-3 text-xs rounded-xl border transition flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                          <span className="flex-1">{opt.replace(/^[A-D]\.\s*/, '')}</span>
                          {showFeedback[q.id] && oIdx === q.correctOptionIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {showFeedback[q.id] && isSelected && oIdx !== q.correctOptionIndex && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Textual Evidence & Pedagogical Explanation */}
                {showFeedback[q.id] && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5 animate-in fade-in duration-200 text-xs">
                    {q.textEvidence && (
                      <div className="text-slate-700">
                        <span className="font-bold text-emerald-800">Căn cứ văn bản: </span>
                        <span className="italic">{q.textEvidence}</span>
                      </div>
                    )}
                    {q.explanation && (
                      <div className="text-emerald-900 leading-relaxed">
                        <span className="font-bold">Giải thích: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Free Text / Sample Answers for Level 3 & 4 */}
                {!q.options && (
                  <div className="space-y-3 pt-2">
                    {q.hint && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Gợi ý suy ngẫm: </span>
                          {q.hint}
                        </div>
                      </div>
                    )}

                    <textarea
                      rows={3}
                      placeholder="Học sinh nhập câu trả lời độc lập của mình..."
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
                    />

                    {q.sampleAnswer && (
                      <details className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <summary className="font-bold text-slate-700 cursor-pointer hover:text-[#0F9D92]">
                          Xem câu trả lời mẫu gợi ý
                        </summary>
                        <p className="mt-2 text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                          {q.sampleAnswer}
                        </p>
                      </details>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
