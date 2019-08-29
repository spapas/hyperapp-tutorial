import { h } from 'hyperapp'
import { SpinnerSmall } from '../components/Spinners.js'


const renderField = (field, updateFieldAction ) => {
    let ftype = FormInput 
    if(field.type == 'longtext') ftype = FormInputLong
    return ftype({
        field,
        action: (val) => updateFieldAction(field.key, val)
    });
}

const renderFields = (fields,  updateFieldAction) => fields.map(
    f => renderField(f, updateFieldAction)
)

const SearchForm = module.exports = ({ loading, formFields, searchAction, updateFieldAction }) => <form method='GET' class='form-horizontal'>
    <div class="form-group">
        {
            formFields.map(f => <div key={f.key}>    
                <label class="form-label" for={f.key}>{f.label}</label>
                <input class="form-input" type={f.type} id={f.key} placeholder={f.label} value={f.value} 
                    oninput={e => updateFieldAction (f.key,  e.target.value)}
                />
            </div>)
        }
        {loading?<SpinnerSmall />:<div  >
            <button style={{marginTop: '2.3em'}}  class="btn ml-2 btn-primary" onclick={e => {e.preventDefault(); searchAction(); return false; }}>Filter</button>
            <button style={{'margin-top': '2.3em'}} class="btn ml-2" onclick={e => {e.preventDefault(); searchAction(true); return false; }} >Reset</button>
        </div>}
    </div>
</form>
            