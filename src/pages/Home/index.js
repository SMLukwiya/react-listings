import React, {useRef} from 'react';
import { Row, Col, Image } from 'antd';
import {Link} from 'react-router-dom';

import classes from './home.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Button from '../../components/common/Button';
import Tile from '../../components/common/Tile';
import Footer from '../../components/Footer';

const pencil = require('../../assets/icons/pencil.svg');
const news = require('../../assets/icons/calender.svg');
const email = require('../../assets/icons/eye.svg');
const find = require('../../assets/icons/check.svg');
const chat = require('../../assets/icons/chatbubble.svg');
const clock = require('../../assets/icons/clockicon.svg');
const emailFrom = require('../../assets/icons/emailfromus.svg');
const form = require('../../assets/icons/form.svg');
const defaultImage = require('../../assets/default.png')

const howItWorksGet = [
  {
    title: 'Sign up',
    image: pencil,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Get the Newsletter',
    image: news,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Read your email',
    image: email,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Find what you"re looking for',
    image: find,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  }
];

const howItWorksPost = [
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
    title: 'Find what you"re looking for',
    image: chat,
    description: 'Check your inbox for emails from interested listers'
  }
];

const Home = () => {
  const howitworksRef = useRef(null);
  const aboutusRef = useRef(null);

  // HOF for page scrolling
  const handleScrollClick = e => section => {
    e.preventDefault();
    const main = section.current;
    window.scrollTo({
      top: main.offsetTop - 150,
      left: 0,
      behaviour: 'smooth'
    })
  };

  return (
    <div>
      <Header color='#403D39' />
      <div className={classes.Container}>
        <Row className={classes.MenuRow}>
          <Col span={4} className={classes.Col}>
            <Menu click={handleScrollClick} howitworksRef={howitworksRef} aboutRef={aboutusRef}/>
          </Col>

          <Col span={18} className={classes.Col}>
            <div className={classes.TitleHolder}>
              <p className={classes.Title}>Find your new home,<br></br>from home.</p>
            </div>
            <Row className={classes.ButtonRow}>
              <Col span={12} className={classes.Col1}>
                <Link to="/finding"><Button color='#00A8E8' title="Find a Space"/></Link>
                <p className={classes.ButtonDescription}>Free to subscribe. New listings are emailed every Friday. Listings only available through the newsletter.</p>
              </Col>
              <Col span={12} className={classes.Col1}>
                <Link to="/posting"><Button color='#C1839F' title="Post a Listing"/></Link>
                <p className={classes.ButtonDescription}>Post your Listings by Friday; fees increase after 10am ET</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <div ref={howitworksRef} className={classes.HowItWorksContainer}>
          <Row className={classes.HowItWorksRow}>
            <Col span={24} className={classes.HowItWorksTitleContainer}>
              <div className={classes.HowItWorksTitle1}>how it works</div>
              <div className={classes.HowItWorksTitle2}>Get the Listings</div>
            </Col>
            {howItWorksGet.map(({title, image, description}, i) => (
              <Col key={i} span={6} className={classes.TileContainerCol}>
                <Tile title={title} image={image} description={description} />
              </Col>
            ))}
            <Col span={24} className={classes.HowItWorksTitleContainer}>
              <div className={classes.HowItWorksTitle2}>Post Listings</div>
            </Col>
            {howItWorksPost.map(({title, image, description}, i) => (
              <Col key={i} span={6} className={classes.TileContainerCol}>
                <Tile title={title} image={image} description={description} />
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <Row className={classes.HowItWorksRow}>
            <Col span={24}><p className={classes.CEOHeaderText}>word from C.E.O</p></Col>
            <Col span={3}></Col>
            <Col span={21} className={classes.CEOCol}>
              <div style={{position: 'absolute'}}><Image className={classes.CEOImage} src={defaultImage} /></div>
              <div className={classes.CEOText}>Text from CEO</div>
            </Col>
          </Row>
        </div>

        <div ref={aboutusRef}>
          <Row className={classes.AboutusRow}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}>About us</div>
          </Row>
        </div>

        <div>
          <Row className={classes.OptionalinfoRow}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}>Optional Info</div>
          </Row>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Home;
