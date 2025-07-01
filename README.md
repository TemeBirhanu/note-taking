# Functional State Management

A modular, fully functional state management system for JavaScript apps, following strict functional programming principles.

## Structure

```
functional-state-management/
├── package.json
├── stateManager.js         # Composes all modules, store, selectors
├── index.js                # Demo and usage examples
├── test.js                 # Comprehensive tests
├── README.md               # Documentation
└── src/
    ├── appState.js         # Single source of truth
    ├── immutableUpdate.js  # Immer, compose, memoize
    ├── stateReducer.js     # Pure reducer (all actions)
    ├── dispatchAction.js   # Dispatch mechanism
    ├── actionLogger.js     # Curried logger
    ├── historyReducer.js   # Undo/redo state logic
    └── undoRedo.js         # Curried undo/redo
```

## Supported Actions

- **Auth:** LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_USER
- **Notes:** ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, ARCHIVE_NOTE, PIN_NOTE, FAVORITE_NOTE, ADD_REMINDER, REMOVE_REMINDER, ADD_ATTACHMENT, REMOVE_ATTACHMENT, ADD_CHECKLIST_ITEM, TOGGLE_CHECKLIST_ITEM, REMOVE_CHECKLIST_ITEM
- **Selection:** SELECT_NOTE
- **Search/Filter:** SET_SEARCH_QUERY, SET_FILTER_TAGS, SET_FILTER_ARCHIVED, SET_FILTER_PINNED, SET_FILTER_FAVORITE
- **UI:** TOGGLE_DARK_MODE, TOGGLE_SIDEBAR, SET_LOADING, OPEN_MODAL, CLOSE_MODAL
- **Sync:** SET_SYNC_STATUS, SET_LAST_SYNCED, SET_SYNC_ERROR

## Usage

Install dependencies:

```
npm install
```

Run the demo:

```
npm start
```

Run the tests:

```
node test.js
```

Import and use in your app:

```js
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
  getSyncStatus
} from './stateManager.js';
```

---

This system is fully modular, extensible, and ideal for functional JavaScript applications. 