"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- FILTER TABS ---------------- */

const filters = ["All", "Sofa", "Chair", "Table", "Lamp", "Accessories"];

/* ---------------- PRODUCTS DATA ---------------- */

const products = [
  { title: "Chairs", type: "Chair", count: 23, img: "/categories/chair.png" },
  { title: "Sofa", type: "Sofa", count: 18, img: "/categories/sofa-set.png" },
  { title: "Tables", type: "Table", count: 12, img: "/categories/table.png" },
  { title: "Bench", type: "Chair", count: 15, img: "/categories/bench.png" },
  { title: "Lounges", type: "Chair", count: 30, img: "/categories/LOUNGES.png" },
  { title: "Seating", type: "Chair", count: 10, img: "/categories/seating.png" },
  { title: "Sofa XL", type: "Sofa", count: 14, img: "/categories/sofa-set.png" },
  { title: "Dining Table", type: "Table", count: 9, img: "/categories/table.png" },

  { title: "Accent Chair", type: "Chair", count: 11, img: "/categories/chair.png" },
  { title: "Coffee Table", type: "Table", count: 6, img: "/categories/table.png" },
  { title: "Lamp Stand", type: "Lamp", count: 7, img: "/categories/light.png" },
  { title: "Decor Set", type: "Accessories", count: 19, img: "/categories/accessories.png" },
];

/* ---------------- COMPONENT ---------------- */

export default function BrowseCategories() {
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const visibleItems = expanded
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  return (
    <section className="py-12">
      <div className="max-w-8xl mx-auto px-6">

        {/* ---------- HEADER ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
          <h2 className="text-3xl tracking-wide text-black">
            OUR PRODUCTS
          </h2>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setExpanded(false);
                }}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300
                  ${
                    activeFilter === filter
                      ? "bg-black text-white shadow-md"
                      : "border border-black/20 text-black hover:border-black"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- GRID ---------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${expanded}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {visibleItems.map((item, i) => (
              <CategoryCard key={item.title + i} cat={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ---------- VIEW ALL ---------- */}
        {filteredProducts.length > 8 && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm tracking-widest text-[#384F37]
                         hover:text-black transition"
            >
              {expanded ? "SHOW LESS" : "VIEW ALL"}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function CategoryCard({ cat }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative rounded-2xl min-h-[260px] bg-[#f7f7f7]
                 shadow-sm hover:shadow-xl transition-all duration-500 p-6"
    >
      <div className="relative z-10">
        <h3 className="text-xl mb-1 text-[#384F37]">
          {cat.title.toUpperCase()}
        </h3>
        <p className="text-xs text-black/50 mb-4">
          {cat.count} PRODUCTS
        </p>

        <p className="text-sm text-black/60 max-w-[70%]">
          Discover premium craftsmanship designed for timeless interiors.
        </p>

        <button className="mt-6 text-sm underline underline-offset-4 text-black">
          Browse category
        </button>
      </div>

      <img
        src={cat.img}
        alt={cat.title}
        className="absolute bottom-4 right-4 w-[200px] opacity-80
                   group-hover:scale-110 group-hover:opacity-100
                   transition-all duration-500"
      />

      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5
                      group-hover:ring-black/10 transition" />
    </motion.div>
  );
}
