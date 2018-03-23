const { h } = require('hyperapp')

const FormInput = module.exports = ({field, action}) => <div class={`form-group ${field.errors?'has-error':''}`} key={field.key}>
    <label class="form-label" for="{field.key}">{field.label}</label>
    <input class="form-input" type={field.type} id={field.key}
        placeholder={field.label} value={field.value} 
        oninput={e => action(e.target.value)}
    />
    <div class='form-input-hint'>{field.errors?field.errors[0]:null}</div>
</div>

