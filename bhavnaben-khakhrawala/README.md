# Bhavnaben Khakhrawala - website + admin
Upload ALL files of this folder to a GitHub repo (netlify.toml, netlify/, public/, db/, README.md). Never upload passwords or tokens.

## 1. Database (Cloudflare D1, free)
1. dash.cloudflare.com > Storage & Databases > D1 > Create database (name: bhavnaben).
2. Copy: Database ID (D1 page), Account ID (dashboard), and create an API Token: My Profile > API Tokens > Create Token > Custom > Account / D1 / Edit.
3. NO console SQL needed any more: tables + starter data are created automatically on the first website/admin request. (db/ folder is only a backup copy.)

## 2. Hosting (Netlify, free, no domain needed)
1. app.netlify.com > Add new site > Import from GitHub > choose repo. Leave build command empty > Deploy.
2. Site configuration > Environment variables, add: CF_ACCOUNT_ID, CF_DATABASE_ID, CF_API_TOKEN, SESSION_SECRET (long random text), ADMIN_EMAIL, ADMIN_PASSWORD
3. Deploys > Trigger deploy.

## 3. Use
- Website: yoursite.netlify.app
- Admin: yoursite.netlify.app/admin (login with ADMIN_EMAIL / ADMIN_PASSWORD; first login creates the admin). Add staff in the Staff tab.

## Changes in v6 (Part 1: Prices)
- Prices per product / group / pack size, with optional Vacuum price (admin > Prices tab).
- New product: Home Made Khakhra (prices empty, set them in admin > Prices; photos in admin > Products).
- Cart, checkout and order confirmation show prices and total. Server recalculates prices itself.
- Database upgrades itself automatically on first request (no SQL needed). Old carts of customers reset once.

## Changes in v6 (Part 2 + 6: WhatsApp + home page)
- Checkout: order is saved in database, then WhatsApp opens (Paras Shah 99988 02435) with a formatted order message. Change number: `WA` constant in public/index.html.
- Admin > Orders > WhatsApp button now opens a formatted message to the customer (order, items, total, status).
- Home page: Bhavnaben photo (public/images/bhavnaben.jpg), logo without white box (transparent) with TM.

## Changes in v7 (Bill + Coupons + WhatsApp +91)
- **Customer bill**: after an order is placed the customer gets a proper bill (logo, shop details, name, products, rate, qty, subtotal, coupon discount, total) at `/bill.html`. It can be printed / saved as PDF. The bill link is also inside the WhatsApp order message. Each bill link has a secret token, so nobody can guess other customers' bills.
- **Admin invoice**: Admin > Orders now has "Invoice" and "Print" buttons (same bill design with logo). Orders show subtotal, discount and total.
- **Coupon system** (Admin > Coupons): percentage or flat discount, minimum order amount, total uses limit, uses per customer (1 = once, any number, or 0 = unlimited), optional max-discount cap for % coupons, optional expiry date, Active / Inactive switch any time, edit and delete. Usage count is shown for each coupon. Customers enter the code on the Checkout page. The server always re-checks the coupon and recalculates the price itself.
- **WhatsApp +91**: admin WhatsApp buttons (and the bill page) automatically add country code 91. Works with 9876543210, 09876543210, +91 98765 43210 etc.
- **Extra**: monthly revenue (after discounts) in Admin > Stats; CSV export now has coupon, discount and total columns.
- Database upgrades itself automatically on first request (new columns are added; old orders and old data stay safe). No SQL needed. Old orders show their bill without discount.

## Changes in v8 (Month details + Customers + Banners)
- **Stats > tap any month**: full month page with revenue, orders, average order, packs sold, discount given, new vs returning customers, a day-by-day chart, a customer table (who ordered, how many times, how much amount, WhatsApp button), what sold, and every order with an Invoice button. Previous/next month arrows, month picker, and CSV download (orders and customers). Months now follow Indian time (IST).
- **Customers tab** (new): every customer with total orders, total spent, first/last order, repeat badge, search, sort (top spenders / most orders / latest), tap "Orders" to see their order history, WhatsApp button, CSV download.
- **Easier daily work**: dashboard cards on Orders (today's orders and sales, new orders to pack, this month), status filter, one-tap "next status" button (new > packed > shipped > delivered), new-order beep + browser-tab count (checks every minute while the admin page is open).
- **Festival / offer banners** (Admin > Banners): upload a photo (auto-resized), optional title, optional tap link, optional auto-hide date, show/hide, reorder, edit, delete. On the website home page the banners show at the top; more than one slides automatically (swipe, arrows and dots also work). Delete a banner and it disappears from the site and its photo is removed from the database; with no banner, no empty space is shown.
- Order numbers now have a small random ending, so two orders in the same instant can never clash.
- Database upgrades itself on first request (new banners table, old orders get their phone key filled in). No SQL needed.

## Changes in v9 (Brand, addresses, product editor)
- **New logo everywhere** (header, loader, footer, bill, admin, labels): transparent background, TM on top, name on the arc, "since 1998" below. Light version is used on dark areas. The BK emblem is the browser-tab icon. Files: `public/images/logo.png`, `logo-light.png`, `logo-oval.png`, `favicon.png`.
- **Home page photo**: logo removed from under Bhavnaben's photo; her name in Gujarati is shown there instead. Photo cropped on both sides.
- **Products**: Home Made Khakhra is first; "Round Khakhra" is now "Machine Made Round Khakhra" (old carts and old orders keep working).
- **Special pack name per product**: Admin > Products > product > "Special pack name". Khakhra = Vacuum pack, Dry Bhakhri = Container; you can set any word for any product. The name shows on the website, cart, WhatsApp message, bill and label. Orders remember the name used at that time.
- **Full product editor** (Admin > Products): change product photo, name, description, shelf life, pack name; rename sizes (prices follow); add/remove sizes; rename flavours, change group, change each flavour photo, reorder flavours and products; hide/show product on the website; stock on/off.
- **Two addresses** (Office and Shop) in footer, contact section, bill and shipping label. WhatsApp orders now go to +91 63559 34337.
- **Bill redesign**: bigger logo, both addresses, all phone numbers, FSSAI, bill/date/items/status boxes, pack names, savings, payment and delivery note.
- Footer text: "Khakhra, Bhakhri, Coin Khakhra and Gujarati Snacks".
- Database upgrades itself on first request. No SQL needed.

## Changes in v10 (Settings, delivery charges, cleanup, search, bulk delete)
- **Admin > Settings** (admin only): change without touching code: WhatsApp order number, phone numbers (with names), office and shop address, home page heading (put *word* in stars for red) and text, the 3 stats, Bhavnaben photo, her Gujarati name and photo badge, logo (light and dark background versions), footer text, FSSAI number, About Us text. Empty box = default text. Changes go live immediately.
- **Checkout charges**: Settings > Checkout charges. Add any number of charges (delivery, packing, COD...), each with amount and optional "free above" amount, and an Active switch. Optional minimum order amount. Charges show at checkout, in the order success page, WhatsApp message, customer bill, admin orders and CSV. The server calculates the final amount itself.
- **Admin > Cleanup**: shows database size and counts, then lets you delete orders / reviews / wholesale inquiries by status, source (online/manual) and age (1, 3, 6, 12 months or a date). Count first, download a backup CSV (orders), then type DELETE. Also deletes unused photos to free space (runs automatically when you delete reviews, products or banners).
- **Search everywhere**: Orders (name, phone, order no, address, city, status), Reviews (name, city, text, status) and Wholesale inquiries. Search runs on the server, so it finds old records too.
- **Delete one by one or many at once**: tick boxes and "Delete selected" in Orders, Reviews and Wholesale; single Delete buttons still work.
- Bill, label and admin header use the logo, addresses and numbers from Settings. The bill's payment/delivery note is unchanged.
- Database upgrades itself on first request. No SQL needed.
