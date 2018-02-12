const { h } = require('hyperapp')
var dateInput = element => {
    console.log(element);
console.log(flatpickr);
    flatpickr(element, {
        onChange: function(selectedDates, dateStr, instance) { 
            console.log("CHANGED", selectedDates, dateStr, instance)
        }
    });

}

const FormDateInput = module.exports = ({label, value, action}) => <div class="form-group" >
    <label class="form-label" for="{label}">{label}</label>
    <input class="form-input" type="text" id="{label}" 
        placeholder={label} value={value} 
        onkeyup={e => action(e.target.value)}
        oncreate={dateInput}
    />
</div>

