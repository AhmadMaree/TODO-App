import React from 'react'; 
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = (props) => {

    return (
            <ul className= {classes.NavigationItems}> 
                  <NavigationItem Link="/"  excat >Add To Do</NavigationItem>
                  <NavigationItem Link="/Charts"  excat >Charts</NavigationItem>
                  <NavigationItem Link="/Auth"  excat >Autenticate</NavigationItem>
            </ul>
    );
}
export default navigationItems;