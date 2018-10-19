import { h } from "hyperapp"
import FilterTableView from './FilterTableView.js';

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
  {'key': 'birthday', 'label': 'Birthday', 'type': 'date'},
];

const People = FilterTableView({
  key: 'people',
  rowHeaders,
  rowColumns,
  formFields,
  title: 'People list'
})

module.exports = People;