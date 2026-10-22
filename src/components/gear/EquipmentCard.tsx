"use client";

import React, { useState } from "react";
import { EquipmentItem } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { Check, ShieldCheck, Tag } from "lucide-react";

interface EquipmentCardProps {
  item: EquipmentItem;
  onAddToCart?: (item: EquipmentItem) => void;
  rentalDays?: number;
}

export function EquipmentCard({
  item,
  onAddToCart,
  rentalDays = 3,
}: EquipmentCardProps) {
  const isAvailable = item.availableUnits > 0;
  const totalPrice = item.dailyRateCents * rentalDays;
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-slate-100 border-b border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Category & Mount badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-2xs">
            {item.category}
          </span>
          {item.mount && (
            <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-slate-900 text-white">
              {item.mount}
            </span>
          )}
        </div>

        {/* Availability status */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              {item.availableUnits} Available
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              Reserved
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Brand & Name */}
        <div className="mb-3">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {item.brand}
          </span>
          <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
            {item.name}
          </h3>
          {item.sensor && (
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {item.sensor}
            </p>
          )}
        </div>

        {/* Description or Specs */}
        {showSpecs ? (
          <div className="p-3 mb-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            {Object.entries(item.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between text-slate-600">
                <span className="text-slate-500">{key}:</span>
                <span className="font-medium text-slate-800 text-right">{val}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {/* Serial Number & Specs toggle */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100 font-mono">
          <span className="flex items-center gap-1 text-slate-600">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>SN: {item.serialNumbers[0]}</span>
          </span>
          <button
            type="button"
            onClick={() => setShowSpecs(!showSpecs)}
            className="text-[11px] font-sans text-violet-700 hover:text-violet-900 underline cursor-pointer"
          >
            {showSpecs ? "Hide specs" : "Specifications"}
          </button>
        </div>

        {/* Price & Deposit Breakdown */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900">
                {formatCurrency(item.dailyRateCents)}
              </span>
              <span className="text-xs text-slate-500">/ day</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              Deposit: {formatCurrency(item.depositCents)} hold
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-slate-800">
              {formatCurrency(totalPrice)}
            </span>
            <span className="text-[10px] text-slate-400 block">{rentalDays} days</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onAddToCart?.(item)}
          disabled={!isAvailable}
          className={`mt-4 w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            isAvailable
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isAvailable ? "Add to Booking" : "Unavailable for Dates"}</span>
        </button>
      </div>
    </div>
  );
}
