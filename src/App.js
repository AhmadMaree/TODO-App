import React, { Component } from 'react';
import { Route ,Switch } from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import Todo from './components/Todo/Todo';
import ChartTodo from './components/ChartTodo/ChartTodo';
import * as routeConst from './Shared/Constants/constantRouter';


class App extends Component {
     render() {
        return (
          <div>
            <Layout>
              <Switch>
              <Route path={routeConst.CHARTS_PATH} component={ChartTodo}/>
              <Route path={routeConst.ROOT_PATH} component={Todo}/>
              </Switch>
            </Layout>
          </div>

        )
     }
}
export default App;
