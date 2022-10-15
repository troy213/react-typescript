import React from 'react'
import './index.scss'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: React.FormEvent) => void
}

const validation = (maxLength: number) => {
  const expression = '^[a-zA-Z0-9!& ]{0,' + maxLength + '}$'
  const regex = new RegExp(expression)
  return regex
}

const InputField: React.FC<Props> = (props: Props) => {
  const { todo, setTodo, handleSubmit } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (validation(255).test(e.target.value)) {
      setTodo(e.target.value)
    }
  }

  return (
    <form className='input' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter a task'
        className='input__box'
        value={todo}
        onChange={handleChange}
      />
      <button className='btn btn__submit' type='submit'>
        Go
      </button>
    </form>
  )
}

export default InputField
