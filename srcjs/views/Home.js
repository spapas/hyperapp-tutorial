import { h } from "hyperapp"

const Home = module.exports = (state, actions) => <div key='home'>
    {state.auth.key?<span>Hello, {state.auth.username}!</span>:<span>Please login to edit things</span>}
</div>
