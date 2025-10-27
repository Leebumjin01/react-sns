import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],

    staleTime: 5000, // 지정한 시간 동안 데이터를 최신 상태로 간주
    // refetchInterval: 1000, // 지정한 밀리초(ms) 간격으로 데이터를 자동으로 재요청(refetch)
    // refetchInterval: false,
    // refetchOnMount: false, // 컴포넌트가 마운트될 때마다 자동으로 refetch할지 여부
    // refetchOnWindowFocus: false, // 사용자가 브라우저 탭을 다시 포커스할 때 refetch할지 여부
    // refetchOnReconnect: false, // 네트워크 연결이 끊겼다가 다시 연결될 때 refetch할지 여부

    gcTime: 5000, // TanStack Query에서 캐시된 데이터가 더 이상 사용되지 않을 때 메모리에서 제거
  });
}
