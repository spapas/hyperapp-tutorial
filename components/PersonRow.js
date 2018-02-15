const { h } = require('hyperapp')

const PersonRow = module.exports = ({ person, actions }) => {
    return <tr>
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.birthday}</td>
        
        <td><button class='btn btn-block btn-primary' onclick={()=>actions.displayModal(person.id)}>Edit</button></td>
    </tr>
}

