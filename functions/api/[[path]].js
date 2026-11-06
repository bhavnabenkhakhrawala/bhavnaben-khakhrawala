import {api} from '../../lib/core.js';
export async function onRequest(ctx){
 try{return await api(ctx.request,ctx.env)}
 catch(e){console.error('API ERROR',e&&e.message||e);return new Response(JSON.stringify({error:1}),{status:500,headers:{'Content-Type':'application/json'}})}
}
