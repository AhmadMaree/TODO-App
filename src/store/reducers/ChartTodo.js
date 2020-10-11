import * as actionType from '../actions/actionsType';
import {updateObject} from '../../Shared/utility'

const initialState = {
    todoList : [],
    error : null,
    loading :false,
}

const chartStart = (state,action) => {
   return updateObject(state,{ loading : true })
}
const chartSucess = (state,action) => {
    return updateObject(state,{todoList:action.todoData , loading : false})
}
const chartFail = (state,action) => {
    return updateObject(state,{loading : false , error : action.error})
}
const chartTodoReducer = (state=initialState , action) => {
    switch(action.type) {
        case actionType.CHART_START : return chartStart(state,action)
        case actionType.CHART_FETCH_DATA_SUCCESS : return chartSucess(state,action)
        case actionType.CHART_FETCH_DATA_FAILER : return chartFail(state,action)
        default :
                return state;
    }
}
export default chartTodoReducer;