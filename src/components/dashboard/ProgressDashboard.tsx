import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { LearningProgress } from '../../types';
import {
  BarChart3,
  Award,
  BookOpen,
  PenTool,
  Scale,
  Mic,
  Heart,
  GitBranch,
  Download,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: LearningProgress;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
}) => {
  const [viewRole, setViewRole] = useState<'student' | 'teacher'>('student');
  const [selectedClass, setSelectedClass] = useState<string>('6A1');

  // Competency Radar Chart Data
  const radarData = [
    { subject: 'Đọc hiểu sâu', score: progress.skillScores.reading, fullMark: 100 },
    { subject: 'Viết sáng tạo', score: progress.skillScores.writing, fullMark: 100 },
    { subject: 'Nói & Thuyết trình', score: progress.skillScores.speaking, fullMark: 100 },
    { subject: 'Đạo đức & GDCD', score: progress.skillScores.ethics, fullMark: 100 },
    { subject: 'Tư duy phản biện', score: progress.skillScores.criticalThinking, fullMark: 100 },
  ];

  // Weekly Progress Activity Data
  const barData = [
    { name: 'Tuần 1', docHieu: 3, vietVan: 2, soDo: 2 },
    { name: 'Tuần 2', docHieu: 4, vietVan: 3, soDo: 3 },
    { name: 'Tuần 3', docHieu: 6, vietVan: 4, soDo: 5 },
    { name: 'Tuần 4', docHieu: progress.readingCompleted, vietVan: progress.essaysWritten, soDo: progress.mindMapsCreated },
  ];

  // Demo class list for teacher dashboard
  const classList = [
    { id: '6A1', name: 'Lớp 6A1 (Chủ nhiệm: Cô Lan)', students: 38, avgScore: 8.4, completion: '92%' },
    { id: '7A2', name: 'Lớp 7A2 (Chủ nhiệm: Thầy Tuấn)', students: 40, avgScore: 8.2, completion: '88%' },
    { id: '8A3', name: 'Lớp 8A3 (Chủ nhiệm: Cô Mai)', students: 36, avgScore: 8.6, completion: '94%' },
    { id: '9A1', name: 'Lớp 9A1 (Chủ nhiệm: Thầy Hùng)', students: 39, avgScore: 8.7, completion: '95%' },
  ];

  const handleExportCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Ky nang,Diem nang luc
Doc hieu sau,${progress.skillScores.reading}
Viet sang tao,${progress.skillScores.writing}
Noi va thuyet trinh,${progress.skillScores.speaking}
Dao duc va GDCD,${progress.skillScores.ethics}
Tu duy phan bien,${progress.skillScores.criticalThinking}
Tong so do tu duy da tao,${progress.mindMapsCreated}
Tong bai viet da hoan thanh,${progress.essaysWritten}
Tong gio hoc tap,${Math.round(progress.totalStudyMinutes / 60)}h
`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'bao_cao_hoc_tap_ngu_van_gdcd.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-700" />
            </span>
            <h2 className="text-xl font-black text-[#102A43]">
              HỒ SƠ TIẾN BỘ & BẢNG ĐIỀU KHIỂN AI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi năng lực học tập theo chuẩn GDPT 2018 (Dữ liệu hoạt động thực tế & minh họa DEMO)
          </p>
        </div>

        {/* Dual Role Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewRole('student')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewRole === 'student'
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Góc nhìn Học sinh
            </button>
            <button
              onClick={() => setViewRole('teacher')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewRole === 'teacher'
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Góc nhìn Giáo viên
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất báo cáo CSV
          </button>
        </div>
      </div>

      {/* Student View */}
      {viewRole === 'student' ? (
        <div className="space-y-6">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Bài đọc hiểu', val: progress.readingCompleted, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Bài văn đã viết', val: progress.essaysWritten, icon: PenTool, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Phiên tòa tham gia', val: progress.courtTrialsJoined, icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Bài nói & nghe', val: progress.speechesDelivered, icon: Mic, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Tình huống GDCD', val: progress.ethicsResolved, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Sơ đồ tư duy', val: progress.mindMapsCreated, icon: GitBranch, color: 'text-[#0F9D92]', bg: 'bg-teal-50' },
            ].map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                  <div className={`p-2.5 rounded-xl ${st.bg} ${st.color} mb-2`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                    {st.label}
                  </span>
                  <strong className="text-xl font-black text-[#102A43] mt-0.5">
                    {st.val}
                  </strong>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Radar Chart: 5 Competencies */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-[#102A43]">
                  Biểu đồ Năng lực Ngữ văn & GDCD (Chuẩn GDPT 2018)
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  Thang điểm 100
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Đánh giá sự phát triển toàn diện giữa cảm thụ văn học, kỹ năng diễn đạt và phẩm chất công dân
              </p>

              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#CBD5E1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Học sinh"
                      dataKey="score"
                      stroke="#0F9D92"
                      fill="#0F9D92"
                      fillOpacity={0.45}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Progress Over 4 Weeks */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-[#102A43]">
                  Tiến độ hoạt động học tập theo tuần
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Tháng hiện tại
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Số lượng bài đọc hiểu, bài viết văn và sơ đồ tư duy hoàn thành qua các tuần
              </p>

              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="docHieu" name="Đọc hiểu" fill="#0F9D92" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="vietVan" name="Viết văn" fill="#102A43" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="soDo" name="Sơ đồ tư duy" fill="#E6B450" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E6B450]" />
              Huy hiệu thành tích đã mở khóa
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Nhà Văn Nhí', desc: 'Viết trên 5 bài văn sáng tạo', unlocked: true },
                { title: 'Kiến Trúc Sư Tư Duy', desc: 'Tạo và xuất ảnh sơ đồ tư duy', unlocked: true },
                { title: 'Dũng Sĩ Công Lý', desc: 'Hoàn thành tranh biện tòa án', unlocked: true },
                { title: 'Trái Tim Nhân Ái', desc: 'Giải quyết 6 tình huống GDCD', unlocked: true },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col items-center text-center shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E6B450] text-slate-900 flex items-center justify-center font-black mb-2 shadow-sm">
                    ★
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">{badge.title}</span>
                  <span className="text-[10px] text-slate-600 mt-1">{badge.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Teacher Dashboard View */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0F9D92]" />
                Danh sách lớp học phụ trách – Tổ Ngữ văn & GDCD
              </h4>
              <span className="text-xs text-slate-500">Năm học 2025 - 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {classList.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer shadow-xs ${
                    selectedClass === cls.id
                      ? 'border-[#0F9D92] ring-2 ring-[#0F9D92]/20 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-black text-[#102A43] block">{cls.name}</span>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Sĩ số:</span>
                      <strong>{cls.students} học sinh</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Điểm TB kỹ năng:</span>
                      <strong className="text-emerald-700">{cls.avgScore} / 10</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Tỉ lệ hoàn thành:</span>
                      <strong className="text-blue-700">{cls.completion}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Support Needs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-[#102A43]">
              Danh sách học sinh cần hỗ trợ rèn luyện thêm ({selectedClass})
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5">Họ và tên</th>
                    <th className="py-2.5">Kỹ năng cần bổ trợ</th>
                    <th className="py-2.5">Tiến độ bài học</th>
                    <th className="py-2.5">Gợi ý phân hóa từ AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 font-semibold">Nguyễn Văn An</td>
                    <td>Dẫn chứng bài văn nghị luận</td>
                    <td><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">Đang rèn luyện</span></td>
                    <td className="text-slate-500">Gợi ý tạo sơ đồ tư duy hệ thống dẫn chứng người tốt việc tốt.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Trần Thị Bích</td>
                    <td>Nhận diện biện pháp tu từ ẩn dụ</td>
                    <td><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px]">Cần phụ đạo</span></td>
                    <td className="text-slate-500">Phát phiếu học tập phân hóa mức độ 1 tại Thư viện học liệu.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Lê Hoàng Nam</td>
                    <td>Diễn cảm bài thuyết trình</td>
                    <td><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px]">Tiến bộ tốt</span></td>
                    <td className="text-slate-500">Gợi ý thử sức vai trò Luật sư tại Tòa án nhân vật văn học.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
