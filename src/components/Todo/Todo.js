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
       error : false,
    }

    componentDidMount () {
      this.props.onFetchTodo(this.props.token,this.props.userid);
    }

    handleChange = (event) => {
       this.setState({
             value : event.target.value,
             error:false,
       })

    }
    onAddTodoHandler = (event , inputValue) => {
      event.preventDefault();
      if(inputValue.trim() === ''){
        this.setState({
          error:true
        })
      }else{
        const todoData = {
          name : inputValue.trim() ,
          Date : new Date().toDateString(),
          checked : false ,
          userId : this.props.userid,
        }
        this.props.onAddTodo(todoData,this.props.token)
        this.setState({
          value :'',
          error : false,
        })
      }
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
                                        clickToRemove={()=>this.props.onRemoveTodo(itemTodo.id,this.props.token)}
                                        checkBtn ={()=> this.props.onCheckBtnHandler(itemTodo,this.props.token)}/>
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
                        fullWidth
                        rowsMax={4}
                        size ="medium"
                        error={this.state.error}
                        helperText={this.state.error ?"Must fill the contant":""}
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                  <Button
                      type="submit"
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      size="large"
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
      error: state.todo.error,
      userid:state.auth.userId,
      token : state.auth.idToken,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo : (orderData,token) => dispatch(actions.addTodo(orderData,token)) ,
    onFetchTodo: (token,userid) => dispatch(actions.fetchTodo(token,userid)),
    onRemoveTodo : (index,token) => dispatch(actions.removeTodo(index,token)),
    onCheckBtnHandler : (itemData,token) => dispatch(actions.checkedTodo(itemData,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Todo,axios));