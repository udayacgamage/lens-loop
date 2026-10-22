"use client";

import React, { useState } from "react";
import { EquipmentItem } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  Trash2,
  Calendar,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  QrCode,
  Tag,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: EquipmentItem[];
  onRemoveItem: (id: string) => void;
  rentalDays: number;
  startDate: string;
  endDate: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  rentalDays,
  startDate,
  endDate,
}: CartDrawerProps) {
  const [step, setStep] = useState<"CART" | "CHECKOUT" | "CONFIRMED">("CART");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState("LL-1048");

  if (!isOpen) return null;

  const subtotalCents = items.reduce((acc, item) => acc + item.dailyRateCents * rentalDays, 0);
  const totalDepositCents = items.reduce((acc, item) => acc + item.depositCents, 0);
  const estimatedTaxCents = Math.round(subtotalCents * 0.0875);
  const grandTotalCents = subtotalCents + estimatedTaxCents;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementChecked) return;
    setBookingRef("LL-" + Math.floor(1000 + Math.random() * 9000));
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("CONFIRMED");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-xl flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {step === "CART" && "Rental Cart"}
              {step === "CHECKOUT" && "Reservation Checkout"}
              {step === "CONFIRMED" && "Booking Confirmed"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === "CART" && "Selected equipment held during review"}
              {step === "CHECKOUT" && "Secure card authorization"}
              {step === "CONFIRMED" && `Reference: ${bookingRef}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6">
          {step === "CART" && (
            <>
              {/* Date & Hub info */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>
                    {startDate} – {endDate} ({rentalDays} Days)
                  </span>
                </div>
                <span className="text-slate-600 font-medium">
                  SOMA SF Hub
                </span>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Equipment ({items.length})
                  </h4>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 bg-white min-w-0"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-slate-900 leading-snug truncate">
                            {item.name}
                          </h5>
                          <p className="text-[11px] text-slate-500 truncate">
                            {formatCurrency(item.dailyRateCents)}/d · SN: {item.serialNumbers[0]}
                          </p>
                          <span className="text-[10px] text-slate-400 block truncate">
                            Deposit: {formatCurrency(item.depositCents)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-bold text-slate-900">
                          {formatCurrency(item.dailyRateCents * rentalDays)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Transparent Pricing Breakdown */}
              {items.length > 0 && (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Equipment Subtotal ({rentalDays} days)</span>
                    <span className="font-semibold text-slate-800">
                      {formatCurrency(subtotalCents)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8.75%)</span>
                    <span className="font-semibold text-slate-800">
                      {formatCurrency(estimatedTaxCents)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                    <span>Rental Total</span>
                    <span>{formatCurrency(grandTotalCents)}</span>
                  </div>

                  {/* Separate Security Deposit Note */}
                  <div className="mt-3 p-3 rounded-md bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">
                        Refundable Security Deposit: {formatCurrency(totalDepositCents)}
                      </strong>
                      <span className="text-amber-800 text-[11px]">
                        Card pre-authorization held at pickup and released upon return inspection.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === "CHECKOUT" && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Customer Information
                </h4>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    defaultValue="Jamie Chen"
                    placeholder="Full Legal Name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      required
                      defaultValue="director@shoot.com"
                      placeholder="Email Address"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    />
                    <input
                      type="tel"
                      required
                      defaultValue="+1 (415) 555-9823"
                      placeholder="Mobile Phone"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Payment Card
                </h4>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                      Credit / Debit Card
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Secure
                    </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value="•••• •••• •••• 4242  (Stripe Test Card)"
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-200 font-mono text-xs text-slate-800"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      readOnly
                      value="Exp: 12/28"
                      className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-800"
                    />
                    <input
                      type="text"
                      readOnly
                      value="CVC: 123"
                      className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="w-4 h-4 accent-violet-600 rounded-sm mt-0.5 cursor-pointer"
                  />
                  <span>
                    I agree to the <strong className="text-slate-800 font-semibold">Equipment Rental Agreement v3.2</strong>, including return inspection standards, timely return policies, and authorized security deposit hold.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreementChecked || isProcessing}
                className="w-full py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <span>Confirm Reservation ({formatCurrency(grandTotalCents)})</span>
                )}
              </button>
            </form>
          )}

          {step === "CONFIRMED" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Reservation Confirmed
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Booking #{bookingRef} is locked in the database.
                </p>
              </div>

              {/* Pickup Credential */}
              <div className="p-4 rounded-xl bg-slate-900 text-white text-left max-w-sm mx-auto space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  Pickup Credential Token
                </span>
                <div className="font-mono text-sm bg-slate-800 p-2.5 rounded text-emerald-400">
                  LL-TOKEN-8A91B3E2
                </div>
                <p className="text-[11px] text-slate-400">
                  Present this code or QR at SOMA Hub on {startDate} at 09:00 AM.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "CART" && items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white sticky bottom-0">
            <button
              onClick={() => setStep("CHECKOUT")}
              className="w-full py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
