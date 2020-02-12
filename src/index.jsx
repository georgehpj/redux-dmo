import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from './redux';
import { reducer } from './reducer';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <div>
        <h1>{store.getState()}</h1>
        <button onClick={() => store.dispatch({ type: 'INCREASE' })}>+</button>
      </div>
    );
  }
}

const r = () => {
  // 基于react-platform的项目不要修改id
  render(<App />, document.querySelector('#app'));
};

r();

store.subscribe(r);
