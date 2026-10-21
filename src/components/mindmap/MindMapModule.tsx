import React, { useState, useRef, useEffect } from 'react';
import { MindMapData, MindMapNode, MindMapLayout } from '../../types';
import { SAMPLE_MINDMAPS } from '../../data/sampleData';
import { calculateLayout } from '../../utils/mindmapLayout';
import { MindMapCanvas } from './MindMapCanvas';
import { MindMapToolbar } from './MindMapToolbar';
import { MindMapExportModal } from './MindMapExportModal';
import { MindMapNodeEditModal } from './MindMapNodeEditModal';
import { MindMapAIGenerateModal } from './MindMapAIGenerateModal';
import {
  Download,
  Sparkles,
  Save,
  FolderOpen,
  Copy,
  PlusCircle,
  FileText,
  RotateCcw,
  Check,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

interface MindMapModuleProps {
  initialTopic?: string;
  onIncrementProgress?: () => void;
}

export const MindMapModule: React.FC<MindMapModuleProps> = ({
  initialTopic,
  onIncrementProgress,
}) => {
  // Current active mind map
  const [currentMap, setCurrentMap] = useState<MindMapData>(() => {
    // Default to the first template (Dế Mèn - 6 branches, 3+ subbranches each)
    const deMenTemplate = SAMPLE_MINDMAPS[0];
    return {
      ...deMenTemplate,
      nodes: calculateLayout(deMenTemplate.nodes, deMenTemplate.layout),
    };
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<MindMapNode[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Canvas view state
  const [zoom, setZoom] = useState<number>(0.9);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 500, y: 340 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isAllCollapsed, setIsAllCollapsed] = useState<boolean>(false);

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isAIGenerateOpen, setIsAIGenerateOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingNode, setEditingNode] = useState<MindMapNode | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Saved maps in localStorage
  const [savedMaps, setSavedMaps] = useState<MindMapData[]>(() => {
    try {
      const stored = localStorage.getItem('htk_saved_mindmaps');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return SAMPLE_MINDMAPS;
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper to push history state
  const pushHistory = (newNodes: MindMapNode[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(currentMap.nodes);
    if (nextHistory.length > 25) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const prevNodes = history[historyIndex];
      setHistoryIndex(historyIndex - 1);
      setCurrentMap((prev) => ({ ...prev, nodes: prevNodes }));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextNodes = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentMap((prev) => ({ ...prev, nodes: nextNodes }));
    }
  };

  // Switch Layout
  const handleLayoutChange = (newLayout: MindMapLayout) => {
    pushHistory(currentMap.nodes);
    const updatedNodes = calculateLayout(currentMap.nodes, newLayout);
    setCurrentMap((prev) => ({
      ...prev,
      layout: newLayout,
      nodes: updatedNodes,
    }));
  };

  // Node position update via drag
  const handleUpdateNodePosition = (id: string, x: number, y: number) => {
    setCurrentMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)),
    }));
  };

  // Add a main branch
  const handleAddMainBranch = () => {
    pushHistory(currentMap.nodes);
    const root = currentMap.nodes.find((n) => n.parentId === null) || currentMap.nodes[0];
    const newId = `branch-${Date.now()}`;
    const mainBranches = currentMap.nodes.filter((n) => n.parentId === root.id);
    const nextIndex = mainBranches.length + 1;

    const colors = ['#0F9D92', '#E6B450', '#2563EB', '#E11D48', '#8B5CF6', '#10B981'];
    const chosenColor = colors[nextIndex % colors.length];

    const newBranch: MindMapNode = {
      id: newId,
      parentId: root.id,
      label: `Nhánh chính ${nextIndex}`,
      description: 'Nhấn đúp để chỉnh sửa luận điểm',
      color: chosenColor,
      icon: 'sparkles',
      x: 250,
      y: 0,
      level: 1,
    };

    const newNodes = [...currentMap.nodes, newBranch];
    const arrangedNodes = calculateLayout(newNodes, currentMap.layout);
    setCurrentMap((prev) => ({ ...prev, nodes: arrangedNodes }));
    setSelectedNodeId(newId);
  };

  // Add a subbranch to current selected node
  const handleAddSubbranch = (parentId?: string) => {
    const targetParentId = parentId || selectedNodeId;
    if (!targetParentId) return;

    const parentNode = currentMap.nodes.find((n) => n.id === targetParentId);
    if (!parentNode) return;

    pushHistory(currentMap.nodes);
    const newId = `sub-${Date.now()}`;
    const existingSubs = currentMap.nodes.filter((n) => n.parentId === targetParentId);
    const nextIndex = existingSubs.length + 1;

    const newSub: MindMapNode = {
      id: newId,
      parentId: targetParentId,
      label: `Ý con ${nextIndex}`,
      description: 'Dẫn chứng hoặc chi tiết cụ thể',
      color: parentNode.color || '#0F9D92',
      x: parentNode.x + 160,
      y: parentNode.y + (nextIndex - 1) * 60,
      level: parentNode.level + 1,
    };

    const newNodes = [...currentMap.nodes, newSub];
    const arrangedNodes = calculateLayout(newNodes, currentMap.layout);
    setCurrentMap((prev) => ({ ...prev, nodes: arrangedNodes }));
    setSelectedNodeId(newId);
  };

  // Delete node and its children
  const handleDeleteNode = (id: string) => {
    const nodeToDelete = currentMap.nodes.find((n) => n.id === id);
    if (!nodeToDelete || nodeToDelete.level === 0) return; // Cannot delete root

    pushHistory(currentMap.nodes);

    // Recursively collect all descendant IDs
    const toDeleteIds = new Set<string>([id]);
    let hasMore = true;
    while (hasMore) {
      hasMore = false;
      currentMap.nodes.forEach((n) => {
        if (n.parentId && toDeleteIds.has(n.parentId) && !toDeleteIds.has(n.id)) {
          toDeleteIds.add(n.id);
          hasMore = true;
        }
      });
    }

    const filteredNodes = currentMap.nodes.filter((n) => !toDeleteIds.has(n.id));
    const arrangedNodes = calculateLayout(filteredNodes, currentMap.layout);
    setCurrentMap((prev) => ({ ...prev, nodes: arrangedNodes }));
    setSelectedNodeId(null);
  };

  // Edit node modal trigger
  const handleOpenEditModal = (node: MindMapNode) => {
    setEditingNode(node);
    setIsEditModalOpen(true);
  };

  // Save node updates
  const handleSaveNodeUpdates = (nodeId: string, updates: Partial<MindMapNode>) => {
    pushHistory(currentMap.nodes);
    setCurrentMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)),
    }));
  };

  // Change color of selected branch (and optionally its subbranches)
  const handleChangeColor = (newColor: string) => {
    if (!selectedNodeId) return;
    pushHistory(currentMap.nodes);

    const target = currentMap.nodes.find((n) => n.id === selectedNodeId);
    if (!target) return;

    // Find all children if it's a main branch
    const childrenIds = new Set<string>();
    currentMap.nodes.forEach((n) => {
      if (n.parentId === selectedNodeId) childrenIds.add(n.id);
    });

    setCurrentMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => {
        if (n.id === selectedNodeId) return { ...n, color: newColor };
        if (childrenIds.has(n.id)) return { ...n, color: newColor };
        return n;
      }),
    }));
  };

  // Toggle collapse
  const handleToggleCollapse = (nodeId: string) => {
    setCurrentMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId ? { ...n, collapsed: !n.collapsed } : n
      ),
    }));
  };

  // Toggle collapse all
  const handleToggleCollapseAll = () => {
    const nextState = !isAllCollapsed;
    setIsAllCollapsed(nextState);
    setCurrentMap((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.level === 1 ? { ...n, collapsed: nextState } : n)),
    }));
  };

  // Auto arrange
  const handleAutoArrange = () => {
    pushHistory(currentMap.nodes);
    const arrangedNodes = calculateLayout(currentMap.nodes, currentMap.layout);
    setCurrentMap((prev) => ({ ...prev, nodes: arrangedNodes }));
  };

  // Reset zoom & pan to center
  const handleCenterView = () => {
    setZoom(0.85);
    setPan({ x: 500, y: 340 });
  };

  // Select a pre-built template
  const handleSelectTemplate = (templateId: string) => {
    const tpl = SAMPLE_MINDMAPS.find((m) => m.id === templateId);
    if (!tpl) return;
    pushHistory(currentMap.nodes);
    const arrangedNodes = calculateLayout(tpl.nodes, tpl.layout);
    setCurrentMap({ ...tpl, nodes: arrangedNodes });
    handleCenterView();
  };

  // Save current map to LocalStorage
  const handleSaveToStorage = () => {
    const updatedMap: MindMapData = {
      ...currentMap,
      updatedAt: new Date().toISOString(),
      isCustom: true,
    };

    const existingIndex = savedMaps.findIndex((m) => m.id === currentMap.id);
    let newSaved: MindMapData[];
    if (existingIndex >= 0) {
      newSaved = [...savedMaps];
      newSaved[existingIndex] = updatedMap;
    } else {
      newSaved = [updatedMap, ...savedMaps];
    }

    setSavedMaps(newSaved);
    try {
      localStorage.setItem('htk_saved_mindmaps', JSON.stringify(newSaved));
    } catch (e) {
      console.error(e);
    }

    setSaveNotification('Đã lưu sơ đồ tư duy thành công!');
    setTimeout(() => setSaveNotification(null), 3000);
    if (onIncrementProgress) onIncrementProgress();
  };

  // Duplicate current map
  const handleDuplicate = () => {
    const duplicateMap: MindMapData = {
      ...currentMap,
      id: `map-copy-${Date.now()}`,
      title: `${currentMap.title} (Bản sao)`,
      updatedAt: new Date().toISOString(),
    };
    setCurrentMap(duplicateMap);
    setSaveNotification('Đã tạo bản sao mới của sơ đồ!');
    setTimeout(() => setSaveNotification(null), 3000);
  };

  // Handle AI Mind Map Generation
  const handleGenerateWithAI = async (topic: string, grade: number, detailLevel: string) => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/gemini/generate-mindmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, grade, detailLevel }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        const aiData = resData.data;

        // Build MindMapNode array
        const rootId = `node-root-${Date.now()}`;
        const newNodes: MindMapNode[] = [
          {
            id: rootId,
            parentId: null,
            label: aiData.centralNode?.label || topic,
            description: aiData.centralNode?.description || `Chủ đề Lớp ${grade} - GDPT 2018`,
            color: aiData.centralNode?.color || '#102A43',
            icon: aiData.centralNode?.icon || 'book-open',
            x: 0,
            y: 0,
            level: 0,
          },
        ];

        if (Array.isArray(aiData.branches)) {
          aiData.branches.forEach((b: any, bIdx: number) => {
            const bId = `branch-${bIdx + 1}-${Date.now()}`;
            newNodes.push({
              id: bId,
              parentId: rootId,
              label: b.label || `Nhánh ${bIdx + 1}`,
              description: b.description || '',
              color: b.color || '#0F9D92',
              icon: b.icon || 'sparkles',
              x: 0,
              y: 0,
              level: 1,
            });

            if (Array.isArray(b.subbranches)) {
              b.subbranches.forEach((s: any, sIdx: number) => {
                newNodes.push({
                  id: `sub-${bIdx + 1}-${sIdx + 1}-${Date.now()}`,
                  parentId: bId,
                  label: s.label || `Ý ${sIdx + 1}`,
                  description: s.description || '',
                  color: s.color || b.color || '#0F9D92',
                  x: 0,
                  y: 0,
                  level: 2,
                });
              });
            }
          });
        }

        const arranged = calculateLayout(newNodes, currentMap.layout);
        setCurrentMap({
          id: `ai-map-${Date.now()}`,
          title: aiData.title || topic,
          grade: grade,
          layout: currentMap.layout,
          nodes: arranged,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isCustom: true,
        });

        setIsAIGenerateOpen(false);
        handleCenterView();
        setSaveNotification('Gemini AI đã tạo sơ đồ tư duy thành công!');
        setTimeout(() => setSaveNotification(null), 3500);
        if (onIncrementProgress) onIncrementProgress();
      } else {
        throw new Error(resData.error || 'Không nhận được dữ liệu hợp lệ');
      }
    } catch (err: any) {
      console.warn('Lỗi kết nối Gemini API, sử dụng dữ liệu sư phạm mẫu:', err);
      // Fallback: Smartly load relevant template or generate mock structured tree
      const matched = SAMPLE_MINDMAPS.find((m) =>
        topic.toLowerCase().includes('dế mèn') ? m.id === 'mindmap-de-men' :
        topic.toLowerCase().includes('đồng chí') ? m.id === 'mindmap-dong-chi' :
        topic.toLowerCase().includes('tu từ') ? m.id === 'mindmap-rhetoric' : null
      );

      if (matched) {
        handleSelectTemplate(matched.id);
        setIsAIGenerateOpen(false);
        setSaveNotification('Đã tải cấu trúc sơ đồ mẫu tương ứng theo chuẩn GDPT 2018 (Demo)!');
      } else {
        // Generate dynamic custom mind map
        const rootId = `root-${Date.now()}`;
        const fallbackNodes: MindMapNode[] = [
          {
            id: rootId,
            parentId: null,
            label: topic.toUpperCase(),
            description: `Kiến thức trọng tâm Lớp ${grade} - THCS Huỳnh Thúc Kháng`,
            color: '#102A43',
            icon: 'book-open',
            x: 0,
            y: 0,
            level: 0,
          },
          // 4 main branches
          {
            id: `b1-${Date.now()}`,
            parentId: rootId,
            label: '1. Khái quát & Hoàn cảnh',
            description: 'Tác giả, tác phẩm, xuất xứ văn bản',
            color: '#0F9D92',
            icon: 'user',
            x: 0,
            y: 0,
            level: 1,
          },
          {
            id: `b1-1-${Date.now()}`,
            parentId: `b1-${Date.now()}`,
            label: 'Đặc điểm phong cách',
            description: 'Ngôn từ giản dị, sâu sắc',
            color: '#0F9D92',
            x: 0,
            y: 0,
            level: 2,
          },
          {
            id: `b2-${Date.now()}`,
            parentId: rootId,
            label: '2. Luận điểm trọng tâm',
            description: 'Các tầng nghĩa và chi tiết nghệ thuật',
            color: '#E6B450',
            icon: 'lightbulb',
            x: 0,
            y: 0,
            level: 1,
          },
          {
            id: `b2-1-${Date.now()}`,
            parentId: `b2-${Date.now()}`,
            label: 'Dẫn chứng đắt giá',
            description: 'Hình ảnh biểu cảm giàu cảm xúc',
            color: '#E6B450',
            x: 0,
            y: 0,
            level: 2,
          },
          {
            id: `b3-${Date.now()}`,
            parentId: rootId,
            label: '3. Đặc sắc nghệ thuật',
            description: 'Biện pháp tu từ, kết cấu câu chuyện',
            color: '#2563EB',
            icon: 'sparkles',
            x: 0,
            y: 0,
            level: 1,
          },
          {
            id: `b4-${Date.now()}`,
            parentId: rootId,
            label: '4. Bài học & Giá trị sống',
            description: 'Thông điệp nhân văn cho thế hệ trẻ',
            color: '#10B981',
            icon: 'award',
            x: 0,
            y: 0,
            level: 1,
          },
        ];

        const arranged = calculateLayout(fallbackNodes, currentMap.layout);
        setCurrentMap({
          id: `custom-map-${Date.now()}`,
          title: topic,
          grade: grade,
          layout: currentMap.layout,
          nodes: arranged,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isCustom: true,
        });
        setIsAIGenerateOpen(false);
        setSaveNotification('Đã tạo sơ đồ tư duy có cấu trúc hoàn chỉnh (DEMO)!');
      }
      setTimeout(() => setSaveNotification(null), 3500);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const selectedNode = currentMap.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#102A43] to-[#0F9D92] text-white rounded-xl shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-[#102A43]">
                {currentMap.title}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                Lớp {currentMap.grade}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {currentMap.nodes.length} nút
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Kéo thả, chỉnh sửa trực tiếp, chuyển đổi 4 bố cục & xuất ảnh PNG chuẩn in ấn
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Template Selector */}
          <div className="relative">
            <select
              value={SAMPLE_MINDMAPS.some((m) => m.id === currentMap.id) ? currentMap.id : ''}
              onChange={(e) => {
                if (e.target.value) handleSelectTemplate(e.target.value);
              }}
              className="text-xs font-semibold py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl outline-none cursor-pointer"
            >
              <option value="" disabled>-- Chọn mẫu có sẵn (6 mẫu chuẩn) --</option>
              {SAMPLE_MINDMAPS.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  Mẫu: {tpl.title} (Lớp {tpl.grade})
                </option>
              ))}
            </select>
          </div>

          {/* AI Generation Button */}
          <button
            onClick={() => setIsAIGenerateOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0F9D92] to-[#102A43] hover:from-[#0D877E] hover:to-[#0A1A2A] rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#E6B450]" />
            TẠO SƠ ĐỒ BẰNG AI
          </button>

          {/* Save / Duplicate / Export */}
          <button
            onClick={handleSaveToStorage}
            title="Lưu vào bộ nhớ máy"
            className="p-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition flex items-center gap-1"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Lưu</span>
          </button>

          <button
            onClick={handleDuplicate}
            title="Nhân bản sơ đồ"
            className="p-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition flex items-center gap-1"
          >
            <Copy className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Bản sao</span>
          </button>

          {/* EXPORT PNG BUTTON (HIGHLIGHT) */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 text-xs font-extrabold text-white bg-[#E6B450] hover:bg-[#D9A33E] text-slate-900 rounded-xl shadow-md transition flex items-center gap-2 border border-amber-400 active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-900" />
            XUẤT ẢNH PNG / JPG
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveNotification && (
        <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Interactive Toolbar */}
      <MindMapToolbar
        layout={currentMap.layout}
        onLayoutChange={handleLayoutChange}
        zoom={zoom}
        onZoomIn={() => setZoom((z) => Math.min(2.0, z + 0.1))}
        onZoomOut={() => setZoom((z) => Math.max(0.4, z - 0.1))}
        onResetZoom={() => setZoom(1.0)}
        onCenterView={handleCenterView}
        canUndo={historyIndex >= 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        selectedNode={selectedNode}
        onAddBranch={handleAddMainBranch}
        onAddSubbranch={() => handleAddSubbranch()}
        onDeleteSelected={() => selectedNode && handleDeleteNode(selectedNode.id)}
        onEditSelected={() => selectedNode && handleOpenEditModal(selectedNode)}
        onChangeColor={handleChangeColor}
        onChangeIcon={(icon) => {
          if (selectedNode) handleSaveNodeUpdates(selectedNode.id, { icon });
        }}
        onAutoArrange={handleAutoArrange}
        onToggleCollapseAll={handleToggleCollapseAll}
        isAllCollapsed={isAllCollapsed}
      />

      {/* Canvas Area */}
      <div className="flex-1 min-h-[580px] relative">
        <MindMapCanvas
          nodes={currentMap.nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={(id) => setSelectedNodeId(id)}
          onUpdateNodePosition={handleUpdateNodePosition}
          onEditNode={handleOpenEditModal}
          onAddSubbranch={(parentId) => handleAddSubbranch(parentId)}
          onDeleteNode={handleDeleteNode}
          onToggleCollapse={handleToggleCollapse}
          zoom={zoom}
          pan={pan}
          onPanChange={setPan}
          canvasRef={canvasRef}
        />
      </div>

      {/* Export Modal */}
      <MindMapExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title={currentMap.title}
        nodes={currentMap.nodes}
        layout={currentMap.layout}
      />

      {/* Node Edit Modal */}
      <MindMapNodeEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        node={editingNode}
        onSave={handleSaveNodeUpdates}
      />

      {/* AI Generate Modal */}
      <MindMapAIGenerateModal
        isOpen={isAIGenerateOpen}
        onClose={() => setIsAIGenerateOpen(false)}
        onGenerate={handleGenerateWithAI}
        isLoading={isLoadingAI}
      />
    </div>
  );
};
