"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = [
  { title: "Chairs", count: 23, img: "/categories/chair.png" },
  { title: "Sofa", count: 18, img: "/categories/sofa-set.png" },
  { title: "Tables", count: 12, img: "/categories/table.png" },
  { title: "Bench", count: 15, img: "/categories/bench.png" },
  { title: "Lounges", count: 30, img: "/categories/LOUNGES.png" },
  { title: "Seating", count: 10, img: "/categories/seating.png" },

  // hidden initially
  { title: "Outdoor", count: 9, img: "/categories/outdoor.png" },
  { title: "Storage", count: 14, img: "/categories/storage.png" },
  { title: "Decor", count: 21, img: "/categories/decor.png" },
];

export default function BrowseCategories() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl tracking-wide mb-10 text-black">
          BROWSE BY CATEGORIES
        </h2>

        {/* Always visible grid (first 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((cat, i) => (
            <CategoryCard key={i} cat={cat} />
          ))}
        </div>

        {/* Expandable wrapper */}
        <div
          className={`
            overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]
            ${expanded ? "max-h-[1200px] opacity-100 mt-8" : "max-h-0 opacity-0"}
          `}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
            {categories.slice(6).map((cat, i) => (
              <CategoryCard key={i} cat={cat} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="view-all-btn flex items-center gap-2 text-sm tracking-widest text-[#384F37]
                       hover:text-black transition"
          >
            {expanded ? "" : ""}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function CategoryCard({ cat }) {
  return (
    <div
      className="categ-box group relative rounded-2xl min-h-[260px]
                 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Text */}
      <div className="categ-txt-box relative z-10">
        <h3 className="text-xl mb-1 text-black">{cat.title.toUpperCase()}</h3>
        <p className="text-xs text-black/50 mb-15">
          {cat.count} PRODUCTS
        </p>

        <p className="text-sm text-black/60 max-w-[70%]">
          Discover premium craftsmanship designed for timeless interiors.
        </p>

        <button className="mt-6 text-sm underline underline-offset-4 text-black">
          Browse category
        </button>
      </div>

      {/* Image */}
      <img
        src={cat.img}
        alt={cat.title}
        className="categ-img absolute bottom-4 right-4 w-[200px] opacity-70
                   group-hover:scale-110 group-hover:opacity-100
                   transition-all duration-500"
      />

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5
                      group-hover:ring-black/10 transition" />
    </div>
  );
}
