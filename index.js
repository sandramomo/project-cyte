import{a as E,i as d}from"./assets/vendor-CCIwLLD6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const O=E.create({baseURL:"https://sound-wave.b.goit.study/api/artists",headers:{},params:{limit:8}});async function x(t){return(await O.get("",{params:{page:t}})).data}let i,p;document.addEventListener("DOMContentLoaded",_);async function _(t){t.preventDefault(),i=1;try{const e=await x(i);if(p=Math.ceil(e.totalArtists/8),e.artists.length===0){d.show({title:"Oops",message:"The are no artists found..."}),l();return}else N(e.artists),l(),q()}catch{p=0,d.show({title:"Oops",message:"An error must have occurred"}),l()}}function q(){if(p>i)H();else if(i===p){W(),d.show({title:"Wow",message:"You have reached the end of the list"});return}}function N(t){const e=document.querySelector(".artists-list-js"),s=t.map(a=>T(a)).join("");e.innerHTML=s}function T(t){const e=t.genres.map(a=>I(a)).join("");let s;return t.strBiographyEN.length>120?s=t.strBiographyEN.slice(0,120)+"...":s=t.strBiographyEN,` <li class="artists-list-item">
      <ul class="artists-card">
        <li>
          <div class="artist-img-box">
            <img src="${t.strArtistThumb}" alt="${t.strArtist}"/>
          </div>
        </li>
        <li>
          <div>
            <ul class="artist-genres">${e}</ul>
          </div>
          <div class="artist-desc">
            <p class="artist-name"> ${t.strArtist}</p>
            <p class="artist-bio">${s} </p>
          </div>
        </li>
        <li>
          <button class="artists-learn-js artists-learn" data-artist-id=${t._id}> Learn more  <span class="artist-svg"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 14.9426L8 7.94263L0 0.942627V14.9426Z" fill="white" />
</svg></span> </button>
        </li>
      </ul>
    </li>`}function I(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function P(t){const e=document.querySelector(".artists-list-js"),s=t.map(a=>T(a)).join("");e.insertAdjacentHTML("beforeend",s)}function F(){const t=document.querySelector(".artist-loader-js");t.style.display="flex"}function l(){const t=document.querySelector(".artist-loader-js");t.style.display="none"}function H(){document.querySelector(".artists-load-js").classList.add("artists-load-more")}function W(){document.querySelector(".artists-load-js").classList.remove("artists-load-more")}const R=document.querySelector(".artists-load-js");R.addEventListener("click",Y);async function Y(t){t.preventDefault(),i+=1,F();try{const e=await x(i);l(),P(e.artists),q()}catch{d.show({title:"Oops",message:"An error must have occurred"}),l()}}const D="https://sound-wave.b.goit.study/api/feedbacks",G=10,m=document.getElementById("slides"),S=document.getElementById("prevBtn"),M=document.getElementById("nextBtn"),w=document.querySelector('.dot[data-kind="first"]'),v=document.querySelector('.dot[data-kind="middle"]'),L=document.querySelector('.dot[data-kind="last"]'),V=t=>Math.round(Number(t)||0);function j(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;")}function U(t){const e=Math.max(0,Math.min(5,Number(t)||0));let s='<span class="stars" aria-hidden="true">';for(let a=1;a<=5;a+=1)s+=`<span class="star${a<=e?" star--on":""}">★</span>`;return s+="</span>",s}function Z(t){var r;const e=document.createElement("div");e.className="swiper-slide";const s=V(t.rating),a=t.name||t.author||((r=t.user)==null?void 0:r.name)||"Anonymous",o=t.descr||t.comment||t.text||t.content||t.message||"";return e.innerHTML=`
<article class="card" aria-label="Visitor feedback">
<div class="card__stars" data-score="${s}">
<div class="js-stars"></div>
</div>
<p class="card__text">“${j(o)}”</p>
<div class="card__user">
<div class="name">${j(a)}</div>
<div class="muted">Verified visitor</div>
</div>
</article>`,e}function y(t){const e=t.slides.length,s=t.activeIndex,a=s===0,o=s===e-1;[w,v,L].forEach(r=>{r.classList.remove("dot--active"),r.setAttribute("aria-selected","false")}),a?(w.classList.add("dot--active"),w.setAttribute("aria-selected","true")):o?(L.classList.add("dot--active"),L.setAttribute("aria-selected","true")):(v.classList.add("dot--active"),v.setAttribute("aria-selected","true"))}function C(t){const e=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="${t}" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;return"data:image/svg+xml;utf8,"+encodeURIComponent(e)}function z(t){const e=window.jQuery;if(!(e&&e.fn&&e.fn.raty))return!1;const s=C("#764191"),a=C("#ffffff");return e(t).find(".card .js-stars").each(function(){const o=Number(e(this).closest(".card__stars").data("score"))||0;e(this).raty({readOnly:!0,score:o,starOn:s,starOff:a,halfShow:!1})}),!0}async function K(){try{const t=await fetch(D,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error(`Failed to load feedbacks: ${t.status}`);let e=await t.json(),s=Array.isArray(e)?e:(e==null?void 0:e.data)||(e==null?void 0:e.results)||(e==null?void 0:e.feedbacks)||[];Array.isArray(s)||(s=[]);const a=s.slice(0,G);m.innerHTML="",a.forEach(n=>m.appendChild(Z(n)));const o=new Swiper("#feedbacks-swiper",{slidesPerView:1,spaceBetween:8,speed:450,grabCursor:!0,allowTouchMove:!0});S&&S.addEventListener("click",()=>o.slidePrev()),M&&M.addEventListener("click",()=>o.slideNext()),o.on("slideChange",()=>y(o)),y(o),z(m)||document.querySelectorAll("#slides .card .js-stars").forEach(n=>{const u=Number(n.closest(".card__stars").dataset.score)||0;n.innerHTML=U(u)})}catch(t){console.error("Feedbacks error:",t),m.innerHTML='<div class="swiper-slide"><article class="card"><p class="card__text">Не вдалося завантажити відгуки. Перевірте API.</p></article></div>';const e=new Swiper("#feedbacks-swiper",{slidesPerView:1,spaceBetween:8});y(e)}}document.addEventListener("DOMContentLoaded",K);document.querySelectorAll(".nav-list a").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("menu-toggle").checked=!1})});const k={artistsList:document.querySelector(".artists-list-js")};Q();function Q(){let t;k.artistsList.addEventListener("click",async function(e){const s=e.target.closest(".artists-learn-js");if(s&&k.artistsList.contains(s)){t=s.dataset.artistId;try{rt();const a=await E.get(`https://sound-wave.b.goit.study/api/artists/${t}/albums`);h(),ot(),J(a.data),st(a.data),at()}catch{h(),f(),d.show({title:"Oops",message:"An error must have occurred"})}}})}function J(t){const e=document.querySelector(".modal-window-js"),s=t.genres.map(o=>X(o)).join(""),a=`<div class="modal-content">
    <button class="modal-close-btn-js modal-close-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.8353 14.364L14.3638 14.8354C14.1035 15.0957 13.6814 15.0957 13.421 14.8354L7.99988 9.4142L2.57868 14.8353C2.31838 15.0957 1.89626 15.0957 1.63591 14.8353L1.1645 14.3639C0.904151 14.1036 0.904151 13.6815 1.1645 13.4211L6.58568 8L1.1645 2.5788C0.904151 2.3185 0.904151 1.89638 1.1645 1.63603L1.6359 1.16463C1.89625 0.904282 2.31838 0.904282 2.57868 1.16463L7.99988 6.5858L13.421 1.16462C13.6814 0.904273 14.1035 0.904273 14.3638 1.16462L14.8353 1.63602C15.0956 1.89637 15.0956 2.3185 14.8353 2.5788L9.41408 8L14.8353 13.4211C15.0956 13.6815 15.0956 14.1036 14.8353 14.364Z" fill="white" />
</svg></button>
    <p class="modal-artist-name">${t.strArtist}</p>
    <div class="modal-img-desc-box">
    <div class="modal-img-container">
    <img src="${t.strArtistThumb}" alt="${t.strArtist}"/>
    </div>
    <ul>
      <li>
        <ul class="modal-artist-desc-list">
        <div class="modal-columns">
          <li>
            <p class="modal-desc-header">Years</p>
            <p class="modal-artist-desc">${t.intFormedYear} - ${t.intDiedYear||"Present"}</p>
          </li>
          <li>
            <p class="modal-desc-header">Sex</p>
            <p class="modal-artist-desc">${t.strGender}</p>
          </li>
          </div>
          <div  class="modal-columns">
          <li >
            <p class="modal-desc-header">Members</p>
            <p class="modal-artist-desc"> ${t.intMembers}</p>
          </li>
          <li>
            <p class="modal-desc-header">Country</p>
            <p class="modal-artist-desc">${t.strCountry}</p>
          </li>
          </div>
        </ul>
        
      </li>
      <li>
        <p class="modal-desc-header">Biography</p>
        <p class="modal-artist-desc">${t.strBiographyEN}</p>
      </li>
      
      <li>
        <ul class="modal-artist-genres">
          ${s}
        </ul>
        
      </li>
      </div>
    </ul>
    <p class="modal-desc-header">Albums</p>
    <div class="albums-list-js"></div>
  </div>`;e.innerHTML=a,h()}function X(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function tt(t){let e;t.movie?e=`<a href="${t.movie}" target="_blank"> <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5933 2.41614C20.4794 1.99354 20.2568 1.60815 19.9477 1.29831C19.6386 0.988473 19.2537 0.765003 18.8313 0.650142C17.2653 0.220142 11.0003 0.213142 11.0003 0.213142C11.0003 0.213142 4.73633 0.206142 3.16933 0.617142C2.74725 0.737289 2.36315 0.963919 2.0539 1.27528C1.74464 1.58663 1.52062 1.97226 1.40333 2.39514C0.99033 3.96114 0.98633 7.20914 0.98633 7.20914C0.98633 7.20914 0.98233 10.4731 1.39233 12.0231C1.62233 12.8801 2.29733 13.5571 3.15533 13.7881C4.73733 14.2181 10.9853 14.2251 10.9853 14.2251C10.9853 14.2251 17.2503 14.2321 18.8163 13.8221C19.2388 13.7075 19.6241 13.4845 19.934 13.1753C20.2439 12.8661 20.4677 12.4814 20.5833 12.0591C20.9973 10.4941 21.0003 7.24714 21.0003 7.24714C21.0003 7.24714 21.0203 3.98214 20.5933 2.41614ZM8.99633 10.2181L9.00133 4.21814L14.2083 7.22314L8.99633 10.2181Z" fill="white" />
</svg></a>`:e="";const s=nt(t.intDuration);return` <tr>
    <td class="modal-table-row">${t.strTrack}</td>
    <td class="modal-table-row">${s}</td>
    <td class="modal-table-row" >${e}</td>
  </tr> `}function et(t){const e=(t.tracks||[]).map(s=>tt(s)).join("");return`
  <div class="modal-album-container">
<p class="modal-album-name">${t.strAlbum}</p> 
<table class="albums-table-js">
<tr>
<th class="modal-table-header">Track</th>
<th class="modal-table-header">Time</th>
<th class="modal-table-header">Link</th>
</tr>
${e}
</table>
</div>`}function st(t){const e=document.querySelector(".albums-list-js"),s=(t.albumsList||[]).map(a=>et(a)).join("");e.insertAdjacentHTML("beforeend",s)}function at(){const t=document.querySelector(".modal-close-btn-js"),e=document.querySelector(".modal-window-js"),s=document.querySelector(".modal-content");e.addEventListener("click",a=>{s.contains(a.target)||f()},{once:!0}),t.addEventListener("click",f,{once:!0}),window.addEventListener("keydown",function(a){a.key==="Escape"&&f()},{once:!0})}function ot(){h(),document.querySelector(".modal-window-js").classList.add("modal-active"),document.body.style.overflow="hidden"}function f(){document.querySelector(".modal-window-js").classList.remove("modal-active"),document.body.style.overflow=""}function rt(){const t=document.querySelector(".modal-loader-js");t.style.display="flex"}function h(){const t=document.querySelector(".modal-loader-js");t.style.display="none"}function nt(t){const e=Math.floor(t/6e4),s=(t%6e4/1e3).toFixed(0);return s==60?e+1+":00":e+":"+(s<10?"0":"")+s}function it(){const t=document.querySelector(".hero-btn-js"),e=document.getElementById("artists");function s(a){const o=window.scrollY,n=a.getBoundingClientRect().top+o-o,u=800;let g=null;function b($){g||(g=$);const A=$-g,c=Math.min(A/u,1),B=c<.5?4*c*c*c:1-Math.pow(-2*c+2,3)/2;window.scrollTo(0,o+n*B),A<u&&requestAnimationFrame(b)}requestAnimationFrame(b)}t&&e&&t.addEventListener("click",function(){s(e)})}it();
//# sourceMappingURL=index.js.map
