import React, { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todosList: Todo[],
  isAdding?: boolean,
  tempNewTask: Todo | null,
  deleteTodo: (value: number) => void,
  deletingTodoIds: number[],
  updateTodos: (
    todoId: number,
    newData: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) => void,
  updatingTodoIds: number[],
};

export const TodoList: React.FC<Props> = memo(({
  todosList,
  tempNewTask,
  deleteTodo,
  deletingTodoIds,
  updateTodos,
  updatingTodoIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosList.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              readOnly
              onClick={() => updateTodos(
                todo.id, { completed: !todo.completed },
              )}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={cn(
              'modal', 'overlay',
              {
                'is-active': deletingTodoIds.includes(todo.id)
                  || updatingTodoIds.includes(todo.id),
              },
            )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {tempNewTask && (
        <div
          data-cy="Todo"
          className={cn(
            'todo',
            { completed: tempNewTask.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempNewTask.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={cn(
              'modal', 'overlay', 'is-active',
            )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
});
