import * as actionType from './actionsType'
import axios from '../../axios-ListData';

export const addTodoSuccess = (todoData, id) => {
    return {
        type : actionType.ADD_TODO_SUCCESS,
        id: id,
        todoData: todoData,
    }
}
export const removeTodoSuccess = (index) => {
    return {
        type : actionType.REMOVE_TODO_SUCCESS,
        index : index ,
    }
}
export const MessageFail = error => {
    return {
        type : actionType.MESSAGE_TODO_FAILER,
        error : error
    }
}

export const fetchTodoSuccsse = (todoData) => {
    return {
        type : actionType.FETCH_TODO_SUCCESS,
        todoData : todoData
    }
}
export const fetchTodoFailer = () => {
    return {
        type : actionType.FETCH_TODO_FAILER,
    }
}

export const addTodo = (todoData,token) => {

    return dispatch => {
        axios.post("/ListTodo.json?auth="+token , todoData)
        .then(response => {
          dispatch(addTodoSuccess(todoData,response.data.name))
        }).catch(err => {
          dispatch(MessageFail(err))
        })
    }

}
export const removeTodo = (index,token) => {
    return dispatch => {
        
        axios.delete(`/ListTodo/${index}.json?auth=`+token)
        .then(() => {
            dispatch(removeTodoSuccess(index))
        }).catch(err=>{
            dispatch(MessageFail(err))
        })
    }
}

export const fetchTodo = (token,userId) =>{
    return dispatch => {
        const quaryParams ='?auth='+token+'&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/ListTodo.json'+quaryParams)
        .then(response => {
          let todoData = Object.keys(response.data).map(item => {
            return {...response.data[item]  ,id : item}  })
            .filter(item => item.Date === new Date().toDateString())
           dispatch(fetchTodoSuccsse(todoData))
        }).catch(err => {
            dispatch(fetchTodoFailer(err))
        })
    }
}

export const checkedTodoSuccess = (updateChecked,index) => {
    return {
        type: actionType.CHECKED_TODO_SUCCESS,
        itemData:updateChecked,
        index:index
    }

}
export const checkedTodo = (item,token) =>{
    return dispatch => {
        const updateChecked = {
            ...item,
            checked : !item.checked
        }
        axios.put(`/ListTodo/${item.id}.json?auth=`+token,updateChecked)
        .then(res => {
          dispatch(checkedTodoSuccess(res.data,item.id))
        }).catch(err => {
          dispatch(MessageFail(err))
        })
    }
}