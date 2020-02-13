import React from 'react';
import { Consumer } from './react-redux';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Consumer>
        {({ store }) => (
          <div>
            <h1>{store.getState().number}</h1>
            <button onClick={() => store.dispatch({ type: 'INCREASE' })}>+</button>
            <button onClick={() => store.dispatch({ type: 'DECREASE' })}>-</button>

            <ul>
              {store.getState().logs.map(log => (
                <li>{log}</li>
              ))}
            </ul>
          </div>
        )}
      </Consumer>
    );
  }
}
