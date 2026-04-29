# LaunchDarkly Flag Setup Guide
## Step-by-Step Instructions for Demo

---

## Step 1: Create a LaunchDarkly Account

1. Go to https://launchdarkly.com
2. Click "Start Free Trial" (no credit card required)
3. Create your account

---

## Step 2: Create a Project

1. Go to **Settings** → **Projects**
2. Click **Create project**
3. Name: `ABC-Company-Demo`
4. Click **Save**

---

## Step 3: Get Your Client-Side ID

1. Go to **Settings** → **Projects** → **ABC-Company-Demo**
2. Click on the **Test** environment (or Production)
3. Copy the **Client-side ID**
4. Create `.env` file in the demo project:

```bash
VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id-here
```

---

## Step 4: Create the Feature Flags

### Flag 1: new-checkout-flow (Kill Switch Demo)

1. Go to **Feature flags** → **Create flag**
2. Configure:

| Field | Value |
|-------|-------|
| Name | `new-checkout-flow` |
| Key | `new-checkout-flow` |
| Description | New checkout experience - DEMO: Kill Switch |
| Flag type | Boolean |

3. Click **Create flag**
4. **Turn the flag ON** (this simulates the "broken" state)
5. Set default rule to serve `true`

**Demo Action**: Toggle OFF to "fix" the broken checkout instantly

---

### Flag 2: new-payment-processor (Progressive Rollout Demo)

1. Go to **Feature flags** → **Create flag**
2. Configure:

| Field | Value |
|-------|-------|
| Name | `new-payment-processor` |
| Key | `new-payment-processor` |
| Description | New payment processing system - DEMO: Progressive Rollout |
| Flag type | Boolean |

3. Click **Create flag**
4. **Keep the flag OFF initially**
5. Set default rule to serve `false`

**Demo Action**: Add targeting rules and percentage rollout during demo

---

### Flag 3: holiday-banner (Business Self-Service Demo)

1. Go to **Feature flags** → **Create flag**
2. Configure:

| Field | Value |
|-------|-------|
| Name | `holiday-banner` |
| Key | `holiday-banner` |
| Description | Holiday promotional banner - DEMO: Business Self-Service |
| Flag type | Boolean |

3. Click **Create flag**
4. **Keep the flag OFF initially**

**Demo Action**: Add country targeting rule during demo

---

### Flag 4: premium-features (Business Self-Service Demo)

1. Go to **Feature flags** → **Create flag**
2. Configure:

| Field | Value |
|-------|-------|
| Name | `premium-features` |
| Key | `premium-features` |
| Description | Enterprise premium features - DEMO: Business Self-Service |
| Flag type | Boolean |

3. Click **Create flag**
4. **Keep the flag OFF initially**

**Demo Action**: Add plan-based targeting rule during demo

---

## Step 5: Create the Segment (for Progressive Rollout)

1. Go to **Segments** → **Create segment**
2. Configure:

| Field | Value |
|-------|-------|
| Name | `internal-employees` |
| Key | `internal-employees` |
| Description | ABC Company internal team members |

3. Click **Create segment**
4. Add rule:
   - Click **Add rule**
   - Attribute: `email`
   - Operator: `ends with`
   - Value: `@abccompany.com`
5. **Save segment**

---

## Step 6: Pre-Demo Flag States

Before your presentation, set flags to these states:

| Flag | State | Default Rule |
|------|-------|--------------|
| `new-checkout-flow` | **ON** | Serve `true` |
| `new-payment-processor` | **ON** | Serve `false` (0% rollout) |
| `holiday-banner` | **ON** | Serve `false` |
| `premium-features` | **ON** | Serve `false` |

---

## Demo Walkthrough

### Demo 1: Kill Switch (6 min)

**Setup**: `new-checkout-flow` is ON, serving `true` to everyone

1. Show the app - checkout is "broken" (shows error)
2. Go to LaunchDarkly → `new-checkout-flow`
3. **Toggle the default rule from `true` to `false`**
4. Click **Save**
5. Refresh app - checkout now works!

**Script**: "In under 200 milliseconds, we fixed the broken checkout. No deployment, no rollback."

---

### Demo 2: Progressive Rollout (8 min)

**Setup**: `new-payment-processor` is ON, serving `false` to everyone

1. Show the app - everyone sees "Legacy Payment System"
2. Go to LaunchDarkly → `new-payment-processor`
3. **Add Rule 1**: 
   - Click "Add rule"
   - Select "Segment" → `internal-employees`
   - Serve → `true`
   - Save
4. Switch to Alice (internal) - sees new processor
5. Switch to Bob (external) - sees legacy processor
6. **Add percentage rollout**:
   - Edit default rule
   - Change to percentage rollout
   - Set `true` = 5%, `false` = 95%
   - Save

**Script**: "Internal employees test first. Then 5% of customers become our canary."

---

### Demo 3: Business Self-Service (6 min)

**Setup**: `holiday-banner` and `premium-features` are ON, serving `false`

#### Part A: Holiday Banner (Country Targeting)

1. Go to LaunchDarkly → `holiday-banner`
2. **Add Rule**:
   - Click "Add rule"
   - Attribute: `country`
   - Operator: `is one of`
   - Value: `US`
   - Serve → `true`
   - Save
3. Switch to Bob (US) - sees banner
4. Switch to Charlie (UK) - no banner

**Script**: "Marketing targeted US customers without a dev ticket."

#### Part B: Premium Features (Plan Targeting)

1. Go to LaunchDarkly → `premium-features`
2. **Add Rule**:
   - Click "Add rule"
   - Attribute: `plan`
   - Operator: `is one of`
   - Value: `enterprise`
   - Serve → `true`
   - Save
3. Switch to Diana (enterprise) - sees premium features
4. Switch to Bob (free) - features locked

**Script**: "Enterprise customers automatically get premium features."

---

## Quick Reference: User Attributes

The demo app sends these attributes to LaunchDarkly:

```javascript
{
  kind: 'user',
  key: 'user-key',
  name: 'User Name',
  email: 'user@email.com',
  country: 'US',        // US or UK
  plan: 'free',         // free, pro, or enterprise
  userType: 'external'  // internal or external
}
```

### Demo Users

| User | Email | Country | Plan | Type |
|------|-------|---------|------|------|
| Alice | alice@abccompany.com | US | enterprise | internal |
| Bob | bob@gmail.com | US | free | external |
| Charlie | charlie@customer.co.uk | UK | pro | external |
| Diana | diana@bigcorp.com | US | enterprise | external |

---

## Troubleshooting

### Flags not updating?
- Check that the Client-side ID is correct
- Make sure the flag is **ON** (targeting enabled)
- Try refreshing the page
- Check browser console for errors

### User not matching rules?
- Verify the attribute name matches exactly (case-sensitive)
- Check the user context in the app
- Use LaunchDarkly's "Debug" mode to see evaluations

### Demo app not loading?
- Run `npm install` first
- Make sure `.env` file exists with valid Client-side ID
- Check that port 3000 is available

---

## Reset for Next Demo

After your presentation, reset flags:

1. `new-checkout-flow` → Remove rules, set default to `true`
2. `new-payment-processor` → Remove rules, set default to `false`
3. `holiday-banner` → Remove rules, set default to `false`
4. `premium-features` → Remove rules, set default to `false`

---

Good luck with your demo! 🚀
