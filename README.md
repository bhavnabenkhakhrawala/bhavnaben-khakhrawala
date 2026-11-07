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
   (You do NOT need `CF_ACCOUNT_ID`, `CF_DATABASE_ID`, `CF_API_TOKEN` any more. If no D1
