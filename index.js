import{a as h,i as n}from"./assets/vendor-CCIwLLD6.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const L=h.create({baseURL:"https://sound-wave.b.goit.study/api/artists",headers:{},params:{limit:8}});async function f(t){return(await L.get("",{params:{page:t}})).data}let i,d;document.addEventListener("DOMContentLoaded",v);async function v(t){t.preventDefault(),i=1;try{const e=await f(i);if(d=Math.ceil(e.totalArtists/8),e.artists.length===0){n.show({title:"Oops",message:"The are no artists found..."}),l();return}else y(e.artists),l(),g()}catch{d=0,n.show({title:"Oops",message:"An error must have occurred"}),l()}}function g(){if(d>i)C();else if(i===d){A(),n.show({title:"Wow",message:"You have reached the end of the list"});return}}function y(t){const e=document.querySelector(".artists-list-js"),s=t.map(o=>w(o)).join("");e.innerHTML=s}function w(t){const e=t.genres.map(o=>b(o)).join("");let s;return t.strBiographyEN.length>120?s=t.strBiographyEN.slice(0,120)+"...":s=t.strBiographyEN,` <li class="artists-list-item">
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
    </li>`}function b(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function $(t){const e=document.querySelector(".artists-list-js"),s=t.map(o=>w(o)).join("");e.insertAdjacentHTML("beforeend",s)}function j(){const t=document.querySelector(".artist-loader-js");t.style.display="flex"}function l(){const t=document.querySelector(".artist-loader-js");t.style.display="none"}function C(){document.querySelector(".artists-load-js").classList.add("artists-load-more")}function A(){document.querySelector(".artists-load-js").classList.remove("artists-load-more")}const M=document.querySelector(".artists-load-js");M.addEventListener("click",S);async function S(t){t.preventDefault(),i+=1,j();try{const e=await f(i);l(),$(e.artists),g()}catch{n.show({title:"Oops",message:"An error must have occurred"}),l()}}console.log("Im feedback");console.log("Im header");const p={artistsList:document.querySelector(".artists-list-js")};q();function q(){let t;p.artistsList.addEventListener("click",async function(e){const s=e.target.closest(".artists-learn-js");if(s&&p.artistsList.contains(s)){t=s.dataset.artistId;try{P();const o=await h.get(`https://sound-wave.b.goit.study/api/artists/${t}/albums`);u(),W(),x(o.data),E(o.data),O()}catch{u(),c(),n.show({title:"Oops",message:"An error must have occurred"})}}})}function x(t){const e=document.querySelector(".modal-window-js"),s=t.genres.map(a=>k(a)).join(""),o=`<div class="modal-content">
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
  </div>`;e.innerHTML=o,u()}function k(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function T(t){let e;t.movie?e=`<a href="${t.movie}" target="_blank"> <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5933 2.41614C20.4794 1.99354 20.2568 1.60815 19.9477 1.29831C19.6386 0.988473 19.2537 0.765003 18.8313 0.650142C17.2653 0.220142 11.0003 0.213142 11.0003 0.213142C11.0003 0.213142 4.73633 0.206142 3.16933 0.617142C2.74725 0.737289 2.36315 0.963919 2.0539 1.27528C1.74464 1.58663 1.52062 1.97226 1.40333 2.39514C0.99033 3.96114 0.98633 7.20914 0.98633 7.20914C0.98633 7.20914 0.98233 10.4731 1.39233 12.0231C1.62233 12.8801 2.29733 13.5571 3.15533 13.7881C4.73733 14.2181 10.9853 14.2251 10.9853 14.2251C10.9853 14.2251 17.2503 14.2321 18.8163 13.8221C19.2388 13.7075 19.6241 13.4845 19.934 13.1753C20.2439 12.8661 20.4677 12.4814 20.5833 12.0591C20.9973 10.4941 21.0003 7.24714 21.0003 7.24714C21.0003 7.24714 21.0203 3.98214 20.5933 2.41614ZM8.99633 10.2181L9.00133 4.21814L14.2083 7.22314L8.99633 10.2181Z" fill="white" />
</svg></a>`:e="";const s=N(t.intDuration);return` <tr>
    <td class="modal-table-row">${t.strTrack}</td>
    <td class="modal-table-row">${s}</td>
    <td class="modal-table-row" >${e}</td>
  </tr> `}function B(t){const e=(t.tracks||[]).map(s=>T(s)).join("");return`
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
</div>`}function E(t){const e=document.querySelector(".albums-list-js"),s=(t.albumsList||[]).map(o=>B(o)).join("");e.insertAdjacentHTML("beforeend",s)}function O(){const t=document.querySelector(".modal-close-btn-js"),e=document.querySelector(".modal-window-js"),s=document.querySelector(".modal-content");e.addEventListener("click",o=>{s.contains(o.target)||c()},{once:!0}),t.addEventListener("click",c,{once:!0}),window.addEventListener("keydown",function(o){o.key==="Escape"&&c()},{once:!0})}function W(){u(),document.querySelector(".modal-window-js").classList.add("modal-active"),document.body.style.overflow="hidden"}function c(){document.querySelector(".modal-window-js").classList.remove("modal-active"),document.body.style.overflow=""}function P(){const t=document.querySelector(".modal-loader-js");t.style.display="flex"}function u(){const t=document.querySelector(".modal-loader-js");t.style.display="none"}function N(t){const e=Math.floor(t/6e4),s=(t%6e4/1e3).toFixed(0);return s==60?e+1+":00":e+":"+(s<10?"0":"")+s}
//# sourceMappingURL=index.js.map
