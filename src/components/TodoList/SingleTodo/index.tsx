import React, { useState, useEffect, useRef } from 'react'
import { Todo } from '../../../model'
import './index.scss'

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
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodo } : todo
    )

    localStorage.setItem('todo', JSON.stringify(newTodo))
    setTodoList(newTodo)
    setIsEdit(false)
  }

  const handleEdit = () => {
    if (!isEdit && !todo.isDone) {
      setIsEdit(!isEdit)
    }
  }

  const handleDelete = (id: number) => {
    const newTodo = todoList.filter((todo) => todo.id !== id)
    localStorage.setItem('todo', JSON.stringify(newTodo))
    setTodoList(newTodo)
  }

  const handleDone = (id: number) => {
    setIsEdit(false)
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
    localStorage.setItem('todo', JSON.stringify(newTodo))
    setTodoList(newTodo)
  }

  return (
    <div className={`todo__card${todo.isDone ? ' done' : ''}`}>
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
      <div className='todo__btn-container'>
        <button className='btn' onClick={handleEdit}>
          Edit
        </button>
        <button className='btn' onClick={() => handleDelete(todo.id)}>
          Delete
        </button>
        <button className='btn' onClick={() => handleDone(todo.id)}>
          {todo.isDone ? 'Undone' : 'Done'}
        </button>
      </div>
    </div>
  )
}

export default SingleTodo
