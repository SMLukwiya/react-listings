import React, {useState, useEffect, useCallback } from 'react';
import { Row, Col, Image, Select, Radio, Spin } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import ImageUploading from 'react-images-uploading';
import {  withCookies, useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { choose_listing, postlisting, setPaymentDetails } from '../../../store/actions';
import { checkValidity } from '../../../utils';

import './create.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Background from '../../../components/common/Background';
import Button from '../../../components/common/Button';
const { Option } = Select;
const defaultImage = require('../../../assets/default.png');
const dropdownArrow = require('../../../assets/icons/arrow.svg');

const rates = [
  {name: 'Monthly', value: 'month'},
  {name: 'Weekly', value: 'week'},
  {name: 'Daily', value: 'day'},
  {name: 'Hourly', value: 'hour'}
]

const regions = [
  {name: 'Central', value: 'central'}
]

const locations_central = [
  {name: 'Kawempe', value: 'kawempe'},
  {name: 'Bukoto', value: 'bukoto'},
  {name: 'Naalya', value: 'naalya'},
  {name: 'Kisaasi', value: 'kisaasi'},
  {name: 'Munyonyo', value: 'munyonyo'},
  {name: 'Wandegeya', value: 'wandegeya'}
];

const Create = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const listings = useSelector(state => state.listings);
  const { listing } = listings;

  const [state, setState] = useState(
    {
      title: listing.title ? listing.title : '',
      region: listing.region ? listing.region : '',
      amount: listing.amount ? listing.amount : '',
      rate: listing.rate ? listing.rate : '',
      location: listing.location ? listing.location : '',
      availability: listing.availability ? listing.availability : '',
      aboutyou: listing.about_lister ? listing.about_lister : '',
      aboutspace: listing.description ? listing.description : '',
      rentalrequirements: listing.rental_requirements ? listing.rental_requirements : '',
      contact: listing.contact ? listing.contact : '',
      images: listing.images.length ? listing.images : [],
      message: ''
    }
  );

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const handleChange = (e, type) => {
    e.preventDefault();
    type === 'amount' ? e.target.value = e.target.value.replace(/[^\w\s]/gi, '') : e.target.value = e.target.value;
    setState({ ...state,
      [type]: e.target.value
    });
  }

  const onChange = (imageList, addUpdateIndex) => {
    setState({...state, images: imageList});
  };

  const onChangeSelect = (value, type) => {
    setState({
      ...state,
      [type]: value
    })
  }

  const isFormValid = state.amount && state.rate && state.location && state.availability && state.aboutyou && state.aboutspace && state.rentalrequirements && state.contact && state.images.length ? true : false;

  // save to cookie except for images.
  const saveListing = () => {
    setCookie('p-listings_listing_title', state.title, {path: '/'});
    setCookie('p-listings_listing_region', state.region, {path: '/'});
    setCookie('p-listings_listing_amount', state.amount, {path: '/'});
    setCookie('p-listings_listing_rate', state.rate, {path: '/'});
    setCookie('p-listings_listing_location', state.location, {path: '/'});
    setCookie('p-listings_listing_availability', state.availability, {path: '/'});
    setCookie('p-listings_listing_aboutLister', state.aboutyou, {path: '/'});
    setCookie('p-listings_listing_aboutSpace', state.aboutspace, {path: '/'});
    setCookie('p-listings_listing_rentalRequirement', state.rentalrequirements, {path: '/'});
    setCookie('p-listings_listing_contact', state.contact, {path: '/'});
    setCookie('p-listings_listing_images', state.images, {path: '/'});
  };

  const removeListings = () => {
    removeCookie('p-listings_started_posting');
    removeCookie('p-listings_listing_category');
    removeCookie('p-listings_listing_title');
    removeCookie('p-listings_listing_region');
    removeCookie('p-listings_listing_amount');
    removeCookie('p-listings_listing_rate');
    removeCookie('p-listings_listing_location');
    removeCookie('p-listings_listing_availability');
    removeCookie('p-listings_listing_aboutLister');
    removeCookie('p-listings_listing_aboutSpace');
    removeCookie('p-listings_listing_rentalRequirement');
    removeCookie('p-listings_listing_contact');
    removeCookie('p-listings_listing_images');
  }

  const onChooseListing = useCallback(() => {
    if (isFormValid === false) return setState({...state, message: 'Please fill all fields!'})

    saveListing();

    dispatch(postlisting(state.title, state.aboutspace, state.region, state.location, state.amount, state.rate, state.availability, state.aboutyou, state.rentalrequirements, state.contact, state.images, (err, property_id) => {
      if (err) {
        console.log('Failed')
        return console.log(err);
      } else {
        console.log('Success', property_id)
        setCookie(`p-listings_listings_id_${property_id}`, property_id, {path: '/'});

        removeListings();

        setTimeout(() => {
          props.history.push('/posting/howitworks/create/confirm')
        }, 1000);
      }

    }));
  },[dispatch, state, props.history])

  const customArrow = () => (
    <div style={{ marginTop: '-10px', marginLeft: '-10px',height: '20px', width: '20px', backgroundColor: ''}}>
      <Image preview={false} src={dropdownArrow} height="100%" width="100%" style={{transform: `rotate(-90deg)`}}/>
    </div>
  )

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="createPage-"
      unmountOnExit>
      <div className='createPageContainer'>
        <Background />
        <Header color='#C1839F' version='post' />
        <Row className='createPageRow'>
          <Col span={4}>
            <Menu history={props.history} />
          </Col>
          <Col span={1} className='createPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={19} className='createPageCol'>
            <div className='createPageTitle'>describe your space</div>
            <Row>
              <Col span={12}>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Title</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'title')} className='createPageInput' value={state.title}/></Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Region</Col>
                  <Col className='createPageInputContainer'>
                    <Select
                      defaultValue=''
                      value={state.region}
                      style={{width: '100%'}}
                      onChange={(e) => onChangeSelect(e, 'region')}
                      dropdownClassName='createPageInputContainer'
                      suffixIcon={customArrow}>
                      {regions.map(({name, value}, i) =>  (
                          <Option key={name} value={value}>{name}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Amount</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'amount')} className='createPageInput' value={state.amount}/></Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Rate</Col>
                  <Col className='createPageInputContainer'><Radio.Group onChange={(e) => handleChange(e, 'rate')} value={state.rate}>{rates.map(({value,name}) => <Radio key={value} value={value}>{name}</Radio>)}</Radio.Group></Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Location</Col>
                  <Col className='createPageInputContainer'>
                    <Select
                      defaultValue=''
                      value={state.location}
                      style={{width: '100%'}}
                      onChange={(e) => onChangeSelect(e, 'location')}
                      dropdownClassName='createPageInputContainer'
                      suffixIcon={customArrow}>
                      {locations_central.map(({name, value}, i) =>  (
                        <Option key={name} value={value}>{name}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Availability</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'availability')} className='createPageInput' value={state.availability}/></Col>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>About You</div>
                  <div className='createPageInputContainer'><textarea row={10} onChange={(e) => handleChange(e, 'aboutyou')} className='createPageTextBox' value={state.aboutyou}/></div>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>About This Space</div>
                  <div className='createPageInputContainer'><textarea row={10} onChange={(e) => handleChange(e, 'aboutspace')} className='createPageTextBox' value={state.aboutspace}/></div>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>Rental Requirements</div>
                  <div className='createPageInputContainer'><textarea row={10} onChange={(e) => handleChange(e, 'rentalrequirements')} className='createPageTextBox' value={state.rentalrequirements}/></div>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>contact</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'contact')} className='createPageInput' value={state.contact}/></Col>
                  {state.message && <span style={{textAlign: 'center', marginTop: '15px', color: 'red', fontSize: 14, fontFamily: 'ITCAvantGardeNormal'}}>{state.message}</span>}
                </Row>
              </Col>
              <Col span={12}>
                <ImageUploading
                  multiple
                  value={state.images}
                  onChange={onChange}
                  maxNumber={8}
                  dataURLKey="data_url"
                >
                  {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging,dragProps, }) => (

                    <Row className='createPageEntryRow'>
                      <Col className='createPageEntryTitle'>
                        <span>images</span>
                        <button
                          className='createPageButtons'
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps} >
                          Add images
                        </button>
                        <button
                          className='createPageButtons'
                          onClick={onImageRemoveAll}>Remove images</button>
                      </Col>
                      <Col className='createPageImageContainer'>
                        {imageList.length ? (
                          imageList.slice(0, 6).map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image['data_url']} className='createPageImageInput' />
                              <div className="image-item__btn-wrapper">
                                <button className='imageButton' onClick={() => onImageUpdate(index)}>Update</button>
                                <button className='imageButton' onClick={() => onImageRemove(index)}>Remove</button>
                              </div>
                            </div>
                          ))
                          ) : (
                            [1,2,3,4,5,6].map((item) => (
                              <div key={item} className="image-item">
                                <img src={defaultImage} className='createPageImageInput' />
                              </div>
                            ))
                          )
                        }

                      </Col>
                  </Row>
                  )}
                </ImageUploading>
              </Col>
            </Row>
            <div className='createPageButtonContainer'>
              <Spin tip='loading..' spinning={listings.loading}>
                <Button title='post my listing' small color='#C1839F' click={onChooseListing} enabled={true} />
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default (Create);
