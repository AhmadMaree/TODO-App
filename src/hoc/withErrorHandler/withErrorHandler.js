import React, { Component } from 'react'




const withErrorHandler = (WrappedComponent , axios) => {

    return class ErrorHandling extends Component {

        constructor(props) {
            super(props);
            this.state ={
                error: null,
            };
          this.reqInterceptor =  axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
              });

           this.resInterceptor = axios.interceptors.response.use((res)=> res , err =>{
                this.setState({
                    error : err
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        errorConfirmedHandler =() =>{
            this.setState({
                error : null
            })
        }
        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }




}

export default withErrorHandler;