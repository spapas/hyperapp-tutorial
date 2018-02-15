import { h } from "hyperapp"
import { Switch, Route, NoMatch } from "@hyperapp/router"

import Home from './Home.js'
import Movies from './Movies.js'
import People from './People.js'
import Login from './Login.js'
import Tabs from '../components/Tabs.js'

export const main = (state, actions) => <div class='container grid-xl'>
    <Tabs currentLocation={state.location} />
    <Switch>
        <Route path="/" render={() => Home(state, actions)} />
        <Route path="/movies" render={() => Movies(state.movies, actions.movies)} />
        <Route path="/people" render={() => People(state.people, actions.people)} />
        <Route path="/login" render={() => Login(state.auth, actions.auth)} />
    </Switch>
</div>

