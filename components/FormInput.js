const { h } = require('hyperapp')

const FormInput = module.exports = ({label, value, action}) => <div class="form-group">
    <label class="form-label" for="{label}">{label}</label>
    <input class="form-input" type="text" id="{label}" 
        placeholder={label} value={value} 
        onkeyup={e => action(e.target.value)}
    />
</div>

