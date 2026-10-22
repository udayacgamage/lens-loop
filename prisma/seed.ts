import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding LensLoop database...");

  // 1. Locations
  const mainHub = await db.location.upsert({
    where: { code: "SOMA-MAIN" },
    update: {},
    create: {
      name: "LensLoop Downtown Hub",
      code: "SOMA-MAIN",
      address: "450 Mission St, Suite 120",
      city: "San Francisco",
      timezone: "America/Los_Angeles",
      openingHours: "Mon-Sat: 08:00 - 19:00, Sun: 10:00 - 17:00",
      isActive: true,
    },
  });

  // 2. Users (Admin, Staff, Customer)
  const staff = await db.user.upsert({
    where: { email: "staff@lensloop.io" },
    update: {},
    create: {
      email: "staff@lensloop.io",
      name: "Alex Staff",
      role: "STAFF",
      phone: "+14155552671",
    },
  });

  const customer = await db.user.upsert({
    where: { email: "director@shoot.com" },
    update: {},
    create: {
      email: "director@shoot.com",
      name: "Jamie Chen",
      role: "CUSTOMER",
      phone: "+14155559823",
      customerProfile: {
        create: {
          idVerification: "VERIFIED",
          city: "San Francisco",
          address: "742 Evergreen Terrace",
          emergencyContact: "+14155550000",
        },
      },
    },
  });

  // 3. Categories
  const catCameras = await db.category.upsert({
    where: { slug: "cameras" },
    update: {},
    create: {
      name: "Cameras",
      slug: "cameras",
      description: "Full-frame mirrorless, cinema cameras, and medium format bodies",
      icon: "camera",
    },
  });

  const catLenses = await db.category.upsert({
    where: { slug: "lenses" },
    update: {},
    create: {
      name: "Lenses",
      slug: "lenses",
      description: "Fast primes, versatile zooms, and anamorphic cinema glass",
      icon: "disc",
    },
  });

  const catLighting = await db.category.upsert({
    where: { slug: "lighting" },
    update: {},
    create: {
      name: "Lighting & Modifiers",
      slug: "lighting",
      description: "Bi-color and RGB continuous LED lights, softboxes, and stands",
      icon: "sun",
    },
  });

  const catAudio = await db.category.upsert({
    where: { slug: "audio" },
    update: {},
    create: {
      name: "Audio & Microphones",
      slug: "audio",
      description: "Wireless dual-channel systems, shotgun mics, and field recorders",
      icon: "mic",
    },
  });

  const catSupport = await db.category.upsert({
    where: { slug: "support" },
    update: {},
    create: {
      name: "Gimbals & Support",
      slug: "support",
      description: "3-axis gimbals, heavy-duty tripods, and cage rigs",
      icon: "sliders",
    },
  });

  // 4. Equipment Models & Physical Units
  // Model A: Sony A7 IV
  const sonyA7IV = await db.equipmentModel.upsert({
    where: { slug: "sony-a7-iv" },
    update: {},
    create: {
      name: "Sony A7 IV",
      slug: "sony-a7-iv",
      brand: "Sony",
      categoryId: catCameras.id,
      description:
        "33MP full-frame Exmor R CMOS sensor, 4K 60p 10-bit 4:2:2 video, next-gen real-time autofocus. The ultimate hybrid workhorse.",
      dailyRateCents: 8500, // $85/day
      depositCents: 50000, // $500 hold
      replacementValueCents: 249800,
      turnaroundMinutes: 120,
      specs: {
        mount: "Sony E",
        sensor: "Full Frame 33MP",
        maxResolution: "4K 60p 10-bit 4:2:2",
        media: "CFexpress Type A / SD UHS-II (dual)",
        battery: "NP-FZ100",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
            altText: "Sony A7 IV Camera Body",
            isPrimary: true,
            displayOrder: 0,
          },
        ],
      },
    },
  });

  // Physical units for Sony A7 IV
  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-SNY-A74-1001" },
    update: {},
    create: {
      modelId: sonyA7IV.id,
      locationId: mainHub.id,
      serialNumber: "SN-SNY-A74-1001",
      qrCode: "QR-SNY-A74-1001",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });
  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-SNY-A74-1002" },
    update: {},
    create: {
      modelId: sonyA7IV.id,
      locationId: mainHub.id,
      serialNumber: "SN-SNY-A74-1002",
      qrCode: "QR-SNY-A74-1002",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });

  // Model B: Sony FE 24-70mm f/2.8 GM II
  const sony2470GM = await db.equipmentModel.upsert({
    where: { slug: "sony-fe-24-70-gm2" },
    update: {},
    create: {
      name: "Sony FE 24-70mm f/2.8 GM II",
      slug: "sony-fe-24-70-gm2",
      brand: "Sony",
      categoryId: catLenses.id,
      description:
        "Ultra-light standard zoom with corner-to-corner sharpness, constant f/2.8 aperture, and high-speed XD Linear AF motors.",
      dailyRateCents: 5500, // $55/day
      depositCents: 35000,
      replacementValueCents: 229800,
      turnaroundMinutes: 60,
      specs: {
        mount: "Sony E",
        focalLength: "24-70mm",
        maxAperture: "f/2.8",
        filterThread: "82mm",
        weight: "695g",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1000&q=80",
            altText: "Sony 24-70mm GM II Lens",
            isPrimary: true,
            displayOrder: 0,
          },
        ],
      },
    },
  });

  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-SNY-2470-2001" },
    update: {},
    create: {
      modelId: sony2470GM.id,
      locationId: mainHub.id,
      serialNumber: "SN-SNY-2470-2001",
      qrCode: "QR-SNY-2470-2001",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });

  // Model C: Sony FE 70-200mm f/2.8 GM OSS II
  const sony70200GM = await db.equipmentModel.upsert({
    where: { slug: "sony-fe-70-200-gm2" },
    update: {},
    create: {
      name: "Sony FE 70-200mm f/2.8 GM OSS II",
      slug: "sony-fe-70-200-gm2",
      brand: "Sony",
      categoryId: catLenses.id,
      description:
        "The gold standard telephoto zoom with optical image stabilization, creamy bokeh, and lightning-fast autofocus.",
      dailyRateCents: 6500, // $65/day
      depositCents: 40000,
      replacementValueCents: 279800,
      turnaroundMinutes: 60,
      specs: {
        mount: "Sony E",
        focalLength: "70-200mm",
        maxAperture: "f/2.8",
        filterThread: "77mm",
        weight: "1045g",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80",
            altText: "Sony 70-200mm GM II Telephoto Lens",
            isPrimary: true,
            displayOrder: 0,
          },
        ],
      },
    },
  });

  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-SNY-7020-3001" },
    update: {},
    create: {
      modelId: sony70200GM.id,
      locationId: mainHub.id,
      serialNumber: "SN-SNY-7020-3001",
      qrCode: "QR-SNY-7020-3001",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });

  // Model D: Aputure 300d II Light
  const aputure300d = await db.equipmentModel.upsert({
    where: { slug: "aputure-300d-ii" },
    update: {},
    create: {
      name: "Aputure Light Storm C300d II",
      slug: "aputure-300d-ii",
      brand: "Aputure",
      categoryId: catLighting.id,
      description:
        "Daylight-balanced 5500K point-source LED fixture with 20% more output than original, robust control box, and Bowens mount.",
      dailyRateCents: 4500, // $45/day
      depositCents: 25000,
      replacementValueCents: 109900,
      turnaroundMinutes: 60,
      specs: {
        mount: "Bowens Mount",
        colorTemp: "5500K Daylight",
        dimming: "0-100% stepless",
        cri: "96+",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
            altText: "Aputure 300d II Studio Light",
            isPrimary: true,
            displayOrder: 0,
          },
        ],
      },
    },
  });

  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-APT-300D-4001" },
    update: {},
    create: {
      modelId: aputure300d.id,
      locationId: mainHub.id,
      serialNumber: "SN-APT-300D-4001",
      qrCode: "QR-APT-300D-4001",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });

  // Model E: DJI RS 3 Pro Gimbal
  const djiRS3Pro = await db.equipmentModel.upsert({
    where: { slug: "dji-rs-3-pro" },
    update: {},
    create: {
      name: "DJI RS 3 Pro Gimbal Stabilizer",
      slug: "dji-rs-3-pro",
      brand: "DJI",
      categoryId: catSupport.id,
      description:
        "Extended carbon fiber axis arms, automated axis locks, 4.5kg tested payload, SuperSmooth mode for ultra-stable cinematic shots.",
      dailyRateCents: 4500, // $45/day
      depositCents: 25000,
      replacementValueCents: 86900,
      turnaroundMinutes: 60,
      specs: {
        payload: "4.5 kg / 10 lbs",
        weight: "1.5 kg",
        batteryLife: "12 hours",
        connection: "Bluetooth 5.0 / USB-C",
      },
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
            altText: "DJI RS 3 Pro Gimbal",
            isPrimary: true,
            displayOrder: 0,
          },
        ],
      },
    },
  });

  await db.equipmentUnit.upsert({
    where: { serialNumber: "SN-DJI-RS3P-5001" },
    update: {},
    create: {
      modelId: djiRS3Pro.id,
      locationId: mainHub.id,
      serialNumber: "SN-DJI-RS3P-5001",
      qrCode: "QR-DJI-RS3P-5001",
      conditionStatus: "EXCELLENT",
      status: "AVAILABLE",
    },
  });

  // 5. Compatibility Rules
  // Sony A7 IV accepts Sony E-mount lenses
  await db.compatibilityRule.upsert({
    where: {
      sourceModelId_targetModelId_relationType: {
        sourceModelId: sonyA7IV.id,
        targetModelId: sony2470GM.id,
        relationType: "ACCEPTS_LENS",
      },
    },
    update: {},
    create: {
      sourceModelId: sonyA7IV.id,
      targetModelId: sony2470GM.id,
      relationType: "ACCEPTS_LENS",
      notes: "Native Sony E mount full-frame compatible",
    },
  });

  await db.compatibilityRule.upsert({
    where: {
      sourceModelId_targetModelId_relationType: {
        sourceModelId: sonyA7IV.id,
        targetModelId: sony70200GM.id,
        relationType: "ACCEPTS_LENS",
      },
    },
    update: {},
    create: {
      sourceModelId: sonyA7IV.id,
      targetModelId: sony70200GM.id,
      relationType: "ACCEPTS_LENS",
      notes: "Native Sony E mount full-frame compatible",
    },
  });

  // 6. Curated Kits (Wedding, Wildlife, Product, Podcast, Short-film)
  const weddingKit = await db.kit.upsert({
    where: { slug: "wedding-photography-kit" },
    update: {},
    create: {
      name: "Wedding Photography Pro Kit",
      slug: "wedding-photography-kit",
      shootType: "Wedding",
      description:
        "Complete dual-lens setup with the high-resolution Sony A7 IV, versatile 24-70mm f/2.8 GM II for ceremony and portraits, and 70-200mm f/2.8 GM II for candid vows from a distance.",
      bundleDiscountPercent: 15,
      dailyRateCents: 17400, // Discounted from $205/day to $174/day
      items: {
        create: [
          { modelId: sonyA7IV.id, quantity: 1 },
          { modelId: sony2470GM.id, quantity: 1 },
          { modelId: sony70200GM.id, quantity: 1 },
        ],
      },
    },
  });

  const shortFilmKit = await db.kit.upsert({
    where: { slug: "short-film-cinema-kit" },
    update: {},
    create: {
      name: "Short-Film Production Kit",
      slug: "short-film-cinema-kit",
      shootType: "Short-film",
      description:
        "Cinematic narrative package featuring Sony A7 IV 10-bit 4:2:2, 24-70mm f/2.8 zoom, DJI RS 3 Pro 3-axis stabilizer, and high-output Aputure continuous light.",
      bundleDiscountPercent: 20,
      dailyRateCents: 18400, // $184/day
      items: {
        create: [
          { modelId: sonyA7IV.id, quantity: 1 },
          { modelId: sony2470GM.id, quantity: 1 },
          { modelId: djiRS3Pro.id, quantity: 1 },
          { modelId: aputure300d.id, quantity: 1 },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
  console.log(`- Created location: ${mainHub.name}`);
  console.log(`- Created users: ${staff.email}, ${customer.email}`);
  console.log(`- Created kits: ${weddingKit.name}, ${shortFilmKit.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
