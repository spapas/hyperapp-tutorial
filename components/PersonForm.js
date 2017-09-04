const { h } = require('hyperapp')
import FormInput from './FormInput.js'


const PersonForm = module.exports = ({ person, actions }) => {
    return <form>
        <FormInput label={'Όνομα'} value={person.name} action={(x)=>actions.updateForm({object: 'person', field: 'name', value: x})} />
        <FormInput label={'Φύλο'} value={person.gender} action={(x)=>actions.updateForm({object: 'person', field: 'gender', value: x})} />
        <FormInput label={'Έτος γέννησης'} value={person.birth_year} action={(x)=>actions.updateForm({object: 'person', field: 'birth_year', value: x})} />
        
        <td><button type='button' class='btn btn-block' onclick={()=>{
                //console.log(person.url)
                let id = person.url.match(/\/(\d+)\/$/)[1]
                //console.log(id)
                actions.savePerson(id)
            }
        }
        >Save</button></td>
        <td><button type='button' class='btn btn-block btn-primary' onclick={()=>actions.hideModal()}>Cancel</button></td>
    </form>
}

