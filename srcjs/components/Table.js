import { h } from 'hyperapp'
import Pagination from '../components/Pagination.js'

const Row = module.exports = ({ row, rowColumns, actions }) => <tr>
    {rowColumns.map(z => <td>{z(row, actions)}</td>) }
</tr>


const Table = module.exports = ({ rowHeaders, rowColumns, rows, actions }) => <div>
    <table class="table table-striped table-hover">
        <thead><tr>
            {rowHeaders.map(z => <th>{z}</th>)}
        </tr></thead>
        <tbody>
            {
                rows.items.map(z => <Row row={z} rowColumns={rowColumns} actions={actions}/>)
            }
        </tbody>
    </table>
    <Pagination page={rows.page} next={rows.next} previous={rows.previous} loadAction={actions.load} />
</div>
