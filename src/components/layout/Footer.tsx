import React from "react";
import Link from "next/link";
import { Camera, Shield, RefreshCw, Zap, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Lens<span className="text-violet-400">Loop</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find the right gear, book your dates, and get ready to shoot. Automated availability, serial-tracked cameras, and turnkey kits.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time DB inventory online</span>
            </div>
          </div>

          {/* Core Guarantees */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Rental Guarantees
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Double-Booking Guarantee</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Serial-tracked tested units</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2-Hour Turnaround Inspection</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>15-min instant checkout holds</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Kits & Gear
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#kits" className="hover:text-white transition-colors">Wedding Photography Kit</Link></li>
              <li><Link href="#kits" className="hover:text-white transition-colors">Short-Film Cinema Kit</Link></li>
              <li><Link href="#kits" className="hover:text-white transition-colors">Commercial Product Kit</Link></li>
              <li><Link href="#kits" className="hover:text-white transition-colors">Podcast & Interview Kit</Link></li>
              <li><Link href="#shoot-builder" className="hover:text-white transition-colors">Shoot Builder</Link></li>
            </ul>
          </div>

          {/* Locations & Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Pickup Hubs
            </h4>
            <div className="text-sm text-slate-400 space-y-1.5">
              <p className="font-medium text-white">Downtown SF Hub (SOMA)</p>
              <p>450 Mission St, Suite 120</p>
              <p>Mon–Sat: 08:00 – 19:00</p>
              <p>Sun: 10:00 – 17:00</p>
              <p className="text-xs text-slate-400 mt-2 font-mono">Emergency Desk: (415) 555-0100</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 LensLoop Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Rental Agreement v3.2</span>
            <span>Privacy Policy</span>
            <span>Security & Escrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
