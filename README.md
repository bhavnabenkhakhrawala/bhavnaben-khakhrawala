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
