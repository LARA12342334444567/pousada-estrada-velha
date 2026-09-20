const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const text=(sel,value)=>{const el=document.querySelector(sel); if(el) el.textContent=value;};
const html=(sel,value)=>{const el=document.querySelector(sel); if(el) el.innerHTML=value;};
const img=(sel,src)=>{const el=document.querySelector(sel); if(el && src) el.src=src;};
const nl=(value='')=>String(value).replace(/\n/g,'<br>');

async function loadEditableContent(){
  try{
    const r=await fetch('content/site.json',{cache:'no-store'});
    if(!r.ok) throw new Error('content/site.json não encontrado');
    const s=await r.json();
    document.title=s.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content',s.seo.description);
    document.querySelectorAll('[data-brand-name]').forEach(el=>el.textContent=s.brand.name.toUpperCase());
    text('[data-hero-eyebrow]',s.hero.eyebrow); text('[data-hero-title]',s.hero.title); html('[data-hero-text]',nl(s.hero.text).replace(/<br>(Para quem.*)$/,'<br><strong>$1</strong>')); const hero=document.querySelector('.hero'); if(hero && s.hero.image) hero.style.backgroundImage=`linear-gradient(90deg,rgba(16,16,13,.78),rgba(16,16,13,.32) 58%,rgba(16,16,13,.08)),url("${s.hero.image}")`;
    text('[data-intro-eyebrow]',s.intro.eyebrow); text('[data-intro-title]',s.intro.title); text('[data-intro-text]',s.intro.text);
    text('[data-work-eyebrow]',s.audiences.work.eyebrow); text('[data-work-title]',s.audiences.work.title); text('[data-work-text]',s.audiences.work.text);
    text('[data-tourism-eyebrow]',s.audiences.tourism.eyebrow); text('[data-tourism-title]',s.audiences.tourism.title); text('[data-tourism-text]',s.audiences.tourism.text);
    text('[data-rooms-eyebrow]',s.rooms.eyebrow); text('[data-rooms-title]',s.rooms.title); text('[data-rooms-text]',s.rooms.text); img('[data-rooms-image]',s.rooms.image);
    html('[data-amenities]',(s.rooms.amenities||[]).map(x=>`<div class="bullet">${x}</div>`).join(''));
    text('[data-view-eyebrow]',s.view.eyebrow); text('[data-view-title]',s.view.title); text('[data-view-text]',s.view.text); img('[data-view-image]',s.view.image);
    text('[data-breakfast-eyebrow]',s.breakfast.eyebrow); text('[data-breakfast-title]',s.breakfast.title); text('[data-breakfast-text]',s.breakfast.text);
    html('[data-breakfast-gallery]',(s.breakfast.images||[]).map((x,i)=>`<img src="${x}" alt="Café da manhã da Pousada Estrada Velha — foto ${i+1}">`).join(''));
    text('[data-region-eyebrow]',s.region.eyebrow); text('[data-region-title]',s.region.title); text('[data-region-text]',s.region.text);
    html('[data-region-gallery]',(s.region.images||[]).map((x,i)=>`<img src="${x}" alt="Paisagem e cachoeira da região de Conceição do Mato Dentro — foto ${i+1}">`).join(''));
    html('[data-places]',(s.places||[]).map(p=>`<div class="place"><span class="distance">${p.distance}</span><h3>${p.title}</h3><p>${p.text}</p></div>`).join(''));
    text('[data-sunset-eyebrow]',s.sunset.eyebrow); text('[data-sunset-title]',s.sunset.title); text('[data-sunset-text]',s.sunset.text); const sunset=document.querySelector('.sunset'); if(sunset && s.sunset.image) sunset.style.backgroundImage=`linear-gradient(90deg,rgba(20,20,17,.65),rgba(20,20,17,.08)),url("${s.sunset.image}")`;
    text('[data-location-eyebrow]',s.location.eyebrow); text('[data-location-title]',s.location.title); html('[data-location-address]',nl(s.location.address)); text('[data-location-text]',s.location.text); document.querySelectorAll('[data-maps-link]').forEach(a=>a.href=s.location.mapsUrl);
    text('[data-reservation-eyebrow]',s.reservation.eyebrow); text('[data-reservation-title]',s.reservation.title); text('[data-reservation-text]',s.reservation.text);
    window.pousadaConfig=s;
  }catch(err){console.warn(err)}
}
loadEditableContent();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const form=document.getElementById('reservationForm');
form?.addEventListener('submit',e=>{
 e.preventDefault(); const fd=new FormData(form); const phone=window.pousadaConfig?.reservation?.whatsapp||'5531983396952';
 const msg=`🏨 NOVA SOLICITAÇÃO DE HOSPEDAGEM\n\nNome: ${fd.get('nome')}\nWhatsApp: ${fd.get('whatsapp')}\nCheck-in: ${fd.get('checkin')}\nCheck-out: ${fd.get('checkout')}\nHóspedes: ${fd.get('hospedes')}\nAcomodação: ${fd.get('acomodacao')}\nMotivo: ${fd.get('motivo')}\nObservações: ${fd.get('observacoes')||'Não informado'}\n\nGostaria de receber a confirmação da disponibilidade e o valor da hospedagem.`;
 const whatsappUrl=`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
 if(typeof gtag==='function'){
   gtag('event','conversion',{'send_to':'AW-18359313925/CTMgCKuIif4cEIXMs7JE'});
 }
 window.open(whatsappUrl,'_blank');
});
