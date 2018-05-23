import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Locker from 'react-icons/lib/md/vpn-key';
import UnLocker from 'react-icons/lib/md/lock-open';

const cx = classNames.bind(styles);

const Header = ({logged, onLogout}) => (
  <div className={cx('header')}>
    <div className={cx('contents')}>
      <div className={cx('column')}>
      </div>
      <div className={cx('column')}>
        <Link to="/" className={cx('logo')}>
          Memo Pad
        </Link>
      </div>
      <div className={cx('column')}>
        {
          logged ? 
          <div className={cx('menu')}>
            <UnLocker onClick={onLogout} />
          </div>
          :
          <Link to="/auth/login" className={cx('menu')}>
            <Locker />
          </Link>
        }
      </div>
    </div>
  </div>
);

export default Header;