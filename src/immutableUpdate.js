import { produce } from "immer";

// Higher-order function for immutable updates
export const withImmer = (reducer) => (state, event) =>
  produce(state, (draft) => reducer(draft, event)); 