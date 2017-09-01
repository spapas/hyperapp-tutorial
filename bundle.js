(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
    }
};

},{}],2:[function(require,module,exports){
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

},{"hyperapp":9}],3:[function(require,module,exports){
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

},{"./PersonRow.js":4,"hyperapp":9}],4:[function(require,module,exports){
'use strict';

var _rambda = require('rambda');

var _rambda2 = _interopRequireDefault(_rambda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var PersonRow = module.exports = function (_ref) {
    var person = _ref.person,
        actions = _ref.actions;

    var id = _rambda2.default.dropLast(1, _rambda2.default.drop(1, _rambda2.default.head(_rambda2.default.match(/\/\d+\/$/, person.url))));
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

},{"hyperapp":9,"rambda":10}],5:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var Spinner = module.exports = function () {
    return h(
        "div",
        { "class": "spinner" },
        h("div", { "class": "bounce1" }),
        h("div", { "class": "bounce2" }),
        h("div", { "class": "bounce3" })
    );
};

},{"hyperapp":9}],6:[function(require,module,exports){
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

},{"hyperapp":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = Router;
function Router(config) {
  return function (emit, view) {
    return {
      state: {
        router: _match(location.hash)
      },
      actions: {
        router: {
          match: function match(state, actions, data) {
            return {
              router: emit("route", _match(data))
            };
          },
          go: function go(state, actions, data) {
            history.pushState({}, "", data);
            actions.router.match(data.split("?")[0]);
          }
        }
      },
      events: {
        init: function init(state, actions) {
          addEventListener("popstate", function () {
            actions.router.match(location.hash);
          });
        },
        render: function render() {
          return view;
        }
      }
    };

    function _match(data0) {
      for (var match, params = {}, i = 0, len = config.length; i < len; i++) {
        var route = config[i][0];
        var keys = [];

        var data = data0;
        if (data0.indexOf('#') != -1) {
          data = data0.substring(1);
        }
        if (data == '') {
          data = '/';
        }
        if (!match) {
          data.replace(RegExp(route === "*" ? "." + route : "^" + route.replace(/\//g, "\\/").replace(/:([\w]+)/g, function (_, key) {
            keys.push(key);
            return "([-\\.%\\w]+)";
          }) + "/?$", "g"), function () {
            for (var j = 1; j < arguments.length - 2;) {
              params[keys.shift()] = arguments[j++];
            }
            match = route;
            view = config[i][1];
          });
        }
      }

      return {
        match: match,
        params: params
      };
    }
  };
}

},{}],8:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _hrouter = require("./hrouter.js");

var _rambda = require("rambda");

var _rambda2 = _interopRequireDefault(_rambda);

var _actions = require("./actions.js");

var _actions2 = _interopRequireDefault(_actions);

var _views = require("./views.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://swapi.co/api/people/

(0, _hyperapp.app)({
    events: {
        init: function init(state, actions) {
            actions.loadPeople('https://swapi.co/api/people/');
        },
        route: function route(state, actions, data, emit) {
            if (data.match == "/view/:id") {
                var id = data.params.id;
                actions.updateLoading(true);
                actions.loadPerson(id);
            }
        }
    },
    state: {
        text: 'Hi!!!!!!!',
        count: 5,
        loading: true,
        person: undefined,
        people: {
            results: [],
            count: 0,
            next: null
        }
    },
    //view: ,
    mixins: [(0, _hrouter.Router)([["/", _views.home], ["/view/:id", _views.detail], ["*", function (state) {
        return (0, _hyperapp.h)(
            "h1",
            null,
            "404"
        );
    }]])],
    actions: _actions2.default,
    root: document.getElementById("app")
});

},{"./actions.js":1,"./hrouter.js":7,"./views.js":11,"hyperapp":9,"rambda":10}],9:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t,r=[],a=[],o=arguments.length;o-- >2;)r[r.length]=arguments[o];for(;r.length;)if(Array.isArray(t=r.pop()))for(o=t.length;o--;)r[r.length]=t[o];else null!=t&&!0!==t&&!1!==t&&("number"==typeof t&&(t+=""),a[a.length]=t);return"string"==typeof e?{tag:e,data:n||{},children:a}:e(n,a)},e.app=function(e){function n(){w||requestAnimationFrame(r,w=!w)}function t(e,n){return null==e?e:{tag:e.tagName,data:{},children:n.call(e.childNodes,function(e){t(e,n)})}}function r(){h=s(k,h,v,v=o("render",b)(p,g)),w=!w,x||o("loaded",x=!0)}function a(e,t,r){Object.keys(t||[]).map(function(l){var u=t[l],f=r?r+"."+l:l;"function"==typeof u?e[l]=function(e){var t=u(p,g,o("action",{name:f,data:e}).data);return null!=t&&null==t.then&&n(p=i(p,o("update",t))),t}:a(e[l]||(e[l]={}),u,f)})}function o(e,n){return(m[e]||[]).map(function(e){var t=e(p,g,n);null!=t&&(n=t)}),n}function i(e,n){if("object"!=typeof n)return n;var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function l(e){if(e&&(e=e.data))return e.key}function u(e,n){if("string"==typeof e)t=document.createTextNode(e);else{for(var t=(n=n||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag),r=0;r<e.children.length;)t.appendChild(u(e.children[r++],n));for(var r in e.data)"oncreate"===r?e.data[r](t):"oninsert"===r?setTimeout(e.data[r],0,t):f(t,r,e.data[r])}return t}function f(e,n,t,r){if("key"===n||"oncreate"===n||"oninsert"===n||"onupdate"===n||"onremove"===n)return n;if("style"===n)for(var a in i(r,t=t||{}))e.style[a]=t[a]||"";else{try{e[n]=t}catch(e){}"function"!=typeof t&&(t?e.setAttribute(n,t):e.removeAttribute(n))}}function c(e,n,t,r){for(var a in i(n,t)){var o=t[a],l=n[a];o!==l&&o!==e[a]&&null==f(e,a,o,l)&&(r=t.onupdate)}null!=r&&r(e)}function d(e,n,t){t&&t.onremove?t.onremove(n):e.removeChild(n)}function s(e,n,t,r,a,o){if(null==t)n=e.insertBefore(u(r,a),n);else if(null!=r.tag&&r.tag===t.tag){c(n,t.data,r.data),a=a||"svg"===r.tag;for(var i=r.children.length,f=t.children.length,v={},h=[],p={},g=0;g<f;g++)y=n.childNodes[g],h[g]=y,null!=(A=l(b=t.children[g]))&&(v[A]=[y,b]);for(var g=0,m=0;m<i;){var y=h[g],b=t.children[g],k=r.children[m];if(p[A=l(b)])g++;else{var w=l(k),x=v[w]||[];null==w?(null==A&&(s(n,y,b,k,a),m++),g++):(A===w?(s(n,x[0],x[1],k,a),g++):x[0]?(n.insertBefore(x[0],y),s(n,x[0],x[1],k,a)):s(n,y,null,k,a),m++,p[w]=k)}}for(;g<f;){var A=l(b=t.children[g]);null==A&&d(n,h[g],b.data),g++}for(var g in v){var N=(x=v[g])[1];p[N.data.key]||d(n,x[0],N.data)}}else null!=(o=n)&&r!==t&&r!==n.nodeValue&&e.replaceChild(n=u(r,a),o);return n}for(var v,h,p={},g={},m={},y=[],b=e.view,k=e.root||document.body,w=!1,x=!1,A=-1;A<y.length;A++){var N=y[A]?y[A](o):e;Object.keys(N.events||[]).map(function(e){m[e]=(m[e]||[]).concat(N.events[e])}),null!=N.state&&(p=i(p,N.state)),y=y.concat(N.mixins||[]),a(g,N.actions)}return v=t(h=k.querySelector("[data-ssr]"),[].map),n(o("init")),o}});


},{}],10:[function(require,module,exports){
module.exports=function(d){var e={};function __webpack_require__(g){if(e[g]){return e[g].exports;}var h=e[g]={i:g,l:!1,exports:{}};d[g].call(h.exports,h,h.exports,__webpack_require__);h.l=!0;return h.exports;}__webpack_require__.m=d;__webpack_require__.c=e;__webpack_require__.i=function(j){return j;};__webpack_require__.d=function(k,l,m){if(!__webpack_require__.o(k,l)){Object.defineProperty(k,l,{configurable:!1,enumerable:!0,get:m});}};__webpack_require__.n=function(n){var q=n&&n.__esModule?function getDefault(){return n['default'];}:function getModuleExports(){return n;};__webpack_require__.d(q,'a',q);return q;};__webpack_require__.o=function(r,s){return Object.prototype.hasOwnProperty.call(r,s);};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=57);}([function(t,u,v){"use strict";function type(a){if(a===null){return"Null";}else if(Array.isArray(a)){return"Array";}else if(typeof a==="boolean"){return"Boolean";}else if(typeof a==="number"){return"Number";}else if(typeof a==="string"){return"String";}else if(a===void 0){return"Undefined";}else if(a instanceof RegExp){return"RegExp";}var w=a.toString();if(w.startsWith("async")){return"Async";}else if(w==="[object Promise]"){return"Promise";}else if(w.includes("function")||w.includes("=>")){return"Function";}return"Object";}t.exports=type;},function(y,z,A){"use strict";function _toConsumableArray(B){if(Array.isArray(B)){for(var i=0,C=Array(B.length);i<B.length;i++){C[i]=B[i];}return C;}else{return Array.from(B);}}function curry(f){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var D=arguments.length,p=Array(D),E=0;E<D;E++){p[E]=arguments[E];}return function(o){return o.length>=f.length?f.apply(void 0,_toConsumableArray(o)):curry(f,o);}([].concat(_toConsumableArray(a),p));};}y.exports=curry;},function(F,G,H){"use strict";function baseSlice(I,J,K){var L=-1,M=I.length;K=K>M?M:K;if(K<0){K+=M;}M=J>K?0:K-J>>>0;J>>>=0;var N=Array(M);while(++L<M){N[L]=I[L+J];}return N;}F.exports=baseSlice;},function(O,P,Q){"use strict";var R=Q(5);function contains(S,T){if(T===void 0){return function(U){return contains(S,U);};}var V=-1,W=!1;while(++V<T.length&&!W){if(R(T[V],S)){W=!0;}}return W;}O.exports=contains;},function(X,Y,Z){"use strict";function drop(a1,a){if(a===void 0){return function(b1){return drop(a1,b1);};}return a.slice(a1);}X.exports=drop;},function(c1,d1,e1){"use strict";var f1=e1(0);function equals(a,b){if(b===void 0){return function(g1){return equals(a,g1);};}else if(a===b){return a!==0||1/a===1/b;}var h1=f1(a);if(h1!==f1(b)){return!1;}if(h1==="Array"){var i1=Array.from(a),j1=Array.from(b);return i1.sort().toString()===j1.sort().toString();}if(h1==="Object"){var k1=Object.keys(a);if(k1.length===Object.keys(b).length){if(k1.length===0){return!0;}var l1=!0;k1.map(function(m1){if(l1){var n1=f1(a[m1]),o1=f1(b[m1]);if(n1===o1){if(n1==="Object"){if(Object.keys(a[m1]).length===Object.keys(b[m1]).length){if(Object.keys(a[m1]).length!==0){if(!equals(a[m1],b[m1])){l1=!1;}}}else{l1=!1;}}else if(!equals(a[m1],b[m1])){l1=!1;}}else{l1=!1;}}});return l1;}}return!1;}c1.exports=equals;},function(p1,q1,r1){"use strict";function map(fn,t1){if(t1===void 0){return function(u1){return map(fn,u1);};}var v1=-1,w1=t1.length,x1=Array(w1);while(++v1<w1){x1[v1]=fn(t1[v1]);}return x1;}p1.exports=map;},function(y1,z1,A1){"use strict";function merge(B1,C1){if(C1===void 0){return function(D1){return merge(B1,D1);};}return Object.assign({},B1,C1);}y1.exports=merge;},function(E1,F1,G1){"use strict";function add(a,b){if(b===void 0){return function(c){return add(a,c);};}return a+b;}E1.exports=add;},function(H1,I1,J1){"use strict";function addIndex(K1){return function(fn){for(var M1=0,newFn=function newFn(){for(var N1=arguments.length,O1=Array(N1),P1=0;P1<N1;P1++){O1[P1]=arguments[P1];}return fn.apply(null,[].concat(O1,[M1++]));},Q1=arguments.length,R1=Array(Q1>1?Q1-1:0),S1=1;S1<Q1;S1++){R1[S1-1]=arguments[S1];}return K1.apply(null,[newFn].concat(R1));};}H1.exports=addIndex;},function(T1,U1,V1){"use strict";var W1=V1(1);function adjust(fn,Y1,Z1){if(Y1===void 0){return function(a2,b2){return adjust(fn,a2,b2);};}else if(Z1===void 0){return function(c2){return adjust(fn,Y1,c2);};}var d2=Z1.concat();return d2.map(function(e2,f2){if(f2===Y1){return fn(Z1[Y1]);}return e2;});}T1.exports=adjust;},function(g2,h2,i2){"use strict";function any(fn,k2){if(k2===void 0){return function(l2){return any(fn,l2);};}var m2=0;while(m2<k2.length){if(fn(k2[m2])){return!0;}m2++;}return!1;}g2.exports=any;},function(n2,o2,p2){"use strict";function append(q2,r2){if(r2===void 0){return function(s2){return append(q2,s2);};}var t2=r2.concat();t2.push(q2);return t2;}n2.exports=append;},function(u2,v2,w2){"use strict";var compose=function compose(){for(var x2=arguments.length,y2=Array(x2),z2=0;z2<x2;z2++){y2[z2]=arguments[z2];}return function(A2){var B2=y2.slice();while(B2.length>0){A2=B2.pop()(A2);}return A2;};};u2.exports=compose;},function(C2,D2,E2){"use strict";var F2=E2(0);function defaultTo(G2,H2){if(arguments.length===1){return function(I2){return defaultTo(G2,I2);};}return H2===void 0||!(F2(H2)===F2(G2))?G2:H2;}C2.exports=defaultTo;},function(J2,K2,L2){"use strict";function dropLast(M2,a){if(a===void 0){return function(N2){return dropLast(M2,N2);};}return a.slice(0,-M2);}J2.exports=dropLast;},function(O2,P2,Q2){"use strict";function filter(fn,S2){if(S2===void 0){return function(T2){return filter(fn,T2);};}var U2=-1,V2=0,W2=S2.length,X2=[];while(++U2<W2){var Y2=S2[U2];if(fn(Y2)){X2[V2++]=Y2;}}return X2;}O2.exports=filter;},function(Z2,a3,b3){"use strict";function find(fn,d3){if(d3===void 0){return function(e3){return find(fn,e3);};}return d3.find(fn);}Z2.exports=find;},function(f3,g3,h3){"use strict";function findIndex(fn,j3){if(j3===void 0){return function(k3){return findIndex(fn,k3);};}var l3=j3.length,m3=-1;while(++m3<l3){if(fn(j3[m3])){return m3;}}return-1;}f3.exports=findIndex;},function(n3,o3,p3){"use strict";function flatten(q3,r3){r3=r3===void 0?[]:r3;for(var i=0;i<q3.length;i++){if(Array.isArray(q3[i])){flatten(q3[i],r3);}else{r3.push(q3[i]);}}return r3;}n3.exports=flatten;},function(s3,t3,u3){"use strict";function has(v3,w3){if(w3===void 0){return function(x3){return has(v3,x3);};}return w3[v3]!==void 0;}s3.exports=has;},function(y3,z3,A3){"use strict";function head(a){if(typeof a==="string"){return a[0]||"";}return a[0];}y3.exports=head;},function(B3,C3,D3){"use strict";function includes(x,E3){if(E3===void 0){return function(F3){return includes(x,F3);};}return E3.includes(x);}B3.exports=includes;},function(G3,H3,I3){"use strict";function indexOf(J3,K3){if(K3===void 0){return function(L3){return indexOf(J3,L3);};}var M3=-1,N3=K3.length;while(++M3<N3){if(K3[M3]===J3){return M3;}}return-1;}G3.exports=indexOf;},function(O3,P3,Q3){"use strict";var R3=Q3(2);function init(a){if(typeof a==="string"){return a.slice(0,-1);}return a.length?R3(a,0,-1):[];}O3.exports=init;},function(S3,T3,U3){"use strict";function join(V3,W3){if(W3===void 0){return function(X3){return join(V3,X3);};}return W3.join(V3);}S3.exports=join;},function(Y3,Z3,a4){"use strict";function last(a){if(typeof a==="string"){return a[a.length-1]||"";}return a[a.length-1];}Y3.exports=last;},function(b4,c4,d4){"use strict";function length(e4){return e4.length;}b4.exports=length;},function(f4,g4,h4){"use strict";function match(i4,j4){if(j4===void 0){return function(k4){return match(i4,k4);};}var l4=j4.match(i4);return l4===null?[]:l4;}f4.exports=match;},function(m4,n4,o4){"use strict";function not(x){return!x;}m4.exports=not;},function(p4,q4,r4){"use strict";var s4=r4(0);function omit(t4,u4){if(u4===void 0){return function(v4){return omit(t4,v4);};}if(s4(t4)==='String'){t4=t4.split(',').map(function(x){return x.trim();});}var w4={};for(var x4 in u4){if(!t4.includes(x4)){w4[x4]=u4[x4];}}return w4;}p4.exports=omit;},function(y4,z4,A4){"use strict";var B4=A4(0),C4=A4(7);function curry(fn){var E4=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function(F4){if(B4(fn)==="Async"){return new Promise(function(G4,H4){fn(C4(F4,E4)).then(G4).catch(H4);});}return fn(C4(F4,E4));};}y4.exports=curry;},function(I4,J4,K4){"use strict";var L4=K4(0),M4=K4(1);function path(N4,O4){if(!(L4(O4)==="Object")){return void 0;}var P4=O4,Q4=0;if(typeof N4==="string"){N4=N4.split(".");}while(Q4<N4.length){if(P4===null){return void 0;}P4=P4[N4[Q4]];Q4++;}return P4;}I4.exports=M4(path);},function(R4,S4,T4){"use strict";var U4=T4(0);function pick(V4,W4){if(W4===void 0){return function(X4){return pick(V4,X4);};}if(U4(V4)==='String'){V4=V4.split(',').map(function(x){return x.trim();});}var Y4={},Z4=0;while(Z4<V4.length){if(V4[Z4]in W4){Y4[V4[Z4]]=W4[V4[Z4]];}Z4++;}return Y4;}R4.exports=pick;},function(a5,b5,c5){"use strict";var d5=c5(6);function pluck(e5,f5){if(f5===void 0){return function(g5){return pluck(e5,g5);};}var h5=[];d5(function(i5){if(!(i5[e5]===void 0)){h5.push(i5[e5]);}},f5);return h5;}a5.exports=pluck;},function(j5,k5,l5){"use strict";function prepend(m5,n5){if(n5===void 0){return function(o5){return prepend(m5,o5);};}var p5=n5.concat();p5.unshift(m5);return p5;}j5.exports=prepend;},function(q5,r5,s5){"use strict";function prop(t5,u5){if(u5===void 0){return function(v5){return prop(t5,v5);};}return u5[t5];}q5.exports=prop;},function(w5,x5,y5){"use strict";function propEq(z5,A5,B5){if(A5===void 0){return function(C5,D5){return propEq(z5,C5,D5);};}else if(B5===void 0){return function(E5){return propEq(z5,A5,E5);};}return B5[z5]===A5;}w5.exports=propEq;},function(F5,G5,H5){"use strict";function range(I5,J5){for(var K5=[],i=I5;i<J5;i++){K5.push(i);}return K5;}F5.exports=range;},function(L5,M5,N5){"use strict";function reduce(fn,P5,Q5){if(P5===void 0){return function(R5,S5){return reduce(fn,R5,S5);};}else if(Q5===void 0){return function(T5){return reduce(fn,P5,T5);};}return Q5.reduce(fn,P5);}L5.exports=reduce;},function(U5,V5,W5){"use strict";function repeat(a,X5){if(X5===void 0){return function(Y5){return repeat(a,Y5);};}var Z5=Array(X5);return Z5.fill(a);}U5.exports=repeat;},function(a6,b6,c6){"use strict";function replace(d6,e6,f6){if(e6===void 0){return function(g6,h6){return replace(d6,g6,h6);};}else if(f6===void 0){return function(i6){return replace(d6,e6,i6);};}return f6.replace(d6,e6);}a6.exports=replace;},function(j6,k6,l6){"use strict";function sort(fn,n6){if(n6===void 0){return function(o6){return sort(fn,o6);};}var p6=n6.concat();return p6.sort(fn);}j6.exports=sort;},function(q6,r6,s6){"use strict";function sortBy(fn,u6){if(u6===void 0){return function(v6){return sortBy(fn,v6);};}var w6=u6.concat();return w6.sort(function(a,b){var x6=fn(a),y6=fn(b);return x6<y6?-1:x6>y6?1:0;});}q6.exports=sortBy;},function(z6,A6,B6){"use strict";function split(C6,D6){if(D6===void 0){return function(E6){return split(C6,E6);};}return D6.split(C6);}z6.exports=split;},function(F6,G6,H6){"use strict";function splitEvery(I6,a){if(a===void 0){return function(J6){return splitEvery(I6,J6);};}I6=I6>1?I6:1;var K6=[],L6=0;while(L6<a.length){K6.push(a.slice(L6,L6+=I6));}return K6;}F6.exports=splitEvery;},function(M6,N6,O6){"use strict";function subtract(a,b){if(b===void 0){return function(P6){return subtract(a,P6);};}return a-b;}M6.exports=subtract;},function(Q6,R6,S6){"use strict";var T6=S6(4);function tail(U6){return T6(1,U6);}Q6.exports=tail;},function(V6,W6,X6){"use strict";var Y6=X6(2);function take(Z6,a){if(a===void 0){return function(a7){return take(Z6,a7);};}else if(typeof a==="string"){return a.slice(0,Z6);}return Y6(a,0,Z6);}V6.exports=take;},function(b7,c7,d7){"use strict";var e7=d7(2);function takeLast(f7,a){if(a===void 0){return function(g7){return takeLast(f7,g7);};}var h7=a.length;f7=f7>h7?h7:f7;if(typeof a==="string"){return a.slice(h7-f7);}f7=h7-f7;return e7(a,f7,h7);}b7.exports=takeLast;},function(i7,j7,k7){"use strict";function test(l7,m7){if(m7===void 0){return function(n7){return test(l7,n7);};}return m7.search(l7)===-1?!1:!0;}i7.exports=test;},function(o7,p7,q7){"use strict";function toLower(r7){return r7.toLowerCase();}o7.exports=toLower;},function(s7,t7,u7){"use strict";function toUpper(v7){return v7.toUpperCase();}s7.exports=toUpper;},function(w7,x7,y7){"use strict";function trim(z7){return z7.trim();}w7.exports=trim;},function(A7,B7,C7){"use strict";var D7=C7(3);function uniq(E7){var F7=-1,G7=[];while(++F7<E7.length){var H7=E7[F7];if(!D7(H7,G7)){G7.push(H7);}}return G7;}A7.exports=uniq;},function(I7,J7,K7){"use strict";function update(L7,M7,N7){if(M7===void 0){return function(O7,P7){return update(L7,O7,P7);};}else if(N7===void 0){return function(Q7){return update(L7,M7,Q7);};}var R7=N7.concat();return R7.fill(M7,L7,L7+1);}I7.exports=update;},function(S7,T7,U7){"use strict";function values(V7){var W7=[];for(var X7 in V7){W7.push(V7[X7]);}return W7;}S7.exports=values;},function(Y7,Z7,a8){"use strict";Z7.add=a8(8);Z7.addIndex=a8(9);Z7.any=a8(11);Z7.adjust=a8(10);Z7.append=a8(12);Z7.compose=a8(13);Z7.contains=a8(3);Z7.curry=a8(1);Z7.defaultTo=a8(14);Z7.drop=a8(4);Z7.dropLast=a8(15);Z7.equals=a8(5);Z7.filter=a8(16);Z7.find=a8(17);Z7.findIndex=a8(18);Z7.flatten=a8(19);Z7.has=a8(20);Z7.head=a8(21);Z7.indexOf=a8(23);Z7.includes=a8(22);Z7.init=a8(24);Z7.join=a8(25);Z7.last=a8(26);Z7.length=a8(27);Z7.map=a8(6);Z7.match=a8(28);Z7.merge=a8(7);Z7.not=a8(29);Z7.omit=a8(30);Z7.path=a8(32);Z7.partialCurry=a8(31);Z7.pick=a8(33);Z7.pluck=a8(34);Z7.prepend=a8(35);Z7.prop=a8(36);Z7.propEq=a8(37);Z7.range=a8(38);Z7.repeat=a8(40);Z7.replace=a8(41);Z7.sort=a8(42);Z7.sortBy=a8(43);Z7.split=a8(44);Z7.splitEvery=a8(45);Z7.subtract=a8(46);Z7.tail=a8(47);Z7.take=a8(48);Z7.takeLast=a8(49);Z7.test=a8(50);Z7.toLower=a8(51);Z7.toUpper=a8(52);Z7.trim=a8(53);Z7.type=a8(0);Z7.uniq=a8(54);Z7.update=a8(55);Z7.values=a8(56);Z7.reduce=a8(39);}]);
},{}],11:[function(require,module,exports){
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
        (0, _hyperapp.h)(_Table2.default, { count: state.count, text: state.text, actions: actions }),
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

},{"./components/Input.js":2,"./components/People.js":3,"./components/Spinner.js":5,"./components/Table.js":6,"hyperapp":9}]},{},[8]);
