import React, { useState, useEffect, useRef } from 'react'
import { Todo } from '../../../model'

interface Props {
  todo: Todo
  todoList: Todo[]
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = (props: Props) => {
  const { todo, todoList, setTodoList } = props

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEdit])

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    )
    setIsEdit(false)
  }

  const handleEdit = () => {
    if (!isEdit && !todo.isDone) {
      setIsEdit(!isEdit)
    }
  }

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id))
  }

  const handleDone = (id: number) => {
    setIsEdit(false)
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, todo.id)}>
        {isEdit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            onBlur={(e) => handleSubmit(e, todo.id)}
            ref={inputRef}
          />
        ) : (
          <span>{todo.todo}</span>
        )}
      </form>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
        <button onClick={() => handleDone(todo.id)}>Done</button>
      </div>
    </>
  )
}

export default SingleTodo
