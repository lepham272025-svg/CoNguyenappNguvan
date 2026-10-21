import React, { useRef, useState, useEffect } from 'react';
import { MindMapNode } from '../../types';
import { 
  BookOpen, User, Heart, Scale, Lightbulb, Award, Sparkles, 
  ChevronRight, ChevronDown, Edit2, Plus, Trash2, Move 
} from 'lucide-react';

interface MindMapCanvasProps {
  nodes: MindMapNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  onUpdateNodePosition: (id: string, x: number, y: number) => void;
  onEditNode: (node: MindMapNode) => void;
  onAddSubbranch: (parentId: string) => void;
  onDeleteNode: (id: string) => void;
  onToggleCollapse: (id: string) => void;
  zoom: number;
  pan: { x: number; y: number };
  onPanChange: (pan: { x: number; y: number }) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  showWatermark?: boolean;
  schoolTitle?: string;
  subTitle?: string;
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onUpdateNodePosition,
  onEditNode,
  onAddSubbranch,
  onDeleteNode,
  onToggleCollapse,
  zoom,
  pan,
  onPanChange,
  canvasRef,
  showWatermark = true,
  schoolTitle = 'TRƯỜNG THCS HUỲNH THÚC KHÁNG – TỔ NGỮ VĂN & GDCD',
  subTitle = 'HỆ SINH THÁI AI NGỮ VĂN – GDCD | ĐỌC SÂU – VIẾT THẬT – SỐNG ĐẸP',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ mouseX: 0, mouseY: 0, nodeX: 0, nodeY: 0 });

  // Map of node by ID
  const nodeMap = new Map<string, MindMapNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Determine hidden nodes based on collapsed state of ancestors
  const collapsedParentIds = new Set<string>();
  nodes.forEach((n) => {
    if (n.collapsed) collapsedParentIds.add(n.id);
  });

  const isNodeHidden = (node: MindMapNode): boolean => {
    let curr = node;
    while (curr.parentId) {
      if (collapsedParentIds.has(curr.parentId)) {
        return true;
      }
      const p = nodeMap.get(curr.parentId);
      if (!p) break;
      curr = p;
    }
    return false;
  };

  const visibleNodes = nodes.filter((n) => !isNodeHidden(n));
  const visibleNodeMap = new Map<string, MindMapNode>();
  visibleNodes.forEach((n) => visibleNodeMap.set(n.id, n));

  // Handle pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.mindmap-node-card')) {
      return; // Handled by node drag
    }
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      onPanChange({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    } else if (draggingNodeId) {
      const dx = (e.clientX - dragStartPos.mouseX) / zoom;
      const dy = (e.clientY - dragStartPos.mouseY) / zoom;
      onUpdateNodePosition(
        draggingNodeId,
        Math.round(dragStartPos.nodeX + dx),
        Math.round(dragStartPos.nodeY + dy)
      );
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  // Node drag start
  const handleNodeDragStart = (e: React.MouseEvent, node: MindMapNode) => {
    e.stopPropagation();
    onSelectNode(node.id);
    setDraggingNodeId(node.id);
    setDragStartPos({
      mouseX: e.clientX,
      mouseY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    });
  };

  // Icon renderer helper
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'book-open': return <BookOpen className="w-4 h-4 text-white" />;
      case 'user': return <User className="w-4 h-4 text-white" />;
      case 'heart': return <Heart className="w-4 h-4 text-white" />;
      case 'scale': return <Scale className="w-4 h-4 text-white" />;
      case 'lightbulb': return <Lightbulb className="w-4 h-4 text-white" />;
      case 'award': return <Award className="w-4 h-4 text-white" />;
      default: return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  // Render cubic bezier connector lines
  const renderConnections = () => {
    return visibleNodes.map((node) => {
      if (!node.parentId) return null;
      const parent = visibleNodeMap.get(node.parentId);
      if (!parent) return null;

      // Start from parent center, end at node center
      const startX = parent.x;
      const startY = parent.y;
      const endX = node.x;
      const endY = node.y;

      // Smooth horizontal or vertical control points
      const dx = endX - startX;
      const dy = endY - startY;
      const cx1 = startX + dx * 0.45;
      const cy1 = startY + dy * 0.1;
      const cx2 = startX + dx * 0.55;
      const cy2 = endY - dy * 0.1;

      const pathData = `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
      const strokeColor = node.color || parent.color || '#0F9D92';
      const strokeWidth = node.level === 1 ? 3.5 : 2;

      return (
        <path
          key={`conn-${node.id}`}
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeOpacity={0.85}
          className="transition-all duration-200"
        />
      );
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full min-h-[580px] bg-[#F8FAFC] overflow-hidden select-none cursor-grab active:cursor-grabbing border border-slate-200 rounded-xl shadow-inner"
      style={{
        backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Master Canvas Root for Export */}
      <div
        ref={canvasRef as any}
        id="mindmap-export-target"
        className="absolute inset-0 origin-center transition-transform duration-75"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '100%',
          height: '100%',
          transformOrigin: '0 0',
        }}
      >
        {/* SVG layer for connecting curves */}
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>
          {renderConnections()}
        </svg>

        {/* School Banner Header in Canvas (Great for Export) */}
        {showWatermark && (
          <div
            className="absolute left-1/2 -top-[340px] -translate-x-1/2 text-center pointer-events-none select-none px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm min-w-[480px]"
            style={{ transform: 'translateX(-50%)' }}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-[#0F9D92]">
              {schoolTitle}
            </div>
            <div className="text-sm font-semibold text-[#102A43] mt-0.5">
              {subTitle}
            </div>
          </div>
        )}

        {/* HTML Interactive Nodes Layer */}
        {visibleNodes.map((node) => {
          const isSelected = node.id === selectedNodeId;
          const isCentral = node.level === 0;
          const isMainBranch = node.level === 1;
          const hasChildren = nodes.some((n) => n.parentId === node.id);

          return (
            <div
              key={node.id}
              className={`mindmap-node-card absolute cursor-pointer transition-shadow ${
                isSelected ? 'ring-4 ring-offset-2 ring-[#0F9D92] z-30' : 'z-20 hover:z-25'
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                onEditNode(node);
              }}
              onMouseDown={(e) => handleNodeDragStart(e, node)}
            >
              {isCentral ? (
                // CENTRAL ROOT NODE
                <div
                  className="px-6 py-4 rounded-2xl shadow-xl text-white font-bold flex flex-col items-center justify-center text-center border-2 border-white/40 min-w-[210px] max-w-[280px]"
                  style={{
                    backgroundColor: node.color || '#102A43',
                    background: `linear-gradient(135deg, ${node.color || '#102A43'}, #1E3A8A)`,
                  }}
                >
                  <div className="p-2 rounded-full bg-white/20 mb-1.5 shadow-sm">
                    {renderIcon(node.icon)}
                  </div>
                  <div className="text-base leading-tight font-extrabold whitespace-pre-line tracking-wide">
                    {node.label}
                  </div>
                  {node.description && (
                    <div className="text-xs text-white/80 font-normal mt-1 border-t border-white/20 pt-1 line-clamp-2">
                      {node.description}
                    </div>
                  )}
                  {/* Floating Action Controls on Select */}
                  {isSelected && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white p-1 rounded-full shadow-lg border border-slate-200 text-slate-700">
                      <button
                        title="Thêm nhánh chính"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSubbranch(node.id);
                        }}
                        className="p-1 hover:bg-emerald-50 text-emerald-600 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        title="Chỉnh sửa nội dung"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditNode(node);
                        }}
                        className="p-1 hover:bg-blue-50 text-blue-600 rounded-full"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : isMainBranch ? (
                // LEVEL 1 MAIN BRANCH NODE
                <div
                  className="px-4 py-2.5 rounded-xl shadow-md text-white font-semibold flex items-center gap-2 border border-white/30 min-w-[170px] max-w-[240px]"
                  style={{
                    backgroundColor: node.color || '#0F9D92',
                    boxShadow: isSelected ? '0 8px 20px rgba(0,0,0,0.15)' : '0 4px 10px rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="p-1.5 rounded-lg bg-black/15 shrink-0">
                    {renderIcon(node.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold leading-snug truncate">
                      {node.label}
                    </div>
                    {node.description && (
                      <div className="text-[11px] text-white/90 truncate font-normal">
                        {node.description}
                      </div>
                    )}
                  </div>

                  {/* Collapse toggle if has subbranches */}
                  {hasChildren && (
                    <button
                      title={node.collapsed ? 'Mở rộng nhánh' : 'Thu gọn nhánh'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse(node.id);
                      }}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white shrink-0"
                    >
                      {node.collapsed ? (
                        <ChevronRight className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  {/* Actions on select */}
                  {isSelected && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white p-1 rounded-full shadow-md border border-slate-200 text-slate-700">
                      <button
                        title="Thêm nhánh con"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSubbranch(node.id);
                        }}
                        className="p-1 hover:bg-emerald-50 text-emerald-600 rounded-full"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Sửa tên nhánh"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditNode(node);
                        }}
                        className="p-1 hover:bg-blue-50 text-blue-600 rounded-full"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Xóa nhánh"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNode(node.id);
                        }}
                        className="p-1 hover:bg-rose-50 text-rose-600 rounded-full"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // SUBBRANCH / LEAF NODE
                <div
                  className="px-3.5 py-2 rounded-lg shadow-sm bg-white border font-medium flex items-center gap-2 min-w-[150px] max-w-[210px] text-slate-800 hover:shadow-md"
                  style={{
                    borderLeftWidth: '5px',
                    borderLeftColor: node.color || '#0F9D92',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold leading-tight text-slate-900 line-clamp-2">
                      {node.label}
                    </div>
                    {node.description && (
                      <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                        {node.description}
                      </div>
                    )}
                  </div>

                  {hasChildren && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse(node.id);
                      }}
                      className="p-0.5 rounded text-slate-400 hover:text-slate-700 shrink-0"
                    >
                      {node.collapsed ? (
                        <ChevronRight className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  )}

                  {/* Actions on select */}
                  {isSelected && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white p-0.5 rounded-full shadow border border-slate-200 text-slate-700">
                      <button
                        title="Thêm chi tiết"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSubbranch(node.id);
                        }}
                        className="p-1 hover:bg-emerald-50 text-emerald-600 rounded-full"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        title="Sửa"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditNode(node);
                        }}
                        className="p-1 hover:bg-blue-50 text-blue-600 rounded-full"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        title="Xóa"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNode(node.id);
                        }}
                        className="p-1 hover:bg-rose-50 text-rose-600 rounded-full"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Instructions */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 shadow-sm flex items-center gap-2 pointer-events-none">
        <Move className="w-3.5 h-3.5 text-[#0F9D92]" />
        <span>Kéo nền để di chuyển | Kéo nút để định vị | Nhấn đúp để sửa chữ</span>
      </div>
    </div>
  );
};
