import React from 'react';
import styles from './AuthForm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AuthForm = () => (
  <div className={cx('form')}>
    <div className={cx('label')}>
    </div>
    <div className={cx('input')}>
    </div>
  </div>
);

export default AuthForm;