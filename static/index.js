parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"/xJO":[function(require,module,exports) {
"use strict";function e(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}function n(e,n,t,r){var o,u=[].map,l=r&&r.children[0]||null,i=l&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(l),a=[],f=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(g(n,c),r)),u&&u!==(t=g(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function v(e){return"function"==typeof e?v(e(c,s)):null!=e?e:""}function d(){o=!o;var e=v(t);for(r&&!o&&(l=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var l=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName);var o=n.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=v(n.children[u]),t));for(var l in o)b(r,l,o[l],null,t)}return r}(o,u);n.insertBefore(l,t),null!=r&&k(n,t,r),t=l}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=f?t.oncreate:t.onupdate;u&&a.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var i={},c={},s=[],d=r.children,h=o.children,m=0;m<d.length;m++){s[m]=t.childNodes[m];var g=y(d[m]);null!=g&&(i[g]=[s[m],d[m]])}for(var m=0,N=0;N<h.length;){var g=y(d[m]),w=y(h[N]=v(h[N]));if(c[g])m++;else if(null==w||f)null==g&&(e(t,s[m],d[m],h[N],u),N++),m++;else{var x=i[w]||[];g===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}}for(;m<d.length;)null==y(d[m])&&k(t,s[m],d[m]),m++;for(var m in i)c[m]||k(t,i[m][0],i[m][1])}return t}(r,l,i,i=e)),f=!1;a.length;)a.pop()()}function h(){o||(o=!0,setTimeout(d))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function g(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function y(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var l=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,l):e[n][u]=l}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.app=n;
},{}],"CElP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Link=n;var t=require("hyperapp");function e(t){return t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")}function r(t){return e(location)!==e(t)}function n(e,n){return function(o,a){var u=e.to,c=o.location,i=e.onclick;return delete e.to,delete e.location,e.href=u,e.onclick=function(t){i&&i(t),t.defaultPrevented||0!==t.button||t.altKey||t.metaKey||t.ctrlKey||t.shiftKey||"_blank"===e.target||r(t.currentTarget)||(t.preventDefault(),u!==c.pathname&&history.pushState(c.pathname,"",u))},(0,t.h)("a",e,n)}}
},{"hyperapp":"/xJO"}],"bG11":[function(require,module,exports) {
"use strict";function e(e,t,r,n){return{isExact:e,path:t,url:r,params:n}}function t(e){for(var t=e.length;"/"===e[--t];);return e.slice(0,t+1)}function r(e){try{return decodeURIComponent(e)}catch(t){return e}}function n(n,i,u){if(n===i||!n)return e(n===i,n,i);var l=u&&u.exact,c=t(n).split("/"),o=t(i).split("/");if(!(c.length>o.length||l&&c.length<o.length)){var s=0,a={},f=c.length;for(i="";s<f;s++){if(":"===c[s][0])a[c[s].slice(1)]=o[s]=r(o[s]);else if(c[s]!==o[s])return;i+=o[s]+"/"}return e(!1,n,i.slice(0,-1),a)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseRoute=n;
},{}],"TbmE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Route=t;var e=require("./parseRoute");function t(t){return function(r,a){var o=r.location,n=(0,e.parseRoute)(t.path,o.pathname,{exact:!t.parent});return n&&t.render({match:n,location:o})}}
},{"./parseRoute":"bG11"}],"qGuk":[function(require,module,exports) {
"use strict";function e(e,t){return function(e,r){for(var n,o=0;!(n=t[o]&&t[o](e,r))&&o<t.length;)o++;return n}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Switch=e;
},{}],"yBO4":[function(require,module,exports) {
"use strict";function e(e){return function(t,r){var o=t.location;history.replaceState(e.from||o.pathname,"",e.to)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Redirect=e;
},{}],"rO79":[function(require,module,exports) {
"use strict";function t(t){return t.reduce(function(t,e){var n=history[e];return history[e]=function(t,e,o){n.call(this,t,e,o),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=n,t&&t()}},null)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.location=void 0;var e={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(e){function n(t){e.set({pathname:window.location.pathname,previous:t.detail?window.location.previous=t.detail:window.location.previous})}var o=t(["pushState","replaceState"]);return addEventListener("pushstate",n),addEventListener("popstate",n),function(){removeEventListener("pushstate",n),removeEventListener("popstate",n),o()}}};exports.location=e;
},{}],"z3Fd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Link",{enumerable:!0,get:function(){return e.Link}}),Object.defineProperty(exports,"Route",{enumerable:!0,get:function(){return r.Route}}),Object.defineProperty(exports,"Switch",{enumerable:!0,get:function(){return t.Switch}}),Object.defineProperty(exports,"Redirect",{enumerable:!0,get:function(){return n.Redirect}}),Object.defineProperty(exports,"location",{enumerable:!0,get:function(){return i.location}});var e=require("./Link"),r=require("./Route"),t=require("./Switch"),n=require("./Redirect"),i=require("./location");
},{"./Link":"CElP","./Route":"TbmE","./Switch":"qGuk","./Redirect":"yBO4","./location":"rO79"}],"DxrP":[function(require,module,exports) {
function r(r,e,n){return e in r?Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[e]=n,r}module.exports={updateField:function(e){var n=e.formname,o=e.fieldname,t=e.value;return function(e){return console.log("Update ",n,o,t),{forms:Object.assign({},e.forms,r({},n,Object.assign({},e.forms[n],r({},o,t))))}}},addErrors:function(e){var n=e.formname,o=e.errors;return function(e){return console.log("Add errors ",o),{forms:Object.assign({},e.forms,r({},n,Object.assign({},e.forms[n],{errors:o})))}}},searchAction:function(r){return function(e,n){if(r)return n.load(e.current.split("?")[0]),{forms:Object.assign({},e.forms,{search:{}})};var o=Object.keys(e.forms.search).map(function(r){return encodeURIComponent(r)+"="+encodeURIComponent(e.forms.search[r])}).join("&");n.load(e.current.split("?")[0]+"?"+o)}}};
},{}],"6zvG":[function(require,module,exports) {
"use strict";var e=require("./forms.js");module.exports={login:function(e){return function(n,t){t.updateLoading(!0);var o={username:n.forms.login.username,password:n.forms.login.password};fetch(g_urls.login,{method:"POST",body:JSON.stringify(o),headers:{"content-type":"application/json"}}).then(function(e){return e.json()}).then(function(o){o.key?(console.log("OK",o.key,n.forms.login.username),t.updateLogin({key:o.key,username:n.forms.login.username}),e.location.go("/"),e.toasts.add({text:"Successfully logged in!",style:"success"})):e.toasts.add({text:"Error while logging in - please try again!",style:"error"}),t.updateLoading(!1)})}},logout:function(e){return function(n,t){t.updateLoading(!0),setTimeout(function(){return fetch(g_urls.logout,{method:"POST",headers:{"content-type":"application/json"}}).then(function(e){return e.json()}).then(function(n){t.updateLogin({key:null,username:null}),e.location.go("/"),t.updateLoading(!1),e.toasts.add({text:"Successfully logged out!",style:"success"})})},500)}},updateLoading:function(e){return function(n){return{loading:e}}},updateLogin:function(e){var n=e.key,t=e.username;return function(e){return localStorage.setItem("auth",JSON.stringify({key:n,username:t})),{key:n,username:t,forms:{login:{}}}}},updateField:e.updateField};
},{"./forms.js":"DxrP"}],"+jb2":[function(require,module,exports) {
function t(t){return r(t)||e(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}module.exports={add:function(n){var e=n.text,r=n.style;return function(n,i){return window.setTimeout(function(){i.hide(e)},1e4),{items:[].concat(t(n.items),[{text:e,style:r}])}}},hide:function(n){return function(e){var r=e.items.map(function(t){return t.text}).indexOf(n);return{items:[].concat(t(e.items.slice(0,r)),t(e.items.slice(r+1)))}}},clear:function(){return function(t){return{items:[]}}}};
},{}],"X03X":[function(require,module,exports) {
module.exports=function(t){return{saveEdit:function(n){var o=n.key,e=n.g_actions;return function(n,a){a.updateLoading(!0);var s=n.forms.edit;for(var i in s){var r=s[i];Array.isArray(r)&&(s[i]=r.map(function(t){return{id:t.id,name:t.text}}))}var u="",d="";s.id?(u=t+s.id+"/",d="PATCH"):(u=t,d="POST"),window.setTimeout(function(){fetch(u,{body:JSON.stringify(s),headers:{"content-type":"application/json",Authorization:"Token "+o},method:d}).then(function(t){a.updateLoading(!1),400==t.status?t.json().then(function(t){a.addErrors({formname:"edit",errors:t})}):200!=t.status&&201!=t.status||t.json().then(function(t){e.toasts.add({text:"Successfully saved object!",style:"success"}),a.updateEdit(null),a.load(n.current)})}).catch(function(t){console.log("ERR",t.status)})},500)}}}};
},{}],"B06r":[function(require,module,exports) {
"use strict";var e=r(require("./ajax_forms.js")),t=r(require("./forms.js"));function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){o(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}module.exports=function(r){return u({load:function(e){return function(t,r){r.updateLoading(!0),setTimeout(function(){return fetch(e).then(function(e){return e.json()}).then(function(t){var n=e.match(/\?page=(\d+)/),u=1;n&&(u=1*n[1]),r.update({response:t,current:e,page:u}),r.updateLoading(!1)})},100)}},updateLoading:function(e){return function(t){return{loading:e}}},update:function(e){var t=e.response,r=e.current,n=e.page;return function(e){return{page:n,current:r,count:t.count,next:t.next,previous:t.previous,items:t.results}}},updateEdit:function(e){return function(t){return{forms:Object.assign({},t.forms,{edit:e})}}}},t.default,{},(0,e.default)(r))};
},{"./ajax_forms.js":"X03X","./forms.js":"DxrP"}],"6aiX":[function(require,module,exports) {
"use strict";var e=require("@hyperapp/router"),t=u(require("./auth.js")),o=u(require("./toasts.js")),r=u(require("./view_actions"));function u(e){return e&&e.__esModule?e:{default:e}}var s=module.exports={location:e.location.actions,auth:t.default,people:(0,r.default)(window.g_urls.people),genres:(0,r.default)(window.g_urls.genres),jobs:(0,r.default)(window.g_urls.jobs),movies:Object.assign({},(0,r.default)(window.g_urls.movies),{updateShowPlot:function(e){return function(t){return{showPlot:e}}},updateEditPeople:function(e){return function(t){return{forms:Object.assign({},t.forms,{editPeople:e})}}}}),toasts:o.default};
},{"@hyperapp/router":"z3Fd","./auth.js":"6zvG","./toasts.js":"+jb2","./view_actions":"B06r"}],"EEu+":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=module.exports=function(n,t){return(0,e.h)("div",{key:"home"},n.auth.key?(0,e.h)("span",null,"Hello, ",n.auth.username,"!"):(0,e.h)("span",null,"Please login to edit things"))};
},{"hyperapp":"/xJO"}],"JYKh":[function(require,module,exports) {
var t=require("hyperapp"),a=t.h,l=module.exports=function(t){var l=t.movie,o=t.actions;return a("div",{className:"modal ".concat(l?"active":"")},a("div",{class:"modal-overlay"}),a("div",{class:"modal-container"},a("div",{class:"modal-header"},a("button",{class:"btn btn-clear float-right",onclick:function(){return o.updateShowPlot(null)}}),a("div",{class:"modal-title h5"},l.title)),a("div",{class:"modal-body"},a("div",{class:"content"},l.story)),a("div",{class:"modal-footer"},a("button",{class:"btn",onclick:function(){return o.updateShowPlot(null)}},"Ok"))))};
},{"hyperapp":"/xJO"}],"PGe2":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),r=function(r){var t=r.field,l=(r.action,r.realInput);return(0,e.h)("div",{class:"form-group ".concat(t.errors?"has-error":""),key:t.key},(0,e.h)("label",{class:"form-label",for:"{field.key}"},t.label),l,(0,e.h)("div",{class:"form-input-hint"},t.errors?t.errors[0]:null))},t=function(t){var l=t.field,a=t.action;return r({field:l,action:a,realInput:(0,e.h)("input",{class:"form-input",type:l.type,id:l.key,placeholder:l.label,value:l.value,oninput:function(e){return a(e.target.value)}})})},l=function(t){var l=t.field,a=t.action;return r({field:l,action:a,realInput:(0,e.h)("textarea",{class:"form-input",id:l.key,rows:"5",placeholder:l.label,oninput:function(e){return a(e.target.value)},value:l.value})})};module.exports.FormInput=t,module.exports.FormInputLong=l;
},{"hyperapp":"/xJO"}],"lngq":[function(require,module,exports) {
var e=require("hyperapp"),l=e.h,a=module.exports=function(e){var a=e.field,o=e.action;return l("div",{class:"form-group"},l("label",{class:"form-label",for:"{field.label}"},a.label),l("input",{class:"form-input",type:"text",id:"{field.label}",placeholder:a.label,value:a.value,oncreate:function(e){$(e).datepicker({dateFormat:"yy-mm-dd",onSelect:function(e,l){console.log(e,l),o(e)}})}}))};
},{"hyperapp":"/xJO"}],"t8yA":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),l=function(l){l.label;var a=l.field,r=l.action;return(0,e.h)("div",{class:"form-group"},(0,e.h)("label",{class:"form-label",for:"{field.label}"},a.label),(0,e.h)("select",{name:"",style:"width: 50%",multiple:"multiple",oncreate:function(e){$(e).select2({ajax:{url:a.url,dataType:"json",delay:250,placeholder:"Search for "+a.label.toLowerCase(),data:function(e){return{name:e.term}},processResults:function(e){return{results:e.results.map(function(e){return{id:e.id,text:e.name}})}}}}),a.value&&a.value.forEach(function(l){var a=new Option(l.name,l.id,!0,!0);$(e).append(a).trigger("change")}),$(e).on("change",function(l){console.log(l);var a=$(e).select2("data");console.log(a),r(a)})}}))};module.exports=l;
},{"hyperapp":"/xJO"}],"ZvFp":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=function(){return(0,e.h)("div",{class:"spinner"},(0,e.h)("div",{class:"bounce1"}),(0,e.h)("div",{class:"bounce2"}),(0,e.h)("div",{class:"bounce3"}))},s=module.exports=function(){return(0,e.h)("div",{class:"loading loading-lg"})};module.exports.Spinner=n,module.exports.SpinnerSmall=s;
},{"hyperapp":"/xJO"}],"HiXD":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=require("./FormInputs.js"),n=r(require("./FormDateInput.js")),a=r(require("./MultiSelect.js")),i=require("./Spinners.js");function r(e){return e&&e.__esModule?e:{default:e}}var l=function(e,i){var r=void 0;switch(e.type){case"longtext":r=t.FormInputLong;break;case"text":case"number":r=t.FormInput;break;case"multiselect":r=a.default;break;case"date":r=n.default}return r({field:e,action:function(t){return i(e.key,t)}})},o=function(e,t){return e.map(function(e){return l(e,t)})},c=module.exports=function(t){var n=t.loading,a=t.formFields,r=t.item,l=t.hideAction,c=t.saveAction,s=t.updateFieldAction;return(0,e.h)("div",{className:"modal ".concat(r?"active":"")},(0,e.h)("div",{class:"modal-overlay"}),(0,e.h)("div",{class:"modal-container"},(0,e.h)("div",{class:"modal-header"},(0,e.h)("button",{class:"btn btn-clear float-right",onclick:l}),(0,e.h)("div",{class:"modal-title h5"},r.id?"Editing multi-form for item ".concat(r.id):"Add new item!")),(0,e.h)("div",{class:"modal-body"},(0,e.h)("div",{class:"content"},(0,e.h)("form",{method:"POST"},o(a,s)))),(0,e.h)("div",{class:"modal-footer"},n?(0,e.h)(i.SpinnerSmall,null):(0,e.h)("div",null,(0,e.h)("button",{class:"btn",onclick:l},"Cancel"),(0,e.h)("button",{class:"ml-2 btn btn-primary",onclick:c},"Ok")))))};
},{"hyperapp":"/xJO","./FormInputs.js":"PGe2","./FormDateInput.js":"lngq","./MultiSelect.js":"t8yA","./Spinners.js":"ZvFp"}],"haAe":[function(require,module,exports) {
var e=require("hyperapp"),a=e.h,i=module.exports=function(e){var i=e.page,n=e.next,r=e.previous,t=e.loadAction;return a("ul",{class:"pagination"},a("li",{class:"page-item ".concat(r?"":"disabled")},a("a",{onclick:function(){return t(r)},href:"#",tabindex:"-1"},"Previous")),a("li",{class:"page-item"},a("a",{href:"#"},i)),a("li",{class:"page-item ".concat(n?"":"disabled")},a("a",{onclick:function(){return t(n)},href:"#"},"Next")))};
},{"hyperapp":"/xJO"}],"rHzV":[function(require,module,exports) {
"use strict";var n=require("hyperapp"),r=t(require("../components/Pagination.js"));function t(n){return n&&n.__esModule?n:{default:n}}var e=module.exports=function(r){var t=r.row,e=r.rowColumns,o=r.actions;return(0,n.h)("tr",null,e.map(function(r){return(0,n.h)("td",null,r(t,o))}))},o=module.exports=function(t){var o=t.rowHeaders,u=t.rowColumns,l=t.rows,a=t.actions;return(0,n.h)("div",null,(0,n.h)("table",{class:"table table-striped table-hover"},(0,n.h)("thead",null,(0,n.h)("tr",null,o.map(function(r){return(0,n.h)("th",null,r)}))),(0,n.h)("tbody",null,l.items.map(function(r){return(0,n.h)(e,{row:r,rowColumns:u,actions:a})}))),(0,n.h)(r.default,{page:l.page,next:l.next,previous:l.previous,loadAction:a.load}))};
},{"hyperapp":"/xJO","../components/Pagination.js":"haAe"}],"dE4I":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=require("./FormInputs.js"),n=r(require("./FormDateInput.js")),a=r(require("./MultiSelect.js")),i=require("./Spinners.js");function r(e){return e&&e.__esModule?e:{default:e}}var o=function(e,i){var r=void 0;switch(e.type){case"longtext":r=t.FormInputLong;break;case"text":case"number":r=t.FormInput;break;case"multiselect":r=a.default;break;case"date":r=n.default}return r({field:e,action:function(t){return i(e.key,t)}})},l=function(e,t){return e.map(function(e){return o(e,t)})},c=module.exports=function(t){var n=t.loading,a=t.formFields,r=t.item,o=t.hideAction,c=t.saveAction,s=t.updateFieldAction;return(0,e.h)("div",{className:"modal ".concat(r?"active":"")},(0,e.h)("div",{class:"modal-overlay"}),(0,e.h)("div",{class:"modal-container"},(0,e.h)("div",{class:"modal-header"},(0,e.h)("button",{class:"btn btn-clear float-right",onclick:o}),(0,e.h)("div",{class:"modal-title h5"},r.id?"Editing form for item ".concat(r.id):"Add new item!")),(0,e.h)("div",{class:"modal-body"},(0,e.h)("div",{class:"content"},(0,e.h)("form",{method:"POST"},l(a,s)))),(0,e.h)("div",{class:"modal-footer"},n?(0,e.h)(i.SpinnerSmall,null):(0,e.h)("div",null,(0,e.h)("button",{class:"btn",onclick:o},"Cancel"),(0,e.h)("button",{class:"ml-2 btn btn-primary",onclick:c},"Ok")))))};
},{"hyperapp":"/xJO","./FormInputs.js":"PGe2","./FormDateInput.js":"lngq","./MultiSelect.js":"t8yA","./Spinners.js":"ZvFp"}],"oeWo":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=require("../components/Spinners.js"),t=function(e,n){var t=FormInput;return"longtext"==e.type&&(t=FormInputLong),t({field:e,action:function(t){return n(e.key,t)}})},r=function(e,n){return e.map(function(e){return t(e,n)})},l=module.exports=function(t){var r=t.loading,l=t.formFields,o=t.searchAction,u=t.updateFieldAction;return(0,e.h)("form",{method:"GET",class:"form-horizontal"},(0,e.h)("div",{class:"form-group"},l.map(function(n){return(0,e.h)("div",{key:n.key},(0,e.h)("label",{class:"form-label",for:n.key},n.label),(0,e.h)("input",{class:"form-input",type:n.type,id:n.key,placeholder:n.label,value:n.value,oninput:function(e){return u(n.key,e.target.value)}}))}),r?(0,e.h)(n.SpinnerSmall,null):(0,e.h)("div",null,(0,e.h)("button",{style:{marginTop:"2.3em"},class:"btn ml-2 btn-primary",onclick:function(e){return e.preventDefault(),o(),!1}},"Filter"),(0,e.h)("button",{style:{"margin-top":"2.3em"},class:"btn ml-2",onclick:function(e){return e.preventDefault(),o(!0),!1}},"Reset"))))};
},{"hyperapp":"/xJO","../components/Spinners.js":"ZvFp"}],"u9TJ":[function(require,module,exports) {
var r=function(r,e,n){return r.map(function(r){return Object.assign({},r,{value:e[r.key]},n?{errors:n[r.key]}:{})})};module.exports={mergeValuesErrors:r};
},{}],"GZyz":[function(require,module,exports) {
var e=function(e,t){return t.key?e:e.slice(0,-1)},t=function(){var e=localStorage.getItem("auth");if(e)try{e=JSON.parse(e)}catch(t){e=null}return e||(e={key:"",username:""}),e};module.exports={checkAuth:e,getExistingAuth:t};
},{}],"fGPb":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),r=require("../components/Spinners.js"),n=a(require("../components/Table.js")),t=a(require("../components/ModalForm.js")),o=a(require("../components/SearchForm.js")),u=require("../util/forms.js"),i=require("../util/auth");function a(e){return e&&e.__esModule?e:{default:e}}module.exports=function(a){var l=a.key,s=a.rowHeaders,c=a.rowColumns,d=a.formFields,m=a.title,f=a.extraViews;return function(a,h,p){return(0,e.h)("div",{key:l},(0,e.h)("h2",null,m,"     ",a.auth.key?(0,e.h)("button",{className:"btn btn-primary btn-action btn-lg",onclick:function(){return h.updateEdit({})}},(0,e.h)("i",{className:"icon icon-plus"})):null),(0,e.h)("div",{className:"columns"},(0,e.h)("div",{className:"column col-lg-12",oncreate:function(){return h.load(window.g_urls[l])}},(0,e.h)(o.default,{formFields:(0,u.mergeValuesErrors)(d,a[l].forms.search,null),updateFieldAction:function(e,r){return h.updateField({formname:"search",fieldname:e,value:r})},searchAction:h.searchAction}),1==a[l].loading?(0,e.h)(r.Spinner,null):(0,e.h)(n.default,{rowHeaders:(0,i.checkAuth)(s,a.auth),rowColumns:(0,i.checkAuth)(c,a.auth),rows:a[l],actions:h}))),a[l].forms.edit?(0,e.h)(t.default,{loading:a[l].loading,formFields:(0,u.mergeValuesErrors)(d,a[l].forms.edit,a[l].forms.edit.errors),item:a[l].forms.edit,hideAction:function(){return h.updateEdit(null)},saveAction:function(){return h.saveEdit({g_actions:p,key:a.auth.key})},updateFieldAction:function(e,r){return h.updateField({formname:"edit",fieldname:e,value:r})}}):null,f?f.map(function(e){return e(a,h)}):null)}};
},{"hyperapp":"/xJO","../components/Spinners.js":"ZvFp","../components/Table.js":"rHzV","../components/ModalForm.js":"dE4I","../components/SearchForm.js":"oeWo","../util/forms.js":"u9TJ","../util/auth":"GZyz"}],"A47D":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=i(require("../components/PlotModal.js")),n=i(require("../components/MultiModalForm")),r=i(require("./FilterTableView.js"));function i(e){return e&&e.__esModule?e:{default:e}}var l=["Id","Title","Release year","Runtime","Genres","Plot","Edit"],o=[function(e){return e.id},function(e){return e.title},function(e){return e.release_year},function(e){return e.runtime},function(t){return t.genres.map(function(t){return(0,e.h)("span",{className:"chip bg-dark"},(0,e.h)("a",{class:"text-secondary text-norma",href:""},t.name))})},function(t,n){return(0,e.h)("span",{onclick:function(){return n.updateShowPlot(t)}},t.story.substring(0,50)+"...")},function(t,n){return(0,e.h)("div",null,(0,e.h)("button",{className:"btn btn-block btn-primary",onclick:function(){return n.updateEdit(Object.assign({},t))}},"Edit"),(0,e.h)("button",{className:"btn btn-block btn-primary",onclick:function(){return n.updateEditPeople(Object.assign({},t))}},"Edit people"))}],u=[{key:"title",label:"Title",type:"text"},{key:"release_year",label:"Release Year",type:"number"},{key:"runtime",label:"Runtime",type:"number"},{key:"story",label:"Plot",type:"longtext"},{key:"genres",label:"Genres",type:"multiselect",url:"/api/genres/"}],a=[{key:"person",label:"Person",type:"text"},{key:"job",label:"Job",type:"text"}],s=[function(n,r){return(0,e.h)("div",null,n.movies.showPlot?(0,e.h)(t.default,{movie:n.movies.showPlot,actions:r}):null)},function(t,r){return(0,e.h)("div",null,t.movies.forms.editPeople?(0,e.h)("div",null,"WILL EDIT",(0,e.h)(n.default,{loading:t.movies.loading,formFields:a,item:t.movies.forms.editPeople,hideAction:function(){return r.updateEditPeople(null)},saveAction:function(){return r.saveEditPeople({g_actions:g_actions,key:t.auth.key})},updateFieldAction:function(e,t){return r.updateField({formname:"edit",fieldname:"movies",value:t})}})):null)}],c=(0,r.default)({key:"movies",rowHeaders:l,rowColumns:o,formFields:u,title:"Movies list",extraViews:s});module.exports=c;
},{"hyperapp":"/xJO","../components/PlotModal.js":"JYKh","../components/MultiModalForm":"HiXD","./FilterTableView.js":"fGPb"}],"RNB1":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=r(require("./FilterTableView.js"));function r(e){return e&&e.__esModule?e:{default:e}}var n=["Id","Name","Birthday","Edit"],i=[function(e){return e.id},function(e){return e.name},function(e){return e.birthday},function(t,r){return(0,e.h)("button",{className:"btn btn-block btn-primary",onclick:function(){return r.updateEdit(Object.assign({},t))}},"Edit")}],a=[{key:"name",label:"Name",type:"text"},{key:"birthday",label:"Birthday",type:"date"}],u=(0,t.default)({key:"people",rowHeaders:n,rowColumns:i,formFields:a,title:"People list"});module.exports=u;
},{"hyperapp":"/xJO","./FilterTableView.js":"fGPb"}],"sWqr":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=r(require("./FilterTableView.js"));function r(e){return e&&e.__esModule?e:{default:e}}var n=["Id","Name","Edit"],u=[function(e){return e.id},function(e){return e.name},function(t,r){return(0,e.h)("button",{className:"btn btn-block btn-primary",onclick:function(){return r.updateEdit(Object.assign({},t))}},"Edit")}],i=[{key:"name",label:"Name",type:"text"}],a=function(e){var r=e.key,a=e.title;return(0,t.default)({key:r,rowHeaders:n,rowColumns:u,formFields:i,title:a})};module.exports=a;
},{"hyperapp":"/xJO","./FilterTableView.js":"fGPb"}],"kfaT":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=require("../components/FormInputs.js"),o=require("../components/Spinners.js"),r=function(e,n,o){return n.login(o),console.log(e),e.preventDefault(),!1},t=module.exports=function(t,i,l){return(0,e.h)("div",{key:"login"},(0,e.h)("h2",null,"Login"),(0,e.h)("form",{method:"POST"},(0,e.h)(n.FormInput,{field:{label:"Username",value:t.forms.login.username,type:"text"},action:function(e){return i.updateField({formname:"login",fieldname:"username",value:e})}}),(0,e.h)(n.FormInput,{field:{label:"Password",value:t.forms.login.password,type:"password"},action:function(e){return i.updateField({formname:"login",fieldname:"password",value:e})}}),1==t.loading?(0,e.h)(o.Spinner,null):(0,e.h)("button",{id:"btn",name:"btn",className:"btn btn-primary",onclick:function(e){r(e,i,l)}},"Ok")))};
},{"hyperapp":"/xJO","../components/FormInputs.js":"PGe2","../components/Spinners.js":"ZvFp"}],"QoHQ":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=require("@hyperapp/router"),n=function(n,o){return function(a){return(0,e.h)("li",{className:"tab-item ".concat(a.pathname==n?"active":"")},(0,e.h)(t.Link,{to:n},o))}},o=module.exports=function(o){var a=o.currentLocation,i=o.auth,r=o.actions;return(0,e.h)("ul",{class:"tab tab-block"},n("/","Home")(a),n("/movies","Movies")(a),n("/people","People")(a),n("/genres","Genres")(a),n("/jobs","Jobs")(a),i.key?(0,e.h)("div",null,(0,e.h)("span",{class:"chip"},i.username),(0,e.h)("button",{class:"btn",onclick:function(){return r.auth.logout(r)}},"Logout")):(0,e.h)("li",{className:"tab-item ".concat("/login"==a.pathname?"active":"")},(0,e.h)(t.Link,{to:"/login"},"Login")))};
},{"hyperapp":"/xJO","@hyperapp/router":"z3Fd"}],"sz5S":[function(require,module,exports) {
"use strict";var t=require("hyperapp"),a=function(a){var e=a.text,s=a.actions,n=a.style,r=void 0===n?"primary":n;return(0,t.h)("div",{className:"toast toast-".concat(r)},(0,t.h)("button",{className:"btn btn-clear float-right",onclick:function(){return s.toasts.hide(e)}}),e)},e=module.exports=function(e){var s=e.toasts,n=e.actions;return(0,t.h)("div",{className:"toast-container"},s.items.map(function(e){return(0,t.h)(a,{text:e.text,style:e.style,actions:n})}))};
},{"hyperapp":"/xJO"}],"wF6F":[function(require,module,exports) {
"use strict";var a=require("hyperapp");module.exports=function(c){var o=c.state;c.actions;return(0,a.h)("div",{className:"accordion"},(0,a.h)("input",{type:"checkbox",id:"accordion-1",name:"accordion-checkbox",hidden:!0}),(0,a.h)("label",{className:"accordion-header",for:"accordion-1"},(0,a.h)("i",{className:"icon icon-arrow-right mr-1"}),"Show state"),(0,a.h)("div",{className:"accordion-body"},(0,a.h)("pre",null,(0,a.h)("small",null,JSON.stringify(o,null,2)))))};
},{"hyperapp":"/xJO"}],"7ixp":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=require("@hyperapp/router"),r=h(require("./Home.js")),n=h(require("./Movies.js")),u=h(require("./People.js")),o=h(require("./SimpleFilterTableView.js")),i=h(require("./Login.js")),a=h(require("../components/Tabs.js")),s=h(require("../components/ToastContainer.js")),l=h(require("../components/DebugContainer.js"));function h(e){return e&&e.__esModule?e:{default:e}}module.exports=function(h,p){return(0,e.h)("div",{className:"container grid-xl"},(0,e.h)(a.default,{currentLocation:h.location,auth:h.auth,actions:p}),(0,e.h)(t.Switch,null,(0,e.h)(t.Route,{path:"/",render:function(){return(0,r.default)(h,p)}}),(0,e.h)(t.Route,{path:"/movies",render:function(){return(0,n.default)(h,p.movies,p)}}),(0,e.h)(t.Route,{path:"/people",render:function(){return(0,u.default)(h,p.people,p)}}),(0,e.h)(t.Route,{path:"/genres",render:function(){return(0,o.default)({key:"genres",title:"Genres"})(h,p.genres,p)}}),(0,e.h)(t.Route,{path:"/jobs",render:function(){return(0,o.default)({key:"jobs",title:"Jobs"})(h,p.jobs,p)}}),(0,e.h)(t.Route,{path:"/login",render:function(){return(0,i.default)(h.auth,p.auth,p)}})),(0,e.h)(s.default,{toasts:h.toasts,actions:p}),(0,e.h)("hr",null),(0,e.h)(l.default,{state:h,actions:p}))};
},{"hyperapp":"/xJO","@hyperapp/router":"z3Fd","./Home.js":"EEu+","./Movies.js":"A47D","./People.js":"RNB1","./SimpleFilterTableView.js":"sWqr","./Login.js":"kfaT","../components/Tabs.js":"QoHQ","../components/ToastContainer.js":"sz5S","../components/DebugContainer.js":"wF6F"}],"dm40":[function(require,module,exports) {
"use strict";var e=require("./util/auth.js"),s={loading:!1,page:null,count:0,next:null,previous:null,items:[],forms:{edit:null,search:{}}},t=(0,e.getExistingAuth)(),o=module.exports={auth:{key:t.key,username:t.username,loading:!1,forms:{login:{}}},location:location.state,toasts:{items:[]},movies:Object.assign({},s,{showPlot:!1,forms:Object.assign({},s.forms,{editPeople:null})}),people:Object.assign({},s),genres:Object.assign({},s),jobs:Object.assign({},s)};
},{"./util/auth.js":"GZyz"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),t=require("@hyperapp/router"),a=i(require("./actions")),r=i(require("./views/Main.js")),u=i(require("./state.js"));function i(e){return e&&e.__esModule?e:{default:e}}var s=(0,e.app)(u.default,a.default,r.default,document.getElementById("app")),n=t.location.subscribe(s.location),o=function(){s.toasts.clear()};a.default.location.go("/"),addEventListener("pushstate",o),addEventListener("popstate",o);
},{"hyperapp":"/xJO","@hyperapp/router":"z3Fd","./actions":"6aiX","./views/Main.js":"7ixp","./state.js":"dm40"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map