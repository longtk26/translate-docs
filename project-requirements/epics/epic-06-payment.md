# Epic 6: Payment & Pricing

## Description
Implement flexible pricing models, secure payment processing, and billing management.

---

## User Stories

### US-6.1: Free Tier Access
- **As a** guest or new user
- **I want to** translate small documents for free
- **So that** I can try the service before subscribing
- **Acceptance Criteria:**
  - 5 pages per month free (resets monthly)
  - Basic translation quality only
  - Small watermark on free translations ("Translated with [Service Name]")
  - Limited to 3 language pairs
  - No translation memory access
  - Prompt to upgrade when limit reached
  - Clear display of remaining free quota

### US-6.2: Pay-per-Document
- **As an** occasional user
- **I want to** pay for individual translations
- **So that** I don't need a subscription commitment
- **Acceptance Criteria:**
  - Pricing based on page count, quality level, and language pair:
    - Basic: $0.10/page
    - Standard: $0.20/page
    - Premium: $0.50/page (with human review)
  - Display cost estimate before processing
  - Accept major credit/debit cards via Stripe
  - Support PayPal, Apple Pay, Google Pay
  - Instant access after successful payment
  - Email receipt with transaction details
  - No account required for one-time purchases

### US-6.3: Subscription Plans
- **As a** frequent user
- **I want to** subscribe to a monthly or annual plan
- **So that** I can translate unlimited documents at lower cost
- **Acceptance Criteria:**
  - Three subscription tiers:
    - **Basic**: $19/month (100 pages, basic quality)
    - **Professional**: $49/month (500 pages, standard quality, 5GB storage)
    - **Business**: $149/month (2000 pages, premium quality, 50GB storage, priority support)
  - Monthly and annual billing (annual gets 20% discount)
  - Automatic renewal with 7-day notice
  - Prorated refunds for downgrades
  - 14-day money-back guarantee
  - Rollover up to 20% unused pages to next month
  - Cancel anytime, access until period ends

### US-6.4: Enterprise Quotes
- **As an** enterprise customer
- **I want to** request custom pricing
- **So that** I can get volume discounts and dedicated support
- **Acceptance Criteria:**
  - Contact form for enterprise inquiries
  - Fields: company name, monthly volume estimate, specific requirements
  - Response within 24 business hours
  - Custom contract terms and SLAs
  - Volume discounts (typically 30-50% off standard pricing)
  - Dedicated account manager assignment
  - Custom invoicing and payment terms
  - On-premise deployment option

### US-6.5: Billing Management
- **As a** paying user
- **I want to** manage my billing information
- **So that** I can keep my account and payments current
- **Acceptance Criteria:**
  - View and update payment methods
  - Set default payment method
  - View billing history with downloadable invoices
  - Update billing address
  - Add/remove payment methods
  - Set up backup payment method
  - Receive email alerts for failed payments
  - Automatic retry of failed payments (3 attempts over 7 days)

---

## Pricing Strategy

### Competitive Analysis
- Competitor A: $0.15/page average
- Competitor B: Subscription starting at $29/month
- Our positioning: Competitive pricing with better quality

### Currency Support
- Primary: USD
- Phase 2: EUR, GBP, JPY, AUD, CAD
- Automatic currency conversion based on user location
- Display prices in user's local currency

### Discounts & Promotions
- Student discount (30% off with valid .edu email)
- Non-profit discount (40% off with verification)
- Referral program (both parties get $10 credit)
- Seasonal promotions (Black Friday, New Year)
- First-time user coupon (20% off first purchase)

---

## Technical Implementation

### Payment Processing
- **Payment Gateway**: Stripe (primary)
- **Additional Methods**: PayPal, Apple Pay, Google Pay
- **PCI Compliance**: Use Stripe Elements (no card data on our servers)
- **3D Secure**: Support for SCA compliance (EU regulations)

### Subscription Management
- **Billing System**: Stripe Subscriptions
- **Webhooks**: Handle subscription events (payment success/failure, cancellation)
- **Prorations**: Automatic calculation for plan changes
- **Invoice Generation**: Stripe Invoicing

### Database Schema
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    plan_type VARCHAR(50),
    status VARCHAR(50), -- active, canceled, past_due, trialing
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    pages_quota INTEGER,
    pages_used INTEGER,
    stripe_subscription_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    cancel_at_period_end BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    type VARCHAR(50), -- subscription, one-time, refund
    status VARCHAR(50), -- succeeded, pending, failed
    stripe_payment_intent_id VARCHAR(255),
    invoice_url VARCHAR(500),
    created_at TIMESTAMP
);
```

### Usage Tracking
- Track page consumption per user
- Send alerts at 80% and 100% quota usage
- Soft limit: allow slight overage with charge for excess
- Reset quotas on billing cycle renewal
