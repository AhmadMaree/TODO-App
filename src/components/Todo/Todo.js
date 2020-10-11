import React, { Component } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'
import {connect} from 'react-redux';

import classes from './Todo.module.css';
import axios from '../../axios-ListData';
import ListTodo from './ListTodo/ListTodo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as routsPath from '../../Shared/Constants/constantRouter'
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
class Todo extends Component {

    state = {
       value : '' ,
    }

    componentDidMount () {
      this.props.onFetchTodo();
    }

    handleChange = (event) => {
       this.setState({
             value : event.target.value,
       })

    }
    onAddTodoHandler = (event , inputValue) => {
      event.preventDefault();
      const todoData = {
        name : inputValue.trim() ,
        Date : new Date().toDateString(),
        checked : false ,
      }
      this.props.onAddTodo(todoData)
    }
    render() {
      let redirectWhenFails= null
      if(this.props.error) {
        redirectWhenFails= <Redirect to = {routsPath.ROOT_PATH}  />
      }
      let todoListData = (
          <p style={{alignItems:'center',color:'#6200EE'}}>Let's Add SOME TO-DO</p>
      )
      if(this.props.todoList != null) {
        todoListData = (
            <List className={classes.List}>
                        {this.props.todoList.map((itemTodo) => (

                              <ListTodo key ={itemTodo.id} 
                                        checked={itemTodo.checked}
                                        todoText={itemTodo.name}
                                        clickToRemove={()=>this.props.onRemoveTodo(itemTodo.id)}
                                        checkBtn ={()=> this.props.onCheckBtnHandler(itemTodo)}/>
                        ))}
            </List> 
           )
      }
      return(  
          <div className={classes.Todo}>
                 {redirectWhenFails}
                <form className={classes.form}  noValidate autoComplete="off"  onSubmit={(event) =>this.onAddTodoHandler(event,this.state.value)}>
                <TextField 
                        className={classes.TextField}
                        id="outlined-full-width"
                        label="Todo"
                        multiline
                        rowsMax={4}
                        size ="medium"
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                  <Button
                  className={classes.button}
                   variant="contained"
                   color="primary"
                   size="large"
                    type="submit"
                   >
                    ADD
                  </Button>
                </form>
                {todoListData}
          </div>
     
       );      
    }
}

const mapStateToProps = state => {
    return {
      todoList:state.todo.todoList,
      error: state.todo.error
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo : (orderData) => dispatch(actions.addTodo(orderData)) ,
    onFetchTodo: () => dispatch(actions.fetchTodo()),
    onRemoveTodo : (index) => dispatch(actions.removeTodo(index)),
    onCheckBtnHandler : (itemData) => dispatch(actions.checkedTodo(itemData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Todo,axios));