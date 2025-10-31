import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todos-data";
import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function TodoListPage() {
  const { data: todoIds, isLoading, error } = useTodosData();

  if (error) return <div>오류가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todoIds?.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  );
}
