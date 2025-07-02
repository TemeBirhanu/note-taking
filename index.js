import {
  appState,
  dispatchAction,
  createLogger,
  undoAction,
  redoAction,
  getNotes,
  getAuth,
  getSelectedNote,
  getUI,
  getFilter,
  getSyncStatus,
  getFavoriteNotes,
  getArchivedNotes,
  getVisibleNotes,
  getVisibleFavoriteCount
} from './stateManager.js';

let state = appState;
const log = createLogger('[Demo]');

// --- AUTH ---
state = dispatchAction(state, { type: 'LOGIN_REQUEST' }, log);
state = dispatchAction(state, { type: 'LOGIN_SUCCESS', payload: { user: { id: 'u1', username: 'teme', email: 'teme@mail.com' }, token: 'tok' } }, log);
state = dispatchAction(state, { type: 'UPDATE_USER', payload: { username: 'teme2' } }, log);
console.log('Auth:', getAuth(state));

// --- NOTES ---
const note = { id: '1', title: 'First', content: 'Hello', tags: [], createdAt: Date.now(), updatedAt: Date.now(), archived: false, pinned: false, favorite: false, reminders: [], attachments: [], checklist: [] };
const note2 = { id: '2', title: 'Second', content: 'World', tags: ['work'], createdAt: Date.now(), updatedAt: Date.now(), archived: false, pinned: true, favorite: true, reminders: [], attachments: [], checklist: [] };
const note3 = { id: '3', title: 'Third', content: 'Test', tags: ['personal'], createdAt: Date.now(), updatedAt: Date.now(), archived: true, pinned: false, favorite: false, reminders: [], attachments: [], checklist: [] };
state = dispatchAction(state, { type: 'ADD_NOTE', payload: note }, log);
console.log('Notes:', getNotes(state));
console.log('Favorite Notes:', getFavoriteNotes(state));
console.log('Archived Notes:', getArchivedNotes(state));
console.log('Visible Notes:', getVisibleNotes(state));
console.log('Visible Favorite Count:', getVisibleFavoriteCount(state));
state = dispatchAction(state, { type: 'UPDATE_NOTE', payload: { id: '1', title: 'Updated Title' } }, log);
console.log('Notes:', getNotes(state));
state = dispatchAction(state, { type: 'ARCHIVE_NOTE', payload: { id: '1' } }, log);
console.log('Archived Notes:', getArchivedNotes(state));
console.log('Visible Notes:', getVisibleNotes(state));
state = dispatchAction(state, { type: 'PIN_NOTE', payload: { id: '1', pinned: true } }, log);
state = dispatchAction(state, { type: 'FAVORITE_NOTE', payload: { id: '1', favorite: true } }, log);
console.log('Favorite Notes:', getFavoriteNotes(state));
console.log('Visible Favorite Count:', getVisibleFavoriteCount(state));
state = dispatchAction(state, { type: 'ADD_REMINDER', payload: { noteId: '1', reminder: { id: 'r1', date: '2024-01-01', repeat: 'daily' } } }, log);
console.log('First reminder of first note:', getNotes(state)[1]?.reminders[0]);
state = dispatchAction(state, { type: 'REMOVE_REMINDER', payload: { noteId: '1', reminderId: 'r1' } }, log);
state = dispatchAction(state, { type: 'ADD_ATTACHMENT', payload: { noteId: '1', attachment: { id: 'a1', fileName: 'file.txt', fileType: 'txt', url: '/file.txt' } } }, log);
state = dispatchAction(state, { type: 'REMOVE_ATTACHMENT', payload: { noteId: '1', attachmentId: 'a1' } }, log);
state = dispatchAction(state, { type: 'ADD_CHECKLIST_ITEM', payload: { noteId: '1', item: { id: 'c1', text: 'Check', done: false } } }, log);
state = dispatchAction(state, { type: 'TOGGLE_CHECKLIST_ITEM', payload: { noteId: '1', itemId: 'c1' } }, log);
state = dispatchAction(state, { type: 'REMOVE_CHECKLIST_ITEM', payload: { noteId: '1', itemId: 'c1' } }, log);
state = dispatchAction(state, { type: 'DELETE_NOTE', payload: { id: '1' } }, log);
console.log('Notes:', getNotes(state));
state = dispatchAction(state, { type: 'ADD_NOTE', payload: note }, log);
console.log('Favorite Notes:', getFavoriteNotes(state));
console.log('Archived Notes:', getArchivedNotes(state));
console.log('Visible Notes:', getVisibleNotes(state));
console.log('Visible Favorite Count:', getVisibleFavoriteCount(state));

// --- SELECTION ---
state = dispatchAction(state, { type: 'SELECT_NOTE', payload: { id: '1' } }, log);
console.log('Selected Note:', getSelectedNote(state));

// --- SEARCH/FILTER ---
state = dispatchAction(state, { type: 'SET_SEARCH_QUERY', payload: { query: 'test' } }, log);
state = dispatchAction(state, { type: 'SET_FILTER_TAGS', payload: { tags: ['work'] } }, log);
state = dispatchAction(state, { type: 'SET_FILTER_ARCHIVED', payload: { archived: true } }, log);
state = dispatchAction(state, { type: 'SET_FILTER_PINNED', payload: { pinned: true } }, log);
state = dispatchAction(state, { type: 'SET_FILTER_FAVORITE', payload: { favorite: true } }, log);
console.log('Filter:', getFilter(state));
console.log('Visible Notes (after filter):', getVisibleNotes(state));
console.log('Visible Favorite Count (after filter):', getVisibleFavoriteCount(state));

// --- UI ---
state = dispatchAction(state, { type: 'TOGGLE_DARK_MODE' }, log);
state = dispatchAction(state, { type: 'TOGGLE_SIDEBAR' }, log);
state = dispatchAction(state, { type: 'SET_LOADING', payload: { loading: true } }, log);
state = dispatchAction(state, { type: 'OPEN_MODAL', payload: { type: 'info', payload: { msg: 'Hello' } } }, log);
state = dispatchAction(state, { type: 'CLOSE_MODAL' }, log);
console.log('UI:', getUI(state));

// --- SYNC ---
state = dispatchAction(state, { type: 'SET_SYNC_STATUS', payload: { syncing: true } }, log);
state = dispatchAction(state, { type: 'SET_LAST_SYNCED', payload: { lastSyncedAt: Date.now() } }, log);
state = dispatchAction(state, { type: 'SET_SYNC_ERROR', payload: { hasError: true } }, log);
console.log('Sync Status:', getSyncStatus(state));

// --- UNDO/REDO ---
console.log('originl, Notes:', getNotes(state));
console.log('originl, Visible Notes:', getVisibleNotes(state));
console.log('originl, Visible Favorite Count:', getVisibleFavoriteCount(state));
state = undoAction(state)();
console.log('After Undo, Notes:', getNotes(state));
console.log('After Undo, Visible Notes:', getVisibleNotes(state));
console.log('After Undo, Visible Favorite Count:', getVisibleFavoriteCount(state));
state = redoAction(state)();
console.log('After Redo, Notes:', getNotes(state));
console.log('After Redo, Visible Notes:', getVisibleNotes(state));
console.log('After Redo, Visible Favorite Count:', getVisibleFavoriteCount(state)); 