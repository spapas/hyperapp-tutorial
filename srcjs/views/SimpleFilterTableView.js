import { h } from "hyperapp"
import FilterTableView from './FilterTableView.js';

const rowHeaders = [
  'Id',
  'Name',
  'Edit'
];

const rowColumns = [
  (item) => item.id,
  (item) => item.name,
  (item, actions) => <button className='btn btn-block btn-primary' onclick={()=>actions.updateEdit(Object.assign({}, item))}>Edit</button>
];

const formFields = [
  {'key': 'name', 'label': 'Name', 'type': 'text'},
];

const SimpleFilterTableView = ({key, title}) => FilterTableView({
  key,
  rowHeaders,
  rowColumns,
  formFields,
  title
})

module.exports = SimpleFilterTableView;