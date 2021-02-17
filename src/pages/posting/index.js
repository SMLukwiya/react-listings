import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Spin } from 'antd';
import {Link} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';
import {useSelector, useDispatch} from 'react-redux';
import { checkValidity } from '../../utils';
import { signin } from '../../store/actions';

import './posting.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Tile from '../../components/common/Tile';
import Button from '../../components/common/Button';
import Background from '../../components/common/Background';
import Input from '../../components/common/Input';

const chat = require('../../assets/icons/chatbubble.svg');
const clock = require('../../assets/icons/clockicon.svg');
const emailFrom = require('../../assets/icons/emailfromus.svg');
const form = require('../../assets/icons/form.svg');
const arrow = require('../../assets/icons/arrow.svg');
const cancel = require('../../assets/icons/cancel.png');

const faqs = [
  {
    title: 'Fill out the form',
    image: form,
    description: 'Post a listing by Friday and pay the fee. Create an account for easy reposting and editing.'
  },
  {
    title: 'Post by the Deadlines',
    image: clock,
    description: 'Fees increase after 10am ET Friday. Listings appear in the order they are received and expire after one week.'
  },
  {
    title: 'Get an email from us',
    image: emailFrom,
    description: 'We personally read your listings and correspond with you.'
  },
  {
    title: 'Find what you\'re looking for',
    image: chat,
    description: 'Check your inbox for emails from interested listers.'
  }
];

const Confirm = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [ cookies, setCookie ] = useState();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: {
      elementType: 'input', elementConfig: { type: 'email' }, value: '', validation: { required: true }, valid: false, message: '', touched: false
    },
    password: {
      elementType: 'input', elementConfig: { type: 'password' }, value: '', validation: { required: true }, valid: false, message: '', touched: false
    }});
  const user = useSelector(state => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const {history} = props;
  const {user: { loggedIn }} = user;

  useEffect(() => {
    setShowPage(true)
  }, []);

  let modalInput = []
  for (let key in state) {
    modalInput.push(key)
  }

  const switchModal = () => {
    if (loggedIn) {
      return history.push('/posting/howitworks')
    }

    setModalOpen(prevState => !prevState)
  };

  const handleChange = (e, type) => {
    const newState = {...state};
    newState[type].value = e.target.value;
    let validity = checkValidity(type, newState[type].value, newState[type].validation)
    newState[type].valid = validity.isValid;
    newState[type].message = validity.message
    newState[type].touched = true;

    setState(newState);
  }

  const clickSignin = () => {
    console.log('click')
    dispatch(signin(state.email.value, state.password.value, (err) => {
      if (err) return console.log(err);

      setCookie('p-listings_user__username', state.email.value, {path: '/'});
      setCookie('p-listings_user__code', state.password.value, {path: '/'});

      history.push('/posting/howitworks');
    }))
  }

  const style={
    height: '430px',
    backgroundColor: '#FFF',
  }

  const style2={
    position: 'absolute',
    left: '25%',
    top: '25%'
  }

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="postingPage-"
      unmountOnExit>
      <div className='postingPageContainer'>
        {modalOpen && <div className='backdrop' onClick={switchModal} />}
        <Background />
        <Header color='#C1839F' version='post' />
        <Row className='postingPageRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={1} className='postingPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={19} className='postingPageConfirmCol'>
            <div className='postingPageTitle'>how posting a Listing works</div>
            <Row className='postingPageTileRow'>
              {faqs.map(({title, image, description}, i) => (
                <Col key={i} span={6} className='postingPageTileContainerCol'>
                  <Tile title={title} image={image} description={description} space />
                </Col>
              ))}
            </Row>
            <div className='postingPageButtonContainer'>
                <Button title='create my listing' color='#C1839F' small click={switchModal} enabled />
            </div>
          </Col>
        </Row>
        <CSSTransition
          in={modalOpen}
          timeout={800}
          classNames="modal-"
          unmountOnExit
          appear
          exit
          >
          <div className="modalContainer">
            <div className='postingPageCloseContainer' onClick={switchModal}>
              <div className='postingPageClose'>
                <Image preview={false} src={arrow} className='postingPageArrow1' />
                <Image preview={false} src={cancel} className='postingCancelIcon' />
                <Image preview={false} src={arrow} className='postingPageArrow2' />
              </div>
            </div>
            <div>
              <div className='ModalTitle'>sign in to continue</div>
              {
                modalInput.map((item) =>
                <div key={item} className='postingModalContainer'>
                  <p className='postingModalTitle'>{item}</p>
                  <div className='postingModalInputContainer'>
                    <Input elementConfig={state[item].elementConfig} change={(e) => handleChange(e, item)} value={state[item].value} elementType={state[item].elementType} invalid={!state[item].valid} touched={state[item].touched} message={state[item].message} />
                  </div>
                </div>
                )
              }
              {user.error && <div style={{color: 'red', width: '100%', textAlign: 'center'}}>{user.error}</div>}
              <div className='postingPageModalButtonContainer'>
                <Spin tip='loading..' spinning={user.loading}>
                  <Button title='sign in' small color='#C1839F' click={clickSignin} enabled={state.email.valid && state.password.valid} />
                </Spin>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
