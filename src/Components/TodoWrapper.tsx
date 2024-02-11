import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../interfaces'

function TodoWrapper () {
  const [listItems, setListItems] = useState<TodoItem[]>(JSON.parse(localStorage.getItem("TODO_LIST_ITEMS")) || [])
  const [currentItem, setCurrentItem] = useState<TodoItem>(null)

  useEffect(()=> {
    localStorage.setItem("TODO_LIST_ITEMS",JSON.stringify(listItems))
  }, [listItems])

  /**
   * function to Add/Update item in the list
   * @param item 
   */
  const addUpdateItemToList = (item:string) => {
    if (currentItem?.id) {
      const index:number = listItems.findIndex(item => item.id === currentItem.id)
      if (index > -1) {
        listItems[index].item = item
        setListItems(listItems)
        setCurrentItem(null)
      }
    } else {
      const listItem:TodoItem = {
        id: listItems.length + 1,
        item,
        isCompleted: false
      }
      setListItems([...listItems, listItem])
    }
  }

  /**
   * function to Delete the item from list
   * @param todoItem 
   */
  const handleDeleteClick = (todoItem: TodoItem) => {
    const confirmation:boolean = window.confirm("Are you sure you want to delete this Item")
    if (confirmation) {
      const updatedItems:TodoItem[] = listItems.filter(item => item.id !== todoItem.id)
      setListItems(updatedItems)
      setCurrentItem(null)
    }
  }

  /**
   * function to handle the event of Edit an item
   * @param todoItem 
   */
  const handleEditClick = (todoItem:TodoItem) => {
    setCurrentItem(todoItem)
  }

  /**
   * function to mark item as completed/uncompleted
   * @param event 
   * @param todo 
   */
  const markItemAsCompleted = (event, todo: TodoItem) => {
    if (event.target.classList.contains('todo-item') || event.target.classList.contains('completed') || event.target.classList.contains('un-completed')) {
      const userConsent = window.confirm(`Are you sure you want to Mark this item as ${todo.isCompleted ?"Un Completed" : "Completed"} ?`)
      if (userConsent) {
        todo.isCompleted = !todo.isCompleted
        setListItems([...listItems.filter(item => item.id !== todo.id), todo])
      }
    }
  }
  
  return (
    <div className="todo-wrapper">
      <h1>Add your Tasks</h1>
      <TodoForm addUpdateItemToList={addUpdateItemToList} currentItem={currentItem} />
      {listItems.sort().map((todo, index) =>
      (
        <div onClick={e => markItemAsCompleted(e, todo)} className="todo-item" key={index}>
          <p className={`${todo.isCompleted ? 'completed' : "un-completed"}`} >{todo.item}</p>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={e => handleEditClick(todo)} />
            <FontAwesomeIcon onClick={(e) => handleDeleteClick(todo)} icon={faTrash} />
          </div>
        </div>
      )
      )}
    </div>
  );
}

export default TodoWrapper