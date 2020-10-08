import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title
  } from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import classes from './ChartTodo.module.css';
import axios from '../../axios-ListData';



class ChartTodo extends Component {


    state= {
        todoList : [],

    }

    componentDidMount () {
        axios.get('/ListTodo.json')
             .then(response => {
                let updateTodoData = [] ;
                let todoData = Object.keys(response.data).map(item => {
                    return {...response.data[item]  ,id : item}  })
                    for( let key in todoData) {
                        updateTodoData.push(todoData[key])
                    }
                    const res = Object.values(updateTodoData.reduce((item, {Date}) => {
                        item[Date] = item[Date] || {Date, count: 0};
                        item[Date].count++;
                        return item;
                      }, Object.create(null)));

                      console.log(res)
                this.setState({
                    todoList : res ,
                })
             }).catch(err=>{
                 console.log(err)
             })
    }

  

    render(){
      
            return (
                <div className={classes.ChartTodo}>
                    <Paper className={classes.Paper} elevation={2}>
                           <Chart data={this.state.todoList}>
                                <ArgumentScale factory={scaleBand} />
                                <ArgumentAxis />
                                <ValueAxis />
                                <Title text="Number of Task in each Date" />
                                <BarSeries 
                                           valueField ="count"
                                           argumentField="Date"
                                           name="Count"
                                            />
                                <Stack /> 
                           </Chart>
                    </Paper>
                </div>
            )
    }
}

export default ChartTodo;