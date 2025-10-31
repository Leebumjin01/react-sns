import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();

  const [content, setContent] = useState("");

  const handleAddClick = () => {
    if (content.trim() === "") return;
    mutate(content);
    setContent("");
  };

  const addBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요 ..."
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick();
        }}
      />
      <Button onClick={handleAddClick} disabled={isPending} ref={addBtnRef}>
        추가
      </Button>
    </div>
  );
}
