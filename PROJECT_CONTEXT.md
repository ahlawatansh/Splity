# PROJECT_CONTEXT.md — Expense Buddy Architecture & Context

## Product Overview
Expense Buddy is a full-stack personal finance web app featuring:
- **Income & Expense Tracking** with categories, tags, and date filtering.
- **Monthly & Category Budgets** with automated 80% / 100% threshold alert notifications.
- **Statement & Receipt Import Pipeline** supporting PDF/image parsing, Gemini AI transaction candidate extraction, and human review before committing to final transactions.
- **Hybrid AI Smart Search** combining fast deterministic rule-based query parsing with Gemini AI fallback and financial planning logic ("Can I buy an iPhone in November?").
- **Monthly PDF / Narrative Reports** featuring AI-generated narrative summaries, top merchant breakdowns, category comparisons, and downloadable reports.

## Technology Stack
- **Frontend**: Vite + React + TypeScript, Tailwind CSS, Lucide Icons, Recharts, Motion.
- **Backend**: Node.js + Express + TypeScript running on Port 3000.
- **Database/Persistence**: Multi-tenant repository abstraction with Decimal money precision and UUID keys.
- **AI**: Gemini API (`@google/genai` SDK server-side using `gemini-3.6-flash`).
- **Storage**: S3-compatible Cloudflare R2 / local signed object storage proxy.

## Core Architectural Rules
1. **Postgres / DB is Source of Truth**: AI never writes directly to the database. AI only proposes intents or candidate items; the server validates and executes.
2. **Multi-Tenant Security**: Every record is associated with a `userId`. Every database query strictly filters by `userId` derived from the authenticated token (`req.user.id`). Never trust a `userId` in the request body.
3. **Layered Architecture**: `controller -> service -> repository`. Controllers handle HTTP req/res. Services implement business logic. Repositories handle database persistence.
4. **Validation at Boundary**: All request inputs are validated with Zod schemas before touching service layers.
5. **Decimal Money Handling**: Money values are represented as Decimals / precise strings to avoid JavaScript floating point errors.
6. **Authentication & Tokens**: Passwords hashed using secure PBKDF2/scrypt. JWT Access Tokens (15 min) + Refresh Tokens (30 days, stored hashed in session table, revocable). HttpOnly cookies for refresh tokens.
7. **Privacy Preservation**: Raw transaction row dumps are NEVER sent to the AI API. Only pre-aggregated monthly category summaries and top merchant totals leave the server towards Gemini.
