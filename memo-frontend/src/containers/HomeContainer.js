import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MemoPad from 'components/memo/MemoPad/MemoPad';
import MemoWrapper from 'components/memo/MemoWrapper/MemoWrapper';
// import from 'store/modules/MyActionModule';

class HomeContainer extends Component {
    
    render() {
        return (
            <MemoWrapper>
                <MemoPad />
            </MemoWrapper>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(HomeContainer);