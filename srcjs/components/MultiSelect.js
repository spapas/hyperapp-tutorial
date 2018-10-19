import { h } from 'hyperapp'

const xMultiSelect = ({field, action}) => AbstractInput({
    field, 
    action, 
    realInput: <input class="form-input" type={field.type} id={field.key}
        placeholder={field.label} value={field.value} 
        oninput={e => action(e.target.value)}
        />
})

var data = [{
    value: '1',
    text: 'Amethyst'
}, {
    value: 2,
    text: 'Wisteria',
}]

const MultiSelect = ({field, action}) => <select name="" oncreate={element => {
    console.log(field)
    console.log(field.value)
    console.log(field.value.map(x=>x.id))
    new Selectr(element, {
        data: field.data,
        multiple: true,
        selectedValue: field.value.map(x=>''+x.id) 
        //selectedValue: ['1'] 
    });
    console.log(element)
} }></select>

module.exports = MultiSelect