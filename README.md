# EverGift
Website: https://evergift.com.au

EverGift is a modern digital wedding gifting platform that allows couples to create a personalised wedding page where guests can send monetary gifts securely online — no cash, no envelopes, no stress.

Built with Next.js, Supabase, and Stripe, EverGift is mobile‑first and designed to simplify gifting for guests while giving couples a clean, transparent way to receive and manage their gifts.

## What EverGift Does
### For Guests
* Visit a wedding page via link or QR code
* Choose a gift amount (preset or custom)
* Optionally add their name and a personal message
* Optionally upload a photo with their gift
* Pay securely via Stripe (Apple Pay, Google Pay, Visa, Mastercard, AMEX)
* Receive a confirmation after successful payment

No account required.

### For Couples

* Create and manage a personalised wedding page
* Add partner names, wedding date, welcome message, and photos
* Share their page via link or QR code
* Receive gifts securely via Stripe Connect
* View all gifts, messages, and photos in one dashboard
* Manage payout details and view estimated payout dates via Stripe

Funds are transferred to the couple’s nominated bank account by Stripe.

## Monetisation Model

* **Platform fee**: 5% per gift
* Guests can optionally cover platform + Stripe processing fees
* Stripe processing fee: ~1.7% + $0.30 AUD (domestic cards)
* Net revenue to EverGift ≈ 5% per gift

All payments and payouts are handled entirely by Stripe.

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
* Mobile‑first design with full desktop support
* Secure, hosted Stripe Checkout (no PCI burden)
* Stripe Connect onboarding for couples
* Public guest‑facing wedding pages
* Private couple dashboard
* Image upload for wedding pages and gifts
* Fee‑coverage toggle for guests
* Row‑Level Security (RLS) enforced via Supabase

## Security & Payments
* No guest accounts required
* EverGift never stores card or bank details
* All sensitive payment and identity data handled by Stripe
* Supabase Row‑Level Security protects user data

## Project Status
* MVP feature‑complete
* Full guest gifting flow implemented
* Stripe Connect onboarding live
* Public wedding pages + dashboard live
* Terms & Privacy policies in place

## Roadmap (High Level)
* Email notifications (gift received, setup reminders)
* Enhanced analytics for couples
* Improved admin tooling
* Marketing site expansion
* Broader gifting use‑cases (future consideration)