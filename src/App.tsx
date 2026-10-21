import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { ReadingRoom } from './components/reading/ReadingRoom';
import { WritingStudio } from './components/writing/WritingStudio';
import { CharacterCourt } from './components/courtroom/CharacterCourt';
import { SpeechStage } from './components/speech/SpeechStage';
import { EthicsLifeLessons } from './components/ethics/EthicsLifeLessons';
import { LiteratureArena } from './components/arena/LiteratureArena';
import { TeacherLibrary } from './components/library/TeacherLibrary';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';
import { MindMapModule } from './components/mindmap/MindMapModule';
import { LiteratureAIChat } from './components/chat/LiteratureAIChat';
import { DemoShowcaseModal } from './components/showcase/DemoShowcaseModal';
import { INITIAL_LEARNING_PROGRESS } from './data/sampleData';
import { LearningProgress } from './types';
import {
  MessageSquare,
  Bot,
  Sparkles,
  Award,
  ChevronLeft,
} from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState<number>(0);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [progress, setProgress] = useState<LearningProgress>(INITIAL_LEARNING_PROGRESS);

  // Cross-module seed topic for Mind Map module
  const [mindMapTopic, setMindMapTopic] = useState<string>('');

  const handleIncrementProgress = () => {
    setProgress((prev) => ({
      ...prev,
      totalStudyMinutes: prev.totalStudyMinutes + 15,
      mindMapsCreated: prev.mindMapsCreated + 1,
    }));
  };

  const handleTransferToMindMap = (topic: string) => {
    setMindMapTopic(topic);
    setActiveModule(9); // Navigate to Mind Map module
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAIChatWithPrompt = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EFF8FC] text-[#102A43] font-['Be_Vietnam_Pro',sans-serif]">
      {/* Global Application Header */}
      <Header
        activeModule={activeModule}
        onSelectModule={(idx) => {
          setActiveModule(idx);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenShowcase={() => setIsShowcaseOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back to Home Button when inside any module */}
        {activeModule !== 0 && (
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setActiveModule(0)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0F9D92] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay về Trang chủ</span>
            </button>

            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              Trường THCS Huỳnh Thúc Kháng &bull; Tổ Ngữ văn – GDCD
            </div>
          </div>
        )}

        {/* 9 Modules Router */}
        {activeModule === 0 && (
          <HomeView
            onSelectModule={(idx) => {
              setActiveModule(idx);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShowcase={() => setIsShowcaseOpen(true)}
            progress={progress}
          />
        )}

        {activeModule === 1 && (
          <ReadingRoom
            onTransferToMindMap={handleTransferToMindMap}
            onOpenAIChat={handleOpenAIChatWithPrompt}
            onIncrementProgress={handleIncrementProgress}
          />
        )}

        {activeModule === 2 && (
          <WritingStudio
            onTransferToMindMap={handleTransferToMindMap}
            onIncrementProgress={handleIncrementProgress}
          />
        )}

        {activeModule === 3 && (
          <CharacterCourt onIncrementProgress={handleIncrementProgress} />
        )}

        {activeModule === 4 && (
          <SpeechStage onIncrementProgress={handleIncrementProgress} />
        )}

        {activeModule === 5 && (
          <EthicsLifeLessons onIncrementProgress={handleIncrementProgress} />
        )}

        {activeModule === 6 && (
          <LiteratureArena onIncrementProgress={handleIncrementProgress} />
        )}

        {activeModule === 7 && (
          <TeacherLibrary
            onTransferToMindMap={handleTransferToMindMap}
            onIncrementProgress={handleIncrementProgress}
          />
        )}

        {activeModule === 8 && <ProgressDashboard progress={progress} />}

        {activeModule === 9 && (
          <MindMapModule
            initialTopic={mindMapTopic}
            onIncrementProgress={handleIncrementProgress}
          />
        )}
      </main>

      {/* Floating Chatbot Button (Bạn Đồng Hành Văn Học AI) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        title="Bạn Đồng Hành Văn Học AI"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-[#0F9D92] to-[#102A43] hover:from-[#0D877E] hover:to-[#0A1A2A] text-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white ring-4 ring-teal-500/20 group"
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Bạn đồng hành AI
        </span>
      </button>

      {/* Floating AIChat Modal / Drawer */}
      <LiteratureAIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialPrompt={chatInitialPrompt}
      />

      {/* Guided Showcase Tour Modal for Judges */}
      <DemoShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onNavigateModule={(idx) => {
          setActiveModule(idx);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
