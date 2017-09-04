const { h } = require('hyperapp')

const FormInput = module.exports = ({label, value, action}) => <div class="form-group">
    <label class="form-label" for="input-example-1">{label}</label>
    <input class="form-input" type="text" id="input-example-1" 
        placeholder={label} value={value} 
        onkeyup={e => action(e.target.value)}
    />
</div>

