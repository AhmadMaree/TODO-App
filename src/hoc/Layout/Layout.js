import React, { Component } from 'react';

import classes from './Layout.module.css'
import AppBar from '../../components/Navigation/AppBar/AppBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component {

    state ={
        showSideDrawer : false,     
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState) => {
          return  {showSideDrawer : !prevState.showSideDrawer} ;
        } )
    }

    showSideCloseDrawerHandler = () => {
        this.setState({
            showSideDrawer : false
        })
    }
    
    render() {
        return( 
        
        <React.Fragment>
            <AppBar toggleDrawer={this.sideDrawerToggleHandler}  />
            <SideDrawer show ={this.state.showSideDrawer} closed ={this.showSideCloseDrawerHandler}/>
            <main className={classes.Layout}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}

export default Layout;