import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Checkbox, Select, Image, Typography } from 'antd';
import {Link, Route, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import './listings.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';
import { fetchlistings } from '../../../store/actions';
import { houses, categories } from '../../../data';
const { Paragraph } = Typography;

const EXAMPLES = ['Exhibition Opportunities', 'Open Calls', 'Internships', 'Jobs', 'Services', 'Items for Sale, Rent or Barter E.t.c']

const Listings = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const state = useSelector(state => state.listings);
  const { listings } = state;

  useEffect(() => {
    setShowPage(true);
    fetchAllListings();
  }, [React])

  const dispatch = useDispatch()

  const fetchAllListings = useCallback(() => {
    dispatch(fetchlistings((error) => {
      if (error) return console.log(error);

      // console.log('Listings', listings)
    }))
  }, [dispatch, fetchlistings]);

  console.log('Listings', listings)

  const onCategorySelect = () => {
    console.log('should show')
    setShowCategory(!showCategory);
  }

  const Dropdown = () => (
    <CSSTransition
      in={showCategory}
      timeout={500}
      classNames='categoryModal-'
      unmountOnExit
      appear
    >
      <Row className='categoryContainer'>
        <Col xl={18} className='subCategoryContainer'>
          <p className='categoryTitle'>REAL ESTATE</p>
          <Row className='subCategoryContainer'>
          {categories.map(({category, list}, index) => (

              <Col xl={8} key={`category-${index}`}>
                <p className='subCategoryTitle'>{category}</p>
                <div>{list.map(({name, total}, index) => <p key={`name-${index}`} className='subCategoryText'>{name} ({total})</p>)}</div>
              </Col>

          ))}
          </Row>
        </Col>
        <Col xl={6}>
          <div style={{width: '2px', height: '100%', backgroundColor: '#00A8E8', position: 'absolute', marginLeft: '-10px'}}/>
          <p className='categoryTitle'>OPPORTUNITIES</p>
          <p className='subCategoryText'>These categories change each week depending on what is posted.</p>
          <div>
            <p className='subCategoryTitle'>Examples Include:</p>
            {EXAMPLES.map((example, index) => <p key={`example-${index}`} className='subCategoryText'>{example}</p>)}
          </div>
        </Col>
      </Row>
    </CSSTransition>
  );

  const House = ({id, image, rate, title, date, location, size, description, contact}) => (
    <div className='houseContainer'>
      <div className='houseImageContainer'>
        <Image src={image} preview={false} height='100%' width='100%' />
      </div>
      <div className='houseTextContainer'>
        <div className='houseTitleContainer'>
          <p className='houseTitleText'>{rate}/month</p>
          <div className='divider' style={{backgroundColor: '#00A8E8'}} />
          <p className='houseTitleText'>{title}</p>
        </div>
        <div className='houseSubtitleContainer'>
          <p className='houseSubtitleText'>{date}</p>
          <div className='divider' style={{backgroundColor: '#403D39'}} />
          <p className='houseSubtitleText'>{location}</p>
          <div className='divider' style={{backgroundColor: '#403D39'}} />
          <p className='houseSubtitleText'>{size}</p>
        </div>
        <Paragraph ellipsis={{rows: 3, expandable: true, onExpand: () => props.history.push('/'), symbol: 'see more'}} className='houseDescription'>{description}</Paragraph >
        <p className='houseContactText'>Contact Ssebitosil J at <span style={{color: '#00A8E8'}}>{contact}</span></p>
      </div>
    </div>
  )

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="allListings-"
      unmountOnExit>
      <div className='allListingsContainer'>
        <Background />
        <Header color='#00A8E8' fontSize={20} center />
        <Row className='allListingsRow'>
          <div className='regionContainer'>
            <div className='regionSelector'>
              <select defaultValue='najjera' >
                {[1,2,3,4,5].map((_, i) => <option key={i} value='najjera'>NAJJERA</option>)}
              </select>
            </div>
          </div>

          <div className='listingsCategory'>
            <div className='listingsCategoryHeader'>
              <div className='listingsCategoryTitle'>CHOOSE A CATEGORY</div>
              <div className='listingsDropdown' onClick={onCategorySelect}/>
              <Dropdown />
            </div>
            <p className='listingsCategoryTitle' style={showCategory ? {marginBottom: '-8px', transition: '.5s'} : null}>278 spaces in Najjera</p>
          </div>

            {houses.map(({id, image, title, rate, date, location, size, description, contact}, index) =>
            <div key={id} >
              <House image={image} rate={rate} title={title} date={date} location={location} size={size} description={description} contact={contact} />
              <div style={{height: '2px', width: '85%', backgroundColor: '#E2E2E1', margin: '10px 0 0 7%'}} />
            </div>
            )}

          <div className='bottomContainer'>
            <p className='bottonContentText' style={{color: '#00A8E8'}}>Subscribe</p>
            <div className='divider' style={{backgroundColor: '#403D39', marginTop: '-10px'}}/>
            <p className='bottonContentText' style={{color: '#C1839F'}}>Post a Space</p>
          </div>
        </Row>
      </div>
    </CSSTransition>
  )
}

const ListingsProtected = ({isUserAuthenticated, ...rest}) => {
  return (
    <Route {...rest}
      render={props => isUserAuthenticated ? <Listings {...props} /> : <Redirect to='/signin' />}
    />
  );
}

export default ListingsProtected;
