import { undoAction, redoAction } from '../src/undoRedo.js';
import { dispatchAction } from '../src/dispatchAction.js';
import appState from '../src/appState.js';

const testLogger = () => () => {};

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

// Authenticate and add a note
let state = dispatchAction(appState, { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'alice', email: 'alice@mail.com' }, token: 'tok' } }, testLogger);
state = dispatchAction(state, { type: 'ADD_NOTE', payload: { id: 'n1', title: 'Note' } }, testLogger);
state = dispatchAction(state, { type: 'UPDATE_NOTE', payload: { id: 'n1', title: 'Changed' } }, testLogger);

// Test: undoAction is curried and pure
const undoFn = undoAction(state);
assert('undoAction is curried', typeof undoFn === 'function');
const stateAfterUndo = undoFn();
assert('Undo reverts state', stateAfterUndo.notes.find(n => n.id === 'n1').title === 'Note');
assert('Undo does not mutate input', state.notes.find(n => n.id === 'n1').title === 'Changed');

// Test: redoAction is curried and pure
const redoFn = redoAction(stateAfterUndo);
assert('redoAction is curried', typeof redoFn === 'function');
const stateAfterRedo = redoFn();
assert('Redo reapplies state', stateAfterRedo.notes.find(n => n.id === 'n1').title === 'Changed');
assert('Redo does not mutate input', stateAfterUndo.notes.find(n => n.id === 'n1').title === 'Note');

console.log('All undoRedo tests passed.'); 