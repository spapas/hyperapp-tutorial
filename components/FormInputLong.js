const { h } = require('hyperapp')

const FormInputLong = module.exports = ({label, value, action, type='text'}) => <div class="form-group">
    <label class="form-label" for="{label}">{label}</label>
    <textarea class="form-input" id={label} rows='5'
        placeholder={label} 
        oninput={e => action(e.target.value)}
        value={value}/>
</div>

