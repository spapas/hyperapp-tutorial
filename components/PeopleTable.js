const { h } = require('hyperapp')
import PersonRow from './PersonRow.js'
import PlotModal from './PlotModal.js'

const PeopleTable = module.exports = ({ people, actions }) => <div>
    <table class="table table-striped table-hover">
        <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Edit</th>
        </tr></thead>
        <tbody>
            {
                people.items.map(z => <PersonRow person={z} actions={actions}/>)
            }
        </tbody>
    </table>
</div>
