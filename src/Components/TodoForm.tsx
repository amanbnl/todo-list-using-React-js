import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TodoFormPropTypes } from '../interfaces';

function TodoForm(props:TodoFormPropTypes) {
  const { addUpdateItemToList, currentItem } = props;
  const [ input, setInput ] = useState<string>('')
  const [ invalidInputFlag, setInvalidInputFlag ] = useState<boolean>(false)

  useEffect(() => {
    if (currentItem?.id) {
      setInput(currentItem.item)
    }else {
      setInput("")
    }
  },[currentItem])

  /**
   * function to handle the change in input 
   * @param e 
   */
  const handleOnInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (currentItem?.id) {
      currentItem.item = e.target.value
      setInput(e.target.value)
    } else {
      setInput(e.target.value)
    }
  }

  /**
   * function to handle the submit event in case of Add/update
   * @param e 
   */
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.length === 0) {
      setInvalidInputFlag(true)
      setTimeout(() => {
        setInvalidInputFlag(false)
      },500)
    }else {
      setInvalidInputFlag(false)
      addUpdateItemToList(input)
      setInput('')
    }
  }

  return (
    <form className="todo-form" onSubmit={(e) => handleOnSubmit(e)}>
      <input type="text" value={currentItem ? currentItem?.item : input} onChange={(e) => handleOnInputChange(e)} className={`todo-input ${invalidInputFlag ? 'invalid-input' : ''}`} placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>{currentItem?.id ? 'Update Task' : 'Add Task'}</button>
    </form>
  )
}

export default TodoForm