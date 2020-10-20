import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import rootReducer from './store/reducers';

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

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
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
          <RegionsProtected exact path='/getListings/region' isUserAuthenticated />
          <ListingsProtected exact path='/getlistings/listings' isUserAuthenticated />
          <ListingProtected path='/getListings/listings/:id' isUserAuthenticated />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
