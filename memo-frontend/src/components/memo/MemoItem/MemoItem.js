import React, { Fragment } from 'react';
import styles from './MemoItem.scss';
import classNames from 'classnames/bind';
import TimeAgo from 'react-timeago';


const cx = classNames.bind(styles);

const MemoItem = ({content, id, createdAt, updated, updatedAt, onClickUpdate, isUpdate, oldContent, onChange, onClickNoUpdate, onUpdate, onRemove}) => {
  
  const toggleEdit = (e) => {
    const { id } = e.target;
    onClickUpdate({id, content});
  }

  const handleChange = (e) => {
    const { value } = e.target;
    onChange({content: value});
  }

  const toggleNoUpdate = (e) => {
    const { id } = e.target;
    onClickNoUpdate({id});
  }

  const handleUpdate = () => {
    onUpdate({id});
  }

  const handleRemove = () => {
    onRemove({id});
  }

  return (
    <div className={cx('MemoItem')}>
      <div className={cx('contents')}>
        <div className={cx('date')}>
        {
          updated ? 
          <Fragment>
          <TimeAgo date={updatedAt} live={true} />(수정됨)</Fragment> : 
          <TimeAgo date={createdAt} live={true} />
        }
        </div>
        {
          !isUpdate ?
          <div className={cx('content')}>
            {content}
          </div>
          :
          <textarea 
            name="content" 
            className={cx('textarea')} 
            value={oldContent}
            onChange={handleChange}></textarea>
        }
        <div className={cx('buttons')}>
        {
          isUpdate ?
          <Fragment>
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'update')} onClick={handleUpdate}>
              수정
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'cancel')} id={id} onClick={toggleNoUpdate}>
              취소
            </div>
          </div>
          </Fragment>
          :
          <Fragment>
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'remove')} onClick={handleRemove}>
              삭제
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'update')} id={id} onClick={toggleEdit}>
              수정
            </div>
          </div>
          </Fragment>
        }
          
          
        </div>
      </div>
    </div>
  );
}

export default MemoItem;