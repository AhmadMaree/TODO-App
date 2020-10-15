import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as action from '../../../store/actions/index'
import * as routePath from '../../../Shared/Constants/constantRouter';

class Logout extends Component {

    componentDidMount () {
        this.props.onLogout()
    }

    render () {
        return <Redirect to={routePath.AUTHENTICAT_PATH} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(action.logOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout);