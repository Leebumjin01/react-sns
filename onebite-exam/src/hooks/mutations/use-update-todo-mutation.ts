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
      // console.log("prevTodos:", prevTodos);

      // 캐시 업데이트 (낙관적 업데이트)
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo
        );
      });

      // 이 return 값이 context로 전달
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

    // 요청 성공, 실패 상관없이 마지막에 항상 실행
    // 해당 쿼리 키(todolist)의 캐시 데이터를 무효화(invalidate -> stale 상태로 변경)
    // stale 상태가 된 쿼리는 자동으로 리패칭되어 서버에서 최신 데이터로 갱신됨
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}

/* 
import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    // UI 즉시 반영 (낙관적 업데이트)
    onMutate: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        );
      });
    },

    // 실패 시 - 복잡한 롤백 대신 서버 재요청으로 맞춤
    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
    },

    // 성공 시 - 서버 데이터 최신화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
    },
  });
}
 */
