# LensLoop — Automated Camera & Production Gear Rental Platform

LensLoop is an automated, professional camera and cinema equipment rental platform built with modern web technologies. It is engineered with serial-number inventory tracking, 15-minute checkout hold allocations, separate security deposit pre-authorizations, smart equipment compatibility validation, QR-based digital handovers, and operations management.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Utilitarian, cinema-grade design system)
- **Database & ORM**: PostgreSQL with Prisma 7 (`@prisma/adapter-pg` driver adapter)
- **Icons**: Lucide React
- **Verification**: Fully validated with `npm run build` and `tsc --noEmit`

---

## ✨ Core Features

1. **Category Finder & Precision Filters**
   - Fast categorization for Cameras, Lenses, Drones, Gimbals & Support, Lighting, and Audio.
   - Quick-filtering by industry brands (Sony, Canon, DJI, RED, Blackmagic, Sigma, Zhiyun, Easyrig, Aputure, RØDE, Sennheiser).

2. **Rules-Based Shoot Builder**
   - Automatically validates lens mounts (Sony E, Canon RF, L-Mount), payload limits, audio synchronization, and lighting requirements against shoot requirements (Wedding, Short-film, Commercial/Product, Podcast).
   - Computes daily rental costs and warns about missing kit essentials.

3. **Curated Production Kits**
   - Pre-tested, multi-item cinema and photo kits with bundle discount pricing.
   - Includes wedding packages, indie short-film kits, e-commerce setups, and aerial filmmaking bundles.

4. **15-Minute Checkout Holds & Transparent Pricing**
   - Prevents double-booking with real-time hold countdowns during checkout.
   - Clear breakdown separating daily rental fees from refundable security deposits.

5. **Staff Hub & QR Code Equipment Handover**
   - Today's operational dispatch worklist (Prepare, Handover, Inspect, Return).
   - Single-use digital token verification and condition checklist for equipment checkout and return.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/udayacgamage/lens-loop.git
   cd lens-loop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL with your PostgreSQL connection string
   ```

4. Initialize database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Build & Typecheck

```bash
npm run build
npx tsc --noEmit
```

---

## 📄 License

MIT
