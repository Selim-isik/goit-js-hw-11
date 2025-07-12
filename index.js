import{S as f,i as a,a as d}from"./assets/vendor-D52M-Kao.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const p=document.querySelector("#search-form"),m=document.querySelector('input[name="searchQuery"]'),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),y="51262986-c338856f457aa770ab0affaea",h="https://pixabay.com/api/",g=new f(".gallery a");function b(){l.style.display="block"}function L(){l.style.display="none"}function w(){c.innerHTML=""}function S(n){return n.map(({webformatURL:o,largeImageURL:t,tags:s,likes:e,views:r,comments:i,downloads:u})=>`
    <a href="${t}" class="photo-card">
      <img src="${o}" alt="${s}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${e}</p>
        <p><b>Views:</b> ${r}</p>
        <p><b>Comments:</b> ${i}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </a>
  `).join("")}async function q(n){const o={key:y,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};try{const{data:t}=await d.get(h,{params:o});return t.hits}catch(t){throw console.error("API Hatası:",t),t}}p.addEventListener("submit",async n=>{n.preventDefault();const o=m.value.trim();if(o){w(),b();try{const t=await q(o);if(t.length===0){a.error({title:"Oops",message:"No images found. Try a different keyword."});return}c.innerHTML=S(t),g.refresh()}catch{a.error({title:"Error",message:"Something went wrong while fetching images."})}finally{L()}}});
//# sourceMappingURL=index.js.map
