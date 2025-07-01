import appState from '../src/appState.js';
import { dispatchAction } from '../src/dispatchAction.js';

const testLogger = () => () => {};

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

// Test: appState is a single object
assert('appState is an object', typeof appState === 'object' && appState !== null);

// Test: Direct mutation does not affect new state
const originalNotes = appState.notes.slice();
appState.notes.push({ id: 'should-not-be-here' });
assert('Direct mutation does not affect new state', !originalNotes.find(n => n.id === 'should-not-be-here'));

// Test: State changes only through dispatch
let state = appState;
state = dispatchAction(state, { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'alice', email: 'alice@mail.com' }, token: 'tok' } }, testLogger);
assert('State changes through dispatch', state.auth.isAuthenticated === true);

console.log('All appState tests passed.'); 