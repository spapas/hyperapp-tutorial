import { h } from 'hyperapp';

module.exports = ({state, actions}) => <div className="accordion">
  <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden />
  <label className="accordion-header" for="accordion-1">
    <i className="icon icon-arrow-right mr-1"></i>
    Show state
  </label>
  <div className="accordion-body">
    <pre><small>
      {JSON.stringify(state, null, 2)}
    </small></pre>
  </div>
</div>;
