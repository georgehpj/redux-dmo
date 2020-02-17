import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducer } from './redux';
import { number, logs } from './reducer';
import MyComponent from './MyComponent';
import { Provider } from './react-redux';

const reducer = combineReducer({
  number,
  logs,
});
const store = createStore(reducer);

function log({ getState }) {
  return function (next) {
    return function (action) {
      console.log(`type: ${action.type}`);
      console.log(`state before: ${JSON.stringify(getState())}`);
      next(action);
      console.log(`state after: ${JSON.stringify(getState())}`);
    };
  };
}

function thunk({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return next(action);
    };
  };
}

let dispatch;
const _store = {
  getState: store.getState,
  dispatch: (...args) => dispatch(...args),
};
store.dispatch = thunk(_store)(log(_store)(store.dispatch));
dispatch = store.dispatch;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyComponent />
      </Provider>
    );
  }
}

const r = () => {
  // 基于react-platform的项目不要修改id
  render(<App />, document.querySelector('#app'));
};

r();

store.subscribe(r);
