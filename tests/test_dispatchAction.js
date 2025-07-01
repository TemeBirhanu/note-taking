import { dispatchAction } from '../src/dispatchAction.js';
import appState from '../src/appState.js';

let logCalled = false;
const testLogger = () => (event) => () => { logCalled = true; };

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

const state1 = JSON.parse(JSON.stringify(appState)); // deep clone
const state2 = dispatchAction(state1, { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'alice', email: 'alice@mail.com' }, token: 'tok' } }, testLogger);

assert('dispatchAction does not mutate input', state1.auth.isAuthenticated === false);
assert('dispatchAction updates state', state2.auth.isAuthenticated === true);

// Test history management for note actions
let state = state2;
state = dispatchAction(state, { type: 'ADD_NOTE', payload: { id: 'n1', title: 'Note' } }, testLogger);
assert('History updated for note action', state.history.past.length > 0);

// Test history not updated for UI action
const pastLength = state.history.past.length;
state = dispatchAction(state, { type: 'TOGGLE_DARK_MODE' }, testLogger);
assert('History not updated for UI action', state.history.past.length === pastLength);

console.log('All dispatchAction tests passed.'); 