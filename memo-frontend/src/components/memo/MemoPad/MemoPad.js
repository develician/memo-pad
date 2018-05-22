import React from 'react';
import styles from './MemoPad.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MemoPad = () => (
  <div className={cx('memo-pad')}>
    <div className={cx('contents')}>
      <div className={cx('memo-wrapper')}>
        <textarea name="memo" className={cx('textarea')}></textarea>
      </div>
      <div className={cx('button-wrapper')}>
        <div className={cx('button')}>
          <div className={cx('text')}>
            작성하기
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MemoPad;