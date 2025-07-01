import { withImmer } from '../src/immutableUpdate.js';
import appState from '../src/appState.js';

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

const reducer = (state, event) => {
  if (event.type === 'NESTED_UPDATE') {
    state.auth.user.username = event.payload.username;
  }
  return state;
};

const immerReducer = withImmer(reducer);
const state1 = appState;
const state2 = immerReducer(state1, { type: 'NESTED_UPDATE', payload: { username: 'bob' } });

assert('Original state not mutated', state1.auth.user.username !== 'bob');
assert('New state has updated username', state2.auth.user.username === 'bob');
assert('Original and new state are different objects', state1 !== state2);

console.log('All immutableUpdate tests passed.'); 