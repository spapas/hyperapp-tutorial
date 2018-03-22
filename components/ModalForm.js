const { h } = require('hyperapp')


const ModalForm = module.exports = ({ fields, item, hideAction }) => <div className={`modal ${item?'active':''}`}>
<div class="modal-overlay"></div>
    <div class="modal-container">
    <div class="modal-header">
        <button class="btn btn-clear float-right" onclick={hideAction}></button>
        <div class="modal-title h5">{item.id?`Editing item ${item.id}`:"Add new item!"}</div>
    </div>
    <div class="modal-body">
        <div class="content">
            ...
        </div>
    </div>
        <div class="modal-footer">
            <button class="btn" onclick={hideAction}>Ok</button>

        </div>
    </div>
</div>
