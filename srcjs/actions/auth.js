import { updateField } from './forms.js';

var getCookie = function(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

module.exports = {
  login: g_actions => (state, actions) => {
    actions.updateLoading(true);
    let data = {
      username: state.forms.login.username,
      password: state.forms.login.password,
      csrfmiddlewaretoken: getCookie('csrftoken')
    };
    fetch(g_urls.login, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (r) { return r.json() }).then(function (j) {
      if(j.key) {
        console.log("OK" , j.key, state.forms.login.username )
        actions.updateLogin({key: j.key, username: state.forms.login.username});
        g_actions.location.go("/");
        g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )

      } else {
        g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
      }
      actions.updateLoading(false)
    })
  },
  logout: g_actions => (state, actions) => {
    actions.updateLoading(true)
    setTimeout(() => fetch(g_urls.logout, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (r) { return r.json() }).then(function (j) {
      actions.updateLogin({key: null, username: null});
      g_actions.location.go("/");
      actions.updateLoading(false)
      g_actions.toasts.add({text: "Successfully logged out!", style: "success"})
    }), 500);
  },
  updateLoading: loading => state => ({
    loading
  }),
  updateLogin: ({key, username}) => state => {
    localStorage.setItem("auth", JSON.stringify({key, username}))
    return {
      key,
      username,
      forms: {
        login: {}
      }
    }
  },
  updateField
}
