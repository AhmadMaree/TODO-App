import * as actionType from './actionsType'
import axios from '../../axios-ListData';


export const chartSuccess= (todoData) =>{
    return {
        type : actionType.CHART_FETCH_DATA_SUCCESS,
        todoData : todoData
    }
}

export const chartStart= () =>{
    return{
        type : actionType.CHART_START
    }
}
export const chartFail= (error) =>{
    return {
        type : actionType.CHART_FETCH_DATA_FAILER,
        error : error
    }
}

export const fetchChartData = () => {
    return dispatch => {
        dispatch(chartStart())
    axios.get('/ListTodo.json')
         .then(response => {
                const todoData = Object.values(Object.keys(response.data).map((item) => {
                    return {...response.data[item],id : item}  
                }).reduce((item ,{Date}) =>{
                    item[Date] = item[Date] || {Date,count: 0};
                    item[Date].count++;
                    return item;
                },{}))
               dispatch(chartSuccess(todoData))
        }).catch(err=>{
               dispatch(chartFail(err))
        })
    }
}