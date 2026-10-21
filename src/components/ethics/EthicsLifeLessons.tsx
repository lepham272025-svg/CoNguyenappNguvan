import React, { useState } from 'react';
import { SAMPLE_ETHICS_DILEMMAS } from '../../data/sampleData';
import { EthicsDilemma } from '../../types';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface EthicsLifeLessonsProps {
  onIncrementProgress?: () => void;
}

export const EthicsLifeLessons: React.FC<EthicsLifeLessonsProps> = ({
  onIncrementProgress,
}) => {
  const [selectedDilemmaId, setSelectedDilemmaId] = useState<string>('dilemma-cyberbullying');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [studentNote, setStudentNote] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentDilemma =
    SAMPLE_ETHICS_DILEMMAS.find((d) => d.id === selectedDilemmaId) ||
    SAMPLE_ETHICS_DILEMMAS[0];

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setIsSubmitted(true);
    if (onIncrementProgress) onIncrementProgress();
  };

  const handleReset = () => {
    setSelectedChoiceId(null);
    setIsSubmitted(false);
    setStudentNote('');
  };

  const chosenOption = currentDilemma.choices.find((c) => c.id === selectedChoiceId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-800 rounded-lg">
              <Heart className="w-5 h-5 text-rose-600" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              VĂN HỌC & BÀI HỌC LÀM NGƯỜI AI (GDCD)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gắn kết tri thức Ngữ văn với Giáo dục công dân: 10 phẩm chất cốt lõi & văn hóa công dân số
          </p>
        </div>

        {/* Dilemma Selector */}
        <select
          value={selectedDilemmaId}
          onChange={(e) => {
            setSelectedDilemmaId(e.target.value);
            handleReset();
          }}
          className="text-xs font-semibold py-2 px-3 bg-slate-100 text-slate-800 border border-slate-300 rounded-xl outline-none"
        >
          {SAMPLE_ETHICS_DILEMMAS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dilemma Scenario */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {currentDilemma.gdcdTopic}
              </span>
              <h3 className="text-base font-bold text-[#102A43] mt-2">
                {currentDilemma.title}
              </h3>
            </div>
            {isSubmitted && (
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Chọn lại
              </button>
            )}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900 block">Tình huống thực tế:</span>
            <p>{currentDilemma.scenario}</p>
          </div>

          {/* Connected Literary Work */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Mối liên hệ văn học: </span>
              {currentDilemma.literaryConnection}
            </div>
          </div>

          {/* Interactive Choices */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-700 block">
              Nếu là em trong tình huống này, em sẽ lựa chọn cách ứng xử nào?
            </label>

            {currentDilemma.choices.map((choice, idx) => {
              const isSelected = selectedChoiceId === choice.id;
              let style = 'bg-white border-slate-200 hover:border-[#0F9D92] hover:bg-slate-50';
              if (isSelected) {
                style = choice.recommended
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                  : 'bg-rose-50 border-rose-300 text-rose-900 shadow-xs';
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 ${style}`}
                >
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg shrink-0">
                    Phương án {idx + 1}
                  </span>
                  <span className="text-xs font-medium flex-1">{choice.text}</span>
                  {isSelected && (
                    <span className="shrink-0">
                      {choice.recommended ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Moral Feedback & Reflection */}
        <div className="lg:col-span-5 space-y-4">
          {chosenOption ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Award className="w-5 h-5 text-[#E6B450]" />
                <h4 className="text-sm font-bold text-[#102A43]">
                  PHÂN TÍCH HẬU QUẢ & BÀI HỌC ĐẠO ĐỨC
                </h4>
              </div>

              {/* Consequence */}
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                  chosenOption.recommended
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <span className="font-bold block">
                  {chosenOption.recommended ? 'Kết quả tích cực:' : 'Hậu quả tiềm ẩn:'}
                </span>
                <p>{chosenOption.consequence}</p>
              </div>

              {/* Moral Analysis */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed space-y-1.5">
                <span className="font-bold block flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Đánh giá giá trị nhân cách (GDCD 2018):
                </span>
                <p>{chosenOption.moralAnalysis}</p>
              </div>

              {/* Personal Reflection Note */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Ghi lại suy ngẫm của bản thân:
                </label>
                <textarea
                  rows={4}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder="Em rút ra được bài học gì để hoàn thiện nhân cách của chính mình?"
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-[#102A43]">
                Chưa lựa chọn phương án
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Hãy đọc kỹ tình huống bên trái và bấm chọn 1 phương án ứng xử để nhận phân tích chuyên sâu về đạo đức và hậu quả từ AI.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
