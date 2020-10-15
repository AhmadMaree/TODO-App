import React, { Component } from 'react';
import classes from './Auth.module.css';
import { Paper ,Button } from '@material-ui/core';
import * as Yup from "yup";
import { Formik } from 'formik';
import Form from './Form/Form';
import * as action from '../../store/actions/index'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import * as routerPath from '../../Shared/Constants/constantRouter';

class Auth extends Component {

    state ={ 
         isSignup : true 
    }

    componentDidMount () {
        if(this.props.redirectPath !== routerPath.ROOT_PATH) {
            this.props.onSetAuthRedirectPath()
        }
    }

    onSwitchSingHandler = () => {
        this.setState(prevState => {
            return {isSignup :!prevState.isSignup}
        })
    }

    render() {



        let form = ( 
       <Paper elevation={1} className={classes.Paper} >
          <Formik
                initialValues= {{email :'' ,password :''}}  
                onSubmit= {({email , password}) =>{
                    this.props.onAuth(email,password,this.state.isSignup)
                }} 
                validationSchema ={Yup.object({
                    email : Yup.string("Enter your Email")
                            .email("Enter Vaild Email")
                            .required("Email is Requird"),
                    password: Yup.string("")
                            .min(8, "Password must contain at least 8 characters")
                            .required("Enter your password"),
                })}
            >
                            {props => <Form {...props}/>}
            </Formik>
            <Button  onClick ={this.onSwitchSingHandler}>
                      Switch to {this.state.isSignup ? "SignIn" : 'SignUp'}
            </Button>
        </Paper>
       );

        if (this.props.loading) {
            form = <CircularProgress />
        }
        let errorMassage = null 
        if(this.props.error) {
        errorMassage = <p style={{color :'red'}}>{this.props.error.message}</p>
        }
        let RedirctSucssefulSign = null 
        if(this.props.isAuthenticated) {
            RedirctSucssefulSign = <Redirect to={this.props.redirectPath}/>
        }
        return (
        <div className={classes.Auth}>
                        {RedirctSucssefulSign}
                        {errorMassage}
                        {form}
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        error : state.auth.error,
        loading : state.auth.loading,
        isAuthenticated : state.auth.idToken !== null , 
        redirectPath : state.auth.redirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password,isSignup) => dispatch(action.auth(email,password,isSignup)),
        onSetAuthRedirectPath : () => dispatch(action.setRedirctPath(routerPath.ROOT_PATH))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);