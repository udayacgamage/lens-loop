"use client";

import React from "react";
import { CuratedKit } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Check, ArrowRight, Package } from "lucide-react";

interface KitCardProps {
  kit: CuratedKit;
  onBookKit?: (kit: CuratedKit) => void;
  rentalDays?: number;
}

export function KitCard({ kit, onBookKit, rentalDays = 3 }: KitCardProps) {
  const totalRate = kit.dailyRateCents * rentalDays;
  const originalTotal = kit.originalDailyRateCents * rentalDays;
  const savings = originalTotal - totalRate;

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      {/* Kit Header Image */}
      <div className="relative aspect-16/9 w-full bg-slate-100 border-b border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={kit.imageUrl}
          alt={kit.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-slate-900 text-white">
            {kit.shootType} Kit
          </span>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-emerald-700 text-white">
            Save {kit.bundleDiscountPercent}%
          </span>
        </div>
      </div>

      {/* Kit Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          {kit.name}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-5">
          {kit.description}
        </p>

        {/* Included Items List */}
        <div className="mb-6 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Included Equipment:
          </h4>
          <div className="space-y-1.5">
            {kit.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-9 h-9 rounded-md object-cover bg-white border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{item.role}</p>
                </div>
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">
                {formatCurrency(kit.dailyRateCents)}
              </span>
              <span className="text-xs text-slate-500">/ day</span>
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(kit.originalDailyRateCents)}
              </span>
            </div>
            <p className="text-xs text-emerald-700 font-medium mt-0.5">
              Bundle discount saves {formatCurrency(savings)} on {rentalDays} days
            </p>
          </div>

          <button
            onClick={() => onBookKit?.(kit)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Book Kit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
