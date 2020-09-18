import React from 'react';
import { Row, Col } from 'antd';

import classes from './faqs.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Tile from '../../components/common/Tile';
import BackButton from '../../components/common/BackButton';
import Question from '../../components/common/Question';
import Footer from '../../components/Footer';

const pencil = require('../../assets/icons/pencil.svg');
const news = require('../../assets/icons/calender.svg');
const email = require('../../assets/icons/eye.svg');
const find = require('../../assets/icons/check.svg');
const chat = require('../../assets/icons/chatbubble.svg');
const clock = require('../../assets/icons/clockicon.svg');
const emailFrom = require('../../assets/icons/emailfromus.svg');
const form = require('../../assets/icons/form.svg');
const defaultImage = require('../../assets/default.png')

const howItWorksGet = [
  {
    title: 'Sign up',
    image: pencil,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Get the Newsletter',
    image: news,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Read your email',
    image: email,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  },
  {
    title: 'Find what you"re looking for',
    image: find,
    description: 'Post your listings by Friday; fees increase after 10am ET'
  }
];

const howItWorksPost = [
  {
    title: 'Fill out the form',
    image: form,
    description: 'Post a listing by Friday and pay the fee. Create an account for easy reposting and editing.'
  },
  {
    title: 'Post by the Deadlines',
    image: clock,
    description: 'Fees increase after 10am ET Friday. Listings appear in the order they are received and expire after one week.'
  },
  {
    title: 'Get an email from us',
    image: emailFrom,
    description: 'We personally read your listings and correspond with you.'
  },
  {
    title: 'Find what you"re looking for',
    image: chat,
    description: 'Check your inbox for emails from interested listers'
  }
];

const faqs1 = [
  {
    title: 'General Info for Subscribers',
    questions: [
      'How do I receive The Property Listings newsletter?',
      'What is The Property Listings?',
      'Who can subscribe?',
      'When does the list go out?',
      'Are you personally emailing me?',
      'Can I share my Listings Project Story?'
    ]
  },
  {
    title: 'Troubleshooting for Subscribers',
    questions: [
      'I just subscribed. Where\'s my list?',
      'Why didn\'t I get the list this week?'
    ]
  },
  {
    title: 'General Info for Posting a Listing',
    questions: [
      'What am I being asked to create an account?',
      'What\'s in my Property Listings account?',
      'Who can post a listing?',
      'When is a good time to post a listing?',
      'How much does it cost to post a listing?'
    ]
  },
  {
    title: 'Deadlines for Listers',
    questions: [
      'When is the deadline to post each week?',
      'I missed the Friday 10am EDT deadline. Can my listing still be included in this week\'s list?',
      'What if I submit after the deadline and I don\'t want to pay the extended deadline fee?'
    ]
  }
];

const faqs2 = [
  {
    title: 'Real Estate Listings',
    questions: [
      'What goes in "Real Estate"?',
      'What should I write in the Headline?',
      'What should I write in the description?'
    ]
  },
  {
    title: 'Opportunities Listings',
    questions: [
      'What goes in "Opportunities"?',
      'What should I write in the Headline?',
      'What should I write in the Description?'
    ]
  },
  {
    title: 'Editing, Relisting & Deleting',
    questions: [
      'When does my listing expire?',
      'How do I repost my listing?',
      'Do you edit my listing?',
      'How do I edit my listing after submitting?',
      'What if I rent out my space while my listing is active?',
      'Can I delete my account?',
      'Do you offer refunds?'
    ]
  }
];

const faqs3 = [
  {
    title: 'Troubleshooting for Listers',
    questions: [
      'Why should I create an account?',
      'What are alias emails and how do they work?',
      'How do I know you received my listing?'
    ]
  },
  {
    title: 'Advertising',
    questions: [
      'What kinds of ads appear on Listings Project?',
      'How do I advertise?'
    ]
  },
  {
    title: 'About Listings Project',
    questions: [
      'How did The Property Listings begin?',
      'Is this an art project?',
      'Who is Brian Ssennoga and who works at The Property Listings?',
      'How has Listings Projects evolved?'
    ]
  },
  {
    title: 'Privacy & Policies',
    questions: [
      'Do you sell my email address?',
      'Do you post links to other real estate and listings websites?',
      'What if a broker contacts me about my listing?',
      'What if I\'m also showing my space with a broker/manager?',
      'Read our Terms of Use. Privacy Policy, and Refund Policy'
    ]
  }
];

const otherFaqs = [
  {
    title: 'General Info for Subscribers',
    questions: [
      {
        question: 'Why am I being asked to create an account?',
        answer: 'You need an account to post a listing on The Property Listings.'
      },
      {
        question: 'What\'s in my Property Listings account?',
        answer: 'With an account, you can edit, preview, and repost your listing. You can also check on the status of your listing. View listing inquiries and remove your listing from the live newsletter. Subscription preferences, contact preferences and listings receipts can also be found here.'
      },
      {
        question: 'Who can post a listing?',
        answer: 'Anyone can post on The Property Listings except for: brokers, apartment managers, listings with fees or spaces that are also offered by any third-party services.'
      },
      {
        question: 'What can I post?',
        answer: 'You can post a Real Estate or Opportunities listing on The Property Listings. Real Estate listings include: spaces for rent, swap, share, sublet, sale, housesitting, events or seeking. Opportunities listings are anything that is not real-estate related including but not limited to: items or services for sale, seeking services, jobs, internship, volunteer opportunities, open calls etc. You create your own category in the Opportunities section.'
      },
      {
        question: 'When is a good time to post a listing?',
        answer: 'Each week varies depending on who is looking and who is posting. We suggest posting as soon as you begin your search and continue to post if necessary.'
      },
      {
        question: 'How much does it cost to post a listing?',
        answer: 'UGX 50,000 per week if you submit by the deadline of Friday 10am EST.'
      }
    ]
  }
];

const SingleQuestion = ({question, answer}) => (
  <>
    <div className={classes.SingleQuestion}>{question}</div>
    <div className={classes.SingleAnswer}>{answer}</div>
  </>
);

const FAQs = (props) => (
  <div className={classes.Container}>
    <Header color='#403D39' />
    <Row className={classes.Row}>
      <Col span={4}></Col>
      <Col span={1} className={classes.BackButton}>
        <BackButton history={props.history} />
      </Col>
      <Col span={19} className={classes.FAQsCol}>
        <div className={classes.FAQsTitle}>FAQs</div>
        <div className={classes.FAQsSubtitle}>Frequently Asked Questions</div>
        <Row className={classes.FAQsWorksRow}>
          {howItWorksGet.map(({title, image, description}, i) => (
            <Col key={i} span={6} className={classes.TileContainerCol}>
              <Tile title={title} image={image} description={description} />
            </Col>
          ))}

          {howItWorksPost.map(({title, image, description}, i) => (
            <Col key={i} span={6} className={classes.TileContainerCol}>
              <Tile title={title} image={image} description={description} />
            </Col>
          ))}

          <Col span={24} style={{display: 'flex', marginTop: '50px'}}>
            <div className={classes.QuestionContainer}>
              {faqs1.map((faq, i) => <div key={i}><Question question={faq} /></div>)}
            </div>
            <div className={classes.QuestionContainer}>
              {faqs2.map((faq, i) => <div key={i}><Question question={faq} /></div>)}
            </div>
            <div className={classes.QuestionContainer}>
              {faqs3.map((faq, i) => <div key={i} ><Question question={faq} /></div>)}
            </div>
          </Col>

          {otherFaqs.map(({title, questions}, i) =>
            <div key={i}>
              <div className={classes.FAQsSubtitle}>{title}</div>
              {questions.map(({question, answer}, i) => <SingleQuestion key={i} question={question} answer={answer} /> )}
            </div>)}
        </Row>
      </Col>
    </Row>
    <Footer  />
  </div>
)

export default FAQs;
