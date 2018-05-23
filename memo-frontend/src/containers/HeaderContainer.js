import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from 'components/home/Header/Header';
// // import * as MyActionModule from 'store/modules/MyActionModule';
import { 
    logoutRequest
} from 'store/actions/auth';
import storage from 'lib/storage';

class HeaderContainer extends Component {
    handleLogout = async () => {
        const { logoutRequest } = this.props;

        try {
            await logoutRequest();
            if(this.props.success) {
                storage.remove('loggedInfo');
                window.location.href = "/";
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    render() {
        const { logged } = this.props;
        const { handleLogout } = this;
        return (
            <Header logged={logged}
                    onLogout={handleLogout}/>
        )
    }
}
export default connect(
    (state) => ({
        logged: state.auth.getIn(['check', 'logged']),
        success: state.auth.getIn(['logout', 'success'])
    }),
    (dispatch) => ({
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    })
)(HeaderContainer);