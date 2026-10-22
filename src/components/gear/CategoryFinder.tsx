"use client";

import React from "react";
import {
  Camera,
  Disc,
  Sun,
  Mic,
  Sliders,
  Package,
  Navigation,
} from "lucide-react";

export interface CategoryCardData {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  count: number;
  startingPriceCents: number;
  popularItems: string[];
}

export const CATEGORIES_DATA: CategoryCardData[] = [
  {
    id: "cat-1",
    name: "Cameras",
    slug: "cameras",
    icon: Camera,
    description: "Cinema line, full-frame & global shutter bodies",
    count: 8,
    startingPriceCents: 8500,
    popularItems: ["Sony FX6", "Canon R5 II", "RED Komodo-X", "Sony FX3", "Blackmagic 6K"],
  },
  {
    id: "cat-2",
    name: "Lenses",
    slug: "lenses",
    icon: Disc,
    description: "Sony GM, Canon RF & Sigma Art zooms and primes",
    count: 9,
    startingPriceCents: 3800,
    popularItems: ["Sony 24-70 GM II", "Canon RF 50 f/1.2", "Sony 200-600 G", "Sigma 24-70 II"],
  },
  {
    id: "cat-drones",
    name: "Drones",
    slug: "drones",
    icon: Navigation,
    description: "8K ProRes aerial systems, FPV & Hasselblad triple-cameras",
    count: 4,
    startingPriceCents: 5500,
    popularItems: ["DJI Inspire 3 8K", "Mavic 3 Pro Cine", "Avata 2 FPV", "Mini 4 Pro"],
  },
  {
    id: "cat-support",
    name: "Gimbals & Support",
    slug: "support",
    icon: Sliders,
    description: "Motorized 3-axis & 4-axis gimbals, travel stabilizers, Easyrig vests",
    count: 6,
    startingPriceCents: 3200,
    popularItems: ["DJI RS 4 Pro", "Ronin 4D 6K", "Zhiyun Crane 4", "RS 3 Mini", "Easyrig Vario 5"],
  },
  {
    id: "cat-lighting",
    name: "Lighting",
    slug: "lighting",
    icon: Sun,
    description: "High CRI continuous LED fixtures & Bowens mounts",
    count: 1,
    startingPriceCents: 4500,
    popularItems: ["Aputure 300d II (5500K)"],
  },
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    icon: Mic,
    description: "32-bit float wireless lavs & directional shotgun kits",
    count: 2,
    startingPriceCents: 3500,
    popularItems: ["RØDE Wireless PRO", "Sennheiser MKH 416"],
  },
  {
    id: "cat-kits",
    name: "Ready Kits",
    slug: "kits",
    icon: Package,
    description: "Field-tested turnkey bundles with 15–20% savings",
    count: 4,
    startingPriceCents: 13500,
    popularItems: ["Wedding Kit", "Short-Film Cinema Kit"],
  },
];

interface CategoryFinderProps {
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export function CategoryFinder({
  activeCategory,
  onSelectCategory,
}: CategoryFinderProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Quick Navigation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Browse by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore 21 physical serial-tracked units across cinema cameras, primes & zooms, drones, and stabilizers.
          </p>
        </div>

        {activeCategory !== "all" && (
          <button
            onClick={() => onSelectCategory("all")}
            className="text-xs font-semibold text-violet-700 hover:text-violet-900 underline self-start sm:self-auto cursor-pointer"
          >
            Show All Gear (21 items)
          </button>
        )}
      </div>

      {/* Responsive Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {CATEGORIES_DATA.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
                isSelected
                  ? "border-violet-600 bg-violet-50/80 ring-2 ring-violet-600/20 text-slate-900 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">From</span>
                <span className="font-bold text-slate-900">
                  ${cat.startingPriceCents / 100}/d
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
