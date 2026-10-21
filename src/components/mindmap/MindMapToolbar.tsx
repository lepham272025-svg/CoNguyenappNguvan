import React from 'react';
import { MindMapLayout, MindMapNode } from '../../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Plus,
  Palette,
  Sparkles,
  Layers,
  FolderTree,
  GitFork,
  Compass,
  Undo2,
  Redo2,
  Trash2,
  Edit3,
} from 'lucide-react';

interface MindMapToolbarProps {
  layout: MindMapLayout;
  onLayoutChange: (layout: MindMapLayout) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onCenterView: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  selectedNode: MindMapNode | null;
  onAddBranch: () => void;
  onAddSubbranch: () => void;
  onDeleteSelected: () => void;
  onEditSelected: () => void;
  onChangeColor: (color: string) => void;
  onChangeIcon: (icon: string) => void;
  onAutoArrange: () => void;
  onToggleCollapseAll: () => void;
  isAllCollapsed: boolean;
}

const COLOR_PALETTE = [
  '#102A43', // Navy
  '#0F9D92', // Jade / Teal
  '#E6B450', // Gold
  '#2563EB', // Blue
  '#E11D48', // Rose Red
  '#8B5CF6', // Purple
  '#10B981', // Emerald Green
  '#F97316', // Orange
];

const ICONS = [
  { id: 'book-open', label: 'Sách' },
  { id: 'user', label: 'Nhân vật' },
  { id: 'heart', label: 'Tình cảm' },
  { id: 'scale', label: 'Công lý' },
  { id: 'lightbulb', label: 'Bài học' },
  { id: 'award', label: 'Thành tựu' },
  { id: 'sparkles', label: 'Sáng tạo' },
];

export const MindMapToolbar: React.FC<MindMapToolbarProps> = ({
  layout,
  onLayoutChange,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onCenterView,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  selectedNode,
  onAddBranch,
  onAddSubbranch,
  onDeleteSelected,
  onEditSelected,
  onChangeColor,
  onChangeIcon,
  onAutoArrange,
  onToggleCollapseAll,
  isAllCollapsed,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* 4 Layout Switchers */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
        <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-[#0F9D92]" />
          Bố cục:
        </span>
        <button
          onClick={() => onLayoutChange('radial')}
          title="Bố cục Tỏa tròn (Radial - 360 độ)"
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
            layout === 'radial'
              ? 'bg-[#102A43] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Tỏa tròn
        </button>
        <button
          onClick={() => onLayoutChange('horizontal_tree')}
          title="Bố cục Cây ngang (Phát triển sang phải)"
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
            layout === 'horizontal_tree'
              ? 'bg-[#102A43] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          Cây ngang
        </button>
        <button
          onClick={() => onLayoutChange('vertical_tree')}
          title="Bố cục Cây dọc (Phát triển xuống dưới)"
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
            layout === 'vertical_tree'
              ? 'bg-[#102A43] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          <GitFork className="w-3.5 h-3.5 rotate-90" />
          Cây dọc
        </button>
        <button
          onClick={() => onLayoutChange('bilateral')}
          title="Bố cục Hai phía (Cân bằng Trái - Phải kiểu Tony Buzan)"
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
            layout === 'bilateral'
              ? 'bg-[#102A43] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          Hai phía
        </button>
      </div>

      {/* Editing & Branch Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onAddBranch}
          className="px-3 py-1.5 text-xs font-medium bg-[#0F9D92] text-white rounded-lg hover:bg-[#0D877E] transition shadow-sm flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          + Nhánh chính
        </button>

        <button
          onClick={onAddSubbranch}
          disabled={!selectedNode}
          title={selectedNode ? 'Thêm nhánh con vào nút đang chọn' : 'Hãy chọn một nút trước'}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition flex items-center gap-1 ${
            selectedNode
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          + Nhánh con
        </button>

        {selectedNode && (
          <>
            <button
              onClick={onEditSelected}
              className="p-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              title="Sửa tên / mô tả nhánh"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDeleteSelected}
              disabled={selectedNode.level === 0}
              className={`p-1.5 text-xs rounded-lg transition ${
                selectedNode.level === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
              title="Xóa nhánh"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Color Palette dropdown / quick bar */}
        {selectedNode && (
          <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
            <Palette className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
            {COLOR_PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => onChangeColor(c)}
                style={{ backgroundColor: c }}
                className={`w-4 h-4 rounded-full border border-white transition-transform ${
                  selectedNode.color === c ? 'scale-125 ring-2 ring-slate-400' : 'hover:scale-110'
                }`}
                title={`Đổi màu sang ${c}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Auto Arrange & Collapse All */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onAutoArrange}
          title="Tự động sắp xếp lại vị trí các nút theo bố cục chuẩn"
          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E6B450]" />
          Tự sắp xếp
        </button>

        <button
          onClick={onToggleCollapseAll}
          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          {isAllCollapsed ? 'Mở rộng tất cả' : 'Thu gọn nhánh'}
        </button>

        {/* Undo / Redo */}
        <div className="flex items-center border-l border-slate-200 pl-2 gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Hoàn tác (Undo)"
            className={`p-1.5 rounded-md ${
              canUndo
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Làm lại (Redo)"
            className={`p-1.5 rounded-md ${
              canRedo
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center border-l border-slate-200 pl-2 gap-1">
          <button
            onClick={onZoomOut}
            title="Thu nhỏ (-)"
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onResetZoom}
            title="Đặt lại tỉ lệ 100%"
            className="px-1.5 py-0.5 text-xs font-mono font-medium text-slate-600 hover:bg-slate-100 rounded"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={onZoomIn}
            title="Phóng to (+)"
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onCenterView}
            title="Căn giữa toàn bộ sơ đồ"
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
