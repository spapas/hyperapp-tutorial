import { location } from "@hyperapp/router"

const reducers = module.exports = {
    location: location.actions, 
    auth: {
        login: (g_actions) => (state, actions) => {
            actions.updateLoading(true)
            let data = {
                username: state.username,
                password: state.password
            }
            fetch(g_urls.login, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (r) { return r.json() }).then(function (j) {
                if(j.key) {
                    actions.updateLogin(j.key);
                    g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )
                    g_actions.location.go("/");

                } else {
                    g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
                }
                actions.updateLoading(false)
            })
        },
        logout: (g_actions) => (state, actions) => {
            actions.updateLoading(true)
            setTimeout(() => fetch(g_urls.logout, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (r) { return r.json() }).then(function (j) {
                actions.updateLogin(null);
                g_actions.toasts.add({text: "Successfully logged out!", style: "success"})
                g_actions.location.go("/");
                actions.updateLoading(false)
            }), 500);
        },
        updateLoading: loading => state => ({
            loading
        }),
        updateLogin: key => state => ({
            key,
            password: ''
        }),
    }, 
    movies: {
        load: url => (state, actions) => {
            actions.updateLoading(true)
            
            setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
              console.log(url);
              console.log(j);
              let match = url.match(/\?page=(\d+)/)
              let page = 1;
              if (match) page = 1*match[1]
              
              actions.update({response: j, page});
              actions.updateLoading(false)
            }), 100);
        },

        updateLoading: loading => state => ({
            loading
        }),
        
        updateShowPlot: showPlot => state => ({
            showPlot
        }),

        update: ({response, page}) => state => ({
            page,
            count: response.count,
            next: response.next,
            previous: response.previous,
            items: response.results

        }),
    },

    people: {
        load: url => (state, actions) => {
            actions.updateLoading(true)
            
            setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
              let match = url.match(/\?page=(\d+)/)
              let page = 1;
              if (match) page = 1*match[1]
              
              actions.update({response: j, page});
              actions.updateLoading(false)
            }), 100);
        },

        updateLoading: loading => state => ({
            loading
        }),
        
        update: ({response, page}) => state => ({
            page,
            count: response.count,
            next: response.next,
            previous: response.previous,
            items: response.results
        }),

        edit: person => state => ({
            editing: person
        })
    },
    
    toasts: {
        add: ({text, style}) => state => {
            console.log("ADDING TOAST ", text, style, state);
            return {
                items: [...state.items, {text: text, style: style}]
            }
        },
        
        hide: text => state => {
            let idx = state.items.map(v => v.text).indexOf(text)
            return {
                items: [
                    ...state.items.slice(0, idx),
                    ...state.items.slice(idx+1),
                ]
            }
        },
        clear: () => state => {
            return {items: []}
        }
    },
    
    updateForm: ({object, field, value}) => state => {
        console.log("updateform", object, field, value)
        return {
            [object]: Object.assign({}, state[object], {
                [field]: value
            })
            
        }
    },
    savePerson: id => (state, actions) => {
        console.log("Fake saving person ", id)
        actions.updateLoading(true);
        setTimeout(() => {
            actions.hideModal();
            actions.updateLoading(false);
            actions.toasts.add(`Person ${id} saved ok!`)
        }, 50);
    },
    
    loadFilms: films => (state, actions) => {
        console.log("Loading films", films)
        let film_data = []
        actions.updateLoadingFilms(true);
        const grabContent = url => fetch(url).then(res => res.json()).then(j=> film_data.push(j))

        Promise.all(films.map(grabContent)).then(() => {
            console.log("OK", film_data)
            actions.updateLoadingFilms(false);
            actions.updateFilms(film_data)
        })
    }
}
