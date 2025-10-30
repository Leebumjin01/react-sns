import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,

    // 캐시 데이터 업데이트 방법
    // 1. 캐시 무효화 -> invalidateQueries
    // 2. 수정 요청의 응답 값 활용 -> onSuccess
    // 3. 낙관적 업데이트 -> onMutate

    // 2. 수정 요청의 응답 값 활용 -> onSuccess
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      });
    },

    onError: (error, variable, context) => {},

    onSettled: () => {},
  });
}
