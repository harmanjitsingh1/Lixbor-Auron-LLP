# Sanity CMS Migration & Operational Guide — Lixbor Auron LLP

This guide documents the Sanity CMS integration, content seeding, webhook setup for on-demand revalidation, and client invitation procedures.

---

## 1. Initial Content Seeding

To ensure the website is instantly populated and Sanity Studio reflects the live site content, you have two simple options:

### Option A: Automated One-Command Seeding (Recommended)

An automated script is provided at `scripts/seed-sanity.mjs` that uploads all existing text, product specifications, MgO grades, FAQs, and company details directly into your Sanity dataset:

1. Ensure your Sanity token in `.env.local` or `.env` has write permissions (an **Editor** or **Administrator** API token generated in [sanity.io/manage](https://www.sanity.io/manage)):
   ```env
   SANITY_API_WRITE_TOKEN=sk...
   ```
2. Run the seed script:
   ```bash
   node scripts/seed-sanity.mjs
   ```
3. Open `http://localhost:3000/studio` — all documents (`Site Settings`, `Homepage`, `Who We Are`, `Products`, `FAQ Items`, `Contact Page`) will be populated and ready to edit.

### Option B: Manual Entry via Embedded Studio

If you prefer entering content directly through the UI:
1. Start the Next.js development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000/studio` in your browser.
3. Log in with your Sanity credentials.
4. Fill in each section using the sidebar navigation:
   - **Site Settings & Company Info**: Registered office, LLPIN, PAN, TAN, official email, phone, navigation links.
   - **Homepage**: Hero carousel slides, Essence of Who We Are copy, 4 tall Value Proposition cards, Our People & Heritage text.
   - **Who We Are Page**: Hero banner, 1989 Foundations story, Core Values, Vision & Strategy pillars, Journey Milestones.
   - **Products & Commodities**: MgO, Urea, Granular Sulphur, Melamine, XLPE, etc. (with tags, applications, specifications, and MgO grades).
   - **FAQ Items**: Questions, answers, and category assignments.
   - **Contact Page**: Trade desk inquiry hero and dropdown categories.

> [!NOTE]
> The application includes a **zero-downtime fallback layer**. If any document is not yet published in Sanity, the site transparently falls back to the static files in `lib/content/`, preventing blank pages or runtime errors.

---

## 2. On-Demand Revalidation Webhook Setup

When content is published or edited in Sanity Studio, a webhook notifies the Next.js app to purge the cache tag for that document type (e.g. `homePage`, `products`, `whoWeArePage`), updating the live site within seconds without requiring a redeployment or server restart.

### Step-by-step Configuration:

1. In your `.env.local` (and your production hosting environment variables, e.g. Vercel / Netlify / VPS), add a shared secret:
   ```env
   SANITY_REVALIDATE_SECRET=your-random-secure-secret-string-here
   ```
2. Go to your Sanity Project Dashboard at [sanity.io/manage](https://www.sanity.io/manage).
3. Select your project: **Lixbor Auron LLP** (`3cyxeuj4`).
4. Click on the **API** tab in the top navigation.
5. In the left-hand menu, select **Webhooks**, then click **Create Webhook** (or **Add Webhook**).
6. Fill in the webhook parameters:
   - **Name**: `Live Site On-Demand Revalidation`
   - **Description**: `Notifies Next.js /api/revalidate on document changes`
   - **URL**: `https://your-production-domain.com/api/revalidate`  
     *(For local testing with ngrok/localtunnel: `https://your-tunnel-url.ngrok-free.app/api/revalidate`)*
   - **Dataset**: `production` (or your active dataset)
   - **Trigger on**: Check `Create`, `Update`, and `Delete`
   - **Filter** (optional, recommended):
     ```groq
     _type in ["siteSettings", "homePage", "whoWeArePage", "product", "faqItem", "contactPage"]
     ```
   - **HTTP method**: `POST`
   - **Secret**: Enter the exact secret string you configured in `SANITY_REVALIDATE_SECRET`.
   - **Headers**:
     - Header: `sanity-webhook-secret`
     - Value: your secret string (or leave empty if using Sanity's built-in webhook secret signing).
   - **Projection**:
     ```json
     {
       "_id": _id,
       "_type": _type
     }
     ```
7. Click **Save**. Now, whenever an editor clicks **Publish** in `/studio`, Next.js automatically purges the corresponding cache tags.

---

## 3. Inviting the Client as an Editor

Sanity's free tier allows up to **3 project members**. You can grant the client full editing rights to the Studio without giving them access to your source code or cloud hosting platform.

### Step-by-step Invitation:

1. Open [sanity.io/manage](https://www.sanity.io/manage).
2. Select your project: **Lixbor Auron LLP** (`3cyxeuj4`).
3. Click the **Members** tab in the top navigation.
4. Click the **Invite member** button (top right).
5. Enter the client's corporate email address (e.g. `client@lixborauron.com`).
6. Under **Roles**, select **Editor**:
   - **Editor** grants full permissions to create, edit, reorder, publish, and delete content in Sanity Studio.
   - It prevents them from accidentally modifying project billing, deleting datasets, or generating admin API tokens.
7. Click **Send invitation**.
8. The client will receive an email invitation from Sanity. They simply click the link, create a password or log in via Google/GitHub, and they can immediately access:
   ```
   https://your-domain.com/studio
   ```
   or `http://localhost:3000/studio` in development.

---

## 4. Architecture Summary

```
app/
├── api/revalidate/route.ts        # Webhook endpoint; revalidates tags on CMS publish
├── studio/[[...tool]]/
│   ├── layout.tsx                # Studio layout exporting metadata and viewport
│   └── page.tsx                  # Embedded NextStudio component at /studio
lib/
└── sanity/
    ├── config.ts                 # Project ID, dataset, API version
    ├── client.ts                 # Next-sanity client & sanityFetch with Next.js tags
    ├── image.ts                  # @sanity/image-url helper
    ├── queries.ts                # GROQ queries matching each document type
    └── data.ts                   # Strongly typed data fetching with zero-downtime fallbacks
sanity/
├── schemaTypes/
│   ├── siteSettings.ts           # Corporate IDs, registered office, navigation
│   ├── homePage.ts               # Carousel slides, Essence, 4 tall cards, Team
│   ├── whoWeArePage.ts           # Story, values, vision pillars, milestones
│   ├── product.ts                # Catalog items, MgO grades, specs, applications
│   ├── faqItem.ts                # Accordion Q&A pairs with categories
│   ├── contactPage.ts            # Trade desk hero & inquiry categories
│   └── index.ts                  # Schema registry
└── structure.ts                  # Clean Desk separation (singletons vs lists)
```
