(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("hyperapp")):"function"==typeof define&&define.amd?define(["exports","hyperapp"],e):e(t.hyperappRouter={},t.hyperapp)}(this,function(t,u){"use strict";function c(t){return t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")}function p(t,e,n,o){return{isExact:t,path:e,url:n,params:o}}function s(t){for(var e=t.length;"/"===t[--e];);return t.slice(0,e+1)}function l(e){try{return decodeURIComponent(e)}catch(t){return e}}var e={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(e){function t(t){e.set({pathname:window.location.pathname,previous:t.detail?window.location.previous=t.detail:window.location.previous})}var n=["pushState","replaceState"].reduce(function(t,e){var o=history[e];return history[e]=function(t,e,n){o.call(this,t,e,n),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=o,t&&t()}},null);return addEventListener("pushstate",t),addEventListener("popstate",t),function(){removeEventListener("pushstate",t),removeEventListener("popstate",t),n()}}};t.Link=function(a,i){return function(t,e){var n=a.to,o=t.location,r=a.onclick;return delete a.to,delete a.location,a.href=n,a.onclick=function(t){var e;r&&r(t),t.defaultPrevented||0!==t.button||t.altKey||t.metaKey||t.ctrlKey||t.shiftKey||"_blank"===a.target||(e=t.currentTarget,c(location)!==c(e))||(t.preventDefault(),n!==o.pathname&&history.pushState(o.pathname,"",n))},u.h("a",a,i)}},t.Route=function(r){return function(t,e){var n=t.location,o=function(t,e,n){if(t===e||!t)return p(t===e,t,e);var o=n&&n.exact,r=s(t).split("/"),a=s(e).split("/");if(!(r.length>a.length||o&&r.length<a.length)){var i=0,u={},c=r.length;for(e="";i<c;i++){if(":"===r[i][0])u[r[i].slice(1)]=a[i]=l(a[i]);else if(r[i]!==a[i])return;e+=a[i]+"/"}return p(!1,t,e.slice(0,-1),u)}}(r.path,n.pathname,{exact:!r.parent});return o&&r.render({match:o,location:n})}},t.Switch=function(t,r){return function(t,e){for(var n,o=0;!(n=r[o]&&r[o](t,e))&&o<r.length;)o++;return n}},t.Redirect=function(o){return function(t,e){var n=t.location;history.replaceState(o.from||n.pathname,"",o.to)}},t.location=e});

},{"hyperapp":2}],2:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;2<o--;)t.push(arguments[o]);for(;t.length;){var l=t.pop();if(l&&l.pop)for(o=l.length;o--;)t.push(l[o]);else null!=l&&!0!==l&&!1!==l&&r.push(l)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,l=[].map,u=r&&r.children[0]||null,i=u&&function n(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:l.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:n(e)})}}(u),f=[],m=!0,a=v(e),c=function e(r,o,l){for(var n in l)"function"==typeof l[n]?function(e,t){l[e]=function(e){var n=t(e);return"function"==typeof n&&(n=n(h(r,a),l)),n&&n!==(o=h(r,a))&&!n.then&&d(a=p(r,v(o,n),a)),n}}(n,l[n]):e(r.concat(n),o[n]=v(o[n]),l[n]=v(l[n]));return l}([],a,v(n));return d(),c;function g(e){return"function"==typeof e?g(e(a,c)):null!=e?e:""}function s(){o=!o;var e=g(t);for(r&&!o&&(u=function e(n,t,r,o,l){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var u=k(o,l);n.insertBefore(u,t),null!=r&&T(n,t,r),t=u}else if(null==r.nodeName)t.nodeValue=o;else{x(t,r.attributes,o.attributes,l=l||"svg"===o.nodeName);for(var i={},f={},a=[],c=r.children,s=o.children,d=0;d<c.length;d++){a[d]=t.childNodes[d];var v=N(c[d]);null!=v&&(i[v]=[a[d],c[d]])}for(var d=0,p=0;p<s.length;){var v=N(c[d]),h=N(s[p]=g(s[p]));if(f[v])d++;else if(null==h||h!==N(c[d+1]))if(null==h||m)null==v&&(e(t,a[d],c[d],s[p],l),p++),d++;else{var y=i[h]||[];v===h?(e(t,y[0],y[1],s[p],l),d++):y[0]?e(t,t.insertBefore(y[0],a[d]),y[1],s[p],l):e(t,a[d],null,s[p],l),f[h]=s[p],p++}else null==v&&T(t,a[d],c[d]),d++}for(;d<c.length;)null==N(c[d])&&T(t,a[d],c[d]),d++;for(var d in i)f[d]||T(t,i[d][0],i[d][1])}return t}(r,u,i,i=e)),m=!1;f.length;)f.pop()()}function d(){o||(o=!0,setTimeout(s))}function v(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function p(e,n,t){var r={};return e.length?(r[e[0]]=1<e.length?p(e.slice(1),n,t[e[0]]):n,v(t,r)):n}function h(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function N(e){return e?e.key:null}function y(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)if("string"==typeof t)e.style.cssText=t;else for(var l in"string"==typeof r&&(r=e.style.cssText=""),v(r,t)){var u=null==t||null==t[l]?"":t[l];"-"===l[0]?e.style.setProperty(l,u):e.style[l]=u}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},(e.events[n]=t)?r||e.addEventListener(n,y):e.removeEventListener(n,y)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),r=e.attributes;if(r){r.oncreate&&f.push(function(){r.oncreate(t)});for(var o=0;o<e.children.length;o++)t.appendChild(k(e.children[o]=g(e.children[o]),n));for(var l in r)b(t,l,r[l],null,n)}return t}function x(e,n,t,r){for(var o in v(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var l=m?t.oncreate:t.onupdate;l&&f.push(function(){l(e,n)})}function T(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});

},{}],3:[function(require,module,exports){
'use strict';

var _forms = require('./forms.js');

module.exports = {
  login: function login(g_actions) {
    return function (state, actions) {
      actions.updateLoading(true);
      var data = {
        username: state.forms.login.username,
        password: state.forms.login.password
      };
      fetch(g_urls.login, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      }).then(function (j) {
        if (j.key) {
          console.log("OK", j.key, state.forms.login.username);
          actions.updateLogin({ key: j.key, username: state.forms.login.username });
          g_actions.location.go("/");
          g_actions.toasts.add({ text: "Successfully logged in!", style: "success" });
        } else {
          g_actions.toasts.add({ text: "Error while logging in - please try again!", style: "error" });
        }
        actions.updateLoading(false);
      });
    };
  },
  logout: function logout(g_actions) {
    return function (state, actions) {
      actions.updateLoading(true);
      setTimeout(function () {
        return fetch(g_urls.logout, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        }).then(function (r) {
          return r.json();
        }).then(function (j) {
          actions.updateLogin({ key: null, username: null });
          g_actions.location.go("/");
          actions.updateLoading(false);
          g_actions.toasts.add({ text: "Successfully logged out!", style: "success" });
        });
      }, 500);
    };
  },
  updateLoading: function updateLoading(loading) {
    return function (state) {
      return {
        loading: loading
      };
    };
  },
  updateLogin: function updateLogin(_ref) {
    var key = _ref.key,
        username = _ref.username;
    return function (state) {
      localStorage.setItem("auth", JSON.stringify({ key: key, username: username }));
      return {
        key: key,
        username: username,
        forms: {
          login: {}
        }
      };
    };
  },
  updateField: _forms.updateField
};

},{"./forms.js":4}],4:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (ajaxUrl) {
    return {

        updateField: function updateField(_ref) {
            var formname = _ref.formname,
                fieldname = _ref.fieldname,
                value = _ref.value;
            return function (state) {
                console.log("Update ", formname, fieldname, value);
                return {
                    forms: Object.assign({}, state.forms, _defineProperty({}, formname, Object.assign({}, state.forms[formname], _defineProperty({}, fieldname, value))))
                };
            };
        },

        addErrors: function addErrors(_ref2) {
            var formname = _ref2.formname,
                errors = _ref2.errors;
            return function (state) {
                console.log("Add errors ", errors);
                return {
                    forms: Object.assign({}, state.forms, _defineProperty({}, formname, Object.assign({}, state.forms[formname], {
                        errors: errors
                    })))
                };
            };
        },

        searchAction: function searchAction(reset) {
            return function (state, actions) {
                if (reset) {
                    actions.load(state.current.split('?')[0]);
                    return {
                        forms: Object.assign({}, state['forms'], {
                            search: {}
                        })
                    };
                } else {
                    var params = Object.keys(state.forms.search).map(function (k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(state.forms.search[k]);
                    }).join('&');
                    actions.load(state.current.split('?')[0] + '?' + params);
                }
            };
        },

        saveEdit: function saveEdit(_ref3) {
            var key = _ref3.key,
                g_actions = _ref3.g_actions;
            return function (state, actions) {
                actions.updateLoading(true);
                var item = state.forms.edit;

                for (var k in item) {
                    var v = item[k];
                    if (Array.isArray(v)) {
                        item[k] = v.map(function (x) {
                            return {
                                'id': x.id,
                                'name': x.text
                            };
                        });
                    }
                }
                var saveUrl = '';
                var method = '';
                if (item.id) {
                    // UPDATE
                    saveUrl = ajaxUrl + item.id + '/';
                    method = 'PATCH';
                } else {
                    // CREATE
                    saveUrl = ajaxUrl;
                    method = 'POST';
                }

                window.setTimeout(function () {
                    fetch(saveUrl, {
                        body: JSON.stringify(item),
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': 'Token ' + key
                        },
                        method: method
                    }).then(function (response) {
                        actions.updateLoading(false);

                        if (response.status == 400) {
                            response.json().then(function (errors) {
                                actions.addErrors({ formname: 'edit', errors: errors });
                            });
                        } else if (response.status == 200 || response.status == 201) {
                            response.json().then(function (data) {
                                // Data is the object that was saved
                                g_actions.toasts.add({ text: 'Successfully saved object!', style: 'success' });
                                actions.updateEdit(null);
                                actions.load(state.current);
                            });
                        }
                    }).catch(function (error) {
                        console.log('ERR', error.status);
                    });
                }, 500);
            };
        }
    };
};

},{}],5:[function(require,module,exports){
"use strict";

var _router = require("@hyperapp/router");

var _auth = require("./auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _toasts = require("./toasts.js");

var _toasts2 = _interopRequireDefault(_toasts);

var _view_actions = require("./view_actions");

var _view_actions2 = _interopRequireDefault(_view_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = module.exports = {
    location: _router.location.actions,
    auth: _auth2.default,
    people: (0, _view_actions2.default)(window.g_urls.people),
    genres: (0, _view_actions2.default)(window.g_urls.genres),
    jobs: (0, _view_actions2.default)(window.g_urls.jobs),
    movies: Object.assign({}, (0, _view_actions2.default)(window.g_urls.movies), {
        updateShowPlot: function updateShowPlot(showPlot) {
            return function (state) {
                return {
                    showPlot: showPlot
                };
            };
        }
    }),
    toasts: _toasts2.default

};

},{"./auth.js":3,"./toasts.js":6,"./view_actions":7,"@hyperapp/router":1}],6:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = {
  add: function add(_ref) {
    var text = _ref.text,
        style = _ref.style;
    return function (state, actions) {
      // Hide toast after 10 s
      window.setTimeout(function () {
        actions.hide(text);
      }, 10000);
      return {
        items: [].concat(_toConsumableArray(state.items), [{ text: text, style: style }])
      };
    };
  },

  hide: function hide(text) {
    return function (state) {
      var idx = state.items.map(function (v) {
        return v.text;
      }).indexOf(text);
      return {
        items: [].concat(_toConsumableArray(state.items.slice(0, idx)), _toConsumableArray(state.items.slice(idx + 1)))
      };
    };
  },
  clear: function clear() {
    return function (state) {
      return {
        items: []
      };
    };
  }
};

},{}],7:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _forms = require("./forms.js");

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (ajaxUrl) {
  return _extends({
    load: function load(url) {
      return function (state, actions) {
        actions.updateLoading(true);

        setTimeout(function () {
          return fetch(url).then(function (r) {
            return r.json();
          }).then(function (j) {
            var match = url.match(/\?page=(\d+)/);
            var page = 1;
            if (match) page = 1 * match[1];

            actions.update({ response: j, current: url, page: page });
            actions.updateLoading(false);
          });
        }, 100);
      };
    },

    updateLoading: function updateLoading(loading) {
      return function (state) {
        return {
          loading: loading
        };
      };
    },

    update: function update(_ref) {
      var response = _ref.response,
          current = _ref.current,
          page = _ref.page;
      return function (state) {
        return {
          page: page,
          current: current,
          count: response.count,
          next: response.next,
          previous: response.previous,
          items: response.results
        };
      };
    },

    updateEdit: function updateEdit(item) {
      return function (state) {
        return {
          forms: Object.assign({}, state['forms'], {
            edit: item
          })
        };
      };
    }

  }, (0, _forms2.default)(ajaxUrl));
};

},{"./forms.js":4}],8:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

module.exports = function (_ref) {
  var state = _ref.state,
      actions = _ref.actions;
  return (0, _hyperapp.h)(
    "div",
    { className: "accordion" },
    (0, _hyperapp.h)("input", { type: "checkbox", id: "accordion-1", name: "accordion-checkbox", hidden: true }),
    (0, _hyperapp.h)(
      "label",
      { className: "accordion-header", "for": "accordion-1" },
      (0, _hyperapp.h)("i", { className: "icon icon-arrow-right mr-1" }),
      "Show state"
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "accordion-body" },
      (0, _hyperapp.h)(
        "pre",
        null,
        (0, _hyperapp.h)(
          "small",
          null,
          JSON.stringify(state, null, 2)
        )
      )
    )
  );
};

},{"hyperapp":2}],9:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var dateInput = function dateInput(element) {
    flatpickr(element, {
        onChange: function onChange(selectedDates, dateStr, instance) {
            console.log("CHANGED", selectedDates, dateStr, instance);
        }
    });
};

var FormDateInput = module.exports = function (_ref) {
    var value = _ref.value,
        action = _ref.action;
    return h(
        "div",
        { "class": "form-group" },
        h(
            "label",
            { "class": "form-label", "for": "{field.label}" },
            field.label
        ),
        h("input", { "class": "form-input", type: "text", id: "{field.label}",
            placeholder: field.label, value: value,
            onkeyup: function onkeyup(e) {
                return action(e.target.value);
            },
            oncreate: dateInput
        })
    );
};

},{"hyperapp":2}],10:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var AbstractInput = function AbstractInput(_ref) {
    var field = _ref.field,
        action = _ref.action,
        realInput = _ref.realInput;
    return (0, _hyperapp.h)(
        'div',
        { 'class': 'form-group ' + (field.errors ? 'has-error' : ''), key: field.key },
        (0, _hyperapp.h)(
            'label',
            { 'class': 'form-label', 'for': '{field.key}' },
            field.label
        ),
        realInput,
        (0, _hyperapp.h)(
            'div',
            { 'class': 'form-input-hint' },
            field.errors ? field.errors[0] : null
        )
    );
};

var FormInput = function FormInput(_ref2) {
    var field = _ref2.field,
        action = _ref2.action;
    return AbstractInput({
        field: field,
        action: action,
        realInput: (0, _hyperapp.h)('input', { 'class': 'form-input', type: field.type, id: field.key,
            placeholder: field.label, value: field.value,
            oninput: function oninput(e) {
                return action(e.target.value);
            }
        })
    });
};

var FormInputLong = function FormInputLong(_ref3) {
    var field = _ref3.field,
        action = _ref3.action;
    return AbstractInput({
        field: field,
        action: action,
        realInput: (0, _hyperapp.h)('textarea', { 'class': 'form-input', id: field.key, rows: '5',
            placeholder: field.label,
            oninput: function oninput(e) {
                return action(e.target.value);
            },
            value: field.value
        })

    });
};

module.exports['FormInput'] = FormInput;
module.exports['FormInputLong'] = FormInputLong;

},{"hyperapp":2}],11:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FormInputs = require('./FormInputs.js');

var _FormDateInput = require('./FormDateInput.js');

var _FormDateInput2 = _interopRequireDefault(_FormDateInput);

var _MultiSelect = require('./MultiSelect.js');

var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

var _Spinners = require('../components/Spinners.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_FormDateInput2.default);

var renderField = function renderField(field, updateFieldAction) {
  var ftype = undefined;
  switch (field.type) {
    case 'longtext':
      ftype = _FormInputs.FormInputLong;break;
    case 'text':
      ftype = _FormInputs.FormInput;break;
    case 'number':
      ftype = _FormInputs.FormInput;break;
    case 'multiselect':
      ftype = _MultiSelect2.default;break;
    case 'date':
      ftype = _FormDateInput2.default;break;
  }
  return ftype({
    field: field,
    action: function action(val) {
      return updateFieldAction(field.key, val);
    }
  });
};

var renderFields = function renderFields(fields, updateFieldAction) {
  return fields.map(function (f) {
    return renderField(f, updateFieldAction);
  });
};

var ModalForm = module.exports = function (_ref) {
  var loading = _ref.loading,
      formFields = _ref.formFields,
      item = _ref.item,
      hideAction = _ref.hideAction,
      saveAction = _ref.saveAction,
      updateFieldAction = _ref.updateFieldAction;
  return (0, _hyperapp.h)(
    'div',
    { className: 'modal ' + (item ? 'active' : '') },
    (0, _hyperapp.h)('div', { 'class': 'modal-overlay' }),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'modal-container' },
      (0, _hyperapp.h)(
        'div',
        { 'class': 'modal-header' },
        (0, _hyperapp.h)('button', { 'class': 'btn btn-clear float-right', onclick: hideAction }),
        (0, _hyperapp.h)(
          'div',
          { 'class': 'modal-title h5' },
          item.id ? 'Editing form for item ' + item.id : "Add new item!"
        )
      ),
      (0, _hyperapp.h)(
        'div',
        { 'class': 'modal-body' },
        (0, _hyperapp.h)(
          'div',
          { 'class': 'content' },
          (0, _hyperapp.h)(
            'form',
            { method: 'POST' },
            renderFields(formFields, updateFieldAction)
          )
        )
      ),
      (0, _hyperapp.h)(
        'div',
        { 'class': 'modal-footer' },
        loading ? (0, _hyperapp.h)(_Spinners.SpinnerSmall, null) : (0, _hyperapp.h)(
          'div',
          null,
          (0, _hyperapp.h)(
            'button',
            { 'class': 'btn', onclick: hideAction },
            'Cancel'
          ),
          (0, _hyperapp.h)(
            'button',
            { 'class': 'ml-2 btn btn-primary', onclick: saveAction },
            'Ok'
          )
        )
      )
    )
  );
};

},{"../components/Spinners.js":16,"./FormDateInput.js":9,"./FormInputs.js":10,"./MultiSelect.js":12,"hyperapp":2}],12:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var xMultiSelect = function xMultiSelect(_ref) {
    var field = _ref.field,
        action = _ref.action;
    return AbstractInput({
        field: field,
        action: action,
        realInput: (0, _hyperapp.h)('input', { 'class': 'form-input', type: field.type, id: field.key,
            placeholder: field.label, value: field.value,
            oninput: function oninput(e) {
                return action(e.target.value);
            }
        })
    });
};

var data = [{
    value: '1',
    text: 'Amethyst'
}, {
    value: 2,
    text: 'Wisteria'
}];

var MultiSelect = function MultiSelect(_ref2) {
    var label = _ref2.label,
        field = _ref2.field,
        action = _ref2.action;
    return (0, _hyperapp.h)(
        'div',
        { 'class': 'form-group' },
        (0, _hyperapp.h)(
            'label',
            { 'class': 'form-label', 'for': '{field.label}' },
            field.label
        ),
        (0, _hyperapp.h)('select', { name: '', style: 'width: 50%', multiple: 'multiple', oncreate: function oncreate(element) {
                $(element).select2({
                    ajax: {
                        url: '/api/genres/',
                        dataType: 'json',
                        delay: 250,
                        placeholder: 'Search for genres',
                        data: function data(params) {
                            return {
                                name: params.term
                            };
                        },
                        processResults: function processResults(data) {
                            return {
                                results: data.results.map(function (r) {
                                    return { 'id': r.id, 'text': r.name };
                                })
                            };
                        }
                    }
                });
                if (field.value) {
                    field.value.forEach(function (v) {
                        var option = new Option(v.name, v.id, true, true);
                        $(element).append(option).trigger('change');
                    });
                }
                $(element).on('change', function (e) {

                    console.log(e);
                    var newval = $(element).select2('data');
                    console.log(newval);
                    action(newval);
                });
            } })
    );
};

module.exports = MultiSelect;

},{"hyperapp":2}],13:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var Pagination = module.exports = function (_ref) {
    var page = _ref.page,
        next = _ref.next,
        previous = _ref.previous,
        loadAction = _ref.loadAction;
    return h(
        'ul',
        { 'class': 'pagination' },
        h(
            'li',
            { 'class': 'page-item ' + (previous ? '' : 'disabled') },
            h(
                'a',
                { onclick: function onclick() {
                        return loadAction(previous);
                    }, href: '#', tabindex: '-1' },
                'Previous'
            )
        ),
        h(
            'li',
            { 'class': 'page-item' },
            h(
                'a',
                { href: '#' },
                page
            )
        ),
        h(
            'li',
            { 'class': 'page-item ' + (next ? '' : 'disabled') },
            h(
                'a',
                { onclick: function onclick() {
                        return loadAction(next);
                    }, href: '#' },
                'Next'
            )
        )
    );
};

},{"hyperapp":2}],14:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var PlotModal = module.exports = function (_ref) {
    var movie = _ref.movie,
        actions = _ref.actions;
    return h(
        'div',
        { className: 'modal ' + (movie ? 'active' : '') },
        h('div', { 'class': 'modal-overlay' }),
        h(
            'div',
            { 'class': 'modal-container' },
            h(
                'div',
                { 'class': 'modal-header' },
                h('button', { 'class': 'btn btn-clear float-right', onclick: function onclick() {
                        return actions.updateShowPlot(null);
                    } }),
                h(
                    'div',
                    { 'class': 'modal-title h5' },
                    movie.title
                )
            ),
            h(
                'div',
                { 'class': 'modal-body' },
                h(
                    'div',
                    { 'class': 'content' },
                    movie.story
                )
            ),
            h(
                'div',
                { 'class': 'modal-footer' },
                h(
                    'button',
                    { 'class': 'btn', onclick: function onclick() {
                            return actions.updateShowPlot(null);
                        } },
                    'Ok'
                )
            )
        )
    );
};

},{"hyperapp":2}],15:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Spinners = require('../components/Spinners.js');

var renderField = function renderField(field, updateFieldAction) {
    var ftype = FormInput;
    if (field.type == 'longtext') ftype = FormInputLong;
    return ftype({
        field: field,
        action: function action(val) {
            return updateFieldAction(field.key, val);
        }
    });
};

var renderFields = function renderFields(fields, updateFieldAction) {
    return fields.map(function (f) {
        return renderField(f, updateFieldAction);
    });
};

var SearchForm = module.exports = function (_ref) {
    var loading = _ref.loading,
        formFields = _ref.formFields,
        searchAction = _ref.searchAction,
        updateFieldAction = _ref.updateFieldAction;
    return (0, _hyperapp.h)(
        'form',
        { method: 'GET', 'class': 'form-horizontal' },
        (0, _hyperapp.h)(
            'div',
            { 'class': 'form-group' },
            formFields.map(function (f) {
                return (0, _hyperapp.h)(
                    'div',
                    { key: f.key },
                    (0, _hyperapp.h)(
                        'label',
                        { 'class': 'form-label', 'for': f.key },
                        f.label
                    ),
                    (0, _hyperapp.h)('input', { 'class': 'form-input', type: f.type, id: f.key, placeholder: f.label, value: f.value,
                        oninput: function oninput(e) {
                            return updateFieldAction(f.key, e.target.value);
                        }
                    })
                );
            }),
            loading ? (0, _hyperapp.h)(_Spinners.SpinnerSmall, null) : (0, _hyperapp.h)(
                'div',
                null,
                (0, _hyperapp.h)(
                    'button',
                    { style: { marginTop: '2.3em' }, 'class': 'btn ml-2 btn-primary', onclick: function onclick(e) {
                            e.preventDefault();searchAction();return false;
                        } },
                    'Filter'
                ),
                (0, _hyperapp.h)(
                    'button',
                    { style: { 'margin-top': '2.3em' }, 'class': 'btn ml-2', onclick: function onclick(e) {
                            e.preventDefault();searchAction(true);return false;
                        } },
                    'Reset'
                )
            )
        )
    );
};

},{"../components/Spinners.js":16,"hyperapp":2}],16:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var Spinner = function Spinner() {
    return (0, _hyperapp.h)(
        "div",
        { "class": "spinner" },
        (0, _hyperapp.h)("div", { "class": "bounce1" }),
        (0, _hyperapp.h)("div", { "class": "bounce2" }),
        (0, _hyperapp.h)("div", { "class": "bounce3" })
    );
};

var SpinnerSmall = module.exports = function () {
    return (0, _hyperapp.h)("div", { "class": "loading loading-lg" });
};

module.exports['Spinner'] = Spinner;
module.exports['SpinnerSmall'] = SpinnerSmall;

},{"hyperapp":2}],17:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Pagination = require('../components/Pagination.js');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = module.exports = function (_ref) {
    var row = _ref.row,
        rowColumns = _ref.rowColumns,
        actions = _ref.actions;
    return (0, _hyperapp.h)(
        'tr',
        null,
        rowColumns.map(function (z) {
            return (0, _hyperapp.h)(
                'td',
                null,
                z(row, actions)
            );
        })
    );
};

var Table = module.exports = function (_ref2) {
    var rowHeaders = _ref2.rowHeaders,
        rowColumns = _ref2.rowColumns,
        rows = _ref2.rows,
        actions = _ref2.actions;
    return (0, _hyperapp.h)(
        'div',
        null,
        (0, _hyperapp.h)(
            'table',
            { 'class': 'table table-striped table-hover' },
            (0, _hyperapp.h)(
                'thead',
                null,
                (0, _hyperapp.h)(
                    'tr',
                    null,
                    rowHeaders.map(function (z) {
                        return (0, _hyperapp.h)(
                            'th',
                            null,
                            z
                        );
                    })
                )
            ),
            (0, _hyperapp.h)(
                'tbody',
                null,
                rows.items.map(function (z) {
                    return (0, _hyperapp.h)(Row, { row: z, rowColumns: rowColumns, actions: actions });
                })
            )
        ),
        (0, _hyperapp.h)(_Pagination2.default, { page: rows.page, next: rows.next, previous: rows.previous, loadAction: actions.load })
    );
};

},{"../components/Pagination.js":13,"hyperapp":2}],18:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _router = require('@hyperapp/router');

var createTab = function createTab(url, title) {
  return function (currentLocation) {
    return (0, _hyperapp.h)(
      'li',
      { className: 'tab-item ' + (currentLocation.pathname == url ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: url },
        title
      )
    );
  };
};

var Table = module.exports = function (_ref) {
  var currentLocation = _ref.currentLocation,
      auth = _ref.auth,
      actions = _ref.actions;
  return (0, _hyperapp.h)(
    'ul',
    { 'class': 'tab tab-block' },
    createTab("/", "Home")(currentLocation),
    createTab("/movies", "Movies")(currentLocation),
    createTab("/people", "People")(currentLocation),
    createTab("/genres", "Genres")(currentLocation),
    createTab("/jobs", "Jobs")(currentLocation),
    auth.key ? (0, _hyperapp.h)(
      'div',
      null,
      (0, _hyperapp.h)(
        'span',
        { 'class': 'chip' },
        auth.username
      ),
      (0, _hyperapp.h)(
        'button',
        { 'class': 'btn', onclick: function onclick() {
            return actions.auth.logout(actions);
          } },
        'Logout'
      )
    ) : (0, _hyperapp.h)(
      'li',
      { className: 'tab-item ' + (currentLocation.pathname == '/login' ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: '/login' },
        'Login'
      )
    )
  );
};

},{"@hyperapp/router":1,"hyperapp":2}],19:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var Toast = function Toast(_ref) {
  var text = _ref.text,
      actions = _ref.actions,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? 'primary' : _ref$style;
  return (0, _hyperapp.h)(
    'div',
    { className: 'toast toast-' + style },
    (0, _hyperapp.h)('button', { className: 'btn btn-clear float-right', onclick: function onclick() {
        return actions.toasts.hide(text);
      } }),
    text
  );
};

var ToastContainer = module.exports = function (_ref2) {
  var toasts = _ref2.toasts,
      actions = _ref2.actions;
  return (0, _hyperapp.h)(
    'div',
    { className: 'toast-container' },
    toasts.items.map(function (t) {
      return (0, _hyperapp.h)(Toast, { text: t.text, style: t.style, actions: actions });
    })
  );
};

},{"hyperapp":2}],20:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _router = require('@hyperapp/router');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _Main = require('./views/Main.js');

var _Main2 = _interopRequireDefault(_Main);

var _state = require('./state.js');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = (0, _hyperapp.app)(_state2.default, _actions2.default, _Main2.default, document.getElementById('app'));

var unsubscribe = _router.location.subscribe(application.location);

var hideToasts = function hideToasts() {
  application.toasts.clear();
};

_actions2.default.location.go('/');

addEventListener('pushstate', hideToasts);
addEventListener('popstate', hideToasts);

},{"./actions":5,"./state.js":21,"./views/Main.js":27,"@hyperapp/router":1,"hyperapp":2}],21:[function(require,module,exports){
'use strict';

var _auth = require('./util/auth.js');

var genericState = {
  loading: false,
  page: null,
  count: 0,
  next: null,
  previous: null,
  items: [],
  forms: {
    edit: null,
    search: {}
  }
};

var existingAuth = (0, _auth.getExistingAuth)();

var state = module.exports = {
  auth: {
    key: existingAuth.key,
    username: existingAuth.username,
    loading: false,
    forms: {
      login: {}
    }
  },
  location: location.state,
  toasts: {
    items: []
  },
  movies: Object.assign({}, genericState, {
    showPlot: false
  }),
  people: Object.assign({}, genericState),
  genres: Object.assign({}, genericState),
  jobs: Object.assign({}, genericState)
};

},{"./util/auth.js":22}],22:[function(require,module,exports){
'use strict';

var checkAuth = function checkAuth(list, auth) {
  if (auth.key) return list;
  return list.slice(0, -1);
};

var getExistingAuth = function getExistingAuth() {
  var existingAuth = localStorage.getItem('auth');

  if (existingAuth) {
    try {
      existingAuth = JSON.parse(existingAuth);
    } catch (error) {
      existingAuth = null;
    }
  }
  if (!existingAuth) existingAuth = { key: '', username: '' };
  return existingAuth;
};

module.exports = {
  checkAuth: checkAuth, getExistingAuth: getExistingAuth
};

},{}],23:[function(require,module,exports){
'use strict';

var mergeValuesErrors = function mergeValuesErrors(formFields, item, errors) {
    return formFields.map(function (f) {
        return Object.assign({}, f, {
            'value': item[f.key]
        }, errors ? {
            'errors': errors[f.key]
        } : {});
    });
};

module.exports = {
    mergeValuesErrors: mergeValuesErrors
};

},{}],24:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Spinners = require('../components/Spinners.js');

var _Table = require('../components/Table.js');

var _Table2 = _interopRequireDefault(_Table);

var _ModalForm = require('../components/ModalForm.js');

var _ModalForm2 = _interopRequireDefault(_ModalForm);

var _SearchForm = require('../components/SearchForm.js');

var _SearchForm2 = _interopRequireDefault(_SearchForm);

var _forms = require('../util/forms.js');

var _auth = require('../util/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var key = _ref.key,
      rowHeaders = _ref.rowHeaders,
      rowColumns = _ref.rowColumns,
      formFields = _ref.formFields,
      title = _ref.title,
      extraView = _ref.extraView;
  return function (state, actions, g_actions) {
    return (0, _hyperapp.h)(
      'div',
      { key: key },
      (0, _hyperapp.h)(
        'h2',
        null,
        title,
        ' \xA0  \xA0',
        state.auth.key ? (0, _hyperapp.h)(
          'button',
          { className: 'btn btn-primary btn-action btn-lg', onclick: function onclick() {
              return actions.updateEdit({});
            } },
          (0, _hyperapp.h)('i', { className: 'icon icon-plus' })
        ) : null
      ),
      (0, _hyperapp.h)(
        'div',
        { className: 'columns' },
        (0, _hyperapp.h)(
          'div',
          { className: 'column col-lg-12', oncreate: function oncreate() {
              return actions.load(window.g_urls[key]);
            } },
          (0, _hyperapp.h)(_SearchForm2.default, {
            formFields: (0, _forms.mergeValuesErrors)(formFields, state[key].forms.search, null),
            updateFieldAction: function updateFieldAction(key, value) {
              return actions.updateField({ formname: 'search', fieldname: key, value: value });
            },
            searchAction: actions.searchAction
          }),
          state[key].loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)(_Table2.default, {
            rowHeaders: (0, _auth.checkAuth)(rowHeaders, state.auth),
            rowColumns: (0, _auth.checkAuth)(rowColumns, state.auth),
            rows: state[key],
            actions: actions
          })
        )
      ),
      state[key].forms.edit ? (0, _hyperapp.h)(_ModalForm2.default, {
        loading: state[key].loading,
        formFields: (0, _forms.mergeValuesErrors)(formFields, state[key].forms.edit, state[key].forms.edit.errors),
        item: state[key].forms.edit,
        hideAction: function hideAction() {
          return actions.updateEdit(null);
        },
        saveAction: function saveAction() {
          return actions.saveEdit({ g_actions: g_actions, key: state.auth.key });
        },
        updateFieldAction: function updateFieldAction(key, value) {
          return actions.updateField({ formname: 'edit', fieldname: key, value: value });
        }
      }) : null,
      extraView ? extraView(state, actions) : null
    );
  };
};

},{"../components/ModalForm.js":11,"../components/SearchForm.js":15,"../components/Spinners.js":16,"../components/Table.js":17,"../util/auth":22,"../util/forms.js":23,"hyperapp":2}],25:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var Home = module.exports = function (state, actions) {
    return (0, _hyperapp.h)(
        "div",
        { key: "home" },
        state.auth.key ? (0, _hyperapp.h)(
            "span",
            null,
            "Hello, ",
            state.auth.username,
            "!"
        ) : (0, _hyperapp.h)(
            "span",
            null,
            "Please login to edit things"
        )
    );
};

},{"hyperapp":2}],26:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FormInputs = require('../components/FormInputs.js');

var _Spinners = require('../components/Spinners.js');

var okClick = function okClick(e, actions, g_actions) {
  actions.login(g_actions);
  console.log(e);
  e.preventDefault();
  return false;
};

var Login = module.exports = function (state, actions, g_actions) {
  return (0, _hyperapp.h)(
    'div',
    { key: 'login' },
    (0, _hyperapp.h)(
      'h2',
      null,
      'Login'
    ),
    (0, _hyperapp.h)(
      'form',
      { method: 'POST' },
      (0, _hyperapp.h)(_FormInputs.FormInput, {
        field: { label: 'Username', value: state.forms.login.username, type: 'text' },
        action: function action(value) {
          return actions.updateField({ formname: 'login', fieldname: 'username', value: value });
        } }),
      (0, _hyperapp.h)(_FormInputs.FormInput, {
        field: { label: 'Password', value: state.forms.login.password, type: 'password' },
        action: function action(value) {
          return actions.updateField({ formname: 'login', fieldname: 'password', value: value });
        } }),
      state.loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)(
        'button',
        { id: 'btn', name: 'btn', className: 'btn btn-primary', onclick: function onclick(e) {
            okClick(e, actions, g_actions);
          } },
        'Ok'
      )
    )
  );
};

},{"../components/FormInputs.js":10,"../components/Spinners.js":16,"hyperapp":2}],27:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _router = require('@hyperapp/router');

var _Home = require('./Home.js');

var _Home2 = _interopRequireDefault(_Home);

var _Movies = require('./Movies.js');

var _Movies2 = _interopRequireDefault(_Movies);

var _People = require('./People.js');

var _People2 = _interopRequireDefault(_People);

var _SimpleFilterTableView = require('./SimpleFilterTableView.js');

var _SimpleFilterTableView2 = _interopRequireDefault(_SimpleFilterTableView);

var _Login = require('./Login.js');

var _Login2 = _interopRequireDefault(_Login);

var _Tabs = require('../components/Tabs.js');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _ToastContainer = require('../components/ToastContainer.js');

var _ToastContainer2 = _interopRequireDefault(_ToastContainer);

var _DebugContainer = require('../components/DebugContainer.js');

var _DebugContainer2 = _interopRequireDefault(_DebugContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, actions) {
  return (0, _hyperapp.h)(
    'div',
    { className: 'container grid-xl' },
    (0, _hyperapp.h)(_Tabs2.default, { currentLocation: state.location, auth: state.auth, actions: actions }),
    (0, _hyperapp.h)(
      _router.Switch,
      null,
      (0, _hyperapp.h)(_router.Route, { path: '/', render: function render() {
          return (0, _Home2.default)(state, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/movies', render: function render() {
          return (0, _Movies2.default)(state, actions.movies, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/people', render: function render() {
          return (0, _People2.default)(state, actions.people, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/genres', render: function render() {
          return (0, _SimpleFilterTableView2.default)({ key: 'genres', title: 'Genres' })(state, actions.genres, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/jobs', render: function render() {
          return (0, _SimpleFilterTableView2.default)({ key: 'jobs', title: 'Jobs' })(state, actions.jobs, actions);
        } }),
      (0, _hyperapp.h)(_router.Route, { path: '/login', render: function render() {
          return (0, _Login2.default)(state.auth, actions.auth, actions);
        } })
    ),
    (0, _hyperapp.h)(_ToastContainer2.default, { toasts: state.toasts, actions: actions }),
    (0, _hyperapp.h)('hr', null),
    (0, _hyperapp.h)(_DebugContainer2.default, { state: state, actions: actions })
  );
};

},{"../components/DebugContainer.js":8,"../components/Tabs.js":18,"../components/ToastContainer.js":19,"./Home.js":25,"./Login.js":26,"./Movies.js":28,"./People.js":29,"./SimpleFilterTableView.js":30,"@hyperapp/router":1,"hyperapp":2}],28:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _PlotModal = require('../components/PlotModal.js');

var _PlotModal2 = _interopRequireDefault(_PlotModal);

var _FilterTableView = require('./FilterTableView.js');

var _FilterTableView2 = _interopRequireDefault(_FilterTableView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Title', 'Release year', 'Runtime', 'Genres', 'Plot', 'Edit'];

var rowColumns = [function (movie) {
  return movie.id;
}, function (movie) {
  return movie.title;
}, function (movie) {
  return movie.release_year;
}, function (movie) {
  return movie.runtime;
}, function (movie) {
  return movie.genres.map(function (z) {
    return (0, _hyperapp.h)(
      'span',
      { className: 'chip bg-dark' },
      (0, _hyperapp.h)(
        'a',
        { 'class': 'text-secondary text-norma', href: '' },
        z.name
      )
    );
  });
}, function (movie, actions) {
  return (0, _hyperapp.h)(
    'span',
    { onclick: function onclick() {
        return actions.updateShowPlot(movie);
      } },
    movie.story.substring(0, 50) + '...'
  );
}, function (movie, actions) {
  return (0, _hyperapp.h)(
    'button',
    { className: 'btn btn-block btn-primary', onclick: function onclick() {
        return actions.updateEdit(Object.assign({}, movie));
      } },
    'Edit'
  );
}];

var formFields = [{ 'key': 'title', 'label': 'Title', 'type': 'text' }, { 'key': 'release_year', 'label': 'Release Year', 'type': 'number' }, { 'key': 'runtime', 'label': 'Runtime', 'type': 'number' }, { 'key': 'story', 'label': 'Plot', 'type': 'longtext' }, { 'key': 'genres', 'label': 'Genres', 'type': 'multiselect' }];

var extraView = function extraView(state, actions) {
  return (0, _hyperapp.h)(
    'div',
    null,
    state.movies.showPlot ? (0, _hyperapp.h)(_PlotModal2.default, { movie: state.movies.showPlot, actions: actions }) : null
  );
};

var Movies = (0, _FilterTableView2.default)({
  key: 'movies',
  rowHeaders: rowHeaders,
  rowColumns: rowColumns,
  formFields: formFields,
  title: 'Movies list',
  extraView: extraView
});

module.exports = Movies;

},{"../components/PlotModal.js":14,"./FilterTableView.js":24,"hyperapp":2}],29:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FilterTableView = require('./FilterTableView.js');

var _FilterTableView2 = _interopRequireDefault(_FilterTableView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Name', 'Birthday', 'Edit'];

var rowColumns = [function (person) {
  return person.id;
}, function (person) {
  return person.name;
}, function (person) {
  return person.birthday;
}, function (person, actions) {
  return (0, _hyperapp.h)(
    'button',
    { className: 'btn btn-block btn-primary', onclick: function onclick() {
        return actions.updateEdit(Object.assign({}, person));
      } },
    'Edit'
  );
}];

var formFields = [{ 'key': 'name', 'label': 'Name', 'type': 'text' }, { 'key': 'birthday', 'label': 'Birthday', 'type': 'date' }];

var People = (0, _FilterTableView2.default)({
  key: 'people',
  rowHeaders: rowHeaders,
  rowColumns: rowColumns,
  formFields: formFields,
  title: 'People list'
});

module.exports = People;

},{"./FilterTableView.js":24,"hyperapp":2}],30:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FilterTableView = require('./FilterTableView.js');

var _FilterTableView2 = _interopRequireDefault(_FilterTableView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Name', 'Edit'];

var rowColumns = [function (item) {
  return item.id;
}, function (item) {
  return item.name;
}, function (item, actions) {
  return (0, _hyperapp.h)(
    'button',
    { className: 'btn btn-block btn-primary', onclick: function onclick() {
        return actions.updateEdit(Object.assign({}, item));
      } },
    'Edit'
  );
}];

var formFields = [{ 'key': 'name', 'label': 'Name', 'type': 'text' }];

var SimpleFilterTableView = function SimpleFilterTableView(_ref) {
  var key = _ref.key,
      title = _ref.title;
  return (0, _FilterTableView2.default)({
    key: key,
    rowHeaders: rowHeaders,
    rowColumns: rowColumns,
    formFields: formFields,
    title: title
  });
};

module.exports = SimpleFilterTableView;

},{"./FilterTableView.js":24,"hyperapp":2}]},{},[20]);
