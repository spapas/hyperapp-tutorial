import { location } from "@hyperapp/router"
import auth from "./auth.js"
import toasts from "./toasts.js"
import view_actions from "./view_actions"

const actions = module.exports = {
    location: location.actions, 
    auth, 
    people: view_actions,
    movies: Object.assign({}, view_actions, {
        updateShowPlot: showPlot => state => ({
            showPlot
        }),
    }),
    toasts
    
}
