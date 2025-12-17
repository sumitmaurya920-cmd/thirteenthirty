"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

/* ---------------- DATA ---------------- */

const megaMenuData = {
  Collection: {
    categories: [
      {
        title: "Living Room",
        items: ["Lounge Chairs", "Armchairs", "Recliners", "Accent Chairs"],
      },
      {
        title: "Office",
        items: [
          "Executive Chairs",
          "Task Chairs",
          "Conference Chairs",
          "Ergonomic Series",
        ],
      },
      {
        title: "Dining",
        items: [
          "Dining Chairs",
          "Bar Stools",
          "Bench Seating",
          "Counter Chairs",
        ],
      },
    ],
    featured: {
      title: "Featured Collection",
      subtitle: "",
      image:
        "https://images.unsplash.com/photo-1760716478137-d861d5b354e8?q=80&w=1080",
    },
  },
  Experience: {
    categories: [
      {
        title: "About",
        items: ["Our Story", "Craftsmanship", "Sustainability", "Awards"],
      },
      {
        title: "Services",
        items: [
          "Custom Design",
          "Consultations",
          "White Glove Delivery",
          "Warranty",
        ],
      },
    ],
    featured: {
      title: "Visit Our Showroom",
      subtitle: "",
      image:
        "https://images.unsplash.com/photo-1687180497278-ca4d736ecc99?q=80&w=1080",
    },
  },
};

const menuItems = ["Home", "Collection", "Experience", "Contact"];

/* ---------------- COMPONENT ---------------- */

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  /* ---------- scroll bg ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- hover handlers ---------- */
  const onEnter = (item) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    if (megaMenuData[item]) setActiveMegaMenu(item);
  };

  const onLeave = () => {
    const t = setTimeout(() => setActiveMegaMenu(null), 200);
    setCloseTimeout(t);
  };

  return (
    <motion.nav      
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={onLeave}
      className={`fixed py-3 top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-gradient-to-r from-[#3f5b38] to-[#6b8955] backdrop-blur-xl border-b border-[#FF7A00]/20"
          : "bg-transparent"
      }`}
    >
      {/* -------- TOP BAR -------- */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 items-center content-center h-15">

            {/* LEFT – DESKTOP MENU */}
            <div className="hidden lg:flex items-center space-x-12 justify-start">
              {menuItems.map((item) => (
                <div
                  key={item}
                  onMouseEnter={() => onEnter(item)}
                  className="relative"
                >
                  <a
                    className={`flex items-center gap-1 text-sm tracking-wider cursor-pointer
                      transition-colors duration-300 ease-in-out
                      ${scrolled ? "text-[#ffe68d]" : "text-white"}
                    `}
                  >

                    {item.toUpperCase()}
                    {megaMenuData[item] && (
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          activeMegaMenu === item ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* CENTER – LOGO */}
            <div className="flex justify-center">
              <img
                src="/tt_logo.png"
                alt="logo"
                className="w-[150px]"
              />
            </div>

            {/* RIGHT – SEARCH + MOBILE */}
            <div className="flex items-center justify-end gap-6">
              <div className="hidden lg:flex">
                <Search className="w-5 h-5 text-white hover:text-[#FF7A00] transition-colors" />
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="lg:hidden text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>


      {/* -------- MEGA MENU -------- */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => closeTimeout && clearTimeout(closeTimeout)}
            className="max-w-[1600px] mx-auto absolute left-0 right-0 top-full bg-[#384F37]/98 border-b border-[#FF7A00]/30"
          >
            <div className="max-w-[1200px] mx-auto px-12 py-12 grid grid-cols-4 gap-12 backdrop-blur-md">
              {/* COLUMNS */}
              {megaMenuData[activeMegaMenu].categories.map((cat) => (
                <div key={cat.title}>
                  <h3 className="text-white mb-4 tracking-wider">
                    {cat.title}
                  </h3>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="text-white/70 hover:text-[#FF7A00] cursor-pointer flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-[#FF7A00] rounded-full" />
                        {item}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* FEATURED */}
              <div className="relative overflow-hidden border border-[#FF7A00]/30">
                <img
                  src={megaMenuData[activeMegaMenu].featured.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative p-6 bg-gradient-to-t from-[#384F37]/95 to-transparent h-full flex flex-col justify-end">
                  <Sparkles className="text-[#FF7A00] mb-3" />
                  <h4 className="text-white text-xl">
                    {megaMenuData[activeMegaMenu].featured.title}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {megaMenuData[activeMegaMenu].featured.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------- MOBILE MENU -------- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#384F37] border-t border-[#FF7A00]/20"
          >
            <div className="px-6 py-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/80 tracking-wider"
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
