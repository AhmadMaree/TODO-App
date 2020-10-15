import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';



const withErrorHandler = (WrappedComponent , axios) => {

    return class ErrorHandling extends Component {

        constructor(props) {
            super(props);
            this.state = {
              error: null,
              open : false,
            };
           
          }
          componentDidMount () {
            this.reqInterceptor= axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
              });
            this.resInterceptor= axios.interceptors.response.use(res => res,error => {
                 console.log(error)
                  this.setState({ error: error , open : true });
                });
          }
           
     
         componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler =() =>{
            this.setState({
                error : null,
                open : false ,
            })
        }
        render() {
            return (
                <React.Fragment>
                     <Modal
                            show ={this.state.error}
                             open={this.state.open}
                             onClose={this.errorConfirmedHandler}>
                                 {this.state.error ? this.state.error.message : null}
                     </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }
}
export default withErrorHandler;