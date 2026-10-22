"use client";

import React, { useState } from "react";
import {
  X,
  QrCode,
  Camera,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  Check,
} from "lucide-react";

interface QRHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookingRef?: string;
}

export function QRHandoverModal({
  isOpen,
  onClose,
  initialBookingRef = "LL-1042",
}: QRHandoverModalProps) {
  const [step, setStep] = useState<"SCAN" | "VERIFY" | "INSPECT" | "DONE">("SCAN");
  const [scannedCode, setScannedCode] = useState(initialBookingRef);
  const [isSimulatingScan, setIsSimulatingScan] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState(2);

  const [checklist, setChecklist] = useState({
    sensorClean: true,
    glassUnscratched: true,
    mountTight: true,
    accessoriesComplete: true,
  });

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsSimulatingScan(true);
    setTimeout(() => {
      setIsSimulatingScan(false);
      setScannedCode("LL-TOKEN-8A91B3E2 (" + initialBookingRef + ")");
      setStep("VERIFY");
    }, 800);
  };

  const handleCompleteHandover = () => {
    setStep("DONE");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-slate-300" />
            <div>
              <h3 className="text-sm font-bold">Equipment Handover Scanner</h3>
              <p className="text-[11px] text-slate-400">Scan customer pickup code or equipment barcode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === "SCAN" && (
            <div className="space-y-5 text-center">
              {/* Simulated Camera Viewfinder */}
              <div className="relative aspect-square max-w-xs mx-auto rounded-xl bg-slate-900 flex flex-col items-center justify-center border border-slate-700 overflow-hidden">
                <div className="w-48 h-48 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-slate-500" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-3">
                  Camera ready
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleSimulateScan}
                  disabled={isSimulatingScan}
                  className="w-full py-2.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSimulatingScan ? (
                    <span>Reading token...</span>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      <span>Simulate Customer QR Token Scan</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500">
                  Target Booking: <strong>{initialBookingRef}</strong>
                </p>
              </div>
            </div>
          )}

          {step === "VERIFY" && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <p className="font-bold text-emerald-900">
                  Pickup Credential Validated
                </p>
                <p className="font-mono text-emerald-700 text-[11px] mt-0.5">
                  Token: {scannedCode}
                </p>
              </div>

              {/* Equipment to Hand Over */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Matching Physical Serial Numbers:
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">Sony A7 IV Body</span>
                      <p className="font-mono text-slate-500 text-[11px]">SN: SN-SNY-A74-1001</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[10px]">
                      VERIFIED
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">FE 24-70mm f/2.8 GM II</span>
                      <p className="font-mono text-slate-500 text-[11px]">SN: SN-SNY-2470-2001</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[10px]">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("INSPECT")}
                className="w-full py-2.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Condition Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === "INSPECT" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Condition Inspection Checklist
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect optical elements, sensor, bayonet mount, and accessories before handoff.
                </p>
              </div>

              {/* Inspection Checklist */}
              <div className="space-y-2 text-xs">
                {[
                  { key: "sensorClean", label: "Sensor clean & free of dust / scratches" },
                  { key: "glassUnscratched", label: "Optical front/rear glass inspected" },
                  { key: "mountTight", label: "Bayonet mount locks securely" },
                  { key: "accessoriesComplete", label: "Batteries, charger, caps, and hood included" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.key as keyof typeof checklist]}
                      onChange={(e) =>
                        setChecklist((prev) => ({ ...prev, [item.key]: e.target.checked }))
                      }
                      className="w-4 h-4 accent-violet-600 rounded-sm cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Condition Photos */}
              <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center">
                <UploadCloud className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-slate-700">
                  {photosUploaded} Inspection Photos Attached
                </p>
                <p className="text-[10px] text-slate-400">
                  Stored securely in S3 with timestamp
                </p>
              </div>

              <button
                onClick={handleCompleteHandover}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Complete Handover</span>
              </button>
            </div>
          )}

          {step === "DONE" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Handover Recorded
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Serial numbers marked active in database. Pickup record logged.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
