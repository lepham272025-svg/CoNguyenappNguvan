import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  BookOpen,
  Bot,
  Lightbulb,
} from 'lucide-react';

interface LiteratureAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const LiteratureAIChat: React.FC<LiteratureAIChatProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Chào bạn! Mình là Bạn Đồng Hành Văn Học AI của Trường THCS Huỳnh Thúc Kháng. Bạn đang cần tìm hiểu về tác phẩm nào, muốn gợi ý lập dàn ý, phân tích nhân vật hay sơ đồ tư duy?',
    },
  ]);
  const [input, setInput] = useState<string>(initialPrompt);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newMsgs = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: newMsgs.slice(-4),
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setMessages([...newMsgs, { sender: 'ai' as const, text: data.reply }]);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      // Pedagogical fallback response
      let fallback = 'Về câu hỏi của bạn, theo gợi ý từ Tổ Ngữ văn: Hãy bắt đầu bằng cách tìm các từ ngữ, hình ảnh hoặc chi tiết then chốt ngay trong văn bản SGK. Khi bạn có dẫn chứng rõ ràng, ý văn của bạn sẽ vô cùng thuyết phục!';
      if (userText.toLowerCase().includes('dế mèn')) {
        fallback = 'Nhân vật Dế Mèn là bài học sâu sắc về sự trưởng thành: Ban đầu Dế Mèn kiêu căng, cậy sức trêu chọc chị Cốc gián tiếp hại chết Dế Choắt. Nhưng điểm đáng quý là Mèn đã thức tỉnh lương tâm, ăn năn hối hận và quyết tâm phiêu lưu làm việc nghĩa!';
      } else if (userText.toLowerCase().includes('sơ đồ')) {
        fallback = 'Để vẽ sơ đồ tư duy hiệu quả: Đặt tên tác phẩm/nhân vật ở giữa (nút trung tâm), tỏa ra 4-6 nhánh chính (Ngoại hình, Tính cách, Hành động, Nghệ thuật, Bài học) và dùng từ khóa ngắn gọn, kèm biểu tượng và màu sắc sinh động!';
      }
      setMessages([...newMsgs, { sender: 'ai' as const, text: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
      {/* Header */}
      <div className="px-4 py-3 bg-[#102A43] text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#0F9D92] rounded-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold">BẠN ĐỒNG HÀNH VĂN HỌC AI</h4>
            <span className="text-[10px] text-white/70 block">
              Trợ lý sư phạm THCS Huỳnh Thúc Kháng
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] shadow-xs ${
                m.sender === 'user'
                  ? 'bg-[#102A43] text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-serif'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0F9D92]" />
            Bạn đồng hành đang suy nghĩ lời giải thích...
          </div>
        )}
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2 bg-white border-t border-slate-100 flex gap-1 overflow-x-auto text-[10px]">
        <button
          onClick={() => setInput('Gợi ý dàn ý phân tích nhân vật Dế Mèn')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap text-slate-700"
        >
          Dàn ý Dế Mèn
        </button>
        <button
          onClick={() => setInput('Cách nhận biết biện pháp tu từ ẩn dụ và hoán dụ')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap text-slate-700"
        >
          Ẩn dụ & Hoán dụ
        </button>
        <button
          onClick={() => setInput('Làm thế nào để tạo sơ đồ tư duy đẹp?')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap text-slate-700"
        >
          Mẹo sơ đồ tư duy
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi về tác phẩm, từ ngữ, dàn ý..."
          className="flex-1 text-xs p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0F9D92]"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-3 py-2.5 bg-[#0F9D92] hover:bg-[#0D877E] text-white rounded-xl shadow transition disabled:bg-slate-300"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
