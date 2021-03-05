// TRY USER AUTOLOGIN
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withCookies, Cookies, useCookies } from 'react-cookie';
import axios from 'axios';

import { autoLogin, choose_listing_type, choose_listing } from './store/actions';

// Pages
import Home from './pages/Home';
import Signin from './pages/signin'
import Confirm from './pages/confirm';
import FAQs from './pages/faqs';
import Payment from './pages/payment';
import Posting from './pages/posting';
import CreateListing from './pages/posting/create';
import ConfirmListing from './pages/posting/confirm';
import HowPostingWorks from './pages/posting/howPostingWorks';
import Congrats from './pages/congrats';
import FindAListing from './pages/finding';
import Finish from './pages/finish';
import RegionsProtected from './pages/protected/regions';
import ListingsProtected from './pages/protected/listings';
import ListingProtected from './pages/protected/listing';

// ant design
import 'antd/dist/antd.css';

export const axiosInstance = axios.create({
  baseURL: 'https://listings.ubunifu.systems/api/v1/',
  // timeout: 1000
})

function Main(props) {
  const user = useSelector(state => state.user);
  const {user: { loggedIn, token }} = user;
  const dispatch = useDispatch();

  useEffect(() => {
    const { cookies } = props;

    if (cookies.get('p-listings_started_posting') === 'true') {
      const type = cookies.get('p-listings_listing_type') ? cookies.get('p-listings_listing_type') : '';
      const category = cookies.get('p-listings_listing_category') ? cookies.get('p-listings_listing_category') : '';
      const title =  cookies.get('p-listings_listing_title') ? cookies.get('p-listings_listing_title') : '';
      const region = cookies.get('p-listings_listing_region') ? cookies.get('p-listings_listing_region') : '';
      const amount = cookies.get('p-listings_listing_amount') ? cookies.get('p-listings_listing_amount') : '';
      const rate = cookies.get('p-listings_listing_rate') ? cookies.get('p-listings_listing_rate') : '';
      const location = cookies.get('p-listings_listing_location') ? cookies.get('p-listings_listing_location') : '';
      const availability = cookies.get('p-listings_listing_availability') ? cookies.get('p-listings_listing_availability') : '';
      const aboutyou = cookies.get('p-listings_listing_aboutLister') ? cookies.get('p-listings_listing_aboutLister') : '';
      const aboutspace = cookies.get('p-listings_listing_aboutSpace') ? cookies.get('p-listings_listing_aboutSpace') : '';
      const rentalrequirements = cookies.get('p-listings_listing_rentalRequirement') ? cookies.get('p-listings_listing_rentalRequirement') : '';
      const images = cookies.get('p-listings_listing_images') ? cookies.get('p-listings_listing_images') : [];

      dispatch(choose_listing_type(type, category));
      dispatch(choose_listing(title, aboutspace, region, location, amount, rate, availability, aboutyou, rentalrequirements, images));
    }

    const userToken = cookies.get('p-listings_user__username');
    const userRole = cookies.get('p-listings_user__code');

    if (userToken && userRole) {
      dispatch(autoLogin(userToken, userRole));
    }

  }, []);

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/faqs" component={FAQs} />
          <Route exact path="/posting" component={Posting} />
          <Route exact path="/posting/howitworks" component={HowPostingWorks} />
          <Route exact path="/posting/howitworks/create" component={CreateListing} />
          <Route exact path="/posting/howitworks/create/confirm" component={ConfirmListing} />
          <Route exact path="/post/howitworks/create/confirm/payment" component={Payment} />
          <Route path="/post/howitworks/create/confirm/payment/finish" component={Finish} />
          <Route  exact path="/finding" component={FindAListing} />
          <Route path="/finding/congrats" component={Congrats} />
          <Route path="/finish" component={Finish} />
          <RegionsProtected exact path='/getListings/region' isUserAuthenticated={token} />
          <ListingsProtected exact path='/getlistings/listings' isUserAuthenticated={true} />
          <ListingProtected path='/getListings/listings/:id' isUserAuthenticated={true} />
        </Switch>
      </Router>
  );
}

export default withCookies(Main);
