import { h, app } from "hyperapp"
import { Route, location } from "@hyperapp/router"
import actions from './actions.js'
import main from './views/Main.js'
import state from './state.js'

const application = app(
    state,
    actions,
    main,
    document.getElementById("app")
)

console.log(application);

const unsubscribe = location.subscribe(application.location)
application.init();
