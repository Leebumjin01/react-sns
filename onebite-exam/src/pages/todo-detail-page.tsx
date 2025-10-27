import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import { useParams } from "react-router";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id;
  console.log("id:", id);

  const { data, isLoading, error } = useTodoDataById(Number(id));

  //   if (isLoading) return <div>Loading...</div>;
  if (error) return <div>오류가 발생했습니다...</div>;

  return isLoading ? <div>Loading...</div> : data && <div>{data.content}</div>;
}
