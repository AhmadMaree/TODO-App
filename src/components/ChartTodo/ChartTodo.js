import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import {BarChart,CartesianGrid ,XAxis,YAxis,Bar , ResponsiveContainer  , Tooltip, Text} from 'recharts'
import classes from './ChartTodo.module.css';
import axios from '../../axios-ListData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class ChartTodo extends Component {


    state = {
        todoList : [],

    }

    componentDidMount () {
        axios.get('/ListTodo.json')
             .then(response => {
                let todoData = Object.values(Object.keys(response.data).map((item) => {
                    return {...response.data[item],id : item}  
                }).reduce((item ,{Date}) =>{
                    item[Date] = item[Date] || {Date,count: 0};
                    item[Date].count++;
                    return item;
                },{}))
                this.setState({
                    todoList : todoData ,
                })
             }).catch(err=>{
                //error Massage
             })
    }

  

    render(){
      
            return (
                <div className={classes.ChartTodo}>
                    <Paper className={classes.Paper} elevation={2}>
                      <Text textAnchor="middle" className={classes.Text} >NO. Of Task</Text>
                        <ResponsiveContainer width="100%" height={600}>
                            <BarChart
                                    style={{ margin: "0 auto" }}
                                     data={this.state.todoList}  >
                            <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="Date" tickSize={5} height={100} interval={0} tick={props => {
                                    return (
                                        <g transform={`translate(${props.x},${props.y})`}>
                                        <Text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{props.payload.value}
                                        </Text>
                                      </g>
                                    );
                             }}/>
                             <YAxis/>
                             <Tooltip />
                             <Bar dataKey="count" fill="#8884d8" />
                           </BarChart>
                        </ResponsiveContainer>   
                    </Paper>
                </div>
            )
    }
}

export default withErrorHandler(ChartTodo , axios );