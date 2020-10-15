import React, { Component } from 'react';
import { Redirect, Route , Switch ,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import * as routeConst from './Shared/Constants/constantRouter';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Logout from './components/Authenticate/Logout/Logout';
import { CircularProgress } from '@material-ui/core';


const asyncAuth = React.lazy(() =>
  import ('./components/Authenticate/Auth')
);
const asyncTodo = React.lazy(() =>
  import ('./components/Todo/Todo')
);
const asyncChartTodo = React.lazy(() =>
  import ('./components/ChartTodo/ChartTodo')
);


class App extends Component {

    componentDidMount(){
      this.props.onAuthSuccess()
    }


     render() {
       
      let routes = (
        <Switch>
            <Route path={routeConst.AUTHENTICAT_PATH} exact component={asyncAuth}/>
            <Redirect to={routeConst.AUTHENTICAT_PATH} />
        </Switch>
      );

      if(this.props.isAuthenticated) {
         routes = (
          <Switch>
          <Route path={routeConst.CHARTS_PATH} component={asyncChartTodo}/>
          <Route path={routeConst.LOGOUT_PATH} component={Logout}/>
          <Route path={routeConst.ROOT_PATH} exact component={asyncTodo}/>
          <Redirect to={routeConst.ROOT_PATH} />
          </Switch>
         )
      }
        return (
            <React.Suspense fallback={<CircularProgress />} >
                <Layout>
                  {routes}
                </Layout>
            </React.Suspense>
        )
     }
}
const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuthSuccess : () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));