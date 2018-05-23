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
    makeUpdateMode
} from 'store/actions/memo';
import MemoList from 'components/memo/MemoList/MemoList';
import storage from 'lib/storage';


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
        if(!storage.get('loggedInfo')) {
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

    render() {
        const { content, memoList, isUpdate, willUpdateId } = this.props;
        const { handleChangeContent, writeMemo, handleClickUpdate } = this;
        return (
            <MemoWrapper>
                <MemoPad
                    content={content}
                    onChangeContent={handleChangeContent}
                    onWrite={writeMemo}
                     />
                <MemoList
                    list={memoList}
                    isUpdate={isUpdate}
                    onClickUpdate={handleClickUpdate} 
                    willUpdateId={willUpdateId}
                    oldContent={content}
                    onChangeContent={handleChangeContent}/>
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
        willUpdateId: state.memo.get('willUpdateId')
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
        }
    })
)(HomeContainer);