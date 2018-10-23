const { h } = require('hyperapp')


const FormDateInput = module.exports = ({field, action}) => <div class="form-group" >
    <label class="form-label" for="{field.label}">{field.label}</label>
    <input class="form-input" type="text" id="{field.label}" 
        placeholder={field.label} value={field.value} 
        oncreate={element => {
            $(element).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: (date, inst) => {
                    console.log(date, inst)
                    action(date)
                }
            })
        }}
    />
</div>

