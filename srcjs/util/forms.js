
const mergeValuesErrors = (formFields, item, errors) => {
    return formFields.map(f => Object.assign({}, f, {
        'value': item[f.key]
    }, errors?{
        'errors': errors[f.key]
    }:{}
    ));
}

module.exports = {
    mergeValuesErrors
}