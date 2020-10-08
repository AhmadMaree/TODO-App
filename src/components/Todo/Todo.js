import React, { Component } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'
import classes from './Todo.module.css';
import axios from '../../axios-ListData';

import ListTodo from './ListTodo/ListTodo'

class Todo extends Component {

    state = {
       todoList : [] ,
       value : '' ,
       id : '',
       checked : false,
       
    }

    componentDidMount () {
      axios.get('/ListTodo.json')
            .then(response => {    
              let updateTodoData = [] ;
              let todoData = Object.keys(response.data).map(item => {
                return {...response.data[item]  ,id : item}  })
               for( let key in todoData) {
                  if(todoData[key].Date === new Date().toDateString()){
                         console.log(todoData[key].Date)
                         updateTodoData.push(todoData[key])
                  }

                }
                  console.log(updateTodoData)
              this.setState({
                  todoList : updateTodoData
              })
            }).catch(err => {
              console.log(err)
            })
    }


    handleChange = (event) => {
       this.setState({
             value : event.target.value,
       })

    }

    onAddTodoHandler = (event , inputValue) => {
      event.preventDefault();
      const newArr = [...this.state.todoList];
      const todoData = {
        name : inputValue ,
        Date : new Date().toDateString(),
        checked : false ,
      }
      axios.post("/ListTodo.json" , todoData)
            .then(response => {
              newArr.push({...todoData ,id:response.data.name})
              this.setState({
                todoList : newArr ,
                value : ''
              })
            }).catch(err => {
              console.log(err)
            })
    }
    onRemoveTodoTasks = index => {
        axios.delete(`/ListTodo/${index}.json`)
              .then(res => {
                this.setState( previousState => {
                  return {
                    todoList : previousState.todoList.filter(item => item.id !== index)
                  };
                });
              }).catch(err=>{
                console.log(err);
              })
       
    }

    onCheckBtnHandler = (index , item) => {
      const updateChecked = {
          ...item,
          checked : !item.checked
      }
      axios.put(`/ListTodo/${item.id}.json`,updateChecked)
             .then(res => {
               let newArr = [...this.state.todoList.filter(item => index !== item.id)];
               newArr.push({...updateChecked})
               this.setState({
                  todoList : newArr,
                })
             }).catch(err => {

             })

    }

    render() {


      let todoListData = (
          <p style={{alignItems:'center',color:'#6200EE'}}>Let's Add SOME TO-DO</p>
      )
      if(this.state.todoList != null) {
        todoListData = (
            <List className={classes.List}>
                        {this.state.todoList.map((itemTodo) => (

                              <ListTodo key ={itemTodo.id} 
                                        checked={itemTodo.checked}
                                        todoText={itemTodo.name}
                                        clickToRemove={()=>this.onRemoveTodoTasks(itemTodo.id)}
                                        checkBtn ={()=> this.onCheckBtnHandler(itemTodo.id,itemTodo)}/>
                        ))}
            </List> 
           )
      }
      return(  
          <div className={classes.Todo}>
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

export default Todo;