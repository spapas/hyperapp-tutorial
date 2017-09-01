import { h, app } from "hyperapp"
import { Router } from "./hrouter.js"

import  R from "rambda"

import actions from './actions.js'
import {home, detail} from './views.js'


// https://swapi.co/api/people/

app({
    events: {
        init: (state, actions) => {
            actions.loadPeople('https://swapi.co/api/people/');
        },
        route: (state, actions, data, emit) => {
            if(data.match == "/view/:id") {
              let id = data.params.id;
              actions.updateLoading(true);
              actions.loadPerson(id);
            }
        }
    },
    state: {
        text: 'Hi!!!!!!!',
        count: 5,
        loading: true,
        person: undefined,
        people: {
            results: [],
            count: 0,
            next: null
        }
    },
    //view: ,
    mixins: [
        Router([
            ["/", home],
            ["/view/:id", detail],
            ["*", state => <h1>404</h1>]
        ])
    ],
    actions: actions,
    root: document.getElementById("app")
})
