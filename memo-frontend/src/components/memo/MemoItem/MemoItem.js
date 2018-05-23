import React from 'react';
import styles from './MemoItem.scss';
import classNames from 'classnames/bind';
import TimeAgo from 'react-timeago';


const cx = classNames.bind(styles);

const MemoItem = ({content, id, createdAt, updated, updatedAt, onClickUpdate, isUpdate, oldContent, onChange}) => {
  
  const toggleEdit = (e) => {
    const { id } = e.target;
    onClickUpdate({id, content});
  }

  const handleChange = (e) => {
    const { value } = e.target;
    onChange({content: value});
  }
  return (
    <div className={cx('MemoItem')}>
      <div className={cx('contents')}>
        <div className={cx('date')}>
        {
          updated ? 
          <TimeAgo date={updatedAt} live={true} /> : 
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
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'remove')}>
              삭제
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button', 'update')} id={id} onClick={toggleEdit}>
              수정
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoItem;