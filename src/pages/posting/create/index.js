import React, {useState, useEffect, useCallback } from 'react';
import { Row, Col, Image } from 'antd';
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
const defaultImage = require('../../../assets/default.png');

const Create = (props) => {
  const [showPage, setShowPage] = useState(false);
  const listings = useSelector(state => state.listings);
  const { listing } = listings;

  const [state, setState] = useState({title: listing.title ? listing.title : '', description: listing.description ? listing.description : '', images: listing.images.length ? listing.images : [], message: ''});

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

  const isFormValid = state.title && state.description && state.images.length ? true : false;

  const onChooseListing = useCallback(() => {
    // if (isFormValid === false) return setState({...state, message: 'Fill all fields!'})

    dispatch(choose_listing(state.title, state.description, state.images));
    setTimeout(() => {
      props.history.push('/posting/howitworks/create/confirm')
    }, 1000);
  },[dispatch, state, props.history])

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
          <Col span={2} className='createPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={18} className='createPageCol'>
            <div className='createPageTitle'>describe your space</div>
            <Row>
              <Col span={12}>
                <Row className='createPageEntryRow'>
                  <Col className='createPageEntryTitle'>name/title</Col>
                  <Col className='createPageInputContainer'><input onChange={(e) => handleChange(e, 'title')} className='createPageInput' value={state.title}/></Col>
                </Row>
                <Row>
                  <div className='createPageEntryTitle'>description</div>
                  <div className='createPageInputContainer'><textarea row={10} onChange={(e) => handleChange(e, 'description')} className='createPageTextBox' value={state.description}/></div>
                </Row>
              </Col>
              <Col span={12}>
                <ImageUploading
                  multiple
                  value={state.images}
                  onChange={onChange}
                  maxNumber={6}
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
                          imageList.slice(0, 4).map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image['data_url']} className='createPageImageInput' />
                              <div className="image-item__btn-wrapper">
                                <button className='imageButton' onClick={() => onImageUpdate(index)}>Update</button>
                                <button className='imageButton' onClick={() => onImageRemove(index)}>Remove</button>
                              </div>
                            </div>
                          ))
                          ) : (
                            [1,2,3,4].map((item) => (
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
                <AnimatedButton title='next' small color='#C1839F' click={onChooseListing} enabled={isFormValid} />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  )
}

export default Create;
