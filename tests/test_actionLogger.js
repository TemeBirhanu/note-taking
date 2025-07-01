import { createLogger } from '../src/actionLogger.js';

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

let logOutput = '';
const originalLog = console.log;
console.log = (msg, event) => { logOutput = msg + (event ? ' ' + JSON.stringify(event) : ''); };

const logger = createLogger('[Test]');
assert('Logger is curried', typeof logger === 'function');
const logFn = logger({ type: 'TEST_ACTION', payload: 123 });
assert('Logger returns a function', typeof logFn === 'function');
logFn();
assert('Logger logs correct output', logOutput.includes('[Test] Event:'));

console.log = originalLog;
console.log('All actionLogger tests passed.'); 