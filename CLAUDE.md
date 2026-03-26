# FundMyCampus — Project Instructions

## Project Overview
- **What:** Education loan financing platform connecting Indian students with 12+ banking partners
- **Domain:** https://www.fundmycampus.com
- **API:** https://api.fundmycampus.com (Cloudflare Worker)
- **Deployed on:** Vercel
- **Blog CMS:** Notion

## Tech Stack
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS (Teal/Black/White theme — NOT yellow/gold anymore)
- Framer Motion + GSAP for animations
- Auth: custom auth via API with session cookies
- Blog: Notion API with ISR (revalidate = 60)

## Key Directories
- `app/` — Pages (home, abroad-study-loan, india-study-loan, courses-loan/*, tools, blogs, contact, dashboard, profile, etc.)
- `components/` — layout/, home/, ui/, blog/, auth/, signup/, chat/
- `lib/` — auth-context.tsx, api-client.ts, notion.ts, animations.ts
- `public/` — static assets, bank logos

## Important Conventions
- Never push to remote without explicit user approval
- Teal (`#0D9488`) is the accent color, not yellow/gold
- `NEXT_PUBLIC_API_URL` env var for backend base URL
- Blog images use `/api/notion-image?id=` proxy to avoid expired S3 URLs

---

## SEO Audit — Fix Plan (March 2026)

### Status: NOT STARTED

### Tier 1 — Critical (Fix First)

#### 1. Create robots.txt
- **File:** `public/robots.txt`
- Block: /login, /signup, /otp-verify, /forgot-password, /reset-password, /dashboard, /profile, /documents, /notifications, /referrals, /api/
- Include: `Sitemap: https://www.fundmycampus.com/sitemap.xml`

#### 2. Create sitemap.xml
- **File:** `app/sitemap.ts`
- Use Next.js built-in sitemap generation
- Include all public pages: /, /abroad-study-loan, /india-study-loan, /courses-loan/*, /tools, /blogs, /blogs/[slug], /contact, /privacy

#### 3. Unique titles + meta descriptions per page
All key pages currently show the generic root title. Fix:

| Page | Title | Description |
|------|-------|-------------|
| `/` | FundMyCampus — Education Loans for Study Abroad & India | Apply for education loans for study abroad or domestic universities. Collateral-free loans starting at 6.75%, 48-hr approval, 15,000+ students helped. |
| `/abroad-study-loan` | Study Abroad Education Loan — Collateral-Free, Starting 6.75% \| FundMyCampus | Get collateral-free study abroad education loans up to ₹1.5 Crore. Compare ICICI, Axis, Credila & more. 48-hour approval. |
| `/india-study-loan` | Education Loan for Study in India — IIT, IIM, AIIMS \| FundMyCampus | Education loans up to ₹40 Lakhs for IITs, IIMs, AIIMS, NITs & top Indian universities. Low interest, quick approval. |
| `/tools` | Free Education Loan Calculators — EMI, Eligibility & Cost Tools \| FundMyCampus | Use free EMI calculator, eligibility checker, loan comparison tool, and SOP reviewer. Plan your education financing smartly. |
| `/contact` | Contact FundMyCampus — Free Education Loan Consultation | Get free education loan consultation. Call +91 78272 25354 or fill the form. We help with study abroad & India loans. |
| `/blogs` | Education Loan Blog — Guides, Tips & Comparisons \| FundMyCampus | Expert guides on education loans, bank comparisons, study abroad tips, and government schemes for Indian students. |
| `/privacy` | Privacy Policy \| FundMyCampus | — |
| `/courses-loan/btech` | B.Tech Education Loan — Up to ₹30 Lakhs \| FundMyCampus | — |
| `/courses-loan/mbbs` | MBBS Education Loan — Up to ₹1 Crore \| FundMyCampus | — |
| `/courses-loan/mba` | MBA Education Loan — Up to ₹50 Lakhs \| FundMyCampus | — |
| (other courses) | Similar pattern | — |

**Challenge:** abroad-study-loan, india-study-loan, tools, contact are `"use client"` — cannot export metadata directly. Options:
- Create a `layout.tsx` wrapper in each route folder that exports metadata (preferred)
- Or convert the page to server component + extract client parts into a separate component

#### 4. OG + Twitter Card tags
- Add to root layout metadata as defaults
- Override per page where possible
- **Need:** an OG image asset (1200x630px) — ask user or use placeholder path

### Tier 2 — High Value

#### 5. FAQPage JSON-LD schema on homepage
- Homepage has 10 excellent FAQ questions already in `homeFaqs` array
- Add `<script type="application/ld+json">` with FAQPage schema
- This is the #1 easiest rich snippet win

#### 6. Organization schema on homepage
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FundMyCampus",
  "url": "https://www.fundmycampus.com",
  "logo": "https://www.fundmycampus.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-78272-25354",
    "contactType": "customer service"
  },
  "sameAs": []
}
```

#### 7. LocalBusiness schema on contact page
- Phone: +91 78272 25354
- Location: Delhi, India (confirm full address with user)

#### 8. Fix duplicate H1/H2 DOM rendering bug
- Reported on: Tools, Blogs, Abroad Loan pages
- Likely cause: component renders both mobile + desktop versions in DOM (hidden via CSS) — Google still sees both
- Fix: use conditional rendering or CSS that truly removes from DOM

#### 9. Noindex auth pages
Add `robots: { index: false, follow: false }` to metadata on:
- `/login`
- `/signup`
- `/otp-verify`
- `/forgot-password`
- `/reset-password`

### Tier 3 — Optimization

#### 10. Rewrite H1s with keywords
| Page | Current H1 | Better H1 |
|------|-----------|-----------|
| `/` | "Funding Your Education Dreams" | "Education Loans for Study Abroad & India — Starting 6.75%" |
| `/abroad-study-loan` | "Your Global Education Journey Starts Here" | "Study Abroad Education Loans — Fast, Collateral-Free Financing" |
| `/india-study-loan` | (check) | "Education Loans for IIT, IIM, AIIMS & Top Indian Universities" |
| `/tools` | "Smart Tools for Financial Planning" | "Free Education Loan Calculators & Planning Tools" |
| `/contact` | "Get in Touch" | "Contact FundMyCampus — Free Loan Consultation" |

#### 11. Image lazy loading
- All 28+ images use loading="auto"
- Only hero image should be eager, rest should be lazy
- Check Next.js `<Image>` components — they handle this automatically, but raw `<img>` tags don't

#### 12. Canonical tags
- `metadataBase` is already set in root layout (good)
- Add `alternates: { canonical: "..." }` to each page's metadata

#### 13. BlogPosting schema on blog detail pages
- Blog detail (`/blogs/[slug]`) already has OG tags (good)
- Add BlogPosting JSON-LD with headline, datePublished, author, image

### Tasks that CAN'T be done from code (do later/manually)

| # | Task | Why | When |
|---|------|-----|------|
| 14 | Create OG image (1200x630px) | Needs branded design asset | Before deploy ideally |
| 15 | Google Business Profile setup | Done in Google, not code | After deploy |
| 16 | Submit sitemap to Google Search Console | Done in GSC after deploy | After deploy |
| 17 | Run Lighthouse / PageSpeed audit | Need to deploy fixes first | After deploy |
| 18 | Write more blog content (2-3/month) | Content writing, not code | Ongoing |
| 19 | Create country-specific pages (/study-in-usa-loan etc) | New content/pages — separate project | Later |
| 20 | Expand existing blog posts to 2,500+ words | Content writing | Later |
| 21 | Keyword research for blog strategy | SEO planning, not code | Later |

---

## Chat Widget
- Component: `components/chat/ChatWidget.tsx`
- Rendered in root layout inside `<AuthProvider>`
- Two flows: Guest (token in localStorage) and Logged-in (session cookie)
- API endpoints: `/api/v1/chat/guest/*` and `/api/v1/chat/bot/*`
- Backend returns `quick_replies` as JSON string of `[{label, action, url?}]` objects

## Referrals
- Page: `app/referrals/page.tsx`
- Min loan amount for referral rewards: ₹10 Lakhs
- Earnings: ₹1,000 on sanction, ₹1,000 on disbursement, ₹5,000 bonus every 5th referral

## Blog
- Uses Notion CMS with ISR (revalidate=60)
- Images proxied via `/api/notion-image?id=` to avoid S3 URL expiry
- Blog detail already has full OG + Twitter Card metadata from Notion SEO fields
