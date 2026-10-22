**LensLoop** is a camera equipment rental platform that automates availability, booking, payment, reminders, pickup records, returns, and maintenance scheduling.

This plan assumes **one rental business with its own equipment**, a customer website, and a staff dashboard. A marketplace with independent equipment owners can be a later expansion.

## 1. Product concept

**Promise:** “Find the right gear, book your dates, and get ready to shoot.”

Customers can book individual items or choose a ready-made kit:

- Wedding photography kit
- Wildlife photography kit
- Product photography kit
- Podcast recording kit
- Short-film kit

Your distinctive feature is **Shoot Builder**: customers enter their shoot type, dates, budget, and existing camera. The system recommends available equipment that works together.

Start with rules for compatibility and kit selection. AI can later help interpret requests such as “I’m filming an interview indoors.”

## 2. User roles

| Role | Main capabilities |
|---|---|
| Customer | Browse gear, book, pay, collect, request extensions, and return |
| Staff | Prepare orders, scan equipment, record handovers, and inspect returns |
| Administrator | Manage inventory, prices, policies, users, refunds, and reports |

Enforce permissions on the server. Staff should access only the customer information needed for their work.

## 3. Customer website design

Use a clean, photography-focused interface with large equipment photos, clear prices, and prominent availability.

**Visual direction**

| Element | Design |
|---|---|
| Main background | Off-white `#F8FAFC` |
| Text | Dark navy `#0F172A` |
| Primary action | Violet `#7C3AED` |
| Success | Green `#15803D` |
| Warning | Amber `#B45309` |
| Typography | Inter or a similar readable sans-serif |
| Components | Rounded cards, clear borders, spacious layouts |
| Photography | Consistent product images on neutral backgrounds |

Use accessible contrast, visible keyboard focus, and text labels alongside status colors.

### Main screens

| Screen | Layout and content | Primary action |
|---|---|---|
| **Home** | Hero, date/location search, shoot types, featured kits, rental process | Find equipment |
| **Browse gear** | Search, filters, equipment grid, date selector | View available gear |
| **Equipment details** | Photos, specifications, included accessories, compatibility, rental price | Add to booking |
| **Shoot Builder** | Shoot type → dates → budget → suggested kit | Customize kit |
| **Cart** | Equipment, dates, pricing breakdown, deposit, pickup details | Continue |
| **Checkout** | Customer details, verification if required, agreement, payment | Confirm and pay |
| **Booking confirmation** | Booking reference, pickup instructions, checklist | View booking |
| **My rentals** | Upcoming, active, and completed rentals | Manage rental |
| **Rental details** | Status timeline, equipment, payment details, pickup credential | Request extension |
| **Support** | Booking-linked questions and issue reporting | Contact support |

**Equipment card example**

```text
┌─────────────────────────────┐
│        Camera image         │
│                             │
│ Sony A7 IV                  │
│ Mirrorless · Full frame     │
│                             │
│ Available for your dates    │
│ [daily price] / day         │
│                             │
│       [ View equipment ]    │
└─────────────────────────────┘
```

Show the complete rental price and deposit separately before payment. Avoid surprising users with fees at checkout.

## 4. Staff dashboard design

Use a left navigation sidebar and a main work area:

```text
┌───────────────┬──────────────────────────────────────────┐
│ LensLoop      │ Today                         Search     │
│               ├──────────────────────────────────────────┤
│ Overview      │ Pickups   Returns   Overdue   Inspection │
│ Bookings      ├──────────────────────────────────────────┤
│ Equipment     │ Today's work                             │
│ Customers     │                                          │
│ Returns       │ Booking    Customer   Time    Action     │
│ Maintenance   │ LL-1042    Alex       09:00   Prepare     │
│ Payments      │ LL-1043    Sam        11:00   Handover    │
│ Reports       │ LL-1031    Jamie      16:00   Inspect     │
│ Settings      │                                          │
└───────────────┴──────────────────────────────────────────┘
```

The dashboard should prioritize work that needs action:

- Upcoming pickups needing preparation
- Returns due today
- Overdue rentals
- Returned equipment awaiting inspection
- Payment or verification failures
- Equipment needing maintenance

Staff also need a **mobile-friendly scan screen** for packing, pickup, and return.

## 5. Complete rental workflow

| Stage | Automated behavior | Human involvement |
|---|---|---|
| Search | Calculate availability for dates and suggest compatible gear | Customer chooses equipment |
| Reservation | Temporarily hold available units during checkout | None |
| Verification | Record verification status where required | Review exceptions |
| Payment | Process payment and confirm through verified webhooks | Resolve payment exceptions |
| Confirmation | Generate booking record, agreement copy, and receipt | None |
| Preparation | Create a serial-number and accessory checklist | Staff test, clean, charge, and pack |
| Pickup | Validate pickup credential and record scanned units | Staff hand over gear, or locker handles access |
| Rental | Send reminders and check extension eligibility | Customer requests extension |
| Return | Record scanned equipment and condition photos | Staff receive equipment |
| Inspection | Flag missing items and route issues for review | Staff test equipment |
| Completion | Apply approved settlement and update availability | Approve disputed or damage-related charges |

**Physical inspection remains necessary.** A return scan confirms receipt; it does not establish that a lens or camera works.

## 6. Booking and equipment states

Keep booking, equipment, and payment states separate.

**Booking lifecycle**

```text
Draft → Temporary hold → Confirmed → Preparing
      → Ready for pickup → Active → Returned
      → Inspection → Completed
```

Alternative outcomes include expired, cancelled, and no-show. An active booking can be marked overdue without replacing its main lifecycle state.

**Equipment lifecycle**

```text
Available → Checked out → Awaiting inspection → Available
                                  ↓
                             Maintenance
```

Future reservations belong in a separate allocation schedule. An item can be physically available today while reserved for next week.

**Payment lifecycle**

```text
Pending → Succeeded
        → Failed

Succeeded → Partially refunded / Refunded
```

Track deposit authorization, capture, release, and refund separately from rental payment.

## 7. Booking rules

These rules make automation reliable:

1. **Reserve physical units.** Three identical cameras must have three separate inventory records.
2. **Include turnaround time.** Availability must account for inspection, cleaning, and preparation between bookings.
3. **Use short checkout holds.** Expired holds release stock automatically.
4. **Enforce availability in the database.** Two simultaneous checkout attempts must not allocate the same unit.
5. **Confirm payment from the provider.** A browser success page alone must not confirm a booking.
6. **Handle late payment events.** If payment succeeds after a hold expires, recheck allocation and route unavailable orders to refund or review.
7. **Check extensions against future bookings.** Charge and extend only when the equipment remains available.
8. **Require inspection before release.** Returned equipment stays unavailable until cleared.
9. **Record policy versions.** Store the pricing, cancellation policy, and agreement accepted at booking time.

Define the business’s timezone, opening hours, billing periods, grace periods, and cancellation rules before implementation.

## 8. Database design

| Table | Purpose |
|---|---|
| `users` | Customer and staff accounts |
| `customer_profiles` | Contact details and verification references |
| `locations` | Pickup locations, timezone, and operating hours |
| `equipment_models` | Product names, specifications, categories, and descriptions |
| `equipment_units` | Physical items, serial numbers, condition, and location |
| `equipment_images` | Product photos |
| `compatibility_rules` | Mounts, adapters, batteries, and accessory compatibility |
| `kits` / `kit_items` | Curated equipment bundles |
| `bookings` | Customer, rental period, totals, and booking status |
| `booking_items` | Products booked and price snapshots |
| `allocations` | Unit reservations, checkout holds, and blocked periods |
| `payments` | Provider references, amounts, and payment status |
| `deposits` | Deposit authorization or refund lifecycle |
| `agreements` | Accepted terms, version, and acceptance timestamp |
| `handovers` | Pickup/return records and responsible staff |
| `inspections` | Condition checklist, photos, and findings |
| `maintenance_jobs` | Repairs, servicing, and unavailable periods |
| `notifications` | Message status and delivery attempts |
| `webhook_events` | Processed provider events for duplicate prevention |
| `audit_logs` | History of important staff and system actions |

Use integer minor units for money, explicit currencies, and UTC timestamps with location-specific display.

## 9. Technical architecture

Use the stack already discussed, organized as one application with background workers.

| Layer | Technology | Responsibility |
|---|---|---|
| Web application | Next.js + TypeScript | Customer and staff interfaces, server endpoints |
| UI | Tailwind CSS + shadcn/ui | Shared interface components |
| Database | PostgreSQL + Prisma | Rental records and transactional updates |
| Authentication | Clerk | Sign-in and account identity |
| Background jobs | Trigger.dev | Scheduled work, retries, reminders |
| Storage | Private Amazon S3 buckets | Inspection photos and agreements |
| Messaging | Resend + Twilio | Email and SMS |
| Payments | Locally supported provider | Payments, refunds, deposit capabilities |
| Hosting | Vercel + managed PostgreSQL | Application and database |
| Tests | Vitest + Playwright | Business logic and end-to-end flows |

**System flow**

```text
Customer website / Staff dashboard
                 ↓
       Next.js server endpoints
                 ↓
             PostgreSQL
                 ↓
       Background automation jobs
          ↙          ↓          ↘
       Email        SMS      Payment actions

Payment provider → Verified webhook → Database update
Private storage  ← Authorized uploads and downloads
```

Keep secrets and payment operations on the server. Use private, expiring links for sensitive files.

## 10. Automation design

Each job should have a unique operation key, retries, and a visible failure state for staff.

| Trigger | Automated action |
|---|---|
| Checkout hold expires | Release allocation if unpaid |
| Payment succeeds | Confirm booking and queue confirmation message |
| Pickup approaches | Send instructions and create preparation task |
| Pickup is missed | Notify staff and apply the configured no-show workflow |
| Return approaches | Send reminder with due time |
| Rental becomes overdue | Notify customer and staff; calculate proposed fees |
| Extension requested | Check availability and calculate additional price |
| Return is recorded | Create inspection task |
| Inspection passes | Complete settlement and release equipment |
| Maintenance threshold reached | Create servicing task |
| Background job fails repeatedly | Add an actionable dashboard alert |

Save the booking change and its pending event together in a database transaction. A worker can then deliver the event reliably, avoiding lost notifications after a successful booking.

## 11. Security and reliability

Build these into the implementation:

- Server-side role and ownership checks
- Database protection against overlapping allocations
- Verified webhook signatures and duplicate-event handling
- Single-use, expiring pickup credentials
- Private condition photos and agreements
- Audit records for refunds, charges, and inventory changes
- Rate limits on login, booking, and pickup-code attempts
- Backups with a tested restore process
- Minimal retention of identity information

A QR code should contain an opaque token, not customer details or an unrestricted booking URL.

## 12. Build roadmap

These are suggested phases; duration depends on experience and integration requirements.

| Phase | Deliverable | Completion check |
|---|---|---|
| **1. Foundation** | App setup, authentication, roles, design components | Customer and staff permissions work |
| **2. Inventory** | Models, physical units, images, maintenance blocks | Staff can manage real stock |
| **3. Availability** | Date search, allocations, checkout holds | Concurrent requests cannot double-book |
| **4. Booking and payment** | Cart, pricing, agreements, payment integration | Success, failure, expiry, and duplicate webhooks work |
| **5. Operations** | Preparation, QR handovers, returns, inspections | Staff can complete an entire rental |
| **6. Automation** | Reminders, extensions, overdue handling, failure alerts | Jobs retry without repeating actions |
| **7. Shoot Builder** | Kits, compatibility rules, budget filtering | Suggestions are compatible and available |
| **8. Launch preparation** | End-to-end testing, backups, monitoring, deployment | Pilot bookings complete successfully |

## 13. Essential test scenarios

Prioritize tests that could prevent lost stock or money:

- Two customers try to reserve the same camera simultaneously.
- A payment webhook arrives twice.
- Payment succeeds after the reservation expires.
- A customer requests an extension that conflicts with another booking.
- A returned lens fails inspection.
- A notification provider is temporarily unavailable.
- A customer attempts to view another customer’s booking.
- A pickup code is reused.
- A refund request is retried after a timeout.

## 14. First release scope

**Build first:** equipment catalog, physical inventory, availability, booking, payment, staff dashboard, QR handover, inspections, and email reminders.

**Add next:** Shoot Builder, SMS, customer extensions, maintenance automation, and reporting.

**Later expansion:** smart lockers, multiple branches, delivery, and a marketplace for independent owners.

For the project demo, show one complete story: **a customer books a compatible kit, staff scan it out, the customer receives a return reminder, staff inspect the returned gear, and the system closes the booking.**