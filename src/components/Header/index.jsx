import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const estateCategories = [
    { title: "Danh mục căn hộ", href: "/bat-dong-san/can-ho" },
    { title: "Danh mục nhà ở", href: "/bat-dong-san/nha-o" },
    { title: "Danh mục đất đai", href: "/bat-dong-san/dat-dai" },
  ];

  const getNavLinkClass = ({ isActive }) => {
    return `transition-colors duration-200 tracking-wider text-xs md:text-sm font-sans outline-none ${
      isActive
        ? "text-primary font-semibold"
        : "text-white font-light hover:text-primary"
    }`;
  };

  return (
    <div className="absolute top-0 right-0 left-0 z-50 w-full">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container"
      >
        <div className="flex h-20 w-full items-center justify-between rounded-2xl bg-[#1c1c1a]/80 px-8 shadow-lg backdrop-blur-md">
          <NavLink to="/">
            <img
              src="/images/home/logo.png"
              alt="Logo"
              className="h-15 w-auto"
            />
          </NavLink>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-sm md:flex">
            <NavLink to="/" end className={getNavLinkClass}>
              Trang chủ
            </NavLink>

            <NavLink to="/ve-chung-toi" className={getNavLinkClass}>
              Về chúng tôi
            </NavLink>

            <NavLink to="/fnb" className={getNavLinkClass}>
              F&B
            </NavLink>

            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <NavLink
                to="/bat-dong-san"
                className={({ isActive }) =>
                  `flex items-center gap-1 font-sans text-xs tracking-wider transition-colors duration-200 outline-none md:text-sm ${
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary font-light text-white"
                  }`
                }
              >
                Bất động sản
                <svg
                  className={`h-3 w-3 transition-transform duration-300 ${
                    isDropdownOpen ? "text-primary rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </NavLink>

              {/* Desktop Dropdown Content */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 z-50 w-52 pt-4"
                  >
                    <div className="rounded-xl bg-[#1c1c1a] p-2 shadow-2xl">
                      {estateCategories.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={item.href}
                          className={({ isActive }) =>
                            `block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? "text-primary bg-[#ab8c5d]/10 font-semibold"
                                : "hover:text-primary text-gray-300 hover:bg-[#ab8c5d]/10"
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <Link
            to="https://zalo.me/0937175384"
            target="_blank"
            className="hidden rounded-lg bg-gradient-to-b from-[#ab8c5d] to-[#453826] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 md:block"
          >
            LIÊN HỆ NGAY
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white text-white transition-colors hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="z-50 mt-2 w-full overflow-hidden rounded-2xl bg-[#1c1c1a]/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4 p-6">
                <NavLink
                  to="/"
                  end
                  className={getNavLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trang chủ
                </NavLink>
                <NavLink
                  to="/ve-chung-toi"
                  className={getNavLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Về chúng tôi
                </NavLink>
                <NavLink
                  to="/fnb"
                  className={getNavLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  F&B
                </NavLink>

                <div className="flex flex-col">
                  <button
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                    className="hover:text-primary flex w-full items-center justify-between py-1 text-sm font-light tracking-wider text-white transition-colors outline-none"
                  >
                    <Link to="/bat-dong-san">Bất động sản</Link>
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${isMobileDropdownOpen ? "text-primary rotate-180" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isMobileDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex flex-col gap-2 overflow-hidden border-l-2 border-[#ab8c5d]/30 pl-4"
                      >
                        {estateCategories.map((item, idx) => (
                          <NavLink
                            key={idx}
                            to={item.href}
                            className={({ isActive }) =>
                              `py-1.5 text-sm transition-colors ${
                                isActive
                                  ? "text-primary font-semibold" // Active ở mobile menu con
                                  : "hover:text-primary text-gray-400"
                              }`
                            }
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                          >
                            {item.title}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="https://zalo.me/0937175384"
                  target="_blank"
                  className="mt-2 w-full rounded-lg bg-gradient-to-b from-[#ab8c5d] to-[#453826] py-3 text-center text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  LIÊN HỆ NGAY
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Header;
