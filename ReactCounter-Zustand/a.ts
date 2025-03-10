import {create }from "zustand";

export interface State {
  count: number;
  addCount: () => void;
  subCount: () => void;
  resetCount: () => void;

}

export const useStore = create<State>((set) => ({
  count: 0,
  addCount: () =>
    set((state) => {
      return {
        ...state,
        count: state.count + 1
      };
    }),
  subCount: () =>
    set((state) => {
      return {
        ...state,
        count: state.count - 1
      };
    }),
  resetCount: () =>
    set((state) => ({
      ...state,
      count: 0
    }))
  
}));