import React, { useState, useEffect, useRef } from 'react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { MindMapNode, MindMapLayout } from '../../types';
import { getMindMapBoundingBox, sanitizeFileName } from '../../utils/mindmapLayout';
import { 
  Download, Eye, Check, X, Image as ImageIcon, Loader2, 
  Sparkles, Sliders, ShieldCheck, FileText, CheckCircle2 
} from 'lucide-react';
import { 
  BookOpen, User, Heart, Scale, Lightbulb, Award 
} from 'lucide-react';

interface MindMapExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  nodes: MindMapNode[];
  layout: MindMapLayout;
}

export const MindMapExportModal: React.FC<MindMapExportModalProps> = ({
  isOpen,
  onClose,
  title,
  nodes,
  layout,
}) => {
  const [format, setFormat] = useState<'png' | 'jpg' | 'svg'>('png');
  const [aspectRatio, setAspectRatio] = useState<'auto' | '16:9' | 'a4_landscape'>('auto');
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(2); // 2x HD, 3x UHD
  const [includeHeader, setIncludeHeader] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const exportElementRef = useRef<HTMLDivElement>(null);

  // Compute bounding box of all nodes
  const bounds = getMindMapBoundingBox(nodes);

  // Determine export canvas dimension based on chosen aspect ratio
  let exportWidth = bounds.width;
  let exportHeight = bounds.height;

  if (aspectRatio === '16:9') {
    const targetRatio = 16 / 9;
    const currentRatio = exportWidth / exportHeight;
    if (currentRatio < targetRatio) {
      exportWidth = exportHeight * targetRatio;
    } else {
      exportHeight = exportWidth / targetRatio;
    }
  } else if (aspectRatio === 'a4_landscape') {
    const targetRatio = 297 / 210; // ~1.414
    const currentRatio = exportWidth / exportHeight;
    if (currentRatio < targetRatio) {
      exportWidth = exportHeight * targetRatio;
    } else {
      exportHeight = exportWidth / targetRatio;
    }
  }

  // Ensure reasonable minimum export dimensions
  exportWidth = Math.max(1200, Math.round(exportWidth));
  exportHeight = Math.max(800, Math.round(exportHeight));

  const centerOffsetX = exportWidth / 2 - bounds.centerX;
  const centerOffsetY = exportHeight / 2 - bounds.centerY;

  // Icon render
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

  // Generate preview when modal opens or settings change
  const generateExportImage = async (): Promise<string | null> => {
    if (!exportElementRef.current) return null;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      // Ensure fonts are completely loaded before capturing
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Small delay to ensure DOM render tree stabilization
      await new Promise((r) => setTimeout(r, 150));

      const options = {
        pixelRatio: scaleMultiplier,
        quality: 0.98,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
      };

      let dataUrl = '';
      if (format === 'png') {
        dataUrl = await toPng(exportElementRef.current, options);
      } else if (format === 'jpg') {
        dataUrl = await toJpeg(exportElementRef.current, options);
      } else {
        dataUrl = await toSvg(exportElementRef.current, options);
      }

      setPreviewUrl(dataUrl);
      setIsGenerating(false);
      return dataUrl;
    } catch (err: any) {
      console.error('Lỗi khi xuất ảnh sơ đồ:', err);
      setErrorMessage(err.message || 'Không thể xuất ảnh sơ đồ tư duy');
      setIsGenerating(false);
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDownloadSuccess(false);
      generateExportImage();
    } else {
      setPreviewUrl(null);
    }
  }, [isOpen, format, aspectRatio, scaleMultiplier, includeHeader]);

  const handleDownload = async () => {
    let url = previewUrl;
    if (!url) {
      url = await generateExportImage();
    }
    if (!url) return;

    const baseName = sanitizeFileName(title);
    const fileName = `${baseName}_${format === 'jpg' ? 'hd.jpg' : format === 'svg' ? 'vector.svg' : 'chuan_hd.png'}`;

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#102A43] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0F9D92] rounded-lg">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">XUẤT ẢNH SƠ ĐỒ TƯ DUY AI</h3>
              <p className="text-xs text-white/80">
                Ảnh độ nét cao (HD/4K), đầy đủ nhánh và lề an toàn, chuẩn phông tiếng Việt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Options Column */}
          <div className="space-y-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Định dạng tệp
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['png', 'jpg', 'svg'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`py-2 text-xs font-bold uppercase rounded-lg border transition ${
                      format === fmt
                        ? 'bg-[#0F9D92] text-white border-[#0F9D92] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                2. Khung hình (Tỉ lệ)
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'auto', label: 'Tự động (Vừa vặn toàn bộ nhánh)' },
                  { id: '16:9', label: 'Tỉ lệ 16:9 (Thuyết trình & Màn hình)' },
                  { id: 'a4_landscape', label: 'Khổ A4 Ngang (In ấn giáo án)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAspectRatio(item.id as any)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition ${
                      aspectRatio === item.id
                        ? 'bg-[#102A43] text-white border-[#102A43] font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                3. Độ phân giải
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setScaleMultiplier(2)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition ${
                    scaleMultiplier === 2
                      ? 'bg-[#0F9D92] text-white border-[#0F9D92]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2x HD (Sắc nét)
                </button>
                <button
                  onClick={() => setScaleMultiplier(3)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition ${
                    scaleMultiplier === 3
                      ? 'bg-[#0F9D92] text-white border-[#0F9D92]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3x 4K UHD (In ấn)
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 pt-2 border-t border-slate-200">
                <input
                  type="checkbox"
                  checked={includeHeader}
                  onChange={(e) => setIncludeHeader(e.target.checked)}
                  className="rounded text-[#0F9D92] focus:ring-[#0F9D92]"
                />
                <span>Đính kèm tiêu đề Trường & Tổ Ngữ văn – GDCD</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={generateExportImage}
                disabled={isGenerating}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                {isGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-[#0F9D92]" />
                )}
                Tạo lại xem trước
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#0F9D92]" />
                Xem trước ảnh thực tế ({exportWidth} × {exportHeight}px)
              </span>
              <span className="text-[11px] text-slate-500">
                Bao gồm {nodes.length} nút & toàn bộ đường nối
              </span>
            </div>

            <div className="flex-1 min-h-[340px] bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Loader2 className="w-8 h-8 text-[#0F9D92] animate-spin" />
                  <span className="text-xs font-medium">Đang tính toán toàn bộ vùng sơ đồ & kết xuất ảnh...</span>
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Mindmap Preview"
                  className="max-h-full max-w-full object-contain rounded shadow bg-white border border-slate-200"
                />
              ) : errorMessage ? (
                <div className="text-rose-600 text-xs text-center p-4">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Hidden Complete Render Element for html-to-image capture */}
        <div style={{ position: 'fixed', left: '-99999px', top: '-99999px' }}>
          <div
            ref={exportElementRef}
            id="mindmap-print-canvas"
            style={{
              width: `${exportWidth}px`,
              height: `${exportHeight}px`,
              backgroundColor: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            {/* Header Watermark */}
            {includeHeader && (
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '30px',
                  right: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #0F9D92',
                  paddingBottom: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F9D92', letterSpacing: '1px' }}>
                    TRƯỜNG THCS HUỲNH THÚC KHÁNG – TỔ NGỮ VĂN & GDCD
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#102A43', marginTop: '2px' }}>
                    {title}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#102A43' }}>
                    HỆ SINH THÁI AI NGỮ VĂN – GDCD
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>
                    Đọc sâu – Viết thật – Nói hay – Sống đẹp
                  </div>
                </div>
              </div>
            )}

            {/* SVG Connecting Curves */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              {nodes.map((node) => {
                if (!node.parentId) return null;
                const parent = nodes.find((n) => n.id === node.parentId);
                if (!parent) return null;

                const sx = parent.x + centerOffsetX;
                const sy = parent.y + centerOffsetY;
                const ex = node.x + centerOffsetX;
                const ey = node.y + centerOffsetY;

                const dx = ex - sx;
                const dy = ey - sy;
                const cx1 = sx + dx * 0.45;
                const cy1 = sy + dy * 0.1;
                const cx2 = sx + dx * 0.55;
                const cy2 = ey - dy * 0.1;

                const pathData = `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${ey}`;
                const strokeColor = node.color || parent.color || '#0F9D92';
                const strokeWidth = node.level === 1 ? 3.5 : 2;

                return (
                  <path
                    key={`export-conn-${node.id}`}
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeOpacity={0.9}
                  />
                );
              })}
            </svg>

            {/* Nodes Render */}
            {nodes.map((node) => {
              const nx = node.x + centerOffsetX;
              const ny = node.y + centerOffsetY;
              const isCentral = node.level === 0;
              const isMain = node.level === 1;

              return (
                <div
                  key={`export-node-${node.id}`}
                  style={{
                    position: 'absolute',
                    left: `${nx}px`,
                    top: `${ny}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {isCentral ? (
                    <div
                      style={{
                        padding: '16px 24px',
                        borderRadius: '16px',
                        backgroundColor: node.color || '#102A43',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        textAlign: 'center',
                        minWidth: '220px',
                        maxWidth: '300px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        border: '2px solid rgba(255,255,255,0.4)',
                      }}
                    >
                      <div style={{ fontSize: '16px', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                        {node.label}
                      </div>
                      {node.description && (
                        <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '6px', fontWeight: 400 }}>
                          {node.description}
                        </div>
                      )}
                    </div>
                  ) : isMain ? (
                    <div
                      style={{
                        padding: '10px 16px',
                        borderRadius: '12px',
                        backgroundColor: node.color || '#0F9D92',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        minWidth: '180px',
                        maxWidth: '240px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div style={{ fontSize: '13px', lineHeight: 1.3 }}>{node.label}</div>
                      {node.description && (
                        <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '2px', fontWeight: 400 }}>
                          {node.description}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        borderLeft: `5px solid ${node.color || '#0F9D92'}`,
                        borderTop: '1px solid #E2E8F0',
                        borderRight: '1px solid #E2E8F0',
                        borderBottom: '1px solid #E2E8F0',
                        minWidth: '150px',
                        maxWidth: '220px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                        {node.label}
                      </div>
                      {node.description && (
                        <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                          {node.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {downloadSuccess && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đã tải xuống thành công tệp ảnh vào máy tính!
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition"
            >
              Đóng
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0F9D92] hover:bg-[#0D877E] active:scale-95 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              TẢI XUẤT ẢNH {format.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
