import React from 'react'
import { Todo } from '../../model'
import SingleTodo from './SingleTodo'

interface Props {
  todoList: Todo[]
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = (props: Props) => {
  const { todoList, setTodoList } = props
  return (
    <div>
      {todoList.map((value) => {
        return (
          <SingleTodo
            todo={value}
            key={value.id}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        )
      })}
    </div>
  )
}

export default TodoList
