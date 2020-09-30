import React, {useState, useEffect} from 'react';
import { Row, Col, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

import './finding.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Input from '../../components/common/Input';
import Background from '../../components/common/Background';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import {checkValidity} from '../../utils';

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({ elementType: 'input', elementConfig: { type: 'email' }, value: '', validation: { required: true }, valid: false, message: '', touched: false });
  const [loading, setLoading] = useState(false)

  useEffect(() => {setShowPage(true)}, []);

  const handleChange = (e) => {
    const newState = {...state};
    newState.value = e.target.value;
    let validity = checkValidity('email', newState.value, newState.validation)
    newState.valid = validity.isValid;
    newState.message = validity.message
    newState.touched = true;

    setState(newState);
  }

  const subscribe = () => {
    setLoading(true);

    const data = { email: state.value };

    axios.post('https://listings.dsnibro.com/api/v1/api_users', {
      email: data.email
    })
    .then(response => {
      console.log(response)
      setLoading(false);
      setTimeout(() => props.history.push('/finding/congrats'), 1000)
    })
    .catch(err => {
      setLoading(false);
      const {response: {data: {errors: { email }}}} = err;

      setState({...state, message: email[0], value: ''})
    })
  }

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
          <Col span={4} style={{marginTop: '40px'}}>
            <Menu history={props.history} />
          </Col>
          <Col span={2} className='findingPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='findingPageFindingCol'>
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
                {loading ? <Loader /> :<Button small title="subscribe" color="#00A8E8" enabled={state.valid} click={subscribe} />}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
