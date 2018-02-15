import { h } from "hyperapp"
import FormInput from '../components/FormInput.js'
import Spinner from '../components/Spinner.js'

const Login = module.exports = (state, actions) => <div key='login'>
    <h2>Login</h2>

    <FormInput label='Username' value={state.username} action={(value)=>actions.updateField({field: 'username', value}) } />
    <FormInput label='Password' value={state.password} action={(value)=>actions.updateField({field: 'password', value}) } />
    
    {state.loading == true ? <Spinner /> : <button class='btn btn-primary' onclick={()=>actions.login()}>Ok</button>}

</div>
