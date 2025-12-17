# EverGift
EverGift is a streamlined wedding gifting platform that allows couples to create a personalised wedding page where guests can send monetary gifts securely online — no cash, no envelopes.

Built with Next.js, Supabase, and Stripe, EverGift focuses on a simple, mobile-first guest experience and a clean setup flow for couples.

## What EverGift Does
### For Guests
- Visit a wedding page via link or QR code
- Choose a gift amount (preset or custom)
- Leave their name and an optional message
- Pay securely via Stripe (Apple Pay, Google Pay, cards)
- Receive confirmation after successful payment

No account required.

### For Couples

* Create and manage a personalised wedding page
* Upload photos and choose a collage layout
* Receive gifts directly into their bank account via Stripe
* View gift totals and recent messages
* Share their wedding page via link or QR code

## Monetisation Model

* **Platform fee**: 4% per gift **(TBD)**
* Guests can optionally cover platform + Stripe fees
* Stripe processing fee: ~1.7% + $0.30
* Net revenue to EverGift ≈ 2.3% per gift
* Payments and payouts handled entirely by Stripe

## Tech Stack

### Frontend
* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend
* Supabase Auth
* Supabase Postgres
* Supabase Storage

### Payments
* Stripe Checkout
* Stripe Connect (Standard)

### Hosting
* Vercel

## Core Features
* Mobile-first design with desktop support
* Secure, hosted Stripe Checkout (no PCI burden)
* Stripe Connect onboarding for couples
* Public guest pages, private admin dashboard
* Image upload and collage system
* Fee-coverage toggle for guests

## Project Status
* Current stage: Early development (post-design)
* Full UX and UI completed in Figma
* Tech stack and data models locked
* Development setup in progress
* This repository represents the initial build and MVP implementation.

## Security & Payments
* No guest accounts required
* All payments handled by Stripe
* No card data touches EverGift servers
* Row-Level Security enforced via Supabase

## Roadmap (High Level)
* Complete guest gifting flow
* Couple onboarding and dashboard
* Email confirmations (v2)
* Admin tooling (v2)
* Analytics and logging (later)