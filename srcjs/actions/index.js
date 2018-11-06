import { location } from "@hyperapp/router"
import auth from "./auth.js"
import toasts from "./toasts.js"
import createViewActions from "./view_actions"

const actions = module.exports = {
    location: location.actions,
    auth,
    people: createViewActions(window.g_urls.people),
    genres: createViewActions(window.g_urls.genres),
    jobs: createViewActions(window.g_urls.jobs),
    movies: Object.assign({}, createViewActions(window.g_urls.movies), {
        updateShowPlot: showPlot => state => ({
            showPlot
        }),
        updateEditPeople: movie => state => ({
            forms: Object.assign({}, state['forms'], {
                editPeople: movie
            })
        }),
    }),
    toasts

}
