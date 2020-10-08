import React, { Component } from 'react';
import { Route ,Switch } from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import Todo from './components/Todo/Todo';
import ChartTodo from './components/ChartTodo/ChartTodo';


class App extends Component {
     render() {
        return (
          <div>
            <Layout>
              <Switch>
              <Route path="/chart" component={ChartTodo}/>
              <Route path="/" component={Todo}/>
              </Switch>
            </Layout>
          </div>

        )
     }
}


export default App;
