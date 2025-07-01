const requiresAuth = [
  "ADD_NOTE", "UPDATE_NOTE", "DELETE_NOTE", "ARCHIVE_NOTE", "PIN_NOTE", "FAVORITE_NOTE",
  "ADD_REMINDER", "REMOVE_REMINDER", "ADD_ATTACHMENT", "REMOVE_ATTACHMENT",
  "ADD_CHECKLIST_ITEM", "TOGGLE_CHECKLIST_ITEM", "REMOVE_CHECKLIST_ITEM"
];

const StateReducer = (state, event) => {
  if (requiresAuth.includes(event.type) && !state.auth.isAuthenticated) {
    // Block note actions if not authenticated
    return state;
  }
  switch (event.type) {
    // AUTH
    case "LOGIN_REQUEST":
      state.auth.loading = true;
      state.auth.error = null;
      break;
    case "LOGIN_SUCCESS":
      state.auth = {
        ...state.auth,
        user: event.payload.user,
        isAuthenticated: true,
        token: event.payload.token,
        loading: false,
        error: null
      };
      break;
    case "LOGIN_FAILURE":
      state.auth.loading = false;
      state.auth.error = event.payload.error;
      break;
    case "LOGOUT":
      state.auth = {
        user: { id: "", username: "", email: "" },
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null
      };
      break;
    case "UPDATE_USER":
      state.auth.user = { ...state.auth.user, ...event.payload };
      break;

    // NOTES
    case "ADD_NOTE":
      state.notes.push(event.payload);
      break;
    case "UPDATE_NOTE": {
      const idx = state.notes.findIndex(n => n.id === event.payload.id);
      if (idx !== -1) state.notes[idx] = { ...state.notes[idx], ...event.payload };
      break;
    }
    case "DELETE_NOTE":
      state.notes = state.notes.filter(n => n.id !== event.payload.id);
      break;
    case "ARCHIVE_NOTE": {
      const idx = state.notes.findIndex(n => n.id === event.payload.id);
      if (idx !== -1) state.notes[idx].archived = true;
      break;
    }
    case "PIN_NOTE": {
      const idx = state.notes.findIndex(n => n.id === event.payload.id);
      if (idx !== -1) state.notes[idx].pinned = event.payload.pinned;
      break;
    }
    case "FAVORITE_NOTE": {
      const idx = state.notes.findIndex(n => n.id === event.payload.id);
      if (idx !== -1) state.notes[idx].favorite = event.payload.favorite;
      break;
    }
    case "ADD_REMINDER": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].reminders.push(event.payload.reminder);
      break;
    }
    case "REMOVE_REMINDER": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].reminders = state.notes[idx].reminders.filter(r => r.id !== event.payload.reminderId);
      break;
    }
    case "ADD_ATTACHMENT": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].attachments.push(event.payload.attachment);
      break;
    }
    case "REMOVE_ATTACHMENT": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].attachments = state.notes[idx].attachments.filter(a => a.id !== event.payload.attachmentId);
      break;
    }
    case "ADD_CHECKLIST_ITEM": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].checklist.push(event.payload.item);
      break;
    }
    case "TOGGLE_CHECKLIST_ITEM": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) {
        const cidx = state.notes[idx].checklist.findIndex(i => i.id === event.payload.itemId);
        if (cidx !== -1) state.notes[idx].checklist[cidx].done = !state.notes[idx].checklist[cidx].done;
      }
      break;
    }
    case "REMOVE_CHECKLIST_ITEM": {
      const idx = state.notes.findIndex(n => n.id === event.payload.noteId);
      if (idx !== -1) state.notes[idx].checklist = state.notes[idx].checklist.filter(i => i.id !== event.payload.itemId);
      break;
    }

    // SELECTION
    case "SELECT_NOTE":
      state.selectedNoteId = event.payload.id;
      break;

    // SEARCH/FILTER
    case "SET_SEARCH_QUERY":
      state.searchQuery = event.payload.query;
      break;
    case "SET_FILTER_TAGS":
      state.filter.tags = event.payload.tags;
      break;
    case "SET_FILTER_ARCHIVED":
      state.filter.archived = event.payload.archived;
      break;
    case "SET_FILTER_PINNED":
      state.filter.pinned = event.payload.pinned;
      break;
    case "SET_FILTER_FAVORITE":
      state.filter.favorite = event.payload.favorite;
      break;

    // UI
    case "TOGGLE_DARK_MODE":
      state.ui.darkMode = !state.ui.darkMode;
      break;
    case "TOGGLE_SIDEBAR":
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
      break;
    case "SET_LOADING":
      state.ui.loading = event.payload.loading;
      break;
    case "OPEN_MODAL":
      state.ui.modal = { isOpen: true, type: event.payload.type, payload: event.payload.payload };
      break;
    case "CLOSE_MODAL":
      state.ui.modal = { isOpen: false, type: null, payload: null };
      break;

    // SYNC
    case "SET_SYNC_STATUS":
      state.syncStatus.syncing = event.payload.syncing;
      break;
    case "SET_LAST_SYNCED":
      state.syncStatus.lastSyncedAt = event.payload.lastSyncedAt;
      break;
    case "SET_SYNC_ERROR":
      state.syncStatus.hasError = event.payload.hasError;
      break;

    default:
      break;
  }
  return state;
};

export default StateReducer; 