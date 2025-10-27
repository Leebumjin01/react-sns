import { useDeleteTodo } from "@/store/todos";
import { Button } from "../ui/button";

export default function TodoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const deleteTodo = useDeleteTodo();

  const handleDelete = () => {
    deleteTodo(id);
    console.log("id: ", id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      {content}
      <Button onClick={handleDelete} variant={"destructive"}>
        삭제
      </Button>
    </div>
  );
}
