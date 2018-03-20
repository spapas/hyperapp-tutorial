const { h } = require('hyperapp')

const Row = module.exports = ({ row, rowColumns, actions }) => <tr>
    {rowColumns.map(z => <td>{z(row, actions)}</td>) }
</tr>

