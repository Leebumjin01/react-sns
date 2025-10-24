import { Button } from "@/components/ui/button";
import { useCountStore } from "@/store/count";

export default function CounterPage() {
  const { count, decrease, increase } = useCountStore();

  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
      <div>{count}</div>
    </div>
  );
}
