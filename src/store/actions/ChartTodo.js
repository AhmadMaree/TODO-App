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

export const fetchChartData = (userId,token) => {
    return dispatch => {
        dispatch(chartStart())
        const quaryParams = '?auth='+token+'&orderBy="userId"&equalTo="' + userId + '"';
     axios.get('/ListTodo.json'+quaryParams)
         .then(response => {
                const todoData = Object.entries(response.data).reduce((item ,[key,value]) =>{
                    item[value.Date] =  item[value.Date]|| {Date:value.Date,count: 0};
                    item[value.Date].count++;
                    return item;
                },[])
               dispatch(chartSuccess(todoData))
        }).catch(err=>{
               dispatch(chartFail(err))
        })
    }
}