import React from 'react';
import styles from './AuthForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AuthForm = ({onChangeInput, email, password, theme, onLogin, onKeydown, error, status}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
    return (
      <div className={cx('form')}>
        <div className={cx('description')}>
          로그인
        </div>
        <div className={cx('error')}>
          {error.toUpperCase()}
        </div>
        <div className={cx('label')}>
          이메일
        </div>
        <div className={cx('input-wrapper')}>
          <input 
            type="text" 
            name="email" 
            className={cx('input')}
            value={email}
            onChange={handleChange}
            onKeyDown={onKeydown}/>
        </div>
        <div className={cx('label')}>
          비밀번호
        </div>
        <div className={cx('input-wrapper')}>
          <input 
            type="password" 
            name="password" 
            className={cx('input')}
            value={password}
            onChange={handleChange}
            onKeyDown={onKeydown}/>
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('button', theme)} onClick={onLogin}>
          {
            status === 'WAITING' ? 
            'PLEASE WAIT...' : 
            '로그인'
          }
          </div>
        </div>
        <div className={cx('register')}>
          아직 가입하지 않으셨나요? <Link to="/auth/register">가입하러가기</Link>
        </div>
      </div>
    );
}

export default AuthForm;