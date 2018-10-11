import { h, app } from 'hyperapp';
import { location } from '@hyperapp/router';
import actions from './actions';
import main from './views/Main.js';
import state from './state.js';

const application = app(
  state,
  actions,
  main,
  document.getElementById('app')
);

const unsubscribe = location.subscribe(application.location);

const hideToasts = () => {
  application.toasts.clear();
};

actions.location.go('/');

addEventListener('pushstate', hideToasts);
addEventListener('popstate', hideToasts);
