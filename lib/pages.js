/* Server-side page content for search engines (and visitors without JavaScript).
   The browser app (app-shell.html) replaces this content as soon as it loads. */
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R=n=>'₹'+(+n).toLocaleString('en-IN');
const sv=(S,k,d)=>(S&&S[k]!=null&&S[k]!=='')?S[k]:d;
const AO='Plot no. B1, B2, Kailash Row House, opp. Mahavir Heights, New Kosad Road, Amroli, Surat',AS='53, 54 Rang Nagar Society, Jain Temple Main Road, near Laxmi Flour Mill, Amroli, Surat';
const NAME='Bhavnaben Khakhrawala';
export const PAGES=['', 'products', 'about', 'wholesale', 'reviews', 'privacy', 'checkout'];
export function match(path){
 const p=path.replace(/^\/+|\/+$/g,'');if(PAGES.includes(p))return{k:p||'home'};
 const m=/^products\/([^/]+)$/.exec(p);if(m)return{k:'p',slug:decodeURIComponent(m[1])};return null}
const prices=c=>{const a=[];for(const[g,z]of Object.entries(c.pr||{}))for(const[l,v]of Object.entries(z))if(v&&v[0]!=null)a.push({g,l,p:v[0],v:v[1]});return a};
const lowHigh=c=>{const a=prices(c).map(x=>x.p);return a.length?[Math.min(...a),Math.max(...a)]:null};
const cut=(s,n)=>{s=String(s).replace(/\s+/g,' ').trim();return s.length>n?s.slice(0,n-1).replace(/\s+\S*$/,'').replace(/[\s,;:.\-–]+$/,'')+'…':s};
const clean=s=>String(s).replace(/\*/g,'');
const ld=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,'\\u003c')}</script>`;
function business(S,origin){
 const tel=[sv(S,'phone1','+91 99255 20051'),sv(S,'phone2','+91 99988 02435')].map(x=>String(x).replace(/[^\d+]/g,''));
 return{'@context':'https://schema.org','@type':'FoodEstablishment','@id':origin+'/#business',name:NAME,url:origin+'/',logo:origin+'/images/logo.png',image:origin+'/images/logo.png',telephone:tel[0],foundingDate:'1998',
  description:'Khakhra, dry bhakhri, coin khakhra and Gujarati snacks from Amroli, Surat. Retail and wholesale.',
  address:{'@type':'PostalAddress',streetAddress:sv(S,'addr_shop',AS),addressLocality:'Surat',addressRegion:'Gujarat',postalCode:'394107',addressCountry:'IN'},
  areaServed:'IN',sameAs:[]}}
const nav=(c)=>`<nav aria-label="Breadcrumb" style="margin-bottom:14px;font-size:14px"><a href="/">Home</a> › <a href="/products">Products</a> › ${esc(c.name)}</nav>`;
const contact=S=>`<p><b>Office:</b> ${esc(sv(S,'addr_office',AO))}<br><b>Shop:</b> ${esc(sv(S,'addr_shop',AS))}</p><p>${[[sv(S,'phone1_name','Vishal Shah'),sv(S,'phone1','+91 99255 20051')],[sv(S,'phone2_name','Paras Shah'),sv(S,'phone2','+91 99988 02435')]].filter(x=>x[1]).map(x=>`${esc(x[0])}: <a href="tel:${esc(String(x[1]).replace(/[^\d+]/g,''))}">${esc(x[1])}</a>`).join(' · ')}</p><p>FSSAI Lic No: ${esc(sv(S,'fssai','20718031000014'))}</p>`;
const plist=c=>{const gs=[...new Set(prices(c).map(x=>x.g))];return gs.length?gs.map(g=>`<li><b>${esc(g)}</b>: ${prices(c).filter(x=>x.g==g).map(x=>`${esc(x.l)} ${R(x.p)}${x.v!=null?` (${esc(c.vl||'Vacuum pack')} ${R(x.v)})`:''}`).join(', ')}</li>`).join(''):'<li>Prices coming soon.</li>'};
const card=c=>{const lh=lowHigh(c);return`<li style="margin:10px 0"><a href="/products/${esc(c.slug)}"><b>${esc(c.name)}</b></a> – ${esc(c.desc)} ${c.fl.length} flavours, pack sizes ${c.sizes.map(z=>esc(z.l)).join(' / ')}${lh?`, from ${R(lh[0])}`:''}.</li>`};
const about=S=>{const x=sv(S,'about_text','');const n=0;return x?x.split(/\n\s*\n/).map(y=>`<p>${esc(y).replace(/\{flavours\}/g,'')}</p>`).join(''):`<p>Bhavnaben Khakhrawala started in Amroli, Surat in 1998 as a small family kitchen. Today the same family runs it, with the same recipe and the same care.</p><p>We use specially ground wheat flour, sieved and made with filtered water, in a clean and hygienic kitchen. Our khakhra, dry bhakhri and coin khakhra are packed to stay crisp and fresh.</p>`};

export function render(route,data,origin){
 const S=data.set||{},cats=data.cats||[];let status=200,title,desc,path,robots='index,follow',main,og=origin+'/images/logo.png',extra=[];
 const k=route.k;
 if(k=='home'){path='/';title=NAME+' | Khakhra, Bhakhri & Gujarati Snacks in Surat | Since 1998';
  desc=cut('Order khakhra, dry bhakhri, coin khakhra and home made khakhra online from Bhavnaben Khakhrawala, Amroli, Surat. '+clean(sv(S,'hero_text','Made from specially ground wheat flour. Retail and wholesale.')),160);
  main=`<section class="w"><h1>${esc(clean(sv(S,'hero_title','The crunch of tradition, delivered fresh.')))}</h1><p>${esc(sv(S,'hero_text','Khakhra and bhakhri made from specially ground wheat flour, sieved and made with filtered water. Same taste for 28 years.'))}</p><p><a href="/products">Order Now</a> · <a href="/wholesale">Bulk Orders</a></p><h2>Our Variety</h2><ul>${cats.map(card).join('')}</ul><h2>Why ${NAME}</h2><p>Fresh wheat flour, hygienic FSSAI licensed kitchen, 28 years of the same trusted recipe, and packing made to travel anywhere.</p><h2>Contact</h2>${contact(S)}</section>`;
  extra.push(ld(business(S,origin)))}
 else if(k=='products'){path='/products';title='Our Products: Khakhra, Dry Bhakhri, Coin Khakhra | '+NAME;
  desc=cut('Choose from '+cats.map(c=>c.name).join(', ')+' in many flavours and pack sizes. See prices and order online from '+NAME+', Surat.',160);
  main=`<section class="w"><h1>Our Products</h1><p>Select a product to see all flavours, pack sizes and prices.</p><ul>${cats.map(card).join('')}</ul></section>`;
  extra.push(ld({'@context':'https://schema.org','@type':'ItemList',itemListElement:cats.map((c,i)=>({'@type':'ListItem',position:i+1,url:origin+'/products/'+c.slug,name:c.name}))}))}
 else if(k=='p'){const c=cats.find(x=>x.slug==route.slug);
  if(!c){status=404;path='/products/'+route.slug;title='Page not found | '+NAME;desc='This page could not be found.';robots='noindex,follow';main=`<section class="w"><h1>Page not found</h1><p><a href="/products">See all products</a></p></section>`}
  else{path='/products/'+c.slug;const lh=lowHigh(c);title=`${c.name} - Flavours, Price & Order Online | ${NAME}`;
   desc=cut(`${c.name}: ${c.desc} ${c.fl.length} flavours${lh?', from '+R(lh[0]):''}. Order online from ${NAME}, Amroli, Surat.`,160);if(c.img)og=origin+(c.img[0]=='/'?'':'/')+c.img;
   const gs=[...new Set(c.fl.map(f=>f.g))];
   main=`<section class="w">${nav(c)}<h1>${esc(c.name)}</h1><p>${esc(c.desc)}</p>${c.img?`<img src="${esc(c.img)}" alt="${esc(c.name)}" width="480" height="480" style="max-width:100%;height:auto;border-radius:20px">`:''}<h2>Price list</h2><ul>${plist(c)}</ul><p>Pack sizes: ${c.sizes.map(z=>esc(z.l)).join(' / ')}. Best before ${esc(c.shelf)} from packing. Keep in a cool and dry place.</p><h2>Available flavours</h2>${gs.map(g=>`<h3>${esc(g)}</h3><p>${c.fl.filter(f=>f.g==g).map(f=>esc(f.n)+(f.s?'':' (out of stock)')).join(', ')}</p>`).join('')}<p><a href="/products">See all products</a> · <a href="/wholesale">Bulk orders</a></p></section>`;
   const any=c.fl.some(f=>f.s)&&c.sizes.some(z=>z.s);
   const prod={'@context':'https://schema.org','@type':'Product',name:c.name,description:c.desc,image:[og],brand:{'@type':'Brand',name:NAME},url:origin+path};
   if(lh)prod.offers={'@type':'AggregateOffer',priceCurrency:'INR',lowPrice:lh[0],highPrice:lh[1],offerCount:prices(c).length,availability:any?'https://schema.org/InStock':'https://schema.org/OutOfStock',url:origin+path};
   extra.push(ld(prod),ld({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:'Products',item:origin+'/products'},{'@type':'ListItem',position:3,name:c.name,item:origin+path}]}))}}
 else if(k=='about'){path='/about';title='About Us | '+NAME+', Amroli Surat';desc=cut('Since 1998, '+NAME+' has made khakhra, bhakhri and Gujarati snacks in Amroli, Surat from specially ground wheat flour in a clean, hygienic kitchen.',160);
  main=`<section class="w"><h1>About Us</h1>${about(S)}<h2>Visit / Contact</h2>${contact(S)}</section>`;extra.push(ld(business(S,origin)))}
 else if(k=='wholesale'){path='/wholesale';title='Wholesale & Bulk Khakhra Orders | '+NAME;desc=cut('Wholesale and bulk khakhra, bhakhri and coin khakhra for shops, caterers, gifting and events. Send an inquiry to '+NAME+', Surat.',160);
  main=`<section class="w"><h1>Wholesale &amp; Bulk Orders</h1><p>Shops, caterers, gifting and events: tell us what you need and our team will call you with details.</p><p>Call us: ${esc(sv(S,'phone1','+91 99255 20051'))} / ${esc(sv(S,'phone2','+91 99988 02435'))}</p></section>`}
 else if(k=='reviews'){path='/reviews';title='Customer Reviews | '+NAME;desc=cut('Read what customers say about khakhra and bhakhri from '+NAME+' and share your own experience.',160);
  main=`<section class="w"><h1>Customer Reviews</h1>${(data.reviews||[]).map(v=>`<blockquote style="margin:14px 0"><p>${esc(v.body)}</p><b>${esc(v.name)}</b> ${esc(v.city||'')} (${+v.rating}/5)</blockquote>`).join('')||'<p>Be the first to share your experience!</p>'}</section>`}
 else if(k=='privacy'){path='/privacy';title='Privacy Policy | '+NAME;desc='How '+NAME+' collects and uses the details you enter when you order, send an inquiry or write a review.';
  main=`<section class="w"><h1>Privacy Policy</h1><p>When you place an order, send a wholesale inquiry or write a review, we collect the details you enter: name, phone number, email, delivery address, order items, and any photo you upload. We use them only to process and deliver your order, respond to inquiries and display approved reviews. We do not sell your data.</p></section>`}
 else{path='/checkout';title='Checkout | '+NAME;desc='Checkout';robots='noindex,follow';main=`<section class="w"><h1>Checkout</h1><p>Please enable JavaScript to place your order, or call us on ${esc(sv(S,'phone1','+91 99255 20051'))}.</p></section>`}
 return{status,title,desc,path,robots,og,main,extra}}

export function head(r,origin,canonOrigin,data){
 const url=canonOrigin+(r.path=='/'?'/':r.path),init=`<script>window.__DATA=${JSON.stringify({cats:data.cats||[]}).replace(/</g,'\\u003c')};window.__SET=${JSON.stringify(data.set||{}).replace(/</g,'\\u003c')}</script>`;
 return`<title>${esc(r.title)}</title><meta name="description" content="${esc(r.desc)}"><meta name="robots" content="${r.robots}"><link rel="canonical" href="${esc(url)}"><meta property="og:type" content="website"><meta property="og:site_name" content="${NAME}"><meta property="og:title" content="${esc(r.title)}"><meta property="og:description" content="${esc(r.desc)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(r.og)}"><meta property="og:locale" content="en_IN"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(r.title)}"><meta name="twitter:description" content="${esc(r.desc)}"><meta name="twitter:image" content="${esc(r.og)}">${r.extra.join('')}${init}`}

export function sitemap(cats,canonOrigin){
 const u=p=>`<url><loc>${canonOrigin}${p}</loc></url>`;
 return'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[u('/'),u('/products'),...cats.map(c=>u('/products/'+esc(c.slug))),u('/about'),u('/wholesale'),u('/reviews'),u('/privacy')].join('\n')+'\n</urlset>\n'}
export function robots(canonOrigin,allow){
 return allow?`User-agent: *\nDisallow: /admin/\nDisallow: /api/\nDisallow: /bill.html\nDisallow: /checkout\nAllow: /\n\nSitemap: ${canonOrigin}/sitemap.xml\n`:`User-agent: *\nDisallow: /\n`}
