import React from 'react';
import { BookOpen, GraduationCap, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102A43] text-white/80 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0F9D92] rounded-xl text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-[#0F9D92] tracking-wider">
                TRƯỜNG THCS HUỲNH THÚC KHÁNG – TỔ NGỮ VĂN & GDCD
              </div>
              <h3 className="text-base font-black text-white">
                HUỲNH THÚC KHÁNG VĂN HỌC SỐNG AI
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed max-w-lg">
            Hệ sinh thái học tập Ngữ văn & Giáo dục công dân thông minh theo Chương trình GDPT 2018. Định hướng phát triển năng lực tự chủ, giao tiếp, tư duy phản biện và phẩm chất đạo đức trong kỷ nguyên số.
          </p>
          <div className="text-xs font-semibold text-[#E6B450] tracking-wide">
            ĐỌC SÂU – VIẾT THẬT – NÓI HAY – SỐNG ĐẸP – TƯ DUY SÁNG RÕ
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
            9 Phân Hệ Tích Hợp
          </h4>
          <ul className="text-xs space-y-1.5 text-white/70">
            <li>1. Phòng Đọc Hiểu AI</li>
            <li>2. Xưởng Sáng Tạo Văn Học AI</li>
            <li>3. Tòa Án Nhân Vật Văn Học AI</li>
            <li>4. Sân Khấu Nói Và Nghe AI</li>
            <li>5. Văn Học & Bài Học Làm Người AI</li>
            <li>6. Đấu Trường Ngữ Văn AI</li>
            <li>7. Thư Viện Học Liệu & Trợ Lý Giáo Viên</li>
            <li>8. Hồ Sơ Tiến Bộ & Bảng Điều Khiển</li>
            <li>9. Sơ Đồ Tư Duy Ngữ Văn AI (Xuất ảnh PNG)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
            Thông Tin Sư Phạm
          </h4>
          <div className="text-xs text-white/70 space-y-2 leading-relaxed">
            <p>Trường THCS Huỳnh Thúc Kháng</p>
            <p>Tổ chuyên môn: Ngữ văn – Giáo dục công dân</p>
            <p className="text-[#0F9D92] font-medium">Bảo mật thông tin & an toàn học đường</p>
            <p className="text-[11px] text-white/50 pt-2 border-t border-white/10">
              Sản phẩm dự thi Cuộc thi Sáng tạo & Ứng dụng AI trong Giáo dục 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1A2A] py-3 text-center text-xs text-white/50 border-t border-white/5">
        &copy; 2026 Trường THCS Huỳnh Thúc Kháng – Tổ Ngữ văn & GDCD. Bản quyền thuộc về nhà trường.
      </div>
    </footer>
  );
};
