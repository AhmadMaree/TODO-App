import React, { Component } from 'react';

import classes from './Layout.module.css'
import AppBar from '../../components/Navigation/AppBar/AppBar';
class Layout extends Component {
    
    
    render() {
        return( 
        
        <React.Fragment>
            <AppBar   />
            <main className={classes.Layout}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}

export default Layout;