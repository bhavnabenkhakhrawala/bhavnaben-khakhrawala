/* Serves every website page (/, /products, /products/<name>, /about ...) with real, search-engine readable content,
   plus /sitemap.xml and /robots.txt. Images, /admin and /bill.html are static files and never reach this code. */
import {pageData} from '../lib/core.js';
import {match,render,head,sitemap,robots} from '../lib/pages.js';
let SHELL=null;
async function shell(ctx){
 if(SHELL)return SHELL;
 const r=await ctx.env.ASSETS.fetch(new Request(new URL('/app-shell',ctx.request.url)));
 if(!r.ok)throw new Error('shell '+r.status);SHELL=await r.text();return SHELL}
const sec={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'SAMEORIGIN'};
export async function onRequest(ctx){
 const req=ctx.request,url=new URL(req.url),path=url.pathname;
 if(req.method!='GET'&&req.method!='HEAD')return new Response('Method Not Allowed',{status:405});
 if(/^\/(admin|api|images)(\/|$)/.test(path)||path=='/bill.html'||path=='/app-shell'||path=='/app-shell.html')return ctx.next();
 const site=ctx.env.SITE_URL?String(ctx.env.SITE_URL).replace(/\/+$/,''):url.origin,siteHost=new URL(site).host,canonical=url.host==siteHost;
 const noidx=canonical?{}:{'X-Robots-Tag':'noindex, nofollow'};
 if(ctx.env.SITE_URL&&!canonical&&!/(\.pages\.dev|localhost|127\.0\.0\.1)(:\d+)?$/.test(url.host)&&match(path))return Response.redirect(site+path+url.search,301); // e.g. www -> main domain
 if(path=='/robots.txt')return new Response(robots(site,canonical),{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
 if(path=='/sitemap.xml'){let cats=[];try{cats=(await pageData(ctx.env)).cats}catch(e){}return new Response(sitemap(cats,site),{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600',...noidx}})}
 const route=match(path);if(!route)return ctx.next();
 if(path.length>1&&path.endsWith('/'))return Response.redirect(url.origin+path.replace(/\/+$/,'')+url.search,301);
 let html;
 try{
  const [tpl,data]=await Promise.all([shell(ctx),pageData(ctx.env,route.k=='reviews')]);
  const r=render(route,data,site);
  html=tpl.replace('<!--SEO_HEAD-->',()=>head(r,url.origin,site,data)).replace('<!--SEO_MAIN-->',()=>r.main);
  return new Response(html,{status:r.status,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=0, must-revalidate',...sec,...noidx}})
 }catch(e){
  console.error('PAGE ERROR',e&&e.message||e);
  try{const tpl=await shell(ctx);return new Response(tpl.replace('<!--SEO_HEAD-->',()=>'<title>Bhavnaben Khakhrawala | Khakhra, Bhakhri & Gujarati Snacks in Surat</title>').replace('<!--SEO_MAIN-->',()=>''),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store',...sec}})}catch(x){return new Response('Please try again in a moment.',{status:503})}
 }
}
