import { h } from "hyperapp"
import { Spinner } from '../components/Spinners.js'
import Table from '../components/Table.js'
import PersonModal from '../components/PersonModal.js'


const rowHeaders = [
    'Id',
    'Name',
    'Birthday',
    'Edit'
]

const rowColumns = [
    (person, actions) => person.id,
    (person, actions) => person.name,
    (person, actions) => person.birthday,
    (person, actions) => <button class='btn btn-block btn-primary' onclick={()=>actions.edit(person)}>Edit</button>
    
]

const People = module.exports = (state, actions) => <div key='people'>
    <h2>People list</h2>
    <div class="columns">
        <div class="column col-lg-12" oncreate={() => actions.load(window.g_urls.persons)}>
            {state.loading == true ? <Spinner /> : <Table rowHeaders={rowHeaders} rowColumns={rowColumns} rows={state} actions={actions} />}
        </div>
    </div>
    
</div>
