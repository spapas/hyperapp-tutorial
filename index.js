import { h, app } from "hyperapp"
import { Route, location } from "@hyperapp/router"
import actions from './actions.js'
import {main} from './views/Main.js'

var state = {
    auth: {
        token: null,
        username: null,
        password: null,
        loading: false
    },
    location: location.state, 
    toasts: [],
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
        page: null,
        count: 0,
        next: null,
        previous: null,
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
