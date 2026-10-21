# NexaCart

A frontend-only shopping demo built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Zustand, and Lucide React.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. If the machine's global `npm` launcher is broken but dependencies are already installed, run `node node_modules/next/dist/bin/next dev --port 3000` from this folder.

## Checks

```powershell
npm run lint
npm run build
```

## What works

- Browse the local catalogue by category, search term, brand, price, rating, and sample availability; sort by featured, newest, price, or rating.
- Save products to a wishlist and add products to a bag, including variant selection and quantity changes. Zustand persists both in browser storage and discards malformed saved entries.
- Preview an estimated total and a simulated checkout. The coupon field correctly reports that no codes are configured.
- Save optional demo profile details in this browser. The seller page reports only figures derived from the local product data.

## Demo boundaries

This project has no backend, authentication, order service, payment gateway, email, or delivery provider. Checkout never places an order or collects card details. Shipping and tax are illustrative estimates. Product descriptions, prices, ratings, review counts, and inventory come from sample data in `src/data/`; they are not live commerce information. Product and editorial images in `public/` are locally generated illustrative assets.

The product catalogue, filtering, pricing, and shopping state are separated in `src/data/`, `src/lib/`, and `src/store/` so live APIs can replace the sample sources later. No 3D scene is included because this catalogue has no real 3D product assets.
