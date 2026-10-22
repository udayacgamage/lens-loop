"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  ShoppingBag,
  ShieldCheck,
  QrCode,
  MapPin,
  SlidersHorizontal,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  cartCount?: number;
  activeRole?: "customer" | "staff";
  onRoleToggle?: () => void;
  onOpenQRScanner?: () => void;
  onOpenCart?: () => void;
}

export function Header({
  cartCount = 2,
  activeRole = "customer",
  onRoleToggle,
  onOpenQRScanner,
  onOpenCart,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  LensLoop
                </span>
                <span className="hidden sm:inline text-xs font-medium text-slate-500">
                  Equipment Rental
                </span>
              </div>
            </Link>

            {/* Hub info */}
            <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-slate-200 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>SF Downtown Hub</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-700 font-medium">Open 08:00 – 19:00</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link
              href="#gear"
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Browse Gear
            </Link>
            <Link
              href="#shoot-builder"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4 text-violet-600" />
              <span>Shoot Builder</span>
            </Link>
            <Link
              href="#kits"
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Curated Kits
            </Link>
            <Link
              href="#staff-hub"
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Staff Dashboard
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {onOpenQRScanner && (
              <button
                onClick={onOpenQRScanner}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-slate-600" />
                <span>Scan QR</span>
              </button>
            )}

            {onRoleToggle && (
              <button
                onClick={onRoleToggle}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  activeRole === "staff"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">
                  {activeRole === "customer" ? "Customer View" : "Staff View"}
                </span>
                <span className="sm:hidden">
                  {activeRole === "customer" ? "Customer" : "Staff"}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shrink-0"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-150 space-y-2 text-sm font-medium text-slate-700">
            <Link
              href="#gear"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Browse Gear Catalog
            </Link>
            <Link
              href="#shoot-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-violet-600" />
              <span>Shoot Builder</span>
            </Link>
            <Link
              href="#kits"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Curated Kits
            </Link>
            <Link
              href="#staff-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Staff Dashboard
            </Link>
            {onOpenQRScanner && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQRScanner();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-violet-700 font-semibold"
              >
                <QrCode className="w-4 h-4" />
                <span>Launch QR Handover Scanner</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
