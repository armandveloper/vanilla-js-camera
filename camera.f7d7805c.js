parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"BSBt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.deletePhoto=exports.downloadPhoto=exports.takePhoto=exports.showBigPhoto=exports.$photoPreview=exports.$btnDownload=exports.$btnDelete=exports.$btnTakePhoto=exports.$canvas=exports.$camera=void 0;const e=document.getElementById("camera"),t=document.getElementById("photo-taker"),o=document.getElementById("btn-take-photo"),s=document.getElementById("btn-delete"),a=document.getElementById("btn-download"),l=document.getElementById("photo-preview");exports.$photoPreview=l,exports.$btnDownload=a,exports.$btnDelete=s,exports.$btnTakePhoto=o,exports.$canvas=t,exports.$camera=e;const i=()=>{isPhotoAvailable&&(s.classList.add("show"),a.classList.add("show"))},d=()=>{isPhotoAvailable||(s.classList.remove("show"),a.classList.remove("show"))},n=()=>{new Audio("audio/sound.mp3").play(),t.getContext("2d").drawImage(e,0,0,width,height);const o=t.toDataURL("image/jpeg");l.src=o,l.classList.remove("photo__preview--unavailable"),isPhotoAvailable=!0,isPhotoAvailable&&(s.classList.add("show"),a.classList.add("show"))};exports.takePhoto=n;const r=()=>{isPhotoAvailable&&(l.classList.remove("show"),isPhotoAvailable=!1,isPhotoAvailable||(s.classList.remove("show"),a.classList.remove("show")),l.classList.add("photo__preview--unavailable"))};exports.deletePhoto=r;const c=()=>{if(!isPhotoAvailable)return;const e=document.createElement("a");e.download="img-"+(new Date).getTime(),e.href=l.getAttribute("src"),e.click()};exports.downloadPhoto=c;const h=()=>{const e=document.createElement("div");e.className="modal__overlay";const t=new Image(width,height);t.alt="Image view",t.src=l.getAttribute("src"),t.className="modal__img",e.appendChild(t),$app.appendChild(e),e.addEventListener("click",t=>{let{target:o}=t;o===e&&(e.classList.add("out"),setTimeout(()=>e.remove(),405))})};exports.showBigPhoto=h;
},{}]},{},["BSBt"], null)
//# sourceMappingURL=/vanilla-js-camera/camera.f7d7805c.js.map