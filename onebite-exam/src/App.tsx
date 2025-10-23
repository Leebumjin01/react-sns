import "./App.css";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

function App() {
  const isActive = true;
  return (
    <div>
      <Button>버튼!</Button>
      {/* 여러 조건부 스타일을 표현하려면 cn 함수가 좋다? */}
      <div className={cn(isActive ? "text-green-500" : "text-red-500")}>
        isActive
      </div>

      {/* 단순 조건이면 그냥 삼항 연산자로도 가능(혹은 if else) */}
      <div className={isActive ? "text-green-500" : "text-red-500"}>
        isActive
      </div>

      <div className="text-primary">Primary</div>
      <div className="text-muted">Muted</div>
      <div className="text-destructive">Destructive</div>
    </div>
  );
}

export default App;
