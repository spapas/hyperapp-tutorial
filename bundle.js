(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reducers = module.exports = {
    updateText: function updateText(newValue) {
        return function (state) {
            return {
                'text': newValue
            };
        };
    },

    updateCount: function updateCount(newValue) {
        return function (state) {
            return {
                'count': 1 * newValue
            };
        };
    },

    updateLoading: function updateLoading(loading) {
        return function (state) {
            return {
                loading: loading
            };
        };
    },

    updateLoadingFilms: function updateLoadingFilms(loadingFilms) {
        return function (state) {
            return {
                loadingFilms: loadingFilms
            };
        };
    },

    updatePeople: function updatePeople(_ref) {
        var people = _ref.people,
            page = _ref.page;
        return function (state) {
            return {
                people: people,
                page: page
            };
        };
    },

    updateFilms: function updateFilms(films) {
        return function (state) {
            return {
                films: films
            };
        };
    },

    updatePerson: function updatePerson(person) {
        return function (state) {
            return {
                person: person
            };
        };
    },

    loadPeople: function loadPeople(url) {
        return function (state, actions) {
            console.log("LOADING");
            actions.updateLoading(true);

            setTimeout(function () {
                return fetch(url).then(function (r) {
                    return r.json();
                }).then(function (j) {
                    console.log(url);
                    console.log(j);
                    var match = url.match(/\?page=(\d+)/);
                    var page = 1;
                    if (match) page = 1 * match[1];

                    actions.updatePeople({ people: j, page: page });
                    actions.updateLoading(false);
                });
            }, 10);
        };
    },

    loadPerson: function loadPerson(id) {
        return function (state, actions) {
            setTimeout(function () {
                return fetch('https://swapi.co/api/people/' + id).then(function (r) {
                    return r.json();
                }).then(function (j) {
                    console.log(j);
                    actions.updatePerson(j);
                    actions.updateLoading(false);
                });
            }, 10);
        };
    },

    loadPersonAndGo: function loadPersonAndGo(id) {
        return function (state, actions) {
            actions.updateLoading(true);
            console.log("ROUTER");
            actions.router.go('#/view/' + id);
        };
    },

    displayModal: function displayModal(id) {
        return function (state, actions) {
            actions.loadPerson(id);
            actions.updateLoading(true);
            return {
                person: 'loading'
            };
        };
    },

    hideModal: function hideModal(id) {
        return function (state) {
            return {
                person: undefined
            };
        };
    },

    addToast: function addToast(text) {
        return function (state) {
            return {
                toasts: [].concat(_toConsumableArray(state.toasts), [text])
            };
        };
    },

    hideToast: function hideToast(text) {
        return function (state) {
            var idx = state.toasts.indexOf(text);
            return {
                toasts: [].concat(_toConsumableArray(state.toasts.slice(0, idx)), _toConsumableArray(state.toasts.slice(idx + 1)))
            };
        };
    },

    updateForm: function updateForm(_ref2) {
        var object = _ref2.object,
            field = _ref2.field,
            value = _ref2.value;
        return function (state) {
            console.log("updateform", object, field, value);
            return _defineProperty({}, object, Object.assign({}, state[object], _defineProperty({}, field, value)));
        };
    },
    savePerson: function savePerson(id) {
        return function (state, actions) {
            console.log("Fake saving person ", id);
            actions.updateLoading(true);
            setTimeout(function () {
                actions.hideModal();
                actions.updateLoading(false);
                actions.addToast('Person ' + id + ' saved ok!');
            }, 50);
        };
    },

    loadFilms: function loadFilms(films) {
        return function (state, actions) {
            console.log("Loading films", films);
            var film_data = [];
            actions.updateLoadingFilms(true);
            var grabContent = function grabContent(url) {
                return fetch(url).then(function (res) {
                    return res.json();
                }).then(function (j) {
                    return film_data.push(j);
                });
            };

            Promise.all(films.map(grabContent)).then(function () {
                console.log("OK", film_data);
                actions.updateLoadingFilms(false);
                actions.updateFilms(film_data);
            });
        };
    }
};

},{}],2:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var Empty = module.exports = function () {
    return h(
        "div",
        { "class": "empty" },
        h(
            "div",
            { "class": "empty-icon" },
            h("i", { "class": "icon icon-more-horiz" })
        ),
        h(
            "p",
            { "class": "empty-title h5" },
            "No films"
        ),
        h(
            "p",
            { "class": "empty-subtitle" },
            "Please select the films of a character you want to display "
        )
    );
};

},{"hyperapp":20}],3:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var FilmCard = module.exports = function (_ref) {
  var film = _ref.film;
  return h(
    "div",
    { "class": "card" },
    h(
      "div",
      { "class": "card-header" },
      h(
        "div",
        { "class": "card-title h5" },
        film.title
      ),
      h(
        "div",
        { "class": "card-subtitle text-gray" },
        "Episode: ",
        film.episode_id
      ),
      h(
        "div",
        { "class": "card-subtitle text-gray" },
        "Release: ",
        film.release_date
      )
    ),
    h(
      "div",
      { "class": "card-body" },
      film.opening_crawl
    ),
    h(
      "div",
      { "class": "card-image" },
      h("img", { src: "http://is2.mzstatic.com/image/thumb/Video6/v4/61/16/ce/6116cec2-d2e8-de26-f80d-38a1685d04b8/source/1200x630bb.jpg", "class": "img-responsive" })
    ),
    h(
      "div",
      { "class": "card-footer" },
      h(
        "button",
        { "class": "btn btn-primary" },
        "Do"
      )
    )
  );
};

},{"hyperapp":20}],4:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var FilmsList = module.exports = function (_ref) {
    var films = _ref.films,
        actions = _ref.actions;
    return h(
        'button',
        { 'class': 'btn',
            onclick: function onclick() {
                return actions.loadFilms(films);
            }
        },
        'Load'
    );
};

},{"hyperapp":20}],5:[function(require,module,exports){
'use strict';

var _FilmCard = require('./FilmCard.js');

var _FilmCard2 = _interopRequireDefault(_FilmCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('hyperapp'),
    h = _require.h;

var FilmsView = module.exports = function (_ref) {
    var films = _ref.films;
    return h(
        'div',
        null,
        films.map(function (f) {
            return h(_FilmCard2.default, { film: f });
        })
    );
};

},{"./FilmCard.js":3,"hyperapp":20}],6:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

var dateInput = function dateInput(element) {
    console.log(element);
    console.log(flatpickr);
    flatpickr(element, {
        onChange: function onChange(selectedDates, dateStr, instance) {
            console.log("CHANGED", selectedDates, dateStr, instance);
        }
    });
};

var FormDateInput = module.exports = function (_ref) {
    var label = _ref.label,
        value = _ref.value,
        action = _ref.action;
    return h(
        "div",
        { "class": "form-group" },
        h(
            "label",
            { "class": "form-label", "for": "{label}" },
            label
        ),
        h("input", { "class": "form-input", type: "text", id: "{label}",
            placeholder: label, value: value,
            onkeyup: function onkeyup(e) {
                return action(e.target.value);
            },
            oncreate: dateInput
        })
    );
};

},{"hyperapp":20}],7:[function(require,module,exports){
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
            { "class": "form-label", "for": "{label}" },
            label
        ),
        h("input", { "class": "form-input", type: "text", id: "{label}",
            placeholder: label, value: value,
            onkeyup: function onkeyup(e) {
                return action(e.target.value);
            }
        })
    );
};

},{"hyperapp":20}],8:[function(require,module,exports){
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

},{"hyperapp":20}],9:[function(require,module,exports){
'use strict';

var _require = require('hyperapp'),
    h = _require.h;

var Toast = module.exports = function (_ref) {
    var page = _ref.page,
        next = _ref.next,
        previous = _ref.previous,
        actions = _ref.actions;
    return h(
        'ul',
        { 'class': 'pagination' },
        h(
            'li',
            { 'class': 'page-item ' + (previous ? '' : 'disabled') },
            h(
                'a',
                { onclick: function onclick() {
                        return actions.loadPeople(previous);
                    }, href: '#', tabindex: '-1' },
                'Previous'
            )
        ),
        h(
            'li',
            { 'class': 'page-item active' },
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
                        return actions.loadPeople(next);
                    }, href: '#' },
                'Next'
            )
        )
    );
};

},{"hyperapp":20}],10:[function(require,module,exports){
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
        { 'class': 'table table-striped table-hover' },
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
                    'Films'
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

},{"./PersonRow.js":13,"hyperapp":20}],11:[function(require,module,exports){
'use strict';

var _FormInput = require('./FormInput.js');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _FormDateInput = require('./FormDateInput.js');

var _FormDateInput2 = _interopRequireDefault(_FormDateInput);

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
        h(_FormDateInput2.default, { label: 'Έτος γέννησης', value: person.created, action: function action(x) {
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

},{"./FormDateInput.js":6,"./FormInput.js":7,"hyperapp":20}],12:[function(require,module,exports){
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

},{"./PersonForm.js":11,"./SpinnerSmall.js":15,"hyperapp":20}],13:[function(require,module,exports){
'use strict';

var _FilmsList = require('./FilmsList.js');

var _FilmsList2 = _interopRequireDefault(_FilmsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            h(_FilmsList2.default, { films: person.films, actions: actions })
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

},{"./FilmsList.js":4,"hyperapp":20}],14:[function(require,module,exports){
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

},{"hyperapp":20}],15:[function(require,module,exports){
"use strict";

var _require = require('hyperapp'),
    h = _require.h;

// OR 

var SpinnerSmall = module.exports = function () {
  return h("div", { "class": "loading loading-lg" });
};

},{"hyperapp":20}],16:[function(require,module,exports){
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

},{"hyperapp":20}],17:[function(require,module,exports){
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

},{"hyperapp":20}],18:[function(require,module,exports){
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

},{"./Toast.js":17,"hyperapp":20}],19:[function(require,module,exports){
'use strict';

var _hyperapp = require('hyperapp');

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

var _views = require('./views.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    loading: true,
    loadingFilms: false,
    toasts: [],
    person: undefined,
    films: [],
    people: {
        results: [],
        count: 0,
        next: null
    }
};

(0, _hyperapp.app)(state, _actions2.default, _views.home, document.getElementById("app"));

},{"./actions.js":1,"./views.js":21,"hyperapp":20}],20:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd||n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t,r=[],o=[],i=arguments.length;i-- >2;)r.push(arguments[i]);for(;r.length;)if((t=r.pop())&&t.pop)for(i=t.length;i--;)r.push(t[i]);else null!=t&&!0!==t&&!1!==t&&o.push(t);return"function"==typeof e?e(n||{},o):{nodeName:e,attributes:n||{},children:o,key:n&&n.key}},e.app=function(e,n,t,r){var o,i=[],u=r&&r.children[0]||null,l=u&&function e(n,t){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:t.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n,t)})}}(u,[].map),f=s(e),a=s(n);return d(function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){return"function"==typeof(e=o(e))&&(e=e(p(n,f),r)),e&&e!==(t=p(n,f))&&!e.then&&d(f=h(n,s(t,e),f)),e}}(o,r[o]):e(n.concat(o),t[o]=t[o]||{},r[o]=s(r[o]))}([],f,a)),a;function c(){o=!o;var e=t(f,a);for(r&&!o&&(u=function e(n,t,r,o,u,l){if(o===r);else if(null==r)t=n.insertBefore(y(o,u),t);else if(o.nodeName&&o.nodeName===r.nodeName){!function(e,n,t,r){for(var o in s(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&m(e,o,t[o],r,n[o]);t.onupdate&&i.push(function(){t.onupdate(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var f=[],a={},c={},d=0;d<r.children.length;d++){f[d]=t.childNodes[d];var h=r.children[d],p=v(h);null!=p&&(a[p]=[f[d],h])}for(var d=0,b=0;b<o.children.length;){var h=r.children[d],g=o.children[b],p=v(h),k=v(g);if(c[p])d++;else if(null==k)null==p&&(e(t,f[d],h,g,u),b++),d++;else{var w=a[k]||[];p===k?(e(t,w[0],w[1],g,u),d++):w[0]?e(t,t.insertBefore(w[0],f[d]),w[1],g,u):e(t,f[d],null,g,u),b++,c[k]=g}}for(;d<r.children.length;){var h=r.children[d];null==v(h)&&N(t,f[d],h),d++}for(var d in a)c[a[d][1].key]||N(t,a[d][0],a[d][1])}else o.nodeName===r.nodeName?t.nodeValue=o:(t=n.insertBefore(y(o,u),l=t),N(n,l,r));return t}(r,u,l,l=e));e=i.pop();)e()}function d(){o||(o=!o,setTimeout(c))}function s(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function h(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?h(e.slice(1),n,t[e[0]]):n,s(t,r)):n}function p(e,n){for(var t=0;t<e.length;t++)n=n[e[t]];return n}function v(e){return e?e.key:null}function m(e,n,t,r,o){if("key"===n);else if("style"===n)for(var i in s(o,t))e[n][i]=null==t||null==t[i]?"":t[i];else"function"==typeof t||n in e&&!r?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function y(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName);if(e.attributes){e.attributes.oncreate&&i.push(function(){e.attributes.oncreate(t)});for(var r=0;r<e.children.length;r++)t.appendChild(y(e.children[r],n));for(var o in e.attributes)m(t,o,e.attributes[o],n)}return t}function N(e,n,t,r){function o(){e.removeChild(function e(n,t,r){if(r=t.attributes){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}t.attributes&&(r=t.attributes.onremove)?r(n,o):o()}}});

},{}],21:[function(require,module,exports){
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

var _Empty = require('./components/Empty.js');

var _Empty2 = _interopRequireDefault(_Empty);

var _FilmsView = require('./components/FilmsView.js');

var _FilmsView2 = _interopRequireDefault(_FilmsView);

var _Pagination = require('./components/Pagination.js');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _PersonModal = require('./components/PersonModal.js');

var _PersonModal2 = _interopRequireDefault(_PersonModal);

var _ToastContainer = require('./components/ToastContainer.js');

var _ToastContainer2 = _interopRequireDefault(_ToastContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = exports.home = function home(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        { 'class': 'columns' },
        (0, _hyperapp.h)(
            'div',
            { 'class': 'column col-6', oncreate: function oncreate() {
                    return actions.loadPeople('https://swapi.co/api/people/');
                } },
            (0, _hyperapp.h)(_PersonModal2.default, { person: state.person, loading: state.loading, actions: actions }),
            (0, _hyperapp.h)(_ToastContainer2.default, { toasts: state.toasts, actions: actions }),
            state.loading == true ? (0, _hyperapp.h)(_Spinner2.default, null) : (0, _hyperapp.h)(_People2.default, { people: state.people, actions: actions }),
            (0, _hyperapp.h)(_Pagination2.default, { actions: actions, page: state.page, next: state.people.next, previous: state.people.previous })
        ),
        (0, _hyperapp.h)(
            'div',
            { 'class': 'column col-6' },
            state.loadingFilms ? (0, _hyperapp.h)(_Spinner2.default, null) : state.films && state.films.length ? (0, _hyperapp.h)(_FilmsView2.default, { films: state.films }) : (0, _hyperapp.h)(_Empty2.default, null)
        )
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

},{"./components/Empty.js":2,"./components/FilmsView.js":5,"./components/Input.js":8,"./components/Pagination.js":9,"./components/People.js":10,"./components/PersonModal.js":12,"./components/Spinner.js":14,"./components/Table.js":16,"./components/ToastContainer.js":18,"hyperapp":20}]},{},[19]);
