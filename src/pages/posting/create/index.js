import React, {useState, useEffect, useCallback } from 'react';
import { Row, Col, Image, Select } from 'antd';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import ImageUploading from 'react-images-uploading';
import { useSelector, useDispatch } from 'react-redux';
import { choose_listing } from '../../../store/actions';
import { checkValidity } from '../../../utils';

import './create.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Background from '../../../components/common/Background';
import AnimatedButton from '../../../components/common/Button/Animated';
const { Option } = Select;
const defaultImage = require('../../../assets/default.png');
const dropdownArrow = require('../../../assets/icons/arrow.svg');

const Create = (props) => {
  const [showPage, setShowPage] = useState(false);
  const listings = useSelector(state => state.listings);
  const { listing } = listings;

  const [state, setState] = useState(
    {
      category: listing.category ? listing.category : '',
      amount: listing.amount ? listing.amount : '',
      location: listing.location ? listing.location : '',
      availability: listing.availability ? listing.availability : '',
      aboutyou: listing.aboutyou ? listing.aboutyou : '',
      aboutspace: listing.aboutspace ? listing.aboutspace : '',
      rentalrequirements: listing.rentalrequirements ? listing.rentalrequirements : '',
      description: listing.description ? listing.description : '',
      images: listing.images.length ? listing.images : [],
      message: ''
    }
  );

  useEffect(() => {setShowPage(true)}, []);
  const dispatch = useDispatch();

  const handleChange = (e, type) => {
    setState({ ...state,
      [type]: e.target.value
    });
  }

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setState({...state, images: imageList});
  };

  const onChangeSelect = (value) => {
    console.log('select', value)
  }

  const isFormValid = state.title && state.description && state.images.length ? true : false;

  const onChooseListing = useCallback(() => {
    // if (isFormValid === false) return setState({...state, message: 'Fill all fields!'})

    dispatch(choose_listing(state.title, state.description, state.images));
    setTimeout(() => {
      props.history.push('/posting/howitworks/create/confirm')
    }, 1000);
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
        <Header color='#C1839F' />
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
                  <Col className='createPageEntryTitle'>category</Col>
                  <Col className='createPageInputContainer'>
                    <Select
                      defaultValue={state.category} style={{width: '100%'}}
                      onChange={onChangeSelect}
                      dropdownClassName='createPageInputContainer'
                      suffixIcon={customArrow}>
                      {[1,2,3,4,5].map((item, i) =>  (
                        <Option key={i} value={item}>{item}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Amount</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'amount')} className='createPageInput' value={state.amount}/></Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>location</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'location')} className='createPageInput' value={state.location}/></Col>
                </Row>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>Availability</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'availability')} className='createPageInput' value={state.availability}/></Col>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>About This You</div>
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
                  <Col className='createPageInputContainer'>
                    <Select
                      defaultValue=''
                      style={{width: '100%'}}
                      onChange={onChangeSelect}
                      dropdownClassName='createPageInputContainer'
                      suffixIcon={customArrow}>
                      {[1,2,3,4,5].map((item, i) =>  (
                        <Option key={i} value={item}>{item}</Option>
                      ))}
                    </Select>
                  </Col>
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
              <span>
                <AnimatedButton title='next' small color='#C1839F' click={onChooseListing} enabled={/*isFormValid*/ true} />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Create;
