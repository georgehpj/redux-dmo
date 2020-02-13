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
