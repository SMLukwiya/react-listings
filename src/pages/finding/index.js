import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../../store/actions';
import {checkValidity} from '../../utils';

import './finding.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Background from '../../components/common/Background';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const Finding = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({ elementType: 'input', elementConfig: { type: 'email' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const user = useSelector(reduxState => reduxState.user);

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newState = {...state};
    newState.value = e.target.value;
    let validity = checkValidity('email', newState.value, newState.validation)
    newState.valid = validity.isValid;
    newState.message = validity.message
    newState.touched = true;

    setState(newState);
  }

  const onClickSubscribe = useCallback(() => {
    setTimeout(() => props.history.push('/finding/congrats'), 1000);
    // const data = { email: state.value };
    //
    // dispatch(subscribe(data, (error) => {
    //   if(error) {console.log('error', error); return setState({...state, message: error, value: ''});}
    //
    //   setTimeout(() => props.history.push('/finding/congrats'), 1000);
    // }))
  }, [dispatch, state, props.history]);

  return (
    <CSSTransition
      in={showPage}
      classNames="findingPage-"
      timeout={800}
      unmountOnExit>
      <div className='findingPageContainer'>
        <Background />
        <Header color='#00A8E8' />
        <Row className='findingPageRow'>
          <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{marginTop: '40px'}}>
            <Menu history={props.history} />
          </Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2} className='findingPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col xl={18} lg={18} md={18} sm={18} xs={18} className='findingPageFindingCol'>
            <div className='findingPageTitle'>Subscribe to Listings Project</div>
            <div className='findingPageText'>You will receive our email with new listings every Friday</div>
            <div className='findingPageEmail'>enter your email here</div>
            <div className='findingPageInputContainer'>
              <Input elementConfig={state.elementConfig} change={handleChange} value={state.value} elementType={state.elementType} invalid={!state.valid} touched={state.touched} />
              {state.touched && <p className='error'>{state.message}</p>}
            </div>
            <div className='findingPageText'>
              <Checkbox className='findingPageText'><span style={{color: '#00A8E8'}}>read</span> & I accept the Terms of Use and Privacy Policy</Checkbox>
            </div>
            <div className='findingPageButtonContainer'>
              <span>
                {user.loading ? <Loader /> :<Button small title="subscribe" color="#00A8E8" enabled={/*state.valid*/true} click={onClickSubscribe} />}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Finding;
