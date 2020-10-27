import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Image } from 'antd';
import {Link, Route, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import './listing.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';
import Slider from '../../../components/Slider';
import { fetchsinglelisting } from '../../../store/actions';
import {houses} from '../../../data';
const house1 = require('../../../assets/sample_house/house1.jpg');
const house2 = require('../../../assets/sample_house/house2.jpg');
const house3 = require('../../../assets/sample_house/house3.jpg');

const preview = [{url: house1}, {url: house2}, {url: house3}, {url: house1}, {url: house2}]

const Listing = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const state = useSelector(state => state.listings);
  const { listings } = state;

  const dispatch = useDispatch();
  useEffect(() => {
    setShowPage(true)
  }, [React]);

  const fetchListing = useCallback(() => {
    if (listings.length) {
      listings.find(item => item.property_id === props.match.params.id)
    } else {
      dispatch(fetchsinglelisting(props.match.params.id, error => {
        if (error) return console.log(error);
      }))
      }
    }, [dispatch, props.match.params.id]);

    const onViewPhotosClick = () => {
      setPreviewImage(!previewImage);
    }

    const Featured = ({image, category, title, region}) => (
      <div className='featuredContainer'>
        <Image src={image} preview={false} height='100%' width='97%' />
        <div style={{width: '97%', height: '1px', backgroundColor: '#E2E2E1', marginTop: '10px', marginBottom: '10px'}}/>
        <p className='featuredCategoryTitle'>{category} | {region}</p>
        <p className='featuredCategoryText'>{title}</p>
      </div>
    )

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="eachListing-"
      unmountOnExit>
      <div className='eachListingContainer'>
        <Background />
        <Header color='#C1839F' />
        <Row className='eachListingRow'>
          <Row className=''>
            {[{image: house1},{image: house2},{image: house3}].map(({image}, i) =>
              <Col md={8} lg={8} xl={8} className='listingImageContainer'>
                <Image src={image} preview={false} height="100%" width='98%' />
              </Col>
            )}
            <div style={{height: '40px', position: 'absolute', right: 25, top: '52%' }}>
              <Button title='View Photos' color='#00A8E8' small fontSize={15} enabled click={onViewPhotosClick}/>
            </div>
          </Row>
          <Col className='eachListingConfirmCol'>
            <p className='listingsCategoryText'>APARTMENT FOR RENT</p>
            <p className='listingTitleText'>Brand New 1.5 Bedroom Apartment with Outdoor Space</p>
            <div style={{width: '100%', height: '2px', backgroundColor: '#00A8E8', marginTop: '-15px', marginBottom: '40px'}} />
            <div className='listingDetailContainerStyle'>
              <div className='listingDetailLeftContent'>
                <p className='listingDetailTitle'>UGX 750,000/month</p>
                <div style={{width: '100%', height: '1px', backgroundColor: '#E2E2E1', marginTop: '-5px', marginBottom: '5px'}} />
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>LOCATION</p>
                  <p className='listingDetailMiniSubText'>Martin Road, Najjera</p>
                </div>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>Available</p>
                  <p className='listingDetailMiniSubText'>September 27, 2020</p>
                </div>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>NEIGHBOURHOOD</p>
                  <p className='listingDetailMiniSubText'>Walkable distance from closest taxi/boda stage, 25 minutes from Kampala City</p>
                </div>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>SIZE</p>
                  <p className='listingDetailMiniSubText'>750 sq ft</p>
                </div>
              </div>

              <div className='listingDetailRightContent'>
                <p className='listingDetailTitle'>ABOUT THIS SPACE</p>
                <p className='listingDetailDescription'>
                  Welcome to the loft! This beautifully decorated, light-filled space is everything you'd want to get out of a real NY experience. Dreamy layout with ample space perfect for a couple or roommates. <br />Located in the HEART of Williamsburg! 10 min train ride to Manhattan. This is an open 1100sq ft loft space. The living room has large windows that let in a lot of light. The kitchen has all basic cooking supplies & tools. Open to doing short or long term rental. This is a two bedroom apartment. One room is fully enclosed with natural light. It can easily fit a queen size bed.<br /> The other room is semi enclosed and has huge closets and can fit a king size bed, or great for an office/ studio. Lots of closet space! Great for a couple or roommates! Apartment can come furnished OR partially un-furnished! Email me and we can talk further depending on length of stay! <br />Dogs are welcome on a case by case basis. We'd like to sublet starting in mid November or December 1st. Minimum two month stay or longer. Rent is $4500 + utilities (which can run anywhere from $150-$250)<br /> This is already a discounted price but due to Covid please feel free to offer any reasonable amount. Don't hesitate to email me with any questions. Thank you!
                </p>
                <p className='listingDetailTitle' style={{marginTop: '40px'}}>ABOUT THIS LISTER</p>
                <p className='listingDetailDescription'>
                  Hi I'm Su- I've been living in NY for the past 15 years. I'm reliable, clean, and will be there if you need me for any reason. I graduated from Parsons the New School for Design and own my own two shops in Brooklyn. I absolutely love this apartment and plan on moving back in the future. Just need to take a little break and looking for reliable and good tenants. I'll be showing you the space.
                </p>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailTitle'>RENTAL REQUIREMENTS</p>
                  <p className='listingDetailMiniSubText' >Sublet Agreement</p>
                  <p className='listingDetailMiniSubText'>Security Deposit (full rent)</p>
                  <p className='listingDetailMiniSubText'>First Months Rent</p>
                </div>

                <div className='listingDetailMiniContainer' style={{marginTop: '40px'}}>
                  <p className='listingDetailTitle'>CONTACT</p>
                  <p className='listingDetailDescription' style={{marginTop: '-10px'}}>Contact Ssebitosii J at <span style={{color: '#00A8E8'}}>oikiujyh-bnwtchlq@on.propertylistings.com</span></p>
                </div>
              </div>
            </div>
            <div style={{width: '100%', height: '2px', backgroundColor: '#E2E2E1', marginBottom: '60px'}} />
            <div style={{width: '100%', height: '2px', backgroundColor: '#E2E2E1', marginBottom: '20px'}} />
            <div>
              <p className='listingFeaturedTitle'>This Week's Featured Listings</p>
              <div className='listingFeaturedImageContainer'>
                {houses.slice(0, 4).map(({image, category, title, region}) => <Featured image={image} category={category} title={title} region={region} />)}
              </div>
            </div>
          </Col>
          <div className='bottomContainer' style={{marginTop: '150px', marginRight: '15%'}}>
            <p className='bottonContentText' style={{color: '#00A8E8'}}>Subscribe</p>
            <div className='divider' style={{backgroundColor: '#403D39', marginTop: '-10px'}}/>
            <p className='bottonContentText' style={{color: '#C1839F'}}>Post a Space</p>
          </div>
        </Row>
        <div className='cookieContainer'>
          <p className='cookieNotification'>We use cookies for key functions of our site. For more information, read our <a href='#'>Cookie Policy</a> <span className='cookieButton'>Ok, got it</span></p>
        </div>
        {previewImage && <Slider images={preview} click={onViewPhotosClick} />}
      </div>
    </CSSTransition>
  )
}

const ListingProtected = ({isUserAuthenticated, ...rest}) => {
  return (
    <Route {...rest}
      render={props => isUserAuthenticated ? <Listing {...props} /> : <Redirect to='/signin' />}
    />
  );
}

export default ListingProtected;
