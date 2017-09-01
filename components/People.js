const { h } = require('hyperapp')
import PersonRow from './PersonRow.js'

const People = module.exports = ({ people, actions }) => <table>
    <thead><tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Birth year</th>
        <th>ID</th>
        <th>Modal</th>
    </tr></thead>
    <tbody>
        {
        people['results'].map(z => <PersonRow person={z} actions={actions}/>)
        }
    </tbody>
</table>

