const appState = {
  auth: {
    user: { id: "", username: "", email: "" },
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null
  },
  
  notes: [
    {
      id: "",
      title: "",
      content: "",
      tags: [],
      createdAt: "",
      updatedAt: "",
      archived: false,
      pinned: false,
      favorite: false,
      reminders: [{ id: "", date: "", repeat: "none" }],
      attachments: [{ id: "", fileName: "", fileType: "", url: "" }],
      checklist: [{ id: "", text: "", done: false }]
    }
  ],
  selectedNoteId: null,
  searchQuery: "",
  filter: { tags: [], archived: false, pinned: null, favorite: null },
  ui: {
    darkMode: true,
    sidebarOpen: true,
    loading: false,
    modal: { isOpen: false, type: null, payload: null }
  },
  syncStatus: { lastSyncedAt: null, syncing: false, hasError: false },
  history: { past: [], present: {}, future: [] }
};

export default appState; 