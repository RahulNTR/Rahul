# Script Sahayak

**The AI development room for Indian storytellers.**
From Idea to Screenplay. From Screenplay to Production.

Script Sahayak guides writers from a raw idea → story → characters → structure → scenes → a professionally formatted screenplay, with AI that assists while the writer decides. Built first for Indian and regional OTT/film writers (English, Telugu, Hindi, Tamil and more).

## Status: Sprint 1

| Sprint | Scope | Status |
|---|---|---|
| 1 | Authentication + project dashboard + project creation | ✅ This repo |
| 2 | Idea Studio + AI Story Development | Next |
| 3 | Character Studio + Story DNA | |
| 4 | Act / Sequence / Scene Builder | |
| 5 | Screenplay Editor | |
| 6 | AI Co-writer + contextual actions | |
| 7 | AI Script Analysis + Continuity | |
| 8 | Export + polish + onboarding | |
| 9 | Production Breakdown / Vision Board (Phase 2) | |

### Sprint 1 includes
- Email/password sign-up and login, plus Google and Apple sign-in (via Supabase Auth)
- Protected routes (middleware)
- **My Projects** dashboard: name, genre, language, format, stage, progress %, last edited, status
- Card actions: Continue, Duplicate, Archive/Restore, Delete; Active/Archived views
- **New Project**: name, format, language, multi-select genre / audience / tone, optional idea
- Project overview page with editable name, stage and idea
- Row-level security: every project is private to its owner

## Stack
- Next.js 14 (App Router, Server Actions) + TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, RLS)

## Getting started
1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/0001_projects.sql` in the Supabase SQL editor.
3. (Optional) Enable Google / Apple providers under Authentication → Providers, with redirect URL `http://localhost:3000/auth/callback`.
4. Copy `.env.example` to `.env.local` and fill in your project URL and anon key.
5. Install and run:
   ```bash
   npm install
   npm run dev
   ```
6. Open http://localhost:3000.

## Product principles
1. AI assists. Writer decides.
2. Story before screenplay.
3. Structured creativity — options, not one answer.
4. Indian storytelling first.
5. Professional output.

*Your screenplay belongs to you.*
