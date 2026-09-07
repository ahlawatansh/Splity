<div align="center">

# 🌿 Splity — Intelligent Personal & Shared Finance OS

**A modern, full-stack financial ledger, AI-powered budgeting copilot, group expense splitting engine, and verified PDF receipt generator.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg?logo=node.js)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-Flash-orange.svg?logo=google)](https://ai.google.dev/)

---

### 🌐 Live Deployment
🔗 **Live Application URL:** `https://your-splity-deployment-link.vercel.app` *(Placeholder: Replace with your deployed link)*

---

</div>

## 📌 Project Overview

**Splity** is a production-grade personal and shared finance management application built from scratch to help individuals and peer groups track expenditures, plan monthly budgets, split group bills seamlessly, and receive strategic financial insights via an AI Copilot.

Designed with an **editorial neo-minimalist aesthetic** (flat surface layers, zero harsh drop-shadows, progressive blur backdrops, and hardware-accelerated interactions), Splity blends everyday transaction logging with institutional-grade financial auditing.

---

## 📸 Application Screenshots

### 1. Main Dashboard & Category Budget Tracking
> *Real-time metrics, dynamic category progress bars, monthly savings retention, and shared split balances.*

![Splity Dashboard](./screenshots/dashboard-overview.png)

---

### 2. Floating AI Copilot & Voice Search Dock
> *Ask complex questions in plain English or voice: "Can I buy iPhone in November?" or "Clear my dues with Ram".*

![AI Copilot Dock](./screenshots/ai-copilot-dock.png)

---

### 3. Record Transaction Modal
> *Fast and intuitive income/expense capture with category tags, custom merchants, and dates.*

![Record Transaction Modal](./screenshots/record-transaction.png)

---

### 4. Modern Downloadable PDF Receipt
> *Single-click verified financial audit receipt styled like a modern fintech ticket with official logo, Code 128 barcode, and itemized breakdown.*

![Modern Splity Receipt](./screenshots/modern-receipt-pdf.png)

---

## ✨ Key Features & Highlights

### 1. 📊 Smart Personal Budgeting & Category Limits
- **5 Core Default Envelopes:** Housing & Rent, Food & Dining, Shopping & Tech, Transportation, Entertainment, plus custom categories.
- **Dynamic Threshold Indicators:** Real-time visual progress bars with automated color status:
  - 🟢 **Healthy:** Safe utilization below 80%.
  - 🟡 **Near Limit:** 80% to 99% of envelope utilized.
  - 🔴 **Exceeded:** Over-budget warning alert.
- **Monthly Savings Retention Target:** Compare total inflow against outflows to view your net retention percentage.

### 2. 🤖 Hybrid AI Copilot & Natural Language Search
- **Deterministic & Generative Engine:** Handles instant date/category lookups in sub-milliseconds while delegating predictive questions to Google Gemini Flash.
- **Predictive Affordability:** Answers questions like *"Can I afford a laptop next month?"* by analyzing historical burn rates and future projected savings.
- **Voice-Enabled:** Integrated speech-to-text recording for hands-free queries.

### 3. 👥 Group Splits & Peer Debt Engine
- **Shared Group Ledgers:** Split trip, rent, or dinner expenses equally or with custom shares.
- **Pairwise Settlement:** Automatically calculates net payables (You Owe) and receivables (Owed to You).
- **One-Click Settle Up:** Record and reconcile settlements between friends with instant balance updates.

### 4. 🧾 Authentic Modern PDF Receipt Generator
- **Zero-Dependency Vector Output:** Generates clean, high-resolution A4 PDF receipts directly in the browser.
- **Fintech Ticket Aesthetics:** Styled like Apple / Stripe digital receipts featuring the official Splity brand logo, metadata grid, dual-tone progress bars, Code 128 barcodes, and cryptographic audit hashes.

### 5. 🔒 Secure Multi-Tenant Authentication
- **Dual Auth Modes:** Custom secure credentials (PBKDF2 password hashing + JWT session tokens) + Google OAuth via Firebase.
- **Demo Mode:** Instant one-click test access with pre-populated multi-month transaction histories for evaluation.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend UI** | React 19, TypeScript | Reactive component hierarchy & strict type safety |
| **Styling** | Tailwind CSS v4 | Ultra-fast utility-first CSS & modern variables |
| **Motion** | Motion (Framer Motion v12) | Smooth page transitions and dialog animations |
| **Data Viz** | Recharts | Interactive financial charts and spending trends |
| **Icons & Typography** | Lucide React, Space Grotesk, Qoeg | Modern fintech icon sets and financial number kerning |
| **Backend Server** | Node.js, Express, TypeScript | REST API, session management, and business logic |
| **AI Integration** | Google Gemini API (`@google/genai`) | Natural language financial synthesis and smart planning |
| **Build & Tooling** | Vite 6, esbuild, tsx | Instant HMR development and optimized production bundles |

---

## 📂 Project Architecture & Folder Structure

```text
Splity/
├── public/                       # Static public assets (fonts, brand logo, cursors)
│   ├── fonts/                    # Custom web fonts (Glion, Roma, Qoeg)
│   ├── custom-cursor.png         # Hardware-accelerated native cursor
│   ├── custom-pointer.png        # Hardware-accelerated pointer cursor
│   ├── splity-receipt-logo.png   # High-res vector receipt logo
│   └── gradient.jpg              # Ambient blurred background texture
├── screenshots/                  # Documentation & showcase screenshots
│   ├── dashboard-overview.png
│   ├── ai-copilot-dock.png
│   ├── record-transaction.png
│   └── modern-receipt-pdf.png
├── server/                       # Backend Express Architecture
│   ├── middleware/               # Auth middleware (requireUser token verification)
│   ├── services/                 # Modular business services:
│   │   ├── auth.service.ts       # Registration, login, password reset
│   │   ├── budget.service.ts     # Category limits & monthly ceilings
│   │   ├── transaction.service.ts# Ledger CRUD & aggregations
│   │   ├── friendGroup.service.ts# Group bill splits & pairwise debt
│   │   ├── smartSearch.service.ts# Hybrid deterministic & AI intent engine
│   │   ├── report.service.ts     # Monthly financial audit generator
│   │   └── notification.service.ts# Budget alert triggers
│   ├── crypto.ts                 # Secure hashing & token utilities
│   ├── db.ts                     # Multi-tenant data store repository
│   └── gemini.ts                 # Google Gemini API connector
├── src/                          # Frontend React Client
│   ├── api/                      # Type-safe HTTP client wrapper
│   ├── components/               # Reusable UI components:
│   │   ├── AppShell.tsx          # Navigation header, tabs, and layout
│   │   ├── TopHybridSearchBar.tsx# Floating AI Copilot & search dock
│   │   ├── CircularDateDial.tsx  # Interactive multi-month wheel selector
│   │   ├── BudgetProgressBar.tsx # Smooth categorized utilization bars
│   │   └── ModalContainer.tsx    # Accessible dialog overlays
│   ├── context/                  # React Contexts (AuthContext, DateContext)
│   ├── pages/                    # Core view pages:
│   │   ├── LoginPage.tsx         # Responsive login & registration view
│   │   ├── DashboardPage.tsx     # Executive financial overview
│   │   ├── TransactionsPage.tsx  # Detailed searchable ledger
│   │   ├── ReportsPage.tsx       # AI Monthly synthesis & PDF download
│   │   ├── FriendsGroupsPage.tsx # Group expense split manager
│   │   └── ProfileSettingsPage.tsx# User profile & budget ceilings
│   ├── utils/                    # PDF vector generator & data encoders
│   │   ├── pdfReceiptGenerator.ts# Modern vector PDF receipt builder
│   │   └── receiptLogoData.ts    # Embedded logo raster data
│   ├── types.ts                  # Shared TypeScript interfaces & types
│   └── index.css                 # Global CSS rules & hardware cursor system
├── package.json                  # Project dependencies & build scripts
├── tsconfig.json                 # TypeScript strict configuration
├── vite.config.ts                # Vite frontend bundler configuration
└── server.ts                     # Main Express server entrypoint
```

---

## 🚀 Getting Started Locally

Follow these simple steps to run Splity on your local machine:

### 1. Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/splity.git
cd splity
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory (or copy from `.env.example`):
```env
# Server Configuration
PORT=3000

# Google Gemini API Key (For AI Copilot & Smart Reports)
GEMINI_API_KEY=your_google_gemini_api_key_here

# JWT Secret Key for Session Authentication
JWT_SECRET=your_jwt_secret_key_here
```

> **Note:** You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### 5. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### 6. Build for Production
To create an optimized production build:
```bash
npm run build
npm start
```

---

## 📡 REST API Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate user with email & password |
| `POST` | `/api/auth/signup` | Register a new user account |
| `POST` | `/api/auth/demo-login` | Instant demo login with sample data |
| `GET` | `/api/transactions` | Fetch user transactions with month & category filters |
| `POST` | `/api/transactions` | Record a new expense or income transaction |
| `GET` | `/api/budgets/categories` | Retrieve monthly category budgets & utilizations |
| `POST` | `/api/budgets/categories` | Set spending target for a specific category |
| `POST` | `/api/smart-search` | Query the AI Copilot for insights or quick actions |
| `POST` | `/api/reports/generate` | Generate monthly audit narrative with Gemini AI |
| `GET` | `/api/friends/debts/summary` | Get net shared split balances across friends |
| `POST` | `/api/friends/debts/settle` | Settle shared expense balances between peers |

---

## 🎓 Academic & Placement Context

- **Author:** Ansh Ahlawat
- **Project Type:** Full-Stack Web Development & Applied AI
- **Use Case:** Personal Financial Wellness, Group Expense Management, and Smart Budget Auditing.
- **Key Engineering Achievements:**
  - Designed a multi-tenant backend architecture with decoupled service layers.
  - Implemented client-side vector PDF synthesis rendering authentic modern receipts without heavy external PDF runtimes.
  - Built a hybrid search engine combining deterministic keyword parsers with generative LLM fallback.
  - Engineered zero-lag hardware-accelerated custom cursor physics.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by Ansh Ahlawat · Splity 2026</sub>
</div>
