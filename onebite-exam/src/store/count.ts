// state, action 함수를 포함하는 객체인 store 생성
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// create(() => {
//   return {
//     count: 0,
//     increase: () => {},
//     decrease: () => {},
//   };
// });

// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

export const useCountStore = create(
  // immer
  // -> 상태를 직접 바꾸는 것처럼 써도, 내부적으로 안전하게 불변 상태를 유지시켜주는 미들웨어
  immer(
    // combine
    // -> 현재 store의 type을 첫번째 인자를 통해 자동으로 추론
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          // const count = get().count;
          // set({
          //   count: count + 1,
          // });

          // set((state) => ({
          //   count: state.count + 1,
          // }));

          set((state) => {
            state.count += 1;
          });
        },
        decrease: () => {
          // set((state) => ({
          //   count: state.count - 1,
          // }));
          set((state) => {
            state.count -= 1;
          });
        },
      },
    }))
  )
);

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       // const count = get().count;
//       // set({
//       //   count: count + 1,
//       // });

//       set((store) => ({
//         count: store.count + 1,
//       }));
//     },
//     decrease: () => {
//       set((store) => ({
//         count: store.count - 1,
//       }));
//     },
//   },
// }));

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
