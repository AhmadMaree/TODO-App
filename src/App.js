import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import Todo from './components/Todo/Todo'

class App extends Component {
     render() {
        return (
          <div>
            <Layout>
              <Route path="/" component={Todo}/>
            </Layout>
          </div>

        )
     }
}


export default App;
