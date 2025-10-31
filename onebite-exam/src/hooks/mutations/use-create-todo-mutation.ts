import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {}, // 요청이 시작되었을 때 이벤트 핸들러
    onSettled: () => {}, // 요청이 종료되었을 때 이벤트 핸들러
    // onSuccess: (newTodo) => {
    //   queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list,
    //   });
    // }, // 요청 성공시 invalidateQueries를 사용해서 stale 상태로 만들면, 리액트 쿼리가 자동 fetch
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        }
      );
    }, // setQueryData 메서드를 통해 새로운 todoItem 이 추가가 됨, 리패칭 없이 리스트 업데이트
    onError: (error) => {
      window.alert(error.message);
    }, // 요청 실패시
  });
}
