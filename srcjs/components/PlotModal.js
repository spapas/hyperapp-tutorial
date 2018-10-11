const { h } = require('hyperapp')

const PlotModal = module.exports = ({ movie, actions }) => <div className={`modal ${movie?'active':''}`}>
<div class="modal-overlay"></div>
    <div class="modal-container">
    <div class="modal-header">
        <button class="btn btn-clear float-right" onclick={() => actions.updateShowPlot(null)}></button>
        <div class="modal-title h5">{movie.title}</div>
    </div>
    <div class="modal-body">
        <div class="content">
            {movie.story}
        </div>
    </div>
        <div class="modal-footer">
            <button class="btn" onclick={() => actions.updateShowPlot(null)}>Ok</button>

        </div>
    </div>
</div>
