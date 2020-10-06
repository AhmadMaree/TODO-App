import React, { Component } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'
import classes from './Todo.module.css';

import ListTodo from './ListTodo/ListTodo'

class Todo extends Component {

    state = {
        value : '' ,
        ListTodo : {
          list1: {  
            todoText : 'ahmad', 
            checked : true ,
          }
        }
    }

    handleChange = (event) => {
       event.preventDefault();
      
       this.setState({
             value : event.target.value,
       })
    }

    

    render() {

      let formElementsArray = [];
      for (let key in this.state.ListTodo) {
          formElementsArray.push({
              id : key ,
              todoData : this.state.ListTodo[key]
          })
      }
       const todoListData = (
            <List>
                        {formElementsArray.map(itemTodo => (

                              <ListTodo key ={itemTodo.id} 
                                        checked={itemTodo.todoData.checked}
                                        todoText={itemTodo.todoData.todoText}/>
                        ))}
            </List> 
           )
           console.log(todoListData)
      return(  
          <div className={classes.Todo}>
                <form  noValidate autoComplete="off" >
                <TextField
                        id="standard-multiline-flexible"
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