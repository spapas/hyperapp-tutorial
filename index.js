import { h, app } from "hyperapp"

import actions from './actions.js'
import {home, detail} from './views.js'


// https://swapi.co/api/people/

app(
    {
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
    actions,
    home, 
    document.getElementById("app")
)
