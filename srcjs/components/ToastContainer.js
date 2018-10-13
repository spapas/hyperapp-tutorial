import { h } from 'hyperapp';

const Toast  = ({text, actions, style='primary'}) => <div className={`toast toast-${style}`}>
  <button className="btn btn-clear float-right" onclick={() => actions.toasts.hide(text)}></button>
  {text}
</div>;

const ToastContainer = module.exports = ({toasts, actions}) => <div className='toast-container'>
  {toasts.items.map((t) => <Toast text={t.text} style={t.style} actions={actions} />)}
</div>;

