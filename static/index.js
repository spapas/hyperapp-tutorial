// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/hyperapp/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
exports.app = app;

function h(name, attributes) {
  var rest = [];
  var children = [];
  var length = arguments.length;

  while (length-- > 2) rest.push(arguments[length]);

  while (rest.length) {
    var node = rest.pop();

    if (node && node.pop) {
      for (length = node.length; length--;) {
        rest.push(node[length]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node);
    }
  }

  return typeof name === "function" ? name(attributes || {}, children) : {
    nodeName: name,
    attributes: attributes || {},
    children: children,
    key: attributes && attributes.key
  };
}

function app(state, actions, view, container) {
  var map = [].map;
  var rootElement = container && container.children[0] || null;
  var oldNode = rootElement && recycleElement(rootElement);
  var lifecycle = [];
  var skipRender;
  var isRecycling = true;
  var globalState = clone(state);
  var wiredActions = wireStateToActions([], globalState, clone(actions));
  scheduleRender();
  return wiredActions;

  function recycleElement(element) {
    return {
      nodeName: element.nodeName.toLowerCase(),
      attributes: {},
      children: map.call(element.childNodes, function (element) {
        return element.nodeType === 3 // Node.TEXT_NODE
        ? element.nodeValue : recycleElement(element);
      })
    };
  }

  function resolveNode(node) {
    return typeof node === "function" ? resolveNode(node(globalState, wiredActions)) : node != null ? node : "";
  }

  function render() {
    skipRender = !skipRender;
    var node = resolveNode(view);

    if (container && !skipRender) {
      rootElement = patch(container, rootElement, oldNode, oldNode = node);
    }

    isRecycling = false;

    while (lifecycle.length) lifecycle.pop()();
  }

  function scheduleRender() {
    if (!skipRender) {
      skipRender = true;
      setTimeout(render);
    }
  }

  function clone(target, source) {
    var out = {};

    for (var i in target) out[i] = target[i];

    for (var i in source) out[i] = source[i];

    return out;
  }

  function setPartialState(path, value, source) {
    var target = {};

    if (path.length) {
      target[path[0]] = path.length > 1 ? setPartialState(path.slice(1), value, source[path[0]]) : value;
      return clone(source, target);
    }

    return value;
  }

  function getPartialState(path, source) {
    var i = 0;

    while (i < path.length) {
      source = source[path[i++]];
    }

    return source;
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function" ? function (key, action) {
        actions[key] = function (data) {
          var result = action(data);

          if (typeof result === "function") {
            result = result(getPartialState(path, globalState), actions);
          }

          if (result && result !== (state = getPartialState(path, globalState)) && !result.then // !isPromise
          ) {
              scheduleRender(globalState = setPartialState(path, clone(state, result), globalState));
            }

          return result;
        };
      }(key, actions[key]) : wireStateToActions(path.concat(key), state[key] = clone(state[key]), actions[key] = clone(actions[key]));
    }

    return actions;
  }

  function getKey(node) {
    return node ? node.key : null;
  }

  function eventListener(event) {
    return event.currentTarget.events[event.type](event);
  }

  function updateAttribute(element, name, value, oldValue, isSvg) {
    if (name === "key") {} else if (name === "style") {
      if (typeof value === "string") {
        element.style.cssText = value;
      } else {
        if (typeof oldValue === "string") oldValue = element.style.cssText = "";

        for (var i in clone(oldValue, value)) {
          var style = value == null || value[i] == null ? "" : value[i];

          if (i[0] === "-") {
            element.style.setProperty(i, style);
          } else {
            element.style[i] = style;
          }
        }
      }
    } else {
      if (name[0] === "o" && name[1] === "n") {
        name = name.slice(2);

        if (element.events) {
          if (!oldValue) oldValue = element.events[name];
        } else {
          element.events = {};
        }

        element.events[name] = value;

        if (value) {
          if (!oldValue) {
            element.addEventListener(name, eventListener);
          }
        } else {
          element.removeEventListener(name, eventListener);
        }
      } else if (name in element && name !== "list" && name !== "type" && name !== "draggable" && name !== "spellcheck" && name !== "translate" && !isSvg) {
        element[name] = value == null ? "" : value;
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }

      if (value == null || value === false) {
        element.removeAttribute(name);
      }
    }
  }

  function createElement(node, isSvg) {
    var element = typeof node === "string" || typeof node === "number" ? document.createTextNode(node) : (isSvg = isSvg || node.nodeName === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.nodeName) : document.createElement(node.nodeName);
    var attributes = node.attributes;

    if (attributes) {
      if (attributes.oncreate) {
        lifecycle.push(function () {
          attributes.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i] = resolveNode(node.children[i]), isSvg));
      }

      for (var name in attributes) {
        updateAttribute(element, name, attributes[name], null, isSvg);
      }
    }

    return element;
  }

  function updateElement(element, oldAttributes, attributes, isSvg) {
    for (var name in clone(oldAttributes, attributes)) {
      if (attributes[name] !== (name === "value" || name === "checked" ? element[name] : oldAttributes[name])) {
        updateAttribute(element, name, attributes[name], oldAttributes[name], isSvg);
      }
    }

    var cb = isRecycling ? attributes.oncreate : attributes.onupdate;

    if (cb) {
      lifecycle.push(function () {
        cb(element, oldAttributes);
      });
    }
  }

  function removeChildren(element, node) {
    var attributes = node.attributes;

    if (attributes) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }

      if (attributes.ondestroy) {
        attributes.ondestroy(element);
      }
    }

    return element;
  }

  function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }

    var cb = node.attributes && node.attributes.onremove;

    if (cb) {
      cb(element, done);
    } else {
      done();
    }
  }

  function patch(parent, element, oldNode, node, isSvg) {
    if (node === oldNode) {} else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
      var newElement = createElement(node, isSvg);
      parent.insertBefore(newElement, element);

      if (oldNode != null) {
        removeElement(parent, element, oldNode);
      }

      element = newElement;
    } else if (oldNode.nodeName == null) {
      element.nodeValue = node;
    } else {
      updateElement(element, oldNode.attributes, node.attributes, isSvg = isSvg || node.nodeName === "svg");
      var oldKeyed = {};
      var newKeyed = {};
      var oldElements = [];
      var oldChildren = oldNode.children;
      var children = node.children;

      for (var i = 0; i < oldChildren.length; i++) {
        oldElements[i] = element.childNodes[i];
        var oldKey = getKey(oldChildren[i]);

        if (oldKey != null) {
          oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
        }
      }

      var i = 0;
      var k = 0;

      while (k < children.length) {
        var oldKey = getKey(oldChildren[i]);
        var newKey = getKey(children[k] = resolveNode(children[k]));

        if (newKeyed[oldKey]) {
          i++;
          continue;
        }

        if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
          if (oldKey == null) {
            removeElement(element, oldElements[i], oldChildren[i]);
          }

          i++;
          continue;
        }

        if (newKey == null || isRecycling) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
            k++;
          }

          i++;
        } else {
          var keyedNode = oldKeyed[newKey] || [];

          if (oldKey === newKey) {
            patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
            i++;
          } else if (keyedNode[0]) {
            patch(element, element.insertBefore(keyedNode[0], oldElements[i]), keyedNode[1], children[k], isSvg);
          } else {
            patch(element, oldElements[i], null, children[k], isSvg);
          }

          newKeyed[newKey] = children[k];
          k++;
        }
      }

      while (i < oldChildren.length) {
        if (getKey(oldChildren[i]) == null) {
          removeElement(element, oldElements[i], oldChildren[i]);
        }

        i++;
      }

      for (var i in oldKeyed) {
        if (!newKeyed[i]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    }

    return element;
  }
}
},{}],"../node_modules/@hyperapp/router/src/Link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = Link;

var _hyperapp = require("hyperapp");

function getOrigin(loc) {
  return loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "");
}

function isExternal(anchorElement) {
  // Location.origin and HTMLAnchorElement.origin are not
  // supported by IE and Safari.
  return getOrigin(location) !== getOrigin(anchorElement);
}

function Link(props, children) {
  return function (state, actions) {
    var to = props.to;
    var location = state.location;
    var onclick = props.onclick;
    delete props.to;
    delete props.location;
    props.href = to;

    props.onclick = function (e) {
      if (onclick) {
        onclick(e);
      }

      if (e.defaultPrevented || e.button !== 0 || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || props.target === "_blank" || isExternal(e.currentTarget)) {} else {
        e.preventDefault();

        if (to !== location.pathname) {
          history.pushState(location.pathname, "", to);
        }
      }
    };

    return (0, _hyperapp.h)("a", props, children);
  };
}
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"../node_modules/@hyperapp/router/src/parseRoute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseRoute = parseRoute;

function createMatch(isExact, path, url, params) {
  return {
    isExact: isExact,
    path: path,
    url: url,
    params: params
  };
}

function trimTrailingSlash(url) {
  for (var len = url.length; "/" === url[--len];);

  return url.slice(0, len + 1);
}

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (e) {
    return val;
  }
}

function parseRoute(path, url, options) {
  if (path === url || !path) {
    return createMatch(path === url, path, url);
  }

  var exact = options && options.exact;
  var paths = trimTrailingSlash(path).split("/");
  var urls = trimTrailingSlash(url).split("/");

  if (paths.length > urls.length || exact && paths.length < urls.length) {
    return;
  }

  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i]);
    } else if (paths[i] !== urls[i]) {
      return;
    }

    url += urls[i] + "/";
  }

  return createMatch(false, path, url.slice(0, -1), params);
}
},{}],"../node_modules/@hyperapp/router/src/Route.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = Route;

var _parseRoute = require("./parseRoute");

function Route(props) {
  return function (state, actions) {
    var location = state.location;
    var match = (0, _parseRoute.parseRoute)(props.path, location.pathname, {
      exact: !props.parent
    });
    return match && props.render({
      match: match,
      location: location
    });
  };
}
},{"./parseRoute":"../node_modules/@hyperapp/router/src/parseRoute.js"}],"../node_modules/@hyperapp/router/src/Switch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = Switch;

function Switch(props, children) {
  return function (state, actions) {
    var child,
        i = 0;

    while (!(child = children[i] && children[i](state, actions)) && i < children.length) i++;

    return child;
  };
}
},{}],"../node_modules/@hyperapp/router/src/Redirect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redirect = Redirect;

function Redirect(props) {
  return function (state, actions) {
    var location = state.location;
    history.replaceState(props.from || location.pathname, "", props.to);
  };
}
},{}],"../node_modules/@hyperapp/router/src/location.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = void 0;

function wrapHistory(keys) {
  return keys.reduce(function (next, key) {
    var fn = history[key];

    history[key] = function (data, title, url) {
      fn.call(this, data, title, url);
      dispatchEvent(new CustomEvent("pushstate", {
        detail: data
      }));
    };

    return function () {
      history[key] = fn;
      next && next();
    };
  }, null);
}

var location = {
  state: {
    pathname: window.location.pathname,
    previous: window.location.pathname
  },
  actions: {
    go: function (pathname) {
      history.pushState(null, "", pathname);
    },
    set: function (data) {
      return data;
    }
  },
  subscribe: function (actions) {
    function handleLocationChange(e) {
      actions.set({
        pathname: window.location.pathname,
        previous: e.detail ? window.location.previous = e.detail : window.location.previous
      });
    }

    var unwrap = wrapHistory(["pushState", "replaceState"]);
    addEventListener("pushstate", handleLocationChange);
    addEventListener("popstate", handleLocationChange);
    return function () {
      removeEventListener("pushstate", handleLocationChange);
      removeEventListener("popstate", handleLocationChange);
      unwrap();
    };
  }
};
exports.location = location;
},{}],"../node_modules/@hyperapp/router/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _Link.Link;
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _Route.Route;
  }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () {
    return _Switch.Switch;
  }
});
Object.defineProperty(exports, "Redirect", {
  enumerable: true,
  get: function () {
    return _Redirect.Redirect;
  }
});
Object.defineProperty(exports, "location", {
  enumerable: true,
  get: function () {
    return _location.location;
  }
});

var _Link = require("./Link");

var _Route = require("./Route");

var _Switch = require("./Switch");

var _Redirect = require("./Redirect");

var _location = require("./location");
},{"./Link":"../node_modules/@hyperapp/router/src/Link.js","./Route":"../node_modules/@hyperapp/router/src/Route.js","./Switch":"../node_modules/@hyperapp/router/src/Switch.js","./Redirect":"../node_modules/@hyperapp/router/src/Redirect.js","./location":"../node_modules/@hyperapp/router/src/location.js"}],"actions/forms.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
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
  }
};
},{}],"actions/auth.js":[function(require,module,exports) {
"use strict";

var _forms = require("./forms.js");

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
          actions.updateLogin({
            key: j.key,
            username: state.forms.login.username
          });
          g_actions.location.go("/");
          g_actions.toasts.add({
            text: "Successfully logged in!",
            style: "success"
          });
        } else {
          g_actions.toasts.add({
            text: "Error while logging in - please try again!",
            style: "error"
          });
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
          actions.updateLogin({
            key: null,
            username: null
          });
          g_actions.location.go("/");
          actions.updateLoading(false);
          g_actions.toasts.add({
            text: "Successfully logged out!",
            style: "success"
          });
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
      localStorage.setItem("auth", JSON.stringify({
        key: key,
        username: username
      }));
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
},{"./forms.js":"actions/forms.js"}],"actions/toasts.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
        items: [].concat(_toConsumableArray(state.items), [{
          text: text,
          style: style
        }])
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
},{}],"actions/ajax_forms.js":[function(require,module,exports) {
module.exports = function (ajaxUrl) {
  return {
    saveEdit: function saveEdit(_ref) {
      var key = _ref.key,
          g_actions = _ref.g_actions;
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
                actions.addErrors({
                  formname: 'edit',
                  errors: errors
                });
              });
            } else if (response.status == 200 || response.status == 201) {
              response.json().then(function (data) {
                // Data is the object that was saved
                g_actions.toasts.add({
                  text: 'Successfully saved object!',
                  style: 'success'
                });
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
},{}],"actions/view_actions.js":[function(require,module,exports) {
"use strict";

var _ajax_forms = _interopRequireDefault(require("./ajax_forms.js"));

var _forms = _interopRequireDefault(require("./forms.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (ajaxUrl) {
  return _objectSpread({
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
            actions.update({
              response: j,
              current: url,
              page: page
            });
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
  }, _forms.default, {}, (0, _ajax_forms.default)(ajaxUrl));
};
},{"./ajax_forms.js":"actions/ajax_forms.js","./forms.js":"actions/forms.js"}],"actions/index.js":[function(require,module,exports) {
"use strict";

var _router = require("@hyperapp/router");

var _auth = _interopRequireDefault(require("./auth.js"));

var _toasts = _interopRequireDefault(require("./toasts.js"));

var _view_actions = _interopRequireDefault(require("./view_actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = module.exports = {
  location: _router.location.actions,
  auth: _auth.default,
  people: (0, _view_actions.default)(window.g_urls.people),
  genres: (0, _view_actions.default)(window.g_urls.genres),
  jobs: (0, _view_actions.default)(window.g_urls.jobs),
  movies: Object.assign({}, (0, _view_actions.default)(window.g_urls.movies), {
    updateShowPlot: function updateShowPlot(showPlot) {
      return function (state) {
        return {
          showPlot: showPlot
        };
      };
    },
    updateEditPeople: function updateEditPeople(movie) {
      return function (state) {
        return {
          forms: Object.assign({}, state['forms'], {
            editPeople: movie
          })
        };
      };
    }
  }),
  toasts: _toasts.default
};
},{"@hyperapp/router":"../node_modules/@hyperapp/router/src/index.js","./auth.js":"actions/auth.js","./toasts.js":"actions/toasts.js","./view_actions":"actions/view_actions.js"}],"views/Home.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var Home = module.exports = function (state, actions) {
  return (0, _hyperapp.h)("div", {
    key: "home"
  }, state.auth.key ? (0, _hyperapp.h)("span", null, "Hello, ", state.auth.username, "!") : (0, _hyperapp.h)("span", null, "Please login to edit things"));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/PlotModal.js":[function(require,module,exports) {
var _require = require('hyperapp'),
    h = _require.h;

var PlotModal = module.exports = function (_ref) {
  var movie = _ref.movie,
      actions = _ref.actions;
  return h("div", {
    className: "modal ".concat(movie ? 'active' : '')
  }, h("div", {
    class: "modal-overlay"
  }), h("div", {
    class: "modal-container"
  }, h("div", {
    class: "modal-header"
  }, h("button", {
    class: "btn btn-clear float-right",
    onclick: function onclick() {
      return actions.updateShowPlot(null);
    }
  }), h("div", {
    class: "modal-title h5"
  }, movie.title)), h("div", {
    class: "modal-body"
  }, h("div", {
    class: "content"
  }, movie.story)), h("div", {
    class: "modal-footer"
  }, h("button", {
    class: "btn",
    onclick: function onclick() {
      return actions.updateShowPlot(null);
    }
  }, "Ok"))));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/FormInputs.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var AbstractInput = function AbstractInput(_ref) {
  var field = _ref.field,
      action = _ref.action,
      realInput = _ref.realInput;
  return (0, _hyperapp.h)("div", {
    class: "form-group ".concat(field.errors ? 'has-error' : ''),
    key: field.key
  }, (0, _hyperapp.h)("label", {
    class: "form-label",
    for: "{field.key}"
  }, field.label), realInput, (0, _hyperapp.h)("div", {
    class: "form-input-hint"
  }, field.errors ? field.errors[0] : null));
};

var FormInput = function FormInput(_ref2) {
  var field = _ref2.field,
      action = _ref2.action;
  return AbstractInput({
    field: field,
    action: action,
    realInput: (0, _hyperapp.h)("input", {
      class: "form-input",
      type: field.type,
      id: field.key,
      placeholder: field.label,
      value: field.value,
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
    realInput: (0, _hyperapp.h)("textarea", {
      class: "form-input",
      id: field.key,
      rows: "5",
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
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/FormDateInput.js":[function(require,module,exports) {
var _require = require('hyperapp'),
    h = _require.h;

var FormDateInput = module.exports = function (_ref) {
  var field = _ref.field,
      action = _ref.action;
  return h("div", {
    class: "form-group"
  }, h("label", {
    class: "form-label",
    for: "{field.label}"
  }, field.label), h("input", {
    class: "form-input",
    type: "text",
    id: "{field.label}",
    placeholder: field.label,
    value: field.value,
    oncreate: function oncreate(element) {
      $(element).datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function onSelect(date, inst) {
          console.log(date, inst);
          action(date);
        }
      });
    }
  }));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/MultiSelect.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var MultiSelect = function MultiSelect(_ref) {
  var label = _ref.label,
      field = _ref.field,
      action = _ref.action;
  return (0, _hyperapp.h)("div", {
    class: "form-group"
  }, (0, _hyperapp.h)("label", {
    class: "form-label",
    for: "{field.label}"
  }, field.label), (0, _hyperapp.h)("select", {
    name: "",
    style: "width: 50%",
    multiple: "multiple",
    oncreate: function oncreate(element) {
      $(element).select2({
        ajax: {
          url: field.url,
          dataType: 'json',
          delay: 250,
          placeholder: 'Search for ' + field.label.toLowerCase(),
          data: function data(params) {
            return {
              name: params.term
            };
          },
          processResults: function processResults(data) {
            return {
              results: data.results.map(function (r) {
                return {
                  'id': r.id,
                  'text': r.name
                };
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
    }
  }));
};

module.exports = MultiSelect;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/Spinners.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var Spinner = function Spinner() {
  return (0, _hyperapp.h)("div", {
    class: "spinner"
  }, (0, _hyperapp.h)("div", {
    class: "bounce1"
  }), (0, _hyperapp.h)("div", {
    class: "bounce2"
  }), (0, _hyperapp.h)("div", {
    class: "bounce3"
  }));
};

var SpinnerSmall = module.exports = function () {
  return (0, _hyperapp.h)("div", {
    class: "loading loading-lg"
  });
};

module.exports['Spinner'] = Spinner;
module.exports['SpinnerSmall'] = SpinnerSmall;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/MultiModalForm.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _FormInputs = require("./FormInputs.js");

var _FormDateInput = _interopRequireDefault(require("./FormDateInput.js"));

var _MultiSelect = _interopRequireDefault(require("./MultiSelect.js"));

var _Spinners = require("./Spinners.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderField = function renderField(field, updateFieldAction) {
  var ftype = undefined;

  switch (field.type) {
    case 'longtext':
      ftype = _FormInputs.FormInputLong;
      break;

    case 'text':
      ftype = _FormInputs.FormInput;
      break;

    case 'number':
      ftype = _FormInputs.FormInput;
      break;

    case 'multiselect':
      ftype = _MultiSelect.default;
      break;

    case 'date':
      ftype = _FormDateInput.default;
      break;
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

var MultiModalForm = module.exports = function (_ref) {
  var loading = _ref.loading,
      formFields = _ref.formFields,
      item = _ref.item,
      hideAction = _ref.hideAction,
      saveAction = _ref.saveAction,
      updateFieldAction = _ref.updateFieldAction;
  return (0, _hyperapp.h)("div", {
    className: "modal ".concat(item ? 'active' : '')
  }, (0, _hyperapp.h)("div", {
    class: "modal-overlay"
  }), (0, _hyperapp.h)("div", {
    class: "modal-container"
  }, (0, _hyperapp.h)("div", {
    class: "modal-header"
  }, (0, _hyperapp.h)("button", {
    class: "btn btn-clear float-right",
    onclick: hideAction
  }), (0, _hyperapp.h)("div", {
    class: "modal-title h5"
  }, item.id ? "Editing multi-form for item ".concat(item.id) : "Add new item!")), (0, _hyperapp.h)("div", {
    class: "modal-body"
  }, (0, _hyperapp.h)("div", {
    class: "content"
  }, (0, _hyperapp.h)("form", {
    method: "POST"
  }, renderFields(formFields, updateFieldAction)))), (0, _hyperapp.h)("div", {
    class: "modal-footer"
  }, loading ? (0, _hyperapp.h)(_Spinners.SpinnerSmall, null) : (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("button", {
    class: "btn",
    onclick: hideAction
  }, "Cancel"), (0, _hyperapp.h)("button", {
    class: "ml-2 btn btn-primary",
    onclick: saveAction
  }, "Ok")))));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./FormInputs.js":"components/FormInputs.js","./FormDateInput.js":"components/FormDateInput.js","./MultiSelect.js":"components/MultiSelect.js","./Spinners.js":"components/Spinners.js"}],"components/Pagination.js":[function(require,module,exports) {
var _require = require('hyperapp'),
    h = _require.h;

var Pagination = module.exports = function (_ref) {
  var page = _ref.page,
      next = _ref.next,
      previous = _ref.previous,
      loadAction = _ref.loadAction;
  return h("ul", {
    class: "pagination"
  }, h("li", {
    class: "page-item ".concat(previous ? '' : 'disabled')
  }, h("a", {
    onclick: function onclick() {
      return loadAction(previous);
    },
    href: "#",
    tabindex: "-1"
  }, "Previous")), h("li", {
    class: "page-item"
  }, h("a", {
    href: "#"
  }, page)), h("li", {
    class: "page-item ".concat(next ? '' : 'disabled')
  }, h("a", {
    onclick: function onclick() {
      return loadAction(next);
    },
    href: "#"
  }, "Next")));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/Table.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _Pagination = _interopRequireDefault(require("../components/Pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = module.exports = function (_ref) {
  var row = _ref.row,
      rowColumns = _ref.rowColumns,
      actions = _ref.actions;
  return (0, _hyperapp.h)("tr", null, rowColumns.map(function (z) {
    return (0, _hyperapp.h)("td", null, z(row, actions));
  }));
};

var Table = module.exports = function (_ref2) {
  var rowHeaders = _ref2.rowHeaders,
      rowColumns = _ref2.rowColumns,
      rows = _ref2.rows,
      actions = _ref2.actions;
  return (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("table", {
    class: "table table-striped table-hover"
  }, (0, _hyperapp.h)("thead", null, (0, _hyperapp.h)("tr", null, rowHeaders.map(function (z) {
    return (0, _hyperapp.h)("th", null, z);
  }))), (0, _hyperapp.h)("tbody", null, rows.items.map(function (z) {
    return (0, _hyperapp.h)(Row, {
      row: z,
      rowColumns: rowColumns,
      actions: actions
    });
  }))), (0, _hyperapp.h)(_Pagination.default, {
    page: rows.page,
    next: rows.next,
    previous: rows.previous,
    loadAction: actions.load
  }));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../components/Pagination.js":"components/Pagination.js"}],"components/ModalForm.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _FormInputs = require("./FormInputs.js");

var _FormDateInput = _interopRequireDefault(require("./FormDateInput.js"));

var _MultiSelect = _interopRequireDefault(require("./MultiSelect.js"));

var _Spinners = require("./Spinners.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderField = function renderField(field, updateFieldAction) {
  var ftype = undefined;

  switch (field.type) {
    case 'longtext':
      ftype = _FormInputs.FormInputLong;
      break;

    case 'text':
      ftype = _FormInputs.FormInput;
      break;

    case 'number':
      ftype = _FormInputs.FormInput;
      break;

    case 'multiselect':
      ftype = _MultiSelect.default;
      break;

    case 'date':
      ftype = _FormDateInput.default;
      break;
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
  return (0, _hyperapp.h)("div", {
    className: "modal ".concat(item ? 'active' : '')
  }, (0, _hyperapp.h)("div", {
    class: "modal-overlay"
  }), (0, _hyperapp.h)("div", {
    class: "modal-container"
  }, (0, _hyperapp.h)("div", {
    class: "modal-header"
  }, (0, _hyperapp.h)("button", {
    class: "btn btn-clear float-right",
    onclick: hideAction
  }), (0, _hyperapp.h)("div", {
    class: "modal-title h5"
  }, item.id ? "Editing form for item ".concat(item.id) : "Add new item!")), (0, _hyperapp.h)("div", {
    class: "modal-body"
  }, (0, _hyperapp.h)("div", {
    class: "content"
  }, (0, _hyperapp.h)("form", {
    method: "POST"
  }, renderFields(formFields, updateFieldAction)))), (0, _hyperapp.h)("div", {
    class: "modal-footer"
  }, loading ? (0, _hyperapp.h)(_Spinners.SpinnerSmall, null) : (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("button", {
    class: "btn",
    onclick: hideAction
  }, "Cancel"), (0, _hyperapp.h)("button", {
    class: "ml-2 btn btn-primary",
    onclick: saveAction
  }, "Ok")))));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./FormInputs.js":"components/FormInputs.js","./FormDateInput.js":"components/FormDateInput.js","./MultiSelect.js":"components/MultiSelect.js","./Spinners.js":"components/Spinners.js"}],"components/SearchForm.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _Spinners = require("../components/Spinners.js");

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
  return (0, _hyperapp.h)("form", {
    method: "GET",
    class: "form-horizontal"
  }, (0, _hyperapp.h)("div", {
    class: "form-group"
  }, formFields.map(function (f) {
    return (0, _hyperapp.h)("div", {
      key: f.key
    }, (0, _hyperapp.h)("label", {
      class: "form-label",
      for: f.key
    }, f.label), (0, _hyperapp.h)("input", {
      class: "form-input",
      type: f.type,
      id: f.key,
      placeholder: f.label,
      value: f.value,
      oninput: function oninput(e) {
        return updateFieldAction(f.key, e.target.value);
      }
    }));
  }), loading ? (0, _hyperapp.h)(_Spinners.SpinnerSmall, null) : (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("button", {
    style: {
      marginTop: '2.3em'
    },
    class: "btn ml-2 btn-primary",
    onclick: function onclick(e) {
      e.preventDefault();
      searchAction();
      return false;
    }
  }, "Filter"), (0, _hyperapp.h)("button", {
    style: {
      'margin-top': '2.3em'
    },
    class: "btn ml-2",
    onclick: function onclick(e) {
      e.preventDefault();
      searchAction(true);
      return false;
    }
  }, "Reset"))));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../components/Spinners.js":"components/Spinners.js"}],"util/forms.js":[function(require,module,exports) {
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
},{}],"util/auth.js":[function(require,module,exports) {
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

  if (!existingAuth) existingAuth = {
    key: '',
    username: ''
  };
  return existingAuth;
};

module.exports = {
  checkAuth: checkAuth,
  getExistingAuth: getExistingAuth
};
},{}],"views/FilterTableView.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _Spinners = require("../components/Spinners.js");

var _Table = _interopRequireDefault(require("../components/Table.js"));

var _ModalForm = _interopRequireDefault(require("../components/ModalForm.js"));

var _SearchForm = _interopRequireDefault(require("../components/SearchForm.js"));

var _forms = require("../util/forms.js");

var _auth = require("../util/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var key = _ref.key,
      rowHeaders = _ref.rowHeaders,
      rowColumns = _ref.rowColumns,
      formFields = _ref.formFields,
      title = _ref.title,
      extraViews = _ref.extraViews;
  return function (state, actions, g_actions) {
    return (0, _hyperapp.h)("div", {
      key: key
    }, (0, _hyperapp.h)("h2", null, title, " \xA0  \xA0", state.auth.key ? (0, _hyperapp.h)("button", {
      className: "btn btn-primary btn-action btn-lg",
      onclick: function onclick() {
        return actions.updateEdit({});
      }
    }, (0, _hyperapp.h)("i", {
      className: "icon icon-plus"
    })) : null), (0, _hyperapp.h)("div", {
      className: "columns"
    }, (0, _hyperapp.h)("div", {
      className: "column col-lg-12",
      oncreate: function oncreate() {
        return actions.load(window.g_urls[key]);
      }
    }, (0, _hyperapp.h)(_SearchForm.default, {
      formFields: (0, _forms.mergeValuesErrors)(formFields, state[key].forms.search, null),
      updateFieldAction: function updateFieldAction(key, value) {
        return actions.updateField({
          formname: 'search',
          fieldname: key,
          value: value
        });
      },
      searchAction: actions.searchAction
    }), state[key].loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)(_Table.default, {
      rowHeaders: (0, _auth.checkAuth)(rowHeaders, state.auth),
      rowColumns: (0, _auth.checkAuth)(rowColumns, state.auth),
      rows: state[key],
      actions: actions
    }))), state[key].forms.edit ? (0, _hyperapp.h)(_ModalForm.default, {
      loading: state[key].loading,
      formFields: (0, _forms.mergeValuesErrors)(formFields, state[key].forms.edit, state[key].forms.edit.errors),
      item: state[key].forms.edit,
      hideAction: function hideAction() {
        return actions.updateEdit(null);
      },
      saveAction: function saveAction() {
        return actions.saveEdit({
          g_actions: g_actions,
          key: state.auth.key
        });
      },
      updateFieldAction: function updateFieldAction(key, value) {
        return actions.updateField({
          formname: 'edit',
          fieldname: key,
          value: value
        });
      }
    }) : null, extraViews ? extraViews.map(function (ev) {
      return ev(state, actions);
    }) : null);
  };
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../components/Spinners.js":"components/Spinners.js","../components/Table.js":"components/Table.js","../components/ModalForm.js":"components/ModalForm.js","../components/SearchForm.js":"components/SearchForm.js","../util/forms.js":"util/forms.js","../util/auth":"util/auth.js"}],"views/Movies.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _PlotModal = _interopRequireDefault(require("../components/PlotModal.js"));

var _MultiModalForm = _interopRequireDefault(require("../components/MultiModalForm"));

var _FilterTableView = _interopRequireDefault(require("./FilterTableView.js"));

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
    return (0, _hyperapp.h)("span", {
      className: "chip bg-dark"
    }, (0, _hyperapp.h)("a", {
      class: "text-secondary text-norma",
      href: ""
    }, z.name));
  });
}, function (movie, actions) {
  return (0, _hyperapp.h)("span", {
    onclick: function onclick() {
      return actions.updateShowPlot(movie);
    }
  }, movie.story.substring(0, 50) + '...');
}, function (movie, actions) {
  return (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("button", {
    className: "btn btn-block btn-primary",
    onclick: function onclick() {
      return actions.updateEdit(Object.assign({}, movie));
    }
  }, "Edit"), (0, _hyperapp.h)("button", {
    className: "btn btn-block btn-primary",
    onclick: function onclick() {
      return actions.updateEditPeople(Object.assign({}, movie));
    }
  }, "Edit people"));
}];
var formFields = [{
  'key': 'title',
  'label': 'Title',
  'type': 'text'
}, {
  'key': 'release_year',
  'label': 'Release Year',
  'type': 'number'
}, {
  'key': 'runtime',
  'label': 'Runtime',
  'type': 'number'
}, {
  'key': 'story',
  'label': 'Plot',
  'type': 'longtext'
}, {
  'key': 'genres',
  'label': 'Genres',
  'type': 'multiselect',
  url: '/api/genres/'
}];
var multiFormFields = [{
  'key': 'person',
  'label': 'Person',
  'type': 'text'
}, {
  'key': 'job',
  'label': 'Job',
  'type': 'text'
}];
var extraViews = [function (state, actions) {
  return (0, _hyperapp.h)("div", null, state.movies.showPlot ? (0, _hyperapp.h)(_PlotModal.default, {
    movie: state.movies.showPlot,
    actions: actions
  }) : null);
}, function (state, actions) {
  return (0, _hyperapp.h)("div", null, state.movies.forms.editPeople ? (0, _hyperapp.h)("div", null, "WILL EDIT", (0, _hyperapp.h)(_MultiModalForm.default, {
    loading: state.movies.loading //formFields={mergeValuesErrors(formFields, state.movies.forms.editPeople, state.movies.forms.editPeople.errors)}
    ,
    formFields: multiFormFields,
    item: state.movies.forms.editPeople,
    hideAction: function hideAction() {
      return actions.updateEditPeople(null);
    },
    saveAction: function saveAction() {
      return actions.saveEditPeople({
        g_actions: g_actions,
        key: state.auth.key
      });
    },
    updateFieldAction: function updateFieldAction(key, value) {
      return actions.updateField({
        formname: 'edit',
        fieldname: 'movies',
        value: value
      });
    }
  })) : null);
}];
var Movies = (0, _FilterTableView.default)({
  key: 'movies',
  rowHeaders: rowHeaders,
  rowColumns: rowColumns,
  formFields: formFields,
  title: 'Movies list',
  extraViews: extraViews
});
module.exports = Movies;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../components/PlotModal.js":"components/PlotModal.js","../components/MultiModalForm":"components/MultiModalForm.js","./FilterTableView.js":"views/FilterTableView.js"}],"views/People.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _FilterTableView = _interopRequireDefault(require("./FilterTableView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Name', 'Birthday', 'Edit'];
var rowColumns = [function (person) {
  return person.id;
}, function (person) {
  return person.name;
}, function (person) {
  return person.birthday;
}, function (person, actions) {
  return (0, _hyperapp.h)("button", {
    className: "btn btn-block btn-primary",
    onclick: function onclick() {
      return actions.updateEdit(Object.assign({}, person));
    }
  }, "Edit");
}];
var formFields = [{
  'key': 'name',
  'label': 'Name',
  'type': 'text'
}, {
  'key': 'birthday',
  'label': 'Birthday',
  'type': 'date'
}];
var People = (0, _FilterTableView.default)({
  key: 'people',
  rowHeaders: rowHeaders,
  rowColumns: rowColumns,
  formFields: formFields,
  title: 'People list'
});
module.exports = People;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./FilterTableView.js":"views/FilterTableView.js"}],"views/SimpleFilterTableView.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _FilterTableView = _interopRequireDefault(require("./FilterTableView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Name', 'Edit'];
var rowColumns = [function (item) {
  return item.id;
}, function (item) {
  return item.name;
}, function (item, actions) {
  return (0, _hyperapp.h)("button", {
    className: "btn btn-block btn-primary",
    onclick: function onclick() {
      return actions.updateEdit(Object.assign({}, item));
    }
  }, "Edit");
}];
var formFields = [{
  'key': 'name',
  'label': 'Name',
  'type': 'text'
}];

var SimpleFilterTableView = function SimpleFilterTableView(_ref) {
  var key = _ref.key,
      title = _ref.title;
  return (0, _FilterTableView.default)({
    key: key,
    rowHeaders: rowHeaders,
    rowColumns: rowColumns,
    formFields: formFields,
    title: title
  });
};

module.exports = SimpleFilterTableView;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./FilterTableView.js":"views/FilterTableView.js"}],"views/Login.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _FormInputs = require("../components/FormInputs.js");

var _Spinners = require("../components/Spinners.js");

var okClick = function okClick(e, actions, g_actions) {
  actions.login(g_actions);
  console.log(e);
  e.preventDefault();
  return false;
};

var Login = module.exports = function (state, actions, g_actions) {
  return (0, _hyperapp.h)("div", {
    key: "login"
  }, (0, _hyperapp.h)("h2", null, "Login"), (0, _hyperapp.h)("form", {
    method: "POST"
  }, (0, _hyperapp.h)(_FormInputs.FormInput, {
    field: {
      label: 'Username',
      value: state.forms.login.username,
      type: 'text'
    },
    action: function action(value) {
      return actions.updateField({
        formname: 'login',
        fieldname: 'username',
        value: value
      });
    }
  }), (0, _hyperapp.h)(_FormInputs.FormInput, {
    field: {
      label: 'Password',
      value: state.forms.login.password,
      type: 'password'
    },
    action: function action(value) {
      return actions.updateField({
        formname: 'login',
        fieldname: 'password',
        value: value
      });
    }
  }), state.loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)("button", {
    id: "btn",
    name: "btn",
    className: "btn btn-primary",
    onclick: function onclick(e) {
      okClick(e, actions, g_actions);
    }
  }, "Ok")));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../components/FormInputs.js":"components/FormInputs.js","../components/Spinners.js":"components/Spinners.js"}],"components/Tabs.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var createTab = function createTab(url, title) {
  return function (currentLocation) {
    return (0, _hyperapp.h)("li", {
      className: "tab-item ".concat(currentLocation.pathname == url ? 'active' : '')
    }, (0, _hyperapp.h)(_router.Link, {
      to: url
    }, title));
  };
};

var Table = module.exports = function (_ref) {
  var currentLocation = _ref.currentLocation,
      auth = _ref.auth,
      actions = _ref.actions;
  return (0, _hyperapp.h)("ul", {
    class: "tab tab-block"
  }, createTab("/", "Home")(currentLocation), createTab("/movies", "Movies")(currentLocation), createTab("/people", "People")(currentLocation), createTab("/genres", "Genres")(currentLocation), createTab("/jobs", "Jobs")(currentLocation), auth.key ? (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("span", {
    class: "chip"
  }, auth.username), (0, _hyperapp.h)("button", {
    class: "btn",
    onclick: function onclick() {
      return actions.auth.logout(actions);
    }
  }, "Logout")) : (0, _hyperapp.h)("li", {
    className: "tab-item ".concat(currentLocation.pathname == '/login' ? 'active' : '')
  }, (0, _hyperapp.h)(_router.Link, {
    to: "/login"
  }, "Login")));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","@hyperapp/router":"../node_modules/@hyperapp/router/src/index.js"}],"components/ToastContainer.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var Toast = function Toast(_ref) {
  var text = _ref.text,
      actions = _ref.actions,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? 'primary' : _ref$style;
  return (0, _hyperapp.h)("div", {
    className: "toast toast-".concat(style)
  }, (0, _hyperapp.h)("button", {
    className: "btn btn-clear float-right",
    onclick: function onclick() {
      return actions.toasts.hide(text);
    }
  }), text);
};

var ToastContainer = module.exports = function (_ref2) {
  var toasts = _ref2.toasts,
      actions = _ref2.actions;
  return (0, _hyperapp.h)("div", {
    className: "toast-container"
  }, toasts.items.map(function (t) {
    return (0, _hyperapp.h)(Toast, {
      text: t.text,
      style: t.style,
      actions: actions
    });
  }));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"components/DebugContainer.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

module.exports = function (_ref) {
  var state = _ref.state,
      actions = _ref.actions;
  return (0, _hyperapp.h)("div", {
    className: "accordion"
  }, (0, _hyperapp.h)("input", {
    type: "checkbox",
    id: "accordion-1",
    name: "accordion-checkbox",
    hidden: true
  }), (0, _hyperapp.h)("label", {
    className: "accordion-header",
    for: "accordion-1"
  }, (0, _hyperapp.h)("i", {
    className: "icon icon-arrow-right mr-1"
  }), "Show state"), (0, _hyperapp.h)("div", {
    className: "accordion-body"
  }, (0, _hyperapp.h)("pre", null, (0, _hyperapp.h)("small", null, JSON.stringify(state, null, 2)))));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"views/Main.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _Home = _interopRequireDefault(require("./Home.js"));

var _Movies = _interopRequireDefault(require("./Movies.js"));

var _People = _interopRequireDefault(require("./People.js"));

var _SimpleFilterTableView = _interopRequireDefault(require("./SimpleFilterTableView.js"));

var _Login = _interopRequireDefault(require("./Login.js"));

var _Tabs = _interopRequireDefault(require("../components/Tabs.js"));

var _ToastContainer = _interopRequireDefault(require("../components/ToastContainer.js"));

var _DebugContainer = _interopRequireDefault(require("../components/DebugContainer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, actions) {
  return (0, _hyperapp.h)("div", {
    className: "container grid-xl"
  }, (0, _hyperapp.h)(_Tabs.default, {
    currentLocation: state.location,
    auth: state.auth,
    actions: actions
  }), (0, _hyperapp.h)(_router.Switch, null, (0, _hyperapp.h)(_router.Route, {
    path: "/",
    render: function render() {
      return (0, _Home.default)(state, actions);
    }
  }), (0, _hyperapp.h)(_router.Route, {
    path: "/movies",
    render: function render() {
      return (0, _Movies.default)(state, actions.movies, actions);
    }
  }), (0, _hyperapp.h)(_router.Route, {
    path: "/people",
    render: function render() {
      return (0, _People.default)(state, actions.people, actions);
    }
  }), (0, _hyperapp.h)(_router.Route, {
    path: "/genres",
    render: function render() {
      return (0, _SimpleFilterTableView.default)({
        key: 'genres',
        title: 'Genres'
      })(state, actions.genres, actions);
    }
  }), (0, _hyperapp.h)(_router.Route, {
    path: "/jobs",
    render: function render() {
      return (0, _SimpleFilterTableView.default)({
        key: 'jobs',
        title: 'Jobs'
      })(state, actions.jobs, actions);
    }
  }), (0, _hyperapp.h)(_router.Route, {
    path: "/login",
    render: function render() {
      return (0, _Login.default)(state.auth, actions.auth, actions);
    }
  })), (0, _hyperapp.h)(_ToastContainer.default, {
    toasts: state.toasts,
    actions: actions
  }), (0, _hyperapp.h)("hr", null), (0, _hyperapp.h)(_DebugContainer.default, {
    state: state,
    actions: actions
  }));
};
},{"hyperapp":"../node_modules/hyperapp/src/index.js","@hyperapp/router":"../node_modules/@hyperapp/router/src/index.js","./Home.js":"views/Home.js","./Movies.js":"views/Movies.js","./People.js":"views/People.js","./SimpleFilterTableView.js":"views/SimpleFilterTableView.js","./Login.js":"views/Login.js","../components/Tabs.js":"components/Tabs.js","../components/ToastContainer.js":"components/ToastContainer.js","../components/DebugContainer.js":"components/DebugContainer.js"}],"state.js":[function(require,module,exports) {
"use strict";

var _auth = require("./util/auth.js");

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
    showPlot: false,
    forms: Object.assign({}, genericState['forms'], {
      editPeople: null
    })
  }),
  people: Object.assign({}, genericState),
  genres: Object.assign({}, genericState),
  jobs: Object.assign({}, genericState)
};
},{"./util/auth.js":"util/auth.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _actions = _interopRequireDefault(require("./actions"));

var _Main = _interopRequireDefault(require("./views/Main.js"));

var _state = _interopRequireDefault(require("./state.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = (0, _hyperapp.app)(_state.default, _actions.default, _Main.default, document.getElementById('app'));

var unsubscribe = _router.location.subscribe(application.location);

var hideToasts = function hideToasts() {
  application.toasts.clear();
};

_actions.default.location.go('/');

addEventListener('pushstate', hideToasts);
addEventListener('popstate', hideToasts);
},{"hyperapp":"../node_modules/hyperapp/src/index.js","@hyperapp/router":"../node_modules/@hyperapp/router/src/index.js","./actions":"actions/index.js","./views/Main.js":"views/Main.js","./state.js":"state.js"}],"../../../../../Users/Serafeim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62635" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../Users/Serafeim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map