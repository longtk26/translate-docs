# Epic 5: User Authentication & Account Management

## Description
Implement secure user registration, login, profile management, and subscription handling.

---

## User Stories

### US-5.1: User Registration
- **As a** new user
- **I want to** create an account
- **So that** I can save my translations and access premium features
- **Acceptance Criteria:**
  - Email and password registration
  - Social login (Google, Microsoft, GitHub)
  - Email verification required before full access
  - Password strength requirements (min 8 chars, uppercase, lowercase, number, special char)
  - Terms of service and privacy policy acceptance
  - CAPTCHA for bot prevention
  - Welcome email with getting started guide
  - Automatic creation of default workspace

### US-5.2: User Login
- **As a** registered user
- **I want to** log into my account securely
- **So that** I can access my documents and settings
- **Acceptance Criteria:**
  - Login with email/password
  - Social login (Google, Microsoft, GitHub)
  - "Remember me" option (30-day session)
  - Password reset functionality via email
  - Account lockout after 5 failed attempts (15-minute cooldown)
  - Two-factor authentication option (TOTP or SMS)
  - Login history and device management
  - Session management (logout from all devices)

### US-5.3: Profile Management
- **As a** user
- **I want to** manage my profile information
- **So that** I can keep my details up to date
- **Acceptance Criteria:**
  - Edit name, email, phone number
  - Upload profile picture
  - Change password with current password verification
  - Set preferred interface language
  - Set default source/target languages
  - Configure notification preferences (email, push, SMS)
  - Timezone settings
  - Delete account option with confirmation and data export

### US-5.4: Subscription Management
- **As a** user
- **I want to** view and manage my subscription
- **So that** I can control my billing and access to features
- **Acceptance Criteria:**
  - Display current plan and included features
  - Show usage statistics:
    - Pages translated this month
    - Storage used
    - API calls remaining
  - Upgrade/downgrade plan options
  - View billing history with downloadable invoices
  - Update payment methods
  - Cancel subscription with exit survey
  - Reactivate canceled subscription
  - Prorated billing for plan changes

---

## Technical Implementation

### Authentication
- **Backend**: JWT tokens with refresh token rotation
- **Session Management**: Redis for session storage
- **Password Hashing**: bcrypt or Argon2
- **OAuth 2.0**: For social login providers
- **2FA**: TOTP using libraries like pyotp or Authy

### Security Measures
- Rate limiting on login endpoints
- Email verification tokens expire in 24 hours
- Password reset tokens expire in 1 hour
- HTTPS only
- Secure cookie flags (HttpOnly, Secure, SameSite)
- CSRF protection
- IP-based suspicious activity detection

### Database Schema (Users Table)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    preferred_language VARCHAR(10),
    default_source_lang VARCHAR(10),
    default_target_lang VARCHAR(10),
    subscription_tier VARCHAR(50),
    subscription_status VARCHAR(50),
    storage_quota_mb INTEGER,
    storage_used_mb INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    last_login_at TIMESTAMP
);
```

### Notification Preferences
- Email notifications (daily digest, immediate)
- Browser push notifications
- SMS alerts for important events
- In-app notifications
