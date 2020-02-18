export default function log({ getState }) {
  return function (next) {
    return function (action) {
      console.log(`state before: ${JSON.stringify(getState())}`);
      console.log(`action.type: ${action.type}`);
      next(action);
      console.log(`state after: ${JSON.stringify(getState())}`);
    };
  };
}
