// state, action 함수를 포함하는 객체인 store 생성
import { create } from "zustand";

// create(() => {
//   return {
//     count: 0,
//     increase: () => {},
//     decrease: () => {},
//   };
// });

type Store = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const useCountStore = create<Store>((set, get) => ({
  count: 0,
  increase: () => {
    // const count = get().count;
    // set({
    //   count: count + 1,
    // });

    set((store) => ({
      count: store.count + 1,
    }));
  },
  decrease: () => {
    set((store) => ({
      count: store.count - 1,
    }));
  },
}));
