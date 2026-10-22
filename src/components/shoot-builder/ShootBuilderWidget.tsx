"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  SlidersHorizontal,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Check,
  Film,
  Heart,
  Mic,
  Package,
} from "lucide-react";
import { EquipmentItem, MOCK_EQUIPMENT } from "@/data/mockData";

export function ShootBuilderWidget({
  onAddPackageToCart,
}: {
  onAddPackageToCart?: (items: EquipmentItem[]) => void;
}) {
  const [shootType, setShootType] = useState<string>("wedding");
  const [existingBody, setExistingBody] = useState<string>("none");
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [maxBudget, setMaxBudget] = useState<number>(550);

  // Recommendations calculated based on compatibility rules
  const getRecommendedGear = (): {
    items: EquipmentItem[];
    ruleNotes: string[];
    totalDailyCents: number;
  } => {
    const notes: string[] = [];
    const recommended: EquipmentItem[] = [];

    const cameraBody = MOCK_EQUIPMENT.find((e) => e.slug === "sony-a7-iv");
    const fx3Camera = MOCK_EQUIPMENT.find((e) => e.slug === "sony-fx3-cinema");
    const zoomLens = MOCK_EQUIPMENT.find((e) => e.slug === "sony-fe-24-70-gm2");
    const teleLens = MOCK_EQUIPMENT.find((e) => e.slug === "sony-fe-70-200-gm2");
    const prime50 = MOCK_EQUIPMENT.find((e) => e.slug === "sony-fe-50-f12-gm");
    const light = MOCK_EQUIPMENT.find((e) => e.slug === "aputure-300d-ii");
    const gimbal = MOCK_EQUIPMENT.find((e) => e.slug === "dji-rs-3-pro");
    const audio = MOCK_EQUIPMENT.find((e) => e.slug === "rode-wireless-pro");
    const boomAudio = MOCK_EQUIPMENT.find((e) => e.slug === "sennheiser-mkh-416");

    if (existingBody === "none") {
      if (shootType === "short-film" && fx3Camera) {
        recommended.push(fx3Camera);
        notes.push("Camera body: Sony FX3 Cinema Line (4K 120p, XLR audio handle)");
      } else if (cameraBody) {
        recommended.push(cameraBody);
        notes.push("Camera body: Sony A7 IV 33MP Full-Frame Mirrorless");
      }
    } else {
      notes.push(`Customer camera: Using existing ${existingBody} body (no body rental cost)`);
    }

    if (shootType === "wedding") {
      if (zoomLens) recommended.push(zoomLens);
      if (teleLens) recommended.push(teleLens);
      if (audio) recommended.push(audio);
      notes.push("Lens mount: Sony E-mount verified for 24-70mm & 70-200mm f/2.8 GM II");
      notes.push("Audio: Dual wireless 32-bit float lavalier system for ceremony vows");
    } else if (shootType === "short-film") {
      if (zoomLens) recommended.push(zoomLens);
      if (gimbal) recommended.push(gimbal);
      if (light) recommended.push(light);
      if (boomAudio) recommended.push(boomAudio);
      notes.push("Support: DJI RS 3 Pro payload matched for camera and 24-70mm lens");
      notes.push("Lighting: 300W continuous daylight fixture (Bowens mount)");
      notes.push("Audio: Sennheiser MKH 416 directional shotgun with blimp");
    } else if (shootType === "podcast") {
      if (zoomLens) recommended.push(zoomLens);
      if (audio) recommended.push(audio);
      if (light) recommended.push(light);
      notes.push("Audio: Dual wireless transmitters with internal 32-bit backup recording");
      notes.push("Lighting: High CRI 96+ continuous daylight fixture for interview setup");
    } else {
      // Product / Commercial
      if (prime50) recommended.push(prime50);
      if (zoomLens) recommended.push(zoomLens);
      if (light) recommended.push(light);
      notes.push("Lenses: 50mm f/1.2 GM prime for sharp macro depth of field");
      notes.push("Lighting: High CRI continuous studio fixture for consistent reflections");
    }

    const totalDailyCents = recommended.reduce((acc, item) => acc + item.dailyRateCents, 0);

    return {
      items: recommended,
      ruleNotes: notes,
      totalDailyCents,
    };
  };

  const { items, ruleNotes, totalDailyCents } = getRecommendedGear();
  const totalCents = totalDailyCents * rentalDays;
  const isWithinBudget = totalCents / 100 <= maxBudget;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden w-full max-w-full">
      {/* Title Bar */}
      <div className="p-5 sm:p-8 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <SlidersHorizontal className="w-4 h-4 shrink-0" />
          <span>Equipment Compatibility Engine</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Shoot Builder
        </h2>
        <p className="text-slate-600 mt-1.5 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Enter your shoot type, rental dates, budget, and existing camera. The system checks compatibility rules and selects available equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-5 p-5 sm:p-8 space-y-6 min-w-0">
          {/* 1. Shoot Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Shoot Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: "wedding", label: "Wedding & Events", icon: Heart },
                { id: "short-film", label: "Short Film / Cinema", icon: Film },
                { id: "podcast", label: "Interview / Podcast", icon: Mic },
                { id: "product", label: "Commercial / Product", icon: Package },
              ].map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setShootType(type.id)}
                    className={`p-3 text-left rounded-xl border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2.5 min-w-0 ${
                      shootType === type.id
                        ? "border-violet-600 bg-violet-50 text-violet-900 font-bold"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${shootType === type.id ? "text-violet-600" : "text-slate-400"}`} />
                    <span className="truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Existing Camera Body */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Existing Camera Body
            </label>
            <select
              value={existingBody}
              onChange={(e) => setExistingBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-violet-600 cursor-pointer"
            >
              <option value="none">No camera body (Rent complete kit)</option>
              <option value="Sony E-Mount">Existing Sony E-mount body</option>
              <option value="Canon RF">Existing Canon RF body</option>
            </select>
          </div>

          {/* 3. Duration */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Rental Duration
              </label>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1D</span>
              <span>3D (Weekend)</span>
              <span>7D (Week)</span>
              <span>14D</span>
            </div>
          </div>

          {/* 4. Budget Target */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Target Budget
              </label>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                ${maxBudget} max
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={1200}
              step={50}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Recommended Package Manifest */}
        <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between bg-slate-50/30 min-w-0">
          <div>
            {/* Manifest Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Recommended Package
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {items.length} Compatible Items
                </h3>
              </div>
              <div className="sm:text-right">
                <span className="text-xs text-slate-500 block">Total for {rentalDays} days</span>
                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                  {formatCurrency(totalCents)}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {formatCurrency(totalDailyCents)} / day
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2.5 my-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 gap-3 min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.brand} · {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {formatCurrency(item.dailyRateCents * rentalDays)}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {formatCurrency(item.dailyRateCents)}/d
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Compatibility Notes */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 mb-6 text-xs text-slate-700 space-y-1.5">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Compatibility Rules Applied
              </h4>
              {ruleNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              {isWithinBudget ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4 shrink-0" /> Within target budget (${maxBudget})
                </span>
              ) : (
                <span className="text-amber-700 font-semibold">
                  Exceeds budget by ${Math.round(totalCents / 100 - maxBudget)}
                </span>
              )}
            </div>

            <button
              onClick={() => onAddPackageToCart?.(items)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add Package to Cart</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
