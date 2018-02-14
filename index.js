import { h, app } from "hyperapp"
import { Route, location } from "@hyperapp/router"
import actions from './actions.js'
import {main} from './views.js'

var state = {
    location: location.state, 
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

const application = app(
    state,
    actions,
    main,
    document.getElementById("app")
)

const unsubscribe = location.subscribe(application.location)
