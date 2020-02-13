// const reducer = (state = { number: 0, logs: [] }, action) => {
//   switch (action.type) {
//     case 'INCREASE':
//       return {
//         number: state.number + 1,
//         logs: [...state.logs, 'INCREASE'],
//       };
//     case 'DECREASE':
//       return {
//         number: state.number - 1,
//         logs: [...state.logs, 'DECREASE'],
//       };
//     default:
//       return state;
//   }
// };

// export {
//   reducer,
// };

const number = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

const logs = (state = [], action) => {
  switch (action.type) {
    case 'INCREASE':
      return [...state, 'INCREASE'];
    case 'DECREASE':
      return [...state, 'DECREASE'];
    default:
      return state;
  }
};

export {
  number,
  logs,
};

export default (state = { number: 0, logs: [] }, action) => ({
  number: number(state.number, action),
  logs: logs(state.logs, action),
});
