import React, {useRef, useEffect, useState} from 'react';
import { Row, Col, Image } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import './home.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Button from '../../components/common/Button';
import Tile from '../../components/common/Tile';
import Footer from '../../components/Footer';
import Background from '../../components/common/Background';

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

const Home = (props) => {
  const [showPage, setShowPage] = useState(false);
  const howitworksRef = useRef(null);
  const aboutusRef = useRef(null);

  const location = props.location.pathname, history = props.history;

  // Show Page
  useEffect(() => {setShowPage(true);}, []);

  const scrollDelay = (ms) => (new Promise(res => setTimeout(res, ms)));

  // HOF for page scrolling
  const handleScrollClick = e => async section => {
    e.preventDefault();
    const main = section.current;
    for (let y = 0; y <= main.offsetTop-150; y+= 180) {
      window.scrollTo({
        top: y,
        left: 0,
        behaviour: 'smooth'
      })
      await scrollDelay(30)
    }
  };

  return (
    <CSSTransition
      in={showPage}
      classNames="homePage-"
      timeout={800}
      unmountOnExit>
    <div>
      <Background />
      <Header color='#403D39' />
      <div className='homePageContainer'>
        <Row className='homePageMenuRow'>
          <Col span={4} className='homePageCol'>
            <Menu click={handleScrollClick} howitworksRef={howitworksRef} aboutRef={aboutusRef} location={location} history={history} />
          </Col>

          <Col span={18} className='homePageCol'>
            <div className='homePageTitleHolder'>
              <p className='homePageTitle'>Find your new home,<br></br>from home.</p>
            </div>
            <Row className='homePageButtonRow'>
              <Col span={7} className='homePageCol1-1'>
                <Link to="/finding"><Button color='#00A8E8' title="Find a Space"/></Link>
                <p className='homePageButtonDescription'>Free to subscribe. New listings are emailed every Friday. Listings only available through the newsletter.</p>
              </Col>
              <Col span={7} className='homePageCol1-2'>
                <Link to="/posting"><Button color='#C1839F' title="Post a Listing"/></Link>
                <p className='homePageButtonDescription'>Post your Listings by Friday; fees increase after 10am ET</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <div ref={howitworksRef} className='homePageHowItWorksContainer'>
          <Row className='homePageHowItWorksRow'>
            <Col span={24} className='homePageHowItWorksTitleContainer'>
              <div className='homePageHowItWorksTitle1'>how it works</div>
              <div className='homePageHowItWorksTitle2'>Get the Listings</div>
            </Col>
            {howItWorksGet.map(({title, image, description}, i) => (
              <Col key={i} span={6} className='TileContainerCol'>
                <Tile title={title} image={image} description={description} />
              </Col>
            ))}
            <Col span={24} className='homePageHowItWorksTitleContainer'>
              <div className='homePageHowItWorksTitle2'>Post Listings</div>
            </Col>
            {howItWorksPost.map(({title, image, description}, i) => (
              <Col key={i} span={6} className='homePageTileContainerCol'>
                <Tile title={title} image={image} description={description} />
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <Row className='homePageHowItWorksRow'>
            <Col span={24}><p className='homePageCEOHeaderText'>word from C.E.O</p></Col>
            <Col span={3}></Col>
            <Col span={21} className='homePageCEOCol'>
              <div style={{position: 'absolute'}}><Image className='homePageCEOImage' src={defaultImage} /></div>
              <div className='homePageCEOText'>Text from CEO</div>
            </Col>
          </Row>
        </div>

        <div ref={aboutusRef}>
          <Row className='homePageAboutusRow'>
            <div className='homePageAboutusText'>About us</div>
          </Row>
        </div>

        <div>
          <Row className='homePageOptionalinfoRow'>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', zIndex: '8'}}>Optional Info</div>
          </Row>
        </div>

      </div>
      <Footer />
    </div>
    </CSSTransition>
  );
}

export default Home;
