import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { http } from '@/http';
import { Todo } from '@/models/Todo';

const TODO_API_URL = '/todo';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 0));

export function useGetTodos() {
  return useQuery<Todo[] | null, Error>('todos', async () => {
    await sleep();
    const response: AxiosResponse<Todo[]> = await http.get(TODO_API_URL);
    return response.data;
  }, {
    initialData: null,
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo>((newTodo) => {
    return sleep().then(() => {
      return http.post(TODO_API_URL, newTodo).then((response) => response.data);
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo>((updatedTodo) => {
    return sleep().then(() => {
      const { id, ...rest } = updatedTodo;
      return http.put(`${TODO_API_URL}?id=${id}`, rest).then((response) => response.data);
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>((id) => {
    return sleep().then(() => {
      return http.delete(`${TODO_API_URL}?id=${id}`);
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
}
