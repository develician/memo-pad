import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MemoPad from 'components/memo/MemoPad/MemoPad';
import MemoWrapper from 'components/memo/MemoWrapper/MemoWrapper';
// import from 'store/modules/MyActionModule';
import {
    contentChange,
    writeMemoRequest,
    getMemoRequest,
    makeUpdateMode,
    makeNoUpdateMode,
    updateMemoRequest
} from 'store/actions/memo';
import MemoList from 'components/memo/MemoList/MemoList';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';


const $ = window.$;

class HomeContainer extends Component {

    state = {
        loadingState: false
    };

    handleChangeContent = ({ content }) => {
        const { contentChange } = this.props;
        contentChange({ content })
    }

    writeMemo = async () => {
        const { writeMemoRequest, content } = this.props;

        try {
            await writeMemoRequest({ content });
            // this.getMemos();
        } catch (e) {
            console.log(e);
        }
    }


    getMemos = async () => {
        const { getMemoRequest, isInitial, lastId } = this.props;

        try {
            await getMemoRequest(isInitial, lastId);

        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        const { history } = this.props;
        if(!storage.get('loggedInfo')) {
            history.push("/auth/login");
            return;
        }
        const { getMemoRequest, isInitial, lastId } = this.props;
        this.getMemos();

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if (!this.state.loadingState) {
                    getMemoRequest(this.props.isInitial, this.props.lastId);
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if (this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });

    }

    handleClickUpdate = ({id, content}) => {
        const { makeUpdateMode } = this.props;
        makeUpdateMode({id, content});
    }

    handleClickNoUpdate = ({id}) => {
        const { makeNoUpdateMode } = this.props;
        makeNoUpdateMode({id});
    }

    handleUpdateMemo = async ({id}) => {
        const { updateMemoRequest, content } = this.props;

        try {
            await updateMemoRequest({id, content});
            if(this.props.memoUpdateStatus === 'SUCCESS'){
                this.handleClickNoUpdate({id});
            } 
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { content, memoList, isUpdate, willUpdateId } = this.props;
        const { handleChangeContent, writeMemo, handleClickUpdate, handleClickNoUpdate, handleUpdateMemo } = this;
        return (
            <MemoWrapper>
                <MemoPad
                    content={content}
                    onChangeContent={handleChangeContent}
                    onWrite={writeMemo}
                    isUpdate={isUpdate}
                     />
                <MemoList
                    list={memoList}
                    isUpdate={isUpdate}
                    onClickUpdate={handleClickUpdate}
                    onClickNoUpdate={handleClickNoUpdate} 
                    willUpdateId={willUpdateId}
                    oldContent={content}
                    onChangeContent={handleChangeContent}
                    onUpdateMemo={handleUpdateMemo}/>
            </MemoWrapper>
        )
    }
}
export default connect(
    (state) => ({
        content: state.memo.getIn(['memo', 'content']),
        memoList: state.memo.get('memoList'),
        isInitial: state.memo.get('isInitial'),
        lastId: state.memo.get('lastId'),
        logged: state.auth.getIn(['check', 'logged']),
        isUpdate: state.memo.get('isUpdate'),
        willUpdateId: state.memo.get('willUpdateId'),
        memoUpdateStatus: state.memo.getIn(['update', 'status'])
    }),
    (dispatch) => ({
        contentChange: ({ content }) => {
            return dispatch(contentChange({ content }));
        },
        writeMemoRequest: ({ content }) => {
            return dispatch(writeMemoRequest({ content }));
        },
        getMemoRequest: (isInitial, lastId) => {
            return dispatch(getMemoRequest(isInitial, lastId));
        },
        makeUpdateMode: ({id, content}) => {
            return dispatch(makeUpdateMode({id, content}));
        },
        makeNoUpdateMode: ({id}) => {
            return dispatch(makeNoUpdateMode({id}));
        },
        updateMemoRequest: ({id, content}) => {
            return dispatch(updateMemoRequest({id, content}));
        }
    })
)(withRouter(HomeContainer));