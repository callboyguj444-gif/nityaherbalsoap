# Nitya Herbal — Website + Admin Panel

100% Organic & Ayurvedic Care website with built-in Admin Panel for managing settings (Instagram, Facebook, Address, Phone, Email) and tracking orders.

## Features

- Beautiful single-page website with hero, products, process, ambassador, price list, footer
- WhatsApp floating button for orders
- **Admin Panel** (gear icon in header) — password: `nitya2026`
  - Update Instagram & Facebook links
  - Update Address, Phone, Email
  - View all orders (Total / Pending / Completed)
  - Mark orders as Done / Pending, or Delete
- Data stored in Firebase Realtime Database (free)
- Order tracking: every WhatsApp order button click logs an order in admin panel

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Firebase Realtime Database** (REST API) for data storage
- Deployed on **Vercel**

---

## How to Deploy on Vercel (Step-by-Step)

### Step 1 — Upload project to GitHub

1. Go to your GitHub repo: https://github.com/sukoonmood00-hue/Ayurveda
2. Click **"Add file" → "Upload files"**
3. Drag-drop ALL files from this ZIP into GitHub (except `node_modules`, `.next`, `.env`)
4. Click **"Commit changes"**

### Step 2 — Create FREE Firebase Database

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** → Name it `nitya-herbal` → Continue → Create project
3. In left menu, click **"Build" → "Realtime Database"**
4. Click **"Create Database"** → Choose **Asia-Southeast1 (Singapore)** location → Click Next
5. Select **"Start in test mode"** → Click **Enable**
6. **Copy the database URL** at the top — looks like:
   ```
   https://nitya-herbal-default-rtdb.asia-southeast1.firebasedatabase.app
   ```

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com/ → Sign up / Login with GitHub
2. Click **"Add New" → "Project"**
3. Find your `Ayurveda` repo → Click **"Import"**
4. Scroll down → Click **"Environment Variables"** and add:
   - **Name**: `NEXT_PUBLIC_FIREBASE_URL`
   - **Value**: paste the Firebase URL from Step 2
   - Click **Add**
5. Also add second variable:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: `nitya2026`
6. Click **"Deploy"** — wait 2-3 minutes
7. Vercel will give you a live link like: `https://ayurveda-xxxx.vercel.app`

### Step 4 — Test the Live Site

1. Open the Vercel link → website loads
2. Click the **gear icon** ⚙️ in the top-right of header → Admin Panel opens
3. Enter password: `nitya2026`
4. Try updating Instagram link → Click **Save Settings**
5. Click any product's **WhatsApp Order button** → then check Admin → Orders tab → order appears

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Admin Panel Access

- Click the **gear icon** ⚙️ in the header (next to social icons)
- Password: `nitya2026`
- Change password in `src/components/nitya/AdminPanel.tsx` (line 56)

## Files Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── orders/route.ts      # Orders CRUD API
│   │   │   └── settings/route.ts    # Settings CRUD API
│   │   ├── layout.tsx
│   │   └── page.tsx                 # Main page
│   ├── components/nitya/
│   │   ├── AdminPanel.tsx           # Admin Panel component
│   │   ├── Header.tsx               # Header with admin gear icon
│   │   ├── Hero.tsx
│   │   ├── ProductSlider.tsx        # Products with WhatsApp order buttons
│   │   ├── Footer.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   └── ... other components
│   └── lib/
│       ├── firebase.ts              # Firebase REST API helpers
│       └── utils.ts
├── public/images/                   # Product images & logo
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_URL` | Firebase Realtime Database URL |
| `ADMIN_PASSWORD` | Admin panel password (default: nitya2026) |

## Default Settings (used if Firebase is not configured)

- Instagram: https://www.instagram.com/nityaharbalsoapgmail.com3?igsh=MWE1YXozZjd2b2oyOA==
- Facebook: https://facebook.com/your_profile
- Address: Liliya Mota, Dist. Amreli.
- Phone: +91 6355789050
- Email: nityaherbalsoap@gmail.com

---

Made with love for Nitya Herbal — Pure Ayurveda, 100% Natural.
