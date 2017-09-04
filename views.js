import { h } from "hyperapp"
import Input from './components/Input.js'
import Table from './components/Table.js'
import People from './components/People.js'

import Spinner from './components/Spinner.js'
import PersonModal from './components/PersonModal.js'
import ToastContainer from './components/ToastContainer.js'

export const home = (state, actions) => <div>
    <h1>
        {state.text}<br />
    </h1>
    <Input text={state.text} update={actions.updateText} />
    <Input text={state.count} update={actions.updateCount} />
    <PersonModal person={state.person} loading={state.loading} actions={actions} />
    
    <Table count={state.count} text={state.text} actions={actions} />
    <hr />
    <ToastContainer toasts={state.toasts} actions={actions} />
    
    {state.loading == true ? <Spinner /> : <People people={state.people} actions={actions} />}
    {state.people.previous ? <button class='btn' onclick={() => actions.loadPeople(state.people.previous)}>Prev</button> : null}
    {state.people.next ? <button class='btn' onclick={() => actions.loadPeople(state.people.next)}>Next</button> : null}
</div>

export const detail = (state, actions) => <div>
    {state.loading == true ? <Spinner /> : <div>{state.person.name}</div>}
</div>

