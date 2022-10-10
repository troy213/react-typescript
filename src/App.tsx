import React, { useState } from 'react'
import { InputField, TodoList } from './components'
import { Todo } from './model'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

  return (
    <div className='App'>
      <h1>To Do List</h1>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  )
}

export default App
