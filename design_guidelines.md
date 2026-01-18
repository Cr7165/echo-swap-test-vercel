# Pricing Component Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Stripe's clarity, Linear's typography, and Notion's card aesthetics. Modern SaaS pricing with emphasis on visual hierarchy and conversion optimization.

## Typography System
**Font Stack**: 
- Primary: Inter or Similar (Google Fonts CDN)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Hierarchy**:
- Plan Names: text-xl font-semibold
- Pricing: text-5xl font-bold with text-sm for billing period
- Feature Text: text-sm font-medium
- Descriptions: text-base font-normal
- CTAs: text-base font-semibold

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24

**Grid Structure**:
- Container: max-w-7xl mx-auto px-6 py-24
- Pricing Cards: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Card Padding: p-8
- Feature List: space-y-4

## Component Structure

### Section Container
Full-width background section with centered content container

### Pricing Cards (3 tiers)
**Card Anatomy**:
1. **Badge**: "Most Popular" tag for middle tier (absolute positioned, top-right)
2. **Header Section** (mb-8):
   - Plan name
   - Short description (1-2 lines)
3. **Pricing Display** (mb-8):
   - Large price number with currency symbol
   - Billing period (/month or /year) in smaller text below
   - Annual savings callout for middle/premium tiers
4. **CTA Button** (mb-8):
   - Full width (w-full)
   - Varies by tier: "Start Free Trial", "Get Started", "Contact Sales"
   - Height: h-12
5. **Feature List**:
   - Icon library: Heroicons (checkmark circles)
   - Icons: w-5 h-5, positioned inline with text
   - Spacing: flex items-start gap-3
   - 6-8 features per tier

### Tier Differentiation
**Basic Tier** (Left):
- Standard elevation
- Compact feature list
- "Start Free Trial" CTA

**Pro Tier** (Center - Featured):
- Elevated above others (transform scale-105 on desktop)
- Enhanced border treatment
- "Most Popular" badge
- Expanded feature list
- "Get Started" CTA

**Enterprise Tier** (Right):
- Standard elevation
- Custom pricing callout
- "Contact Sales" CTA
- Includes "Everything in Pro, plus..." section

### Visual Elements
**Card Styling**:
- Rounded corners: rounded-2xl
- Border: border with subtle treatment
- Shadow hierarchy: Pro tier gets shadow-xl, others shadow-md
- Background: Solid (not transparent)

**Icons**:
- Heroicons via CDN
- Checkmark-circle for included features
- X-circle for limitations (Basic tier only)

**Badges**:
- Rounded-full px-4 py-1
- Positioned: absolute -top-4 right-8
- Text: text-xs font-semibold uppercase tracking-wide

## Responsive Behavior
- Mobile: Single column stack, all cards equal treatment
- Tablet: 2-column grid (Basic + Pro, then Enterprise below)
- Desktop: 3-column with Pro tier slightly elevated

## Content Specifications
**Feature Categories**:
- Core Features (all tiers)
- Usage Limits (differentiated)
- Support Level (escalating)
- Integration Access (tiered)
- Advanced Features (Pro/Enterprise only)

**Microcopy**:
- Billing toggle above cards: "Monthly" / "Annual (Save 20%)"
- Subtext for Enterprise: "Custom solutions for teams"
- Feature emphasis: Bold key numbers/terms

## Images
**No images required** for this component. Visual impact comes from typography, spacing, and card elevation.
