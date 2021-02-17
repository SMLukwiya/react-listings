import React, {useState, useEffect} from 'react';
import { Row, Col, Image, Spin } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import './signin.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Background from '../../components/common/Background';
import Loader from '../../components/common/Loader';
import { checkValidity } from '../../utils';
import { signup } from '../../store/actions';

const arrow = require('../../assets/icons/right-chevron-white.png');

const Signin = (props) => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const [showPage, setShowPage] = useState(false);
  const [email, setEmail] = useState({ elementType: 'input', elementConfig: { type: 'email' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const [password, setPassword] = useState({ elementType: 'input', elementConfig: { type: 'password' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ elementType: 'input', elementConfig: { type: 'password' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const user = useSelector(state => state.user);

  useEffect(() => {setShowPage(true)}, []);

  const handleChange = (e, type, setTypeFunction) => {
    const newState = {...type};
    newState.value = e.target.value;
    let validity = checkValidity(`${type.elementConfig.type}`, newState.value, newState.validation);
    newState.valid = validity.isValid;
    newState.message = validity.message
    newState.touched = true;

    setTypeFunction(newState);
  }

  const signIn = () => {
    if (password.valid && confirmPassword.value !== password.value) {
      setConfirmPassword({...confirmPassword, touched: true, message: 'Passwords do not match'});
      return;
    }

    dispatch(signup(email.value, password.value, confirmPassword.value, (err) => {
      if (err) {
        console.log(err)
        return;
      };
      setCookie('p-listings_user__username', email.value, {path: '/'});
      setCookie('p-listings_user__code', password.value, {path: '/'});
      props.history.push('/');
    }));
  }

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="signinPage-"
      unmountOnExit>
      <div className='signInContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='signInRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='signInBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='SiginCol'>
            <div className='SigninTitle'>Sign in</div>
            <div className='SigninText'>You will receive our email with new listings every Friday</div>
            <div className='SigninEmailText'>email</div>
            <div className='signInInputContainer'>
              <Input elementConfig={email.elementConfig} change={(e) => handleChange(e, email, setEmail)} value={email.value} elementType={email.elementType} invalid={!email.valid} touched={email.touched} />
              {email.touched && <p className='error'>{email.message}</p>}
            </div>
            <div className='SigninEmailText'>password</div>
            <div className='signInInputContainer'>
              <Input elementConfig={password.elementConfig} change={(e) => handleChange(e, password, setPassword)} value={password.value} elementType={password.elementType} invalid={!password.valid} touched={password.touched} />
              {password.touched && <p className='error'>{password.message}</p>}
            </div>
            <div className='SigninEmailText'>confirm password</div>
            <div className='signInInputContainer'>
              <Input elementConfig={confirmPassword.elementConfig} change={(e) => handleChange(e, confirmPassword, setConfirmPassword)} value={confirmPassword.value} elementType={confirmPassword.elementType} invalid={!confirmPassword.valid} touched={confirmPassword.touched} />
              {confirmPassword.touched && <p className='error'>{confirmPassword.message}</p>}
            </div>
            <div className='signInCreateAccount'>create account</div>
            {user.error && <span style={{color: 'red'}}>{user.error}</span>}
          </Col>
        </Row>
        <Col className='signInNextContainer'>
        <Spin tip='loading..' spinning={user.loading}>
            <Button small title="sign in" color="#00A8E8" enabled={email.valid && password.valid} click={signIn} />
        </Spin>
        </Col>
      </div>
    </CSSTransition>
  )
}

export default Signin;
