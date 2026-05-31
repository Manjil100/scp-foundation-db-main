# SCP Foundation Database

> **COMP.6210 — Web Services & Design Methodologies — Assignment 2**
> Student: Manjil Khatiwada
> A React UI backed by a cloud-hosted Supabase Postgres database, exposed via Supabase's auto-generated REST API.

The application is a small internal "archive" for SCP Foundation containment files. It supports full CRUD against a `scp_subjects` table (item designation, object class, description, special containment procedures) and ships pre-seeded with 20 well-known subjects.

---

## Stack

| Layer    | Tech                                                 |
| -------- | ---------------------------------------------------- |
| UI       | React 18 + Vite + Tailwind CSS                       |
| Routing  | react-router-dom                                     |
| Backend  | Supabase (Postgres + auto-generated REST API)        |
| Hosting  | Vercel (frontend) · Supabase (backend)               |

The browser talks to Supabase over its REST endpoint (`/rest/v1/scp_subjects`) using the `@supabase/supabase-js` client, which wraps `GET / POST / PATCH / DELETE` calls. Authentication is anonymous via the public anon key + permissive Row-Level Security policies — appropriate for a coursework demo, **not** for production.

---

## 1. Backend setup (Supabase)

1. Go to [supabase.com](https://supabase.com) and create a free project. Save your **Project URL** and **anon public key** (Settings → API).
2. Open **SQL Editor → New query**.
3. Paste the contents of [`supabase-setup.sql`](./supabase-setup.sql) into the editor and click **Run**.
   - This creates the `scp_subjects` table, the `updated_at` trigger, RLS policies, and seeds all 20 SCP records.
4. Verify under **Table Editor → scp_subjects** that 20 rows are present.

Your REST API is now live at:

```
GET    https://<project-ref>.supabase.co/rest/v1/scp_subjects?select=*
POST   https://<project-ref>.supabase.co/rest/v1/scp_subjects
PATCH  https://<project-ref>.supabase.co/rest/v1/scp_subjects?id=eq.<uuid>
DELETE https://<project-ref>.supabase.co/rest/v1/scp_subjects?id=eq.<uuid>
```

Requests must include the headers `apikey: <anon key>` and `Authorization: Bearer <anon key>`. The `supabase-js` client handles both for you.

---

## 2. Local development

```bash
cd scp-foundation-db
npm install
cp .env.example .env.local
# Edit .env.local and paste your Supabase URL + anon key
npm run dev
```

The dev server runs at `http://localhost:5173`.

---

## 3. Frontend deploy (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key
5. Click **Deploy**.

Vercel will produce a `*.vercel.app` URL that connects to your Supabase backend in the cloud.

---

## 4. Project structure

```
scp-foundation-db/
├── index.html
├── package.json
├── vite.config.js          # Vite + React plugin
├── tailwind.config.js      # SCP-themed colour palette
├── postcss.config.js
├── supabase-setup.sql      # DB schema + RLS + 20 seed rows
├── public/
│   └── scp-icon.svg        # Favicon
└── src/
    ├── main.jsx            # React entry, BrowserRouter
    ├── App.jsx             # Layout + routes
    ├── index.css           # Tailwind base + SCP components
    ├── constants.js        # OBJECT_CLASSES + class colour map
    ├── supabaseClient.js   # createClient + env handling
    ├── api/
    │   └── subjectsApi.js  # list/get/create/update/delete wrappers
    ├── hooks/
    │   └── useSubjects.js  # shared in-memory subject list + mutations
    └── components/
        ├── Header.jsx
        ├── SubjectList.jsx     # /  — archive grid with filter + search
        ├── SubjectCard.jsx
        ├── SubjectDetail.jsx   # /subject/:id — view + delete
        ├── SubjectForm.jsx     # /new and /subject/:id/edit
        ├── ClassBadge.jsx
        └── Loading.jsx         # Loading / ErrorBlock / Empty helpers
```

---

## 5. Features mapped to the marking rubric

| Rubric requirement                                | Where it lives                                     |
| ------------------------------------------------- | -------------------------------------------------- |
| Online database with 20 SCP subjects              | `supabase-setup.sql` (Postgres on Supabase)        |
| Fields: item, class, description, containment    | `scp_subjects` table + `SubjectForm`               |
| REST API supporting CRUD                          | Supabase auto-REST `/rest/v1/scp_subjects`         |
| React UI that uses the REST API                   | `src/api/subjectsApi.js` + `useSubjects` hook      |
| Cloud-deployed (frontend + backend)               | Vercel + Supabase                                  |
| All 20 subjects displayed                         | `SubjectList` / `SubjectCard`                      |

---

## 6. License notes

SCP descriptions in `supabase-setup.sql` are short original paraphrases written for this assignment. The original entries from [scpwiki.com](https://scp-wiki.wikidot.com) are licensed under CC BY-SA 3.0; this project does not reproduce their text verbatim.
# Updated Sun May 31 22:30:17 NZST 2026
