const { h } = require('hyperapp')
var dateInput = element => {
    flatpickr(element, {
        onChange: function(selectedDates, dateStr, instance) { 
            console.log("CHANGED", selectedDates, dateStr, instance)
        }
    });

}

const FormDateInput = module.exports = ({value, action}) => <div class="form-group" >
    <label class="form-label" for="{field.label}">{field.label}</label>
    <input class="form-input" type="text" id="{field.label}" 
        placeholder={field.label} value={value} 
        onkeyup={e => action(e.target.value)}
        oncreate={dateInput}
    />
</div>

