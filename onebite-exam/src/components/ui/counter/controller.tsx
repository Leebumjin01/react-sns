import { useDecreaseCount, useIncreaseCount } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  // 구조 분해 할당 사용 시 count도 리렌더링이 발생
  // const {decrease, increase} = useCountStore();
  //   const decrease = useCountStore((store) => store.decrease);
  //   const increase = useCountStore((store) => store.increase);

  //   const { decrease, increase } = useCountStore((store) => store.actions);
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
