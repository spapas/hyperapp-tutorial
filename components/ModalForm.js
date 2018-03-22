import { h } from 'hyperapp'
import FormInput from './FormInput.js'

const renderFields = (fields, item, updateFieldAction) => fields.map(
    f => <FormInput label={f.label} key={f.key} value={item[f.key]} action={(val) => updateFieldAction(f.key, val)} />
)

const ModalForm = module.exports = ({ formFields, item, hideAction, updateFieldAction }) => <div className={`modal ${item?'active':''}`}>
<div class="modal-overlay"></div>
    <div class="modal-container">
    <div class="modal-header">
        <button class="btn btn-clear float-right" onclick={hideAction}></button>
        <div class="modal-title h5">{item.id?`Editing item ${item.id}`:"Add new item!"}</div>
    </div>
    <div class="modal-body">
        <div class="content">
            <form method='POST'>
                {renderFields(formFields, item, updateFieldAction)}
            </form>
        </div>
    </div>
        <div class="modal-footer">
        <button class="btn" onclick={hideAction}>Cancel</button>
            <button class="btn" onclick={hideAction}>Ok</button>

        </div>
    </div>
</div>
