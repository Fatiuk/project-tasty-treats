var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired7c6;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var i={id:t,exports:{}};return e[t]=i,r.call(i.exports,i,i.exports),i.exports}var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){a[t]=e},t.parcelRequired7c6=r),r("a6E9n"),r("dLm4j"),r("hgxEb"),r("dpZmf");var i=r("iKRv1"),n=r("b5rV1");const o=document.querySelector(".nav-item:first-child"),s=document.querySelector(".nav-item:nth-child(2)"),c=document.querySelector(".favorites-hero"),l=document.querySelector(".favorites-categories"),d=document.querySelector(".favorites-default");o.classList.remove("current"),s.classList.add("current");const g=document.querySelector(".cards-list");!function(){const t=localStorage.getItem("localRecipes");if("[]"!==t){!function(t){const e=t.map((({_id:t,title:e,description:a,rating:r,preview:i,category:n})=>`\n        <li class="cards-item favorites-li" data-category="${n}" data-aos="flip-left" data-aos-duration="1000">\n                <picture>\n                  <source srcset="${i}" type="image/webp">\n                  <source srcset="${i}" type="image/jpeg">\n                  <img src="${i}" width="335" height="335" alt="${e}" class="card-img favorites-img" loading="lazy">\n                </picture>\n                <div class="test-div"></div>\n                <button type="button" class="btn-heard-icone favorites-icone-btn" aria-label="Add to Favorites">\n                    <svg class="cards-heard-icon favorites-heart-icone js-fill" width="22" height="22" viewBox="0 0 32 32">\n                        <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2.909" d="M15.991 6.848C13.325 3.731 8.88 2.893 5.54 5.747s-3.81 7.625-1.187 11c2.181 2.806 8.781 8.725 10.944 10.641.242.214.363.321.504.364a.668.668 0 0 0 .381 0c.141-.042.262-.149.504-.364 2.163-1.916 8.763-7.834 10.944-10.641 2.623-3.375 2.21-8.177-1.187-11.001s-7.785-2.015-10.451 1.101z" opacity=".5"/>\n                    </svg>\n                </button>\n                <h2 class="cards-item-title favorites-item-title">${e}</h2>\n                <p class="cards-item-text favorites-item-text">${a}</p>\n                \n                 <div class="card_star-rating favorites_star-rating"> \n                <p class="cards-raiting text-rating favorites-rating">${parseFloat(r).toFixed(1)}</p>\n                <div class="rating-wrapper wrapper favorites-rating-wrap">\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="one" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="two" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="three" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="four" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="five" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                </div>\n                <button type="button" class="cards-item-btn favorites-item-btn" id="${t}">See recipe</button>\n\n                 </div> \n            </li>\n    `));g.innerHTML=e.join(""),(0,i.fillStars)()}(JSON.parse(t)),c.style.display="block",window.innerWidth,l.style.display="flex",d.style.display="none",(0,n.saveIdToLocaleStorage)(),document.querySelectorAll(".btn-heard-icone").forEach((t=>{t.addEventListener("click",(()=>{t.closest(".cards-item").style.display="none"}))}))}else l.style.display="none"}();var p=r("7Y9D8");const u=document.querySelector(".favorites-category-list");if(localStorage.getItem("localRecipes")){JSON.parse(localStorage.getItem("localRecipes")).forEach((t=>{if(!u.querySelector(`button[data-category="${t.category}"]`)){const e=document.createElement("li"),a=document.createElement("button");a.textContent=t.category,a.classList.add("favorites-category-button"),a.setAttribute("data-category",t.category),a.addEventListener("click",(()=>{p.Notify.info(`Selected category: ${t.category}`);const e=t.category;document.querySelectorAll(".cards-item").forEach((t=>{const a=t.getAttribute("data-category");t.style.display=a!==e?"none":"block"}))}));document.querySelector(".all-categories.fav-btn").addEventListener("click",(()=>{document.querySelectorAll(".cards-item").forEach((t=>{t.style.display="block"}))})),e.appendChild(a),u.appendChild(e)}}))}else p.Notify.warning("In favorites, there is no data about recipes.");r("bTcpz"),r("jJkRO"),r("aXcAs"),r("2pHf3"),r("jhjcb");
//# sourceMappingURL=favorites.39a49013.js.map
