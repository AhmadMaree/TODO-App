import * as actionType from '../actions/actionsType';
import {updateObject} from '../../Shared/utility'


const initialState = {
    todoList : [],
    error : false,
}

const addTodoSucess = (state,action) => {
   const updateData= updateObject(action.todoData,{id:action.id});
   return updateObject(state,{ todoList:state.todoList.concat(updateData)})
}
const fetchTodoSuccsse = (state,action) => {
    return updateObject(state,{
       todoList: action.todoData
    })
}
const removeTodoSuccsse = (state,action) => {
    return updateObject(state,{
       todoList: state.todoList.filter(item => action.index !== item.id)
    })
}
const checkedTodoSuccsse = (state,action) => {
   const updateList= state.todoList.filter(item => item.id !== action.index)
    return updateObject(state,{todoList: updateList.concat(action.itemData)})
}
const errorMessage = (state, action) => {
    return updateObject(state,{error:action.error})
}
const todoReducer = (state=initialState , action) => {
    switch(action.type) {
        case actionType.ADD_TODO_SUCCESS : return addTodoSucess(state,action)
        case actionType.FETCH_TODO_SUCCESS : return fetchTodoSuccsse(state,action)
        case actionType.REMOVE_TODO_SUCCESS : return removeTodoSuccsse(state,action)
        case actionType.CHECKED_TODO_SUCCESS : return checkedTodoSuccsse(state,action)
        case actionType.MESSAGE_TODO_FAILER : return   errorMessage(state,action)
        default :
                return state;
    }
}
export default todoReducer;