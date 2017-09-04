import { h, app } from "hyperapp"

import { router, Link } from "@hyperapp/router"

import  R from "rambda"

import actions from './actions.js'
import {home, detail} from './views.js'


// https://swapi.co/api/people/

app({
    events: {
        load: (state, actions) => {
            console.log("S")
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
    state: {
        text: 'Hi!!!!!!!',
        count: 5,
        loading: true,
        toasts: [],
        person: undefined,
        people: {
            results: [],
            count: 0,
            next: null
        }
    },
    view: home, 
    actions: actions
    ,root: document.getElementById("app")
})
