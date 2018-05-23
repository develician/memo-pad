import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
// // import * as MyActionModule from 'store/modules/MyActionModule';
import { 
    tempLogin,
    checkRequest
 } from 'store/actions/auth';

class Base extends Component {

    check = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo) return;

        const { tempLogin, checkRequest } = this.props;
        tempLogin();

        try {
            await checkRequest();
        } catch(e) {
            storage.remove('loggedInfo');
            window.location.href = "/auth/login?expired";
        }
    }

    componentDidMount() {
        this.check();

    }

    render() {

        return (
            <div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        tempLogin: () => {
            return dispatch(tempLogin());
        },
        checkRequest: () => {
            return dispatch(checkRequest());
        }
    })
)(Base);