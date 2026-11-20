/* Policy pages (one source: used by the server for search engines and fetched by the browser app).
   Owner-specific details come from Admin > Settings > "Business and legal details". Have a CA/lawyer review before relying on them. */
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=(S,k,d)=>(S&&S[k]!=null&&S[k]!=='')?S[k]:d;
export const LEGAL={privacy:'Privacy Policy',terms:'Terms & Conditions',shipping:'Shipping & Delivery Policy',refund:'Refund, Cancellation & Return Policy'};
export const LEGAL_DESC={privacy:'How Bhavnaben Khakhrawala collects, uses and protects the details you share when you order, enquire or review.',terms:'Terms of use and sale for orders placed with Bhavnaben Khakhrawala, Amroli, Surat.',shipping:'Delivery areas, timelines, charges and courier details for Bhavnaben Khakhrawala orders.',refund:'Cancellation, damaged or wrong item and refund policy of Bhavnaben Khakhrawala.'};
export function legal(k,S){
 const nm=esc(sv(S,'legal_name','Bhavnaben Bharatbhai Shah (trading as Bhavnaben Khakhrawala)')),gst=sv(S,'gstin',''),fs=esc(sv(S,'fssai','20718031000014')),
 gn=esc(sv(S,'grievance_name',sv(S,'phone1_name','Vishal Shah'))),gp=esc(sv(S,'grievance_phone',sv(S,'phone1','+91 99255 20051'))),ge=sv(S,'grievance_email',''),
 days=esc(sv(S,'ship_days','')),rd=esc(sv(S,'return_days','48 hours')),
 ad=esc(sv(S,'addr_office','Plot no. B1, B2, Kailash Row House, opp. Mahavir Heights, New Kosad Road, Amroli, Surat')),
 wa=esc(sv(S,'wa_number','6355934337')),
 who=`<p><b>${nm}</b><br>${ad}<br>FSSAI Lic No: ${fs}${gst?`<br>GSTIN: ${esc(gst)}`:''}</p>`,
 gr=`<h3>Grievance officer</h3><p>${gn}, Owner. Phone/WhatsApp: ${gp}${ge?`. Email: <a href="mailto:${esc(ge)}">${esc(ge)}</a>`:''}. We acknowledge every complaint within 48 hours and aim to resolve it within one month.</p>`,
 upd='<p><i>Last updated: November 2026</i></p>',B={
 privacy:`${upd}<p>This policy explains what personal details we collect on this website, why, and what choices you have.</p>
<h3>What we collect</h3><ul><li><b>Orders:</b> name, phone number, delivery address, city, pincode, optional email and notes, and the items you order.</li><li><b>Wholesale enquiries:</b> business name, contact person, phone, email, city and your requirement.</li><li><b>Reviews:</b> name, city, rating, text and an optional photo. Reviews are shown only after we approve them.</li></ul>
<h3>Why we use it</h3><p>To confirm and deliver your order, contact you about it, issue your bill, answer enquiries and show approved reviews. We do not sell your data or use it for third-party advertising.</p>
<h3>Who it is shared with</h3><ul><li>The courier or delivery person we choose to carry your parcel, only the name, phone and address needed for delivery.</li><li>WhatsApp (Meta), because your order message is sent to us through WhatsApp.</li><li>Cloudflare, which hosts this website and its database.</li></ul>
<h3>Payments</h3><p>This website does not collect card or UPI details. Payment is arranged directly with our team after we confirm your order.</p>
<h3>How long we keep it</h3><p>Order records are kept as long as needed for accounts, tax and support, then deleted. Rejected or deleted reviews are removed from the database.</p>
<h3>Your rights</h3><p>You can ask us to show, correct or delete your details, or to withdraw your consent, by calling or messaging us. We will act on it within a reasonable time, subject to records we must keep by law.</p>
<h3>Security and cookies</h3><p>The site uses HTTPS and limits access to order data to our staff. We use only essential storage in your browser (for example your cart); we do not run advertising trackers.</p>
<h3>Children</h3><p>This website is meant for adults placing orders. Children should order with a parent or guardian.</p>${gr}<h3>Business</h3>${who}`,
 terms:`${upd}<p>By using this website or placing an order you agree to these terms.</p>
<h3>Seller</h3>${who}
<h3>Orders</h3><p>Placing an order on the website sends your request to us on WhatsApp and saves it with us. An order is <b>confirmed only after our team contacts you</b> by call or WhatsApp and confirms availability, the total and the delivery details. We may decline or cancel an order if stock is unavailable, the address cannot be served, or the details look wrong.</p>
<h3>Prices and payment</h3><p>Prices are in Indian rupees and are shown per pack. Delivery or packing charges, if any, are added at checkout and shown on your bill. Prices and offers can change without notice, but a confirmed order keeps the confirmed price. Payment is made directly to the shop (for example UPI, bank transfer or cash) as told to you when we confirm. Dispatch happens after payment is received, unless we agree otherwise.</p>
<h3>Products</h3><p>Photos are for reference; packaging may differ slightly. Our products contain wheat flour and may contain sesame, nuts, milk or other ingredients depending on the flavour. Tell us about any allergy before ordering. Best before date is printed on the pack. Store in a cool, dry place and keep the pack closed.</p>
<h3>Coupons</h3><p>Coupon codes have their own conditions (minimum order, expiry, usage limit) and cannot be exchanged for cash.</p>
<h3>Reviews</h3><p>By submitting a review or photo you allow us to display it on this website. We may reject reviews that are abusive, unrelated or not genuine.</p>
<h3>Liability</h3><p>We take care to keep information on this website correct, but errors can happen. Our liability for any order is limited to the amount paid for that order. Delays caused by courier, weather or events beyond our control are not our fault.</p>
<h3>Law</h3><p>These terms follow the laws of India. Courts at Surat, Gujarat have jurisdiction, subject to your rights under consumer law.</p>${gr}`,
 shipping:`${upd}<h3>Who delivers</h3><p>Orders are packed at our Amroli, Surat kitchen. Delivery is arranged by our team in the way that suits your location: our own staff, handing over at the shop, or a courier or transport we choose.</p>
<h3>Where we deliver</h3><p>We deliver to many places in India. If we cannot reach your address, we will tell you when we confirm the order.</p>
<h3>Delivery time</h3><p>Delivery time is <b>not fixed</b>. Sometimes an order goes out the same day, and sometimes it takes a few days, depending on your location, stock and our workload.${days?` Usually: ${days}.`:''} <b>Our team will tell you the expected delivery time when we confirm your order</b>, and will inform you if it changes. Festivals, weather and courier delays can add time.</p>
<h3>Charges</h3><p>Delivery or packing charges, and the order amount above which delivery is free, are shown at checkout and on your bill. If they change after you order, we confirm the final amount with you before dispatch.</p>
<h3>Tracking</h3><p>If your parcel goes by courier, we share the courier name and tracking details on WhatsApp where available.</p>
<h3>Receiving your order</h3><p>Please check the sealed packs when you receive the parcel. If a pack looks damaged, record a short video while opening and follow the <a href="/refund">Refund & Return Policy</a>. Customers who are not available for delivery may have to arrange re-delivery at extra cost.</p>
<h3>Help</h3><p>Call or WhatsApp ${gp} (WhatsApp orders: +91 ${wa}).</p>`,
 refund:`${upd}<p>Khakhra and bhakhri are food items, so we cannot take back opened or used packs. We will gladly fix a genuine problem.</p>
<h3>Cancellation</h3><p>You can cancel before your order is packed by calling or messaging us. If you have already paid, we refund the amount (see timeline below). Once shipped, an order cannot be cancelled.</p>
<h3>Damaged, wrong or stale item</h3><p>Tell us within <b>${rd}</b> of delivery on WhatsApp ${gp}, with clear photos of the pack, the label with the batch or best before date, and the outer parcel (a short opening video helps). After checking, we will send a replacement or refund the value of the affected packs, whichever you prefer.</p>
<h3>What we cannot accept</h3><ul><li>Opened packs or products damaged after delivery.</li><li>Complaints about taste preference, when the product is as described.</li><li>Delay in reporting beyond the time above.</li></ul>
<h3>Refund timeline</h3><p>Approved refunds are paid back by the same method you used (UPI, bank transfer) within 5 to 7 working days. Cash orders are refunded by UPI or bank transfer.</p>
<h3>Wholesale orders</h3><p>Bulk and wholesale orders follow the terms agreed in writing with our team at the time of the order.</p>${gr}`};
 return `<section class="w" style="max-width:820px" data-lg="${k}"><h1 style="font-size:clamp(30px,5vw,46px)">${esc(LEGAL[k])}</h1>${B[k]}</section>`}
