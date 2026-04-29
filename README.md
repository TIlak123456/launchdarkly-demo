# LaunchDarkly Demo Application
## ABC Company SE Presentation Demo

This demo application showcases LaunchDarkly's feature management capabilities for the ABC Company presentation.

---

## Demo Requirements Summary

### Demo Scenario 1: Kill Switch (6 min)
**Purpose**: Show instant rollback of a broken feature

| Requirement | Details |
|-------------|---------|
| **Flag Name** | `new-checkout-flow` |
| **Flag Type** | Boolean |
| **Demo Action** | Toggle flag OFF to instantly "fix" broken checkout |
| **Visual** | Checkout UI changes immediately when flag is toggled |

### Demo Scenario 2: Progressive/Canary Rollout (8 min)
**Purpose**: Show safe, incremental feature release

| Requirement | Details |
|-------------|---------|
| **Flag Name** | `new-payment-processor` |
| **Flag Type** | Boolean with percentage rollout |
| **Segment** | `internal-employees` |
| **Demo Action** | Show targeting rules, change 0% → 5% → 25% |
| **Visual** | Different users see different payment UIs |

### Demo Scenario 3: Business Self-Service (6 min)
**Purpose**: Show non-technical users controlling features

| Requirement | Details |
|-------------|---------|
| **Flag Name** | `holiday-banner` |
| **Flag Type** | Boolean with targeting |
| **Flag Name 2** | `premium-features` |
| **Demo Action** | Target by country, schedule releases |
| **Visual** | Banner appears/disappears based on targeting |

---

## LaunchDarkly Flags to Create

### Flag 1: new-checkout-flow
```
Name: new-checkout-flow
Key: new-checkout-flow
Type: Boolean
Variations:
  - true: "New Checkout" (the broken one)
  - false: "Old Checkout" (the stable one)
Default: true (ON - to show the "broken" state)
```

### Flag 2: new-payment-processor
```
Name: new-payment-processor
Key: new-payment-processor
Type: Boolean
Variations:
  - true: "New Payment Processor"
  - false: "Legacy Payment Processor"
Default: false (OFF - start with legacy)

Targeting Rules:
  1. If segment = "internal-employees" → true
  2. Default: percentage rollout (start at 0%)
```

### Flag 3: holiday-banner
```
Name: holiday-banner
Key: holiday-banner
Type: Boolean
Variations:
  - true: Show banner
  - false: Hide banner
Default: false

Targeting Rules:
  1. If country = "US" → true (for demo)
```

### Flag 4: premium-features
```
Name: premium-features
Key: premium-features
Type: Boolean
Variations:
  - true: Show premium features
  - false: Hide premium features
Default: false

Targeting Rules:
  1. If plan = "enterprise" → true
```

### Segment: internal-employees
```
Name: internal-employees
Key: internal-employees
Rules:
  - email ends with "@abccompany.com"
  OR
  - userType = "internal"
```

---

## Setup Instructions

### 1. Get LaunchDarkly Credentials
1. Sign up at https://launchdarkly.com (free trial available)
2. Create a new project called "ABC-Company-Demo"
3. Get your **SDK Key** from Settings → Projects → Environments
4. Get your **Client-side ID** for the frontend

### 2. Environment Variables
Create a `.env` file:
```
LAUNCHDARKLY_SDK_KEY=sdk-your-key-here
LAUNCHDARKLY_CLIENT_ID=your-client-id-here
```

### 3. Install Dependencies
```bash
cd launchdarkly-demo
npm install
```

### 4. Create Flags in LaunchDarkly Dashboard
Follow the flag configurations above.

### 5. Run the Demo
```bash
npm run dev
```

Open http://localhost:3000

---

## Demo Users

| User | Email | Country | Plan | Type |
|------|-------|---------|------|------|
| Alice | alice@abccompany.com | US | enterprise | internal |
| Bob | bob@gmail.com | US | free | external |
| Charlie | charlie@customer.co.uk | UK | pro | external |
| Diana | diana@bigcorp.com | US | enterprise | external |

---

## Quick Demo Flow

### Kill Switch Demo
1. Load app as "Bob" → sees broken checkout (errors)
2. Go to LaunchDarkly → toggle `new-checkout-flow` OFF
3. Refresh app → checkout works perfectly
4. "2 seconds to fix, no deployment"

### Progressive Rollout Demo
1. Show flag `new-payment-processor` in LaunchDarkly
2. Show internal-employees segment rule
3. Load app as "Alice" (internal) → sees new processor
4. Load app as "Bob" (external) → sees old processor
5. Change percentage from 0% to 5%
6. "Now 5% of customers are our canary"

### Business Self-Service Demo
1. Show `holiday-banner` flag
2. Add rule: country = "US" → true
3. Load app as "Bob" (US) → sees banner
4. Load app as "Charlie" (UK) → no banner
5. Show scheduling feature
6. "Marketing did this without a dev ticket"

---

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **LaunchDarkly**: React SDK (@launchdarkly/react-client-sdk)
- **Styling**: TailwindCSS for modern UI

---

## File Structure

```
launchdarkly-demo/
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── UserSwitcher.jsx
    │   ├── CheckoutFlow.jsx      # Demo 1: Kill Switch
    │   ├── PaymentProcessor.jsx  # Demo 2: Progressive Rollout
    │   ├── HolidayBanner.jsx     # Demo 3: Self-Service
    │   └── PremiumFeatures.jsx   # Demo 3: Self-Service
    └── users/
        └── demoUsers.js
```
