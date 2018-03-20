import { location } from "@hyperapp/router"
import auth from "./auth.js"
import toasts from "./toasts.js"
import forms from "./forms.js"

const reducers = module.exports = {
    location: location.actions, 
    auth, 
    forms, 
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
    
    toasts,
    
    updateForm: ({object, field, value}) => state => {
        console.log("updateform", object, field, value)
        return {
            [object]: Object.assign({}, state[object], {
                [field]: value
            })
            
        }
    }
}
