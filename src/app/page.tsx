"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EquipmentCard } from "@/components/gear/EquipmentCard";
import { KitCard } from "@/components/gear/KitCard";
import { CategoryFinder } from "@/components/gear/CategoryFinder";
import { ShootBuilderWidget } from "@/components/shoot-builder/ShootBuilderWidget";
import { StaffWorkWidget } from "@/components/staff/StaffWorkWidget";
import { QRHandoverModal } from "@/components/handover/QRHandoverModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import {
  MOCK_EQUIPMENT,
  MOCK_KITS,
  EquipmentItem,
  CuratedKit,
} from "@/data/mockData";
import {
  Calendar,
  SlidersHorizontal,
  Search,
  Filter,
  X,
} from "lucide-react";

export default function Home() {
  const [activeRole, setActiveRole] = useState<"customer" | "staff">("customer");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Rental dates
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>("Oct 24, 2026");
  const [endDate, setEndDate] = useState<string>("Oct 27, 2026");

  // Cart & Modals
  const [cartItems, setCartItems] = useState<EquipmentItem[]>([
    MOCK_EQUIPMENT[0], // Sony A7 IV
    MOCK_EQUIPMENT[1], // Sony 24-70mm GM II
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [scannerTargetBooking, setScannerTargetBooking] = useState("LL-1042");

  // Available brands for easy filtering
  const allBrands = [
    "all",
    "Sony",
    "Canon",
    "DJI",
    "RED",
    "Blackmagic",
    "Sigma",
    "Zhiyun",
    "Easyrig",
    "Aputure",
    "RØDE",
    "Sennheiser",
  ];

  // Category select handler with smart kit navigation
  const handleCategorySelect = (categorySlug: string) => {
    if (categorySlug === "kits") {
      const kitsElement = document.getElementById("kits");
      if (kitsElement) {
        kitsElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    setActiveCategory(categorySlug);
    const gearElement = document.getElementById("gear");
    if (gearElement) {
      gearElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter & sort equipment
  const filteredGear = MOCK_EQUIPMENT.filter((item) => {
    if (activeCategory !== "all" && item.categorySlug !== activeCategory) return false;
    if (activeBrand !== "all" && item.brand.toLowerCase() !== activeBrand.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.mount && item.mount.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.dailyRateCents - b.dailyRateCents;
    if (sortBy === "price-desc") return b.dailyRateCents - a.dailyRateCents;
    return 0;
  });

  const handleAddToCart = (item: EquipmentItem) => {
    if (!cartItems.some((i) => i.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
    setIsCartOpen(true);
  };

  const handleAddPackageToCart = (items: EquipmentItem[]) => {
    const newItems = [...cartItems];
    items.forEach((item) => {
      if (!newItems.some((i) => i.id === item.id)) {
        newItems.push(item);
      }
    });
    setCartItems(newItems);
    setIsCartOpen(true);
  };

  const handleBookKit = (kit: CuratedKit) => {
    const itemsToAdd = MOCK_EQUIPMENT.filter((e) =>
      kit.items.some((ki) => ki.name.includes(e.brand) || e.name.includes(ki.brand))
    );
    if (itemsToAdd.length > 0) {
      handleAddPackageToCart(itemsToAdd);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleOpenScanner = (bookingRef?: string) => {
    if (bookingRef) setScannerTargetBooking(bookingRef);
    setIsQRScannerOpen(true);
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveBrand("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <Header
        cartCount={cartItems.length}
        activeRole={activeRole}
        onRoleToggle={() => setActiveRole(activeRole === "customer" ? "staff" : "customer")}
        onOpenQRScanner={() => handleOpenScanner("LL-1042")}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* If Staff view is active, prioritize Staff Operations Widget */}
        {activeRole === "staff" && (
          <section className="w-full">
            <StaffWorkWidget onOpenQRScanner={handleOpenScanner} />
          </section>
        )}

        {/* Hero Section (Black Div with Transparent Camera Rig) */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-800 w-full relative overflow-hidden">
          {/* Subtle background depth grid (pure dark utilitarian) */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6 border border-slate-700/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>San Francisco Downtown Hub · Serial-Tracked Inventory</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 sm:mb-5">
                  Find the right gear, book your dates, and get ready to shoot.
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                  Professional camera equipment rental with database-enforced availability. Every camera, lens, and drone is tracked by physical serial number and inspected between bookings.
                </p>

                {/* Date Search Bar */}
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase font-mono text-slate-400 truncate">
                        Rental Dates
                      </span>
                      <span className="font-semibold text-white truncate block">
                        {startDate} – {endDate} ({rentalDays} Days)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <a
                      href="#shoot-builder"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center shrink-0"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                      <span>Use Shoot Builder</span>
                    </a>

                    <a
                      href="#gear"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs flex items-center justify-center transition-colors cursor-pointer text-center shrink-0"
                    >
                      <span>Browse Gear</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Key Operational Rules Ticker */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-800 text-xs">
                <div>
                  <span className="block text-lg sm:text-xl font-bold text-white font-mono">Serial Level</span>
                  <span className="text-slate-400 text-[11px] sm:text-xs">Tracked by serial number</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl font-bold text-white font-mono">DB Locked</span>
                  <span className="text-slate-400 text-[11px] sm:text-xs">No double-booking</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl font-bold text-white font-mono">15 Mins</span>
                  <span className="text-slate-400 text-[11px] sm:text-xs">Checkout hold duration</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl font-bold text-white font-mono">2 Hours</span>
                  <span className="text-slate-400 text-[11px] sm:text-xs">Turnaround inspection</span>
                </div>
              </div>
            </div>

            {/* Right Column: Transparent Cinema Camera Rig in Dark Div */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto group">
                {/* Floating Cinema Camera Cutout */}
                <div className="relative aspect-square flex items-center justify-center p-2">
                  <Image
                    src="/images/hero-camera.png"
                    alt="Sony FX Cinema Line Camera Rig with XLR Audio and Matte Box"
                    width={560}
                    height={560}
                    priority
                    className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] filter transition-transform duration-500 group-hover:scale-105 select-none"
                  />
                </div>

                {/* Hardware Verification Badge Overlay */}
                <div className="absolute -bottom-2 sm:bottom-0 left-1/2 -translate-x-1/2 w-11/12 max-w-xs bg-slate-800/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-slate-200">Sony Cinema Rig</span>
                    </div>
                    <span className="font-mono text-slate-400 text-[10px]">SN-SNY-FX6-2501</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>4K 120p · Raw SDI · Matte Box</span>
                    <span className="text-emerald-400 font-semibold">Ready for Pickup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Easy Finds Section */}
        <section id="categories" className="w-full">
          <CategoryFinder
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
        </section>

        {/* Feature 1: Shoot Builder */}
        <section id="shoot-builder" className="w-full">
          <ShootBuilderWidget onAddPackageToCart={handleAddPackageToCart} />
        </section>

        {/* Feature 2: Curated Kits */}
        <section id="kits" className="space-y-4 sm:space-y-6 w-full">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Ready-Made Production Kits
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Curated equipment bundles tested for compatibility with bundle discount pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {MOCK_KITS.map((kit) => (
              <KitCard
                key={kit.id}
                kit={kit}
                onBookKit={handleBookKit}
                rentalDays={rentalDays}
              />
            ))}
          </div>
        </section>

        {/* Feature 3: Gear Catalog with Easy Finds Filters */}
        <section id="gear" className="space-y-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Equipment Catalog
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Showing {filteredGear.length} of {MOCK_EQUIPMENT.length} available items in inventory.
              </p>
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search cameras, lenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-400 w-full"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 cursor-pointer w-full sm:w-auto"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Easy Find Filters: Category & Brand Pills */}
          <div className="space-y-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium -mx-3 px-3 sm:mx-0 sm:px-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {[
                { id: "all", label: "All Items" },
                { id: "cameras", label: "Cameras" },
                { id: "lenses", label: "Lenses" },
                { id: "drones", label: "Drones" },
                { id: "support", label: "Gimbals & Support" },
                { id: "lighting", label: "Lighting" },
                { id: "audio", label: "Audio" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-slate-900 text-white font-bold"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Brand Quick-Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium -mx-3 px-3 sm:mx-0 sm:px-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Brand:
              </span>
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors whitespace-nowrap cursor-pointer shrink-0 border ${
                    activeBrand.toLowerCase() === brand.toLowerCase()
                      ? "bg-violet-600 text-white border-violet-600 font-semibold"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {brand === "all" ? "All Brands" : brand}
                </button>
              ))}

              {(activeCategory !== "all" || activeBrand !== "all" || searchQuery !== "") && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0 px-2 py-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Equipment Grid or Empty State */}
          {filteredGear.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500 space-y-2">
              <p className="text-sm font-semibold">No equipment matches your current filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredGear.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  rentalDays={rentalDays}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* Staff Handover Banner */}
        {activeRole === "customer" && (
          <section className="p-5 sm:p-8 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 w-full">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Operations
              </span>
              <h3 className="text-lg sm:text-xl font-bold">
                Staff Operations & Handover System
              </h3>
              <p className="text-slate-400 text-xs mt-1 max-w-lg leading-relaxed">
                Staff can scan customer pickup credentials, verify matching serial numbers, check off included accessories, and record inspection condition photos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setActiveRole("staff")}
                className="px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs transition-colors cursor-pointer text-center"
              >
                Open Staff Dashboard
              </button>
              <button
                onClick={() => handleOpenScanner("LL-1042")}
                className="px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Scan Handover QR
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(id) => setCartItems(cartItems.filter((i) => i.id !== id))}
        rentalDays={rentalDays}
        startDate={startDate}
        endDate={endDate}
      />

      {/* QR Handover Scanner Modal */}
      <QRHandoverModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        initialBookingRef={scannerTargetBooking}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
