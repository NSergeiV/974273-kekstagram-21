(()=>{"use strict";window.creationArray=function(e,t){let n=[];for(;n.length<e;){let e=(o=1,i=t,o=Math.ceil(o),i=Math.floor(i),Math.floor(Math.random()*(i-o))+o),l=!1;for(let t=0;t<n.length;t++)if(n[t]===e){l=!0;break}l||(n[n.length]=e)}var o,i;return n},window.backend={requestServer:function(e,t,n){let o,i=new XMLHttpRequest;o=n?"https://21.javascript.pages.academy/kekstagram":"https://21.javascript.pages.academy/kekstagram/data",i.responseType="json",i.addEventListener("load",(function(){200===i.status?e(i.response):n?t():t("Статус ответа: "+i.status+" "+i.statusText)})),i.addEventListener("error",(function(){t("Произошла ошибка соединения с сервером")})),i.addEventListener("timeout",(function(){t(n?"Отправка данных не выполнена, долгое ожидание более "+i.timeout+"мс":"Запрос не успел выполниться за "+i.timeout+"мс")})),i.timeout=1e4,n?(i.open("POST",o),i.send(n)):(i.open("GET",o),i.send())},load:function(e,t){this.requestServer(e,t)},save:function(e,t,n){this.requestServer(e,t,n)}},window.popapTemplate=function(e,t,n){let o=document.querySelector(e).content.querySelector(t),i=document.querySelector("main"),l=o.cloneNode(!0),c=l.querySelector(n),r=function(e){e.keyCode===window.KODE_ESC&&a()},a=function(){l.remove(),document.body.classList.remove("modal-open"),c.removeEventListener("click",a),document.removeEventListener("keydown",r),document.removeEventListener("click",a)};document.body.classList.add("modal-open"),l.style="z-index: 100; margin: 0 auto; text-align: center; width: 100%",i.insertAdjacentElement("afterbegin",l),document.body.classList.add("modal-open"),c.addEventListener("click",a),document.addEventListener("keydown",r),document.addEventListener("click",a)},function(){const e=document.querySelector(".img-filters"),t=e.querySelector(".img-filters__form");let n=[],o=[];window.successHandler=function(t){n=t,window.creatingCollectionPictures(n,25),e.classList.remove("img-filters--inactive")},window.clearing=function(){const e=window.setupPictureList.querySelectorAll("a");for(let t=e.length-1;t>=0;t--){let n=e[t];n.parentElement.removeChild(n)}};const i=function(){let e=window.creationArray(10,n.length),t=[];for(let o=0;o<e.length;o++)t[o]=n[e[o]];window.debounce(t,10)},l=t.querySelectorAll(".img-filters__button");for(let e=0;e<l.length;e++){let t=l[e];t.addEventListener("click",(function(){switch(t.id){case"filter-default":window.debounce(n,25);break;case"filter-random":i();break;case"filter-discussed":o=n.slice(),o.sort((function(e,t){return t.comments.length-e.comments.length})),window.debounce(o,25)}}))}window.backend.load(window.successHandler,window.pullErrorHandler)}(),function(){let e=document.querySelector("#picture").content.querySelector(".picture");window.setupPictureList=document.querySelector(".pictures");let t=function(t){let n=e.cloneNode(!0);return n.querySelector(".picture__img").src=t.url,n.querySelector(".picture__likes").textContent=t.likes,n.querySelector(".picture__comments").textContent=t.comments.length,n};window.creatingCollectionPictures=function(e,n){window.endCollections=e;let o=document.createDocumentFragment();for(let i=0;i<n;i++)o.appendChild(t(e[i]));window.setupPictureList.appendChild(o),window.pictures=window.picturesBlock.querySelectorAll(".picture")}}(),function(){window.KODE_ESC=27;let e=document.querySelector(".big-picture"),t=e.querySelector(".big-picture__img"),n=e.querySelector(".social__comments"),o=e.querySelector(".social__comment-count"),i=e.querySelector(".social__comments-loader"),l=document.querySelector(".pictures"),c=e.querySelector(".likes-count"),r=e.querySelector(".social__header"),a=r.querySelector(".social__picture"),d=r.querySelector(".social__caption");window.picturesBlock=l;let s=n.querySelector(".social__comment").cloneNode(!0);const u=function(){let e=n.children;for(let n=e.length-1;n>=0;n--){var t=e[n];t.parentElement.removeChild(t)}};u();let m=[],w=[],f=0;const v=function(){let e=w.splice(0,5);f+=e.length,o.querySelector(".comments-count-here").textContent=f,0===w.length&&i.classList.add("hidden");for(let t=0;t<e.length;t++){let o=s.cloneNode(!0);o.querySelector("img").src=e[t].avatar,o.querySelector("img").alt=e[t].name,o.querySelector("p").textContent=e[t].message,n.appendChild(o)}};let g=function(){e.classList.remove("hidden"),document.body.classList.add("modal-open"),y.addEventListener("click",L),document.addEventListener("keydown",h),i.addEventListener("click",v)};const p=function(e){let t=null;t=e.src.match(/photos\/[0-9]+.jpg/g),window.endCollections.filter((function(e){e.url===t[0]&&(o.querySelector(".comments-count").textContent=e.comments.length,c.textContent=e.likes,a.src=e.url,d.textContent=e.description,m=e.comments,w=m.slice(),v())}))};l.addEventListener("keydown",(function(e){if(13===e.keyCode)for(let e=0;e<window.pictures.length;e++){let n=window.pictures[e];if(n===document.activeElement){g(),t.querySelector("img").src=n.querySelector("img").src,p(n.querySelector("img"));break}}})),l.addEventListener("click",(function(e){e.target&&e.target.matches('img[class="picture__img"]')&&(g(),t.querySelector("img").src=e.target.src,p(e.target))}));let y=e.querySelector(".big-picture__cancel"),h=function(e){27===e.keyCode&&L()},L=function(){e.classList.add("hidden"),u(),f=0,i.classList.remove("hidden"),document.body.classList.remove("modal-open"),y.removeEventListener("click",L),document.removeEventListener("keydown",h)}}(),function(){window.pushErrorHandler=function(){window.closePopapImgUpload(),window.popapTemplate("#error",".error",".error__button")};let e=document.createElement("div"),t=document.querySelector("main");window.pullErrorHandler=function(n){e.classList.add("error"),e.style="align-items: center;",e.textContent=n,t.insertAdjacentElement("afterbegin",e)}}(),function(){let e=document.querySelector("#upload-file"),t=document.querySelector(".img-upload__overlay"),n=t.querySelector("#upload-cancel"),o=document.querySelector('input[name="hashtags"]'),i=document.querySelector('textarea[name="description"]'),l=document.querySelector("#upload-select-image");window.hashtagFoImage=o,window.commentFoImage=i,window.imgUploadOverlay=t;let c=function(e){e.keyCode===window.KODE_ESC&&(o===document.activeElement?o.style.outlineColor="red":i===document.activeElement?i.style.outlineColor="red":(e.preventDefault(),a()))},r=function(){o!==document.activeElement&&(o.style.outlineColor="highlight"),i!==document.activeElement&&(i.style.outlineColor="highlight")},a=function(){t.classList.add("hidden"),l.reset(),window.imgUploadPreview.querySelector("img").classList.remove(window.className),window.imgUploadPreview.querySelector("img").style.filter="",document.body.classList.remove("modal-open"),document.querySelector('input[name="filename"]').value=null,document.removeEventListener("keydown",c),document.removeEventListener("click",r)};window.closePopapImgUpload=a,e.addEventListener("change",(function(){window.previewFoto(e),t.classList.remove("hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",c),document.addEventListener("click",r),window.effectLevel.classList.add("hidden"),window.effectLevelPin.style.left="100%",window.effectLevelDepth.style.width="100%",document.querySelector('input[name="scale"]').value="100%",window.SCALE_FOTO=1,window.imgUploadPreview.querySelector("img").style.transform="scale("+window.SCALE_FOTO+")"})),n.addEventListener("click",(function(){a()})),l.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save((function(){a(),window.popapTemplate("#success",".success",".success__button")}),window.pushErrorHandler,new FormData(l))}))}(),window.slider=function(e,t,n){e.addEventListener("mousedown",(function(o){o.preventDefault();let i={x:o.clientX+(9-o.offsetX)},l=t.offsetWidth,c=l/100,r=Math.floor(t.getBoundingClientRect().left),a=r,d=r+l,s=function(t){if(t.preventDefault(),t.clientX>=a&&t.clientX<d){let o={x:i.x-t.clientX};i.x=t.clientX,e.style.left=e.offsetLeft-o.x+"px",n.style.width=Math.floor((e.offsetLeft-o.x)/c)+"%";let l=Math.floor((e.offsetLeft-o.x)/c);window.changingEffect(l)}},u=function(e){e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",u)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",u)}))},window.changingEffect=function(e){let t=[{nameKl:"effects__preview--chrome",effectLevel:"grayscale",calculated:.01,unit:""},{nameKl:"effects__preview--sepia",effectLevel:"sepia",calculated:.01,unit:""},{nameKl:"effects__preview--marvin",effectLevel:"invert",calculated:1,unit:"%"},{nameKl:"effects__preview--phobos",effectLevel:"blur",calculated:.03,unit:"px"},{nameKl:"effects__preview--heat",effectLevel:"brightness",calculated:.02,unit:""}],n=function(e){return t.find((function(t){return t.nameKl===e}))};document.querySelector('input[name="effect-level"]').value=e,"effects__preview--heat"===window.className?window.imgUploadPreview.querySelector("img").style.filter=n(window.className).effectLevel+"("+(n(window.className).calculated*e+1)+n(window.className).unit+")":window.imgUploadPreview.querySelector("img").style.filter=n(window.className).effectLevel+"("+n(window.className).calculated*e+n(window.className).unit+")"},function(){let e=document.querySelector(".effects__list"),t=window.imgUploadOverlay.querySelector(".img-upload__preview"),n=window.imgUploadOverlay.querySelector(".effect-level"),o=document.querySelector(".effect-level__pin"),i=document.querySelector(".effect-level__line"),l=document.querySelector(".effect-level__depth");window.SCALE_FOTO=1,window.imgUploadPreview=t,window.className=void 0,window.effectLevelPin=o,window.effectLevelDepth=l,window.effectLevel=n,n.classList.add("hidden"),e.addEventListener("change",(function(e){e.target&&e.target.matches('input[type="radio"]')&&(window.imgUploadPreview.querySelector("img").classList.remove(window.className),window.imgUploadPreview.querySelector("img").classList.add("effects__preview--"+e.target.value),window.className="effects__preview--"+e.target.value,"none"===e.target.value?(n.classList.add("hidden"),t.querySelector("img").style.filter=""):(n.classList.remove("hidden"),window.changingEffect(100),o.style.left="100%",l.style.width="100%"))})),window.slider(o,i,l);let c=window.imgUploadOverlay.querySelector(".img-upload__scale"),r=c.querySelector(".scale__control--smaller"),a=c.querySelector(".scale__control--bigger"),d=document.querySelector('input[name="scale"]');d.value="100%";let s=function(){window.SCALE_FOTO<=.25?r.removeEventListener("click",s):(window.SCALE_FOTO-=.25,d.value=100*window.SCALE_FOTO+"%",a.addEventListener("click",u),window.imgUploadPreview.querySelector("img").style.transform="scale("+window.SCALE_FOTO+")")},u=function(){window.SCALE_FOTO>.75?a.removeEventListener("click",u):(window.SCALE_FOTO+=.25,d.value=100*window.SCALE_FOTO+"%",r.addEventListener("click",s),window.imgUploadPreview.querySelector("img").style.transform="scale("+window.SCALE_FOTO+")")};r.addEventListener("click",s),a.addEventListener("click",u)}(),window.hashtagFoImage.addEventListener("input",(function(e){let t=e.target,n=t.value.split("#"),o=function(e){return t.value.match(e)};null===t.value.match(/^(?! )/)?t.setCustomValidity("Уберите пробелы в начале строки"):t.value?t.value.match(/^#[A-Za-zА-ЯЁа-яё0-9_]+/g)?1===o(/#/g).length?t.value.match(/^#/g)?t.value.match(/^#[A-Za-zА-ЯЁа-яё0-9_]+/g)?t.value.match(/[A-Za-zА-ЯЁа-яё0-9_]+\s[A-Za-zА-ЯЁа-яё0-9_]+/g)?t.setCustomValidity("Хеш-тег не может содержать пробелов"):o(/[A-Za-zА-ЯЁа-яё0-9_]/g).length>20?t.setCustomValidity("Хеш-тег не может быть длиннее 20 символов."):t.setCustomValidity(""):t.setCustomValidity("Хеш-тег меньше двух символов"):t.setCustomValidity("В начале хеш-тега должно стаять - #"):t.value.match(/##/g)?t.setCustomValidity("Разделите ##"):t.value.match(/[A-Za-zА-ЯЁа-яё0-9_]+#/g)?t.setCustomValidity("Хеш-теги не разделены пробелами"):o(/#/g).length>5?t.setCustomValidity("Хеш-тегов не может быть больше пяти."):!1===function(e){let t=/([A-Za-zА-ЯЁа-яё0-9_]+)/g,o=!0;for(let e=1;e<n.length;e++)n[e].match(t)||(o=!1);return o}()?t.setCustomValidity("Хеш-тег не может состоять из одной #"):!1===function(e){let t=/(\s[A-Za-zА-ЯЁа-яё0-9_])(?:\s$)?/g,o=!0;for(let e=1;e<n.length;e++){let i=n[e];t.test(i)&&(o=!1)}return o}()?t.setCustomValidity("В хеш-теге пробел недопустим."):!1===function(e){let t=!0;for(let e=1;e<n.length;e++)19<n[e].replace(/\s/g,"").split("").length&&(t=!1);return t}()?t.setCustomValidity("Хеш-тег не может состоять больше 20 символов."):!1===function(){let e=!0;for(let t=1;t<n.length;t++){let o=/([A-Za-zА-ЯЁа-яё0-9_]+)\s/,i=n[t].replace(o,"$1");for(let o=t+1;o<n.length;o++){let t=/([A-Za-zА-ЯЁа-яё0-9_]+)\s?/,l=n[o].replace(t,"$1");i.toLowerCase()===l.toLowerCase()&&(e=!1)}}return e}()?t.setCustomValidity("У Вас одинаковые хеш-теги."):t.setCustomValidity(""):t.setCustomValidity("Нет хеш-тега."):t.setCustomValidity(""),t.validity.valid?t.style.outlineColor="highlight":t.style.outlineColor="red"})),window.commentFoImage.addEventListener("input",(function(e){let t=e.target;t.value.split("").length>140?t.setCustomValidity("Комментарий не может состоять больше 140 символов."):t.setCustomValidity("")})),function(){let e=null;window.debounce=function(t,n){e&&window.clearTimeout(e),e=window.setTimeout((function(){window.clearing(),window.creatingCollectionPictures(t,n)}),500)}}(),function(){const e=["gif","jpg","jpeg","png"];let t=document.querySelector(".img-upload__preview").querySelector("img");window.previewFoto=n=>{let o=n.files[0],i=o.name.toLowerCase();if(e.some((function(e){return i.endsWith(e)}))){let e=new FileReader;e.addEventListener("load",(function(){t.src=e.result})),e.readAsDataURL(o)}}}()})();