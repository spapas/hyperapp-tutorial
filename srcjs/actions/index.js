import { location } from "@hyperapp/router"
import auth from "./auth.js"
import toasts from "./toasts.js"
import people from "./people.js"
import movies from "./movies.js"

const reducers = module.exports = {
    location: location.actions, 
    auth, 
    movies,
    people,
    toasts
    
}
