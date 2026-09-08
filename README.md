# AXDORO — 5-Page Heavyweight Streetwear E-Commerce Platform

A premium, mobile-first clothing e-commerce web application engineered according to the AXDORO specification by **PeoplePoint Consultants**. Featuring the complete 5-page primary navigation, 210-product streetwear catalogue architecture with size/color variants, advanced search and multi-attribute filters, full cart and Razorpay checkout simulation, Shiprocket tracking status, customer account/order management, and an AI Fashion & Support Chatbot.

---

## 🌟 Brand & Design Identity (70-20-10 Rule)
- **Primary Dark (20%)**: `#111111` (Matte Black) — Header, footer, and premium high-contrast accents.
- **Primary Light (70%)**: `#F7F5F0` (Warm Off-White) — Site background and card canvas.
- **Accent 1 (10%)**: `#C9A96E` (Muted Gold) — Badges, highlights, borders, and buttons.
- **Accent 2**: `#D8C7B5` (Warm Beige) — Secondary cards and hover surfaces.
- **Typography**: `Montserrat` (Headings) + `Inter` (Body & UI).

---

## 📱 Information Architecture: Five Primary Pages

### 1. Home (`/`)
- Announcement bar (Free shipping across India on orders above ₹1,499 & `AXDORO10` coupon code).
- High-impact editorial hero drop with *"SUBSTANCE OVER HYPE / ARCHITECTURAL DRAPE"*.
- **Shop by Fit**: Interactive silhouette selector (Oversized 240 GSM, Boxy Drop, Heavy Hoodies, Tactical Bottoms).
- **Featured Collections**: 6 visual cards linking to filtered product collections.
- **New Arrivals**: 8 fresh drops with instant Quick Add and color preview.
- **Why AXDORO**: 240 GSM combed cotton vs standard 180 GSM comparison, pre-shrunk bio-wash, and Lycra collar reinforcement.
- **Best Sellers**: 8 community favorites.
- **Palette Strip**: Interactive color swatches.
- **Custom & Bulk Orders B2B Spotlight**: Direct quote inquiry and WhatsApp action.
- **Customer Reviews**: Verified buyer testimonials.
- **Instagram Gallery**: `#AXDOROstreet` community showcase.

### 2. Shop / Collections (`/shop`)
- Full catalogue of **210 distinct streetwear drops**.
- **Live Desktop Sidebar Filters & Mobile Filter Drawer**:
  - Categories (`Oversized T-Shirts`, `Graphic Streetwear`, `Acid Wash & Vintage`, `Minimal Basics`, `Heavyweight Hoodies`, `Cargos & Utility Pants`).
  - Fit silhouettes (`Oversized`, `Boxy`, `Relaxed`).
  - Fabric weight (`240 GSM`, `380 GSM`, `280 GSM`).
  - Sizes (`XS`, `S`, `M`, `L`, `XL`, `XXL`).
  - Visual color swatches (`Urban Black`, `Sage Green`, `Dune Sand`, `Washed Charcoal`, etc.).
  - Price range slider (₹800 to ₹3,000).
  - In-stock only filter.
- **Sorting Dropdown**: Featured, Newest First, Best Selling, Price: Low to High, Price: High to Low, Rating.
- **Active Filter Chips** with single-click removal and "Clear All".
- **Load More Pagination**: High-performance progressive rendering.

### 3. About AXDORO (`/about`)
- Brand origin story and urban streetwear manifesto.
- **The 240 GSM Standard**: Why weight dictates drape and structure.
- **Pattern Making Anatomy**: Dropped shoulders, boxy torso proportions, and elongated half-sleeves.
- Sustainable and ethical manufacturing in Tamil Nadu.
- Future expansion roadmap towards complete wardrobe and AI try-on.

### 4. Custom & Bulk Orders B2B (`/bulk`)
- B2B & Institutional focus (Startups, Colleges, Resellers, Gyms).
- Minimum Order Quantity (MOQ 30 pcs) tiered pricing breakdown.
- Comprehensive Quote Request Form with file upload simulation (vector logos/artwork).
- Direct pre-filled WhatsApp quote trigger.
- Automatic lead logging to the Admin panel.

### 5. Contact & Support (`/contact`)
- 4 direct contact channels (WhatsApp, Email, Chennai Studio Address, AI Assistant).
- Customer support ticket form with category routing.
- Operating hours and response SLA table.
- Expandable, categorized FAQ accordions covering Orders, Fabric/GSM, Shipping, Returns, and Custom Orders.

---

## 🛍️ Functional E-Commerce Screens & Features
- **Product Detail**: Multi-image gallery with zoom, color swatches, size selection with size chart trigger, quantity adjuster, Add to Bag, Wishlist toggle, technical specs accordion, and "Complete the Look" recommendations.
- **Slide-over Cart Drawer**: Free shipping meter (unlocks at ₹1,499), item management, and coupon code support (`AXDORO10` for 10% off).
- **Checkout Flow**: Indian address validation, delivery options, and Razorpay modal integration.
- **Razorpay Prepaid Gateway**: Prepaid payment gateway simulation featuring UPI (Instant QR, GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and webhook validation.
- **Order Success & Shiprocket Tracking**: Confetti celebration, generated Order ID (`AXD-XXXXX`), payment ID, invoice summary, and live Shiprocket tracking timeline.
- **Customer Account**: Orders list, tracking modal, saved addresses, and wishlist manager.
- **AI Stylist & Sizing Assistant**: Floating AI chatbot with 240 GSM domain knowledge, height/weight size recommendations, catalogue search, and WhatsApp human handoff.
- **Admin Operations & CSV Export**: Merchant operations dashboard and 1-click **Export 200+ Products to WooCommerce CSV**.

---

## 📦 200+ Product Master CSV Included
- File: `axdoro_woocommerce_200_products.csv`
- Contains all 210 products with standard WooCommerce headers, variations (Size XS–XXL, Color, GSM), SKUs, prices, categories, and high-res imagery URLs. Ready for instant WooCommerce import.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

Prepared by **PeoplePoint Consultants** for **AXDORO**.
