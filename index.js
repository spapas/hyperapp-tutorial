import { h, app } from "hyperapp"

import { router, Link } from "@hyperapp/router"

import  R from "rambda"

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

app({
    events: {
        load: (state, actions) => {
            actions.loadPeople('https://swapi.co/api/people/');
        }
        /*
        ,
        route: (state, actions, data, emit) => {
            if(data.match == "/view/:id") {
              let id = data.params.id;
              actions.updateLoading(true);
              actions.loadPerson(id);
            }
        }
        */
    },
    state: state,
    view: home, 
    actions: actions,
    root: document.getElementById("app")
})
