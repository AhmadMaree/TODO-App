import {createStore , applyMiddleware , compose ,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/Todo'
import chartTodoReducer from './reducers/ChartTodo'

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
  todo : todoReducer ,
  chart : chartTodoReducer,
}) ;

const store = createStore(rootReducers , composeEnhancers(
    applyMiddleware(thunk)
  ));   
export default store;