import React from 'react'
import { Todo } from '../../model'
import SingleTodo from './SingleTodo'
import './index.scss'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  todoList: Todo[]
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = (props: Props) => {
  const { todoList, setTodoList } = props
  return (
    <div className='todolist__container'>
      <Droppable droppableId='todoList'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todoList.map((value, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={value}
                  key={value.id}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
