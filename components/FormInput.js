const { h } = require('hyperapp')

const FormInput = module.exports = ({label, key, value, action, errors, type='text'}) => <div class={`form-group ${errors?'has-error':''}`} key={key}>
    <label class="form-label" for="{label}">{label}</label>
    <input class="form-input" type={type} id={key}
        placeholder={label} value={value} 
        oninput={e => action(e.target.value)}
    />
    <div class='form-input-hint'>{errors?errors[0]:null}</div>
</div>

