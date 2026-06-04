import React from "react";
// Import các icon sang trọng từ react-icons
import { FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";

const Footer = () => {
  // Danh sách các liên kết hệ thống Footer
  const quickLinks = [
    { text: "Giới thiệu", url: "/ve-chung-toi" },
    { text: "Giá trị cốt lõi", url: "/ve-chung-toi" },
    { text: "Tầm nhìn & Sứ mệnh", url: "/ve-chung-toi" },
  ];

  const policyLinks = [
    { text: "Danh mục nhà ở", url: "/bat-dong-san/nha-o" },
    { text: "Danh mục căn hộ", url: "/bat-dong-san/can-ho" },
    { text: "Danh mục đất đai", url: "/bat-dong-san/dat-dai" },
  ];

  const fnbLinks = [{ text: "Linh Huệ Coffee", url: "/fnb" }];

  return (
    // Đồng bộ màu nền và giữ mt-[100px] để tạo khoảng cách an toàn với section phía trên [cite: 248]
    <footer className="mt-[100px] w-full overflow-hidden border-t border-neutral-900 bg-[#1c1c1a] font-sans text-gray-400 select-none">
      {/* Gọi class container hệ thống của bạn để căn đều lề trái phải [cite: 248] */}
      <div className="container py-12 lg:py-16">
        {/* LƯỚI LINH HOẠT: Định hình chuẩn 2 cột trên mobile và 5 cột trên desktop [cite: 253] */}
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {/* CỘT 1: KHỐI CHỨA LOGO THƯƠNG HIỆU */}
          <div className="col-span-2 flex justify-center lg:col-span-1 lg:justify-start">
            <img
              src="/images/home/logo.png"
              alt="Logo Real Estate"
              className="h-28 w-auto object-contain object-center lg:h-40 lg:object-left"
            />
          </div>

          {/* CỘT 2: VỀ CHÚNG TÔI */}
          <div className="flex flex-col gap-4 pt-2">
            <h4 className="text-primary border-b border-neutral-800 pb-2 text-xs font-bold tracking-wider uppercase">
              VỀ CHÚNG TÔI
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white md:text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: FNB */}
          <div className="flex flex-col gap-4 pt-2">
            <h4 className="text-primary border-b border-neutral-800 pb-2 text-xs font-bold tracking-wider uppercase">
              FNB
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white md:text-sm">
              {fnbLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: DỰ ÁN */}
          <div className="flex flex-col gap-4 pt-2">
            <h4 className="text-primary border-b border-neutral-800 pb-2 text-xs font-bold tracking-wider uppercase">
              DỰ ÁN
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light text-white md:text-sm">
              {policyLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 5: THÔNG TIN DOANH NGHIỆP */}
          {/* ĐÃ SỬA: Loại bỏ col-span-2 để khối này tự động lấp đầy 1 ô grid mặc định, đứng ngang hàng hoàn hảo với Dự Án trên di động [cite: 259] */}
          <div className="flex flex-col gap-4 pt-2">
            <h4 className="text-primary border-b border-neutral-800 pb-2 text-xs font-bold tracking-wider uppercase">
              THÔNG TIN DOANH NGHIỆP
            </h4>
            <div className="flex flex-col gap-2 text-xs font-light text-neutral-400 md:text-sm">
              <p className="leading-relaxed">
                <span className="font-medium text-neutral-300">Văn phòng:</span>{" "}
                97 Nguyễn Tư Nghiêm, Phường Bình Trưng, TPHCM
              </p>
              <p>
                <span className="font-medium text-neutral-300">Hotline:</span>{" "}
                093.7175.384
              </p>
              <p>
                <span className="font-medium text-neutral-300">Email:</span>{" "}
                linhhue.work@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* KHỐI BẢN QUYỀN VÀ BIỂU TƯỢNG MẠNG XÃ HỘI CHÂN ĐÁY */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-[11px] tracking-wide text-neutral-500 md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} Real Estate. Toàn bộ quyền sở hữu
            được bảo lưu.
          </div>
          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Facebook Link"
            >
              <FiFacebook className="text-sm" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Linkedin Link"
            >
              <FiLinkedin className="text-sm" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Youtube Link"
            >
              <FiYoutube className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
