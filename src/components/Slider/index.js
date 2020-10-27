import React, {useEffect, useRef, useState, useCallback} from 'react';
import { Image } from 'antd';

import './slider.css';
const arrow = require('../../assets/icons/arrow-white.svg');
const cancel = require('../../assets/icons/cancel-white.png');

const Slider = ({images, click}) => {
  const currentSlide = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [sliderCount, setSliderCount] = useState(1)

  useEffect(() => {
    setImageUrl(images[0].url)
    console.log('Ref', currentSlide.current.classList)
  }, [])

  const animateSlide = () => {
    currentSlide.current.classList.add('fadeIn');
    setTimeout(() => {currentSlide.current.classList.remove('fadeIn')}, 600);
  }

  const slideImage = (slide) => {
    setImageUrl(images[slide].url);
    animateSlide(currentSlide);
  }

  const goToNextSlide = () => {
    if (sliderCount > (images.length - 1)) {
      slideImage(0);
      setSliderCount(1)
    } else {
      slideImage(sliderCount);
      setSliderCount(sliderCount + 1);
    }
  }

  const goToPreviousSlide = () => {
    if (sliderCount < 0) {
      slideImage(images.length - 1);
      setSliderCount(images.length - 2);
    } else {
      slideImage(sliderCount);
      setSliderCount(sliderCount - 1);
    }
  }

  console.log('url',sliderCount)

  return (
    <div className='sliderContainer'>
      <div className='sliderPageClose' onClick={click}>
        <Image preview={false} src={arrow} className='sliderPageArrow1' />
        <Image preview={false} src={cancel} className='cancelIcon' />
        <Image preview={false} src={arrow} className='sliderPageArrow2' />
      </div>
      <div className='sliderImageContainer'>
        <div className='sliderLeftArrow' onClick={goToPreviousSlide}><Image preview={false} src={arrow} height='100%'/></div>
        <div ref={currentSlide} className='sliderImageContainer'><Image preview={false} src={imageUrl} height='90%' width='80%' /></div>
        <div className='sliderRightArrow' onClick={goToNextSlide}><Image preview={false} src={arrow} /></div>
      </div>
    </div>
  )
}

export default Slider;
