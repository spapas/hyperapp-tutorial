const { h } = require('hyperapp')
import  R from "rambda"


const PersonRow = module.exports = ({ person, actions }) => {
    let id = R.dropLast(1,R.drop(1,R.head(R.match(/\/\d+\/$/, person.url))));
    return <tr>
        <td>{person.name}</td>
        <td>{person.gender}</td>
        <td>{person.birth_year}</td>
        <td><button class='btn btn-block' onclick={()=>actions.loadPersonAndGo(id)}>{id}</button></td>
        <td><button class='btn btn-block btn-primary' onclick={()=>actions.displayModal(id)}>{id}</button></td>
    </tr>
}

