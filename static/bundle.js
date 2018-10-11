(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./forms.js":2}],2:[function(require,module,exports){
"use strict";

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
    }

};

},{}],3:[function(require,module,exports){
"use strict";

var _router = require("@hyperapp/router");

var _auth = require("./auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _toasts = require("./toasts.js");

var _toasts2 = _interopRequireDefault(_toasts);

var _people = require("./people.js");

var _people2 = _interopRequireDefault(_people);

var _movies = require("./movies.js");

var _movies2 = _interopRequireDefault(_movies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = module.exports = {
    location: _router.location.actions,
    auth: _auth2.default,
    movies: _movies2.default,
    people: _people2.default,
    toasts: _toasts2.default

};

},{"./auth.js":1,"./movies.js":4,"./people.js":5,"./toasts.js":6,"@hyperapp/router":17}],4:[function(require,module,exports){
"use strict";

var _forms = require("./forms.js");

module.exports = {
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

    updateShowPlot: function updateShowPlot(showPlot) {
        return function (state) {
            return {
                showPlot: showPlot
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
    },

    saveEdit: function saveEdit(_ref2) {
        var key = _ref2.key,
            g_actions = _ref2.g_actions;
        return function (state, actions) {
            console.log("Saving ...", state);
            actions.updateLoading(true);
            var item = state.forms.edit;
            var saveUrl = '';
            var method = '';
            if (item.id) {
                // UPDATE
                console.log("Update item");
                saveUrl = item.url;
                method = 'PATCH';
            } else {
                // CREATE
                console.log("Create new item");
                saveUrl = window.g_urls.movies;
                method = 'POST';
            }

            window.setTimeout(function () {
                fetch(saveUrl, {
                    body: JSON.stringify(item),
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': "Token " + key
                    },
                    method: method
                }).then(function (response) {
                    actions.updateLoading(false);

                    if (response.status == 400) {
                        response.json().then(function (errors) {
                            console.log(errors);
                            actions.addErrors({ formname: 'edit', errors: errors });
                        });
                    } else if (response.status == 200 || response.status == 201) {
                        response.json().then(function (data) {
                            // Data is the object that was saved
                            console.log(data);
                            g_actions.toasts.add({ text: "Successfully saved object!", style: "success" });
                            actions.updateEdit(null);
                            actions.load(state.current);
                        });
                    }
                }).catch(function (error) {
                    console.log("ERR", error.status);
                });
            }, 500);
        };
    },
    searchAction: function searchAction(reset) {
        return function (state, actions) {
            console.log("SEARCH", reset, state);
            if (reset) {

                actions.load(state.current.split('?')[0]);
                return {
                    forms: Object.assign({}, state['forms'], {
                        search: {}
                    })
                };
            } else {
                console.log(state.forms.search);
                var params = Object.keys(state.forms.search).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(state.forms.search[k]);
                }).join('&');
                actions.load(state.current.split('?')[0] + '?' + params);
            }
        };
    },
    updateField: _forms.updateField,
    addErrors: _forms.addErrors
};

},{"./forms.js":2}],5:[function(require,module,exports){
"use strict";

module.exports = {
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

                    actions.update({ response: j, page: page });
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
            page = _ref.page;
        return function (state) {
            return {
                page: page,
                count: response.count,
                next: response.next,
                previous: response.previous,
                items: response.results
            };
        };
    },

    edit: function edit(person) {
        return function (state) {
            return {
                editing: person
            };
        };
    }
};

},{}],6:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = {
    add: function add(_ref) {
        var text = _ref.text,
            style = _ref.style;
        return function (state) {
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

},{"hyperapp":18}],8:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FormInputs = require('./FormInputs.js');

var _Spinners = require('../components/Spinners.js');

var renderField = function renderField(field, updateFieldAction) {
  var ftype = _FormInputs.FormInput;
  if (field.type == 'longtext') ftype = _FormInputs.FormInputLong;
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

},{"../components/Spinners.js":12,"./FormInputs.js":7,"hyperapp":18}],9:[function(require,module,exports){
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

},{"hyperapp":18}],10:[function(require,module,exports){
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

},{"hyperapp":18}],11:[function(require,module,exports){
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

},{"../components/Spinners.js":12,"hyperapp":18}],12:[function(require,module,exports){
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

},{"hyperapp":18}],13:[function(require,module,exports){
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

},{"../components/Pagination.js":9,"hyperapp":18}],14:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var Table = module.exports = function (_ref) {
  var currentLocation = _ref.currentLocation,
      auth = _ref.auth,
      actions = _ref.actions;
  return (0, _hyperapp.h)(
    "ul",
    { "class": "tab tab-block" },
    (0, _hyperapp.h)(
      "li",
      { className: "tab-item " + (currentLocation.pathname == '/' || !currentLocation.pathname ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: "/" },
        "Home"
      )
    ),
    (0, _hyperapp.h)(
      "li",
      { className: "tab-item " + (currentLocation.pathname == '/movies' ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: "/movies" },
        "Movies"
      )
    ),
    (0, _hyperapp.h)(
      "li",
      { className: "tab-item " + (currentLocation.pathname == '/people' ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: "/people" },
        "People"
      )
    ),
    auth.key ? (0, _hyperapp.h)(
      "div",
      null,
      auth.username,
      " ",
      (0, _hyperapp.h)(
        "button",
        { "class": "btn", onclick: function onclick() {
            return actions.auth.logout(actions);
          } },
        "Logout"
      )
    ) : (0, _hyperapp.h)(
      "li",
      { className: "tab-item " + (currentLocation.pathname == '/login' ? 'active' : '') },
      (0, _hyperapp.h)(
        _router.Link,
        { to: "/login" },
        "Login"
      )
    )
  );
};

},{"@hyperapp/router":17,"hyperapp":18}],15:[function(require,module,exports){
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
        (0, _hyperapp.h)('button', { 'class': 'btn btn-clear float-right', onclick: function onclick() {
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

},{"hyperapp":18}],16:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _Main = require("./views/Main.js");

var _Main2 = _interopRequireDefault(_Main);

var _state = require("./state.js");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = (0, _hyperapp.app)(_state2.default, _actions2.default, _Main2.default, document.getElementById("app"));

var unsubscribe = _router.location.subscribe(application.location);

var hideToasts = function hideToasts() {
    application.toasts.clear();
};

_actions2.default.location.go('/');

addEventListener("pushstate", hideToasts);
addEventListener("popstate", hideToasts);

},{"./actions":3,"./state.js":19,"./views/Main.js":22,"@hyperapp/router":17,"hyperapp":18}],17:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("hyperapp")):"function"==typeof define&&define.amd||e(t.router={},t.hyperapp)}(this,function(t,e){"use strict";function n(t,e,n,o){return{isExact:t,path:e,url:n,params:o}}function o(t){for(var e=t.length;"/"===t[--e];);return t.slice(0,e+1)}var i={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(t){function e(e){t.set({pathname:window.location.pathname,previous:e.detail?window.location.previous=e.detail:window.location.previous})}var n=function(t){return t.reduce(function(t,e){var n=history[e];return history[e]=function(t,e,o){n.call(this,t,e,o),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=n,t&&t()}},null)}(["pushState","replaceState"]);return addEventListener("pushstate",e),addEventListener("popstate",e),function(){removeEventListener("pushstate",e),removeEventListener("popstate",e),n()}}};t.Link=function(t,n){var o=t.to,i=t.location||window.location;return t.href=o,t.onclick=function(e){0!==e.button||e.altKey||e.metaKey||e.ctrlKey||e.shiftKey||"_blank"===t.target||e.currentTarget.origin!==i.origin||(e.preventDefault(),o!==i.pathname&&history.pushState(i.pathname,"",o))},e.h("a",t,n)},t.Route=function(t){var e=t.location||window.location,i=function(t,e,i){if(t===e||!t)return n(t===e,t,e);var a=i&&i.exact,r=o(t).split("/"),c=o(e).split("/");if(!(r.length>c.length||a&&r.length<c.length)){var u=0,s={},p=r.length;for(e="";u<p;u++){if(":"===r[u][0])try{s[r[u].slice(1)]=c[u]=decodeURI(c[u])}catch(t){continue}else if(r[u]!==c[u])return;e+=c[u]+"/"}return n(!1,t,e.slice(0,-1),s)}}(t.path,e.pathname,{exact:!t.parent});return i&&t.render({match:i,location:e})},t.Switch=function(t,e){return e[0]},t.Redirect=function(t){var e=t.location||window.location;history.replaceState(t.from||e.pathname,"",t.to)},t.location=i});

},{"hyperapp":18}],18:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;2<o--;)t.push(arguments[o]);for(;t.length;){var l=t.pop();if(l&&l.pop)for(o=l.length;o--;)t.push(l[o]);else null!=l&&!0!==l&&!1!==l&&r.push(l)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,l=[].map,u=r&&r.children[0]||null,i=u&&function n(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:l.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:n(e)})}}(u),f=[],m=!0,a=v(e),c=function e(r,o,l){for(var n in l)"function"==typeof l[n]?function(e,t){l[e]=function(e){var n=t(e);return"function"==typeof n&&(n=n(h(r,a),l)),n&&n!==(o=h(r,a))&&!n.then&&d(a=p(r,v(o,n),a)),n}}(n,l[n]):e(r.concat(n),o[n]=v(o[n]),l[n]=v(l[n]));return l}([],a,v(n));return d(),c;function g(e){return"function"==typeof e?g(e(a,c)):null!=e?e:""}function s(){o=!o;var e=g(t);for(r&&!o&&(u=function e(n,t,r,o,l){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var u=k(o,l);n.insertBefore(u,t),null!=r&&T(n,t,r),t=u}else if(null==r.nodeName)t.nodeValue=o;else{x(t,r.attributes,o.attributes,l=l||"svg"===o.nodeName);for(var i={},f={},a=[],c=r.children,s=o.children,d=0;d<c.length;d++){a[d]=t.childNodes[d];var v=N(c[d]);null!=v&&(i[v]=[a[d],c[d]])}for(var d=0,p=0;p<s.length;){var v=N(c[d]),h=N(s[p]=g(s[p]));if(f[v])d++;else if(null==h||h!==N(c[d+1]))if(null==h||m)null==v&&(e(t,a[d],c[d],s[p],l),p++),d++;else{var y=i[h]||[];v===h?(e(t,y[0],y[1],s[p],l),d++):y[0]?e(t,t.insertBefore(y[0],a[d]),y[1],s[p],l):e(t,a[d],null,s[p],l),f[h]=s[p],p++}else null==v&&T(t,a[d],c[d]),d++}for(;d<c.length;)null==N(c[d])&&T(t,a[d],c[d]),d++;for(var d in i)f[d]||T(t,i[d][0],i[d][1])}return t}(r,u,i,i=e)),m=!1;f.length;)f.pop()()}function d(){o||(o=!0,setTimeout(s))}function v(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function p(e,n,t){var r={};return e.length?(r[e[0]]=1<e.length?p(e.slice(1),n,t[e[0]]):n,v(t,r)):n}function h(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function N(e){return e?e.key:null}function y(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)if("string"==typeof t)e.style.cssText=t;else for(var l in"string"==typeof r&&(r=e.style.cssText=""),v(r,t)){var u=null==t||null==t[l]?"":t[l];"-"===l[0]?e.style.setProperty(l,u):e.style[l]=u}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},(e.events[n]=t)?r||e.addEventListener(n,y):e.removeEventListener(n,y)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),r=e.attributes;if(r){r.oncreate&&f.push(function(){r.oncreate(t)});for(var o=0;o<e.children.length;o++)t.appendChild(k(e.children[o]=g(e.children[o]),n));for(var l in r)b(t,l,r[l],null,n)}return t}function x(e,n,t,r){for(var o in v(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var l=m?t.oncreate:t.onupdate;l&&f.push(function(){l(e,n)})}function T(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});

},{}],19:[function(require,module,exports){
'use strict';

var existingAuth = localStorage.getItem("auth");

if (existingAuth) {
    try {
        existingAuth = JSON.parse(existingAuth);
    } catch (error) {
        existingAuth = null;
    }
}
if (!existingAuth) existingAuth = { key: '', username: '' };

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
    movies: {
        showPlot: false,
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        current: null,
        items: [],
        forms: {
            edit: null,
            search: {}
        }
    },
    people: {
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        items: [],
        editing: null
    }
};

},{}],20:[function(require,module,exports){
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

},{"hyperapp":18}],21:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _FormInputs = require('../components/FormInputs.js');

var _Spinners = require('../components/Spinners.js');

var okClick = function okClick(e, actions, g_actions) {
    actions.login(g_actions);
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
                { id: 'btn', name: 'btn', 'class': 'btn btn-primary', onclick: function onclick(e) {
                        return okClick(e, actions, g_actions);
                    } },
                'Ok'
            )
        )
    );
};

},{"../components/FormInputs.js":7,"../components/Spinners.js":12,"hyperapp":18}],22:[function(require,module,exports){
"use strict";

var _hyperapp = require("hyperapp");

var _router = require("@hyperapp/router");

var _Home = require("./Home.js");

var _Home2 = _interopRequireDefault(_Home);

var _Movies = require("./Movies.js");

var _Movies2 = _interopRequireDefault(_Movies);

var _People = require("./People.js");

var _People2 = _interopRequireDefault(_People);

var _Login = require("./Login.js");

var _Login2 = _interopRequireDefault(_Login);

var _Tabs = require("../components/Tabs.js");

var _Tabs2 = _interopRequireDefault(_Tabs);

var _ToastContainer = require("../components/ToastContainer.js");

var _ToastContainer2 = _interopRequireDefault(_ToastContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = module.exports = function (state, actions) {
    return (0, _hyperapp.h)(
        "div",
        { "class": "container grid-xl" },
        (0, _hyperapp.h)(_Tabs2.default, { currentLocation: state.location, auth: state.auth, actions: actions }),
        (0, _hyperapp.h)(
            _router.Switch,
            null,
            (0, _hyperapp.h)(_router.Route, { path: "/", render: function render() {
                    return (0, _Home2.default)(state, actions);
                } }),
            (0, _hyperapp.h)(_router.Route, { path: "/movies", render: function render() {
                    return (0, _Movies2.default)(state, actions.movies, actions);
                } }),
            (0, _hyperapp.h)(_router.Route, { path: "/people", render: function render() {
                    return (0, _People2.default)(state.people, actions.people);
                } }),
            (0, _hyperapp.h)(_router.Route, { path: "/login", render: function render() {
                    return (0, _Login2.default)(state.auth, actions.auth, actions);
                } })
        ),
        (0, _hyperapp.h)(_ToastContainer2.default, { toasts: state.toasts, actions: actions }),
        JSON.stringify(state)
    );
};

},{"../components/Tabs.js":14,"../components/ToastContainer.js":15,"./Home.js":20,"./Login.js":21,"./Movies.js":23,"./People.js":24,"@hyperapp/router":17,"hyperapp":18}],23:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Spinners = require('../components/Spinners.js');

var _PlotModal = require('../components/PlotModal.js');

var _PlotModal2 = _interopRequireDefault(_PlotModal);

var _Table = require('../components/Table.js');

var _Table2 = _interopRequireDefault(_Table);

var _ModalForm = require('../components/ModalForm.js');

var _ModalForm2 = _interopRequireDefault(_ModalForm);

var _SearchForm = require('../components/SearchForm.js');

var _SearchForm2 = _interopRequireDefault(_SearchForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Title', 'Release year', 'Runtime', 'Genres', 'Plot', 'Edit'];

var rowColumns = [function (movie, actions) {
    return movie.id;
}, function (movie, actions) {
    return movie.title;
}, function (movie, actions) {
    return movie.release_year;
}, function (movie, actions) {
    return movie.runtime;
}, function (movie, actions) {
    return movie.genres.map(function (z) {
        return (0, _hyperapp.h)(
            'span',
            { 'class': 'chip bg-dark' },
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
        { 'class': 'btn btn-block btn-primary', onclick: function onclick() {
                return actions.updateEdit(Object.assign({}, movie));
            } },
        'Edit'
    );
}];

var checkAuth = function checkAuth(list, auth) {
    if (auth.key) return list;
    return list.slice(0, -1);
};

// TODO: Maybe this is better
var tableDef = [{
    'key': 'id',
    'label': 'Id',
    'render': function render(movie, actions) {
        return movie.id;
    } // etc
}];

var formFields = [{ 'key': 'title', 'label': 'Title', 'type': 'text' }, { 'key': 'release_year', 'label': 'Release Year', 'type': 'number' }, { 'key': 'runtime', 'label': 'Runtime', 'type': 'number' }, { 'key': 'story', 'label': 'Plot', 'type': 'longtext' }];

var mergeValuesErrors = function mergeValuesErrors(formFields, item, errors) {
    return formFields.map(function (f) {
        return Object.assign({}, f, {
            'value': item[f.key]
        }, errors ? {
            'errors': errors[f.key]
        } : {});
    });
};

var Movies = module.exports = function (state, actions, g_actions) {
    return (0, _hyperapp.h)(
        'div',
        { key: 'movies' },
        (0, _hyperapp.h)(
            'h2',
            null,
            'Movie list \xA0  \xA0',
            state.auth.key ? (0, _hyperapp.h)(
                'button',
                { 'class': 'btn btn-primary btn-action btn-lg', onclick: function onclick() {
                        return actions.updateEdit({});
                    } },
                (0, _hyperapp.h)('i', { 'class': 'icon icon-plus' })
            ) : null
        ),
        (0, _hyperapp.h)(
            'div',
            { 'class': 'columns' },
            (0, _hyperapp.h)(
                'div',
                { 'class': 'column col-lg-12', oncreate: function oncreate() {
                        return actions.load(window.g_urls.movies);
                    } },
                (0, _hyperapp.h)(_SearchForm2.default, {
                    formFields: mergeValuesErrors(formFields, state.movies.forms.search, null),
                    updateFieldAction: function updateFieldAction(key, value) {
                        return actions.updateField({ formname: 'search', fieldname: key, value: value });
                    },
                    searchAction: actions.searchAction
                }),
                state.movies.loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)(_Table2.default, {
                    rowHeaders: checkAuth(rowHeaders, state.auth),
                    rowColumns: checkAuth(rowColumns, state.auth),
                    rows: state.movies,
                    actions: actions
                })
            )
        ),
        state.movies.showPlot ? (0, _hyperapp.h)(_PlotModal2.default, { movie: state.movies.showPlot, actions: actions }) : null,
        state.movies.forms.edit ? (0, _hyperapp.h)(_ModalForm2.default, {
            loading: state.movies.loading,
            formFields: mergeValuesErrors(formFields, state.movies.forms.edit, state.movies.forms.edit.errors),
            item: state.movies.forms.edit,
            hideAction: function hideAction() {
                return actions.updateEdit(null);
            },
            saveAction: function saveAction() {
                return actions.saveEdit({ g_actions: g_actions, key: state.auth.key });
            },
            updateFieldAction: function updateFieldAction(key, value) {
                return actions.updateField({ formname: 'edit', fieldname: key, value: value });
            }
        }) : null
    );
};

},{"../components/ModalForm.js":8,"../components/PlotModal.js":10,"../components/SearchForm.js":11,"../components/Spinners.js":12,"../components/Table.js":13,"hyperapp":18}],24:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _Spinners = require('../components/Spinners.js');

var _Table = require('../components/Table.js');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowHeaders = ['Id', 'Name', 'Birthday', 'Edit'];

var rowColumns = [function (person, actions) {
    return person.id;
}, function (person, actions) {
    return person.name;
}, function (person, actions) {
    return person.birthday;
}, function (person, actions) {
    return (0, _hyperapp.h)(
        'button',
        { 'class': 'btn btn-block btn-primary', onclick: function onclick() {
                return actions.edit(person);
            } },
        'Edit'
    );
}];

var People = module.exports = function (state, actions) {
    return (0, _hyperapp.h)(
        'div',
        { key: 'people' },
        (0, _hyperapp.h)(
            'h2',
            null,
            'People list'
        ),
        (0, _hyperapp.h)(
            'div',
            { 'class': 'columns' },
            (0, _hyperapp.h)(
                'div',
                { 'class': 'column col-lg-12', oncreate: function oncreate() {
                        return actions.load(window.g_urls.persons);
                    } },
                state.loading == true ? (0, _hyperapp.h)(_Spinners.Spinner, null) : (0, _hyperapp.h)(_Table2.default, { rowHeaders: rowHeaders, rowColumns: rowColumns, rows: state, actions: actions })
            )
        )
    );
};

},{"../components/Spinners.js":12,"../components/Table.js":13,"hyperapp":18}]},{},[16]);
