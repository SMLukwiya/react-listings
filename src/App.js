import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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

// ant design
import 'antd/dist/antd.css';

function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
