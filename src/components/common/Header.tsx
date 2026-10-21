import React from 'react';
import {
  BookOpen,
  Sparkles,
  Trophy,
  User,
  GraduationCap,
  Play,
  GitBranch,
} from 'lucide-react';

interface HeaderProps {
  activeModule: number;
  onSelectModule: (index: number) => void;
  onOpenShowcase: () => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  onOpenShowcase,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#102A43] text-white shadow-lg border-b border-white/10">
      {/* Top micro bar */}
      <div className="bg-[#0A1A2A] text-white/80 py-1.5 px-4 text-[11px] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-[#0F9D92]" />
          <span className="font-bold tracking-wider uppercase text-white/90">
            TRƯỜNG THCS HUỲNH THÚC KHÁNG
          </span>
          <span className="text-white/40">|</span>
          <span className="font-medium text-[#E6B450]">TỔ NGỮ VĂN – GDCD</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-white/70">
          <span>Khối 6, 7, 8, 9 (Chương trình GDPT 2018)</span>
          <span className="text-white/40">&bull;</span>
          <span className="italic text-[#0F9D92] font-semibold">
            ĐỌC SÂU – VIẾT THẬT – NÓI HAY – SỐNG ĐẸP – TƯ DUY SÁNG RÕ
          </span>
        </div>
      </div>

      {/* Main Brand & Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div
          onClick={() => onSelectModule(0)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F9D92] to-[#E6B450] flex items-center justify-center text-slate-950 font-black shadow-md group-hover:scale-105 transition">
            <BookOpen className="w-6 h-6 text-[#102A43]" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#0F9D92]">
              HỆ SINH THÁI AI NGỮ VĂN – GDCD
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-white">
              HUỲNH THÚC KHÁNG VĂN HỌC SỐNG AI
            </h1>
          </div>
        </div>

        {/* Global Action Highlights */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenShowcase}
            className="px-3.5 py-2 text-xs font-black bg-gradient-to-r from-[#E6B450] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95 border border-amber-300"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden md:inline">TRẢI NGHIỆM HỆ SINH THÁI AI</span>
            <span className="md:hidden">TRÌNH DIỄN</span>
          </button>

          <button
            onClick={() => onSelectModule(9)}
            className="px-3.5 py-2 text-xs font-bold bg-[#0F9D92] hover:bg-[#0D877E] text-white rounded-xl shadow transition flex items-center gap-1.5 active:scale-95"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#E6B450]" />
            <span className="hidden sm:inline">Sơ đồ tư duy AI</span>
          </button>
        </div>
      </div>

      {/* 9 Modules Navigation Bar */}
      <div className="bg-[#14324F] border-t border-white/10 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1.5 min-w-max">
          <button
            onClick={() => onSelectModule(0)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeModule === 0
                ? 'bg-[#0F9D92] text-white shadow-xs'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            Trang chủ
          </button>

          {[
            { idx: 1, label: '1. Đọc hiểu AI' },
            { idx: 2, label: '2. Xưởng viết AI' },
            { idx: 3, label: '3. Tòa án nhân vật' },
            { idx: 4, label: '4. Nói & nghe' },
            { idx: 5, label: '5. GDCD & Bài học' },
            { idx: 6, label: '6. Đấu trường' },
            { idx: 7, label: '7. Thư viện học liệu' },
            { idx: 8, label: '8. Hồ sơ tiến bộ' },
            { idx: 9, label: '9. SƠ ĐỒ TƯ DUY AI' },
          ].map((tab) => (
            <button
              key={tab.idx}
              onClick={() => onSelectModule(tab.idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                activeModule === tab.idx
                  ? 'bg-[#0F9D92] text-white shadow-xs'
                  : tab.idx === 9
                  ? 'text-[#E6B450] hover:bg-white/10 font-black'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
