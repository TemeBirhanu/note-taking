import StateReducer from '../src/stateReducer.js';
import appState from '../src/appState.js';
import { withImmer } from '../src/immutableUpdate.js';

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

const event = { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'alice', email: 'alice@mail.com' }, token: 'tok' } };
const immerReducer = withImmer(StateReducer);
const state1 = JSON.parse(JSON.stringify(appState));
const state2 = immerReducer(state1, event);

assert('Reducer does not mutate input', state1.auth.isAuthenticated === false);
assert('Reducer returns new state', state2.auth.isAuthenticated === true);

const state3 = immerReducer(state1, event);
assert('Reducer is deterministic', JSON.stringify(state2) === JSON.stringify(state3));

console.log('All stateReducer tests passed.'); 