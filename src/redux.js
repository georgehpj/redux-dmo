const createStore = (reducer) => {
  let state;
  const listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(getState(), action);
    listeners.forEach(listener => listener());
  };

  dispatch({ type: undefined });

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const combineReducer = reducers => (state = {}, action) => Object.keys(reducers).reduce((newState, key) => {
  newState[key] = reducers[key](state[key], action);
  return newState;
}, state);

const bindActionCreators = (actionCreators, dispatch) => Object.keys(actionCreators).reduce((result, key) => {
  result[key] = (...args) => dispatch(actionCreators[key](...args));
  return result;
}, {});

export {
  createStore,
  combineReducer,
  bindActionCreators,
};
