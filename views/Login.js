import { h } from "hyperapp"
import FormInput from '../components/FormInput.js'

const Login = module.exports = (state, actions) => <div key='login'>
    <h2>Login</h2>

    <FormInput label='Username' value='' />
    <FormInput label='Password' value='' />
    <button>Ok</button>
</div>
