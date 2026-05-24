# Admin Dashboard & Dynamic Content Migration Plan

## Objective
Implement a secure, owner-only admin dashboard to manage all dynamic content (products, services, banners, ads) on the website. Migrate the existing static data architecture to a PostgreSQL database, preparing the site for VPS deployment.

## Architecture & Tech Stack
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js (Auth.js) with Credentials Provider
- **Image Storage:** Local file system upload (stored in `public/uploads`) suitable for VPS hosting.
- **Styling:** Tailwind CSS (existing)
- **Icons:** Lucide-React (existing)

## Schema Design (Prisma)
1.  **User**: `id`, `email`, `password` (hashed) - For the admin owner.
2.  **Product**: `id`, `name`, `category`, `price`, `description`, `image_url`, `created_at`, `updated_at`.
3.  **Service**: `id`, `title`, `description`, `icon`, `image_url`, `created_at`, `updated_at`.
4.  **Banner**: `id`, `page_section` (e.g., 'home_hero', 'about_top'), `image_url`, `link`, `is_active`.
5.  **Ad**: `id`, `title`, `image_url`, `link`, `is_active`, `placement` (e.g., 'sidebar', 'footer').

## Implementation Steps

### Phase 1: Database & Prisma Setup
1.  Install Prisma and Prisma Client.
2.  Initialize Prisma and configure it to connect to PostgreSQL.
3.  Define the schema in `prisma/schema.prisma`.
4.  Generate and apply database migrations.
5.  Create a seed script to create the initial Admin user and migrate existing data from `src/lib/data.ts`.

### Phase 2: Authentication (NextAuth.js)
1.  Install `next-auth` and `bcrypt`.
2.  Set up the NextAuth API route and authentication configuration.
3.  Create a styled Login page at `src/app/admin/login/page.tsx`.
4.  Implement a Next.js Middleware to strictly protect all routes under `/admin` so only authenticated users can access them.

### Phase 3: Admin Dashboard UI & Image Uploads
1.  Create an Admin Layout (`src/app/admin/layout.tsx`) with a sidebar for easy navigation.
2.  Implement a secure Server Action or API route to handle image uploads, saving them directly to the server's `public/uploads` folder.
3.  Build the CRUD (Create, Read, Update, Delete) pages and forms for:
    -   **Products:** `/admin/products`
    -   **Services:** `/admin/services`
    -   **Banners:** `/admin/banners`
    -   **Ads:** `/admin/ads`

### Phase 4: Frontend Integration
1.  Refactor the public-facing pages (Home, Products, Services) to fetch data dynamically from the PostgreSQL database using Prisma.
2.  Integrate the dynamic Banners and Ads into the layouts (Header, Footer, Page sections).
3.  Remove usage of the old static `src/lib/data.ts`.

## Verification & Testing
-   **Security Check:** Verify that unauthenticated users cannot access any `/admin` route or API endpoint.
-   **Functionality Check:** Ensure the admin can successfully add, edit, and delete products with image uploads.
-   **Integration Check:** Verify that changes made in the admin panel instantly reflect on the public website.
