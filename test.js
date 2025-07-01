import {
  appState,
  dispatchAction,
  undoAction,
  redoAction,
  getNotes,
  getAuth,
  getSelectedNote,
  getUI,
  getFilter,
  getSyncStatus
} from './stateManager.js';

let state = appState;

// Add a dummy logger for tests
const testLogger = () => () => {};

function assert(desc, cond) {
  if (!cond) throw new Error('Test failed: ' + desc);
  else console.log('\u2714', desc);
}

// Test: Add note (should fail when not authenticated)
const note = { id: 't1', title: 'Test', content: 'Body', tags: [], createdAt: 1, updatedAt: 1, archived: false, pinned: false, favorite: false, reminders: [], attachments: [], checklist: [] };
state = dispatchAction(state, { type: 'ADD_NOTE', payload: note }, testLogger);
assert('Note not added when not authenticated', !getNotes(state).find(n => n.id === 't1'));

// Test: Login
state = dispatchAction(state, { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'alice', email: 'alice@mail.com' }, token: 'tok' } }, testLogger);
assert('User authenticated', getAuth(state).isAuthenticated);

// Test: Add note (should succeed when authenticated)
state = dispatchAction(state, { type: 'ADD_NOTE', payload: note }, testLogger);
assert('Note added when authenticated', getNotes(state).find(n => n.id === 't1'));

// Test: Update note
state = dispatchAction(state, { type: 'UPDATE_NOTE', payload: { id: 't1', title: 'Updated' } }, testLogger);
assert('Note updated', getNotes(state).find(n => n.id === 't1').title === 'Updated');

// Test: Undo/Redo
state = undoAction(state)();
assert('Undo works', getNotes(state).find(n => n.id === 't1').title === 'Test');
state = redoAction(state)();
assert('Redo works', getNotes(state).find(n => n.id === 't1').title === 'Updated');

// Test: Archive note
state = dispatchAction(state, { type: 'ARCHIVE_NOTE', payload: { id: 't1' } }, testLogger);
assert('Note archived', getNotes(state).find(n => n.id === 't1').archived === true);

// Test: Pin note
state = dispatchAction(state, { type: 'PIN_NOTE', payload: { id: 't1', pinned: true } }, testLogger);
assert('Note pinned', getNotes(state).find(n => n.id === 't1').pinned === true);

// Test: Select note
state = dispatchAction(state, { type: 'SELECT_NOTE', payload: { id: 't1' } }, testLogger);
assert('Note selected', getSelectedNote(state) && getSelectedNote(state).id === 't1');

// Test: Filter
state = dispatchAction(state, { type: 'SET_FILTER_TAGS', payload: { tags: ['work'] } }, testLogger);
assert('Filter tags set', getFilter(state).tags.includes('work'));

// Test: Sync status
state = dispatchAction(state, { type: 'SET_SYNC_STATUS', payload: { syncing: true } }, testLogger);
assert('Sync status set', getSyncStatus(state).syncing === true);

// Test: Delete note
state = dispatchAction(state, { type: 'DELETE_NOTE', payload: { id: 't1' } }, testLogger);
assert('Note deleted', !getNotes(state).find(n => n.id === 't1'));

// Test: Logout
state = dispatchAction(state, { type: 'LOGOUT' }, testLogger);
assert('User logged out', !getAuth(state).isAuthenticated);

// Test: Add note after logout (should fail)
state = dispatchAction(state, { type: 'ADD_NOTE', payload: note }, testLogger);
assert('Note not added after logout', !getNotes(state).find(n => n.id === 't1'));

// Test: UI action (should always work)
const prevDark = getUI(state).darkMode;
state = dispatchAction(state, { type: 'TOGGLE_DARK_MODE' }, testLogger);
assert('Dark mode toggled', getUI(state).darkMode !== prevDark);

console.log('All tests passed.'); 