"use client";

import React, { useState } from "react";
import { MOCK_STAFF_TASKS, StaffTask } from "@/data/mockData";
import {
  QrCode,
  CheckCircle2,
  Clock,
  Search,
  Check,
} from "lucide-react";

interface StaffWorkWidgetProps {
  onOpenQRScanner: (bookingRef?: string) => void;
}

export function StaffWorkWidget({ onOpenQRScanner }: StaffWorkWidgetProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "PREPARE" | "HANDOVER" | "INSPECT" | "OVERDUE">("ALL");
  const [tasks, setTasks] = useState<StaffTask[]>(MOCK_STAFF_TASKS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((t) => {
    if (activeTab !== "ALL" && t.type !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.bookingRef.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggleItemCheck = (taskId: string, serial: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          equipmentList: task.equipmentList.map((item) =>
            item.serialNumber === serial ? { ...item, checked: !item.checked } : item
          ),
        };
      })
    );
  };

  const getStatusBadge = (type: StaffTask["type"]) => {
    switch (type) {
      case "PREPARE":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            Prepare
          </span>
        );
      case "HANDOVER":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-purple-50 text-purple-700 border border-purple-200">
            Handover
          </span>
        );
      case "INSPECT":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200">
            Inspect
          </span>
        );
      case "OVERDUE":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-red-50 text-red-700 border border-red-200">
            Overdue
          </span>
        );
    }
  };

  return (
    <div id="staff-hub" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Staff Dashboard · Operations Center
          </span>
          <h2 className="text-xl font-bold tracking-tight">Today's Worklist</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upcoming pickups to prepare, handovers, returns due today, and equipment awaiting inspection.
          </p>
        </div>

        <button
          onClick={() => onOpenQRScanner()}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Handover / Return QR</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "ALL", label: "All (4)" },
            { id: "PREPARE", label: "Pickups (Prepare)" },
            { id: "HANDOVER", label: "Handover Ready" },
            { id: "INSPECT", label: "Returns to Inspect" },
            { id: "OVERDUE", label: "Overdue Alerts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search booking ref or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Work Orders List */}
      <div className="divide-y divide-slate-100">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No work orders in this view.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0"
            >
              {/* Order Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {task.bookingRef}
                  </span>
                  {getStatusBadge(task.type)}
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {task.scheduledTime}
                  </span>
                </div>

                <div className="text-xs truncate">
                  <span className="font-bold text-slate-900">{task.customerName}</span>
                  <span className="text-slate-400 mx-2">·</span>
                  <span className="text-slate-500 font-mono">{task.customerPhone}</span>
                </div>

                {/* Serial Checklist */}
                <div className="pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Equipment items to inspect:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {task.equipmentList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleToggleItemCheck(task.id, item.serialNumber)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer border max-w-full truncate ${
                          item.checked
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 shrink-0 ${
                            item.checked ? "text-emerald-600" : "text-slate-400"
                          }`}
                        />
                        <span className="font-sans font-medium truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          ({item.serialNumber})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Handover Action */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onOpenQRScanner(task.bookingRef)}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-slate-600" />
                  <span>Scan {task.type === "INSPECT" ? "Return" : "Handover"}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
