import { historyReducer } from './historyReducer.js';

export const undoAction = (state) => () => historyReducer.undo(state);
export const redoAction = (state) => () => historyReducer.redo(state); 