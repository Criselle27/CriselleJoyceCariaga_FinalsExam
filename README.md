# 🛍️ ChicStyle - Clothing Apparel Catalog

A responsive, client-side web application built as a finals laboratory examination project ("Application Development and Emerging Technologies"). ChicStyle provides modern shoppers with a seamless digital storefront to browse trendy apparel, explore seasonal lookbooks, manage a persistent shopping bag, and submit validated order reservations.

---

## 🚀 Key Features
* **Dynamic Catalog & Homepage (index.html):** Features a sticky navigation bar, custom hero banner, responsive product grid cards, and an interactive layout styled with Bootstrap 5.
* *Real-Time Search & Category Filters:* Instantly filters apparel items by categories (Tops, Bottoms, Outerwear) and updates results dynamically as the user types keywords.
* **Curated Lookbook (pages/lookbook.html):** Showcases seasonal outfit inspirations and styling tips with quick-add options to purchase complete sets.
* **Persistent Shopping Cart (pages/cart.html):** Powered by browser localStorage, allowing users to adjust item quantities, calculate subtotals/grand totals in real time, and clear items.
* *Validated Checkout Form:* Client-side validation ensuring customers fill out required name, email address, delivery address, and payment method fields with clear alert feedback.
* **Accessibility & Styling (assets/css/style.css):** Custom typography, smooth card hover transitions, and accessible keyboard focus outlines (:focus-visible).

---

## 📁 Project Directory Structure
```text
CriselleJoyceCariaga_FinalsLabExam_CC211/
│
├── index.html            # Main storefront catalog homepage
├── README.md             # Project documentation and guide
├── PROMPT_LOG.md         # Documented prompt engineering log
│
├── assets/               # Static assets folder
│   ├── css/
│   │   └── style.css     # Custom styles and responsive rules
│   └── js/
│       └── script.js     # Vanilla JS logic (search, cart, validation)
│
├── pages/                # Secondary subpages
│   ├── cart.html         # Shopping bag and checkout reservation form
│   └── lookbook.html     # Seasonal style lookbook and outfit inspirations
│
└── docs/                 # Documentation and evidence
    └── screenshots/      # UI preview screenshots