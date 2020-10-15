import React , {Component} from 'react';
import classes from './Modal.module.css';

import Modal from '@material-ui/core/Modal';

class  ModalUI extends Component {

    shouldComponentUpdate(nextProps) {
        
        return (
            nextProps.open !== this.props.open || nextProps.children !== this.props.children
        );
       
    }


    render(){
        return(
            <Modal
            open={this.props.open}
            onClose={this.props.onClose}
          >
           <div className={classes.Modal}  
                    style ={{
                        transform :this.props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
                        opacity :this.props.show ? '1' : '0' ,
                    }}  
                > 
                       <p>{this.props.children}</p> 
                </div>
           
          </Modal>
           
        );
    }
}                                                                                                               
export default ModalUI ;