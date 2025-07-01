import appState from './src/appState.js';
import { dispatchAction } from './src/dispatchAction.js';
import { createLogger } from './src/actionLogger.js';
import { undoAction, redoAction } from './src/undoRedo.js';

// Store
let state = appState;

// Selectors (examples)
export const getNotes = (state) => state.notes;
export const getAuth = (state) => state.auth;
export const getSelectedNote = (state) => state.notes.find(n => n.id === state.selectedNoteId);
export const getUI = (state) => state.ui;
export const getFilter = (state) => state.filter;
export const getSyncStatus = (state) => state.syncStatus;

// Export everything needed
export {
  appState,
  dispatchAction,
  createLogger,
  undoAction,
  redoAction,
  state
}; 