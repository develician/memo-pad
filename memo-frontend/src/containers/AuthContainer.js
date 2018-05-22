import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthForm from 'components/auth/AuthForm/AuthForm';
import AuthWrapper from 'components/auth/AuthWrapper/AuthWrapper';
// // import * as MyActionModule from 'store/modules/MyActionModule';

class AuthContainer extends Component {
    render() {
        return (
            <AuthWrapper>
                <AuthForm />
            </AuthWrapper>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(AuthContainer);