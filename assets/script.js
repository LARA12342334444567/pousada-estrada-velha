const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
const closeMenu=()=>{links?.classList.remove('open');menu?.setAttribute('aria-expanded','false');};
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();if(document.activeElement?.closest('.navlinks'))menu?.focus();}});

const DEFAULT_PHONE='5531983396952';
const DEFAULT_MESSAGE='Olá! Gostaria de consultar a disponibilidade e os valores da hospedagem.';
function updateWhatsApp(config={}){
 const phone=/^\d{10,15}$/.test(config.whatsapp||'')?config.whatsapp:DEFAULT_PHONE;
 const message=config.message||DEFAULT_MESSAGE;
 const url=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
 document.querySelectorAll('[data-whatsapp]').forEach(link=>link.href=url);
}
// Native links open WhatsApp even when analytics is blocked. Keeping this page
// open gives the existing Google Ads tag time to send its conversion event.
function trackWhatsApp(event){
 if(event.type==='auxclick' && event.button!==1)return;
 const link=event.target.closest?.('a[data-whatsapp]');
 if(!link)return;
 if(typeof window.gtag==='function'){
  window.gtag('event','conversion',{
   'send_to':'AW-18359313925/CTMgCKuIif4cEIXMs7JE',
   'button_location':link.dataset.whatsapp
  });
 }
}
document.addEventListener('click',trackWhatsApp);
document.addEventListener('auxclick',trackWhatsApp);

const text=(sel,value)=>{const el=document.querySelector(sel); if(el) el.textContent=value;};
const html=(sel,value)=>{const el=document.querySelector(sel); if(el) el.innerHTML=value;};
const img=(sel,src)=>{const el=document.querySelector(sel); if(el && src) el.src=src;};
const nl=(value='')=>String(value).replace(/\n/g,'<br>');


function updateHero(src){
 const hero=document.querySelector('[data-hero-image]');
 if(!hero || !src)return;
 if(!src.endsWith('quarto-principal-1600.webp')){
  hero.removeAttribute('srcset');hero.removeAttribute('sizes');
 }
 hero.src=src;
}
const imageDimensions={"/assets/fotos/cafe-1.jpg":[1200,1600],"/assets/fotos/cafe-2.jpg":[1200,1600],"/assets/fotos/cafe-3.jpg":[1200,1600],"/assets/fotos/cafe-da-manha-480.webp":[480,853],"/assets/fotos/cafe-da-manha-800.webp":[800,1422],"/assets/fotos/fachada.jpg":[1086,1448],"/assets/fotos/por-do-sol.jpg":[720,1280],"/assets/fotos/quarto-2.jpeg":[1152,1536],"/assets/fotos/quarto-2.webp":[1152,1536],"/assets/fotos/quarto-novo.jpeg":[1536,1152],"/assets/fotos/quarto-novo.webp":[1536,1152],"/assets/fotos/quarto-principal-1600.webp":[1600,1200],"/assets/fotos/quarto-principal-640.webp":[640,480],"/assets/fotos/quarto-principal-960.webp":[960,720],"/assets/fotos/quarto.jpg":[1077,1461],"/assets/fotos/regiao-1.jpg":[1170,866],"/assets/fotos/regiao-2.jpg":[1170,2049],"/assets/fotos/regiao-3.png":[334,542],"/assets/fotos/varanda-2.jpeg":[1536,1152],"/assets/fotos/varanda-2.webp":[1536,1152],"/assets/fotos/varanda-nova.jpeg":[1152,1536],"/assets/fotos/varanda-nova.webp":[1152,1536],"/assets/fotos/varanda.jpg":[1087,1446]};
function renderGallery(selector,images,alt){
 const gallery=document.querySelector(selector);
 if(!gallery || !Array.isArray(images))return;
 const nodes=images.map((src,i)=>{
  const image=document.createElement('img');
  image.src=src;image.alt=`${alt} — foto ${i+1}`;
  image.loading='lazy';image.decoding='async';
  const dimensions=imageDimensions['/'+src.replace(/^\//,'')];
  if(dimensions){image.width=dimensions[0];image.height=dimensions[1];}
  if(src.endsWith('cafe-da-manha-800.webp')){
   image.srcset='assets/fotos/cafe-da-manha-480.webp 480w, assets/fotos/cafe-da-manha-800.webp 800w';
   image.sizes='(max-width:850px) 90vw, 40vw';
  }
  return image;
 });
 gallery.replaceChildren(...nodes);
}

async function loadEditableContent(){
  try{
    const r=await fetch('content/site.json',{cache:'no-store'});
    if(!r.ok) throw new Error('content/site.json não encontrado');
    const s=await r.json();
    document.title=s.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content',s.seo.description);
    document.querySelectorAll('[data-brand-name]').forEach(el=>el.textContent=s.brand.name.toUpperCase());
    text('[data-hero-eyebrow]',s.hero.eyebrow); text('[data-hero-title]',s.hero.title); html('[data-hero-text]',nl(s.hero.text).replace(/<br>(Para quem.*)$/,'<br><strong>$1</strong>')); updateHero(s.hero.image);
    text('[data-intro-eyebrow]',s.intro.eyebrow); text('[data-intro-title]',s.intro.title); text('[data-intro-text]',s.intro.text);
    text('[data-work-eyebrow]',s.audiences.work.eyebrow); text('[data-work-title]',s.audiences.work.title); text('[data-work-text]',s.audiences.work.text);
    text('[data-tourism-eyebrow]',s.audiences.tourism.eyebrow); text('[data-tourism-title]',s.audiences.tourism.title); text('[data-tourism-text]',s.audiences.tourism.text);
    text('[data-rooms-eyebrow]',s.rooms.eyebrow); text('[data-rooms-title]',s.rooms.title); text('[data-rooms-text]',s.rooms.text); img('[data-rooms-image]',s.rooms.image);
    html('[data-amenities]',(s.rooms.amenities||[]).map(x=>`<div class="bullet">${x}</div>`).join(''));
    text('[data-view-eyebrow]',s.view.eyebrow); text('[data-view-title]',s.view.title); text('[data-view-text]',s.view.text); img('[data-view-image]',s.view.image);
    text('[data-breakfast-eyebrow]',s.breakfast.eyebrow); text('[data-breakfast-title]',s.breakfast.title); text('[data-breakfast-text]',s.breakfast.text);
    renderGallery('[data-breakfast-gallery]',s.breakfast.images,'Café da manhã da Pousada Estrada Velha');
    text('[data-region-eyebrow]',s.region.eyebrow); text('[data-region-title]',s.region.title); text('[data-region-text]',s.region.text);
    renderGallery('[data-region-gallery]',s.region.images,'Paisagem da região de Conceição do Mato Dentro');
    html('[data-places]',(s.places||[]).map(p=>`<div class="place"><span class="distance">${p.distance}</span><h3>${p.title}</h3><p>${p.text}</p></div>`).join(''));
    text('[data-sunset-eyebrow]',s.sunset.eyebrow); text('[data-sunset-title]',s.sunset.title); text('[data-sunset-text]',s.sunset.text); const sunset=document.querySelector('.sunset'); if(sunset && s.sunset.image) sunset.style.backgroundImage=`linear-gradient(90deg,rgba(20,20,17,.65),rgba(20,20,17,.08)),url("${s.sunset.image}")`;
    text('[data-location-eyebrow]',s.location.eyebrow); text('[data-location-title]',s.location.title); html('[data-location-address]',nl(s.location.address)); text('[data-location-text]',s.location.text); document.querySelectorAll('[data-maps-link]').forEach(a=>a.href=s.location.mapsUrl);
    text('[data-reservation-eyebrow]',s.reservation.eyebrow); text('[data-reservation-title]',s.reservation.title); text('[data-reservation-text]',s.reservation.text);
    if(s.rates){
      for(const key of ['title','individual','double','included','notice']){
        if(s.rates[key]!==undefined)text(`[data-rates-${key}]`,s.rates[key]);
      }
    }
    updateWhatsApp(s.reservation);
    window.pousadaConfig=s;
  }catch(err){console.warn(err)}
}
loadEditableContent();

