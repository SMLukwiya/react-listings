import React, {useState, useEffect} from 'react';
import { Row, Col, Image } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

import './signin.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Background from '../../components/common/Background';
import AnimatedButton from '../../components/common/Button/Animated';
import { checkValidity } from '../../utils';

const arrow = require('../../assets/icons/right-chevron-white.png');

const Signin = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({ elementType: 'input', elementConfig: { type: 'email' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  const handleChange = (e) => {
    const newState = {...state};
    newState.value = e.target.value;
    let validity = checkValidity('email', newState.value, newState.validation);
    newState.valid = validity.isValid;
    newState.message = validity.message
    newState.touched = true;

    setState(newState);
  }

  const signIn = () => {
    axios.post('/api', {
      email: state.email
    })
    .then()
    .catch()
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
              <Input elementConfig={state.elementConfig} change={handleChange} value={state.value} elementType={state.elementType} invalid={!state.valid} touched={state.touched} />
              {state.touched && <p className='error'>{state.message}</p>}
            </div>
            <div className='signInCreateAccount'>create account</div>
          </Col>
        </Row>
        <Col className='signInNextContainer'>
          <Link to="/confirm">
            <AnimatedButton title='next' color='#00A8E8' />
          </Link>
        </Col>
      </div>
    </CSSTransition>
  )
}

export default Signin;
