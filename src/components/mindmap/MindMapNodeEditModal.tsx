import React, { useState } from 'react';
import { MindMapNode } from '../../types';
import { X, Check, Palette, Tag, AlignLeft, Sparkles } from 'lucide-react';

interface MindMapNodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: MindMapNode | null;
  onSave: (nodeId: string, updates: Partial<MindMapNode>) => void;
}

const COLOR_OPTIONS = [
  '#102A43',
  '#0F9D92',
  '#E6B450',
  '#2563EB',
  '#E11D48',
  '#8B5CF6',
  '#10B981',
  '#F97316',
  '#475569',
];

const ICONS = [
  { id: 'book-open', label: 'Tác phẩm / Sách' },
  { id: 'user', label: 'Nhân vật / Tác giả' },
  { id: 'heart', label: 'Cảm xúc / Đạo đức' },
  { id: 'scale', label: 'Công lý / Đánh giá' },
  { id: 'lightbulb', label: 'Bài học / Tri thức' },
  { id: 'award', label: 'Nghệ thuật / Ý nghĩa' },
  { id: 'sparkles', label: 'Sáng tạo / Điểm nhấn' },
];

export const MindMapNodeEditModal: React.FC<MindMapNodeEditModalProps> = ({
  isOpen,
  onClose,
  node,
  onSave,
}) => {
  if (!isOpen || !node) return null;

  const [label, setLabel] = useState(node.label);
  const [description, setDescription] = useState(node.description || '');
  const [color, setColor] = useState(node.color || '#0F9D92');
  const [icon, setIcon] = useState(node.icon || 'book-open');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    onSave(node.id, {
      label: label.trim(),
      description: description.trim() || undefined,
      color,
      icon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#0F9D92]" />
            Chỉnh sửa nhánh sơ đồ
          </h4>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Tên nhánh / Luận điểm *
            </label>
            <textarea
              rows={2}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full text-sm p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F9D92] focus:border-transparent outline-none"
              placeholder="Nhập tên nhánh (từ khóa súc tích)..."
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mô tả chi tiết / Dẫn chứng trích dẫn
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F9D92] focus:border-transparent outline-none"
              placeholder="Nhập dẫn chứng từ tác phẩm hoặc giải thích ngắn gọn..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#0F9D92]" />
              Màu sắc nhánh
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    color === c ? 'border-slate-800 scale-110 shadow-md ring-2 ring-slate-300' : 'border-white hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {node.level <= 1 && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E6B450]" />
                Biểu tượng
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg outline-none"
              >
                {ICONS.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] rounded-lg shadow transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
