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
import { moneyFormatter } from '../../../utils';
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
  let house = houses.find(item => item.property_id.toString() === props.match.params.id)

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
        <Image src={image} preview={false} height='100%' width='98%' />
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
        <Header color='#00A8E8' version='find' />
        <Row className='eachListingRow'>
          <Row className='' gutter={[8, 16]}>
            {[{image: house1},{image: house2},{image: house3}].map(({image}, i) =>
              <Col md={8} lg={8} xl={8} className='listingImageContainer' key={i}>
                <Image src={image} preview={false} height="100%" width='100%' />
              </Col>
            )}
            <div style={{height: '40px', position: 'absolute', right: 25, top: '52%' }}>
              <Button title='View Photos' color='#00A8E8' small fontSize={15} enabled click={onViewPhotosClick}/>
            </div>
          </Row>
          <Col className='eachListingConfirmCol'>
            <p className='listingsCategoryText'>{house.category}</p>
            <p className='listingTitleText'>{house.title}</p>
            <div style={{width: '100%', height: '2px', backgroundColor: '#00A8E8', marginTop: '-15px', marginBottom: '40px'}} />
            <div className='listingDetailContainerStyle'>
              <div className='listingDetailLeftContent'>
                <p className='listingDetailTitle'>UGX {moneyFormatter(house.amount)}/{house.rate}</p>
                <div style={{width: '100%', height: '1px', backgroundColor: '#E2E2E1', marginTop: '-5px', marginBottom: '5px'}} />
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>LOCATION</p>
                  <p className='listingDetailMiniSubText'>{house.location}, {house.region}</p>
                </div>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailMiniText'>Available</p>
                  <p className='listingDetailMiniSubText'>{house.created_at}</p>
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
                  {house.about_space}
                </p>
                <p className='listingDetailTitle' style={{marginTop: '40px'}}>ABOUT THIS LISTER</p>
                <p className='listingDetailDescription'>
                  {house.about_lister}
                </p>
                <div className='listingDetailMiniContainer'>
                  <p className='listingDetailTitle'>RENTAL REQUIREMENTS</p>
                  <p className='listingDetailMiniSubText' >Sublet Agreement</p>
                  <p className='listingDetailMiniSubText'>Security Deposit (full rent)</p>
                  <p className='listingDetailMiniSubText'>First Months Rent</p>
                </div>

                <div className='listingDetailMiniContainer' style={{marginTop: '40px'}}>
                  <p className='listingDetailTitle'>CONTACT</p>
                  <p className='listingDetailDescription' style={{marginTop: '-10px'}}>Contact Ssebitosii J at <span style={{color: '#00A8E8'}}>{house.contact}</span></p>
                </div>
              </div>
            </div>
            <div style={{width: '100%', height: '2px', backgroundColor: '#E2E2E1', marginBottom: '60px'}} />
            <div style={{width: '100%', height: '2px', backgroundColor: '#E2E2E1', marginBottom: '20px'}} />
            <div>
              <p className='listingFeaturedTitle'>This Week's Featured Listings</p>
              <div className='listingFeaturedImageContainer'>
                {houses.slice(0, 4).map(({images, category, title, region}) => <Featured image={images[0]} category={category} title={title} region={region} />)}
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

        <CSSTransition
          in={previewImage}
          timeout={600}
          classNames="previewImage-"
          unmountOnExit
          appear
        >
          <Slider images={preview} click={onViewPhotosClick} />
        </CSSTransition>
        {/*previewImage && <Slider images={preview} click={onViewPhotosClick} />*/}
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
