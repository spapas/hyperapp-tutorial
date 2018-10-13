import { h } from 'hyperapp';
import { FormInput } from '../components/FormInputs.js';
import { Spinner } from '../components/Spinners.js';

const okClick = (e, actions, g_actions) => {
  actions.login(g_actions);
  console.log(e);
  e.preventDefault();
  return false;
};

const Login = module.exports = (state, actions, g_actions) => <div key='login'>
  <h2>Login</h2>
  <form method='POST'>
    <FormInput
      field={{label:'Username', value: state.forms.login.username, type:'text'}}
      action={value=>actions.updateField({formname: 'login', fieldname: 'username', value}) } />
    <FormInput
      field={{label:'Password', value: state.forms.login.password, type:'password'}}
      action={value=>actions.updateField({formname: 'login', fieldname: 'password', value}) } />
    {state.loading == true ? <Spinner /> : <button id='btn' name='btn' className='btn btn-primary' onclick={(e)=>{ okClick(e, actions, g_actions)}}>Ok</button>}
  </form>

</div>;
