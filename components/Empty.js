const { h } = require('hyperapp')

const Empty = module.exports = () => <div class="empty">
    <div class="empty-icon">
        <i class="icon icon-more-horiz"></i>
    </div>
    <p class="empty-title h5">No films</p>
    <p class="empty-subtitle">Please select the films of a character you want to display </p>
    
</div>
