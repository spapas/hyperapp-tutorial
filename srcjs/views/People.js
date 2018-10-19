import { h } from 'hyperapp';
import { Spinner } from '../components/Spinners.js';
import Table from '../components/Table.js';
import ModalForm from '../components/ModalForm.js';
import SearchForm from '../components/SearchForm.js';
import { mergeValuesErrors } from '../util/forms.js';
import { checkAuth } from '../util/auth';


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



const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
  {'key': 'birthday', 'label': 'Birthday', 'type': 'text'},
];


module.exports = (state, actions, g_actions) => <div key='people'>
  <h2>People list</h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={() => actions.load(window.g_urls.persons)}>
      <SearchForm
        formFields={mergeValuesErrors(formFields, state.people.forms.search, null)}
        updateFieldAction={(key, value)=>actions.updateField({formname: 'search', fieldname: key, value})}
        searchAction={actions.searchAction}
      />
      {state.loading == true ? <Spinner /> : <Table
        rowHeaders={checkAuth(rowHeaders, state.auth)}
        rowColumns={checkAuth(rowColumns, state.auth)}
        rows={state.people}
        actions={actions} />}
    </div>
  </div>
  {state.people.forms.edit?<ModalForm
    loading={state.people.loading}
    formFields={mergeValuesErrors(formFields, state.people.forms.edit, state.people.forms.edit.errors)}
    item={state.people.forms.edit}
    hideAction={()=>actions.updateEdit(null)}
    saveAction={()=>actions.saveEdit({g_actions: g_actions, key: state.auth.key})}
    updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: key, value})}
  />:null}
</div>;
