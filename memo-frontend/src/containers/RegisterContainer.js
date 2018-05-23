import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as MyActionModule from 'store/modules/MyActionModule';
import AuthWrapper from 'components/auth/AuthWrapper/AuthWrapper';
import { changeInput, 
        initializeAuthInputs,
        registerRequest } from 'store/actions/auth';
import RegisterForm from 'components/auth/RegisterForm/RegisterForm';
import { withRouter } from 'react-router-dom';

class RegisterContainer extends Component {
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

    handleRegister = async () => {
        const { registerRequest, email, password, passwordCheck, history } = this.props;
        try {
            await registerRequest({email, password, passwordCheck});
            if(this.props.registerSuccess === true) {
                history.push('/auth/login');
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleKeydown = (e) => {
        if(e.key === "Enter") {
            this.handleRegister();
        }
        
    }

    render() {
        const { email, password, passwordCheck, registerErrorMessage, registerRequestStatus } = this.props;
        const { handleChangeInput, handleRegister, handleKeydown } = this;

        return (
            <AuthWrapper>
                <RegisterForm 
                    onChangeInput={handleChangeInput}
                    email={email}
                    password={password}
                    passwordCheck={passwordCheck}
                    onRegister={handleRegister}
                    onKeydown={handleKeydown}
                    errorMessage={registerErrorMessage}
                    status={registerRequestStatus}
                    theme={registerRequestStatus === 'WAITING' && 'disabled'} />
            </AuthWrapper>
        )
    }
}
export default connect(
    (state) => ({
        email: state.auth.get('email'),
        password: state.auth.get('password'),
        passwordCheck: state.auth.get('passwordCheck'),
        registerSuccess: state.auth.getIn(['register', 'success']),
        registerErrorMessage: state.auth.getIn(['register', 'error']),
        registerRequestStatus: state.auth.getIn(['register', 'status'])
    }),
    (dispatch) => ({
        changeInput: ({name, value}) => {
            return dispatch(changeInput({name, value}));
        },
        initializeAuthInputs: () => {
            return dispatch(initializeAuthInputs());
        },
        registerRequest: ({email, password, passwordCheck}) => {
            return dispatch(registerRequest({email, password, passwordCheck}));
        }
    })
)(withRouter(RegisterContainer));