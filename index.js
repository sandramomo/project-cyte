import{a as p,i as l}from"./assets/vendor-BLO6kU33.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const h=p.create({baseURL:"https://sound-wave.b.goit.study/api/artists",headers:{},params:{limit:8}});async function u(t){return(await h.get("",{params:{page:t}})).data}let a,c;document.addEventListener("DOMContentLoaded",g);async function g(t){t.preventDefault(),a=1;try{const e=await u(a);if(c=Math.ceil(e.totalArtists/8),e.artists.length===0){l.show({title:"Oops",message:"The are no artists found..."}),n();return}else y(e.artists),n(),f()}catch{c=0,l.show({title:"Oops",message:"An error must have occurred"}),n()}}function f(){if(c>a)b();else if(a===c){j(),l.show({title:"Wow",message:"You have reached the end of the list"});return}}function y(t){const e=document.querySelector(".artists-list-js"),o=t.map(i=>m(i)).join("");e.innerHTML=o}function m(t){const e=t.genres.map(i=>L(i)).join("");let o;return t.strBiographyEN.length>120?o=t.strBiographyEN.slice(0,120)+"...":o=t.strBiographyEN,` <li class="artists-list-item">
      <ul class="artists-card">
        <li>
          <div class="artist-img-box">
            <img src="${t.strArtistThumb}"/>
          </div>
        </li>
        <li>
          <div>
            <ul class="artist-genres">${e}</ul>
          </div>
          <div class="artist-desc">
            <p class="artist-name"> ${t.strArtist}</p>
            <p class="artist-bio">${o} </p>
          </div>
        </li>
        <li>
          <button class="artists-learn-js artists-learn"> Learn more  <span class="artist-svg"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 14.9426L8 7.94263L0 0.942627V14.9426Z" fill="white" />
</svg></span> </button>
        </li>
      </ul>
    </li>`}function L(t){return`
  <li class="artist-genre">
  <p>${t}</p>
  </li>`}function v(t){const e=document.querySelector(".artists-list-js"),o=t.map(i=>m(i)).join("");e.insertAdjacentHTML("beforeend",o)}function w(){const t=document.querySelector(".artist-loader-js");t.style.display="flex"}function n(){const t=document.querySelector(".artist-loader-js");t.style.display="none"}function b(){document.querySelector(".artists-load-js").classList.add("artists-load-more")}function j(){document.querySelector(".artists-load-js").classList.remove("artists-load-more")}const A=document.querySelector(".artists-load-js");A.addEventListener("click",M);async function M(t){t.preventDefault(),a+=1,w();try{const e=await u(a);n(),v(e.artists),f()}catch{l.show({title:"Oops",message:"An error must have occurred"}),n()}}console.log("Im feedback");console.log("Im header");console.log("Im modal");
//# sourceMappingURL=index.js.map
