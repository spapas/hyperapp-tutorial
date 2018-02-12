const { h } = require('hyperapp')
import SpinnerSmall from './SpinnerSmall.js'
import PersonForm from './PersonForm.js'

const PersonModal = module.exports = ({ person, loading, actions }) => {
    let personDisplay = ''
    if(person && person.name) {
        personDisplay = <PersonForm person={person} actions={actions} />
    } else {
        personDisplay = ''
    }
    return <div className={`modal ${person?'active':''}`}>
        <div class="modal-overlay"></div>
            <div class="modal-container">
            <div class="modal-header">
                <button class="btn btn-clear float-right" onclick={() => actions.hideModal()}></button>
                <div class="modal-title h5">Στοιχεία προσώπου {(person && person.name)?person.name:''}</div>
            </div>
            <div class="modal-body">
                <div class="content">
                    {loading?<SpinnerSmall />:personDisplay}
                </div>
            </div>
                <div class="modal-footer">
                    ddd
                </div>
            </div>
        </div>
}

