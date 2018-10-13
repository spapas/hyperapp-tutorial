import { h } from 'hyperapp';
import { Spinner } from '../components/Spinners.js';
import Table from '../components/Table.js';
import ModalForm from '../components/ModalForm.js';


const rowHeaders = [
  'Id',
  'Name',
  'Birthday',
  'Edit'
];

const rowColumns = [
  (person) => person.id,
  (person) => person.name,
  (person) => person.birthday,
  (person, actions) => <button className='btn btn-block btn-primary' onclick={()=>actions.updateEdit(Object.assign({}, person))}>Edit</button>
];

// TODO: Move to auth utils
const checkAuth = (list, auth) => {
  if(auth.key) return list;
  return list.slice(0, -1);
};

// TODO: Move to form utils
const mergeValuesErrors = (formFields, item, errors) => {
  return formFields.map(f => Object.assign({}, f, {
    'value': item[f.key]
  }, errors?{
    'errors': errors[f.key]
  }:{}
  ));
};

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
  {'key': 'birthday', 'label': 'Birthday', 'type': 'text'},
];


module.exports = (state, actions, g_actions) => <div key='people'>
  <h2>People list</h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={() => actions.load(window.g_urls.persons)}>
      {state.loading == true ? <Spinner /> : <Table
        rowHeaders={checkAuth(rowHeaders, state.auth)}
        rowColumns={checkAuth(rowColumns, state.auth)}
        rows={state.people}
        actions={actions} />}
    </div>
  </div>
  {state.people.forms.edit?<ModalForm
    loading={state.movies.loading}
    formFields={mergeValuesErrors(formFields, state.movies.forms.edit, state.movies.forms.edit.errors)}
    item={state.movies.forms.edit}
    hideAction={()=>actions.updateEdit(null)}
    saveAction={()=>actions.saveEdit({g_actions: g_actions, key: state.auth.key})}
    updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: key, value})}
  />:null}
</div>;
