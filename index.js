import{a as L,i as d}from"./assets/vendor-CCIwLLD6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const A=L.create({baseURL:"https://sound-wave.b.goit.study/api/artists",headers:{},params:{limit:8}});async function b(t){return(await A.get("",{params:{page:t}})).data}let r,m;document.addEventListener("DOMContentLoaded",S);async function S(t){t.preventDefault(),r=1;try{const e=await b(r);if(m=Math.ceil(e.totalArtists/8),e.artists.length===0){d.show({title:"Oops",message:"The are no artists found..."}),c();return}else M(e.artists),c(),j()}catch{m=0,d.show({title:"Oops",message:"An error must have occurred"}),c()}}function j(){if(m>r)B();else if(r===m){x(),d.show({title:"Wow",message:"You have reached the end of the list"});return}}function M(t){const e=document.querySelector(".artists-list-js"),s=t.map(o=>$(o)).join("");e.innerHTML=s}function $(t){const e=t.genres.map(o=>q(o)).join("");let s;return t.strBiographyEN.length>120?s=t.strBiographyEN.slice(0,120)+"...":s=t.strBiographyEN,` <li class="artists-list-item">
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
    </li>`}function q(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function E(t){const e=document.querySelector(".artists-list-js"),s=t.map(o=>$(o)).join("");e.insertAdjacentHTML("beforeend",s)}function k(){const t=document.querySelector(".artist-loader-js");t.style.display="flex"}function c(){const t=document.querySelector(".artist-loader-js");t.style.display="none"}function B(){document.querySelector(".artists-load-js").classList.add("artists-load-more")}function x(){document.querySelector(".artists-load-js").classList.remove("artists-load-more")}const T=document.querySelector(".artists-load-js");T.addEventListener("click",O);async function O(t){t.preventDefault(),r+=1,k();try{const e=await b(r);c(),E(e.artists),j()}catch{d.show({title:"Oops",message:"An error must have occurred"}),c()}}console.log("Im feedback");document.querySelectorAll(".nav-list a").forEach(t=>{t.addEventListener("click",()=>{document.getElementById("menu-toggle").checked=!1})});const v={artistsList:document.querySelector(".artists-list-js")};W();function W(){let t;v.artistsList.addEventListener("click",async function(e){const s=e.target.closest(".artists-learn-js");if(s&&v.artistsList.contains(s)){t=s.dataset.artistId;try{H();const o=await L.get(`https://sound-wave.b.goit.study/api/artists/${t}/albums`);p(),G(),P(o.data),F(o.data),D()}catch{p(),u(),d.show({title:"Oops",message:"An error must have occurred"})}}})}function P(t){const e=document.querySelector(".modal-window-js"),s=t.genres.map(a=>Y(a)).join(""),o=`<div class="modal-content">
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
  </div>`;e.innerHTML=o,p()}function Y(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function I(t){let e;t.movie?e=`<a href="${t.movie}" target="_blank"> <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5933 2.41614C20.4794 1.99354 20.2568 1.60815 19.9477 1.29831C19.6386 0.988473 19.2537 0.765003 18.8313 0.650142C17.2653 0.220142 11.0003 0.213142 11.0003 0.213142C11.0003 0.213142 4.73633 0.206142 3.16933 0.617142C2.74725 0.737289 2.36315 0.963919 2.0539 1.27528C1.74464 1.58663 1.52062 1.97226 1.40333 2.39514C0.99033 3.96114 0.98633 7.20914 0.98633 7.20914C0.98633 7.20914 0.98233 10.4731 1.39233 12.0231C1.62233 12.8801 2.29733 13.5571 3.15533 13.7881C4.73733 14.2181 10.9853 14.2251 10.9853 14.2251C10.9853 14.2251 17.2503 14.2321 18.8163 13.8221C19.2388 13.7075 19.6241 13.4845 19.934 13.1753C20.2439 12.8661 20.4677 12.4814 20.5833 12.0591C20.9973 10.4941 21.0003 7.24714 21.0003 7.24714C21.0003 7.24714 21.0203 3.98214 20.5933 2.41614ZM8.99633 10.2181L9.00133 4.21814L14.2083 7.22314L8.99633 10.2181Z" fill="white" />
</svg></a>`:e="";const s=Z(t.intDuration);return` <tr>
    <td class="modal-table-row">${t.strTrack}</td>
    <td class="modal-table-row">${s}</td>
    <td class="modal-table-row" >${e}</td>
  </tr> `}function N(t){const e=(t.tracks||[]).map(s=>I(s)).join("");return`
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
</div>`}function F(t){const e=document.querySelector(".albums-list-js"),s=(t.albumsList||[]).map(o=>N(o)).join("");e.insertAdjacentHTML("beforeend",s)}function D(){const t=document.querySelector(".modal-close-btn-js"),e=document.querySelector(".modal-window-js"),s=document.querySelector(".modal-content");e.addEventListener("click",o=>{s.contains(o.target)||u()},{once:!0}),t.addEventListener("click",u,{once:!0}),window.addEventListener("keydown",function(o){o.key==="Escape"&&u()},{once:!0})}function G(){p(),document.querySelector(".modal-window-js").classList.add("modal-active"),document.body.style.overflow="hidden"}function u(){document.querySelector(".modal-window-js").classList.remove("modal-active"),document.body.style.overflow=""}function H(){const t=document.querySelector(".modal-loader-js");t.style.display="flex"}function p(){const t=document.querySelector(".modal-loader-js");t.style.display="none"}function Z(t){const e=Math.floor(t/6e4),s=(t%6e4/1e3).toFixed(0);return s==60?e+1+":00":e+":"+(s<10?"0":"")+s}function R(){const t=document.querySelector(".hero-btn-js"),e=document.getElementById("artists");function s(o){const a=window.scrollY,i=o.getBoundingClientRect().top+a-a,h=800;let f=null;function g(w){f||(f=w);const y=w-f,l=Math.min(y/h,1),C=l<.5?4*l*l*l:1-Math.pow(-2*l+2,3)/2;window.scrollTo(0,a+i*C),y<h&&requestAnimationFrame(g)}requestAnimationFrame(g)}t&&e&&t.addEventListener("click",function(){s(e)})}R();
//# sourceMappingURL=index.js.map
