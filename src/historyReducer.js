export const historyReducer = {
  undo: (state) => {
    const { past, present, future } = state.history;
    if (past.length === 0) return { ...state, history: { past, present, future } };
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const newFuture = [present, ...future];
    return {
      ...previous,
      history: { past: newPast, present: previous, future: newFuture }
    };
  },
  redo: (state) => {
    const { past, present, future } = state.history;
    if (future.length === 0) return { ...state, history: { past, present, future } };
    const next = future[0];
    const newFuture = future.slice(1);
    const newPast = [...past, present];
    return {
      ...next,
      history: { past: newPast, present: next, future: newFuture }
    };
  }
}; 