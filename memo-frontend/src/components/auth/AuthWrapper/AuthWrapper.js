import React from 'react';
import styles from './AuthWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AuthWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    {children}
  </div>
);

export default AuthWrapper;