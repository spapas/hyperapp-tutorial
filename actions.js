import { location } from "@hyperapp/router"
console.log(location);
const reducers = module.exports = {
    location: location.actions, 
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
    },
    
    addToast: text => state => ({
        toasts: [...state.toasts, text]
    }),
    
    hideToast: text => state => {
        let idx = state.toasts.indexOf(text)
        return {
            toasts: [
                ...state.toasts.slice(0, idx),
                ...state.toasts.slice(idx+1),
            ]
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
            actions.addToast(`Person ${id} saved ok!`)
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
