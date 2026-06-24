# 🍔 Online Food Ordering Web Application (Task Prototype)

A fully functional, highly responsive, and feature-rich **Online Food Ordering Web Application** built within a **24-hour time constraint** as part of the technical evaluation process for **Electro Pi**.

---

## 🚀 Live Demo & Repository
* **Live Application URL:** [Insert Vercel / Live Link Here]
* **GitHub Repository:** [Insert GitHub Repo Link Here]

---

## 🛠️ Tech Stack & Architecture

This project leverages a modern, cutting-edge tech stack focused on high performance, type safety, modular architecture, and native multi-language support.

* **Framework:** Next.js (App Router)
* **Language:** TypeScript (Strict Type Safety)
* **Styling:** Tailwind CSS (Custom themes & Responsive UI)
* **Internationalization (i18n):** `next-intl` (Automated Right-to-Left (RTL) / Left-to-Right (LTR) layout adjustment)
* **HTTP Client:** Axios (Centralized API Client instance)
* **Notifications:** React Toastify (Real-time dynamic feedback)

---

## ✨ Features Implemented

### 1. 📂 Complete Dynamic Menu
* Full-scale product catalog display with high-quality imagery, pricing, and descriptions.
* Categorized browsing allowing users to seamlessly filter foods.

### 2. 🛒 Advanced Shopping Cart & Checkout System
* Fully dynamic client-side state matching synchronized with UI interactions.
* Real-time calculation of subtotal and total order pricing.

### 3. 💳 Flexible Payment Options (Modal Integration)
* Custom-built **Checkout Modal** supporting:
  * **Cash on Delivery (COD)** with instant local confirmation.
  * **Online Payment (Card/Wallet)** prepared for secure gateway redirects.

### 4. 📍 Order Status Tracking
* Instant navigation upon order completion to unique tracking endpoints.
* Built-in feedback loops simulating production order status pipelines.

### 5. 🌐 Full Multi-Language Support (Arabic & English)
* Native integration using `next-intl` parsing clean JSON localization structures.
* Intelligent layout transformations (**RTL for Arabic / LTR for English**) utilizing Tailwind logical properties (`text-start`, `text-end`, etc.) ensuring pristine visual alignment.

### 6. 👑 Admin Dashboard
* Completely functional Management Grid for Products and Categories.
* Seamless full CRUD capability (Add, Update, Delete) to handle back-office catalog operations efficiently.

---

## 📦 Project Directory Structure

```text
├── messages/               # i18n Translation files (en.json, ar.json)
├── src/
│   ├── app/                # Next.js App Router & localized internationalization sub-routes
│   ├── components/         # Reusable presentation & core business UI components
│   ├── context/            # Shared Global Application State Providers
│   ├── lib/                # Configured Axios central HTTP core instance
│   └── types/              # Global structural TypeScript interfaces (ICart, ICategory, etc.)