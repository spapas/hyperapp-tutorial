const { h } = require('hyperapp')

const FormInputLong = module.exports = ({field, action}) => <div class="form-group">
    <label class="form-label" for="{field.key}">{field.label}</label>
    <textarea class="form-input" id={field.key} rows='5'
        placeholder={field.label} 
        oninput={e => action(e.target.value)}
        value={field.value}/>
</div>

