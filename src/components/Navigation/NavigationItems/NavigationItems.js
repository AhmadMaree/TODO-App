import React from 'react'; 
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = (props) => {

    return (
            <ul className= {classes.NavigationItems}> 
                  <NavigationItem Link="/" exact >Add To Do</NavigationItem>
                  <NavigationItem Link="/chart" >Charts</NavigationItem>
                  <NavigationItem Link="/Auth" >Autenticate</NavigationItem>
            </ul>
    );
}
export default navigationItems;