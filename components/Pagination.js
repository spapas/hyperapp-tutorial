const { h } = require('hyperapp')

const Toast = module.exports = ({page, next, previous, actions}) => <ul class="pagination">
    <li class={`page-item ${previous?'':'disabled'}`}>
        <a onclick={() => actions.loadPeople(previous)} href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item active">
        <a href="#">{page}</a>
    </li>
    <li class={`page-item ${next?'':'disabled'}`}>
        <a onclick={() => actions.loadPeople(next) } href="#">Next</a>
    </li>
</ul>

