import { h } from 'hyperapp';
import { Spinner } from '../components/Spinners.js';
import Table from '../components/Table.js';


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
  (person, actions) => <button className='btn btn-block btn-primary' onclick={()=>actions.edit(person)}>Edit</button>
];

module.exports = (state, actions) => <div key='people'>
  <h2>People list</h2>
  <div className="columns">
    <div className="column col-lg-12" oncreate={() => actions.load(window.g_urls.persons)}>
      {state.loading == true ? <Spinner /> : <Table
        rowHeaders={rowHeaders}
        rowColumns={rowColumns}
        rows={state}
        actions={actions} />}
    </div>
  </div>

</div>;
