import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducer, applyMiddleware } from './redux';
import { number, logs } from './reducer';
import MyComponent from './MyComponent';
import { Provider } from './react-redux';
import thunk from './middlewares/thunk';
import log from './middlewares/log';

const reducer = combineReducer({
  number,
  logs,
});

const store = applyMiddleware(thunk, log)(createStore)(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyComponent />
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#app'));

// const r = () => {
//   // 基于react-platform的项目不要修改id
//   render(<App />, document.querySelector('#app'));
// };

// r();

// store.subscribe(r);
