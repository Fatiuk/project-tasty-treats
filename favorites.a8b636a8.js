!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired7c6;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var i={id:t,exports:{}};return e[t]=i,r.call(i.exports,i,i.exports),i.exports}var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){a[t]=e},t.parcelRequired7c6=r),r("1ACZc"),r("kmL1J"),r("llppj"),r("8vL8o");var i=r("98PmS"),n=r("4LMMA"),o=document.querySelector(".nav-item:first-child"),c=document.querySelector(".nav-item:nth-child(2)"),s=document.querySelector(".favorites-hero"),l=document.querySelector(".favorites-categories"),d=document.querySelector(".favorites-default");o.classList.remove("current"),c.classList.add("current");var g=document.querySelector(".cards-list");!function(){var t,e=localStorage.getItem("localRecipes");if("[]"!==e){var a=JSON.parse(e);t=a.map((function(t){var e=t._id,a=t.title,r=t.description,i=t.rating,n=t.preview,o=t.category,c=parseFloat(i).toFixed(1);return'\n        <li class="cards-item favorites-li" data-category="'.concat(o,'" data-aos="flip-left" data-aos-duration="1000">\n                <picture>\n                  <source srcset="').concat(n,'" type="image/webp">\n                  <source srcset="').concat(n,'" type="image/jpeg">\n                  <img src="').concat(n,'" width="335" height="335" alt="').concat(a,'" class="card-img favorites-img" loading="lazy">\n                </picture>\n                <div class="test-div"></div>\n                <button type="button" class="btn-heard-icone favorites-icone-btn" aria-label="Add to Favorites">\n                    <svg class="cards-heard-icon favorites-heart-icone js-fill" width="22" height="22" viewBox="0 0 32 32">\n                        <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2.909" d="M15.991 6.848C13.325 3.731 8.88 2.893 5.54 5.747s-3.81 7.625-1.187 11c2.181 2.806 8.781 8.725 10.944 10.641.242.214.363.321.504.364a.668.668 0 0 0 .381 0c.141-.042.262-.149.504-.364 2.163-1.916 8.763-7.834 10.944-10.641 2.623-3.375 2.21-8.177-1.187-11.001s-7.785-2.015-10.451 1.101z" opacity=".5"/>\n                    </svg>\n                </button>\n                <h2 class="cards-item-title favorites-item-title">').concat(a,'</h2>\n                <p class="cards-item-text favorites-item-text">').concat(r,'</p>\n                \n                 <div class="card_star-rating favorites_star-rating"> \n                <p class="cards-raiting text-rating favorites-rating">').concat(c,'</p>\n                <div class="rating-wrapper wrapper favorites-rating-wrap">\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="one" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="two" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="three" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="four" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="five" id="all-stars">\n                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>\n                    </svg>\n                </div>\n                <button type="button" class="cards-item-btn favorites-item-btn" id="').concat(e,'">See recipe</button>\n\n                 </div> \n            </li>\n    ')})),g.innerHTML=t.join(""),(0,i.fillStars)(),s.style.display="block",window.innerWidth,l.style.display="flex",d.style.display="none",(0,n.saveIdToLocaleStorage)(),document.querySelectorAll(".btn-heard-icone").forEach((function(t){t.addEventListener("click",(function(){t.closest(".cards-item").style.display="none"}))}))}else l.style.display="none"}();var u=r("6JpON"),p=document.querySelector(".favorites-category-list");localStorage.getItem("localRecipes")?JSON.parse(localStorage.getItem("localRecipes")).forEach((function(t){if(!p.querySelector('button[data-category="'.concat(t.category,'"]'))){var e=document.createElement("li"),a=document.createElement("button");a.textContent=t.category,a.classList.add("favorites-category-button"),a.setAttribute("data-category",t.category),a.addEventListener("click",(function(){u.Notify.info("Selected category: ".concat(t.category));var e=t.category;document.querySelectorAll(".cards-item").forEach((function(t){var a=t.getAttribute("data-category");t.style.display=a!==e?"none":"block"}))})),document.querySelector(".all-categories.fav-btn").addEventListener("click",(function(){document.querySelectorAll(".cards-item").forEach((function(t){t.style.display="block"}))})),e.appendChild(a),p.appendChild(e)}})):u.Notify.warning("In favorites, there is no data about recipes.");r("5xtVg"),r("cQoPk"),r("7g0iq"),r("8EugP"),r("4B7kY")}();
//# sourceMappingURL=favorites.a8b636a8.js.map