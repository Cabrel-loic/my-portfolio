# Personal Portfolio

A full-stack personal portfolio for a Full-Stack Web Developer and Graphic Designer. The app is a single-page site with a React/Next.js frontend and a Django REST backend, already wired together for the Home page and contact flow.

---

## What’s in the repo

**Backend (Django, in `portfolio/`)**

- Django 6 with REST framework, CORS, and python-decouple for config.
- One API: contact form submissions (POST to contacts; messages stored in DB).
- SQLite by default; dependencies include PostgreSQL (psycopg) and boto3/django-storages for possible production use.
- Django admin for viewing contact submissions.
- Settings read from environment (e.g. SECRET_KEY, DEBUG, ALLOWED_HOSTS).

**Frontend (Next.js, in `frontend/`)**

- Single-page Home with: sticky nav, hero, “What I Do” (three cards), “Why Work With Me” (four strengths), Projects section, and Contact section.
- Navigation: desktop links + mobile hamburger; scroll-to-section and active-section highlighting; “Hire Me” CTA.
- Contact: form (name, email, subject, message) that POSTs to the backend contact API; success/error feedback; placeholder contact info and map area.
- Styling: Tailwind CSS 4, DaisyUI, lucide-react icons, custom CSS (gradients, animations, glass-style nav).
- API client uses `NEXT_PUBLIC_API_BASE_URL` for the backend base URL (contact form currently hardcodes backend URL and should be switched to this env for consistency and deployment).

**Already connected**

- Frontend and backend are connected: contact form submits to the Django contacts API.
- CORS is set for `http://localhost:3000` in backend settings.

---

## What the site still needs

**Content and configuration**

- Replace placeholder hero image/area with your photo or graphic.
- Replace placeholder contact details (address, phone, email) and optional map with your real info; add a real Google Maps API key in the frontend if you use the map (the key in layout is a placeholder).
- Replace “Portfolio” in the nav with your name or brand if desired.
- Add a real favicon (requests to favicon.ico currently 404).

**Projects section**

- Backend: define a Project model (e.g. title, description, image, link, tags, order) and expose a read-only API (list/detail).
- Frontend: consume that API and render a Projects section (grid or list) with images, links, and optional filtering or categories.

**About / Skills (optional)**

- If you want editable content: add simple CMS-style models (e.g. About, Skill) and APIs, or keep as static copy in the frontend.
- Optional: skill tags or progress indicators driven by data.

**Technical and production**

- Use a single source for the API base URL: set `NEXT_PUBLIC_API_BASE_URL` in the frontend and use it for all API calls (including the contact form) so dev/staging/production work without code changes.
- Backend: add an `.env.example` (or document) for SECRET_KEY, DEBUG, ALLOWED_HOSTS, and optionally DATABASE_URL and any storage keys if you enable Postgres or S3.
- Frontend: add an `.env.example` with `NEXT_PUBLIC_API_BASE_URL` (e.g. `http://localhost:8000` for local).
- For production: configure a production database (e.g. PostgreSQL), static/media files (e.g. WhiteNoise + optional S3), and HTTPS; update CORS and ALLOWED_HOSTS for your frontend/backend origins.
- Optional: contact form rate limiting or spam protection (e.g. captcha, throttle) on the backend.
- Optional: email notification when a contact form is submitted (e.g. Django email backend or a small task queue).

**Accessibility and SEO**

- Ensure focus states and keyboard navigation are clear, especially in nav and contact form.
- Keep or add meta description and Open Graph tags for sharing; consider a sitemap if you add more routes later.

---

## Requirements to run and deploy

**Backend**

- Python 3.13+ (per pyproject.toml).
- Create and activate a virtual environment in the `portfolio` directory; install dependencies (e.g. with pip from pyproject.toml or using uv/poetry if you add that).
- Set environment variables (at least SECRET_KEY; DEBUG and ALLOWED_HOSTS as needed). For local dev, ALLOWED_HOSTS can include `localhost` and DEBUG can be True.
- Run migrations, then start the Django server (e.g. on port 8000). The contact API is at the path included in `core` urls (e.g. `/api/contacts/`).

**Frontend**

- Node.js and npm (or yarn/pnpm) in the `frontend` directory.
- Install dependencies with npm install (or equivalent).
- Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL (e.g. `http://localhost:8000` for local).
- Run the dev server (e.g. npm run dev) and open the app (e.g. http://localhost:3000). For production, build and run the Next.js build (e.g. npm run build then npm run start, or use a platform like Vercel).

**Local development**

- Start the Django backend first, then the Next.js frontend, and ensure CORS in Django allows the frontend origin you use (e.g. http://localhost:3000).

---

## Summary

The repo already provides a working single-page portfolio with hero, value proposition, strengths, and a contact form backed by Django. Remaining work is mainly: real content and config (favicon, contact info, map key, branding), a Projects feature (backend model + API + frontend UI), optional About/Skills data, and production hardening (env-based API URL, database, static files, CORS, and optional email/rate limiting). The requirements above are enough to run the stack locally and to plan deployment.
