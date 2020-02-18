
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const TYPES = {
  INCREASE,
  DECREASE,
};

const increase = () => ({ type: 'INCREASE' });

const decrease = () => ({ type: 'DECREASE' });

const asyncIncrease = () => function (dispatch, getState) {
  console.log(`asyncIncrease getState(): ${JSON.stringify(getState())}`);
  setTimeout(() => dispatch({ type: 'INCREASE' }), 500);
};

export {
  increase,
  decrease,
  asyncIncrease,
};
