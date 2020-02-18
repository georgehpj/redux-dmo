import { createStore, combineReducer, applyMiddleware } from '../src/redux';
import { number, logs } from '../src/reducer';
import thunk from '../src/middlewares/thunk';

const reducer = combineReducer({ number, logs });

const store = applyMiddleware(thunk)(createStore)(reducer);

test('test increate', (done) => {
  expect(store.getState().number).toEqual(0);
  store.dispatch({ type: 'INCREASE' });
  expect(store.getState().number).toEqual(1);
  expect(store.getState().logs.length).toEqual(1);

  store.dispatch((dispatch, getState) => new Promise((resolve) => {
    setTimeout(() => {
      dispatch({ type: 'DECREASE' });
      expect(store.getState().number).toEqual(0);
      expect(store.getState().logs.length).toEqual(2);
      resolve();
    }, 1000);
  }).then(done));
});
