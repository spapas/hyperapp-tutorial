const { h } = require('hyperapp')

const FormInput = module.exports = ({label, value, action, type='text'}) => <div class="form-group">
    <label class="form-label" for="{label}">{label}</label>
    <input class="form-input" type={type} id={label}
        placeholder={label} value={value} 
        oninput={e => action(e.target.value)}
    />
</div>

