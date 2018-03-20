import { h } from "hyperapp"
import FormInput from '../components/FormInput.js'
import Spinner from '../components/Spinner.js'

const okClick = (e, actions, g_actions) => {
    actions.login(g_actions)
    return false;
}

const Login = module.exports = (state, actions, g_actions) => <div key='login'>
    <h2>Login</h2>
    <form method='POST'>
        <FormInput label='Username' value={state.forms.login.username} action={(value)=>g_actions.forms.updateField({formname: 'login', fieldname: 'username', value}) } />
        <FormInput label='Password' value={state.forms.login.password} type='password' action={(value)=>g_actions.forms.updateField({formname: 'login', fieldname: 'password', value}) } />
        {state.auth.loading == true ? <Spinner /> : <button id='btn' name='btn'  class='btn btn-primary' onclick={(e)=>okClick(e, actions, g_actions)}>Ok</button>}
    </form>

</div>
