import React, { useState } from 'react';
import { Row, Col, Image, Modal } from 'antd';
import {Link} from 'react-router-dom';
import { Transition } from 'react-transition-group';

import classes from './posting.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BackButton from '../../components/common/BackButton';
import Tile from '../../components/common/Tile';
import Button from '../../components/common/Button'

const chat = require('../../assets/icons/chatbubble.svg');
const clock = require('../../assets/icons/clockicon.svg');
const emailFrom = require('../../assets/icons/emailfromus.svg');
const form = require('../../assets/icons/form.svg');
const arrow = require('../../assets/icons/arrow.png');

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
  var subtitle;
  const [modalOpen, setModalOpen] = useState(false);

  const switchModal = () => { setModalOpen(!modalOpen) };

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
      <Modal
        style={style2}
        visible={modalOpen}
        bodyStyle={style}
        width={800}
        destroyOnClose
        onCancel={switchModal}
        closeIcon={
          <div className={classes.Close}>
            <Image preview={false} src={arrow} className={classes.Arrow1}/>
            <div className={classes.Close1} />
            <div className={classes.Close2} />
            <Image preview={false} src={arrow} className={classes.Arrow2}/>
          </div>
        }
        footer={null}
      >
        <div>
          <div className={classes.ModalTitle}>sign in to continue</div>
          <div className={classes.ButtonContainer}>
            <Link to="/posting/howitworks" onClick={setModalOpen}>
              <Button title='sign in' small color='#C1839F' />
            </Link>
          </div>
        </div>
      </Modal>
  );

  return (
    <div className={classes.Container}>
      <Header color='#C1839F' />
      <Row className={classes.Row}>
        <Col span={4}>
          <Menu />
        </Col>
        <Col span={1} className={classes.BackButton}>
          <BackButton history={props.history} />
        </Col>
        <Col span={19} className={classes.ConfirmCol}>
          <div className={classes.Title}>how posting a Listing works</div>
          <Row className={classes.TileRow}>
            {faqs.map(({title, image, description}, i) => (
              <Col key={i} span={6} className={classes.TileContainerCol}>
                <Tile title={title} image={image} description={description} space />
              </Col>
            ))}
          </Row>
          <div className={classes.ButtonContainer}>
              <Button title='create my listing' color='#C1839F' small click={switchModal} />
          </div>
        </Col>
      </Row>
      {<PostModal />}
    </div>
  )
}

export default Confirm;
