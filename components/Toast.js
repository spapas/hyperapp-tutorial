const { h } = require('hyperapp')

const Toast = module.exports = ({text, actions}) => <div class="toast toast-primary">
    <button class="btn btn-clear float-right" onclick={() => actions.hideToast(text)}></button>
    {text}
</div>

