(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reducers = module.exports = {
    updateText: function updateText(state, actions, newValue) {
        return {
            'text': newValue
        };
    },

    updateCount: function updateCount(state, actions, newValue) {
        return {
            'count': 1 * newValue
        };
    },

    updateLoading: function updateLoading(_, __, loading) {
        return {
            loading: loading
        };
    },

    updatePeople: function updatePeople(state, actions, people) {
        return {
            people: people
        };
    },

    updatePerson: function updatePerson(state, actions, person) {
        return {
            person: person
        };
    },

    loadPeople: function loadPeople(state, actions, url) {
        actions.updateLoading(true);
        setTimeout(function () {
            return fetch(url).then(function (r) {
                return r.json();
            }).then(function (j) {
                console.log(j);
                actions.updatePeople(j);
                actions.updateLoading(false);
            });
        }, 100);
    },

    loadPerson: function loadPerson(state, actions, id) {
        setTimeout(function () {
            return fetch('https://swapi.co/api/people/' + id).then(function (r) {
                return r.json();
            }).then(function (j) {
                console.log(j);
                actions.updatePerson(j);
                actions.updateLoading(false);
            });
        }, 100);
    },

    loadPersonAndGo: function loadPersonAndGo(state, actions, id) {
        actions.updateLoading(true);
        console.log("ROUTER");
        actions.router.go('#/view/' + id);
    },

    displayModal: function displayModal(state, actions, id) {
        actions.loadPerson(id);
        actions.updateLoading(true);
        return {
            person: 'loading'
        };
    },

    hideModal: function hideModal(state, actions, id) {
        return {
            person: undefined
        };
    },

    addToast: function addToast(state, actiosn, text) {
        return {
            toasts: [].concat(_toConsumableArray(state.toasts), [text])
        };
    },

    hideToast: function hideToast(state, actions, text) {
        var idx = state.toasts.indexOf(text);
        return {
            toasts: [].concat(_toConsumableArray(state.toasts.slice(0, idx)), _toConsumableArray(state.toasts.slice(idx + 1)))
        };
    },

    updateForm: function updateForm(state, actions, _ref) {
        var object = _ref.object,
            field = _ref.field,
            value = _ref.value;

        console.log("updateform", object, field, value);
        return _defineProperty({}, object, Object.assign({}, state[object], _defineProperty({}, field, value)));
    },
    savePerson: function savePerson(state, actions, id) {
        console.log("Fake saving person ", id);
        actions.updateLoading(true);
        setTimeout(function () {
            actions.hideModal();
            actions.updateLoading(false);
            actions.addToast('Person ' + id + ' saved ok!');
        }, 500);
    }
};

},{}],2:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var FormInput = module.exports = function (_ref) {
    var label = _ref.label,
        value = _ref.value,
        action = _ref.action;
    return h(
        "div",
        { "class": "form-group" },
        h(
            "label",
            { "class": "form-label", "for": "input-example-1" },
            label
        ),
        h("input", { "class": "form-input", type: "text", id: "input-example-1",
            placeholder: label, value: value,
            onkeyup: function onkeyup(e) {
                return action(e.target.value);
            }
        })
    );
};

},{"hyperapp":15}],3:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var Input = module.exports = function (_ref) {
  var text = _ref.text,
      update = _ref.update;
  return h('input', { onkeyup: function onkeyup(e) {
      return update(e.target.value);
    }, value: text });
};

},{"hyperapp":15}],4:[function(require,module,exports){
'use strict';

var _PersonRow = require('./PersonRow.js');

var _PersonRow2 = _interopRequireDefault(_PersonRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var People = module.exports = function (_ref) {
    var people = _ref.people,
        actions = _ref.actions;
    return h(
        'table',
        null,
        h(
            'thead',
            null,
            h(
                'tr',
                null,
                h(
                    'th',
                    null,
                    'Name'
                ),
                h(
                    'th',
                    null,
                    'Gender'
                ),
                h(
                    'th',
                    null,
                    'Birth year'
                ),
                h(
                    'th',
                    null,
                    'ID'
                ),
                h(
                    'th',
                    null,
                    'Modal'
                )
            )
        ),
        h(
            'tbody',
            null,
            people['results'].map(function (z) {
                return h(_PersonRow2.default, { person: z, actions: actions });
            })
        )
    );
};

},{"./PersonRow.js":7,"hyperapp":15}],5:[function(require,module,exports){
'use strict';

var _FormInput = require('./FormInput.js');

var _FormInput2 = _interopRequireDefault(_FormInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var PersonForm = module.exports = function (_ref) {
    var person = _ref.person,
        actions = _ref.actions;

    return h(
        'form',
        null,
        h(_FormInput2.default, { label: 'Όνομα', value: person.name, action: function action(x) {
                return actions.updateForm({ object: 'person', field: 'name', value: x });
            } }),
        h(_FormInput2.default, { label: 'Φύλο', value: person.gender, action: function action(x) {
                return actions.updateForm({ object: 'person', field: 'gender', value: x });
            } }),
        h(_FormInput2.default, { label: 'Έτος γέννησης', value: person.birth_year, action: function action(x) {
                return actions.updateForm({ object: 'person', field: 'birth_year', value: x });
            } }),
        h(
            'td',
            null,
            h(
                'button',
                { type: 'button', 'class': 'btn btn-block', onclick: function onclick() {
                        //console.log(person.url)
                        var id = person.url.match(/\/(\d+)\/$/)[1];
                        //console.log(id)
                        actions.savePerson(id);
                    }
                },
                'Save'
            )
        ),
        h(
            'td',
            null,
            h(
                'button',
                { type: 'button', 'class': 'btn btn-block btn-primary', onclick: function onclick() {
                        return actions.hideModal();
                    } },
                'Cancel'
            )
        )
    );
};

},{"./FormInput.js":2,"hyperapp":15}],6:[function(require,module,exports){
'use strict';

var _SpinnerSmall = require('./SpinnerSmall.js');

var _SpinnerSmall2 = _interopRequireDefault(_SpinnerSmall);

var _PersonForm = require('./PersonForm.js');

var _PersonForm2 = _interopRequireDefault(_PersonForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var PersonModal = module.exports = function (_ref) {
    var person = _ref.person,
        loading = _ref.loading,
        actions = _ref.actions;

    var personDisplay = '';
    if (person && person.name) {
        personDisplay = h(_PersonForm2.default, { person: person, actions: actions });
    } else {
        personDisplay = '';
    }
    return h(
        'div',
        { className: 'modal ' + (person ? 'active' : '') },
        h('div', { 'class': 'modal-overlay' }),
        h(
            'div',
            { 'class': 'modal-container' },
            h(
                'div',
                { 'class': 'modal-header' },
                h('button', { 'class': 'btn btn-clear float-right', onclick: function onclick() {
                        return actions.hideModal();
                    } }),
                h(
                    'div',
                    { 'class': 'modal-title h5' },
                    '\u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1 \u03C0\u03C1\u03BF\u03C3\u03CE\u03C0\u03BF\u03C5 ',
                    person && person.name ? person.name : ''
                )
            ),
            h(
                'div',
                { 'class': 'modal-body' },
                h(
                    'div',
                    { 'class': 'content' },
                    loading ? h(_SpinnerSmall2.default, null) : personDisplay
                )
            ),
            h(
                'div',
                { 'class': 'modal-footer' },
                'ddd'
            )
        )
    );
};

},{"./PersonForm.js":5,"./SpinnerSmall.js":9,"hyperapp":15}],7:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var PersonRow = module.exports = function (_ref) {
    var person = _ref.person,
        actions = _ref.actions;

    var id = person.url.match(/\/(\d+)\/$/)[1];
    return h(
        'tr',
        null,
        h(
            'td',
            null,
            person.name
        ),
        h(
            'td',
            null,
            person.gender
        ),
        h(
            'td',
            null,
            person.birth_year
        ),
        h(
            'td',
            null,
            h(
                'button',
                { 'class': 'btn btn-block', onclick: function onclick() {
                        return actions.loadPersonAndGo(id);
                    } },
                id
            )
        ),
        h(
            'td',
            null,
            h(
                'button',
                { 'class': 'btn btn-block btn-primary', onclick: function onclick() {
                        return actions.displayModal(id);
                    } },
                id
            )
        )
    );
};

},{"hyperapp":15}],8:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

// OR <div class="loading loading-lg"></div>

var Spinner = module.exports = function () {
    return h(
        "div",
        { "class": "spinner" },
        h("div", { "class": "bounce1" }),
        h("div", { "class": "bounce2" }),
        h("div", { "class": "bounce3" })
    );
};

},{"hyperapp":15}],9:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

// OR 

var SpinnerSmall = module.exports = function () {
  return h("div", { "class": "loading loading-lg" });
};

},{"hyperapp":15}],10:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('hyperapp'),
    h = _require.h;

var Table = module.exports = function (_ref) {
    var text = _ref.text,
        count = _ref.count,
        actions = _ref.actions;
    return h(
        'table',
        null,
        h(
            'thead',
            null,
            h(
                'tr',
                null,
                h(
                    'th',
                    null,
                    'VALUE'
                )
            )
        ),
        h(
            'tbody',
            null,
            (count * 1 == count ? [].concat(_toConsumableArray(Array(count).keys())) : []).map(function (z) {
                return h(
                    'tr',
                    null,
                    h(
                        'td',
                        null,
                        z,
                        ' ',
                        text
                    )
                );
            })
        )
    );
};

},{"hyperapp":15}],11:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var Toast = module.exports = function (_ref) {
    var text = _ref.text,
        actions = _ref.actions;
    return h(
        "div",
        { "class": "toast toast-primary" },
        h("button", { "class": "btn btn-clear float-right", onclick: function onclick() {
                return actions.hideToast(text);
            } }),
        text
    );
};

},{"hyperapp":15}],12:[function(require,module,exports){
'use strict';

var _Toast = require('./Toast.js');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var ToastContainer = module.exports = function (_ref) {
  var toasts = _ref.toasts,
      actions = _ref.actions;
  return toasts.map(function (t) {
    return h(_Toast2.default, { text: t, actions: actions });
  });
};

},{"./Toast.js":11,"hyperapp":15}],13:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _rambda = require("rambda");

var _rambda2 = _interopRequireDefault(_rambda);

var _actions = require("./actions.js");

var _actions2 = _interopRequireDefault(_actions);

var _views = require("./views.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://swapi.co/api/people/

(0, _hyperapp.app)({
    events: {
        load: function load(state, actions) {
            console.log("S");
            actions.loadPeople('https://swapi.co/api/people/');
        }
        /*
        ,
        route: (state, actions, data, emit) => {
            if(data.match == "/view/:id") {
              let id = data.params.id;
              actions.updateLoading(true);
              actions.loadPerson(id);
            }
        }
        */
    },
    state: {
        text: 'Hi!!!!!!!',
        count: 5,
        loading: true,
        toasts: [],
        person: undefined,
        people: {
            results: [],
            count: 0,
            next: null
        }
    },
    view: _views.home,
    actions: _actions2.default,
    root: document.getElementById("app")
});

},{"./actions.js":1,"./views.js":17,"@hyperapp/router":14,"hyperapp":15,"rambda":16}],14:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("hyperapp")):"function"==typeof define&&define.amd?define(["exports","hyperapp"],t):t(e.Router={},e.hyperapp)}(this,function(e,t){"use strict";function r(e){return{state:{router:{}},actions:{router:{set:function(e,t,r){return{router:r}},go:function(e,t,r){location.pathname+location.search!==r&&(history.pushState({},"",r),t.router.set({path:r}))}}},events:{load:function(e,t){addEventListener("popstate",function(){t.router.set({})})},render:function(t,r,o){return o[(t.router.index>=0?t:r.router.set(e("route",n(location.pathname,o)))).router.index][1]}}}}function n(e,t){for(var r,n,o={},u=0;u<t.length&&!r;u++){var i=t[u][0],a=[];e.replace(RegExp("*"===i?".*":"^"+i.replace(/\//g,"\\/").replace(/:([\w]+)/g,function(e,t){return a.push(t),"([-\\.%\\w\\(\\)]+)"})+"/?$","g"),function(){for(var e=1;e<arguments.length-2;){var t=arguments[e++];try{t=decodeURI(t)}catch(e){}o[a.shift()]=t}r=i,n=u})}return{match:r,index:n,params:o}}function o(e,r){return e.href=e.to,e.to=null,e.onclick=function(t){t.preventDefault(),e.go(e.href)},t.h("a",e,r)}e.Router=r,e.Link=o});

},{"hyperapp":15}],15:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";function n(e,n){var t,o=[];for(r=arguments.length;r-- >2;)a.push(arguments[r]);for(;a.length;)if(Array.isArray(t=a.pop()))for(r=t.length;r--;)a.push(t[r]);else null!=t&&!0!==t&&!1!==t&&("number"==typeof t&&(t+=""),o.push(t));return"string"==typeof e?{tag:e,data:n||{},children:o}:e(n,o)}function t(e){function n(e,t,r){Object.keys(t||[]).map(function(o){var u=t[o],f=r?r+"."+o:o;"function"==typeof u?e[o]=function(e){i("action",{name:f,data:e});var n=i("resolve",u(p,m,e));return"function"==typeof n?n(a):a(n)}:n(e[o]||(e[o]={}),u,f)})}function t(e){for(x=v(w,x,h,h=i("render",y)(p,m),g=!g);e=o.pop();)e()}function r(){y&&!g&&requestAnimationFrame(t,g=!g)}function a(e){return e&&(e=i("update",u(p,e)))&&r(p=e),p}function i(e,n){return(b[e]||[]).map(function(e){var t=e(p,m,n);null!=t&&(n=t)}),n}function u(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function f(e){if(e&&(e=e.data))return e.key}function c(e,n){if("string"==typeof e)var t=document.createTextNode(e);else{var t=(n=n||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);e.data&&e.data.oncreate&&o.push(function(){e.data.oncreate(t)});for(var r in e.data)l(t,r,e.data[r]);for(var r=0;r<e.children.length;)t.appendChild(c(e.children[r++],n))}return t}function l(e,n,t,r){if("key"===n);else if("style"===n)for(var a in u(r,t=t||{}))e.style[a]=t[a]||"";else{try{e[n]=t}catch(e){}"function"!=typeof t&&(t?e.setAttribute(n,t):e.removeAttribute(n))}}function d(e,n,t){for(var r in u(n,t)){var a=t[r],i="value"===r||"checked"===r?e[r]:n[r];a!==i&&l(e,r,a,i)}t&&t.onupdate&&o.push(function(){t.onupdate(e,n)})}function s(e,n,t){t&&t.onremove?t.onremove(n):e.removeChild(n)}function v(e,n,t,r,a,o){if(null==t)n=e.insertBefore(c(r,a),n);else if(null!=r.tag&&r.tag===t.tag){d(n,t.data,r.data),a=a||"svg"===r.tag;for(var i=r.children.length,u=t.children.length,l={},p=[],h={},g=0;g<u;g++){var y=p[g]=n.childNodes[g],m=t.children[g],b=f(m);null!=b&&(l[b]=[y,m])}for(var g=0,k=0;k<i;){var y=p[g],m=t.children[g],w=r.children[k],b=f(m);if(h[b])g++;else{var x=f(w),A=l[x]||[];null==x?(null==b&&(v(n,y,m,w,a),k++),g++):(b===x?(v(n,A[0],A[1],w,a),g++):A[0]?(n.insertBefore(A[0],y),v(n,A[0],A[1],w,a)):v(n,y,null,w,a),k++,h[x]=w)}}for(;g<u;){var m=t.children[g],b=f(m);null==b&&s(n,p[g],m.data),g++}for(var g in l){var A=l[g],j=A[1];h[j.data.key]||s(n,A[0],j.data)}}else n&&r!==n.nodeValue&&(n=e.insertBefore(c(r,a),o=n),s(e,o,t.data));return n}for(var p,h,g,y=e.view,m={},b={},k=e.mixins||[],w=e.root||document.body,x=w.children[0],A=0;A<=k.length;A++){var j=k[A]?k[A](i):e;Object.keys(j.events||[]).map(function(e){b[e]=(b[e]||[]).concat(j.events[e])}),n(m,j.actions),p=u(p,j.state)}return r((h=i("load",x))===x&&(h=x=null)),i}var r,a=[],o=[];e.h=n,e.app=t});

},{}],16:[function(require,module,exports){
(function(c,d){typeof exports==='object'&&typeof module!=='undefined'?d(exports):typeof define==='function'&&define.amd?define(['exports'],d):d(c.R={});})(this,function(e){'use strict';function helper(g,x,y){if(x===void 0){return function(h,j){return helper(g,h,j);};}else if(y===void 0){return function(k){return helper(g,x,k);};}if(y[g]!==void 0){return y[g](x);}}var l=helper;function curry$1(m){return function(x,y){if(y===void 0){return function(n){return m(x,n);};}return m(x,y);};}var q=curry$1;function curryThree(r){return function(x,y,z){if(y===void 0){var helper=function helper(s,t){return r(x,s,t);};return q(helper);}else if(z===void 0){return function(u){return r(x,y,u);};}return r(x,y,z);};}var v=curryThree;function mathHelper(w,x,y){switch(w){case'+':return x+y;case'-':return x-y;case'/':return x/y;case'*':return x*y;case'%':return x%y;}}var A=v(mathHelper);function oppositeHelper(B,x,y){if(x===void 0){return function(C,D){return oppositeHelper(B,C,D);};}else if(y===void 0){return function(E){return oppositeHelper(B,x,E);};}if(x[B]!==void 0){return x[B](y);}}var G=oppositeHelper;function propHelper(H,x){if(x===void 0){return function(I){return propHelper(H,I);};}return x[H];}var J=propHelper;function simpleHelper(K,x){if(x===void 0){return function(L){return simpleHelper(K,L);};}if(x[K]!==void 0){return x[K]();}}var M=simpleHelper;function addIndex$1(N){return function(O){for(var P=0,newFn=function newFn(){for(var Q=arguments.length,R=Array(Q),S=0;S<Q;S++){R[S]=arguments[S];}return O.apply(null,[].concat(R,[P++]));},U=arguments.length,V=Array(U>1?U-1:0),W=1;W<U;W++){V[W-1]=arguments[W];}return N.apply(null,[newFn].concat(V));};}var X=addIndex$1;function adjust$1(Y,Z,a1){var b1=a1.concat();return b1.map(function(c1,d1){if(d1===Z){return Y(a1[Z]);}return c1;});}var e1=v(adjust$1);function any$1(fn,g1){var h1=0;while(h1<g1.length){if(fn(g1[h1])){return!0;}h1++;}return!1;}var i1=q(any$1);function append$1(j1,k1){var l1=k1.concat();l1.push(j1);return l1;}var m1=q(append$1);function filter$1(fn,o1){var p1=-1,q1=0,r1=o1.length,s1=[];while(++p1<r1){var t1=o1[p1];if(fn(t1)){s1[q1++]=t1;}}return s1;}var u1=q(filter$1);function all$1(v1,w1){if(arguments.length===1){return function(x1){return all$1(v1,x1);};}return u1(v1,w1).length===w1.length;}var y1=all$1;function allPass$1(z1,x){if(arguments.length===1){return function(A1){return allPass$1(A1,xHolder);};}return!i1(function(B1){return!B1(x);})(z1);}var C1=allPass$1;function both$1(x,y){return function(D1){return x(D1)&&y(D1);};}var E1=q(both$1);function createCommonjsModule(fn,G1){return G1={exports:{}},fn(G1,G1.exports),G1.exports;}var H1=createCommonjsModule(function(I1){var compose=function compose(){for(var J1=arguments.length,K1=Array(J1),L1=0;L1<J1;L1++){K1[L1]=arguments[L1];}return function(M1){var N1=K1.slice();while(N1.length>0){M1=N1.pop()(M1);}return M1;};};I1.exports=compose;});function type$1(a){if(a===null){return"Null";}else if(Array.isArray(a)){return"Array";}else if(typeof a==="boolean"){return"Boolean";}else if(typeof a==="number"){return"Number";}else if(typeof a==="string"){return"String";}else if(a===void 0){return"Undefined";}else if(a instanceof RegExp){return"RegExp";}var O1=a.toString();if(O1.startsWith("async")){return"Async";}else if(O1==="[object Promise]"){return"Promise";}else if(O1.includes("function")||O1.includes("=>")){return"Function";}return"Object";}var P1=type$1;function equals$1(a,b){if(a===b){return!0;}var Q1=P1(a);if(Q1!==P1(b)){return!1;}if(Q1==="Array"){var R1=Array.from(a),S1=Array.from(b);return R1.sort().toString()===S1.sort().toString();}if(Q1==="Object"){var T1=Object.keys(a);if(T1.length===Object.keys(b).length){if(T1.length===0){return!0;}var U1=!0;T1.map(function(V1){if(U1){var W1=P1(a[V1]),X1=P1(b[V1]);if(W1===X1){if(W1==="Object"){if(Object.keys(a[V1]).length===Object.keys(b[V1]).length){if(Object.keys(a[V1]).length!==0){if(!equals$1(a[V1],b[V1])){U1=!1;}}}else{U1=!1;}}else if(!equals$1(a[V1],b[V1])){U1=!1;}}else{U1=!1;}}});return U1;}}return!1;}var Y1=q(equals$1);function contains$1(Z1,a2){var b2=-1,c2=!1;while(++b2<a2.length&&!c2){if(Y1(a2[b2],Z1)){c2=!0;}}return c2;}var d2=q(contains$1),toConsumableArray=function(e2){if(Array.isArray(e2)){for(var i=0,f2=Array(e2.length);i<e2.length;i++)f2[i]=e2[i];return f2;}else{return Array.from(e2);}};function curry$3(f){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var g2=arguments.length,p=Array(g2),h2=0;h2<g2;h2++){p[h2]=arguments[h2];}return function(o){return o.length>=f.length?f.apply(void 0,toConsumableArray(o)):curry$3(f,o);}([].concat(toConsumableArray(a),p));};}var i2=curry$3;function defaultTo$1(j2,k2){if(arguments.length===1){return function(l2){return defaultTo$1(j2,l2);};}return k2===void 0||!(P1(k2)===P1(j2))?j2:k2;}var m2=defaultTo$1;function drop$1(n2,a){return a.slice(n2);}var o2=q(drop$1);function dropLast$1(p2,a){return a.slice(0,-p2);}var q2=q(dropLast$1);function either$1(x,y){return function(r2){return x(r2)||y(r2);};}var s2=q(either$1);function find$1(fn,u2){return u2.find(fn);}var v2=q(find$1);function findIndex$1(fn,x2){var y2=x2.length,z2=-1;while(++z2<y2){if(fn(x2[z2])){return z2;}}return-1;}var A2=q(findIndex$1);function flatten$1(B2,C2){C2=C2===void 0?[]:C2;for(var i=0;i<B2.length;i++){if(Array.isArray(B2[i])){flatten$1(B2[i],C2);}else{C2.push(B2[i]);}}return C2;}var D2=flatten$1;function has$1(E2,F2){return F2[E2]!==void 0;}var G2=q(has$1);function head$1(a){if(typeof a==="string"){return a[0]||"";}return a[0];}var H2=head$1;function ifElse$1(I2,J2,K2){return function(L2){if(I2(L2)===!0){return J2(L2);}return K2(L2);};}var M2=v(ifElse$1);function indexOf$1(N2,O2){var P2=-1,Q2=O2.length;while(++P2<Q2){if(O2[P2]===N2){return P2;}}return-1;}var R2=q(indexOf$1);function baseSlice(S2,T2,U2){var V2=-1,W2=S2.length;U2=U2>W2?W2:U2;if(U2<0){U2+=W2;}W2=T2>U2?0:U2-T2>>>0;T2>>>=0;var X2=Array(W2);while(++V2<W2){X2[V2]=S2[V2+T2];}return X2;}var Y2=baseSlice;function init$1(a){if(typeof a==="string"){return a.slice(0,-1);}return a.length?Y2(a,0,-1):[];}var Z2=init$1;function last$1(a){if(typeof a==="string"){return a[a.length-1]||"";}return a[a.length-1];}var a3=last$1;function map$1(fn,c3){var d3=-1,e3=c3.length,f3=Array(e3);while(++d3<e3){f3[d3]=fn(c3[d3]);}return f3;}var g3=q(map$1);function match$1(h3,i3){var j3=i3.match(h3);return j3===null?[]:j3;}var k3=q(match$1);function merge$1(l3,m3){return Object.assign({},l3,m3);}var n3=q(merge$1);function omit$1(o3,p3){if(arguments.length===1){return function(q3){return omit$1(o3,q3);};}if(!(P1(p3)==='Object')){return void 0;}if(P1(o3)==='String'){o3=o3.split(',').map(function(x){return x.trim();});}var r3={};for(var s3 in p3){if(!o3.includes(s3)){r3[s3]=p3[s3];}}return r3;}var t3=omit$1;function partialCurry$1(fn){var v3=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function(w3){if(P1(fn)==="Async"||P1(fn)==="Promise"){return new Promise(function(x3,y3){fn(n3(w3,v3)).then(x3).catch(y3);});}return fn(n3(w3,v3));};}var z3=partialCurry$1;function path$1(A3,B3){if(arguments.length===1){return function(C3){return path$1(A3,C3);};}if(!(P1(B3)==="Object")){return void 0;}var D3=B3,E3=0;if(typeof A3==="string"){A3=A3.split(".");}while(E3<A3.length){if(D3===null||D3===void 0){return void 0;}D3=D3[A3[E3]];E3++;}return D3;}var F3=path$1;function pick$1(G3,H3){if(arguments.length===1){return function(I3){return pick$1(G3,I3);};}if(!(P1(H3)==="Object")){return void 0;}if(P1(G3)==='String'){G3=G3.split(',').map(function(x){return x.trim();});}var J3={},K3=0;while(K3<G3.length){if(G3[K3]in H3){J3[G3[K3]]=H3[G3[K3]];}K3++;}return J3;}var L3=pick$1;function pluck$1(M3,N3){var O3=[];g3(function(P3){if(!(P3[M3]===void 0)){O3.push(P3[M3]);}},N3);return O3;}var Q3=q(pluck$1);function prepend$1(R3,S3){var T3=S3.concat();T3.unshift(R3);return T3;}var U3=q(prepend$1);function prop$1(V3,W3){return W3[V3];}var X3=q(prop$1);function propEq$1(Y3,Z3,a4){return a4[Y3]===Z3;}var b4=v(propEq$1);function range$1(c4,d4){for(var e4=[],i=c4;i<d4;i++){e4.push(i);}return e4;}var f4=range$1;function reduce$1(fn,h4,i4){return i4.reduce(fn,h4);}var j4=v(reduce$1);function repeat$1(a,k4){var l4=Array(k4);return l4.fill(a);}var m4=q(repeat$1);function replace$1(n4,o4,p4){return p4.replace(n4,o4);}var q4=v(replace$1);function sort$1(fn,s4){var t4=s4.concat();return t4.sort(fn);}var u4=q(sort$1);function sortBy$1(fn,w4){var x4=w4.concat();return x4.sort(function(a,b){var y4=fn(a),z4=fn(b);return y4<z4?-1:y4>z4?1:0;});}var A4=q(sortBy$1);function split$1(B4,C4){return C4.split(B4);}var D4=q(split$1);function splitEvery$1(E4,a){E4=E4>1?E4:1;var F4=[],G4=0;while(G4<a.length){F4.push(a.slice(G4,G4+=E4));}return F4;}var H4=q(splitEvery$1);function tap$1(fn,J4){fn(J4);return J4;}var K4=q(tap$1);function tail$1(L4){return o2(1,L4);}var M4=tail$1;function take$1(N4,a){if(a===void 0){return function(O4){return take$1(N4,O4);};}else if(typeof a==="string"){return a.slice(0,N4);}return Y2(a,0,N4);}var P4=q(take$1);function takeLast$1(Q4,a){var R4=a.length;Q4=Q4>R4?R4:Q4;if(typeof a==="string"){return a.slice(R4-Q4);}Q4=R4-Q4;return Y2(a,Q4,R4);}var S4=q(takeLast$1);function test$1(T4,U4){return U4.search(T4)===-1?!1:!0;}var V4=q(test$1);function uniq$1(W4){var X4=-1,Y4=[];while(++X4<W4.length){var Z4=W4[X4];if(!d2(Z4,Y4)){Y4.push(Z4);}}return Y4;}var a5=uniq$1;function update$1(b5,c5,d5){var e5=d5.concat();return e5.fill(c5,b5,b5+1);}var f5=v(update$1);function values$1(g5){var h5=[];for(var i5 in g5){h5.push(g5[i5]);}return h5;}var j5=values$1,k5=A('+'),l5=X,m5=e1,always=function always(x){return function(){return x;};},n5=i1,o5=m1,p5=y1,q5=C1,r5=E1,s5=H1,complement=function complement(fn){return function(u5){return!Boolean(fn(u5));};},v5=G("concat"),w5=d2,x5=i2,y5=m2,z5=A('/'),A5=o2,B5=q2,C5=s2,D5=l("endsWith"),E5=Y1,F=function F(){return!1;},F5=u1,G5=v2,H5=A2,I5=D2,J5=G2,K5=H2,identity=function identity(x){return x;},L5=M2,M5=l("includes"),N5=R2,O5=Z2,P5=l('join'),Q5=a3,R5=l("lastIndexOf"),S5=J("length"),T5=g3,U5=k3,V5=n3,W5=A('%'),X5=A('*'),not=function not(x){return!x;},Y5=t3,Z5=l('padEnd'),a6=l('padStart'),b6=z3,c6=F3,d6=L3,e6=Q3,f6=U3,g6=X3,h6=b4,i6=f4,j6=j4,k6=m4,l6=q4,m6=M('reverse'),n6=u4,o6=A4,p6=D4,q6=H4,r6=l("startsWith"),s6=A('-'),T=function T(){return!0;},t6=K4,u6=M4,v6=P4,w6=S4,x6=V4,y6=M("toLowerCase"),z6=M('toString'),A6=M("toUpperCase"),B6=M("trim"),C6=P1,D6=a5,E6=f5,F6=j5,G6={add:k5,addIndex:l5,adjust:m5,always:always,any:n5,append:o5,all:p5,allPass:q5,both:r5,compose:s5,complement:complement,concat:v5,contains:w5,curry:x5,defaultTo:y5,divide:z5,drop:A5,dropLast:B5,either:C5,endsWith:D5,equals:E5,F:F,filter:F5,find:G5,findIndex:H5,flatten:I5,has:J5,head:K5,identity:identity,ifElse:L5,includes:M5,indexOf:N5,init:O5,join:P5,last:Q5,lastIndexOf:R5,length:S5,map:T5,match:U5,merge:V5,modulo:W5,multiply:X5,not:not,omit:Y5,padEnd:Z5,padStart:a6,partialCurry:b6,path:c6,pick:d6,pluck:e6,prepend:f6,prop:g6,propEq:h6,range:i6,reduce:j6,repeat:k6,replace:l6,reverse:m6,sort:n6,sortBy:o6,split:p6,splitEvery:q6,startsWith:r6,subtract:s6,T:T,tap:t6,tail:u6,take:v6,takeLast:w6,test:x6,toLower:y6,toString:z6,toUpper:A6,trim:B6,type:C6,uniq:D6,update:E6,values:F6};e['default']=G6;e.add=k5;e.addIndex=l5;e.adjust=m5;e.always=always;e.any=n5;e.append=o5;e.all=p5;e.allPass=q5;e.both=r5;e.compose=s5;e.complement=complement;e.concat=v5;e.contains=w5;e.curry=x5;e.defaultTo=y5;e.divide=z5;e.drop=A5;e.dropLast=B5;e.either=C5;e.endsWith=D5;e.equals=E5;e.F=F;e.filter=F5;e.find=G5;e.findIndex=H5;e.flatten=I5;e.has=J5;e.head=K5;e.identity=identity;e.ifElse=L5;e.includes=M5;e.indexOf=N5;e.init=O5;e.join=P5;e.last=Q5;e.lastIndexOf=R5;e.length=S5;e.map=T5;e.match=U5;e.merge=V5;e.modulo=W5;e.multiply=X5;e.not=not;e.omit=Y5;e.padEnd=Z5;e.padStart=a6;e.partialCurry=b6;e.path=c6;e.pick=d6;e.pluck=e6;e.prepend=f6;e.prop=g6;e.propEq=h6;e.range=i6;e.reduce=j6;e.repeat=k6;e.replace=l6;e.reverse=m6;e.sort=n6;e.sortBy=o6;e.split=p6;e.splitEvery=q6;e.startsWith=r6;e.subtract=s6;e.T=T;e.tap=t6;e.tail=u6;e.take=v6;e.takeLast=w6;e.test=x6;e.toLower=y6;e.toString=z6;e.toUpper=A6;e.trim=B6;e.type=C6;e.uniq=D6;e.update=E6;e.values=F6;Object.defineProperty(e,'__esModule',{value:!0});});
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detail = exports.home = undefined;

var _hyperapp = require('hyperapp');

var _Input = require('./components/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Table = require('./components/Table.js');

var _Table2 = _interopRequireDefault(_Table);

var _People = require('./components/People.js');

var _People2 = _interopRequireDefault(_People);

var _Spinner = require('./components/Spinner.js');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _PersonModal = require('./components/PersonModal.js');

var _PersonModal2 = _interopRequireDefault(_PersonModal);

var _ToastContainer = require('./components/ToastContainer.js');

var _ToastContainer2 = _interopRequireDefault(_ToastContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = exports.home = function home(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        null,
        (0, _hyperapp.h)(
            'h1',
            null,
            state.text,
            (0, _hyperapp.h)('br', null)
        ),
        (0, _hyperapp.h)(_Input2.default, { text: state.text, update: actions.updateText }),
        (0, _hyperapp.h)(_Input2.default, { text: state.count, update: actions.updateCount }),
        (0, _hyperapp.h)(_PersonModal2.default, { person: state.person, loading: state.loading, actions: actions }),
        (0, _hyperapp.h)(_Table2.default, { count: state.count, text: state.text, actions: actions }),
        (0, _hyperapp.h)('hr', null),
        (0, _hyperapp.h)(_ToastContainer2.default, { toasts: state.toasts, actions: actions }),
        state.loading == true ? (0, _hyperapp.h)(_Spinner2.default, null) : (0, _hyperapp.h)(_People2.default, { people: state.people, actions: actions }),
        state.people.previous ? (0, _hyperapp.h)(
            'button',
            { 'class': 'btn', onclick: function onclick() {
                    return actions.loadPeople(state.people.previous);
                } },
            'Prev'
        ) : null,
        state.people.next ? (0, _hyperapp.h)(
            'button',
            { 'class': 'btn', onclick: function onclick() {
                    return actions.loadPeople(state.people.next);
                } },
            'Next'
        ) : null
    );
};

var detail = exports.detail = function detail(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        null,
        state.loading == true ? (0, _hyperapp.h)(_Spinner2.default, null) : (0, _hyperapp.h)(
            'div',
            null,
            state.person.name
        )
    );
};

},{"./components/Input.js":3,"./components/People.js":4,"./components/PersonModal.js":6,"./components/Spinner.js":8,"./components/Table.js":10,"./components/ToastContainer.js":12,"hyperapp":15}]},{},[13]);
