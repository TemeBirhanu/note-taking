import { withImmer } from "./immutableUpdate.js";
import StateReducer from "./stateReducer.js";

const immutableReducer = withImmer(StateReducer);

// List of action types that should be tracked in history (note-changing actions)
const HISTORY_ACTIONS = [
  "ADD_NOTE",
  "UPDATE_NOTE",
  "DELETE_NOTE",
  "ARCHIVE_NOTE",
  "PIN_NOTE",
  "FAVORITE_NOTE",
  "ADD_REMINDER",
  "REMOVE_REMINDER",
  "ADD_ATTACHMENT",
  "REMOVE_ATTACHMENT",
  "ADD_CHECKLIST_ITEM",
  "TOGGLE_CHECKLIST_ITEM",
  "REMOVE_CHECKLIST_ITEM"
];

export const dispatchAction = (state, event, logger = null) => {
  if (logger) logger(event)();
  const { history, ...rest } = state;
  const prevState = JSON.parse(JSON.stringify(rest));
  const newPresent = immutableReducer(state, event);

  if (HISTORY_ACTIONS.includes(event.type)) {
    const newHistory = {
      past: [...state.history.past, prevState],
      present: newPresent,
      future: []
    };
    return { ...newPresent, history: newHistory };
  } else {
    // For non-history actions, do not update history
    return { ...newPresent, history: state.history };
  }
}; 