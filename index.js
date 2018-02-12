import { h, app } from "hyperapp"

import actions from './actions.js'
import {home, detail} from './views.js'

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
}

app(
    state,
    actions,
    home, 
    document.getElementById("app")
)
