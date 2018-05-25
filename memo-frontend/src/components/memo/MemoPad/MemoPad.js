import React from 'react';
import styles from './MemoPad.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MemoPad = ({content, onChangeContent, onWrite, isUpdate}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChangeContent({content: value});
  }
  return (
    <div className={cx('memo-pad')}>
      <div className={cx('contents')}>
        <div className={cx('memo-wrapper')}>
          {
            isUpdate ? 
            <textarea 
            name="memo" 
            className={cx('textarea')} 
            ></textarea>
            :
            <textarea 
            name="memo" 
            className={cx('textarea')} 
            value={content}
            onChange={handleChange}></textarea>
          }
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('button')}>
            <div className={cx('text')} onClick={onWrite}>
              작성하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoPad;