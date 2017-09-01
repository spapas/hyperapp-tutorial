const { h } = require('hyperapp')

const Table=module.exports = ({text, count, actions}) => <table>
    <thead><tr><th>VALUE</th></tr></thead>
    <tbody>
        {
            ((count*1==count)?[...Array(count).keys()]:[]).map(z => <tr><td>{z} {text}</td></tr>)
        }
    </tbody>
</table>

