import React, { useState, useEffect } from 'react'
import { InputField, TodoList } from './components'
import { Todo } from './model'
import './App.scss'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    let add
    let active = todoList

    if (source.droppableId === 'todoList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = active[source.index]
    }

    if (destination.droppableId === 'todoList') {
      active.splice(destination.index, 0, add)
    }

    setTodoList(active)
    localStorage.setItem('todo', JSON.stringify(active))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <h1>To Do List</h1>
        <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </DragDropContext>
  )
}

export default App
