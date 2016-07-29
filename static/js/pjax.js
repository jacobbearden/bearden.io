!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Pjax=t()}}(function(){return function t(e,o,n){function s(r,a){if(!o[r]){if(!e[r]){var c="function"==typeof require&&require;if(!a&&c)return c(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=o[r]={exports:{}};e[r][0].call(l.exports,function(t){var o=e[r][1][t];return s(o?o:t)},l,l.exports,t,e,o,n)}return o[r].exports}for(var i="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e,o){var n=t("./lib/clone.js"),s=t("./lib/execute-scripts.js"),i=t("./lib/foreach-els.js"),r=t("./lib/uniqueid.js"),a=t("./lib/events/on.js"),c=t("./lib/events/trigger.js"),l=function(e){this.firstrun=!0;var o=t("./lib/proto/parse-options.js");o.apply(this,[e]),this.log("Pjax options",this.options),this.maxUid=this.lastUid=r(),this.parseDOM(document),a(window,"popstate",function(t){if(t.state){var e=n(this.options);e.url=t.state.url,e.title=t.state.title,e.history=!1,t.state.uid<this.lastUid?e.backward=!0:e.forward=!0,this.lastUid=t.state.uid,this.loadUrl(t.state.url,e)}}.bind(this))};if(l.prototype={log:t("./lib/proto/log.js"),getElements:t("./lib/proto/get-elements.js"),parseDOM:t("./lib/proto/parse-dom.js"),refresh:t("./lib/proto/refresh.js"),reload:t("./lib/reload.js"),attachLink:t("./lib/proto/attach-link.js"),forEachSelectors:function(e,o,n){return t("./lib/foreach-selectors.js").bind(this)(this.options.selectors,e,o,n)},switchSelectors:function(e,o,n,s){return t("./lib/switches-selectors.js").bind(this)(this.options.switches,this.options.switchesOptions,e,o,n,s)},latestChance:function(t){window.location=t},onSwitch:function(){c(window,"resize scroll")},loadContent:function(t,e){var o=document.implementation.createHTMLDocument(),n=/<html[^>]+>/gi,r=/\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi,a=t.match(n);if(a&&a.length&&(a=a[0].match(r),a.length&&(a.shift(),a.forEach(function(t){var e=t.trim().split("=");1===e.length?o.documentElement.setAttribute(e[0],!0):o.documentElement.setAttribute(e[0],e[1].slice(1,-1))}))),o.documentElement.innerHTML=t,this.log("load content",o.documentElement.attributes,o.documentElement.innerHTML.length),document.activeElement&&!document.activeElement.value)try{document.activeElement.blur()}catch(c){}this.switchSelectors(this.options.selectors,o,document,e);var l=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();l&&document.activeElement!==l&&l.focus(),this.options.selectors.forEach(function(t){i(document.querySelectorAll(t),function(t){s(t)})})},doRequest:t("./lib/request.js"),loadUrl:function(t,e){this.log("load href",t,e),c(document,"pjax:send",e),this.doRequest(t,function(o){if(o===!1)return void c(document,"pjax:complete pjax:error",e);document.activeElement.blur();try{this.loadContent(o,e)}catch(n){if(this.options.debug)throw n;return console&&console.error&&console.error("Pjax switch fail: ",n),void this.latestChance(t)}e.history&&(this.firstrun&&(this.lastUid=this.maxUid=r(),this.firstrun=!1,window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid},document.title)),this.lastUid=this.maxUid=r(),window.history.pushState({url:t,title:e.title,uid:this.maxUid},e.title,t)),this.forEachSelectors(function(t){this.parseDOM(t)},this),c(document,"pjax:complete pjax:success",e),e.analytics(),e.scrollTo!==!1&&(e.scrollTo.length>1?window.scrollTo(e.scrollTo[0],e.scrollTo[1]):window.scrollTo(0,e.scrollTo))}.bind(this))}},l.isSupported=t("./lib/is-supported.js"),l.isSupported())e.exports=l;else{var u=function(){};for(var h in l.prototype)l.prototype.hasOwnProperty(h)&&"function"==typeof l.prototype[h]&&(u[h]=u);e.exports=u}},{"./lib/clone.js":2,"./lib/events/on.js":4,"./lib/events/trigger.js":5,"./lib/execute-scripts.js":6,"./lib/foreach-els.js":7,"./lib/foreach-selectors.js":8,"./lib/is-supported.js":9,"./lib/proto/attach-link.js":11,"./lib/proto/get-elements.js":12,"./lib/proto/log.js":13,"./lib/proto/parse-dom.js":14,"./lib/proto/parse-options.js":16,"./lib/proto/refresh.js":17,"./lib/reload.js":18,"./lib/request.js":19,"./lib/switches-selectors.js":20,"./lib/uniqueid.js":22}],2:[function(t,e,o){e.exports=function(t){if(null===t||"object"!=typeof t)return t;var e=t.constructor();for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);return e}},{}],3:[function(t,e,o){e.exports=function(t){var e=t.text||t.textContent||t.innerHTML||"",o=document.querySelector("head")||document.documentElement,n=document.createElement("script");if(e.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",t),!1;n.type="text/javascript";try{n.appendChild(document.createTextNode(e))}catch(s){n.text=e}return o.insertBefore(n,o.firstChild),o.removeChild(n),!0}},{}],4:[function(t,e,o){var n=t("../foreach-els");e.exports=function(t,e,o,s){e="string"==typeof e?e.split(" "):e,e.forEach(function(e){n(t,function(t){t.addEventListener(e,o,s)})})}},{"../foreach-els":7}],5:[function(t,e,o){var n=t("../foreach-els");e.exports=function(t,e,o){e="string"==typeof e?e.split(" "):e,e.forEach(function(e){var s;s=document.createEvent("HTMLEvents"),s.initEvent(e,!0,!0),s.eventName=e,o&&Object.keys(o).forEach(function(t){s[t]=o[t]}),n(t,function(t){var e=!1;t.parentNode||t===document||t===window||(e=!0,document.body.appendChild(t)),t.dispatchEvent(s),e&&t.parentNode.removeChild(t)})})}},{"../foreach-els":7}],6:[function(t,e,o){var n=t("./foreach-els"),s=t("./eval-script");e.exports=function(t){n(t.querySelectorAll("script"),function(t){t.type&&"text/javascript"!==t.type.toLowerCase()||(t.parentNode&&t.parentNode.removeChild(t),s(t))})}},{"./eval-script":3,"./foreach-els":7}],7:[function(t,e,o){e.exports=function(t,e,o){return t instanceof HTMLCollection||t instanceof NodeList||t instanceof Array?Array.prototype.forEach.call(t,e,o):e.call(o,t)}},{}],8:[function(t,e,o){var n=t("./foreach-els");e.exports=function(t,e,o,s){s=s||document,t.forEach(function(t){n(s.querySelectorAll(t),e,o)})}},{"./foreach-els":7}],9:[function(t,e,o){e.exports=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}},{}],10:[function(t,e,o){Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),o=this,n=function(){},s=function(){return o.apply(this instanceof n&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return n.prototype=this.prototype,s.prototype=new n,s})},{}],11:[function(t,e,o){t("../polyfills/Function.prototype.bind");var n=t("../events/on"),s=t("../clone"),i="data-pjax-click-state",r="data-pjax-keyup-state",a=function(t,e){return e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey?void t.setAttribute(i,"modifier"):t.protocol!==window.location.protocol||t.host!==window.location.host?void t.setAttribute(i,"external"):t.pathname===window.location.pathname&&t.hash.length>0?void t.setAttribute(i,"anchor-present"):t.hash&&t.href.replace(t.hash,"")===window.location.href.replace(location.hash,"")?void t.setAttribute(i,"anchor"):t.href===window.location.href.split("#")[0]+"#"?void t.setAttribute(i,"anchor-empty"):(e.preventDefault(),this.options.currentUrlFullReload&&t.href===window.location.href.split("#")[0]?(t.setAttribute(i,"reload"),void this.reload()):(t.setAttribute(i,"load"),void this.loadUrl(t.href,s(this.options))))},c=function(t){return t.defaultPrevented||t.returnValue===!1};e.exports=function(t){var e=this;n(t,"click",function(o){c(o)||a.call(e,t,o)}),n(t,"keyup",function(o){return c(o)?void 0:o.which>1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey?void t.setAttribute(r,"modifier"):void(13==o.keyCode&&a.call(e,t,o))}.bind(this))}},{"../clone":2,"../events/on":4,"../polyfills/Function.prototype.bind":10}],12:[function(t,e,o){e.exports=function(t){return t.querySelectorAll(this.options.elements)}},{}],13:[function(t,e,o){e.exports=function(){this.options.debug&&console&&("function"==typeof console.log?console.log.apply(console,arguments):console.log&&console.log(arguments))}},{}],14:[function(t,e,o){var n=t("../foreach-els"),s=t("./parse-element");e.exports=function(t){n(this.getElements(t),s,this)}},{"../foreach-els":7,"./parse-element":15}],15:[function(t,e,o){e.exports=function(t){switch(t.tagName.toLowerCase()){case"a":t.hasAttribute("data-pjax-click-state")||this.attachLink(t);break;case"form":throw"Pjax doesnt support <form> yet.";default:throw"Pjax can only be applied on <a> or <form> submit"}}},{}],16:[function(t,e,o){e.exports=function(t){this.options=t,this.options.elements=this.options.elements||"a[href], form[action]",this.options.selectors=this.options.selectors||["title",".js-Pjax"],this.options.switches=this.options.switches||{},this.options.switchesOptions=this.options.switchesOptions||{},this.options.history=this.options.history||!0,this.options.analytics=this.options.analytics||function(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})},this.options.scrollTo="undefined"==typeof this.options.scrollTo?0:this.options.scrollTo,this.options.cacheBust="undefined"==typeof this.options.cacheBust?!0:this.options.cacheBust,this.options.debug=this.options.debug||!1,this.options.switches.head||(this.options.switches.head=this.switchElementsAlt),this.options.switches.body||(this.options.switches.body=this.switchElementsAlt),"function"!=typeof t.analytics&&(t.analytics=function(){})}},{}],17:[function(t,e,o){e.exports=function(t){this.parseDOM(t||document)}},{}],18:[function(t,e,o){e.exports=function(){window.location.reload()}},{}],19:[function(t,e,o){e.exports=function(t,e){var o=new XMLHttpRequest;return o.onreadystatechange=function(){4===o.readyState&&(200===o.status?e(o.responseText,o):e(null,o))},this.options.cacheBust&&(t+=(/[?&]/.test(t)?"&":"?")+(new Date).getTime()),o.open("GET",t,!0),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.send(null),o}},{}],20:[function(t,e,o){var n=t("./foreach-els"),s=t("./switches");e.exports=function(t,e,o,i,r,a){o.forEach(function(o){var c=i.querySelectorAll(o),l=r.querySelectorAll(o);if(this.log&&this.log("Pjax switch",o,c,l),c.length!==l.length)throw"DOM doesn’t look the same on new loaded page: ’"+o+"’ - new "+c.length+", old "+l.length;n(c,function(n,i){var r=l[i];this.log&&this.log("newEl",n,"oldEl",r),t[o]?t[o].bind(this)(r,n,a,e[o]):s.outerHTML.bind(this)(r,n,a)},this)},this)}},{"./foreach-els":7,"./switches":21}],21:[function(t,e,o){var n=t("./events/on.js");e.exports={outerHTML:function(t,e){t.outerHTML=e.outerHTML,this.onSwitch()},innerHTML:function(t,e){t.innerHTML=e.innerHTML,t.className=e.className,this.onSwitch()},sideBySide:function(t,e,o,s){var i=Array.prototype.forEach,r=[],a=[],c=document.createDocumentFragment(),l="animationend webkitAnimationEnd MSAnimationEnd oanimationend",u=0,h=function(t){t.target==t.currentTarget&&(u--,0>=u&&r&&(r.forEach(function(t){t.parentNode&&t.parentNode.removeChild(t)}),a.forEach(function(t){t.className=t.className.replace(t.getAttribute("data-pjax-classes"),""),t.removeAttribute("data-pjax-classes")}),a=null,r=null,this.onSwitch()))}.bind(this);s=s||{},i.call(t.childNodes,function(t){r.push(t),t.classList&&!t.classList.contains("js-Pjax-remove")&&(t.hasAttribute("data-pjax-classes")&&(t.className=t.className.replace(t.getAttribute("data-pjax-classes"),""),t.removeAttribute("data-pjax-classes")),t.classList.add("js-Pjax-remove"),s.callbacks&&s.callbacks.removeElement&&s.callbacks.removeElement(t),s.classNames&&(t.className+=" "+s.classNames.remove+" "+(o.backward?s.classNames.backward:s.classNames.forward)),u++,n(t,l,h,!0))}),i.call(e.childNodes,function(t){if(t.classList){var e="";s.classNames&&(e=" js-Pjax-add "+s.classNames.add+" "+(o.backward?s.classNames.forward:s.classNames.backward)),s.callbacks&&s.callbacks.addElement&&s.callbacks.addElement(t),t.className+=e,t.setAttribute("data-pjax-classes",e),a.push(t),c.appendChild(t),u++,n(t,l,h,!0)}}),t.className=e.className,t.appendChild(c)}}},{"./events/on.js":4}],22:[function(t,e,o){e.exports=function(){var t=0;return function(){var e="pjax"+(new Date).getTime()+"_"+t;return t++,e}}()},{}]},{},[1])(1)});
