
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const TYPES = {
  INCREASE,
  DECREASE,
};

const increase = (dispatch) => {
  dispatch({ type: 'INCREASE' });
};
const decrease = (dispatch) => {
  dispatch({ type: 'DECREASE' });
};


export {
  increase,
  decrease,
};
