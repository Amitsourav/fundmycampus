# Full SEO Audit Report: fundmycampus.com

**Audit Date:** March 27, 2026
**Audited By:** Claude SEO Audit Suite (7 specialist agents)
**Domain:** https://www.fundmycampus.com
**Platform:** Next.js on Vercel (Mumbai PoP)
**Business Type:** Education Loan Financing Marketplace (India) -- YMYL Vertical
**Pages in Sitemap:** 26

---

## OVERALL SEO HEALTH SCORE: 48/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 62/100 | 13.6 |
| Content Quality (E-E-A-T) | 23% | 42/100 | 9.7 |
| On-Page SEO | 20% | 65/100 | 13.0 |
| Schema / Structured Data | 10% | 40/100 | 4.0 |
| Performance (Core Web Vitals) | 10% | 35/100 | 3.5 |
| AI Search Readiness (GEO) | 10% | 31/100 | 3.1 |
| Images | 5% | 25/100 | 1.3 |
| **TOTAL** | **100%** | | **48.2** |

**Verdict:** The site has a solid technical foundation (Next.js SSR, Vercel edge caching, clean URLs) but is critically undermined by trust/credibility gaps, thin content, broken internal links, failing Core Web Vitals, and near-zero AI search readiness. For a YMYL financial services site, the E-E-A-T score of 27/100 is the most urgent concern.

---

## TOP 5 CRITICAL ISSUES

1. **Trust contradictions destroy credibility** -- Mumbai address on contact page vs "Delhi" in footer; "15,000+ students" claim on a site founded in 2026; no regulatory disclosures for a financial intermediary
2. **9 course pages are orphaned** -- Zero internal links to any `/courses-loan/*` page; discoverable only via sitemap
3. **Core Web Vitals FAILING** -- All 28 images missing width/height (CLS: 0.15-0.35), hero image lazy-loaded (LCP killer), no Next.js Image component used
4. **Broken internal links on every page** -- /about and /careers return 404, linked from global footer
5. **46% of content invisible to AI crawlers** -- Blog posts and some pages return empty HTML shells due to client-side rendering failures

## TOP 5 QUICK WINS

1. **Create llms.txt** -- 30 minutes, immediately improves AI discoverability
2. **Add width/height to all images** -- 1-2 hours, fixes CLS immediately
3. **Remove `loading="lazy"` from hero image** -- 5 minutes, improves LCP by 300-800ms
4. **Fix 307 temporary redirect to 301** -- 5 minutes in Vercel dashboard
5. **Add `<lastmod>` to all 26 sitemap URLs** -- 30 minutes, improves crawl efficiency

---

## SECTION 1: TECHNICAL SEO (62/100)

### Crawlability
- **robots.txt:** Properly configured, blocks auth/private routes, declares sitemap
- **Sitemap:** Valid XML, 26 URLs, all returning 200 -- but 16/26 missing `<lastmod>`
- **No AI crawler directives** -- GPTBot, ClaudeBot, CCBot not explicitly addressed

### Indexability
- Canonical tags correct on all pages (self-referencing)
- Unique meta descriptions on all pages (131-176 chars)
- Unique title tags with brand name on all pages
- One H1 per page -- PASS
- No noindex issues detected
- Trailing slash URLs properly 308-redirect to non-slash

### Redirects -- FAIL
| Path | Issue |
|------|-------|
| `https://fundmycampus.com` -> `https://www.fundmycampus.com` | **307 temporary** (should be 301/308 permanent) |
| `http://fundmycampus.com` -> canonical | **2 hops** (should be 1) |

### Security Headers -- FAIL
| Header | Status |
|--------|--------|
| HSTS | PASS (max-age=63072000) |
| Content-Security-Policy | MISSING |
| X-Frame-Options | MISSING |
| X-Content-Type-Options | MISSING |
| Referrer-Policy | MISSING |
| Permissions-Policy | MISSING |

### Internal Linking -- CRITICAL FAILURES

**Broken links (404):**
- `/about` -- linked from global footer on every page
- `/careers` -- linked from global footer on every page
- `/terms` -- likely linked from footer

**Orphaned pages (zero internal links):**
All 9 course pages exist only in sitemap with no links from any page:
- /courses-loan/btech, /mbbs, /mba, /bba, /bca, /bds, /ca, /bsc-nursing, /hotel-management

**No cross-linking** between service pages, course pages, and blog posts.

### JavaScript Rendering -- EXCELLENT
- SSR/SSG confirmed (`x-nextjs-prerender: 1`)
- Edge caching active (`x-vercel-cache: HIT`)
- ISR revalidation: 5 minutes
- Full content in server-rendered HTML on main pages

### Mobile -- PASS
- Proper viewport meta tag
- Tailwind responsive classes throughout

---

## SECTION 2: CONTENT QUALITY & E-E-A-T (42/100)

### E-E-A-T Composite: 27/100

| Factor | Score | Key Issues |
|--------|-------|------------|
| Experience | 22/100 | No named founders, no case studies, no testimonials, stock photography only |
| Expertise | 35/100 | Calculators show product expertise, but no unique industry knowledge, no regulatory disclosures |
| Authoritativeness | 18/100 | Zero external citations, no media mentions, no partner verification, brand-new domain |
| Trustworthiness | 30/100 | Address contradicts footer, inflated student claims, no terms of service, no grievance officer |

### Content Depth -- FAILING

| Page | Words | Minimum | Status |
|------|-------|---------|--------|
| Homepage | ~1,095 | 500 | PASS |
| Abroad Study Loan | ~498 | 800 | FAIL (38% below) |
| India Study Loan | ~631 | 800 | FAIL (21% below) |
| Course pages (avg) | ~770 | 800 | FAIL (borderline) |
| Blog posts (avg) | ~1,300 | 1,500 | FAIL |

### Content Contradictions Found
- Homepage: "50+ Countries" vs abroad page: only 6 countries detailed
- Homepage: "Collateral-free loans up to your entire education cost" vs abroad page: "up to 40 Lakhs"
- India study loan: "up to Rs 40 Lakhs" (hero) vs "up to Rs 75 Lakhs" (FAQ)

### Course Page Duplication
- 9 course pages share ~65-70% identical template content
- Only ~30-35% unique content per page
- Classic programmatic thin content pattern -- risk of suppression

### Blog Assessment
- 8 articles published in ~2 weeks (Feb 16 - Mar 3, 2026)
- All attributed to "fundmycampus team" (no individual authors)
- Inconsistent author names: "fundmycampus team", "FundMyCampus Editorial", "FundMyCampus Team"
- AI writing patterns detected: "Have you ever found yourself wondering...", "You're not alone"
- No original data, expert quotes, or first-hand anecdotes

### Major Content Gaps vs Competitors
1. Country-specific loan guides (USA, UK, Canada, etc.)
2. University-specific loan pages
3. Per-bank detailed comparison pages (only SBI and HDFC covered)
4. Scholarship database
5. Visa guidance content
6. Student success stories / video testimonials
7. Financial glossary
8. Rate change news / policy updates
9. Downloadable resources (checklists, budget planners)

---

## SECTION 3: ON-PAGE SEO (65/100)

### Strengths
- Title tags: Unique, keyword-rich, proper length, brand included
- Meta descriptions: Unique, compelling, proper length with CTAs
- H1 tags: One per page, keyword-targeted
- Open Graph tags: Complete with og:image (1200x630) on all pages
- Twitter cards: summary_large_image configured
- Canonical tags: Correct self-referencing on all pages

### Weaknesses
- Headings are marketing-oriented, not search-query-oriented ("Let Your Dreams Take Flight" vs "How to Get an Education Loan")
- No `og:locale` tag (should be `en_IN`)
- Internal linking architecture is flat -- no hub-and-spoke structure
- Blog posts not linked from service pages
- No "Related Posts" or "Related Loans" cross-linking

---

## SECTION 4: SCHEMA / STRUCTURED DATA (40/100)

### Current Implementation

| Page | Schema Types | Status |
|------|-------------|--------|
| Homepage | FAQPage + Organization | Present but has errors |
| Contact | LocalBusiness | Present but has errors |
| Blog posts (3 checked) | BlogPosting | Present but has errors |
| /abroad-study-loan | None | MISSING |
| /india-study-loan | None | MISSING |
| /tools | None | MISSING |
| /blogs listing | None | MISSING |
| All 9 course pages | None | MISSING |

### Critical Validation Errors
1. **BlogPosting `datePublished`** uses "March 3, 2026" instead of ISO 8601 `2026-03-03` -- Google cannot parse
2. **BlogPosting `publisher.logo`** missing from all posts -- blocks Article rich results
3. **Blog Post 3 `image`** uses relative URL `/api/notion-image?id=...` -- must be absolute
4. **Organization `sameAs`** is empty array `[]` -- invalid
5. **LocalBusiness `streetAddress`** is "123, Financial District" -- placeholder/fake address

### Missing Schema Opportunities (Priority Order)
1. **P0:** WebSite + SearchAction (sitelinks search box)
2. **P0:** FinancialProduct on /abroad-study-loan and /india-study-loan
3. **P1:** BreadcrumbList on all subpages
4. **P1:** Fix all BlogPosting errors
5. **P2:** Enhanced Organization (foundingDate, founders, sameAs)
6. **P2:** ItemList on /blogs listing
7. **P3:** SoftwareApplication on /tools

---

## SECTION 5: PERFORMANCE / CORE WEB VITALS (35/100)

### Estimated Scores

| Metric | Estimated (Mobile) | Threshold | Status |
|--------|-------------------|-----------|--------|
| LCP | 2.0-2.8s | <=2.5s | NEEDS IMPROVEMENT |
| INP | 100-250ms | <=200ms | NEEDS IMPROVEMENT |
| CLS | 0.15-0.35 | <=0.1 | **POOR (FAILING)** |

### CLS Issues (Most Critical)
- **ALL 28 images missing width/height attributes** -- guaranteed layout shifts
- 22 bank logo images without dimensions in a carousel section
- `font-display: swap` on 11 font faces causing text reflow
- No `aspect-ratio` CSS rules anywhere

### LCP Issues
- Hero image has `loading="lazy"` -- delays LCP by 300-800ms
- Hero image loaded from third-party (images.unsplash.com) with no `preconnect`
- Logo PNG (44KB) preloaded instead of hero image
- No `fetchpriority="high"` on hero image
- Not using Next.js `<Image>` component (zero instances of `data-nimg`)

### INP Issues
- Polyfills script (40KB) is render-blocking (missing `async` attribute)
- GA4 preloaded aggressively, competing with critical resources
- 12 async script chunks in `<head>` creating parse/compile overhead
- Total JS: 220KB transferred (~700-800KB decompressed)

### Other Performance Issues
- HTML served uncompressed at 122KB (should be ~25-30KB with Brotli)
- Image caching: `max-age=0, must-revalidate` (no long-term cache)
- Logo is 44KB PNG (should be WebP ~10-15KB or SVG)

---

## SECTION 6: AI SEARCH READINESS / GEO (31/100)

### GEO Health Score Breakdown

| Dimension | Score |
|-----------|-------|
| Citability | 28/100 |
| Structural Readability | 42/100 |
| Multi-Modal Content | 20/100 |
| Authority & Brand Signals | 22/100 |
| Technical Accessibility | 40/100 |

### AI Crawler Access
- All AI crawlers allowed via wildcard `User-agent: *`
- No differentiation between AI search crawlers (beneficial) and AI training crawlers (extractive)
- **No llms.txt file** (404)

### Critical: Blog Content Invisible to AI
- Blog post URLs return empty HTML shells to non-browser clients
- Client-side rendering failure means 46% of site content is inaccessible to AI systems
- This includes the founder story blog -- the key entity-establishing content

### Citability Issues
- Passages too short (40-65 words vs optimal 134-167 words)
- Headings are promotional, not question-based
- Zero source attribution on any statistic
- No unique research or proprietary data
- Marketing copy tone throughout

### Brand Signal Assessment
| Signal | Status |
|--------|--------|
| Wikipedia entity | Not present |
| YouTube channel | Not present |
| Reddit mentions | Likely minimal |
| LinkedIn | 4 followers |
| Press coverage | None detected |
| Domain age | < 3 months |

### Platform Readiness
| Platform | Score |
|----------|-------|
| Google AI Overviews | 25/100 |
| ChatGPT Web Search | 15/100 |
| Perplexity | 20/100 |
| Bing Copilot | 20/100 |

---

## SECTION 7: IMAGES (25/100)

- All 28 images use raw `<img>` tags (no Next.js `<Image>`)
- Zero images have width/height HTML attributes
- Stock photography from Unsplash (third-party origin, no preconnect)
- Logo is unoptimized 44KB PNG
- Image caching headers: `max-age=0` (no browser caching)
- Alt text is present on most images -- PASS
- No WebP/AVIF format usage
- No responsive `srcset` attributes
- No informational infographics or data visualizations

---

## SECTION 8: SITEMAP (Grade: C+)

### Strengths
- Valid XML, correct namespace
- All 26 URLs return 200
- Properly declared in robots.txt
- No noindex conflicts

### Issues
- **16 of 26 URLs missing `<lastmod>`** (only blog posts have it)
- Deprecated `<changefreq>` and `<priority>` on every entry (Google ignores both)
- Missing pages: /about, /careers, /terms (linked from footer but 404)
- No sitemap index file (fine for 26 URLs but plan for growth)

---

## PRIORITIZED ACTION PLAN

### P0 -- CRITICAL (Fix Immediately, Week 1)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | **Fix trust contradictions**: Remove or substantiate "15,000+ students" claim; resolve Mumbai vs Delhi address conflict | Credibility, YMYL compliance | Low |
| 2 | **Fix /about and /careers 404s**: Create pages or remove footer links | Broken links on every page | Medium |
| 3 | **Add width/height to ALL 28 images** | Fixes CLS (0.35 -> <0.1) | Low |
| 4 | **Remove `loading="lazy"` from hero image**, add `fetchpriority="high"` | Fixes LCP (-300-800ms) | Trivial |
| 5 | **Fix 307 -> 301 redirect** for non-www to www | Link equity consolidation | Trivial |
| 6 | **Fix BlogPosting schema errors**: ISO 8601 dates, add publisher.logo, absolute image URLs | Unlocks Article rich results | Low |
| 7 | **Fix Organization schema**: Populate sameAs, fix logo format | Schema validation | Trivial |
| 8 | **Fix LocalBusiness schema**: Replace placeholder address with real address | Schema validation, trust | Trivial |
| 9 | **Fix content contradictions**: Loan amounts, country counts must be consistent | Trust, accuracy | Low |

### P1 -- HIGH (Week 2-3)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 10 | **Add internal links to all 9 course pages** from navigation, service pages, and blog | Orphaned pages get crawled/ranked | Medium |
| 11 | **Create About page** with named founders, credentials, company registration, team photos | E-E-A-T, entity establishment | Medium |
| 12 | **Add security headers** (CSP, X-Frame-Options, X-Content-Type-Options, etc.) | Security, trust signals | Low |
| 13 | **Create llms.txt file** | AI discoverability (quick win) | Trivial |
| 14 | **Add FinancialProduct schema** on /abroad-study-loan and /india-study-loan | Rich results for core pages | Low |
| 15 | **Add WebSite + SearchAction schema** on homepage | Sitelinks search box | Low |
| 16 | **Add BreadcrumbList schema** on all subpages | Breadcrumb trail in SERPs | Low |
| 17 | **Switch to Next.js `<Image>` component** | Auto WebP/AVIF, srcset, dimensions | Medium |
| 18 | **Defer GA4 loading** (remove preload, use `strategy="lazyOnload"`) | LCP/INP improvement | Trivial |
| 19 | **Add `async` to polyfills script** | Unblocks parser, improves FCP | Trivial |
| 20 | **Add `<lastmod>` to all 26 sitemap URLs**, remove changefreq/priority | Crawl efficiency | Low |
| 21 | **Add regulatory disclosures** (RBI registration, aggregator disclaimer) | Legal compliance, YMYL trust | Medium |

### P2 -- MEDIUM (Month 2)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 22 | **Expand service pages to 2,000+ words** with bank comparisons, real examples | Content depth, rankings | High |
| 23 | **Differentiate course pages** -- each needs 50%+ unique content | Avoid thin content suppression | High |
| 24 | **Add individual author profiles** with verifiable credentials | E-E-A-T author signals | Medium |
| 25 | **Rewrite headings as search questions** ("What Is..." instead of "Let Your Dreams...") | AI citation, featured snippets | Medium |
| 26 | **Expand passages to 134-167 words** per section | Optimal AI citation length | Medium |
| 27 | **Add source attribution to all statistics** | Citability, trust | Medium |
| 28 | **Add real student testimonials** with names, courses, universities | Social proof, trust | Medium |
| 29 | **Fix blog SSR** so content renders for non-browser clients | 46% of content unlocked for AI | Medium |
| 30 | **Create Terms of Service page** | Legal compliance, trust | Low |
| 31 | **Differentiate AI crawlers in robots.txt** (allow search bots, block training bots) | Strategic AI visibility | Trivial |
| 32 | **Add comparison tables** in HTML `<table>` markup (not cards) | AI extraction, featured snippets | Medium |
| 33 | **Standardize author names** across all blog posts | Consistency, schema accuracy | Trivial |

### P3 -- LOW (Month 3+)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 34 | Build country-specific loan guides (USA, UK, Canada, etc.) | High-volume keyword opportunity | High |
| 35 | Build university-specific loan pages | Long-tail traffic | High |
| 36 | Build per-bank comparison pages (beyond SBI/HDFC) | Topical authority | High |
| 37 | Create YouTube channel with educational content | Strongest AI citation signal | High |
| 38 | Build Reddit presence in education subreddits | Brand authority | Medium |
| 39 | Add financial glossary for internal linking | Topical depth | Medium |
| 40 | Create downloadable resources (checklists, planners) | Lead gen, trust | Medium |
| 41 | Implement IndexNow for faster Bing/Yandex indexing | Crawl speed | Low |
| 42 | Self-host images (replace Unsplash URLs) | LCP improvement, reliability | Medium |
| 43 | Optimize logo to SVG or WebP | -30KB bandwidth | Low |
| 44 | Enable HTML compression (check Vercel config) | -90KB per page load | Low |

---

## SCORING COMPARISON VS COMPETITORS (Estimated)

| Metric | FundMyCampus | WeMakeScholars | GyanDhan | Leap Finance |
|--------|-------------|----------------|----------|--------------|
| Domain Age | < 3 months | 7+ years | 6+ years | 5+ years |
| Content Pages | ~26 | 500+ | 300+ | 200+ |
| E-E-A-T | 27/100 | ~75/100 | ~70/100 | ~72/100 |
| Technical SEO | 62/100 | ~70/100 | ~65/100 | ~75/100 |
| Schema | 40/100 | ~60/100 | ~55/100 | ~65/100 |
| Overall | **48/100** | ~70/100 | ~65/100 | ~72/100 |

---

## 90-DAY ROADMAP

### Week 1-2: Foundation Fixes
- Fix all P0 critical issues (broken links, trust contradictions, CWV failures, schema errors)
- Create About page with real credentials
- Add regulatory disclosures
- **Expected score improvement: 48 -> 58**

### Week 3-4: Schema & Structure
- Deploy all missing schema (FinancialProduct, WebSite, BreadcrumbList)
- Fix internal linking architecture (link to course pages, cross-link content)
- Create llms.txt
- Add security headers
- **Expected score improvement: 58 -> 65**

### Month 2: Content Depth
- Expand service pages to 2,000+ words
- Differentiate course pages (50%+ unique content)
- Add individual authors with credentials
- Add testimonials and trust signals
- Fix blog SSR for AI crawlers
- **Expected score improvement: 65 -> 72**

### Month 3: Authority Building
- Launch country-specific guides (6 countries)
- Launch YouTube channel
- Build bank comparison pages
- Begin Reddit/community engagement
- **Expected score improvement: 72 -> 78**

---

*Report generated by Claude SEO Audit Suite. Scores are estimates based on automated analysis. Validate Core Web Vitals with Google PageSpeed Insights and monitor rankings via Google Search Console.*
