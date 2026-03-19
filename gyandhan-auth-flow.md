# GyanDhan Complete Platform Documentation

Reference: [gyandhan.com](https://www.gyandhan.com)

---       

## Page Layout (Shared between Sign Up & Login)

- **Background**: Green gradient (light green left to darker green right)
- **Left side**: Hero text area
  - Heading: "Your Study Abroad Journey Partner" (dark purple, large font)
  - Subtext: "Use free expert resources and AI-powered tools to plan your study abroad journey. Sign in to apply for student loans with multiple lenders in one go and easily track your application status."
- **Right side**: Auth card (purple header, white body)
- **Header nav**: Full site navigation with logo, Loans, Scholarships, Study Abroad, Services, Blogs, Company, Community, "Log in" button (outlined), "Apply for Loan" button (solid purple)

---

## 1. Sign Up Page

**URL**: `/users/sign-up`
**Page Title**: "Member Registration | GyanDhan"

### Card Header
- Purple background
- Title: "Sign Up to GyanDhan" (white text)

### Form Fields

| # | Field | Type | Placeholder | Required | Notes |
|---|-------|------|-------------|----------|-------|
| 1 | Email | `input[type=email]` | `myname@example.com` | Yes | Validates against disposable email domains (e.g., mailinator blocked) |
| 2 | Create Password | `input[type=password]` | — | Yes | Has real-time validation checklist (see below) |
| 3 | Confirm Password | `input[type=password]` | `Confirm` | Yes | Must match Create Password |

### Password Validation Rules (shown below password field with green checkmarks)
- 8 characters minimum
- 1 number
- 1 capital letter
- 1 special character from `?!@$%^&*-.`

### Other Elements
- **Terms text**: "By clicking Sign Up, you agree to our [Terms] and [Privacy Policy]."
  - Terms link: `/Terms-of-Use.pdf`
  - Privacy Policy link: `/Privacy-Policy.pdf`
- **Submit button**: "Sign up" — Full-width, solid dark purple, white text
- **Existing user link**: "Existing User? [Log in]" — links to `/users/sign-in`

### Post-Signup Behavior
- Redirects to homepage
- Green banner: "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."
- User must click email confirmation link before they can log in

### Validation Behavior
- Server-side validation on submit
- Error shown as red banner at top of page AND red text below form: "Invalid email."
- Form fields are cleared on error (email retained in URL query param)
- Disposable/temporary email domains are rejected

---

## 2. Login Page

**URL**: `/users/sign-in`
**Page Title**: "Users or Student Login Page | GyanDhan | GyanDhan"

### Card Header
- Purple background
- Title: "Welcome to GyanDhan" (white text)

### Form Fields

| # | Field | Type | Placeholder | Required | Notes |
|---|-------|------|-------------|----------|-------|
| 1 | Email | `input[type=email]` | `myname@example.com` | Yes | |
| 2 | Password | `input[type=password]` | — | Yes | |

### Additional Controls
- **Remember me**: Checkbox (unchecked by default)
- **Login with OTP instead**: Link — allows OTP-based login as alternative to password
- **Forgot your password?**: Link to `/users/password/new`

### Other Elements
- **Terms text**: "By clicking Log In, you agree to our [Terms] and [Privacy Policy]."
- **Submit button**: "Log in" — Full-width, solid dark purple, white text
- **New user link**: "New User? [Sign Up Here]" — links to `/users/sign-up`
- **Role-based login links**:
  - "Log in as [Institute]" — links to `/institute-employees/sign-in`
  - "Log in as [Lender]" — links to `/lender-employees/sign-in`

### Post-Login Behavior
- Green banner: "Signed in successfully."
- Redirects to `/dashboard`
- Header changes: "Log in" button replaced with "My Profile" dropdown

---

## 3. Post-Login Dashboard

**URL**: `/dashboard`
**Page Title**: "GyanDhan"

### My Profile Dropdown (Header)
- **Dashboard** — links to `/dashboard`
- **Edit Profile** — links to `/profiles/{user_id}/edit`
- **Logout** — button (form submit)

### Dashboard Layout

#### User Profile Card (top-left)
- 3D avatar illustration (cartoon character)
- Greeting: "Hey," (large text)
- Email displayed below greeting
- "Edit Profile" link (arrow icon + text)

#### Tabs Section
- **My Loans** tab (default active, underlined)
- **My Referrals** tab
- Empty state message: "You have not applied for any education loans yet. Explore the loans you can avail through GyanDhan."

#### Loan Types Section (below tabs)
Two columns:

**Overseas Education** (left column)
- Description: "GyanDhan is a marketplace for loans to study abroad"
- Features with 3D icons:
  - Best Suited Loan Offers — "Highest loan amount at lowest interest rate covering all your education expenses."
  - Absolutely Free Service — "Top-notch loan assistance, no hidden costs. Customized assistance that prioritises your financial needs."
  - Quick & Hassle-Free Loans — "Expert service from loan application to getting the funds. Simple, smooth, swift."

**Domestic Education Loans** (right column)
- Description: "GyanDhan offers loans for skill development through any of the 500+ partner institutions."
- Sub-types with 3D icons:
  - Vocational Course Financing
  - College Fee Financing (zero-interest for partner colleges)
  - School Fee Financing

#### Right Sidebar
- **Suggested Blogs** — Carousel with blog cards (image, category tag, title, author, date, view count, prev/next arrows)
- **Upcoming Events** — Event cards (image, tag like "Exploration", title, date, time, "Online Event" badge, prev/next arrows)

#### AI Tools Section (bottom of dashboard)
- Heading: "Our free tools will help you out." + "Powered by AI"
- Carousel of tools:
  - **Loan Eligibility Checker** — "See your loan options upfront: quick, free, and accurate." → Check Eligibility button
  - **EMI Calculator** — "Determine your EMIs, repayment schedule..." → Calculate Now button

---

## 4. My Referrals Tab (Dashboard)

### Referral Banner
- Purple gradient card
- Title: "Welcome to GyanDhan Referrals!"
- Text: "Unlimited Rewards! ₹3,000 on every successful referral. ₹10,000 bonus on every 5th such referral."
- "Tell Me More" button

### Share Section
- Title: "Start Referring!"
- **Share link via**: Facebook, Twitter, WhatsApp, LinkedIn, Gmail icons
- **Copy link**: Unique referral URL (e.g., `https://www.gyandhan.com/bLDF1`) with "Copy" button

### Your Referral Journey (visual timeline)
- Milestone-based reward tracker with 3D icons:
  - 1st–4th Referral: INR 1,500 (Loan Sanction) + INR 1,500 (Disbursement) = ₹3,000 each
  - 5th Referral: ₹3,000 + INR 10,000 bonus
  - 9th Referral: ₹3,000
  - 10th Referral: ₹3,000 + INR 10,000 bonus
- Green progress line connecting milestones

---

## 5. Edit Profile Page

**URL**: `/profiles/{user_id}/edit`
**Page Title**: "Edit profile | GyanDhan"

### Header Banner
- "Hey, Let's get you set up!" (large text, purple)

### Section 1: Profile Picture & About Me

| Element | Details |
|---------|---------|
| Profile Picture | Upload option with preview area, "Upload Profile Picture →" link |
| Choose an avatar | 6 pre-made 3D avatar options (3x2 grid) — cartoon characters with different hairstyles |
| About Me | Textarea — "Write an introduction describing yourself and your study abroad journey." (0/2000 char limit) |

### Section 2: My Basic Details

| # | Field | Type | Placeholder | Required |
|---|-------|------|-------------|----------|
| 1 | Full Name | text | — | — |
| 2 | Date of Birth | date picker | dd/mm/yyyy | — |
| 3 | Passport Number | text | — | — |
| 4 | Gender | dropdown | "---Select Your Gender---" | — |
| 5 | Mother's Maiden Name | text | — | — |
| 6 | PAN Card Number | text | — | — |
| 7 | Phone | text + country code dropdown | `+91 (IN)` default, placeholder `8888800000` | — |
| 8 | Marital Status | dropdown | "---Select Your Marital Status---" | — |
| 9 | My LinkedIn URL | text | — | — |
| 10 | My Quora URL | text | — | — |
| 11 | My Twitter URL | text | — | — |
| 12 | My Instagram URL | text | — | — |

**Phone consent text**: "By entering my phone number here, I hereby authorize GyanDhan and its affiliate partners to contact me through call, message or WhatsApp. It will override my registry on the NCPR/NDNC"

### Section 3: Current Address

| # | Field | Type |
|---|-------|------|
| 1 | Search address | text (autocomplete) — "Type your address" |
| 2 | City | text |
| 3 | District | text |
| 4 | State | text |
| 5 | Country | text |
| 6 | Zip / PIN | text |

### Section 4: My Documents

Three upload areas (side by side):
- **My Resume** — "No document available to preview" + "Upload Documents →"
- **My Admit Card** — "No document available to preview" + "Upload Documents →"
- **My Identification Documents** — "No document available to preview" + "Upload Documents →"

### Save Button
- "Save Changes" — Centered, solid dark purple button

---

## 6. Loan Eligibility / Apply for Loan Page

**URL**: `/loaneligs`
**Page Title**: "Apply Education Loan For Abroad Study | Lowest Interest Rate Options | GyanDhan"

### Page Header
- Stats: "25,000+ Abroad Education Loans Sanctioned! 8,000+ Crore Disbursed!"
- Headline: "Secure a Study Abroad Education Loan- Collateral-Free"
- Bank partner logos carousel: SBI, Axis Bank, Credila, Union Bank, IDFC First, IDBI Bank, etc.
- 3D illustration (hand with graduation cap & coins)

### Multi-Step Form (2 steps)

#### Step 1: Basic Details

| # | Field | Type | Pre-filled | Required | Notes |
|---|-------|------|------------|----------|-------|
| 1 | Name | text | — | Yes* | |
| 2 | Gender | radio | — | Yes* | Female / Male / Other |
| 3 | Email | email | Yes (from login) | Yes* | |
| 4 | Phone | text + country code | — | Yes* | Placeholder: 8888800000 |
| — | WhatsApp confirmation | radio | Yes (default) | — | "Is the above number on WhatsApp?" Yes/No |
| 5 | College offer letter? | radio | — | Yes* | Yes/No — **conditional: reveals more fields if Yes** |

#### Conditional Fields (when "College offer letter = Yes")

| # | Field | Type | Placeholder | Required |
|---|-------|------|-------------|----------|
| 6 | Tentative Course Start Year | dropdown | "Select from dropdown" | Yes* |
| 7 | Tentative Course Start Month | dropdown | "Select from Dropdown" | Yes* |
| 8 | Target Course Level | dropdown | "Please select" | Yes* |
| 9 | Target Course Degree | dropdown | "Select" | Yes* |
| 10 | Target Course Name | text | "Masters in Computer Science" | Yes* |
| 11 | Target Country | dropdown | "Select" | Yes* |
| 12 | Target College/University | text (autocomplete) | "Eg: University of Texas Dallas" | Yes* |

**Hint below university field**: "Please continue typing even if you don't find your institute in the list"

#### Collateral and Other Details

| # | Field | Type | Default/Placeholder | Required | Notes |
|---|-------|------|---------------------|----------|-------|
| 13 | Required Loan Amount | number (INR prefix) | 20,00,000 | Yes* | Min: 1 Lakh, Max: 2 Crores. Has info tooltip |
| 14 | Security/Collateral | radio | — | Yes* | Yes/No |
| 15 | Co-Applicant's Monthly Income | number (INR prefix) | 1,00,000 | Yes* | Min: 0, Max: 1 Crore |
| 16 | Co-Applicant's Existing Monthly EMIs | number (INR prefix) | 50,000 | Yes* | Min: 0, Max: 1 Crore |
| 17 | Where Did You First Hear About Us? | dropdown | — | Yes* | |

**"Next" button** at bottom right

#### Step 2: Additional Details
- (Not explored to avoid creating a real loan application — Step 2 likely collects more detailed financial/academic info)

### Left Sidebar (Value Props)
- Best Loan Offers For You — "Apply for multiple loans in one go and discover the one that suits you."
- Quick & Hassle Free Loans — "Get expert assistance for quick and hassle-free loans with a higher approval rate."
- Absolutely Free Service — "Get the lowest interest rate and expert end-to-end service at no extra cost to you!"

---

## 7. Refer & Earn Page

**URL**: `/refer_now`
**Page Title**: "Gyandhan | Refer a friend and earn unlimited cash | GyanDhan"

### Hero Section
- Heading: "Refer and Earn Unlimited" (green highlight on "Earn Unlimited")
- Text: "Earn ₹3,000 per referral, your friend gets ₹1,500. Bonus ₹10,000 on every 5th referral for you."
- "Refer Now" button (dark purple)
- 3D illustration (girl with megaphone + phone mockup)

### How to Refer & Earn (5-step visual process)
1. Share your referral link with friends or in groups
2. Get notified when they apply & secure a loan
3. You earn ₹1,500 after their loan sanction and another ₹1,500 after they disburse!
4. The referred person also gets ₹1,500 after their loan disbursal
5. Transfer your earnings to your bank account. Keep referring to keep earning!

### Motivational Banner
- Purple gradient: "Your network is your treasure! Start referring even before your education loan is sanctioned. Don't wait!"

---

## 8. Scholarships Page

**URL**: `/scholarships`
**Page Title**: "Scholarships For Indian Students | Study Abroad Scholarships | GyanDhan"

### Hero Section (purple gradient background)
- Heading: "Study Abroad Scholarships"
- Subtext: "Maximize Savings! Explore and apply for scholarships tailored to your needs"
- Stats with 3D icons:
  - Scholarships: 176+
  - Amount($): 1,000,000+
  - Country: 100+

### Popular Scholarships Section
- List of scholarship cards (e.g., "GyanDhan Scholarship", "Prodigy Finance-GyanDhan Scholarship 2024")

### Filter Sidebar
- **Country** — dropdown
- **Course Level** — dropdown
- Clear All link

### Floating CTA
- "Check Loan Eligibility" button (persistent bottom-right)

---

## 9. EMI Calculator Page

**URL**: `/education-loan-emi-calculator`
**Page Title**: "Free Education Loan EMI Calculator 2026 | Calculate Student Loan EMI with Moratorium | GyanDhan"

### Calculator Inputs (left card)

| # | Field | Type | Default | Range |
|---|-------|------|---------|-------|
| 1 | Loan Amount | number (INR) | 20,00,000 | — (shows amount in words: "Twenty Lakh") |
| 2 | Course Duration (in Months) | number | 24 | — |
| 3 | Loan Tenure | slider + number | 12 years | 1–15 years |
| 4 | Rate of Interest | slider + number | 11% | 5%–20% |
| 5 | Repayment Start While Studying? | radio | No | Yes/No |
| 6 | Grace Period | slider | 6 months | 0–12 months |

**Note**: "This is your repayment period after the moratorium (course duration + grace period) ends."

### Results Card (right side)
- **Your EMI will be**: ₹29,897 (large green text)
- **Total interest you'll have to pay**: ₹23,05,211
- **Your total payment (Principal + Interest)**: ₹43,05,211
- "View Details" button (expandable)

---

## 10. Forgot Password Page

**URL**: `/users/password/new`
**Page Title**: "Password reset page | GyanDhan"

### Layout
- Same layout as Sign Up / Login (hero left, card right)
- Purple card header: "Forgot your password"

### Form Fields

| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Email | `input[type=email]` | Yes |

### Button
- "Send Password Instructions" — Full-width, solid dark purple

### Additional Links
- "Login" — back to `/users/sign-in`
- "Don't have account? Sign Up" — to `/users/sign-up`
- "Didn't receive confirmation instructions?" — resend confirmation email
- "Didn't receive unlock instructions?" — resend unlock email

### Behavior
- When logged in: Redirects to `/dashboard` with green banner "You are already signed in."

---

## 11. OTP Login Flow

**URL**: `/users/sign-in` (same page, toggled view)

### Layout
- Same card, but simplified form when OTP mode is selected

### Form Fields

| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Email | `input[type=email]` | Yes |

### Button
- "Send OTP" — Full-width, solid dark purple

### Toggle Link
- "Login with Password" — switches back to password login view

### Behavior
- User enters email → clicks "Send OTP" → OTP sent to email → enters OTP → logged in
- No password needed — email-only authentication

---

## 12. Events Page

**URL**: `/events`
**Page Title**: "Study Abroad Events, Webinars, AMAs, Seminars, Networking Meetups & Fairs | GyanDhan"

### Hero Section (purple gradient)
- Heading: "GyanDhan's Exclusive Study Abroad Events"
- Subtext: "Join our weekly events covering everything from study abroad insights to education loans, finance, and more."
- 3D illustration (video call screen on desk with lamp + plant)

### Our Upcoming Events (carousel)
- Event cards with:
  - Cover image with banner text (e.g., "Live QnA with experts")
  - Category tag (e.g., "Loan Event") — purple pill
  - Event title (bold)
  - Date (e.g., "Fri, March 06, 2026")
  - Time (e.g., "18:00 IST")
  - "Online Event" badge (green)
- Prev/Next carousel arrows
- "View more" link

### Filters Sidebar (right)
- **Target Country** — dropdown
- **Stage of Journey** — dropdown
- **Event Timings** — dropdown
- "Search" button (solid purple)

### Popular Tags
- Pill buttons: "Other (Non-GyanDhan Event)", "College Sessions", "Webinar", "Ask me Anything", etc.

### Floating CTA
- "Get Admission Help" button (persistent)

---

## 13. Blogs Page

**URL**: `/blogs`
**Page Title**: "GyanDhan Blogs: Your guide to higher studies abroad | GyanDhan"

### Hero Section (purple gradient)
- Heading: "Study Abroad Blogs by GyanDhan"
- Subtext: "Unlock a world of knowledge, insights, and inspiration with our diverse range of blog topics"
- 3D illustration (two people studying at desk with charts)

### Search & Filter
- Search bar: "Search for blogs..." (full-width)
- "Filters" dropdown button

### Trending Blogs Section
- Heading: "Trending blogs" + "View more" link
- Blog cards in carousel with cover images and title overlays

---

## 14. FAQs Page

**URL**: `/faq`
**Page Title**: "FAQs | GyanDhan"

### Hero Section (purple gradient)
- Breadcrumb: Home > FAQ
- Heading: "Frequently Asked Questions"

### Tab Navigation
- **General** (default active)
- **Lender**
- **Student**
- **Other Services**

### Content Format
- Accordion-style Q&A sections
- Grouped by sub-category (e.g., "About Us" under General)
- Each question has expand/collapse icon
- Questions like: "Why GyanDhan?", "Does GyanDhan provide financing?", "Who runs GyanDhan?"

---

## 15. About Us Page

**URL**: `/aboutus`
**Page Title**: "About us | GyanDhan"

### Hero Section
- Heading: "Welcome to GyanDhan - Your Gateway to Educational Empowerment"
- Subtext describing services: education loans, counseling, exam prep, forex, credit cards, accommodation, scholarships, blogs
- 3D character illustrations (6 diverse avatars in grid)

### Year-Wise Milestones
- Timeline section: "Our Year-Wise Milestones" with achievements from 2015 onwards

---

## 16. Contact Us Page

**URL**: `/contactus`
**Page Title**: "Contact GyanDhan – Get Expert Assistance for Education Loans | GyanDhan"

### Layout
- Left side: Company message text
- Right side: Contact form

### Form Fields

| # | Field | Type | Placeholder | Required |
|---|-------|------|-------------|----------|
| 1 | Full Name | text | "Eg: John Smith" | Yes* |
| 2 | Email Address | email | "Eg: john.doe@glopmail.com" | Yes* |
| 3 | Phone No. | text (+91 prefix) | "8888800000" | Yes* |
| 4 | Category | dropdown | "General Query" (default) | Yes* |
| 5 | Subject | text | "Enter your subject" | Yes* |
| 6 | Description | textarea | "Enter your query, request, or complaint in detail" | Yes* |
| 7 | Attachments | file upload | "Choose files" | No |

- Attachment note: "Upload supporting documents, if any. Max 5 documents. PDF or JPG."
- "Submit" button (solid purple)

---

## 17. Testimonials Page

**URL**: `/testimonials`
**Page Title**: "GyanDhan- Testimonials | Reviews by Students | GyanDhan"

### Hero Section (purple gradient)
- Heading: "Real Stories of Study Abroad Success"
- Subtext: "Read, watch and explore the journeys of students who achieved their dreams with GyanDhan"
- 3D illustration (girl holding 5-star review card)

### Student Testimonials Section
- Heading: "Student Testimonials" + "Encouraging reviews shared by our students"
- Carousel of testimonial cards:
  - Student photo (circular)
  - Student name (bold)
  - University + country
  - Review text (paragraph)
- Prev/Next carousel arrows

---

## 18. Logout Behavior

- **Dropdown**: My Profile → Logout (submit button, not a link)
- **Post-logout**: Redirects to homepage (`/`)
- **Header reverts**: "My Profile" dropdown replaced with "Log in" button
- **Auth pages accessible again**: Login, Sign Up, Forgot Password pages become accessible

---

## 19. Visual Design Summary

### Colors
- **Primary**: Dark purple (`~#4A2D8A`) — buttons, headers, headings
- **Card header**: Medium purple (`~#8B7BBF`)
- **Background gradient**: Light green to green (used across most pages)
- **Error**: Red for validation messages and error banners
- **Success**: Green for banners and checkmarks
- **Accent**: Green text for monetary values in EMI calculator

### Typography
- Headings: Large, bold, dark purple
- Body: Medium gray
- Card titles: White on purple background

### Card Style
- Rounded corners
- White background
- Drop shadow / elevation
- Purple header sections where applicable

### Button Style
- Dark purple background, white text
- Rounded corners
- Full width in forms, inline elsewhere
- Large padding (~16px vertical)

### 3D Illustrations
- Used extensively throughout: avatars, loan type icons, referral journey icons, hero sections
- Consistent cartoon/3D style across all pages

---

## 20. Complete User Flow

```
VISITOR
  │
  ├── Sign Up (/users/sign-up)
  │     ├── Email + Password + Confirm Password
  │     ├── Email verification link sent
  │     └── Click link → Account activated
  │
  └── Login (/users/sign-in)
        ├── Email + Password (or OTP)
        └── Redirects to Dashboard (/dashboard)
              │
              ├── My Profile Dropdown
              │     ├── Dashboard
              │     ├── Edit Profile (/profiles/{id}/edit)
              │     │     ├── Profile Picture / Avatar selection
              │     │     ├── About Me (textarea)
              │     │     ├── Basic Details (name, DOB, passport, gender, mother's maiden name, PAN, phone, marital status)
              │     │     ├── Social Links (LinkedIn, Quora, Twitter, Instagram)
              │     │     ├── Current Address (search, city, district, state, country, ZIP)
              │     │     ├── Documents (Resume, Admit Card, ID upload)
              │     │     └── Save Changes
              │     └── Logout
              │
              ├── My Loans Tab
              │     └── Empty state → "Explore loans" → Apply for Loan
              │
              ├── My Referrals Tab
              │     ├── Share referral link (FB, Twitter, WhatsApp, LinkedIn, Gmail)
              │     ├── Copy unique referral URL
              │     └── Referral journey tracker (milestone rewards ₹3K per referral, ₹10K bonus every 5th)
              │
              ├── Apply for Loan / Check Eligibility (/loaneligs)
              │     ├── Step 1: Basic Details
              │     │     ├── Name*, Gender*, Email* (pre-filled), Phone*
              │     │     ├── WhatsApp confirmation
              │     │     ├── College offer letter? (Yes/No)
              │     │     ├── [If Yes] Course details (start year/month, level, degree, name, country, university)
              │     │     ├── Loan amount (1L–2Cr), Collateral (Yes/No)
              │     │     ├── Co-applicant income & existing EMIs
              │     │     └── How did you hear about us?
              │     └── Step 2: Additional Details → Loan matching results
              │
              ├── Scholarships (/scholarships)
              │     ├── 176+ scholarships, filterable by Country & Course Level
              │     └── Individual scholarship detail pages
              │
              ├── EMI Calculator (/education-loan-emi-calculator)
              │     ├── Inputs: Loan amount, course duration, tenure, interest rate, grace period
              │     └── Real-time EMI calculation with breakdown
              │
              ├── Refer & Earn (/refer_now)
              │     ├── ₹3,000 per referral (₹1,500 on sanction + ₹1,500 on disbursal)
              │     ├── Friend gets ₹1,500
              │     ├── ₹10,000 bonus every 5th referral
              │     └── 5-step referral process with visual tracker
              │
              ├── Events (/events)
              │     ├── Upcoming events carousel (webinars, AMAs, loan events)
              │     ├── Filters: Country, Stage, Timing
              │     └── Popular tags: College Sessions, Webinar, Ask me Anything
              │
              ├── Blogs (/blogs)
              │     ├── Search bar + Filters
              │     └── Trending blogs carousel
              │
              └── Testimonials (/testimonials)
                    └── Student review cards carousel (photo, name, university, review)

OTHER PAGES (accessible without login):
  ├── Forgot Password (/users/password/new) → Email → "Send Password Instructions"
  ├── OTP Login (/users/sign-in) → Email → "Send OTP" (toggle from password login)
  ├── FAQs (/faq) → Tabs: General, Lender, Student, Other Services → Accordion Q&A
  ├── About Us (/aboutus) → Company info + Year-wise milestones
  ├── Contact Us (/contactus) → Form: Name, Email, Phone, Category, Subject, Description, Attachments
  └── Testimonials (/testimonials) → Student review carousel
```

---

## 21. Key Takeaways for FundMyCampus Implementation

### Auth & Onboarding
1. **Simple 3-field signup**: Email, Password, Confirm Password — no name/phone required upfront
2. **Real-time password validation** with visual checklist (green checkmarks)
3. **Dual login methods**: Password-based + OTP-based login
4. **Role-based login**: Separate login pages for Students, Institutes, and Lenders
5. **Email verification**: Confirmation link sent to email, must verify before login
6. **Email domain validation**: Blocks disposable/temporary email providers

### Dashboard
7. **Profile-first dashboard**: Avatar + greeting + email prominently displayed
8. **Tab-based navigation**: My Loans / My Referrals — clean separation
9. **Empty state messaging**: Clear CTA when no loans applied yet
10. **Sidebar engagement**: Suggested blogs + upcoming events keep users on platform
11. **AI-powered tools carousel**: Loan eligibility checker + EMI calculator promoted

### Profile
12. **Progressive profiling**: Basic signup collects minimal info, detailed profile built later
13. **Avatar selection**: 6 pre-made 3D avatars + custom upload option
14. **Document uploads**: Resume, Admit Card, ID — separate upload zones
15. **Social links**: LinkedIn, Quora, Twitter, Instagram fields
16. **Address autocomplete**: Search-based address input with auto-fill for city/state/country

### Loan Application
17. **Multi-step form (2 steps)**: Basic Details → Additional Details
18. **Conditional fields**: "College offer letter?" reveals course/university fields
19. **Pre-filled data**: Email auto-populated from login session
20. **Bank partner logos**: Trust signals at top (SBI, Axis, Credila, Union Bank, IDFC, IDBI, etc.)
21. **Loan constraints**: Min 1 Lakh, Max 2 Crore, with co-applicant financial details
22. **Value props sidebar**: Three key selling points alongside the form

### Referral System
23. **Referral rewards**: ₹3,000 per referral + ₹10,000 bonus every 5th
24. **Multi-channel sharing**: Facebook, Twitter, WhatsApp, LinkedIn, Gmail + copy link
25. **Visual referral tracker**: Milestone-based progress with reward amounts
26. **Two-sided rewards**: Both referrer (₹3K) and referred (₹1.5K) earn

### Tools & Resources
27. **EMI Calculator**: Interactive with sliders, real-time calculation, moratorium support
28. **Scholarship directory**: 176+ scholarships, filterable by country & course level
29. **Persistent CTAs**: "Check Loan Eligibility" floating button on multiple pages

### Design Patterns
30. **3D illustrations**: Consistent throughout for visual appeal
31. **Green + purple color scheme**: Professional, education-focused
32. **Green banners**: Success messages (signed in, verification sent)
33. **Red banners**: Error messages (invalid email)
34. **Card-based UI**: All forms and content in elevated card components
35. **Breadcrumb navigation**: On sub-pages (scholarships, EMI calculator, etc.)

---

## 22. Tools & APIs Needed for FundMyCampus Implementation

### Summary Table

| Category | Tool | Why |
|----------|------|-----|
| **Database & Auth** | Supabase (Auth + Postgres + Storage + RLS) | User accounts, profiles, loan applications, document storage, row-level security |
| **OTP** | Twilio Verify | OTP-based login (email/SMS OTP delivery) |
| **Transactional Email** | Twilio SendGrid (or Supabase built-in) | Email verification, password reset, loan confirmation, referral notifications |
| **Payments** | Razorpay | Referral reward payouts to bank accounts |
| **Address Autocomplete** | Google Places API | Edit Profile address with auto-fill (city, state, country, PIN) |
| **University Search** | Custom Supabase table | Loan form university autocomplete |
| **File Storage** | Supabase Storage | Resume, admit card, ID, loan documents (PDF/JPG) |
| **Analytics** | Google Analytics (GA4) | Signup/login events, loan funnel tracking, referral clicks, page views, demographics |

### Feature → Tool Mapping

#### Sign Up (Section 1)
- **Supabase Auth** — `signUp()` with email + password
- **Supabase Auth (email verification)** — Sends confirmation link automatically
- **Client-side validation** — Password rules (8 chars, 1 number, 1 capital, 1 special)
- **Disposable email blocking** — npm package like `disposable-email-domains` or server-side check

#### Login (Section 2)
- **Supabase Auth** — `signInWithPassword()` for email + password login
- **Twilio Verify** — `POST /v2/Services/{sid}/Verifications` to send OTP, `POST .../VerificationCheck` to verify
- **Supabase Auth (session)** — JWT token management, `onAuthStateChange()` listener for header state (logged in/out)

#### Forgot Password (Section 10)
- **Supabase Auth** — `resetPasswordForEmail()` sends reset link
- **Twilio SendGrid** *(or Supabase built-in)* — Customized reset email template

#### Post-Login Dashboard (Section 3)
- **Supabase Database** — Fetch user profile, loan applications, referral data
- **Supabase Realtime** *(optional)* — Live loan status updates
- **Notion API** *(existing)* — Blog cards in sidebar

#### Edit Profile (Section 5)
- **Supabase Database** — `profiles` table CRUD
- **Supabase Storage** — Profile picture upload (`avatars` bucket)
- **Google Places API** — Address autocomplete, auto-fill city/state/country/PIN
- **Supabase Storage** — Document uploads (`documents` bucket) for resume, admit card, ID

#### Loan Application (Section 6)
- **Supabase Database** — `loan_applications` table, multi-step form saves as draft
- **Supabase Storage** — Document uploads (offer letter, transcripts, bank statements, passport, PAN, property docs)
- **Custom Supabase table** — `universities` table for autocomplete search
- **Twilio SendGrid** — Confirmation email after submission

#### Referral System (Sections 4 & 7)
- **Supabase Database** — `referrals` table, `referral_payouts` table, unique referral code generation
- **Razorpay** — Payout API for transferring earnings to user bank accounts
- **Twilio SendGrid** — Referral notification emails (applied, sanctioned, disbursed)

#### Logout (Section 18)
- **Supabase Auth** — `signOut()`, clears session/JWT

### Database Schema

```
users (managed by Supabase Auth)
├── id, email, password (hashed), email_verified, created_at

profiles
├── user_id (FK → users), full_name, dob, gender, phone, marital_status,
│   passport_number, pan_number, mothers_maiden_name, about_me,
│   avatar_url, linkedin, twitter, instagram
├── address_search, city, district, state, country, zip

documents
├── user_id (FK → users), type (resume|admit_card|id_proof|offer_letter|
│   transcripts|income_proof|bank_statements|passport|pan|property),
│   file_url (Supabase Storage path), uploaded_at

loan_applications
├── id, user_id (FK → users), status (applied|under_review|approved|disbursed|rejected)
├── Step 1: full_name, gender, email, phone, whatsapp_same, has_offer_letter,
│   course_start_year, course_start_month, course_level, course_degree,
│   course_name, target_country, target_university, loan_amount,
│   has_collateral, co_applicant_income, co_applicant_emis, heard_about_us
├── Step 2: highest_qualification, college_name, year_of_completion,
│   percentage_cgpa, work_experience, co_applicant_name, co_applicant_relationship,
│   co_applicant_occupation, co_applicant_annual_income, property_for_collateral
├── created_at, updated_at

referrals
├── referrer_id (FK → users), referred_email, referral_code, status
│   (pending|applied|sanctioned|disbursed), referrer_earned, referred_earned,
│   created_at

referral_payouts
├── user_id (FK → users), amount, payout_method, payout_status, processed_at
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Twilio (OTP)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_VERIFY_SERVICE_SID=

# Email (SendGrid or Supabase built-in)
SENDGRID_API_KEY=

# Google Places (address autocomplete)
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=

# Razorpay (referral payouts)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## 23. Additional Post-Login Features (from Competitor Research)

Based on research across Prodigy Finance, Leap Finance, MPOWER, Auxilo, Credenc, and WeMakeScholars.

### 23.1 Social Login (Google, LinkedIn)

**Source**: Prodigy Finance offers Apple, Google, LinkedIn sign-in

#### Implementation for FundMyCampus
- **Google Sign-In** — "Continue with Google" button on Login & Sign Up pages
- **LinkedIn Sign-In** — "Continue with LinkedIn" button (relevant for education/professional audience)
- Placed above the email/password form with "OR" divider
- On first social login — auto-creates account, redirects to dashboard
- On subsequent logins — signs in directly
- Social login users can optionally set a password later from Edit Profile

#### UI Layout (Login Page)
```
+------------------------------+
|   Welcome to FundMyCampus    |  (teal header)
+------------------------------+
|  [G] Continue with Google    |
|  [in] Continue with LinkedIn |
|                              |
|  --------- OR ---------     |
|                              |
|  Email: [____________]       |
|  Password: [_________]       |
|  [ ] Remember me             |
|  [Log in]                    |
+------------------------------+
```

#### Tool
- **Supabase Auth** — `signInWithOAuth({ provider: 'google' })` and `signInWithOAuth({ provider: 'linkedin_oidc' })`
- Requires Google Cloud Console OAuth credentials + LinkedIn Developer App

#### Environment Variables
```env
# Google OAuth (for social login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

---

### 23.2 Loan Status Step Tracker

**Source**: Prodigy Finance (6-step pipeline), Auxilo Customer Portal

#### Description
A visual step-by-step progress tracker shown on each loan card in the Dashboard My Loans tab. Replaces simple status badges with a horizontal pipeline.

#### Steps
```
(1) Applied > (2) Documents Verified > (3) Under Review > (4) Approved > (5) Disbursed
```

#### UI Layout
```
+-----------------------------------------------------------+
|  Loan #FMC-2026-001  |  ICICI Bank                       |
|                                                           |
|  *------*------*------o------o                            |
|  Applied  Docs   Under  Approved Disbursed                |
|  [check]  Verified Review                                 |
|  Mar 1   Mar 3   Mar 5  Pending  --                      |
|                                                           |
|  Loan Amount: Rs.20,00,000  |  [View Details >]          |
|  ! Action needed: Upload bank statements                  |
+-----------------------------------------------------------+
```

#### States
| Step | Color | Icon |
|------|-------|------|
| Completed | Teal (#0D9488) filled circle | Checkmark |
| Current | Teal pulsing circle | Spinning dot |
| Pending | Gray (#D1D5DB) hollow circle | -- |
| Rejected | Red (#EF4444) | X mark |

#### Tool
- **Supabase Database** — `loan_applications.status` enum field, updated by admin/counselor
- **Supabase Realtime** — Subscribe to status changes for live updates

---

### 23.3 Notifications / Activity Feed

**Source**: Common across all platforms (bell icon pattern)

#### Description
Bell icon in header (logged-in state) with unread count badge. Dropdown shows recent activity.

#### Notification Types
| Type | Example | Trigger |
|------|---------|---------|
| Loan Update | "Your loan #FMC-001 status changed to Under Review" | Status change |
| Document | "Bank requested additional documents for loan #FMC-001" | Admin action |
| Approval | "Congratulations! Your loan has been approved by ICICI Bank" | Status > Approved |
| Referral | "Your friend john@email.com just signed up using your link!" | Referral signup |
| Payout | "Rs.2,000 referral reward has been credited to your account" | Payout processed |
| System | "Complete your profile to improve loan approval chances" | Profile < 80% |

#### UI Layout
```
Header: [...nav...] Bell(3) [My Profile v] [Apply for Loan]
                      |
                      v
+--------------------------------------+
|  Notifications         Mark all read |
+--------------------------------------+
|  * Loan #FMC-001 approved!   2h ago  |
|  * Upload bank statements    5h ago  |
|  * New referral signed up    1d ago  |
|                                      |
|  [View All Notifications >]          |
+--------------------------------------+
```

#### Tools
- **Supabase Database** — `notifications` table (user_id, type, title, message, read, created_at)
- **Supabase Realtime** — Live push for new notifications
- **Twilio SendGrid** — Email for critical notifications (approval, rejection, document requests)

#### Database Table
```
notifications
-- id, user_id (FK > users), type (loan_update|document|approval|referral|payout|system),
   title, message, read (boolean, default false), link (optional URL),
   created_at
```

---

### 23.4 Document Checklist with Status

**Source**: Prodigy Finance (document verification step), MPOWER Financing

#### Description
After loan application, show a checklist of all required documents with upload status. Banks may request additional documents -- this checklist updates dynamically.

#### UI Layout (inside Loan Details page)
```
+--------------------------------------------------+
|  Document Checklist -- Loan #FMC-2026-001        |
+--------------------------------------------------+
|  [check] Offer Letter           Verified   Mar 2 |
|  [check] Academic Transcripts   Verified   Mar 2 |
|  [warn]  Co-Applicant Income    Rejected   Mar 4 |
|    > Reason: "Document not legible"              |
|    > [Re-upload]                                 |
|  [wait]  Bank Statements        Pending    Mar 3 |
|  [x]     Passport Copy          Not uploaded     |
|    > [Upload Now]                                |
|  [wait]  PAN Card               Under Review     |
+--------------------------------------------------+
|  4/6 documents verified  ========-- 67%          |
+--------------------------------------------------+
```

#### Document Statuses
| Status | Color | Action |
|--------|-------|--------|
| Not Uploaded | Gray | [Upload Now] button |
| Pending Review | Amber | Waiting -- no action |
| Under Review | Blue | Being reviewed -- no action |
| Verified | Teal (#0D9488) | Done |
| Rejected | Red (#EF4444) | [Re-upload] button + rejection reason |

#### Tools
- **Supabase Database** — Update `documents` table with `status` field and `rejection_reason`
- **Supabase Storage** — Re-upload replaces existing file
- **Notifications** — Trigger notification when doc status changes

#### Updated Database Schema
```
documents (updated)
-- id, user_id, loan_application_id (FK), type, file_url,
   status (not_uploaded|pending|under_review|verified|rejected),
   rejection_reason (nullable), reviewed_at, uploaded_at
```

---

### 23.5 Assigned Counselor Card

**Source**: GyanDhan (post-apply), Leap Finance (WhatsApp-first support)

#### Description
After submitting a loan application, user is assigned a dedicated loan counselor. Their card appears prominently on the Dashboard and Loan Details page.

#### UI Layout
```
+--------------------------------------+
|  Your Loan Counselor                 |
+--------------------------------------+
|  [Photo]  Priya Sharma               |
|           Senior Loan Advisor        |
|                                      |
|  Phone: +91 98765 43210             |
|  WhatsApp Chat                       |
|  Email: priya@fundmycampus.com       |
|                                      |
|  Available: Mon-Sat, 9AM-7PM IST    |
|                                      |
|  [Chat on WhatsApp]                  |
+--------------------------------------+
```

#### Placement
- **Dashboard** — Right sidebar, below "Latest Blogs" (only shown after loan application submitted)
- **Loan Details page** — Top-right card
- **Mobile** — Floating WhatsApp button (bottom-right)

#### Tools
- **Supabase Database** — `counselors` table + `loan_applications.counselor_id` FK
- **WhatsApp API link** — `https://wa.me/91XXXXXXXXXX?text=Hi, I need help with loan #FMC-001`

#### Database Tables
```
counselors
-- id, name, photo_url, phone, whatsapp_number, email,
   available_hours, active (boolean)

loan_applications (updated)
-- + counselor_id (FK > counselors, nullable, assigned after submission)
```

---

### 23.6 Loan Comparison Table

**Source**: GyanDhan (multiple bank matching), WeMakeScholars

#### Description
After completing the loan application, the system matches the user with eligible bank offers. Displayed as a comparison table so users can pick the best offer.

#### Comparison Fields
| Field | Description |
|-------|-------------|
| Bank Name + Logo | Internal bank partners DB |
| Interest Rate | Bank offer, "Best" tag on lowest |
| Max Loan Amount | Based on eligibility |
| Collateral Required | Yes/No |
| Processing Fee | Bank terms |
| Estimated Approval Time | Bank SLA |
| Monthly EMI | Calculated from loan amount + interest + tenure |

#### User Actions
- **"Proceed with this offer"** — Moves loan to "Applied with [Bank]" status
- **"Compare EMI"** — Opens EMI calculator pre-filled with that bank's terms
- **"Talk to Counselor"** — WhatsApp/call with assigned counselor about this offer

#### Tools
- **Supabase Database** — `bank_offers` table + `banks` table

#### Database Tables
```
banks
-- id, name, logo_url, website, active

bank_offers
-- id, loan_application_id (FK), bank_id (FK > banks),
   interest_rate, max_loan_amount, collateral_required (boolean),
   processing_fee, approval_time_hours, monthly_emi (calculated),
   status (available|selected|rejected), created_at
```

---

### 23.7 Profile Completion Progress Bar

**Source**: Common UX pattern across all platforms

#### Description
A visual progress bar on the Dashboard showing how complete the user's profile is. Encourages users to fill in all details before applying (improves approval chances).

#### UI Layout (Dashboard top banner)
```
+--------------------------------------------------+
|  Your profile is 40% complete                    |
|  ========-------- 40%                            |
|                                                  |
|  Complete your profile to improve loan approval: |
|  o Add phone number                              |
|  o Upload profile picture                        |
|  o Add date of birth                             |
|  o Upload ID proof                               |
|  o Add current address                           |
|  [check] Email verified                          |
|  [check] Full name added                         |
|                                                  |
|  [Complete Profile >]                            |
+--------------------------------------------------+
```

#### Progress Calculation
| Field | Weight |
|-------|--------|
| Email verified | 10% |
| Full name | 10% |
| Phone number | 10% |
| Date of birth | 5% |
| Gender | 5% |
| Profile picture / avatar | 10% |
| Current address | 15% |
| At least 1 document uploaded | 15% |
| About me filled | 5% |
| Social profile (any 1) | 5% |
| PAN card number | 5% |
| Passport number | 5% |

#### Behavior
- Progress bar color: Gray > Amber (< 50%) > Teal (50-99%) > Teal + "Complete!" (100%)
- Dismissible banner, but shows again if profile drops below 80%
- "Complete Profile >" button links to `/profile/edit`

#### Tool
- **Client-side calculation** — Compute from `profiles` table fields (no extra backend needed)

---

### 23.8 Quick Actions Section

**Source**: Dashboard UX best practice

#### Description
A row of action cards at the top of the Dashboard for the most common tasks. One-tap access instead of navigating through menus.

#### Cards
| Card | Icon | Label | Link | Shown When |
|------|------|-------|------|------------|
| Apply for Loan | Document | "Apply for Loan" | `/apply` | No active loan |
| Track Application | Clipboard | "Track Application" | `/dashboard#loans` | Has active loan |
| Check EMI | Chart | "Check EMI" | `/tools` | Always |
| Upload Documents | File | "Upload Documents" | `/profile/edit#documents` | Docs incomplete |
| Talk to Counselor | Chat | "Talk to Counselor" | WhatsApp link | Has assigned counselor |
| Complete Profile | User | "Complete Profile" | `/profile/edit` | Profile < 80% |
| View Loan Offers | Bank | "View Offers" | `/dashboard#offers` | Has matched offers |

#### Behavior
- Shows max 4 cards at a time (prioritized by relevance)
- Cards change based on user's journey stage (new user > applied > approved)
- Responsive: 4 columns on desktop, 2 columns on mobile

#### Tool
- **Client-side logic** — Conditional rendering based on profile/loan state from Supabase