parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QdeU":[function(require,module,exports) {
function t(t){return o(t)||r(t)||n(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function r(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function o(t){if(Array.isArray(t))return i(t)}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()}function l(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),r=[t[n],t[e]];t[e]=r[0],t[n]=r[1]}}function c(t){for(var e=t.children.length;e>=0;e--)t.appendChild(t.children[Math.random()*e|0])}function u(t,e){for(var n=e,r=0;r<=n.children.length-1;r++){var o=t[r];o.classList.remove("open"),n.appendChild(o)}}function s(t){t[Math.floor(Math.random()*t.length)].classList.add("open")}function d(t){var e=t[0].parentElement;t.forEach(function(t){t.style.backgroundSize="".concat(e.offsetWidth,"px ").concat(e.offsetHeight,"px"),t.style.backgroundPosition="-".concat(t.offsetLeft,"px -").concat(t.offsetTop,"px")})}function f(t){var e={};return t.forEach(function(t,n){e[t.getAttribute("id")]={index:n,id:t.getAttribute("id")}}),e}function m(e){return t(document.querySelectorAll(".tile")).every(function(t,n){var r=t.getAttribute("id");return n===e[r].index})}function h(e){return!1!==e&&(t(document.querySelectorAll(".tile"))[Math.floor(parseFloat(e))-1].classList.contains("open")?{result:!0,index:Math.floor(parseFloat(e))}:{result:!1,index:Math.floor(parseFloat(e))})}function g(t,e){var n=t-Math.sqrt(e.length);return n>=0?g(n,e):1!==t}function p(t,e){var n=t+Math.sqrt(e.length);return n<=e.length?p(n,e):t!==e.length}function b(e,n){document.querySelector(".tile-container");var r,o,i,a=t(document.querySelectorAll(".tile")),l=n-1,c=a[e-1],u=a[l];r=c,o=u,i=document.createElement("div"),r.parentNode.insertBefore(i,r),o.parentNode.insertBefore(r,o),i.parentNode.insertBefore(o,i),i.parentNode.removeChild(i)}function v(t,e){var n=e.findIndex(function(e){return e.id===t.id})+1,r=Math.sqrt(e.length),o={top:{allow:!1,index:!1},bottom:{allow:!1,index:!1},left:{allow:!1,index:!1},right:{allow:!1,index:!1}},i=new Promise(function(t){t(h(n-r>=1&&n-r))}).then(function(t){o.top.allow=t.result,o.top.index=t.index}).catch(function(t){return console.error(t)}),a=new Promise(function(t){t(h(n+r<=e.length&&n+r))}).then(function(t){o.bottom.allow=t.result,o.bottom.index=t.index}).catch(function(t){return console.error(t)}),l=new Promise(function(t){var r=!1;n-1>=1&&(r=n-1,g(n,e)||(r=!1)),t(h(r))}).then(function(t){o.left.allow=t.result,o.left.index=t.index}).catch(function(t){return console.error(t)}),c=new Promise(function(t){var r=!1;n+1<=e.length&&(r=n+1,p(n,e)||(r=!1)),t(h(r))}).then(function(t){o.right.allow=t.result,o.right.index=t.index}).catch(function(t){return console.error(t)});Promise.all([i,a,l,c]).then(function(){if(Object.keys(o).length>0&&o.constructor===Object)for(var t in o)o[t]&&!0===o[t].allow&&b(n,o[t].index)})}function y(){var t=new TimelineMax;t.to(".sliding-tile-puzzle .tile",1,{scale:.75,rotate:"360deg",opacity:0,ease:"power3.easeIn",stagger:{grid:[4,4],from:"random",amount:1}}),t.to(".sliding-tile-puzzle .tile",1,{scale:1,rotate:"0deg",opacity:1,ease:"power3.easeOut",stagger:{grid:[4,4],from:"random",amount:1}})}window.addEventListener("load",function(){(new TimelineMax).fromTo(".sliding-tile-puzzle",1.5,{x:"-100%"},{x:"0",ease:Power4.easeInOut}).fromTo(".sliding-tile-puzzle .tile",1,{scale:"0",rotate:"-90deg"},{scale:"1",rotate:"0deg",ease:Power4.easeInOut},.5);var e=t(document.querySelectorAll(".tile")),n=[],r=document.querySelector(".tile-container"),o=document.getElementById("startButton"),i=document.getElementById("resetButton");d(e),e.forEach(function(e){e.id=a(),e.addEventListener("click",function(e){if(!e.target.classList.contains("open")){var o=t(document.querySelectorAll(".tile"));v(e.target,o),setTimeout(function(){m(n)&&!r.classList.contains("complete")&&(alert("Congratulations, you did it! 👏 🥳 🍾"),r.classList.add("complete"))},1e3)}})}),n=f(e),o.addEventListener("click",function(t){o.hasAttribute("disabled")||(y(),setTimeout(function(){c(r),s(e)},2e3),o.setAttribute("disabled",!0)),i.hasAttribute("disabled")&&i.removeAttribute("disabled"),r.classList.remove("complete")}),i.addEventListener("click",function(n){t(document.querySelectorAll(".tile"));i.hasAttribute("disabled")||(y(),setTimeout(function(){u(e,r)},2e3),i.setAttribute("disabled",!0)),o.hasAttribute("disabled")&&o.removeAttribute("disabled"),r.classList.add("complete")})},!1);
},{}]},{},["QdeU"], null)
//# sourceMappingURL=/sliding-tile-puzzle/app.dd03a0fa.js.map