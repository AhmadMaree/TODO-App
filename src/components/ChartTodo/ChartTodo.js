import React, { Component } from 'react';
import {connect} from "react-redux"
import { Paper } from '@material-ui/core';
import {BarChart,CartesianGrid ,XAxis,YAxis,Bar , ResponsiveContainer  , Tooltip, Text} from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './ChartTodo.module.css';
import axios from '../../axios-ListData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class ChartTodo extends Component {


    componentDidMount () {
     this.props.onFetchChartData();  
    }
    render(){

        let chart = <CircularProgress className={classes.Loading} />
        if(!this.props.loading) {
            if(this.props.error) {
            chart = <p style={{textAlign : 'center',fontSize :30}}>{this.props.error.message}</p>
            }else {
            chart = (<ResponsiveContainer width="100%" height={600}>
                            <BarChart
                                    style={{ margin: "0 auto" }}
                                     data={this.props.todoList}  >
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
            )
          }
        }
      
            return (
                <div className={classes.ChartTodo}>
                    <Paper className={classes.Paper} elevation={2}>
                      <p textAnchor="middle" className={classes.Text} >NO. Of Task</p>
                        {chart}
                    </Paper>
                </div>
                )
    }
}

const mapStateToProps = state => {
    return{
        todoList : state.chart.todoList ,
        error : state.chart.error ,
        loading : state.chart.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchChartData : () => dispatch(actions.fetchChartData())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ChartTodo , axios ));