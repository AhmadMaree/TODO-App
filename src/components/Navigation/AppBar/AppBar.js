import React from 'react' ;
import {AppBar , Toolbar , Typography } from '@material-ui/core'

import classes from './AppBar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems';
const appBar = (props) => {

    return (
        <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
            <Typography variant="h4">
                   TodoApp
            </Typography>
            <nav className ={classes.DesktopOnly}>
                    <NavigationItems />
            </nav>
        </Toolbar>
       </AppBar>
    )

}

export default appBar;