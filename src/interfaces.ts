export interface TodoFormPropTypes {
  addUpdateItemToList: Function,
  currentItem: TodoItem
}


export interface TodoItem {
  id: number,
  item: string,
  isCompleted: boolean
}