# Bhavnaben Khakhrawala – website + admin (Cloudflare Pages)

Website pages now have real addresses (good for Google):
`/` · `/products` · `/products/<product-name>` · `/about` · `/wholesale` · `/reviews` · `/privacy` · `/checkout` · admin: `/admin/`
Every page carries its own title, description, canonical link, social tags and structured data, and also lists its real content
(product, flavours, prices) in the HTML. `/sitemap.xml` and `/robots.txt` are created automatically (new products appear by themselves).

## Folders
- `public/`   website files: `app-shell.html` (the site), `admin/`, `bill.html`, `images/`
- `functions/` the server part (pages + `/api/...`)  ·  `lib/` code used by it  ·  `db/` backup copy of the database SQL
- No build command is needed. Nothing else to install.

## Deploy on Cloudflare Pages (free, no "Powered by" badge)
1. Put the files of this zip at the **top level of the GitHub repo** (`functions`, `lib`, `public`, `db`, `package.json`, `README.md`). Remove the old `netlify` folder and `netlify.toml`.
   (If your repo keeps them inside a folder, set that folder in Cloudflare as *Root directory*.)
2. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
   Framework preset: **None** · Build command: **empty** · Build output directory: **public** → Save and Deploy.
3. Project → **Settings → Bindings → Add → D1 database**: Variable name **DB**, database = your existing database (the same one the Netlify site used, so all products, orders and users stay). Add it for *Production* (and *Preview*).
4. Project → **Settings → Variables and Secrets**: add (Production)
   - `SESSION_SECRET`  – use the **same value** as on Netlify (keeps old bill links and logins valid)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` – same as on Netlify
   - `SITE_URL` – your real address, e.g. `https://yourdomain.com` (no slash at the end). Used for canonical links, sitemap and the www → main redirect.
   (You do NOT need `CF_ACCOUNT_ID`, `CF_DATABASE_ID`, `CF_API_TOKEN` any more. If no D1 binding is found the site still falls back to them.)
5. **Deployments → Retry deployment** (settings apply to the next deployment).
6. Open `https://<project>.pages.dev/api/health` → must show `{"ok":1,...}`. Then test website, order, `/admin/`.

## Move the domain from Netlify
Do this only after step 6 works.
1. Cloudflare Pages project → **Custom domains → Set up a domain** → enter `yourdomain.com` (and again `www.yourdomain.com`).
2. A main domain (`yourdomain.com`) must be a Cloudflare *zone*: Cloudflare dashboard → **Add a domain** (Free plan) → at your domain registrar change the nameservers to the two Cloudflare gives you. (Only a subdomain like `www.` can use a plain CNAME to `<project>.pages.dev` without moving nameservers.)
3. In Cloudflare DNS delete the old records that point to Netlify (A record `75.2.60.5` or CNAME `...netlify.app`), keep the ones Pages creates. Keep email (MX/TXT) records.
4. Netlify → Site → **Domain management** → remove the custom domain (then pause or delete the Netlify site).
5. Wait for the domain to become *Active* (a few minutes to a few hours).
6. Google Search Console → add the site → submit `https://yourdomain.com/sitemap.xml`.

## Admin notes
- Admin login still works with `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Passwords are now stored with a lighter method (needed for the free Cloudflare plan). The first login of every old account upgrades it; **staff** accounts created on Netlify must be given a new password once: Admin → Staff → *Reset password*.
- Free plan limits: 100,000 page/API requests per day, each request may use up to 10 ms of server time and 50 database queries (the code is built for this).
- The `pages.dev` address is hidden from search engines automatically once `SITE_URL` is set.

## v2.1 changes
- Security: rate limit on admin login (10 tries / 15 min), orders, coupons, reviews and wholesale forms (per IP, stored in D1 table `rate_limit`, created automatically).
- Order and wholesale status values are validated; session cookie parsing made stricter; API responses send `nosniff`.
- Fixed: Machine Made Round Khakhra description said "Hand-rolled" (database fixed automatically once, via migration `v11_desc`).
- Design: gradient headline accents, shining order button, scrolling trust ticker, swipeable "Find your flavour" wall (uses flavour photos), occasion tiles (tea-time, travel, gifting), richer dark feature band.
- Loader text changed from "Baking" to "Crafting" (khakhra is roasted, not baked).

## v2.2 changes
- New pages: `/terms`, `/shipping`, `/refund` and a fuller `/privacy` (one source: `public/legal.js`; in sitemap; linked in footer). Written for manual payment and shop-arranged delivery (no fixed courier, no fixed delivery time). Have a CA/lawyer read them once.
- Admin > Settings: new cards for legal/grievance details, delivery time, website colours, share image, About photo and home photo focus.
- SEO: shorter titles (under ~60 characters), clean descriptions, new 1200x630 share image (`/images/share.jpg`), `og:image` size and `theme-color` tags.
- About page now titled "Our story, since 1998"; footer shows seller name, FSSAI, GSTIN (if set) and grievance contact.

## v2.4 changes (admin panel)
- New **Home** screen: today's orders and sales, new orders waiting, reviews to approve, new bulk enquiries, and big shortcut buttons.
- Clear tab names with icons (Orders, Sales report, Bulk enquiries, Website settings...). On phones the tabs sit at the bottom like an app.
- A short "how to use" hint on every screen, status colours on order cards, bigger buttons and inputs, cleaner cards, greeting with the logged-in name.

## v2.5 changes
- All visible text is English (greeting is now "Hello"; the Gujarati line under the home photo is hidden unless you type one in Admin > Website settings).
- Tested locally with an in-memory SQLite stand-in for D1: health check, orders, rate limit (429), admin login, status checks, settings and every page render.

## v2.6 changes
- **Policy pages stuck on "Loading..." fixed** (`/privacy`, `/terms`, `/shipping`, `/refund`). The browser used to download the whole page from the server just to read the policy text, and if that server render failed it waited forever. Now the policy text is one small static file (`public/legal.js`) that the server and the browser both use, so the pages open even if the database or server render has a problem. If something still goes wrong, a "Try again" message with the phone number is shown instead of "Loading...".
- Top announcement bar: removed "FSSAI licensed" (it did not fit on phones) and made the bar text a little smaller on mobile. FSSAI number is still in the footer, policy pages and bills.
- **Home Made Khakhra is now Handmade Khakhra** (product name, description, flavour group and price group). Existing prices and flavours are kept; the database is updated automatically once on the first visit (migration `v12_handmade`). The page address stays `/products/home-made-khakhra` so old links keep working. Old carts and old order names are still understood.
- Machine Made Round Khakhra description in the built-in fallback data now matches the database ("Machine-made...").
- Migration check on the first request is lighter (about 15 database queries, only once).


## v2.7 changes
- Delivery charge by state + weight: Admin > Website settings > "Delivery charge by state and weight". Zones come from the pincode (Gujarat, Maharashtra, Rest of India). Weight slabs, extra rupees per additional kg and "free above amount" per zone. The server recalculates the charge for every order, the checkout shows it live, and it appears on the bill and in the WhatsApp message.
- Pack weight is read from the size label ("200g", "1 kg"). If a label has no weight, 250 g is assumed.
- New admin tab "Analytics": KPIs with change vs previous period, revenue/orders/AOV by month, daily trends, month-vs-month comparison (up to 4 months), top products and flavours, pack sizes, status, online vs manual, delivery zones, cities, coupons, day x hour heat map, new vs repeat customers, top customers. Uses the last 400 days of orders.
- Top bar (announcement) is hidden unless you type a message in Website settings. The default "Delivery across India" text is removed.
- Order status and wholesale status values are validated; rate limits stay on (v2.1).

## v2.8 changes
- Order tracking page `/track` (link in menu, footer and on the "Order placed" page). Customer enters order number + the phone used for the order. Animated progress: Order placed → Payment received → Preparing → Shipping → Delivered, with times; cancelled orders show a cancelled message. Shows items, total, a note from the shop and Call / WhatsApp buttons. Address and phone are never shown.
- Admin > Orders: new stage "Payment received" (key `confirmed`), stage names shown in plain words, and a "Note for customer" box on every order (courier, tracking number, expected date).
- Admin > Website settings > "Order tracking page": phone number and WhatsApp number for the buttons, and the title + message for every stage.
- Automatic database update on first use: table `order_events` and column `orders.track_note`.
- Tracking lookups are rate limited. Admin can be installed on a phone as an app (Add to Home screen): manifest and icons in `public/admin/`.

## v2.9 changes (photo upload fix + full check)
- Fixed: choosing a photo sometimes did nothing in the phone app. The old code waited forever when a photo could not be read (large camera photos, unsupported formats, low memory) and never showed an error. New code reads photos in a safer way, handles phone-camera rotation, times out after 20 seconds and shows a clear message. The same fix is on the customer review form (a review without a photo could also hang).
- Admin photo pickers now accept JPG, PNG and WebP only. This avoids the camera chooser, which many app web views cannot open.
- Admin shows a message for any failed action instead of failing silently.
- The tracking page is not indexed by Google.
- Whole-project check: all admin tabs and all website pages were run against the real server code with test data (orders, reviews, coupons, tracking, delivery charges, analytics): no errors.
