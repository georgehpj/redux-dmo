function print(...args) {
  console.log(...args);
}

function addLog(...args) {
  console.log('before print');

  print(...args);

  console.log('after print');
}

function printBefore(...args) {
  print(`print: ${args.join(';')}`);
}


function addLog2(print) {
  return function (...args) {
    console.log('before print');
    print(...args);
    console.log('after print');
  };
}

function printBefore2(print) {
  return function (...args) {
    print(`print: ${args.join(';')}`);
  };
}


const enhancedLog = addLog2(print);
const enhancedLog2 = printBefore2(addLog2(print));

export default enhancedLog2;

// addLog('test');
// enhancedLog('test');

// printBefore('test');
enhancedLog2('test');
