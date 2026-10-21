import React, { useState, useEffect } from 'react';
import { SAMPLE_ARENA_QUESTIONS } from '../../data/sampleData';
import { ArenaQuizQuestion } from '../../types';
import {
  Trophy,
  Star,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface LiteratureArenaProps {
  onIncrementProgress?: () => void;
}

const GAME_MODES = [
  { id: 'all', label: 'Tất cả thử thách' },
  { id: 'author_work', label: 'Ghép tác giả – tác phẩm' },
  { id: 'rhetoric', label: 'Nhận diện biện pháp tu từ' },
  { id: 'trivia', label: 'Ai là nhà văn thông thái?' },
  { id: 'bell', label: 'Rung chuông vàng Ngữ văn' },
];

export const LiteratureArena: React.FC<LiteratureArenaProps> = ({
  onIncrementProgress,
}) => {
  const [selectedGameType, setSelectedGameType] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectList, setIncorrectList] = useState<ArenaQuizQuestion[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);

  const filteredQuestions =
    selectedGameType === 'all'
      ? SAMPLE_ARENA_QUESTIONS
      : SAMPLE_ARENA_QUESTIONS.filter((q) => q.gameType === selectedGameType);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isGameOver) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isGameOver]);

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQ.correctAnswer;
    if (isCorrect) {
      const bonusTime = Math.max(5, timeLeft);
      setScore((prev) => prev + 100 + bonusTime * 10);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectList((prev) => [...prev, currentQ]);
    }

    if (onIncrementProgress) onIncrementProgress();
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setIncorrectList([]);
    setIsGameOver(false);
    setTimeLeft(20);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0F9D92] to-[#102A43] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
            <Trophy className="w-8 h-8 text-[#E6B450]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#E6B450]">
              Game hóa giáo dục Ngữ văn THCS
            </div>
            <h2 className="text-2xl font-black">ĐẤU TRƯỜNG NGỮ VĂN AI</h2>
            <p className="text-xs text-white/80 mt-0.5">
              9 chế độ thử thách thông minh: Giải mã tác phẩm, nhận diện tu từ, rung chuông vàng
            </p>
          </div>
        </div>

        {/* Live Score & Streak */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/10 rounded-xl text-center border border-white/20">
            <span className="text-[10px] text-white/70 block uppercase font-bold">Điểm số</span>
            <strong className="text-xl text-[#E6B450] font-black">{score}</strong>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-xl text-center border border-white/20">
            <span className="text-[10px] text-white/70 block uppercase font-bold">Số câu đúng</span>
            <strong className="text-xl text-emerald-300 font-black">
              {correctCount} / {filteredQuestions.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Game Mode Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {GAME_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              setSelectedGameType(mode.id);
              handleRestart();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition border ${
              selectedGameType === mode.id
                ? 'bg-[#102A43] text-white border-[#102A43] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {!isGameOver ? (
        /* Quiz Question Card */
        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Khối lớp {currentQ.grade}
              </span>
            </div>

            {/* Countdown bar */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-600 animate-bounce' : 'text-[#0F9D92]'}`} />
              <span className={`font-mono text-sm ${timeLeft <= 5 ? 'text-rose-600 font-black' : 'text-slate-700'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold text-[#102A43] leading-relaxed">
            {currentQ.question}
          </h3>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswer === oIdx;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (oIdx === currentQ.correctAnswer) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(oIdx)}
                  className={`p-4 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isAnswered && oIdx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && oIdx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if Answered */}
          {isAnswered && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in duration-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-[#E6B450]" />
                <span>Giải thích chi tiết từ Tổ Ngữ văn:</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-xl shadow transition flex items-center gap-2"
              >
                {currentIndex < filteredQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết kết quả'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Over Summary Card */
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E6B450] to-amber-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
            <Trophy className="w-9 h-9" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#102A43]">
              XUẤT SẮC HOÀN THÀNH ĐẤU TRƯỜNG!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Em đã thể hiện sự hiểu biết sâu sắc về các tác phẩm và nghệ thuật ngôn từ
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Tổng điểm</span>
              <strong className="text-xl text-[#0F9D92] font-black">{score}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Tỉ lệ đúng</span>
              <strong className="text-xl text-emerald-600 font-black">
                {Math.round((correctCount / filteredQuestions.length) * 100)}%
              </strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Huy hiệu</span>
              <strong className="text-xs text-[#E6B450] font-extrabold block mt-1">Nhà Văn Nhí</strong>
            </div>
          </div>

          {incorrectList.length > 0 && (
            <div className="text-left bg-rose-50 p-4 rounded-xl border border-rose-200 max-w-lg mx-auto space-y-2">
              <span className="text-xs font-bold text-rose-900 block">
                Các câu hỏi em nên ôn tập thêm:
              </span>
              <ul className="text-xs text-rose-800 space-y-1 list-disc pl-4">
                {incorrectList.map((iq) => (
                  <li key={iq.id}>{iq.question}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#102A43] hover:bg-[#0A1A2A] rounded-xl shadow transition inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi lại thử thách này
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
