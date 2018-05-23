import React from 'react';
import styles from './RegisterForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RegisterForm = ({onChangeInput, email, password, passwordCheck}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <div className={cx('form')}>
      <div className={cx('description')}>
        회원가입
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
          onChange={handleChange}/>
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
          onChange={handleChange}/>
      </div>
      <div className={cx('label')}>
        비밀번호 확인
      </div>
      <div className={cx('input-wrapper')}>
        <input 
          type="password" 
          name="passwordCheck" 
          className={cx('input')}
          value={passwordCheck}
          onChange={handleChange}/>
      </div>
      <div className={cx('button-wrapper')}>
        <div className={cx('button')}>
          회원가입
        </div>
      </div>
      <div className={cx('register')}>
        이미 가입하셨나요? <Link to="/auth/login">로그인하러가기</Link>
      </div>
    </div>
  );
}

export default RegisterForm;