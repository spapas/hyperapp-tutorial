import { h, app } from "hyperapp"

import actions from './actions.js'
import {home, detail} from './views.js'

var state = {
    loading: true,
    loadingMovies: false,
    toasts: [],
    movie: undefined,
    person: undefined,
    movies: {
        showPlot: false,
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        items: []
    },
    people: {
        loading: false,
        items: []
    }   
}

app(
    state,
    actions,
    home, 
    document.getElementById("app")
)
