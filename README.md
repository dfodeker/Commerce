
# Commerce 
A Next.js 13 E-commerce starter with a Headless CMS, Algolia, and Contentful and Planned ERP Integration.

## Providers
This project is built with the following providers:
Shopify - Headless E-commerce
Contentful - Headless CMS
with an intended ERP integration for inventory management.
Netsuite - ERP

## Getting Started

Firstly Create a `.env.local` file similar to `.env.example` and add your ,Shopify, Contentful Credentials.

Then run the development server:

```bash

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Caching has been disabled for development purposes. To enable caching, set `CACHE_BEHAVIOUR='force-cache'` in your `.env.local` file.
To disable caching, set `CACHE_BEHAVIOUR='no-cache'` in your `.env.local` file.
This project is intended to be deployed on the edge, so caching is enabled by default.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Screenshots
![Alt text](public/appScreenshot2.png)
![Alt text](public/appScreenshot3.png)
![Alt text](public/appScreenshot5.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
