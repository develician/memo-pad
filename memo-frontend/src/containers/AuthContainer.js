import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthForm from 'components/auth/AuthForm/AuthForm';
import AuthWrapper from 'components/auth/AuthWrapper/AuthWrapper';
import { changeInput, 
        initializeAuthInputs,
        loginRequest } from 'store/actions/auth';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';


class AuthContainer extends Component {


    handleChangeInput = ({name, value}) => {
        const { changeInput } = this.props;
        changeInput({name, value});
    }

    initializeAuthInputs = () => {
        const { initializeAuthInputs } = this.props;
        initializeAuthInputs();
    }

    componentDidMount() {
        this.initializeAuthInputs();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.version !== this.props.version) {
            this.initializeAuthInputs();
        }
    }

    handleLogin = async () => {
        const { loginRequest, email, password, history } = this.props;
        try {
            await loginRequest({email, password});
            if(this.props.loginRequestSuccess) {
                storage.set('loggedInfo', email);
                history.push("/");
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleKeydown = (e) => {
        if(e.key === "Enter") {
            this.handleLogin();
        }
    }

    

    render() {
        const { email, password, passwordCheck, loginRequestStatus, error } = this.props;
        const { handleChangeInput, handleLogin, handleKeydown } = this;
        return (
            <AuthWrapper>
                <AuthForm 
                    onChangeInput={handleChangeInput}
                    email={email}
                    password={password}
                    passwordCheck={passwordCheck}
                    onLogin={handleLogin}
                    theme={loginRequestStatus === 'WAITING' && 'disabled'} 
                    onKeydown={handleKeydown}
                    error={error}
                    status={loginRequestStatus}/>
            </AuthWrapper>
        )
    }
}
export default connect(
    (state) => ({
        email: state.auth.get('email'),
        password: state.auth.get('password'),
        passwordCheck: state.auth.get('passwordCheck'),
        loginRequestStatus: state.auth.getIn(['login', 'status']),
        loginRequestSuccess: state.auth.getIn(['login', 'success']),
        error: state.auth.getIn(['login', 'error'])
    }),
    (dispatch) => ({
        changeInput: ({name, value}) => {
            return dispatch(changeInput({name, value}));
        },
        initializeAuthInputs: () => {
            return dispatch(initializeAuthInputs());
        },
        loginRequest: ({email, password}) => {
            return dispatch(loginRequest({email, password}));
        }
    })
)(withRouter(AuthContainer));