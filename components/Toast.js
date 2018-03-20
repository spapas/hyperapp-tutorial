const { h } = require('hyperapp')

const Toast = module.exports = ({text, actions, style='primary'}) => <div className={`toast toast-${style}`}>
    <button class="btn btn-clear float-right" onclick={() => actions.toasts.hide(text)}></button>
    {text}
</div>

