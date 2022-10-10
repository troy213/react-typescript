import React from 'react'
import './index.scss'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = (props: Props) => {
  const { todo, setTodo, handleSubmit } = props

  return (
    <form className='input' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter a task'
        className='input__box'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='btn btn__submit' type='submit'>
        Go
      </button>
    </form>
  )
}

export default InputField
