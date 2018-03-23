import { h } from 'hyperapp'

const Spinner = () => <div class="spinner">
    <div class="bounce1" />
    <div class="bounce2" />
    <div class="bounce3" />
</div>


const SpinnerSmall = module.exports = () => <div class="loading loading-lg"></div>

module.exports['Spinner'] = Spinner
module.exports['SpinnerSmall'] = SpinnerSmall