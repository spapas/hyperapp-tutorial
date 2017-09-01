export function Router(config) {
  return function(emit, view) {
    return {
      state: {
        router: match(location.hash)
      },
      actions: {
        router: {
          match: function(state, actions, data) {
            return {
              router: emit("route", match(data))
            }
          },
          go: function(state, actions, data) {
            history.pushState({}, "", data)
            actions.router.match(data.split("?")[0])
          }
        }
      },
      events: {
        init: function(state, actions) {
          addEventListener("popstate", function(){
            actions.router.match(location.hash)
          })
        },
        render: function() {
          return view
        }
      }
    }

    function match(data0) {
      for (var match, params = {}, i = 0, len = config.length; i < len; i++) {
        var route = config[i][0]
        var keys = []

        var data = data0;
        if (data0.indexOf('#')!=-1) {
           data = data0.substring(1);
        }
        if (data =='') {
          data='/'
        }
        if (!match) {
          data.replace(
            RegExp(
              route === "*"
                ? "." + route
                : "^" +
                    route
                      .replace(/\//g, "\\/")
                      .replace(/:([\w]+)/g, function(_, key) {
                        keys.push(key)
                        return "([-\\.%\\w]+)"
                      }) +
                    "/?$",
              "g"
            ),
            function() {
              for (var j = 1; j < arguments.length - 2; ) {
                params[keys.shift()] = arguments[j++]
              }
              match = route
              view = config[i][1]
            }
          )
        }
      }

      return {
        match: match,
        params: params
      }
    }
  }
}
