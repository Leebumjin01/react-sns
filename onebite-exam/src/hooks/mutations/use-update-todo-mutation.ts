import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // 낙관적 업데이트
    onMutate: async (updatedTodo) => {
      // 낙관적 업데이트 진행 중에 데이터 조회 요청이 들어오면 취소
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list); // 업데이트 이전 todos data
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo
        );
      });

      return {
        prevTodos,
      };
    },
    // 요청 실패시 낙관적 업데이트 취소
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos
        );
      }
    },
    // 데이터 수정 요청 마무리시 todolist 캐시 데이터를 무효화 후 서버로부터 불러온 값으로 갱신
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
