import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos, // 컴포넌트가 렌더링 될 때 fetch useEffect(()=>{fetchTodos()},[]) 랑 비슷한 맥락
    queryKey: QUERY_KEYS.todo.list,
    retry: 0, // 요청 실패 시 재시도 횟수
  });
}
