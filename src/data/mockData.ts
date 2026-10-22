export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: "Cameras" | "Lenses" | "Lighting" | "Audio" | "Support" | "Drones";
  categorySlug: string;
  slug: string;
  description: string;
  dailyRateCents: number;
  depositCents: number;
  replacementValueCents: number;
  imageUrl: string;
  mount?: string;
  sensor?: string;
  specs: Record<string, string>;
  availableUnits: number;
  totalUnits: number;
  serialNumbers: string[];
}

export interface CuratedKit {
  id: string;
  name: string;
  slug: string;
  shootType: "Wedding" | "Short-film" | "Product" | "Podcast" | "Wildlife";
  description: string;
  bundleDiscountPercent: number;
  dailyRateCents: number;
  originalDailyRateCents: number;
  depositCents: number;
  imageUrl: string;
  items: {
    name: string;
    brand: string;
    role: string;
    imageUrl: string;
  }[];
}

export interface StaffTask {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  scheduledTime: string;
  type: "PREPARE" | "HANDOVER" | "INSPECT" | "OVERDUE";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  equipmentList: {
    name: string;
    serialNumber: string;
    checked: boolean;
  }[];
}

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "Sony A7 IV",
    brand: "Sony",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "sony-a7-iv",
    description:
      "33MP full-frame Exmor R CMOS sensor, 4K 60p 10-bit 4:2:2 video, next-gen real-time autofocus. The ultimate hybrid workhorse.",
    dailyRateCents: 8500,
    depositCents: 50000,
    replacementValueCents: 249800,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    sensor: "Full Frame 33MP",
    specs: {
      "Mount": "Sony E-mount",
      "Sensor": "33MP Full-Frame Exmor R",
      "Video": "4K 60p 10-bit 4:2:2",
      "Autofocus": "759 phase-detection points",
      "Battery": "NP-FZ100 (up to 580 shots)",
    },
    availableUnits: 2,
    totalUnits: 3,
    serialNumbers: ["SN-SNY-A74-1001", "SN-SNY-A74-1002"],
  },
  {
    id: "eq-2",
    name: "Sony FE 24-70mm f/2.8 GM II",
    brand: "Sony",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sony-fe-24-70-gm2",
    description:
      "Ultra-light standard zoom with corner-to-corner sharpness, constant f/2.8 aperture, and high-speed XD Linear AF motors.",
    dailyRateCents: 5500,
    depositCents: 35000,
    replacementValueCents: 229800,
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Focal Length": "24-70mm",
      "Max Aperture": "f/2.8 constant",
      "Filter Size": "82mm",
      "Weight": "695g",
    },
    availableUnits: 3,
    totalUnits: 4,
    serialNumbers: ["SN-SNY-2470-2001", "SN-SNY-2470-2002", "SN-SNY-2470-2003"],
  },
  {
    id: "eq-3",
    name: "Sony FE 70-200mm f/2.8 GM OSS II",
    brand: "Sony",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sony-fe-70-200-gm2",
    description:
      "The gold standard telephoto zoom with optical image stabilization, creamy bokeh, and lightning-fast autofocus.",
    dailyRateCents: 6500,
    depositCents: 40000,
    replacementValueCents: 279800,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Focal Length": "70-200mm",
      "Max Aperture": "f/2.8 constant",
      "Stabilization": "Optical SteadyShot",
      "Weight": "1045g",
    },
    availableUnits: 1,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-7020-3001"],
  },
  {
    id: "eq-4",
    name: "Aputure Light Storm C300d II",
    brand: "Aputure",
    category: "Lighting",
    categorySlug: "lighting",
    slug: "aputure-300d-ii",
    description:
      "Daylight-balanced 5500K point-source LED fixture with 20% more output, robust control box, and Bowens mount.",
    dailyRateCents: 4500,
    depositCents: 25000,
    replacementValueCents: 109900,
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Color Temp": "5500K Daylight",
      "Mount": "Bowens Mount",
      "CRI / TLCI": "96+ / 97+",
      "Dimming": "0% - 100% stepless",
      "Power Source": "AC or V-Mount battery",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-APT-300D-4001", "SN-APT-300D-4002"],
  },
  {
    id: "eq-5",
    name: "DJI RS 3 Pro Gimbal",
    brand: "DJI",
    category: "Support",
    categorySlug: "support",
    slug: "dji-rs-3-pro",
    description:
      "Extended carbon fiber axis arms, automated axis locks, 4.5kg tested payload, SuperSmooth mode for ultra-stable cinematic shots.",
    dailyRateCents: 4500,
    depositCents: 25000,
    replacementValueCents: 86900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Payload": "4.5 kg / 10 lbs",
      "Battery Runtime": "12 hours",
      "Axis Locks": "Automated",
      "Connectivity": "Bluetooth 5.0, USB-C, Ronin App",
    },
    availableUnits: 2,
    totalUnits: 3,
    serialNumbers: ["SN-DJI-RS3P-5001", "SN-DJI-RS3P-5002"],
  },
  {
    id: "eq-6",
    name: "RØDE Wireless PRO Dual Kit",
    brand: "RØDE",
    category: "Audio",
    categorySlug: "audio",
    slug: "rode-wireless-pro",
    description:
      "Compact dual-channel wireless microphone system with 32-bit float on-board recording, timecode, and intelligent GainAssist.",
    dailyRateCents: 3500,
    depositCents: 20000,
    replacementValueCents: 39900,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Transmission": "Series IV 2.4GHz (260m range)",
      "Recording": "32-bit float on-board (32GB internal)",
      "Channels": "Dual transmitter + receiver",
      "Timecode": "SMPTE generation",
    },
    availableUnits: 4,
    totalUnits: 4,
    serialNumbers: ["SN-ROD-WPRO-6001", "SN-ROD-WPRO-6002"],
  },
  {
    id: "eq-7",
    name: "Sony FX3 Cinema Line Camera",
    brand: "Sony",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "sony-fx3-cinema",
    description:
      "12.1MP Full-Frame Back-Illuminated sensor, 4K 120p, 15+ stops dynamic range, internal cooling fan, XLR top audio handle.",
    dailyRateCents: 11000,
    depositCents: 60000,
    replacementValueCents: 389900,
    imageUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    sensor: "Full Frame 12.1MP BSI",
    specs: {
      "Sensor": "Full-Frame 12.1MP Exmor R",
      "Dynamic Range": "15+ stops with S-Log3",
      "Audio": "Dual XLR inputs on top handle",
      "Cooling": "Active fan for unlimited 4K recording",
    },
    availableUnits: 1,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-FX3-7001"],
  },
  {
    id: "eq-8",
    name: "Sony FE 50mm f/1.2 GM Master Prime",
    brand: "Sony",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sony-fe-50-f12-gm",
    description:
      "Ultra-fast f/1.2 aperture prime delivering breathtaking shallow depth of field, corner sharpness, and 4 XD Linear focus motors.",
    dailyRateCents: 4800,
    depositCents: 30000,
    replacementValueCents: 199800,
    imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Aperture": "f/1.2 to f/16 (11-blade circular)",
      "Elements": "3 XA extreme aspherical",
      "Weight": "778g",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-50GM-8001", "SN-SNY-50GM-8002"],
  },
  {
    id: "eq-9",
    name: "Sennheiser MKH 416 Shotgun Mic Kit",
    brand: "Sennheiser",
    category: "Audio",
    categorySlug: "audio",
    slug: "sennheiser-mkh-416",
    description:
      "Industry standard compact RF condenser interference tube shotgun mic with superb feedback rejection, Rycote blimp & boom pole.",
    dailyRateCents: 3900,
    depositCents: 20000,
    replacementValueCents: 99900,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Polar Pattern": "Supercardioid / Lobar",
      "Frequency": "40 Hz - 20,000 Hz",
      "Accessories": "Rycote Windshield Blimp + Carbon Boom",
      "Output": "3-pin XLR phantom powered",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-SNH-416-9001"],
  },
  // --- ADDITIONAL CAMERAS ---
  {
    id: "eq-10",
    name: "Sony A7R V Mirrorless Camera",
    brand: "Sony",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "sony-a7r-v",
    description:
      "61MP Full-Frame Exmor R sensor, AI autofocus processing unit, 8-stop image stabilization, 8K 24p video recording. Ideal for commercial stills and high-res cinema.",
    dailyRateCents: 10500,
    depositCents: 60000,
    replacementValueCents: 389800,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    sensor: "Full Frame 61MP",
    specs: {
      "Sensor": "61MP Full-Frame Exmor R BSI",
      "Autofocus": "AI-based real-time subject recognition",
      "Video": "8K 24p / 4K 60p 10-bit",
      "Stabilization": "8-stop 5-axis IBIS",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-A7R5-1101", "SN-SNY-A7R5-1102"],
  },
  {
    id: "eq-11",
    name: "Canon EOS C70 Cinema Camera",
    brand: "Canon",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "canon-eos-c70",
    description:
      "Super 35mm Dual Gain Output (DGO) sensor, 16+ stops dynamic range, 4K 120p, built-in motorized ND filters (up to 10 stops), dual mini-XLR audio inputs.",
    dailyRateCents: 12000,
    depositCents: 75000,
    replacementValueCents: 549900,
    imageUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    sensor: "Super 35 DGO",
    specs: {
      "Sensor": "Super 35mm DGO 4K",
      "Dynamic Range": "16+ stops (Canon Log 2)",
      "Built-in ND": "Motorized 2, 4, 6, 8, 10 stops",
      "Audio": "Dual Mini-XLR with phantom power",
    },
    availableUnits: 1,
    totalUnits: 2,
    serialNumbers: ["SN-CAN-C70-1201"],
  },
  {
    id: "eq-12",
    name: "RED Komodo-X 6K Cinema Camera",
    brand: "RED",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "red-komodo-x-6k",
    description:
      "6K 80p S35 global shutter sensor, locking RF lens mount, 12G-SDI 4K output, integrated micro V-lock battery plate. Uncompromising cinema capture.",
    dailyRateCents: 17500,
    depositCents: 100000,
    replacementValueCents: 999500,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    sensor: "Super 35 6K Global Shutter",
    specs: {
      "Sensor": "19.9MP Super 35 Global Shutter",
      "Frame Rates": "6K at 80fps, 4K at 120fps",
      "Media": "CFexpress Type B",
      "Output": "12G-SDI (4K 60p)",
    },
    availableUnits: 1,
    totalUnits: 1,
    serialNumbers: ["SN-RED-KOMX-1301"],
  },

  // --- ADDITIONAL LENSES ---
  {
    id: "eq-13",
    name: "Sony FE 16-35mm f/2.8 GM II",
    brand: "Sony",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sony-fe-16-35-gm2",
    description:
      "Ultra-wide fast zoom lens with four XD linear motors, reduced breathing, weather-sealed construction, and exceptional corner-to-corner clarity.",
    dailyRateCents: 5200,
    depositCents: 35000,
    replacementValueCents: 229800,
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Focal Length": "16-35mm ultra-wide",
      "Max Aperture": "f/2.8 constant",
      "Filter Size": "82mm",
      "Weight": "547g",
    },
    availableUnits: 3,
    totalUnits: 3,
    serialNumbers: ["SN-SNY-1635-1401", "SN-SNY-1635-1402"],
  },
  {
    id: "eq-14",
    name: "Canon RF 24-70mm f/2.8 L IS USM",
    brand: "Canon",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "canon-rf-24-70-f28",
    description:
      "The benchmark standard zoom for Canon RF systems featuring 5-stop image stabilization, Nano USM focus, and custom control ring.",
    dailyRateCents: 5500,
    depositCents: 35000,
    replacementValueCents: 239900,
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    specs: {
      "Mount": "Canon RF mount",
      "Focal Length": "24-70mm",
      "Max Aperture": "f/2.8 constant",
      "Stabilization": "5 stops optical IS",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-CAN-2470-1501", "SN-CAN-2470-1502"],
  },
  {
    id: "eq-15",
    name: "Canon RF 70-200mm f/2.8 L IS USM",
    brand: "Canon",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "canon-rf-70-200-f28",
    description:
      "Compact retracting telephoto zoom with dual Nano USM motors, 5 stops of IS, and legendary L-series weather sealing.",
    dailyRateCents: 6500,
    depositCents: 40000,
    replacementValueCents: 279900,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    specs: {
      "Mount": "Canon RF mount",
      "Focal Length": "70-200mm",
      "Max Aperture": "f/2.8 constant",
      "Weight": "1070g (ultra-compact)",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-CAN-7020-1601"],
  },

  // --- DRONES ---
  {
    id: "eq-16",
    name: "DJI Inspire 3 8K Cinema Drone Combo",
    brand: "DJI",
    category: "Drones",
    categorySlug: "drones",
    slug: "dji-inspire-3-combo",
    description:
      "Full-frame 8K ProRes RAW and CinemaDNG aerial system. Centimeter-level RTK positioning, 360° pan & tilt gimbal, dual-operator control with RC Plus.",
    dailyRateCents: 35000,
    depositCents: 200000,
    replacementValueCents: 1649900,
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Camera": "Full-Frame 8K/75fps ProRes RAW",
      "Gimbal": "360° pan & tilt dual-operator",
      "Flight Time": "Up to 28 mins per dual TB51 pair",
      "Positioning": "RTK centimeter precision",
    },
    availableUnits: 1,
    totalUnits: 1,
    serialNumbers: ["SN-DJI-INS3-1701"],
  },
  {
    id: "eq-17",
    name: "DJI Mavic 3 Pro Cine Combo",
    brand: "DJI",
    category: "Drones",
    categorySlug: "drones",
    slug: "dji-mavic-3-pro-cine",
    description:
      "Triple-camera aerial system with 4/3 CMOS Hasselblad camera (5.1K Apple ProRes 422 HQ), 70mm medium tele, and 166mm telephoto. Built-in 1TB SSD.",
    dailyRateCents: 14000,
    depositCents: 75000,
    replacementValueCents: 389900,
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Cameras": "Hasselblad 4/3 + 70mm + 166mm",
      "Video Codec": "Apple ProRes 422 HQ / D-Log",
      "Flight Time": "43 minutes per battery",
      "Internal Storage": "1TB SSD built-in",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-DJI-M3PC-1801", "SN-DJI-M3PC-1802"],
  },
  {
    id: "eq-18",
    name: "DJI Mini 4 Pro Fly More Combo Plus",
    brand: "DJI",
    category: "Drones",
    categorySlug: "drones",
    slug: "dji-mini-4-pro-combo",
    description:
      "Sub-249g ultra-portable drone with omnidirectional active obstacle sensing, 4K 60p HDR video, true vertical shooting for social formats, 3 batteries included.",
    dailyRateCents: 5500,
    depositCents: 30000,
    replacementValueCents: 115900,
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Weight": "Under 249g (travel compliant)",
      "Video": "4K 60p HDR / True Vertical",
      "Safety": "Omnidirectional active obstacle sensing",
      "Flight Time": "45 mins with Plus batteries",
    },
    availableUnits: 3,
    totalUnits: 3,
    serialNumbers: ["SN-DJI-MN4P-1901", "SN-DJI-MN4P-1902"],
  },

  // --- ADDITIONAL GIMBALS & CAMERA SUPPORT ---
  {
    id: "eq-19",
    name: "DJI RS 4 Pro Commercial Gimbal",
    brand: "DJI",
    category: "Support",
    categorySlug: "support",
    slug: "dji-rs-4-pro",
    description:
      "Next-generation commercial stabilizer with 2nd-gen automated axis locks, Teflon-coated carbon arms, 4.5kg payload, and native Car Mount algorithm.",
    dailyRateCents: 5500,
    depositCents: 30000,
    replacementValueCents: 109900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Payload": "4.5 kg / 10 lbs capacity",
      "Motor Torque": "20% increase over RS 3 Pro",
      "Axis Locks": "Automated 2nd generation",
      "Ecosystem": "LiDAR autofocus & Transmission ready",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-DJI-RS4P-2001", "SN-DJI-RS4P-2002"],
  },
  {
    id: "eq-20",
    name: "DJI Ronin 4D 6K Cinema Camera Combo",
    brand: "DJI",
    category: "Support",
    categorySlug: "support",
    slug: "dji-ronin-4d-6k",
    description:
      "Revolutionary 4-axis motorized cinema camera. Full-frame 6K ProRes capture, integrated Z-axis stabilization to eliminate vertical walking shake, and LiDAR focus.",
    dailyRateCents: 19500,
    depositCents: 120000,
    replacementValueCents: 679900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    mount: "DJI DL / Sony E (adapter)",
    sensor: "Full Frame 6K",
    specs: {
      "Axis Stabilization": "4-axis motorized (X, Y, Z, Roll)",
      "Sensor": "Full-Frame Zenmuse X9-6K",
      "Video": "6K 60p ProRes RAW / 4K 120p",
      "Focusing": "LiDAR Range Finder with automated tracking",
    },
    availableUnits: 1,
    totalUnits: 1,
    serialNumbers: ["SN-DJI-R4D6-2101"],
  },
  {
    id: "eq-21",
    name: "Easyrig Vario 5 with Stabil G2 Vest",
    brand: "Easyrig",
    category: "Support",
    categorySlug: "support",
    slug: "easyrig-vario-5-stabil",
    description:
      "Ergonomic camera support rig adjustable for 5 to 17 kg setups. Transfers camera weight to the hips while the Stabil G2 arm absorbs walking vibration.",
    dailyRateCents: 6500,
    depositCents: 40000,
    replacementValueCents: 389900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Payload Range": "5 to 17 kg (11 to 38 lbs)",
      "Shock Absorption": "Stabil G2 mechanical spring arm",
      "Vest": "Cinema 3 breathable padded vest",
      "Compatibility": "Handheld, gimbals, cinema rigs",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-ERG-VR5-2201", "SN-ERG-VR5-2202"],
  },

  // --- ADDITIONAL CAMERAS (EXPANDED) ---
  {
    id: "eq-22",
    name: "Canon EOS R5 Mark II",
    brand: "Canon",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "canon-eos-r5-ii",
    description:
      "45MP back-illuminated stacked CMOS sensor, 8.5-stop coordinated control IS, 8K 60p RAW, Eye Control AF, and DIGIC Accelerator processing engine.",
    dailyRateCents: 11500,
    depositCents: 65000,
    replacementValueCents: 429900,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    sensor: "Full Frame 45MP Stacked",
    specs: {
      "Sensor": "45MP Full-Frame Stacked BSI",
      "Video": "8K 60p RAW / 4K 120p 10-bit",
      "Autofocus": "Dual Pixel Intelligent AF with Eye Control",
      "Burst": "30 fps electronic shutter",
      "Battery": "LP-E6P",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-CAN-R5M2-2301", "SN-CAN-R5M2-2302"],
  },
  {
    id: "eq-23",
    name: "Blackmagic Cinema Camera 6K",
    brand: "Blackmagic",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "blackmagic-cinema-6k",
    description:
      "Full-frame 6K 6048 x 4032 sensor with open gate 3:2, L-mount, dual native ISO up to 25,600, 13 stops dynamic range, and recording to CFexpress Type B or external USB-C drives.",
    dailyRateCents: 9500,
    depositCents: 50000,
    replacementValueCents: 259500,
    imageUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80",
    mount: "L-Mount",
    sensor: "Full Frame 6K Open Gate",
    specs: {
      "Sensor": "Full-Frame 24x36mm 6K Sensor",
      "Resolution": "6048 x 4032 (Open Gate 3:2)",
      "Dynamic Range": "13 stops, Dual Native ISO",
      "Media": "CFexpress Type B & USB-C SSD",
      "Audio": "Dual Mini-XLR inputs",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-BMD-CC6K-2401", "SN-BMD-CC6K-2402"],
  },
  {
    id: "eq-24",
    name: "Sony FX6 Cinema Line Camera",
    brand: "Sony",
    category: "Cameras",
    categorySlug: "cameras",
    slug: "sony-fx6-cinema",
    description:
      "Full-Frame 4K 120p sensor with 15+ stops dynamic range, electronic variable ND (1/4 to 1/128), modular body with smart grip and smart handle, 12G-SDI output.",
    dailyRateCents: 16500,
    depositCents: 95000,
    replacementValueCents: 599800,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    sensor: "Full Frame 10.2MP BSI",
    specs: {
      "Sensor": "Full-Frame 10.2MP Exmor R",
      "Built-in ND": "Electronic Variable ND 1/4 to 1/128",
      "Output": "12G-SDI & HDMI 4K 60p 16-bit RAW",
      "ISO": "Dual Base ISO 800 / 12,800",
      "Audio": "Dual XLR inputs on handle",
    },
    availableUnits: 1,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-FX6-2501"],
  },

  // --- ADDITIONAL LENSES (EXPANDED) ---
  {
    id: "eq-25",
    name: "Canon RF 50mm f/1.2 L USM",
    brand: "Canon",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "canon-rf-50-f12",
    description:
      "Renowned standard prime for Canon RF mount delivering unprecedented sharpness wide open at f/1.2, dreamy background blur, and weather-sealed L-series housing.",
    dailyRateCents: 4800,
    depositCents: 30000,
    replacementValueCents: 229900,
    imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80",
    mount: "Canon RF",
    specs: {
      "Mount": "Canon RF mount",
      "Focal Length": "50mm prime",
      "Max Aperture": "f/1.2 (10-blade diaphragm)",
      "Motor": "Ring-type Ultrasonic Motor (USM)",
      "Filter Size": "95mm",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-CAN-50RF-2601", "SN-CAN-50RF-2602"],
  },
  {
    id: "eq-26",
    name: "Sony FE 200-600mm f/5.6-6.3 G OSS",
    brand: "Sony",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sony-fe-200-600-g",
    description:
      "Internal zoom super-telephoto lens designed for sports, aviation, and wildlife cinematography with 5-axis Optical SteadyShot and 1.4x/2.0x teleconverter compatibility.",
    dailyRateCents: 5800,
    depositCents: 35000,
    replacementValueCents: 199800,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Focal Range": "200-600mm super-telephoto",
      "Zoom Mechanism": "Internal zoom (fixed barrel length)",
      "Stabilization": "Optical SteadyShot (3 modes)",
      "Filter Size": "95mm",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-SNY-2006-2701", "SN-SNY-2006-2702"],
  },
  {
    id: "eq-27",
    name: "Sigma 24-70mm f/2.8 DG DN II Art",
    brand: "Sigma",
    category: "Lenses",
    categorySlug: "lenses",
    slug: "sigma-24-70-art-ii",
    description:
      "Redesigned Art-series standard zoom lens for Sony E-mount. 7% smaller and 10% lighter, HLA linear motor focus, aperture ring with click-switch and de-click.",
    dailyRateCents: 3800,
    depositCents: 25000,
    replacementValueCents: 119900,
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    mount: "Sony E",
    specs: {
      "Mount": "Sony E-mount",
      "Focal Length": "24-70mm",
      "Max Aperture": "f/2.8 constant",
      "Aperture Ring": "De-clickable for video",
      "Weight": "745g",
    },
    availableUnits: 3,
    totalUnits: 3,
    serialNumbers: ["SN-SIG-2470-2801", "SN-SIG-2470-2802", "SN-SIG-2470-2803"],
  },

  // --- ADDITIONAL DRONES (EXPANDED) ---
  {
    id: "eq-28",
    name: "DJI Avata 2 FPV Fly More Combo",
    brand: "DJI",
    category: "Drones",
    categorySlug: "drones",
    slug: "dji-avata-2-fpv",
    description:
      "Immersive first-person-view cinema drone paired with DJI Goggles 3 and RC Motion 3. 1/1.3-inch sensor, 4K 60p HDR ultra-wide 155° FOV, integrated propeller guards.",
    dailyRateCents: 6800,
    depositCents: 35000,
    replacementValueCents: 119900,
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Camera": "1/1.3-inch 4K 60p HDR (155° FOV)",
      "Transmission": "DJI O4 (up to 13km range)",
      "Headset": "DJI Goggles 3 with Real View PiP",
      "Safety": "Built-in propeller guards, turtle mode",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-DJI-AV2-2901", "SN-DJI-AV2-2902"],
  },

  // --- ADDITIONAL GIMBALS & SUPPORT (EXPANDED) ---
  {
    id: "eq-29",
    name: "Zhiyun Crane 4 Gimbal Combo",
    brand: "Zhiyun",
    category: "Support",
    categorySlug: "support",
    slug: "zhiyun-crane-4-combo",
    description:
      "Heavy-duty handheld 3-axis stabilizer with built-in 10W bi-color fill light, 1.22-inch color touchscreen, balance indicator motor lights, and ergonomic wrist rest.",
    dailyRateCents: 4200,
    depositCents: 25000,
    replacementValueCents: 74900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Payload": "Up to 5.0 kg / 11 lbs",
      "Fill Light": "Built-in 10W bi-color (2700-5500K)",
      "Screen": "1.22\" interactive color touchscreen",
      "Run Time": "Up to 12 hours with PD fast charging",
    },
    availableUnits: 2,
    totalUnits: 2,
    serialNumbers: ["SN-ZHY-CR4-3001", "SN-ZHY-CR4-3002"],
  },
  {
    id: "eq-30",
    name: "DJI RS 3 Mini Travel Gimbal",
    brand: "DJI",
    category: "Support",
    categorySlug: "support",
    slug: "dji-rs-3-mini",
    description:
      "Ultra-compact 795g stabilizer tailored for mirrorless setups up to 2kg payload. Native vertical shooting without extra accessories, Bluetooth shutter control.",
    dailyRateCents: 3200,
    depositCents: 20000,
    replacementValueCents: 36900,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    specs: {
      "Gimbal Weight": "795g / 1.75 lbs (ultra-light)",
      "Payload": "2.0 kg / 4.4 lbs capacity",
      "Vertical Mode": "Native vertical shooting without brackets",
      "Control": "Wireless Bluetooth shutter control",
    },
    availableUnits: 3,
    totalUnits: 3,
    serialNumbers: ["SN-DJI-RS3M-3101", "SN-DJI-RS3M-3102", "SN-DJI-RS3M-3103"],
  },
];

export const MOCK_KITS: CuratedKit[] = [
  {
    id: "kit-1",
    name: "Wedding Photography Pro Kit",
    slug: "wedding-photography-kit",
    shootType: "Wedding",
    description:
      "Everything needed for an emotional, high-stakes wedding day: 33MP high-speed Sony A7 IV, the versatile 24-70mm f/2.8 GM II for group photos and reception, and the telephoto 70-200mm f/2.8 GM II for unobtrusive ceremony vows.",
    bundleDiscountPercent: 15,
    dailyRateCents: 17400,
    originalDailyRateCents: 20500,
    depositCents: 65000,
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Sony A7 IV Body",
        brand: "Sony",
        role: "Primary Camera Body",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "FE 24-70mm f/2.8 GM II",
        brand: "Sony",
        role: "Reception & Portraits Zoom",
        imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "FE 70-200mm f/2.8 GM II",
        brand: "Sony",
        role: "Ceremony & Telephoto Vows",
        imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "kit-2",
    name: "Short-Film Production Cinema Kit",
    slug: "short-film-cinema-kit",
    shootType: "Short-film",
    description:
      "A complete narrative indie filmmaking setup: 4K 10-bit camera body, fast zoom glass, professional 3-axis gimbal stabilizer, and punchy 300W continuous key light with Bowens mount.",
    bundleDiscountPercent: 20,
    dailyRateCents: 18400,
    originalDailyRateCents: 23000,
    depositCents: 75000,
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Sony A7 IV Body",
        brand: "Sony",
        role: "4K 60p 10-bit Camera",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "FE 24-70mm f/2.8 GM II",
        brand: "Sony",
        role: "Cinematic Standard Zoom",
        imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "DJI RS 3 Pro Gimbal",
        brand: "DJI",
        role: "3-Axis Carbon Gimbal",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Aputure C300d II Light",
        brand: "Aputure",
        role: "Key Lighting Fixture",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "kit-3",
    name: "Commercial Product Photography Kit",
    slug: "product-photography-kit",
    shootType: "Product",
    description:
      "Razor-sharp macro and standard coverage with studio-grade continuous illumination for crisp e-commerce and commercial product catalogs.",
    bundleDiscountPercent: 15,
    dailyRateCents: 15700,
    originalDailyRateCents: 18500,
    depositCents: 60000,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Sony A7 IV Body",
        brand: "Sony",
        role: "33MP Detail Resolution",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "FE 24-70mm f/2.8 GM II",
        brand: "Sony",
        role: "Sharp Tabletop Zoom",
        imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Aputure C300d II Light",
        brand: "Aputure",
        role: "Constant High CRI Key",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "kit-4",
    name: "Interview & Podcast Two-Person Kit",
    slug: "podcast-recording-kit",
    shootType: "Podcast",
    description:
      "Broadcast-grade dual lavalier wireless 32-bit float audio paired with 4K multi-angle capture and flattering soft lighting.",
    bundleDiscountPercent: 18,
    dailyRateCents: 13500,
    originalDailyRateCents: 16500,
    depositCents: 45000,
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Sony A7 IV Body",
        brand: "Sony",
        role: "4K Host Camera",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "RØDE Wireless PRO",
        brand: "RØDE",
        role: "Dual 32-bit Float Audio",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Aputure C300d II Light",
        brand: "Aputure",
        role: "Soft Interview Lighting",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "kit-5",
    name: "Aerial Cinema & Ground Gimbal Production Kit",
    slug: "aerial-cinema-gimbal-kit",
    shootType: "Short-film",
    description:
      "The complete high-altitude and ground-stabilized production package: DJI Mavic 3 Pro Cine with 5.1K Apple ProRes 422 HQ, DJI RS 4 Pro stabilizer, and Sony FX3 Cinema Line body.",
    bundleDiscountPercent: 20,
    dailyRateCents: 24800,
    originalDailyRateCents: 31000,
    depositCents: 90000,
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "DJI Mavic 3 Pro Cine",
        brand: "DJI",
        role: "5.1K Apple ProRes Aerial Drone",
        imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "Sony FX3 Cinema Camera",
        brand: "Sony",
        role: "Ground Cinema Body",
        imageUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "DJI RS 4 Pro Gimbal",
        brand: "DJI",
        role: "Commercial Stabilizer",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

export const MOCK_STAFF_TASKS: StaffTask[] = [
  {
    id: "task-1",
    bookingRef: "LL-1042",
    customerName: "Alex Rivera",
    customerPhone: "+1 (415) 555-0192",
    scheduledTime: "09:00 AM",
    type: "PREPARE",
    status: "PENDING",
    equipmentList: [
      { name: "Sony A7 IV Body", serialNumber: "SN-SNY-A74-1001", checked: true },
      { name: "FE 24-70mm f/2.8 GM II", serialNumber: "SN-SNY-2470-2001", checked: true },
      { name: "2x NP-FZ100 Batteries (Full Charge)", serialNumber: "ACC-BAT-882", checked: false },
    ],
  },
  {
    id: "task-2",
    bookingRef: "LL-1043",
    customerName: "Samira Patel",
    customerPhone: "+1 (415) 555-0144",
    scheduledTime: "11:00 AM",
    type: "HANDOVER",
    status: "PENDING",
    equipmentList: [
      { name: "DJI RS 3 Pro Gimbal", serialNumber: "SN-DJI-RS3P-5001", checked: true },
      { name: "Aputure C300d II Light", serialNumber: "SN-APT-300D-4001", checked: true },
    ],
  },
  {
    id: "task-3",
    bookingRef: "LL-1031",
    customerName: "Jamie Vance",
    customerPhone: "+1 (415) 555-0188",
    scheduledTime: "04:00 PM",
    type: "INSPECT",
    status: "IN_PROGRESS",
    equipmentList: [
      { name: "Sony FE 70-200mm f/2.8 GM II", serialNumber: "SN-SNY-7020-3001", checked: false },
      { name: "Lens Hood & 77mm Front Cap", serialNumber: "ACC-CAP-7701", checked: false },
    ],
  },
  {
    id: "task-4",
    bookingRef: "LL-1028",
    customerName: "Marcus Sterling",
    customerPhone: "+1 (415) 555-0122",
    scheduledTime: "Yesterday (18:00)",
    type: "OVERDUE",
    status: "PENDING",
    equipmentList: [
      { name: "Sony A7 IV Body", serialNumber: "SN-SNY-A74-1002", checked: false },
    ],
  },
];
