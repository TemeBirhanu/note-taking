import appState from './src/appState.js';
import { dispatchAction } from './src/dispatchAction.js';
import { createLogger } from './src/actionLogger.js';
import { undoAction, redoAction } from './src/undoRedo.js';

// Store
let state = appState;

// Selectors (examples)
export const getNotes = (state) => state.notes;
export const getAuth = (state) => state.auth;

// Simple memoization utility for selectors
function memoizeSelector(fn) {
  let lastArgs = null;
  let lastResult = null;
  return function(state) {
    const args = [state.notes, state.selectedNoteId];
    if (
      lastArgs &&
      lastArgs[0] === args[0] &&
      lastArgs[1] === args[1]
    ) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn(state);
    return lastResult;
  };
}

// Memoized selector for selected note
export const getSelectedNote = memoizeSelector(
  (state) => state.notes.find(n => n.id === state.selectedNoteId)
);

export const getUI = (state) => state.ui;
export const getFilter = (state) => state.filter;
export const getSyncStatus = (state) => state.syncStatus;

// Memoized selector for favorite notes
export const getFavoriteNotes = memoizeSelector(
  (state) => state.notes.filter(n => n.favorite === true)
);

// Memoized selector for archived notes
export const getArchivedNotes = memoizeSelector(
  (state) => state.notes.filter(n => n.archived === true)
);

// Memoized selector for visible notes (filtered and/or searched)
export const getVisibleNotes = memoizeSelector(
  (state) => {
    let notes = state.notes;
    // Filter by tags if any
    if (state.filter.tags && state.filter.tags.length > 0) {
      notes = notes.filter(note =>
        note.tags && state.filter.tags.every(tag => note.tags.includes(tag))
      );
    }
    // Filter by archived
    if (typeof state.filter.archived === 'boolean') {
      notes = notes.filter(note => note.archived === state.filter.archived);
    }
    // Filter by pinned
    if (typeof state.filter.pinned === 'boolean') {
      notes = notes.filter(note => note.pinned === state.filter.pinned);
    }
    // Filter by favorite
    if (typeof state.filter.favorite === 'boolean') {
      notes = notes.filter(note => note.favorite === state.filter.favorite);
    }
    // Filter by search query
    if (state.searchQuery && state.searchQuery.trim() !== "") {
      const q = state.searchQuery.trim().toLowerCase();
      notes = notes.filter(note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
      );
    }
    return notes;
  }
);

// Example: Memoized selector combining multiple pieces of state (e.g., count of visible favorite notes)
export const getVisibleFavoriteCount = memoizeSelector(
  (state) => getVisibleNotes(state).filter(n => n.favorite).length
);

// Export everything needed
export {
  appState,
  dispatchAction,
  createLogger,
  undoAction,
  redoAction,
  state
}; 