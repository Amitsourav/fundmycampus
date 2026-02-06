# FundMyCampus - Product Requirements Document (PRD)

> **Version:** 1.0.0
> **Last Updated:** February 2026
> **Project Type:** Education Loan Financing Platform
> **Status:** Production Ready

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Technology Stack](#3-technology-stack)
4. [Project Architecture](#4-project-architecture)
5. [Design System](#5-design-system)
6. [Page-by-Page Specification](#6-page-by-page-specification)
7. [Component Library](#7-component-library)
8. [Data & Content](#8-data--content)
9. [Animation System](#9-animation-system)
10. [User Flows](#10-user-flows)
11. [SEO & Metadata](#11-seo--metadata)
12. [Future Roadmap](#12-future-roadmap)

---

## 1. Executive Summary

### 1.1 Product Overview

**FundMyCampus** is a premium education financing platform designed to help students access education loans for studying abroad and pursuing higher education in India. The platform connects students with 12+ banking partners, offering loans up to ₹3 Crore with competitive interest rates starting from 8.5% p.a.

### 1.2 Key Value Propositions

| Feature | Description |
|---------|-------------|
| **100% Financing** | Complete tuition and living expense coverage |
| **48-Hour Approval** | Quick digital loan processing |
| **Zero Collateral** | Up to ₹7.5 Lakhs without security |
| **50+ Countries** | Global study destination coverage |
| **12+ Bank Partners** | Multiple lending options |
| **Expert Counselors** | Dedicated loan specialists |

### 1.3 Target Audience

- Indian students seeking to study abroad (USA, UK, Canada, Australia, Germany, Singapore)
- Students pursuing higher education at premier Indian institutions (IITs, IIMs, AIIMS, NITs, NLUs)
- Parents/guardians as co-applicants
- Age group: 17-35 years

### 1.4 Business Metrics (Displayed)

| Metric | Value |
|--------|-------|
| Amount Disbursed | ₹500 Cr+ |
| Students Funded | 15,000+ |
| Countries Covered | 50+ |
| Success Rate | 98% |
| Average Rating | 4.9/5 |
| Satisfaction Rate | 99% |

---

## 2. Product Vision & Goals

### 2.1 Vision Statement

> "Removing financial barriers to quality education by providing premium, personalized education financing solutions for ambitious students worldwide."

### 2.2 Core Goals

1. **Accessibility** - Make education loans accessible to students from all backgrounds
2. **Speed** - Reduce loan approval time to 48 hours
3. **Transparency** - No hidden charges, clear terms
4. **Support** - End-to-end guidance through the loan process
5. **Coverage** - Support all major study destinations and courses

### 2.3 Brand Positioning

- **Tone:** Premium, Professional, Trustworthy
- **Style:** Luxury, Modern, Clean
- **Colors:** Black (sophistication), Yellow/Gold (prosperity), White (clarity)

---

## 3. Technology Stack

### 3.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.10 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| Framer Motion | 12.29.2 | Animation library |
| GSAP | 3.14.2 | Advanced animations |
| Lucide React | 0.563.0 | Icon library |

### 3.2 Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | 9.x | Code linting |
| PostCSS | 8.5.6 | CSS processing |
| Autoprefixer | 10.4.23 | Browser compatibility |
| Node.js | ES2017+ | Runtime |

### 3.3 Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build --no-lint",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## 4. Project Architecture

### 4.1 Directory Structure

```
fundmycampus/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── loading.tsx                   # Loading state
│   ├── not-found.tsx                 # 404 page
│   ├── globals.css                   # Global styles
│   ├── contact/
│   │   └── page.tsx                  # Contact page
│   ├── tools/
│   │   └── page.tsx                  # Financial calculators
│   ├── abroad-study-loan/
│   │   └── page.tsx                  # Study abroad loans
│   ├── india-study-loan/
│   │   └── page.tsx                  # India study loans
│   └── courses-loan/                 # Course-specific loans
│       ├── bba/page.tsx
│       ├── bca/page.tsx
│       ├── bds/page.tsx
│       ├── bsc-nursing/page.tsx
│       ├── btech/page.tsx
│       ├── ca/page.tsx
│       ├── hotel-management/page.tsx
│       ├── mbbs/page.tsx
│       └── mba/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Navigation header
│   │   └── Footer.tsx                # Site footer
│   ├── home/
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── DreamsFlight.tsx          # Features section
│   │   ├── Testimonials.tsx          # Why choose us carousel
│   │   ├── LoanPartners.tsx          # Bank partners table
│   │   ├── Reviews.tsx               # Student reviews carousel
│   │   ├── AbroadFocus.tsx           # Abroad focus section
│   │   ├── IndiaLoanPreview.tsx      # India loan preview
│   │   ├── Process.tsx               # Loan process steps
│   │   ├── WhyFundMyCampus.tsx       # Value proposition
│   │   └── CTA.tsx                   # Call-to-action
│   └── ui/
│       ├── Button.tsx                # Button component
│       ├── Card.tsx                  # Card component
│       ├── SectionTitle.tsx          # Section headings
│       ├── MorphingText.tsx          # Text animation
│       ├── CharacterMorph.tsx        # Character animation
│       ├── RoboticTypewriter.tsx     # Typewriter effect
│       ├── ScrambledText.tsx         # Scramble animation
│       └── SegmentedImageTransition.tsx
├── lib/
│   └── animations.ts                 # Animation definitions
├── public/
│   └── images/
│       └── banks/                    # Bank logo assets
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── postcss.config.mjs                # PostCSS config
└── package.json                      # Dependencies
```

### 4.2 Routing Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, features, testimonials |
| `/abroad-study-loan` | Study Abroad | International education loans |
| `/india-study-loan` | Study in India | Domestic education loans |
| `/courses-loan/[course]` | Course Loans | 9 course-specific pages |
| `/tools` | Calculators | 5 financial tools |
| `/contact` | Contact | Contact form and info |
| `/about` | About | Company information (planned) |
| `/blogs` | Blog | Educational content (planned) |

---

## 5. Design System

### 5.1 Color Palette

#### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Text, backgrounds, premium feel |
| Charcoal | `#1C1C1C` | Dark backgrounds |
| Noir | `#0A0A0A` | Deepest black |

#### Secondary Colors (Gold/Yellow)

| Shade | Hex | Usage |
|-------|-----|-------|
| Yellow 50 | `#FFFEF5` | Light backgrounds |
| Yellow 200 | `#FEF08A` | Hover states |
| Yellow 400 | `#FACC15` | Buttons, highlights |
| Yellow 500 | `#EAB308` | Primary accent |
| Yellow 600 | `#CA8A04` | Active states |
| Gold | `#FFD700` | Premium elements |

#### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Backgrounds, cards |
| Ivory | `#FAFAFA` | Page backgrounds |
| Gray 50-900 | Spectrum | Text, borders |

#### Functional Colors

| Type | Color | Hex |
|------|-------|-----|
| Success | Green | `#10B981` |
| Warning | Orange | `#F59E0B` |
| Error | Red | `#EF4444` |

### 5.2 Typography

#### Font Families

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-serif: 'Playfair Display', Georgia, serif;
```

#### Type Scale

| Name | Size | Usage |
|------|------|-------|
| Display XL | clamp(3rem, 8vw, 5rem) | Hero headlines |
| Display LG | clamp(2.5rem, 6vw, 4rem) | Page titles |
| Display MD | clamp(2rem, 4vw, 3rem) | Section titles |
| Display SM | clamp(1.5rem, 3vw, 2rem) | Subsections |
| Body | 1rem (16px) | Paragraph text |
| Small | 0.875rem (14px) | Captions, labels |

#### Letter Spacing

| Name | Value |
|------|-------|
| wide-sm | 0.025em |
| wide-md | 0.05em |
| wide-lg | 0.1em |
| wide-xl | 0.15em |

### 5.3 Spacing System

| Size | Value | Usage |
|------|-------|-------|
| 18 | 4.5rem | Custom spacing |
| 88 | 22rem | Large sections |
| 120 | 30rem | Hero sections |
| screen-xl | 1280px | Max container |

### 5.4 Shadow System

```css
shadow-soft: 0 10px 30px rgba(0,0,0,0.05);
shadow-soft-lg: 0 20px 50px rgba(0,0,0,0.08);
shadow-soft-xl: 0 30px 70px rgba(0,0,0,0.1);
```

### 5.5 Border Radius

| Name | Value |
|------|-------|
| card | 16px |
| button | 8px / full |
| input | 12px |

---

## 6. Page-by-Page Specification

### 6.1 Home Page (`/`)

#### Components Used
1. Hero
2. DreamsFlight
3. Testimonials
4. LoanPartners
5. Reviews

#### Hero Section
- **Headline:** "Funding Your Education Dreams"
- **Subheadline:** "We help fuel educational dreams by removing the barriers to financial access through private student loans."
- **CTA:** "Apply for Loan" button
- **Visual:** Student graduation image
- **Trust Indicators:** ₹500Cr+ disbursed, 15,000+ students, 50+ countries

#### DreamsFlight Section
- **Title:** "Let Your Dreams Take Flight"
- **Tabs:** Study Abroad / Study in India
- **Features Grid:**
  - 100% Financing
  - Flexible Repayments
  - Quick Solutions
  - Customizable Loans

#### Testimonials Carousel (Why Choose Us)
- Auto-rotating (4 seconds)
- 6 feature cards:
  1. 100% Secure Process
  2. 48-Hour Approval
  3. Competitive Rates (8.5% p.a.)
  4. Global Coverage (50+ countries)
  5. Expert Counselors
  6. No Hidden Charges

#### LoanPartners Section
**12 Banking Partners:**

| Bank | Processing Fee | Max Loan | Tenure |
|------|---------------|----------|--------|
| ICICI Bank | 0.5-1% | ₹2 Cr | 14 years |
| Axis Bank | 0.5-1% | ₹3 Cr | 15 years |
| Credila | 0.85-1% | ₹1 Cr | 15 years |
| PNB | 0.5-1% | ₹2 Cr | 15 years |
| Union Bank | 0-₹5K | ₹75 Lakhs | 15 years |
| IDFC First | 0.5-1% | ₹1.5 Cr | 15 years |
| Yes Bank | 0.5-1% | ₹2 Cr | 15 years |
| Avanse | 0-0.5% | ₹1.5 Cr | 15 years |
| Tata Capital | 0.5-1% | ₹2 Cr | 15 years |
| Auxilo | 0-0.5% | ₹1.5 Cr | 15 years |
| Prodigy Finance | 0-5% | $150K | 15 years |
| Poonawalla | 0.75-1% | ₹3 Cr | 15 years |

#### Reviews Carousel
- Auto-rotating (5 seconds)
- 5 student testimonials with:
  - Profile image
  - Name
  - Course & University
  - 5-star rating
  - Review text
  - "Funded Successfully" badge

**Student Reviews Data:**

| Name | Course | University |
|------|--------|------------|
| Arjun Patel | MBA | Harvard Business School |
| Priya Sharma | MS Computer Science | Stanford |
| Rohit Kumar | MSc Data Science | Oxford |
| Sneha Gupta | MBBS | University of Melbourne |
| Vikash Singh | Engineering | University of Toronto |

### 6.2 Study Abroad Loan Page (`/abroad-study-loan`)

#### Hero Section
- **Icon:** Globe
- **Title:** "Study Abroad Education Loans"
- **Loan Amount:** Up to ₹1.5 Crore
- **CTAs:** Apply Now, Check Eligibility

#### Countries Covered (6)

| Country | Top Universities | Avg Loan |
|---------|------------------|----------|
| United States | Harvard, MIT, Stanford | ₹40-60 Lakhs |
| United Kingdom | Oxford, Cambridge, LSE | ₹35-50 Lakhs |
| Canada | UofT, UBC, McGill | ₹30-45 Lakhs |
| Australia | ANU, Melbourne, Sydney | ₹25-40 Lakhs |
| Germany | TU Munich, Heidelberg | ₹15-25 Lakhs |
| Singapore | NUS, NTU, SMU | ₹20-35 Lakhs |

#### Loan Features

| Feature | Detail |
|---------|--------|
| Max Amount | ₹1.5 Crore |
| Collateral-free | Up to ₹7.5 Lakhs |
| Approval Time | 48 hours |
| Interest Rate | From 8.5% p.a. |

#### Eligibility Criteria
- Indian citizen with confirmed foreign admission
- Age: 18-35 years
- Co-applicant with stable income
- 60% minimum in previous education
- Valid passport and visa

#### Documents Required
- Admission letter
- Academic transcripts
- Income proof (co-applicant)
- Bank statements (6 months)
- Passport & visa
- Property documents (if collateral)

#### Process Steps
1. Apply Online
2. Document Upload
3. Quick Approval (48 hrs)
4. Disbursement to University

### 6.3 India Study Loan Page (`/india-study-loan`)

#### Hero Section
- **Icon:** MapPin
- **Title:** "Education Loans for Study in India"
- **Loan Amount:** Up to ₹40 Lakhs

#### Top Institutions (6)

| Category | Institution | Avg Fees | Courses |
|----------|-------------|----------|---------|
| IITs | Indian Institutes of Technology | ₹2-8 Lakhs | Engineering |
| IIMs | Indian Institutes of Management | ₹20-25 Lakhs | MBA |
| AIIMS | All India Institute Medical | ₹5-15 Lakhs | MBBS |
| NITs | National Institutes of Technology | ₹2-6 Lakhs | Engineering |
| NLUs | National Law Universities | ₹3-12 Lakhs | Law |
| Private | Top Private Universities | ₹8-25 Lakhs | All |

#### Government Schemes

| Scheme | Benefit | Eligibility |
|--------|---------|-------------|
| Central Sector Interest Subsidy | 100% interest subsidy during moratorium | Income < ₹4.5 Lakhs |
| Dr. APJ Abdul Kalam Scheme | Interest subsidy for technical courses | Income < ₹4.5 Lakhs |
| Padho Pardesh | Interest subsidy for abroad | Income < ₹6 Lakhs |

### 6.4 Course Loan Pages (9 Pages)

Each course page includes:
- Hero with course icon
- Loan features grid
- Industry statistics
- Specializations with salary ranges
- Top colleges with fees
- Career prospects table
- Eligibility criteria
- Documents checklist
- CTA section

#### Course Coverage Summary

| Course | Max Loan | Top Salary |
|--------|----------|------------|
| B.Tech | ₹30 Lakhs | ₹50 LPA |
| MBBS | ₹1 Crore | ₹50 LPA |
| MBA | ₹50 Lakhs | ₹70 LPA |
| BBA | ₹12 Lakhs | ₹20 LPA |
| BCA | ₹15 Lakhs | ₹12 LPA |
| BDS | ₹25 Lakhs | ₹25 LPA |
| CA | ₹8 Lakhs | ₹50 LPA |
| B.Sc Nursing | ₹12 Lakhs | ₹18 LPA |
| Hotel Management | ₹20 Lakhs | ₹25 LPA |

### 6.5 Tools Page (`/tools`)

**5 Interactive Financial Calculators:**

#### 1. EMI Calculator
- **Inputs:** Loan amount, Interest rate, Tenure
- **Formula:** EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
- **Outputs:** Monthly EMI, Total interest, Total payment

#### 2. Education Cost Calculator
- **Inputs:** Destination, Course type, Duration, Accommodation
- **Outputs:** Tuition, Living expenses, Other costs, Total

**Cost Matrix:**

| Destination | Engineering | Medical | Management |
|-------------|-------------|---------|------------|
| India | ₹1.5L/yr | ₹5L/yr | ₹3L/yr |
| USA | ₹45L/yr | ₹70L/yr | ₹60L/yr |
| UK | ₹35L/yr | ₹50L/yr | ₹45L/yr |
| Canada | ₹30L/yr | ₹40L/yr | ₹35L/yr |
| Australia | ₹35L/yr | ₹45L/yr | ₹40L/yr |

#### 3. Loan Eligibility Calculator
- **Inputs:** Monthly income, Existing EMI, Credit score, Co-applicant income
- **Credit Score Multipliers:**
  - 800+: 1.2x
  - 750-800: 1.0x
  - 700-750: 0.8x
  - 650-700: 0.6x
  - Below 650: 0.4x

#### 4. Loan Comparison Tool
- Compare up to 3 loan options
- Side-by-side EMI, interest, and total cost

#### 5. Tax Benefits Calculator
- Section 80E deduction
- Up to ₹1 Lakh interest deduction
- Tax savings based on slab (5%, 20%, 30%)

### 6.6 Contact Page (`/contact`)

#### Contact Form Fields
- Name (required)
- Email (required)
- Phone (required)
- Loan Type (dropdown)
- Message (textarea)

#### Contact Information

| Type | Details |
|------|---------|
| Phone | +91 98765 43210, +91 98765 43211 |
| Email | info@fundmycampus.com, support@fundmycampus.com |
| Address | 123, Financial District, Mumbai 400001 |
| Hours | Mon-Fri 9AM-7PM, Sat 10AM-5PM |

---

## 7. Component Library

### 7.1 Layout Components

#### Header (`components/layout/Header.tsx`)

**State Management:**
- `isScrolled` - Shadow on scroll
- `isMobileMenuOpen` - Mobile nav toggle
- `isProductDropdownOpen` - Product dropdown
- `isCoursesDropdownOpen` - Courses submenu

**Navigation Structure:**
```
- Product (dropdown)
  ├── Student Loan Abroad
  ├── Student Loan Domestic
  └── Student Loan for Courses
      ├── BCA
      ├── Hotel Management
      ├── BDS
      ├── BBA
      ├── MBA
      ├── B Tech
      ├── MBBS
      ├── BSc Nursing
      └── CA
- Tools
- Blogs
- Contact
- [CTA] Apply for Abroad Loan
```

#### Footer (`components/layout/Footer.tsx`)

**Sections:**
```
Brand Info | Services | Company | Legal | Connect
           | - Abroad | - About | - Privacy | - Email
           | - India  | - Contact| - Terms  | - Phone
           | - Process| - Careers|          |
```

### 7.2 UI Components

#### Button (`components/ui/Button.tsx`)

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost"
  size: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}
```

**Styles:**

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | Yellow-500 | Black | None |
| Secondary | Black | White | Yellow |
| Ghost | Transparent | White | None |

| Size | Padding | Font |
|------|---------|------|
| sm | px-5 py-2.5 | text-sm |
| md | px-7 py-3 | text-base |
| lg | px-9 py-3.5 | text-base |

#### Card (`components/ui/Card.tsx`)

```typescript
interface CardProps {
  hoverable?: boolean
  padding: "none" | "sm" | "md" | "lg" | "xl"
}
```

#### SectionTitle (`components/ui/SectionTitle.tsx`)

```typescript
interface SectionTitleProps {
  title: string
  subtitle?: string
  align: "left" | "center"
}
```

### 7.3 Animation Components

| Component | Effect |
|-----------|--------|
| MorphingText | Text morphing animation |
| RoboticTypewriter | Typewriter effect |
| ScrambledText | Text scramble/decode |
| CharacterMorph | Character transformation |
| SegmentedImageTransition | Image transitions |

---

## 8. Data & Content

### 8.1 Student Reviews Data

```typescript
const reviews = [
  {
    name: "Arjun Patel",
    course: "MBA at Harvard Business School",
    text: "FundMyCampus made my dream of studying at Harvard possible...",
    rating: 5
  },
  // ... 4 more reviews
];
```

### 8.2 Features Data (Testimonials)

```typescript
const features = [
  { title: "100% Secure Process", icon: "shield" },
  { title: "48-Hour Approval", icon: "clock" },
  { title: "Competitive Rates", icon: "money" },
  { title: "Global Coverage", icon: "globe" },
  { title: "Expert Counselors", icon: "users" },
  { title: "No Hidden Charges", icon: "check" }
];
```

### 8.3 Bank Partners Data

```typescript
const partners = [
  {
    name: "ICICI Bank",
    logo: "/images/banks/icici.jpeg",
    processingFees: "0.5% - 1%",
    loanAmount: "Up To ₹2 Cr",
    tenure: "Up To 14 Years"
  },
  // ... 11 more banks
];
```

### 8.4 Course Specializations

Each course page contains detailed specialization data with:
- Specialization name
- Career paths
- Salary ranges (entry to senior)
- Industry demand indicators

---

## 9. Animation System

### 9.1 Animation Library (`lib/animations.ts`)

**Base Configuration:**
```typescript
const premiumEase = [0.23, 1, 0.320, 1];
const baseDuration = 0.6;
```

### 9.2 Available Animations

| Animation | Type | Duration | Effect |
|-----------|------|----------|--------|
| fadeIn | Opacity | 0.6s | 0 → 1 |
| fadeInUp | Transform | 0.6s | y: 20px → 0 |
| fadeInDown | Transform | 0.6s | y: -20px → 0 |
| slideIn | Transform | 0.6s | x: -40px → 0 |
| slideInRight | Transform | 0.6s | x: 40px → 0 |
| scaleIn | Transform | 0.6s | scale: 0.95 → 1 |
| textReveal | Transform | 0.8s | y: 30px → 0 |
| staggerContainer | Stagger | 0.2s delay | Child stagger |
| staggerItem | Transform | 0.6s | y: 20px → 0 |

### 9.3 Interactive Animations

| Animation | Trigger | Effect |
|-----------|---------|--------|
| buttonHover | Hover | scale: 1.02 |
| buttonTap | Click | scale: 0.98 |
| cardHover | Hover | y: -4px, shadow |
| hoverScale | Hover | scale: 1.02 |
| hoverLift | Hover | y: -4px |

### 9.4 Scroll Animations

| Animation | Trigger | Effect |
|-----------|---------|--------|
| scrollReveal | InView | fadeInUp |
| sectionReveal | InView | staggered children |
| parallaxFade | Scroll | y: 40px → 0 |

---

## 10. User Flows

### 10.1 Primary User Journey

```
1. Land on Homepage
   ↓
2. View Hero & Trust Indicators
   ↓
3. Browse Features (DreamsFlight)
   ↓
4. Review Bank Partners
   ↓
5. Read Student Testimonials
   ↓
6. Click "Apply for Loan" / "Check Eligibility"
   ↓
7. Navigate to Loan Page (Abroad/India/Course)
   ↓
8. Review Loan Details & Eligibility
   ↓
9. Use Tools (EMI Calculator, etc.)
   ↓
10. Contact/Apply
```

### 10.2 Navigation Patterns

```
Header Navigation:
├── Logo → Home
├── Product → Loan Pages
│   ├── Abroad → /abroad-study-loan
│   ├── India → /india-study-loan
│   └── Courses → /courses-loan/[course]
├── Tools → /tools
├── Blogs → /blogs (planned)
├── Contact → /contact
└── CTA → /abroad-study-loan

Footer Navigation:
├── Services → Loan Pages
├── Company → About/Contact/Careers
└── Legal → Privacy/Terms
```

### 10.3 Calculator Flow

```
1. Select Calculator Tab
   ↓
2. Input Required Values
   ↓
3. View Real-time Results
   ↓
4. Compare Options (if applicable)
   ↓
5. Proceed to Application
```

---

## 11. SEO & Metadata

### 11.1 Root Metadata

```typescript
export const metadata: Metadata = {
  title: "FundMyCampus — Premium Education Financing for Global Aspirations",
  description: "Exclusive education loans for prestigious universities worldwide. Experience seamless financing with personalized service, competitive rates, and white-glove support.",
  keywords: "premium education loan, study abroad financing, international student loan, luxury education financing, elite university funding"
};
```

### 11.2 Page-Specific Metadata (Recommended)

| Page | Title | Keywords |
|------|-------|----------|
| Abroad | Study Abroad Education Loans | study abroad loan, international education |
| India | India Education Loans | IIT loan, IIM loan, AIIMS loan |
| B.Tech | B.Tech Education Loan | engineering loan, IIT funding |
| MBBS | MBBS Education Loan | medical education loan, AIIMS |
| MBA | MBA Education Loan | IIM loan, business school |

### 11.3 Structured Data (Recommended)

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "FundMyCampus",
  "description": "Education loan financing platform",
  "areaServed": "India",
  "serviceType": "Education Loans"
}
```

---

## 12. Future Roadmap

### 12.1 Planned Pages

| Page | Priority | Description |
|------|----------|-------------|
| `/about` | High | Company history, team, mission |
| `/blogs` | High | Educational content, guides |
| `/careers` | Medium | Job listings |
| `/privacy` | High | Privacy policy |
| `/terms` | High | Terms of service |
| `/faq` | Medium | Frequently asked questions |
| `/apply` | High | Online loan application form |

### 12.2 Feature Enhancements

| Feature | Priority | Description |
|---------|----------|-------------|
| User Authentication | High | Login/signup system |
| Application Portal | High | Online loan application |
| Document Upload | High | Secure document submission |
| Application Tracking | Medium | Real-time status updates |
| Chat Support | Medium | Live chat integration |
| Email Notifications | Medium | Application updates |
| Loan Calculator API | Low | Embeddable widget |

### 12.3 Technical Improvements

| Improvement | Priority |
|-------------|----------|
| Form Validation | High |
| API Integration | High |
| Analytics Setup | High |
| Performance Optimization | Medium |
| PWA Support | Low |
| Multi-language | Low |

### 12.4 Content Additions

| Content | Priority |
|---------|----------|
| Blog Articles | High |
| University Database | Medium |
| Scholarship Information | Medium |
| Country Guides | Medium |
| Video Testimonials | Low |

---

## Appendix A: Image Assets

### Bank Logos (`/public/images/banks/`)

| File | Bank |
|------|------|
| icici.jpeg | ICICI Bank |
| Axis.png | Axis Bank |
| credila.png | Credila |
| pnb.png | Punjab National Bank |
| union.jpeg | Union Bank |
| idfc.png | IDFC First Bank |
| yes.png | Yes Bank |
| avanse.png | Avanse |
| tata.png | Tata Capital |
| auxilo.png | Auxilo |
| prodigy.png | Prodigy Finance |
| poonawala.jpeg | Poonawalla Fincorp |

### External Images (Unsplash)

All student, campus, and feature images sourced from Unsplash with proper attribution.

---

## Appendix B: Contact Information

### Business Contact

- **Email:** hello@fundmycampus.com
- **Support:** support@fundmycampus.com
- **Phone:** +91 98765 43210
- **Location:** Mumbai, Maharashtra, India

### Business Hours

- Monday - Friday: 9:00 AM - 7:00 PM IST
- Saturday: 10:00 AM - 5:00 PM IST
- Sunday: Closed

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| EMI | Equated Monthly Installment |
| DTI | Debt-to-Income Ratio |
| Collateral | Security pledged for loan |
| Moratorium | Grace period before repayment |
| Co-applicant | Secondary loan guarantor |
| Processing Fee | Bank charge for loan processing |
| Section 80E | Income tax deduction for education loan interest |

---

**Document Version:** 1.0.0
**Created:** February 2026
**Maintained by:** FundMyCampus Development Team

---

*This PRD is a living document and will be updated as the product evolves.*
