import React from 'react';
import styles from './MemoWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MemoWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    {children}
  </div>
);

export default MemoWrapper;