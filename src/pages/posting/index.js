import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'antd';
import {Link} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './posting.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Tile from '../../components/common/Tile';
import Button from '../../components/common/Button';
import Background from '../../components/common/Background';

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => setShowPage(true), []);

  const switchModal = () => setModalOpen(prevState => !prevState);

  const style={
    height: '430px',
    backgroundColor: '#FFF',
  }

  const style2={
    position: 'absolute',
    left: '25%',
    top: '25%'
  }

  const PostModal = () => (
      <div className="modalContainer">
        <div className='postingPageCloseContainer' onClick={switchModal}>
          <div className='postingPageClose'>
            <Image preview={false} src={arrow} className='postingPageArrow1' />
            <Image preview={false} src={cancel} className='cancelIcon' />
            <Image preview={false} src={arrow} className='postingPageArrow2' />
          </div>
        </div>
        <div>
          <div className='ModalTitle'>sign in to continue</div>
          <div className='postingPageButtonContainer'>
            <Link to="/posting/howitworks">
              <Button title='sign in' small color='#C1839F' />
            </Link>
          </div>
        </div>
      </div>
  );

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="postingPage-"
      unmountOnExit>
      <div className='postingPageContainer'>
        {modalOpen && <div className='backdrop' onClick={switchModal} />}
        <Background />
        <Header color='#C1839F' />
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
          <PostModal />
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default Confirm;
