# FundMyCampus — Full Stack Migration to Cloudflare

## Your Task

Migrate the FundMyCampus platform from FastAPI/Supabase to Cloudflare Workers/D1/R2 with Better Auth. Build the entire backend from scratch as a Hono app, then update auth files in both frontends.

**Working directory**: Create `fundmycampus-workers/` as a sibling to `fundmycampus/` and `fundmycampus-admin/`.

---

## Architecture

```
fundmycampus.com              admin.fundmycampus.com
(Cloudflare Pages)            (Cloudflare Pages)
       │                              │
       └──────────┬───────────────────┘
                  ▼
        api.fundmycampus.com
        (Cloudflare Workers — Hono)
           │         │         │
           ▼         ▼         ▼
          D1        R2      External
       (SQLite)  (storage)  (SendGrid, Twilio, Razorpay)
```

---

## Phase 1: Cloudflare Workers Backend

### 1.1 Project Setup

Create `fundmycampus-workers/` with:

**package.json** — Dependencies:
- `hono` (web framework)
- `drizzle-orm` + `drizzle-kit` (ORM)
- `better-auth` (auth system)
- `zod` (validation)
- `@sendgrid/mail` (email)
- `@cloudflare/workers-types` (types)

**wrangler.toml**:
```toml
name = "fundmycampus-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "fundmycampus"
database_id = "placeholder"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "fundmycampus-documents"

[vars]
APP_URL = "https://www.fundmycampus.com"
ADMIN_URL = "https://admin.fundmycampus.com"
ADMIN_EMAIL = "admin@fundmycampus.com"
SUPPORT_EMAIL = "contact@fundmycampus.com"
```

**tsconfig.json** — target ES2022, strict mode, path aliases.

### 1.2 Environment Types

Create `src/env.ts`:
```typescript
export type Bindings = {
  DB: D1Database;
  STORAGE: R2Bucket;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_VERIFY_SERVICE_SID: string;
  SENDGRID_API_KEY: string;
  SENDGRID_FROM_EMAIL: string;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  RAZORPAY_WEBHOOK_SECRET: string;
  RAZORPAY_ACCOUNT_NUMBER: string;
  BETTER_AUTH_SECRET: string;
  APP_URL: string;
  ADMIN_URL: string;
  ADMIN_EMAIL: string;
  SUPPORT_EMAIL: string;
};
```

### 1.3 Database Schema (Drizzle — 16 tables)

Create `src/db/schema.ts`. Port these exact tables from SQLAlchemy:

#### Table 1: `profiles`
```
id              TEXT PRIMARY KEY (UUID)
email           TEXT NOT NULL UNIQUE
full_name       TEXT
phone           TEXT(20)
phone_verified  INTEGER DEFAULT 0 (boolean)
is_whatsapp     INTEGER DEFAULT 0
date_of_birth   TEXT (ISO date)
gender          TEXT (enum: Female, Male, Other)
marital_status  TEXT (enum: Single, Married, Divorced, Widowed)
passport_number TEXT
pan_number      TEXT
mother_maiden_name TEXT
about           TEXT
avatar_url      TEXT
avatar_type     TEXT DEFAULT 'default' (enum: default, preset, uploaded)
address_line1   TEXT
address_line2   TEXT
city            TEXT
district        TEXT
state           TEXT
country         TEXT DEFAULT 'India'
zip_code        TEXT(10)
linkedin_url    TEXT
twitter_url     TEXT
instagram_url   TEXT
profile_completion_pct INTEGER DEFAULT 0
role            TEXT DEFAULT 'user' (enum: user, counselor, admin)
referral_code   TEXT UNIQUE
referred_by     TEXT
created_at      TEXT DEFAULT CURRENT_TIMESTAMP
updated_at      TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 2: `loan_applications`
```
id                    TEXT PRIMARY KEY (UUID)
application_id        TEXT UNIQUE (format: FMC-YYYYMMDD-XXXXX)
user_id               TEXT NOT NULL → profiles.id
status                TEXT DEFAULT 'draft'
full_name             TEXT
gender                TEXT
email                 TEXT
phone                 TEXT
is_whatsapp           INTEGER DEFAULT 0
has_offer_letter      INTEGER DEFAULT 0
university_app_status TEXT
course_start_year     INTEGER
course_start_month    TEXT
course_level          TEXT (enum: Masters, Undergrad, PG Diploma, UG Diploma, PhD)
course_degree         TEXT
course_name           TEXT
target_country        TEXT
target_college        TEXT
loan_amount           REAL
has_collateral        INTEGER DEFAULT 0
co_applicant_income   REAL DEFAULT 0
existing_emis         REAL DEFAULT 0
hear_about_us         TEXT
assigned_counselor_id TEXT → counselors.id
submitted_at          TEXT
last_status_change_at TEXT
notes                 TEXT
created_at            TEXT DEFAULT CURRENT_TIMESTAMP
updated_at            TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 3: `documents`
```
id               TEXT PRIMARY KEY (UUID)
user_id          TEXT NOT NULL → profiles.id
document_type    TEXT (enum: passport, pan_card, aadhar, offer_letter, transcript, sop, lor, resume, bank_statement, itr, salary_slip, property_docs, co_applicant_docs, photo, other)
file_name        TEXT
file_url         TEXT
file_size        INTEGER
mime_type        TEXT
status           TEXT DEFAULT 'pending_review' (enum: pending_review, under_review, verified, rejected, expired)
rejection_reason TEXT
reviewed_by      TEXT → profiles.id
reviewed_at      TEXT
created_at       TEXT DEFAULT CURRENT_TIMESTAMP
updated_at       TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 4: `banks`
```
id                      TEXT PRIMARY KEY (UUID)
name                    TEXT
logo_url                TEXT
min_loan_amount         REAL DEFAULT 0
max_loan_amount         REAL DEFAULT 0
interest_rate_min       REAL
interest_rate_max       REAL
processing_fee_text     TEXT
processing_fee_min_pct  REAL DEFAULT 0
processing_fee_max_pct  REAL DEFAULT 0
max_tenure_years        INTEGER DEFAULT 15
collateral_required     INTEGER DEFAULT 0
collateral_free_limit   REAL DEFAULT 0
supported_countries     TEXT (JSON array)
supported_course_levels TEXT (JSON array)
min_co_applicant_income REAL
approval_time_text      TEXT
approval_time_days      INTEGER
features                TEXT (JSON array)
is_active               INTEGER DEFAULT 1
display_order           INTEGER DEFAULT 0
created_at              TEXT DEFAULT CURRENT_TIMESTAMP
updated_at              TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 5: `bank_offers`
```
id                   TEXT PRIMARY KEY (UUID)
loan_application_id  TEXT NOT NULL → loan_applications.id
bank_id              TEXT NOT NULL → banks.id
interest_rate        REAL
loan_amount          REAL
tenure_years         INTEGER
monthly_emi          REAL
processing_fee       REAL DEFAULT 0
total_interest       REAL DEFAULT 0
total_cost           REAL DEFAULT 0
is_best_offer        INTEGER DEFAULT 0
status               TEXT DEFAULT 'pending' (enum: pending, presented, accepted, rejected)
matched_by           TEXT → profiles.id
created_at           TEXT DEFAULT CURRENT_TIMESTAMP
updated_at           TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 6: `counselors`
```
id                   TEXT PRIMARY KEY (UUID)
user_id              TEXT → profiles.id
name                 TEXT
title                TEXT
email                TEXT UNIQUE NOT NULL
phone                TEXT(20)
whatsapp_number      TEXT(20)
avatar_url           TEXT
available_hours      TEXT
max_active_cases     INTEGER DEFAULT 50
current_active_cases INTEGER DEFAULT 0
specializations      TEXT (JSON array)
is_active            INTEGER DEFAULT 1
created_at           TEXT DEFAULT CURRENT_TIMESTAMP
updated_at           TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 7: `referrals`
```
id                  TEXT PRIMARY KEY (UUID)
referrer_id         TEXT NOT NULL → profiles.id
referee_id          TEXT → profiles.id
referral_code       TEXT
status              TEXT DEFAULT 'signed_up' (enum: signed_up, applied, sanctioned, disbursed, paid, expired)
loan_application_id TEXT → loan_applications.id
referral_number     INTEGER
created_at          TEXT DEFAULT CURRENT_TIMESTAMP
updated_at          TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 8: `referral_payouts`
```
id                 TEXT PRIMARY KEY (UUID)
referral_id        TEXT NOT NULL → referrals.id
user_id            TEXT NOT NULL → profiles.id
amount             REAL
milestone_bonus    REAL DEFAULT 0
payout_type        TEXT (enum: sanction, disbursement, referee_bonus, milestone)
status             TEXT DEFAULT 'pending' (enum: pending, processing, completed, failed, reversed)
razorpay_payout_id TEXT
failure_reason     TEXT
processed_at       TEXT
processed_by       TEXT → profiles.id
created_at         TEXT DEFAULT CURRENT_TIMESTAMP
updated_at         TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 9: `contact_submissions`
```
id           TEXT PRIMARY KEY (UUID)
name         TEXT
email        TEXT
phone        TEXT
message      TEXT
loan_type    TEXT
status       TEXT DEFAULT 'new' (enum: new, contacted, resolved, spam)
assigned_to  TEXT → profiles.id
admin_notes  TEXT
created_at   TEXT DEFAULT CURRENT_TIMESTAMP
updated_at   TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 10: `notifications`
```
id         TEXT PRIMARY KEY (UUID)
user_id    TEXT NOT NULL → profiles.id
type       TEXT (enum: welcome, application_update, document_update, counselor_assigned, bank_offers, referral_update, payout_update, general)
title      TEXT
message    TEXT
link       TEXT
is_read    INTEGER DEFAULT 0
metadata   TEXT (JSON)
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 11: `otp_verifications`
```
id         TEXT PRIMARY KEY (UUID)
user_id    TEXT NOT NULL → profiles.id
phone      TEXT
otp_hash   TEXT
attempts   INTEGER DEFAULT 0
verified   INTEGER DEFAULT 0
expires_at TEXT
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 12: `loan_status_history`
```
id                  TEXT PRIMARY KEY (UUID)
loan_application_id TEXT NOT NULL → loan_applications.id
old_status          TEXT
new_status          TEXT
changed_by          TEXT → profiles.id
notes               TEXT
created_at          TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 13: `loan_application_documents`
```
id                  TEXT PRIMARY KEY (UUID)
loan_application_id TEXT NOT NULL → loan_applications.id
document_id         TEXT NOT NULL → documents.id
created_at          TEXT DEFAULT CURRENT_TIMESTAMP
updated_at          TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 14: `admin_audit_log`
```
id          TEXT PRIMARY KEY (UUID)
admin_id    TEXT NOT NULL → profiles.id
action      TEXT
target_type TEXT
target_id   TEXT
old_value   TEXT (JSON)
new_value   TEXT (JSON)
ip_address  TEXT
created_at  TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 15: `universities`
```
id         TEXT PRIMARY KEY (UUID)
name       TEXT
country    TEXT
city       TEXT
ranking    INTEGER
is_active  INTEGER DEFAULT 1
created_at TEXT DEFAULT CURRENT_TIMESTAMP
updated_at TEXT DEFAULT CURRENT_TIMESTAMP
```

#### Table 16: `lead_sources`
(If referenced — create as needed for referral tracking)

**IMPORTANT**: D1 is SQLite. Use TEXT for UUIDs, INTEGER for booleans (0/1), TEXT with JSON for arrays. Use `$defaultFn(() => crypto.randomUUID())` for UUID generation in Drizzle.

---

### 1.4 Constants & Enums

Create `src/utils/constants.ts` with these exact values:

```typescript
// Loan status state machine — CRITICAL business logic
export const VALID_LOAN_TRANSITIONS: Record<string, string[]> = {
  draft: ["applied", "withdrawn"],
  applied: ["docs_pending", "rejected", "withdrawn"],
  docs_pending: ["docs_verified", "rejected", "withdrawn"],
  docs_verified: ["under_review", "rejected", "withdrawn"],
  under_review: ["approved", "rejected", "withdrawn"],
  approved: ["documentation", "rejected", "withdrawn"],
  documentation: ["disbursed", "rejected", "withdrawn"],
  disbursed: [],    // terminal
  rejected: [],     // terminal
  withdrawn: [],    // terminal
};

// All enum values — use these for Zod validation
export const LOAN_STATUSES = ["draft", "applied", "docs_pending", "docs_verified", "under_review", "approved", "documentation", "disbursed", "rejected", "withdrawn"] as const;
export const USER_ROLES = ["user", "counselor", "admin"] as const;
export const GENDERS = ["Female", "Male", "Other"] as const;
export const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"] as const;
export const COURSE_LEVELS = ["Masters", "Undergrad", "PG Diploma", "UG Diploma", "PhD"] as const;
export const DOCUMENT_TYPES = ["passport", "pan_card", "aadhar", "offer_letter", "transcript", "sop", "lor", "resume", "bank_statement", "itr", "salary_slip", "property_docs", "co_applicant_docs", "photo", "other"] as const;
export const DOCUMENT_STATUSES = ["pending_review", "under_review", "verified", "rejected", "expired"] as const;
export const REFERRAL_STATUSES = ["signed_up", "applied", "sanctioned", "disbursed", "paid", "expired"] as const;
export const PAYOUT_STATUSES = ["pending", "processing", "completed", "failed", "reversed"] as const;
export const PAYOUT_TYPES = ["sanction", "disbursement", "referee_bonus", "milestone"] as const;
export const NOTIFICATION_TYPES = ["welcome", "application_update", "document_update", "counselor_assigned", "bank_offers", "referral_update", "payout_update", "general"] as const;
export const BANK_OFFER_STATUSES = ["pending", "presented", "accepted", "rejected"] as const;
export const CONTACT_STATUSES = ["new", "contacted", "resolved", "spam"] as const;
export const AVATAR_TYPES = ["default", "preset", "uploaded"] as const;
```

### 1.5 Auth System (Better Auth + D1)

Create `src/auth/auth.ts`:
- Use `betterAuth` with D1 adapter
- Enable email+password auth
- Session management via cookies (cross-origin)
- Custom `role` field on user (default: "user")
- Better Auth handles: `/api/auth/*` routes automatically

Create `src/auth/middleware.ts`:
- Extract session from Better Auth
- Attach user to Hono context (`c.set("user", ...)`)
- Look up profile from `profiles` table using auth user ID

Create `src/auth/guards.ts`:
```typescript
// requireAuth — returns 401 if no session
// requireStaff — returns 403 if role not in ["admin", "counselor"]
// requireAdmin — returns 403 if role !== "admin"
```

**CRITICAL**: When a new user signs up via Better Auth, create a corresponding `profiles` row with:
- `id` = Better Auth user ID
- `email` = user email
- `role` = "user"
- `referral_code` = generate unique code (e.g., "FMC-" + 6 random alphanumeric chars)
- `profile_completion_pct` = 0

Use Better Auth's `after` hook on user creation to do this.

### 1.6 Utility Files

**`src/utils/response.ts`**:
```typescript
// success(data) → { success: true, ...data }
// error(message, status) → { success: false, error: message }
// paginated(items, total, page, pageSize) → { items, total, page, page_size, total_pages }
```

**`src/utils/pagination.ts`**:
```typescript
// parsePagination(c) → { page: number, pageSize: number, offset: number }
// Default: page=1, pageSize=20, max pageSize=100
```

### 1.7 Zod Validators

Create validators in `src/validators/` matching these exact request/response shapes:

**`loan.ts`**:
```typescript
export const createLoanSchema = z.object({
  full_name: z.string().min(2),
  gender: z.string(),
  email: z.string().email(),
  phone: z.string(),
  is_whatsapp: z.boolean().default(false),
  has_offer_letter: z.boolean().default(false),
  university_app_status: z.string().optional(),
  course_start_year: z.number().int(),
  course_start_month: z.string(),
  course_level: z.enum(COURSE_LEVELS),
  course_degree: z.string(),
  course_name: z.string(),
  target_country: z.string(),
  target_college: z.string(),
  loan_amount: z.number().positive(),
  has_collateral: z.boolean().default(false),
  co_applicant_income: z.number().default(0),
  existing_emis: z.number().default(0),
  hear_about_us: z.string().optional(),
});

export const updateLoanStatusSchema = z.object({
  status: z.enum(LOAN_STATUSES),
  notes: z.string().optional(),
});
```

**`document.ts`**: upload expects multipart form data with `document_type`, `file` (binary), optional `loan_application_id`
**`counselor.ts`**: create/update schemas matching CounselorCreate/CounselorUpdate
**`referral.ts`**: ProcessReferralRequest with action enum, ProcessPayoutRequest with bank details
**`contact.ts`**: name, email (email validated), phone, optional message and loan_type
**`notification.ts`**: SendNotificationRequest with user_id, type, title, message, optional email flag
**`user.ts`**: role update schema, list filters (role, search, pagination)

### 1.8 Service Files (Business Logic)

Port these 10 services. Each gets a Drizzle `db` instance and the Hono context.

#### `src/services/loan-service.ts`
- **createApplication(db, userId, data)**: Generate `application_id` as `FMC-YYYYMMDD-XXXXX` (random 5-digit), insert row, auto-assign counselor (call counselor service), create welcome notification, return application
- **getApplication(db, loanId, userId, isStaff)**: Get by ID. Users can only see their own. Staff see all.
- **getUserApplications(db, userId)**: Get all user's applications ordered by created_at DESC
- **updateLoanStatus(db, loanId, newStatus, notes, changedBy)**: Validate transition using `VALID_LOAN_TRANSITIONS`. If invalid, return 400. Update status, set `last_status_change_at`, insert `loan_status_history` record, create notification
- **listAllApplications(db, status?, counselorId?, page, pageSize)**: Staff only. Filter by status and counselor. Paginated.

#### `src/services/bank-service.ts`
- **calculateEMI(principal, annualRate, tenureMonths)**: Standard EMI formula: `P * r * (1+r)^n / ((1+r)^n - 1)` where r = monthly rate
- **matchBankOffers(db, loanApplicationId, matchedBy)**: Get loan app, get all active banks, filter by: `max_loan_amount >= loan_amount`, `supported_countries` contains `target_country`, `supported_course_levels` contains `course_level`, collateral logic (if bank requires and borrower has none AND amount > collateral_free_limit, skip). For each match: calculate EMI with mid-range interest, 10-year tenure. Insert `bank_offers` rows. Mark lowest EMI as `is_best_offer`. Create notification. Return offers.
- **getOffersForApplication(db, loanAppId)**: Get all offers for an application
- **getAllBanks(db)**: List all active banks ordered by display_order

#### `src/services/counselor-service.ts`
- **getAllCounselors(db)**: List all counselors
- **getCounselor(db, id)**: Get single counselor
- **createCounselor(db, data)**: Insert counselor
- **updateCounselor(db, id, data)**: Partial update
- **assignCounselor(db, loanAppId, counselorId?, assignedBy)**: If counselorId provided, use it. Otherwise auto-assign: pick active counselor with `current_active_cases < max_active_cases` and lowest caseload. Update loan's `assigned_counselor_id`, increment new counselor's `current_active_cases`, decrement old counselor's if reassigning. Create audit log. Notify user and counselor.

#### `src/services/document-service.ts`
- **createDocument(db, r2, userId, file, documentType, loanApplicationId?)**: Upload file to R2 at path `documents/{userId}/{uuid}-{filename}`. Insert `documents` row. If loanApplicationId, insert `loan_application_documents` junction row. Return document.
- **getUserDocuments(db, userId)**: Get user's documents
- **reviewDocument(db, docId, status, rejectionReason?, reviewerId)**: Update document status. Create audit log. Notify user (include rejection reason if rejected).
- **listDocumentsForReview(db, status?)**: List documents with pending_review or specified status

#### `src/services/referral-service.ts`
- **processReferral(db, action, refereeUserId, referralCode?, loanApplicationId?)**:
  - `"signup"`: Create referral record linking referrer (found by referral_code) to referee. Set status=signed_up. Notify referrer.
  - `"applied"`: Update referral status to applied
  - `"sanctioned"`: Update to sanctioned. Create payout for referrer: amount=1000 INR, type=sanction. Count referrer's total referrals — if divisible by 5, add milestone_bonus=5000. Notify referrer.
  - `"disbursed"`: Update to disbursed. Create TWO payouts: (1) referrer payout 1000 INR type=disbursement, (2) referee bonus 1000 INR type=referee_bonus. Notify referrer.
- **getUserReferrals(db, userId)**: Get referrals where referrer_id = userId
- **getUserPayouts(db, userId)**: Get payouts where user_id = userId
- **getAllReferrals(db)**: All referrals (admin)
- **getAllPayouts(db, status?)**: All payouts with optional status filter

#### `src/services/notification-service.ts`
- **createNotification(db, userId, type, title, message, opts?)**: Insert notification. If `opts.email` is true, send email via SendGrid.
- **getUserNotifications(db, userId, unreadOnly?)**: Get notifications, optionally only unread
- **markAsRead(db, notificationId, userId)**: Mark single as read (verify ownership)
- **markAllAsRead(db, userId)**: Mark all user's notifications as read

#### `src/services/email-service.ts`
- **sendEmail(apiKey, fromEmail, to, subject, html)**: POST to SendGrid API v3 `/mail/send`
- Templates for: welcome, application update, document review, counselor assignment, contact form team notification, contact form auto-reply

#### `src/services/otp-service.ts`
- **sendOTP(twilioConfig, phone)**: Call Twilio Verify API to send OTP. Record in `otp_verifications` with 10-minute expiry.
- **verifyOTP(db, twilioConfig, userId, phone, code)**: Call Twilio Verify check API. If valid, update user's `phone` and `phone_verified=true`. Rate limit: max 5 attempts per OTP record.

#### `src/services/payout-service.ts`
- **processPayout(db, razorpayConfig, payoutId, bankAccountDetails?)**: Get payout record. Call Razorpay to create contact, fund account, initiate payout. Update payout with razorpay_payout_id and status=processing. Create audit log and notification.
- **handleRazorpayWebhook(db, event, payload)**: Handle `payout.processed` → status=completed, `payout.reversed` → status=reversed, `payout.failed` → status=failed with reason. Notify user.

#### `src/services/stats-service.ts`
- **getDashboardStats(db)**: Return:
  - total_users, new_users_this_month
  - total_applications, applications_by_status (count per status), applications_this_month
  - total_disbursed (count), disbursed_amount_total, conversion_rate, average_loan_amount
  - top_countries (top 10 by application count), top_banks (top 10 by offer count)
  - pending_documents count
  - active_referrals count, pending_payouts count
  - contact_submissions_new count
  - counselor_caseloads (name + current_active_cases for each)

### 1.9 Route Files (13 routes)

All routes are under `/api/v1/` prefix. Use Hono's `app.route()` to mount sub-routers.

#### `src/routes/auth.ts`
- `ALL /api/auth/*` — Better Auth handles this automatically
- `POST /api/v1/auth/register` — Custom signup that: (1) calls Better Auth signUp, (2) creates profile row. Body: `{ email, password, name }`. Returns `{ success: true }`.

#### `src/routes/profiles.ts`
- `GET /api/v1/profiles/me` — requireAuth. Return current user's profile.
- `PATCH /api/v1/profiles/me` — requireAuth. Partial update profile fields: full_name, phone, is_whatsapp, date_of_birth, gender, marital_status, passport_number, pan_number, mother_maiden_name, about, avatar_url, avatar_type, address_line1/2, city, district, state, country, zip_code, linkedin/twitter/instagram_url. Recalculate profile_completion_pct after update.

#### `src/routes/users.ts`
- `GET /api/v1/users` — requireStaff. Query params: `role`, `search` (name/email), `page`, `page_size`. Paginated response.
- `GET /api/v1/users/:userId` — requireStaff. Get single user's profile.
- `PATCH /api/v1/users/:userId/role` — requireAdmin. Body: `{ role }`. Update user role.

#### `src/routes/loans.ts`
- `POST /api/v1/loans` — requireAuth. Body: createLoanSchema. Rate limit: 5 per 3600s.
- `GET /api/v1/loans/my` — requireAuth. User's applications.
- `GET /api/v1/loans/:loanId` — requireAuth. Users see only theirs, staff see all.
- `GET /api/v1/loans` — requireStaff. Query: status, counselor_id, page, page_size.
- `PATCH /api/v1/loans/:loanId/status` — requireStaff. Body: updateLoanStatusSchema. Rate limit: 10 per 60s.

#### `src/routes/documents.ts`
- `POST /api/v1/documents` — requireAuth. Multipart form: file + document_type + optional loan_application_id. Validate: max 10MB, allowed MIME types (pdf, jpg, jpeg, png, doc, docx). Rate limit: 10 per 3600s. Upload to R2.
- `GET /api/v1/documents/my` — requireAuth. User's documents.
- `GET /api/v1/documents/review` — requireStaff. Query: status (optional).
- `PATCH /api/v1/documents/:docId/review` — requireStaff. Body: `{ status, rejection_reason? }`.

#### `src/routes/banks.ts`
- `GET /api/v1/banks` — Public (no auth). List all active banks.
- `POST /api/v1/banks/match-offers` — requireStaff. Body: `{ loan_application_id }`. Rate limit: 5 per 60s.
- `GET /api/v1/banks/offers/:loanId` — requireAuth. Get offers for a loan.

#### `src/routes/otp.ts`
- `POST /api/v1/otp/send` — requireAuth. Body: `{ phone }`. Rate limit: 3 per 600s.
- `POST /api/v1/otp/verify` — requireAuth. Body: `{ phone, code }`. Rate limit: 5 per 600s.

#### `src/routes/notifications.ts`
- `GET /api/v1/notifications/my` — requireAuth. Query: `unread_only` (boolean).
- `PATCH /api/v1/notifications/:notificationId/read` — requireAuth.
- `POST /api/v1/notifications/read-all` — requireAuth.
- `POST /api/v1/notifications/send` — requireAdmin. Body: `{ user_id, type, title, message, email?, link?, metadata? }`.

#### `src/routes/referrals.ts`
- `GET /api/v1/referrals/my` — requireAuth.
- `GET /api/v1/referrals/my/payouts` — requireAuth.
- `GET /api/v1/referrals` — requireAdmin. All referrals.
- `GET /api/v1/referrals/payouts` — requireAdmin. Query: `status`.
- `POST /api/v1/referrals/process` — requireAdmin. Body: `{ action, referee_user_id, referral_code?, loan_application_id? }`.
- `POST /api/v1/referrals/payouts/process` — requireAdmin. Body: `{ payout_id, bank_account_details? }`.

#### `src/routes/contacts.ts`
- `POST /api/v1/contacts` — Public (no auth). Rate limit: 3 per 3600s by email. Body: `{ name, email, phone, message?, loan_type? }`. Sends team notification email + auto-reply.
- `GET /api/v1/contacts` — requireStaff. Query: `status`.
- `PATCH /api/v1/contacts/:submissionId` — requireStaff. Body: `{ status, admin_notes? }`.

#### `src/routes/counselors.ts`
- `GET /api/v1/counselors` — Public. List all counselors.
- `GET /api/v1/counselors/:counselorId` — Public. Single counselor.
- `POST /api/v1/counselors` — requireAdmin. Body: CounselorCreate schema.
- `PATCH /api/v1/counselors/:counselorId` — requireAdmin. Body: CounselorUpdate schema.
- `POST /api/v1/counselors/assign` — requireStaff. Body: `{ loan_application_id, counselor_id? }`. Null counselor_id = auto-assign.

#### `src/routes/admin.ts`
- `GET /api/v1/admin/stats` — requireAdmin. Returns dashboard stats.

#### `src/routes/webhooks.ts`
- `POST /api/v1/webhooks/razorpay` — No auth (verified via signature). Verify Razorpay webhook signature using HMAC-SHA256 with webhook secret. Process payout events.

### 1.10 Main Entry Point

Create `src/index.ts`:
```typescript
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Bindings } from "./env";

const app = new Hono<{ Bindings: Bindings }>();

// CORS — allow both frontends
app.use("*", cors({
  origin: ["https://www.fundmycampus.com", "https://fundmycampus.com", "https://admin.fundmycampus.com", "http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Better Auth — mount at /api/auth/*
// Mount all route files under /api/v1/
// Global error handler → { success: false, error: message }

export default app;
```

---

## Phase 2: Frontend PRD — Login & Signup Pages

### Product: FundMyCampus User Frontend
### Tech Stack: Next.js, TypeScript, Tailwind CSS, Better Auth, Framer Motion
### Design Language: Teal (#14b8a6) primary, white cards, rounded-2xl corners, clean modern UI

---

### 2.1 Design System & Shared Components

**Color palette**:
- Primary: teal-500 (#14b8a6) — buttons, links, accents, icons
- Background: gray-50 — page background
- Cards: white with border-gray-100, shadow-sm, rounded-2xl
- Error: red-50 background, red-200 border, red-700 text
- Success: teal-50 background, teal-200 border, teal-700 text
- Text: gray-900 (headings), gray-700 (labels), gray-500 (helpers), gray-400 (placeholders)

**Input styling** (all inputs use this pattern):
```
w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
```

**Error input styling**: replace `border-gray-300` with `border-red-400 focus:ring-red-200`

**Button component** (`components/ui/Button.tsx`) — already exists:
- Variants: `primary` (teal bg, white text), `secondary` (black bg, teal border), `ghost` (transparent)
- Sizes: `sm`, `md`, `lg`
- Props: `fullWidth`, `disabled`, `type`
- Uses Framer Motion for hover/tap animations

**Error banner pattern** (used on all auth forms):
```html
<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
  {error message}
</div>
```

**Success banner pattern**:
```html
<div class="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">
  {success message}
</div>
```

**Page icon header pattern** (used on login, signup, forgot-password, profile edit):
```html
<div class="flex items-center gap-3 mb-8">
  <div class="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
    <Icon class="w-5 h-5 text-white" />
  </div>
  <div>
    <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
    <p class="text-sm text-gray-500">{subtitle}</p>
  </div>
</div>
```

**Card wrapper** (used on all auth forms):
```html
<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
  {content}
</div>
```

**Page centering** (login, forgot-password):
```html
<div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  {card}
</div>
```

---

### 2.2 Auth Infrastructure Files

These files must exist for login/signup to work:

**`lib/auth-client.ts`** — Better Auth client:
```typescript
import { createAuthClient } from "better-auth/react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
export const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: "/api/auth",
  fetchOptions: { credentials: "include" },
});
export const { signIn, signUp, signOut, useSession } = authClient;
```

**`lib/api-client.ts`** — API fetcher with cookie auth:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) { window.location.href = "/login"; throw new Error("Unauthorized"); }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.detail || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = new URL(`${API_URL}${path}`);
    if (params) Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") url.searchParams.set(k, String(v)); });
    return handleResponse<T>(await fetch(url.toString(), { credentials: "include", headers: { "Content-Type": "application/json" } }));
  },
  async post<T>(path: string, body?: unknown): Promise<T> {
    return handleResponse<T>(await fetch(`${API_URL}${path}`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined }));
  },
  async patch<T>(path: string, body?: unknown): Promise<T> {
    return handleResponse<T>(await fetch(`${API_URL}${path}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined }));
  },
  async upload<T>(path: string, formData: FormData): Promise<T> {
    return handleResponse<T>(await fetch(`${API_URL}${path}`, { method: "POST", credentials: "include", body: formData }));
  },
};
```

**`lib/auth-context.tsx`** — Auth state provider:
- Wraps the entire app in `app/layout.tsx`
- On mount: calls `authClient.getSession()` to check if user is already logged in
- Provides: `user` (id, email, name) | `null`, `loading` boolean, `signOut()` function, `refreshSession()` function
- `signOut()`: clears user state → calls `authClient.signOut()` → redirects to `/login`
- `refreshSession()`: force re-fetches session from server (called after login/signup to update UI immediately)

**`middleware.ts`** — Pass-through, no server-side auth checks:
```typescript
export async function middleware() { return NextResponse.next(); }
export const config = { matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/signup", "/forgot-password"] };
```

**`app/layout.tsx`** — Wraps `{children}` in `<AuthProvider>`, includes `<Header>` and `<Footer>`.

---

### 2.3 LOGIN PAGE — Complete PRD

**Route**: `/login`
**File**: `app/login/page.tsx` → renders `<LoginForm />`
**Component**: `components/auth/LoginForm.tsx`
**Auth required**: No (public page)
**If already logged in**: Redirect to `/dashboard`

#### User Journey
1. User lands on `/login` (from header "Login" button, or redirect after 401, or link from signup page)
2. Sees centered card with email + password form
3. Enters credentials and clicks "Sign In"
4. On success → redirected to `/dashboard`
5. On failure → sees inline error message, can retry

#### Layout
```
┌─────────────────────────────────────────┐
│     centered on page, max-w-md          │
│  ┌───────────────────────────────────┐  │
│  │ [teal icon] Welcome back          │  │
│  │              Sign in to your      │  │
│  │              account              │  │
│  │                                   │  │
│  │ [error banner if any]             │  │
│  │                                   │  │
│  │ Email                             │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │ you@example.com             │   │  │
│  │ └─────────────────────────────┘   │  │
│  │                                   │  │
│  │ Password                          │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │ ••••••••                    │   │  │
│  │ └─────────────────────────────┘   │  │
│  │                                   │  │
│  │ [x] Remember me    Forgot pass?   │  │
│  │                                   │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │        Sign In              │   │  │
│  │ └─────────────────────────────┘   │  │
│  │                                   │  │
│  │  Don't have an account? Sign Up   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### Fields

| # | Field | HTML type | Required | Validation | Placeholder | Backend |
|---|-------|-----------|----------|------------|-------------|---------|
| 1 | Email | `<input type="email">` | Yes | Must be valid email format (contains @ and .) | "you@example.com" | Sent to Better Auth |
| 2 | Password | `<input type="password">` | Yes | Must be non-empty (no min length check on login) | "••••••••" | Sent to Better Auth |
| 3 | Remember Me | `<input type="checkbox">` | No | Default: unchecked | — | `rememberMe` param to Better Auth (extends session duration) |

#### API Call
```typescript
const result = await authClient.signIn.email({ email, password, rememberMe });
```
- **On success**: `result.error` is null → call `refreshSession()` → `router.push("/dashboard")`
- **On error**: `result.error.message` → display in error banner

#### Error States

| Error scenario | Error message displayed | What user sees |
|---------------|------------------------|----------------|
| Wrong email/password | "Invalid email or password" | Red banner above form |
| Account doesn't exist | "Invalid email or password" (same — don't reveal) | Red banner above form |
| Network error | "Login failed" (catch block) | Red banner above form |
| Server down | "Login failed" | Red banner above form |
| Rate limited | Error from server (e.g., "Too many attempts") | Red banner above form |

#### Loading State
- "Sign In" button text changes to "Signing in..."
- Button becomes `disabled` (opacity reduced, no click)
- Form inputs remain visible but not interactive

#### Navigation Links
| Link text | Target | Position |
|-----------|--------|----------|
| "Forgot password?" | `/forgot-password` | Right side, between password and button |
| "Sign Up" | `/signup` | Below button, center text: "Don't have an account? **Sign Up**" |

#### Already Logged In Behavior
If user visits `/login` but `useAuth().user` exists → redirect to `/dashboard` immediately.

---

### 2.4 SIGNUP PAGE — Complete PRD

**Route**: `/signup`
**File**: `app/signup/page.tsx` → renders `<SignupForm />`
**Component**: `components/signup/SignupForm.tsx`
**Auth required**: No for Step 0, Yes for Steps 1-3 (account created in Step 0)

#### Product Goal
Combine account creation + loan application into one seamless flow. User creates account first, then optionally fills out loan application details. Can skip at any point after account creation.

#### User Journey
1. User lands on `/signup` (from header "Apply Now", login page "Sign Up" link, or landing page CTA)
2. **Step 0** — Creates account (email + password) → account created, user is now logged in
3. **Step 1** — Fills basic personal details (optional — can skip)
4. **Step 2** — Fills education details (optional — can skip)
5. **Step 3** — Fills financial details + submits loan application (optional — can skip)
6. On submit → success screen → redirect to `/dashboard`

#### Layout
```
┌───────────────────────────────────────────────────┐
│  centered on page, max-w-lg                       │
│  ┌─────────────────────────────────────────────┐  │
│  │ [teal icon] {Step Title}                    │  │
│  │              Step {n} of 4                  │  │
│  │                                             │  │
│  │ ●━━━━━●━━━━━○━━━━━○  (step indicator)      │  │
│  │ Acct   Basic  Edu   Finance                 │  │
│  │                                             │  │
│  │ [error banner if any]                       │  │
│  │                                             │  │
│  │ {step form fields}                          │  │
│  │                                             │  │
│  │ ┌──────────────┐  ┌──────────────────────┐  │  │
│  │ │ Skip for now │  │ Continue / Submit     │  │  │
│  │ └──────────────┘  └──────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```

#### Step Indicator Component
Visual progress showing all 4 steps horizontally:
- Each step: circle (w-8 h-8) with step number or checkmark
- Completed steps: teal background, white checkmark
- Current step: teal background, white number, ring-4 ring-teal-100 glow
- Future steps: gray-200 background, gray-500 number
- Between steps: horizontal line (teal if completed, gray if not)
- Labels below each circle (hidden on mobile): "Account", "Basic Details", "Education", "Finances"
- Step indicator is NOT shown on Step 0 (only on Steps 1-3)

---

#### STEP 0: Create Account

**Title**: "Create Your Account"
**Subtitle**: "Step 1 of 4"

**API**: `POST /api/v1/auth/register`
**Request**: `{ email: string, password: string }`
**Response**: `{ success: true }` + session cookie automatically set by backend

| # | Field | HTML type | Required | Validation rules | Error message if invalid | Placeholder |
|---|-------|-----------|----------|-----------------|--------------------------|-------------|
| 1 | Email | `<input type="email">` | Yes | Non-empty AND valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) | "Please enter a valid email address" | "you@example.com" |
| 2 | Password | `<input type="password">` | Yes | Non-empty AND minimum 8 characters | "Password must be at least 8 characters" | "Min. 8 characters" |
| 3 | Confirm Password | `<input type="password">` | Yes | Must exactly match Password field | "Passwords do not match" | "Repeat password" |

**Validation**: Client-side BEFORE API call. Show field-level errors below each input (red text, text-xs).

**Button**: "Create Account" (primary, full width)
**Loading state**: "Creating account..." with spinner

**On success**:
1. Call `refreshSession()` to update auth context (user is now logged in)
2. Advance to Step 1
3. Cannot go back to Step 0 once account is created

**On error**:
| Error scenario | Message |
|---------------|---------|
| Email already registered | "A user with this email already exists" (from server) |
| Weak password (if server rejects) | Server error message |
| Network error | "Registration failed" |

**Bottom link**: "Already have an account? **Sign In**" → `/login`

---

#### STEP 1: Basic Details

**Title**: "Basic Details"
**Subtitle**: "Step 2 of 4"

**No API call** — all data stored in component state.

| # | Field | HTML type | Required | Options / Validation | Placeholder | Backend field name |
|---|-------|-----------|----------|---------------------|-------------|-------------------|
| 1 | Full Name | `<input type="text">` | No (skippable) | Free text | "Your full name" | `full_name` |
| 2 | Phone Number | `<input type="tel">` | No | Free text, ideally 10 digits | "+91 XXXXX XXXXX" | `phone` |
| 3 | Gender | `<select>` | No | "Select gender", "Male", "Female", "Other", "Prefer not to say" | — | `gender` |
| 4 | WhatsApp same as phone | `<input type="checkbox">` | No | Default: checked (true) | "WhatsApp number same as phone" | `is_whatsapp` (boolean) |

**Buttons**:
- "Continue" (primary) → advance to Step 2
- "Skip for now" (ghost, gray text) → redirect to `/dashboard`

**Back button**: NOT shown (cannot go back to account step once created)

---

#### STEP 2: Education Details

**Title**: "Education Details"
**Subtitle**: "Step 3 of 4"

**No API call** — data stored in component state.

| # | Field | HTML type | Required | Options | Placeholder | Backend field name |
|---|-------|-----------|----------|---------|-------------|-------------------|
| 1 | Do you have an offer letter? | Radio group (3 options inline) | No | "Yes", "No", "Still applying" | — | `has_offer_letter` (boolean — Yes=true, No/applying=false), `university_app_status` (if "No" or "Still applying") |
| 2 | Course Level | `<select>` | No | "Select", "Undergraduate", "Postgraduate", "Diploma", "PhD", "Other" | — | `course_level` |
| 3 | Degree | `<input type="text">` | No | Free text | "e.g. B.Tech, MBA" | `course_degree` |
| 4 | Country of Study | `<input type="text">` | No | Free text | "e.g. USA, UK, India" | `target_country` |
| 5 | College / University | `<input type="text">` | No | Free text | "Institution name" | `target_college` |
| 6 | Start Month | `<select>` | No | "Month", "January" through "December" | — | `course_start_month` |
| 7 | Start Year | `<input type="number">` | No | min=2020, max=2030 | "e.g. 2025" | `course_start_year` (integer) |

**Layout note**: Course Level + Degree on same row (grid-cols-2). Start Month + Start Year on same row (grid-cols-2).

**Buttons**:
- "Continue" (primary) → advance to Step 3
- "Skip for now" (ghost) → redirect to `/dashboard`

---

#### STEP 3: Financial Details + Submit Application

**Title**: "Financial Details"
**Subtitle**: "Step 4 of 4"

**API on submit**: `POST /api/v1/loans`

| # | Field | HTML type | Required | Options | Placeholder | Backend field name |
|---|-------|-----------|----------|---------|-------------|-------------------|
| 1 | Loan Amount Required (₹) | `<input type="number">` | No (but needed for submission) | Free number | "e.g. 2000000" | `loan_amount` (float, in rupees) |
| 2 | Do you have collateral? | Radio group (2 options inline) | No | "Yes", "No" | — | `has_collateral` (boolean) |
| 3 | Co-applicant Monthly Income (₹) | `<input type="number">` | No | Free number | "e.g. 50000" | `co_applicant_income` (float) |
| 4 | Existing Monthly EMIs (₹) | `<input type="number">` | No | Free number | "0 if none" | `existing_emis` (float) |
| 5 | How did you hear about us? | `<select>` | No | "Select", "Google", "Instagram", "WhatsApp", "Friend / Family", "YouTube", "Other" | — | `hear_about_us` |

**Submit button**: "Submit Application" (primary, full width)
**Loading state**: "Submitting..." with spinner
**Skip button**: "Skip for now" (ghost) → redirect to `/dashboard`

**What gets sent to `POST /api/v1/loans`** — Combine data from all 3 steps into a FLAT object:

```json
{
  "full_name": "Rahul Sharma",
  "gender": "Male",
  "email": "rahul@example.com",
  "phone": "+919876543210",
  "is_whatsapp": true,
  "has_offer_letter": false,
  "university_app_status": "Still applying",
  "course_start_year": 2025,
  "course_start_month": "September",
  "course_level": "Postgraduate",
  "course_degree": "MBA",
  "course_name": "MBA Finance",
  "target_country": "USA",
  "target_college": "MIT Sloan",
  "loan_amount": 2000000,
  "has_collateral": false,
  "co_applicant_income": 50000,
  "existing_emis": 0,
  "hear_about_us": "google"
}
```

**Field mapping from form → API**:
| Form state | API field | Type conversion |
|-----------|-----------|-----------------|
| Step 0: `account.email` | `email` | string |
| Step 1: `basic.full_name` | `full_name` | string |
| Step 1: `basic.phone` | `phone` | string |
| Step 1: `basic.gender` | `gender` | string |
| Step 1: `basic.whatsapp_same` | `is_whatsapp` | boolean |
| Step 2: `education.has_offer_letter` | `has_offer_letter` | "yes"→true, else→false |
| Step 2: `education.has_offer_letter` | `university_app_status` | if "no"/"applying" → the value, else omit |
| Step 2: `education.course_level` | `course_level` | string |
| Step 2: `education.degree` | `course_degree` | string |
| Step 2: "MBA Finance" (or user input) | `course_name` | string (same as degree if not separate field) |
| Step 2: `education.country` | `target_country` | string |
| Step 2: `education.college` | `target_college` | string |
| Step 2: `education.start_month` | `course_start_month` | string ("September") |
| Step 2: `education.start_year` | `course_start_year` | parseInt → number |
| Step 3: `financial.loan_amount` | `loan_amount` | parseFloat → number |
| Step 3: `financial.has_collateral` | `has_collateral` | "yes"→true, "no"→false |
| Step 3: `financial.co_applicant_income` | `co_applicant_income` | parseFloat → number, default 0 |
| Step 3: `financial.existing_emis` | `existing_emis` | parseFloat → number, default 0 |
| Step 3: `financial.heard_via` | `hear_about_us` | string |

**Backend response**: `{ success: true, application_id: "FMC-20250317-12345", message: "Application submitted successfully. Your counselor will contact you within 24 hours." }`

**On submit error**:
| Error scenario | Message |
|---------------|---------|
| Missing required fields (server validation) | Server error message |
| Not authenticated | Redirect to `/login` (401 handler) |
| Network error | "Submission failed" |

---

#### SUCCESS SCREEN (after Step 3 submit)

Replaces the entire form card:

```
┌───────────────────────────────────────┐
│                                       │
│     [green checkmark in circle]       │
│                                       │
│     Application Submitted!            │
│                                       │
│  Redirecting you to your dashboard... │
│                                       │
└───────────────────────────────────────┘
```

- Green circle (w-16 h-16, bg-teal-100) with CheckCircle icon (teal-500)
- Title: "Application Submitted!" (text-xl font-bold)
- Subtitle: "Redirecting you to your dashboard..." (text-sm text-gray-500)
- Auto-redirect to `/dashboard` after 1.5 seconds via `setTimeout`

---

### 2.5 FORGOT PASSWORD PAGE — Complete PRD

**Route**: `/forgot-password`
**File**: `app/forgot-password/page.tsx` → renders `<ForgotPasswordForm />`
**Component**: `components/auth/ForgotPasswordForm.tsx`
**Auth required**: No

#### Layout
Same centered card layout as login (max-w-md, white card with shadow).

**Icon**: Mail icon (teal)
**Title**: "Reset password"
**Subtitle**: "We'll send you a reset link"

#### Fields

| # | Field | HTML type | Required | Validation | Placeholder |
|---|-------|-----------|----------|------------|-------------|
| 1 | Email | `<input type="email">` | Yes | Valid email format | "you@example.com" |

#### API Call
```typescript
const client = authClient as any;
const forgotFn = client.forgetPassword ?? client.requestPasswordReset;
await forgotFn({ email, redirectTo: "/reset-password" });
```

#### States

**Default state**: Email input + "Send Reset Link" button
**Loading state**: "Sending..." with spinner in button
**Success state**: Replaces form with:
```
[teal mail icon in circle]
Check your email — we've sent a password reset link to {email}.
```
**Error state**: Red banner above form with error message

#### Navigation
- "Back to Login" link → `/login` (below the form)

---

### 2.6 COMPLETE STATE MACHINE — User Auth Flow

```
                    ┌─────────────┐
                    │  /  (home)  │
                    └──────┬──────┘
                           │
                 ┌─────────┼─────────┐
                 ▼                   ▼
          ┌──────────┐        ┌──────────┐
          │  /login   │        │ /signup   │
          └─────┬────┘        └─────┬────┘
                │                   │
        authClient.signIn     POST /api/v1/auth/register
                │                   │
                │              ┌────┴────┐
                │              │ Account  │
                │              │ Created  │
                │              └────┬────┘
                │                   │
                │         ┌────────┼────────┐
                │         │ Steps 1-3       │ "Skip"
                │         │ (optional)      │──────┐
                │         └────────┬────────┘      │
                │                  │ Submit         │
                │             POST /api/v1/loans    │
                │                  │                │
                └──────────┬───────┘────────────────┘
                           ▼
                    ┌──────────────┐
                    │  /dashboard  │
                    └──────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        /profile/edit  /documents  /notifications ...
```

#### Session Management
- Session is stored as a **cookie** set by the backend (Better Auth)
- Cookie name: `better-auth.session_token` (or `__Secure-better-auth.session_token` in production)
- All API calls include `credentials: "include"` to send the cookie
- On page load: `authClient.getSession()` checks if session is valid
- If session expired/invalid: `user` becomes null → pages redirect to `/login`
- "Remember me" on login: extends session duration (Better Auth handles this)

#### Protected Route Pattern
Every post-login page uses this pattern:
```typescript
const { user, loading } = useAuth();
const router = useRouter();
useEffect(() => { if (!loading && !user) router.push("/login"); }, [loading, user, router]);
if (loading) return null; // or skeleton
```

---

### 2.7 POST-LOGIN PAGES — Feature Specification

These pages exist AFTER the user has logged in. Each page needs auth protection (redirect to `/login` if not logged in).

---

#### PAGE: `/dashboard` — User Dashboard

**APIs on mount**:
- `GET /api/v1/profiles/me` → profile data
- `GET /api/v1/loans/my` → loan applications list

**Sections**:

**1. Welcome header**:
- "Welcome, {full_name}" (fallback: email username)
- User email below
- "Sign Out" button (top right)

**2. Profile card** (left column):
- Avatar circle with user icon
- Name + email
- Profile completion progress bar (0-100%)
- "Edit Profile" button → `/profile/edit`

**3. Quick actions** (right column, 2-column grid):
- "Apply for Loan" card (teal bg) with GraduationCap icon → `/signup`
- "Complete Profile" card (gray bg) with Edit icon → `/profile/edit`

**4. Loan applications list**:
- Header: "Loan Applications" with FileText icon
- Each loan card shows:
  - Status icon: CheckCircle (green) for approved, XCircle (red) for rejected, Clock (yellow) for others
  - Loan amount: "₹20,00,000" (Indian number formatting with commas)
  - Date: "Applied 17 Mar 2025"
  - Status badge (pill): colored based on status
- Empty state: GraduationCap icon + "No applications yet" + "Start your application →" link

**Status badge colors**:
| Status | Background | Text color |
|--------|-----------|------------|
| approved, disbursed | bg-green-100 | text-green-700 |
| rejected, withdrawn | bg-red-100 | text-red-700 |
| all others | bg-yellow-100 | text-yellow-700 |

---

#### PAGE: `/profile/edit` — Edit Profile

**APIs**: `GET /api/v1/profiles/me` (load) → `PATCH /api/v1/profiles/me` (save)

**All fields organized in sections**:

**Section: Personal Information** (grid 2-col on desktop):
| Label | Type | Backend field | Notes |
|-------|------|--------------|-------|
| Full Name | text | `full_name` | |
| Phone | tel | `phone` | Show "Verify" button if `phone_verified` is false |
| Gender | select | `gender` | Options: Male, Female, Other |
| Date of Birth | date | `date_of_birth` | ISO date string |
| Marital Status | select | `marital_status` | Options: Single, Married, Divorced, Widowed |
| About | textarea (3 rows) | `about` | "Tell us a bit about yourself" |

**Section: Identity Documents** (grid 2-col):
| Label | Type | Backend field |
|-------|------|--------------|
| Passport Number | text | `passport_number` |
| PAN Number | text | `pan_number` |
| Mother's Maiden Name | text | `mother_maiden_name` |

**Section: Address**:
| Label | Type | Backend field |
|-------|------|--------------|
| Address Line 1 | text | `address_line1` |
| Address Line 2 | text | `address_line2` |
| City | text | `city` |
| District | text | `district` |
| State | text | `state` |
| PIN Code | text | `zip_code` |
| Country | text | `country` (default: "India") |

**Section: Social Links**:
| Label | Type | Backend field |
|-------|------|--------------|
| LinkedIn | url | `linkedin_url` |
| Twitter/X | url | `twitter_url` |
| Instagram | url | `instagram_url` |

**Read-only display** (shown but not editable):
- `email` — user's email
- `referral_code` — with copy-to-clipboard button
- `role` — user role badge
- `profile_completion_pct` — progress percentage

**Buttons**: "Save Changes" (primary) + "Cancel" (ghost, links to /dashboard)
**Success**: Green banner "Profile updated successfully!"
**Error**: Red banner with error message

---

#### PAGE: `/documents` — My Documents

**APIs**: `GET /api/v1/documents/my` (list) + `POST /api/v1/documents` (upload, multipart)

**Upload form fields**:
| Label | Type | Backend field | Options |
|-------|------|--------------|---------|
| Document Type | select | `document_type` | passport, pan_card, aadhar, offer_letter, transcript, sop, lor, resume, bank_statement, itr, salary_slip, property_docs, co_applicant_docs, photo, other |
| File | file input | `file` | Max 10MB. Allowed: PDF, JPEG, PNG, WebP |
| Link to Application | select (optional) | `loan_application_id` | User's loan application IDs |

**Document list** — each row shows:
| Field | Display |
|-------|---------|
| document_type | Human-readable label (e.g. "PAN Card", "Offer Letter") |
| file_name | Original filename |
| file_size | Formatted ("2.3 MB") |
| status | Colored badge |
| rejection_reason | Red text if status=rejected |
| created_at | Upload date |
| file_url | View/download link |

**Document status badges**: pending_review (yellow), under_review (blue), verified (green), rejected (red), expired (gray)

---

#### PAGE: `/notifications` — My Notifications

**APIs**: `GET /api/v1/notifications/my` + `PATCH /api/v1/notifications/{id}/read` + `POST /api/v1/notifications/read-all`

**Features**:
- Filter toggle: "All" / "Unread only" (query param `unread_only=true`)
- "Mark all as read" button
- Each notification shows: type icon, title (bold if unread), message, time ago, link if present
- Click → marks as read + navigates to link

**Notification types**: welcome, application_update, document_update, counselor_assigned, bank_offers, referral_update, payout_update, general

---

#### PAGE: `/referrals` — My Referrals

**APIs**: `GET /api/v1/referrals/my` + `GET /api/v1/referrals/my/payouts` + profile's `referral_code`

**Sections**:
1. **Share your code**: Display referral_code (e.g. "FMC-A3X9K2") with copy button + shareable link
2. **Referral list**: Each shows referee status (signed_up → applied → sanctioned → disbursed)
3. **Payout history**: Amount, type, status badge, dates
4. **How it works** (static): Signup=notified, Sanctioned=₹1000 (+₹5000 every 5th), Disbursed=₹1000 referrer + ₹1000 referee bonus

---

#### PAGE: `/otp-verify` — Phone Verification

**APIs**: `POST /api/v1/otp/send` + `POST /api/v1/otp/verify`

**Flow**: Enter phone → "Send OTP" → 6-digit code input appears → "Verify" → success updates `phone_verified`
**Access from**: Profile edit page, "Verify" button next to phone field
**Rate limits**: 3 sends per 10 min, 5 verify attempts per 10 min

---

### 2.8 Header Navigation States

**Logged OUT**:
| Item | Type | Target |
|------|------|--------|
| Logo (FundMyCampus) | Link | `/` |
| Home | Link | `/` |
| About | Link | `/about` |
| Contact | Link | `/contact` |
| Login | Button (ghost) | `/login` |
| Apply Now | Button (primary) | `/signup` |

**Logged IN** — replace Login/Apply with user dropdown:
| Item | Type | Target |
|------|------|--------|
| Logo | Link | `/` |
| Home | Link | `/` |
| Dashboard | Link | `/dashboard` |
| User dropdown ▾ | Menu | — |
| → My Applications | Dropdown item | `/dashboard` |
| → Documents | Dropdown item | `/documents` |
| → Notifications (badge) | Dropdown item | `/notifications` |
| → Referrals | Dropdown item | `/referrals` |
| → Edit Profile | Dropdown item | `/profile/edit` |
| → Sign Out | Dropdown item | calls `signOut()` |

---

## Cross-Origin Cookie Configuration (CRITICAL)

Both frontends use `credentials: "include"` for all API calls. The backend (Workers) must:
- Set `Access-Control-Allow-Credentials: true`
- Set `Access-Control-Allow-Origin` to the exact origin (not `*`)
- Better Auth cookies: `sameSite: "none"`, `secure: true`
- Better Auth `trustedOrigins`: `["https://www.fundmycampus.com", "https://fundmycampus.com", "https://admin.fundmycampus.com", "http://localhost:3000", "http://localhost:3001"]`

---

## Complete API ↔ Frontend Page Mapping

| Frontend Page | API Endpoint | Method | Auth | Request Body |
|--------------|-------------|--------|------|--------------|
| `/login` | `/api/auth/sign-in/email` | POST | No | `{ email, password, rememberMe }` (via Better Auth client) |
| `/signup` step 0 | `/api/v1/auth/register` | POST | No | `{ email, password }` |
| `/signup` step 3 | `/api/v1/loans` | POST | Yes | Flat loan object (20 fields, see mapping table above) |
| `/forgot-password` | `/api/auth/forget-password` | POST | No | `{ email, redirectTo }` (via Better Auth client) |
| `/` landing | `/api/v1/banks` | GET | No | — |
| `/` landing | `/api/v1/counselors` | GET | No | — |
| `/contact` | `/api/v1/contacts` | POST | No | `{ name, email, phone, message?, loan_type? }` |
| `/dashboard` | `/api/v1/profiles/me` | GET | Yes | — |
| `/dashboard` | `/api/v1/loans/my` | GET | Yes | — |
| `/profile/edit` load | `/api/v1/profiles/me` | GET | Yes | — |
| `/profile/edit` save | `/api/v1/profiles/me` | PATCH | Yes | Partial profile object (only changed fields) |
| `/documents` list | `/api/v1/documents/my` | GET | Yes | — |
| `/documents` upload | `/api/v1/documents` | POST | Yes | FormData: file + document_type + loan_application_id? |
| `/notifications` | `/api/v1/notifications/my` | GET | Yes | Query: `?unread_only=true/false` |
| `/notifications` read | `/api/v1/notifications/{id}/read` | PATCH | Yes | — |
| `/notifications` all | `/api/v1/notifications/read-all` | POST | Yes | — |
| `/referrals` | `/api/v1/referrals/my` | GET | Yes | — |
| `/referrals` payouts | `/api/v1/referrals/my/payouts` | GET | Yes | — |
| `/otp-verify` send | `/api/v1/otp/send` | POST | Yes | `{ phone }` |
| `/otp-verify` check | `/api/v1/otp/verify` | POST | Yes | `{ phone, code }` |

---

## Phase 4: Seed Script

Create `src/scripts/seed.ts` or a Wrangler command to:
1. Create admin user via Better Auth
2. Create admin profile with role="admin"
3. Optionally seed some test banks

---

## File Structure Summary

```
fundmycampus-workers/
├── package.json
├── tsconfig.json
├── wrangler.toml
├── drizzle.config.ts
├── .dev.vars
├── src/
│   ├── index.ts
│   ├── env.ts
│   ├── db/
│   │   └── schema.ts
│   ├── auth/
│   │   ├── auth.ts
│   │   ├── middleware.ts
│   │   └── guards.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── profiles.ts
│   │   ├── users.ts
│   │   ├── loans.ts
│   │   ├── documents.ts
│   │   ├── banks.ts
│   │   ├── otp.ts
│   │   ├── counselors.ts
│   │   ├── referrals.ts
│   │   ├── contacts.ts
│   │   ├── notifications.ts
│   │   ├── admin.ts
│   │   └── webhooks.ts
│   ├── services/
│   │   ├── loan-service.ts
│   │   ├── document-service.ts
│   │   ├── bank-service.ts
│   │   ├── counselor-service.ts
│   │   ├── referral-service.ts
│   │   ├── notification-service.ts
│   │   ├── email-service.ts
│   │   ├── otp-service.ts
│   │   ├── payout-service.ts
│   │   └── stats-service.ts
│   ├── validators/
│   │   ├── loan.ts
│   │   ├── document.ts
│   │   ├── counselor.ts
│   │   ├── referral.ts
│   │   ├── contact.ts
│   │   ├── notification.ts
│   │   └── user.ts
│   └── utils/
│       ├── response.ts
│       ├── pagination.ts
│       └── constants.ts
```

---

## Implementation Order

1. Project setup (package.json, wrangler.toml, tsconfig.json, env.ts)
2. Database schema (all 16 tables in Drizzle) + drizzle.config.ts + generate migration
3. Constants and utility files
4. Auth system (Better Auth config, middleware, guards)
5. Zod validators (all 7 files)
6. Service files (all 10 services)
7. Route files (all 13 routes)
8. Main entry point (index.ts)
9. Delete Supabase files from admin panel + user frontend
10. Verify `npx wrangler dev` starts without errors
11. Create seed script for admin user

---

## Critical Implementation Notes

1. **Better Auth + D1**: Use `@better-auth/d1` adapter. Better Auth creates its own tables (`user`, `session`, `account`, `verification`). Your `profiles` table is SEPARATE and linked by user ID.

2. **Cross-origin cookies**: Better Auth session cookies must work across `api.fundmycampus.com` → `fundmycampus.com` and `admin.fundmycampus.com`. Configure Better Auth with `trustedOrigins` and set cookie `sameSite: "none"`, `secure: true` in production.

3. **R2 file uploads**: Hono can parse multipart forms. Use `c.req.parseBody()` to get the file, then `env.STORAGE.put(key, file)` to upload to R2. Generate signed URLs or public URLs for retrieval.

4. **D1 limitations**: No `ARRAY` type — store arrays as JSON TEXT and parse in application code. No `NUMERIC` type — use REAL for decimals. No native UUID — generate with `crypto.randomUUID()`.

5. **Rate limiting**: Implement simple rate limiting using D1 (store IP/key + timestamp + count) or use a lightweight in-memory approach for Workers.

6. **Application ID format**: `FMC-YYYYMMDD-XXXXX` where XXXXX is random 5-digit number. Check uniqueness before insert.

7. **Webhook signature verification**: Razorpay uses HMAC-SHA256. Use Web Crypto API in Workers: `crypto.subtle.importKey()` + `crypto.subtle.sign()`.

8. **SendGrid**: Direct HTTP POST to `https://api.sendgrid.com/v3/mail/send` with Authorization header. No SDK needed in Workers.

9. **Twilio Verify**: Direct HTTP to Twilio API for sending and checking OTP. Use basic auth with account SID + auth token.

10. **Profile completion percentage**: Calculate based on which fields are filled. Count non-null fields from: full_name, phone, date_of_birth, gender, passport_number, pan_number, address_line1, city, state, zip_code. Formula: `(filled / total) * 100`.
