import React, { useState, useEffect } from 'react'
import { InputField, TodoList } from './components'
import { Todo } from './model'
import './App.scss'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      const newTodo = [...todoList, { id: Date.now(), todo, isDone: false }]
      localStorage.setItem('todo', JSON.stringify(newTodo))
      setTodoList(newTodo)
      setTodo('')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('todo')) {
      setTodoList(JSON.parse(localStorage.getItem('todo') || ''))
    }
  }, [])

  return (
    <div className='App'>
      <h1>To Do List</h1>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  )
}

export default App
