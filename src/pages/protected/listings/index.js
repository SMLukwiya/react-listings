import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Checkbox, Select, Image, Typography, Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {Link, Route, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import './listings.css';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import BackButton from '../../../components/common/BackButton';
import Button from '../../../components/common/Button';
import Background from '../../../components/common/Background';
import CustomArrow from '../../../components/common/CustomArrow';
import { fetchlistings } from '../../../store/actions';
import { moneyFormatter } from '../../../utils';
import { houses, categories, regions, sorting } from '../../../data';
const { Paragraph } = Typography;

const EXAMPLES = ['Exhibition Opportunities', 'Open Calls', 'Internships', 'Jobs', 'Services', 'Items for Sale, Rent or Barter E.t.c']

const Listings = (props) => {
  const [showPage, setShowPage] = useState(false);
  const [state, setState] = useState({ region: 'REGION', category: 'CHOOSE A CATEGORY', search: '', sortBy: 'SORT BY' });
  const allListings = useSelector(state => state.listings);
  const { listings } = allListings;

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

  const onSelectChange = (...rest) => {
    if (rest.length === 1) {
      setState({ ...state, sortBy: rest[0] })
    } else {
      if (rest[1] === 'category') {
        setState({ ...state, category: rest[0] });
      } else {
        setState({ ...state, region: { name: rest[0], total: rest[1] } });
      }
    }
  }

  const Regions = () => (
    <Row className='regionsOptionContainer'>
      <p className='regionsOptionTitle'>KAMPALA</p>
      {regions.map(({name, total}, i) => (
        <Col key={i} xl={5}><p className='regionOptionText' onClick={() => onSelectChange(name, total)}>{name} ({total})</p></Col>
      ))}
    </Row>
  )

  const Dropdown = () => (
      <Row className='categoryContainer'>
        <Col xl={18} className='subCategoryContainer'>
          <p className='categoryTitle'>REAL ESTATE</p>
          <Row className='subCategoryContainer'>

          {categories.map(({category, list}, index) => (
              <Col xl={8} key={`category-${index}`}>
                <p className='subCategoryTitle'>{category}</p>
                <div>{list.map(({name, total}, index) => <p key={`name-${index}`} className='subCategoryText' onClick={() => onSelectChange(name, 'category')}>{name} ({total})</p>)}</div>
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
  );

  const Sorting = () => (
    <Row className='regionsSortingContainer'>
      {sorting.map((item, i) => (
        <Col key={i} xl={24}><p className='regionSortingText' onClick={() => onSelectChange(item)}>{item}</p></Col>
      ))}
    </Row>
  )

  const House = ({property_id, images, rate, amount, title, created_at, location, size, description, contact}) => (
    <div className='houseContainer' onClick={() => props.history.push(`/getListings/listings/${property_id}`)}>
      <div className='houseImageContainer'>
        <Image src={images[0]} preview={false} height='100%' width='100%' />
      </div>
      <div className='houseTextContainer'>
        <div className='houseTitleContainer'>
          <p className='houseTitleText'>{moneyFormatter(amount)}/{rate}</p>
          <div className='divider' style={{backgroundColor: '#00A8E8'}} />
          <p className='houseTitleText'>{title}</p>
        </div>
        <div className='houseSubtitleContainer'>
          <p className='houseSubtitleText'>{created_at}</p>
          <div className='divider' style={{backgroundColor: '#403D39'}} />
          <p className='houseSubtitleText'>{location}</p>
          <div className='divider' style={{backgroundColor: '#403D39'}} />
          <p className='houseSubtitleText'>{size}</p>
        </div>
        <Paragraph ellipsis={{rows: 3, expandable: true, onExpand: () => {}, symbol: 'see more'}} className='houseDescription'>{description}</Paragraph >
        <p className='houseContactText'>Contact Ssebitosil J at <span style={{color: '#00A8E8'}}>{contact}</span></p>
      </div>
    </div>
  );

  const SearchIcon = () => (
    <div className='searchIcon'>
      <SearchOutlined height='100%' width='100%' />
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
        <Header color='#00A8E8' fontSize={20} center version='find'/>
        <Row className='allListingsRow'>
          <div className='regionContainer'>
            <div className='regionSelector'>
              <Select
                value={state.region.name}
                defaultValue='REGION'
                style={{
                  width: '100%', height: '100%', backgroundColor: '#F5F5F5', borderRadius: '20px', textAlign:'center', fontSize: '15px', fontFamily: 'ITCAvantGardeStdMedium'
                }}
                dropdownStyle={{backgroundColor: 'transparent', padding: 0, marginTop: '10px', width: '40%'}}
                suffixIcon={<CustomArrow />}
                dropdownRender={Regions}
                dropdownMatchSelectWidth={false}
                bordered={false}
              />
            </div>
            <div style={{width: '240px', height: '26px'}}>
            <Select
              style={{
                width: '100%', height: '100%', backgroundColor: '#F5F5F5', textAlign:'center', fontSize: '14px', fontFamily: 'ITCAvantGardeStdMedium',
              }}
              dropdownStyle={{backgroundColor: 'transparent', padding: 0, marginTop: '10px'}}
              placeholder={<div className='listingsCategoryTitle'>CHOOSE A CATEGORY</div>}
              suffixIcon={<CustomArrow />}
              dropdownRender={Dropdown}
              dropdownMatchSelectWidth={false}
              bordered={false}
              value={state.category.toUpperCase()}
              disabled={!state.region.name}
            />
            </div>
            <div className='regionSelector'>
              <Input
                style={{}}
                suffix={<SearchIcon />}
                bordered={false}
               />
            </div>
            {(state.region.total && state.category === 'CHOOSE A CATEGORY') && <div>
              <p className='listingsCategoryTitle'>{state.region.total} spaces in <span style={{textTransform: 'capatalize'}}>{state.region.name}</span></p>
            </div>}
            {(state.region.total && state.category !== 'CHOOSE A CATEGORY') && (
              <div style={{width: '200px', height: '26px'}}>
                <Select
                  style={{
                    width: '100%', height: '100%', backgroundColor: '#F5F5F5', textAlign:'center', fontSize: '14px', fontFamily: 'ITCAvantGardeStdMedium',
                  }}
                  dropdownStyle={{backgroundColor: 'transparent', paddingTop: 0, margin: 0}}
                  suffixIcon={<CustomArrow />}
                  dropdownRender={Sorting}
                  dropdownMatchSelectWidth={false}
                  bordered={false}
                  value={state.sortBy.toUpperCase()}
                />
              </div>
            ) }
          </div>

          <div style={{height: '2px', backgroundColor: '#00A8E8', width: '85%', marginTop: '25px'}}/>

            {houses.map(({property_id, images, title, rate, amount, created_at, location, region, size, about_space, contact}, index) =>
              <div key={property_id} className='housesContainer' >
                <House property_id={property_id} images={images} rate={rate} amount={amount} title={title} created_at={created_at} location={location} region={region} size={size} description={about_space} contact={contact} />
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
