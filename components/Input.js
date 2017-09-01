const { h } = require('hyperapp')

const Input = module.exports = ({ text, update }) => <input onkeyup={e => update(e.target.value)} value={text} />

