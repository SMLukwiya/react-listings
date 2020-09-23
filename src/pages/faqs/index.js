import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {CSSTransition} from 'react-transition-group';

import './faqs.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Tile from '../../components/common/Tile';
import BackButton from '../../components/common/BackButton';
import Question from '../../components/common/Question';
import Footer from '../../components/Footer';
import Background from '../../components/common/Background';

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
  },
  {
    title: 'Deadlines for Listers',
    questions: [
      {
        question: 'When is the deadline to post each week?',
        answer: 'The deadline to post a listing is Friday at 10am EST.'
      },
      {
        question: 'I missed the Friday 10am EST deadline. Can my listing still be included in this week\'s list?',
        answer: 'Yes. After the weekly submission deadline, we offer extended deadline fees depending on how close you are to our final deadline: post between 10am EST–2pm EST = $60 post between 2pm EST–7pm EST = $90 post between 7pm EST–midnight EST = $180'
      },
      {
        question: 'What if I submit after the deadline and I don\'t want to pay the extended deadline fee?',
        answer: 'You may decide to post your listing for the following week. On the payment page, select "post next week.'
      },
    ]
  },
  {
    title: 'Real Estate Listings',
    questions: [
      {
        question: 'What goes in “Real Estate”?',
        answer: 'Any living, work or event space that is for rent, sublet, swap or sale is “Real Estate.” Any seeking apartment or seeking studio listings also go in “Real Estate.”'
      },
      {
        question: 'What should I write in the Headline?',
        answer: 'Write something special about your space that highlights its best features. The more detailed and specific you make your header, the better the responses. Here are some examples of one-line descriptions that share what’s unique about you and/or your space: “Huge, sunny live/work space in historical building” or “One-bedroom available in furnished two-bedroom with architect roommate.”'
      },
      {
        question: 'What should I write in the Description ?',
        answer: 'Be sure to include a detailed description of the space, local attractions, something about yourself and your current roommate(s) if you share your space. Highlight any special features about your space, for example: pets allowed, huge skylight, backyard, great landlord. Describe special features about yourself, for example: "I love Last Week Tonight, my home is my sanctuary, I\'m a teacher so I get up early, my cat rocks, I love to cook, I never cook" etc.'
      },
    ]
  },
  {
    title: 'Opportunities Listings',
    questions: [
      {
        question: 'What goes in “Opportunities”?',
        answer: 'Non-real estate listings are “Opportunities,” including jobs, open calls, classes, etc. You’ll type in your own category on the form.'
      },
      {
        question: 'What should I write in the Headline?',
        answer: 'Explain what you’re offering or seeking as clearly as you can. You create your own category, so it helps to be as specific and detailed as possible, for example: “Part-time position with an up-and-coming, non-profit, artist-run gallery.”'
      },
      {
        question: 'What should I write in the Description ?',
        answer: 'Give as many details as possible. If applicable, include any dates, prices, locations, etc. Be clear and thorough as to what you’re offering and what you’re seeking.'
      },
    ]
  },
  {
    title: 'Editing, Relisting & Deleting',
    questions: [
      {
        question: 'When does my listing expire?',
        answer: 'Listings expire after one week.'
      },
      {
        question: 'How do I repost my listing?',
        answer: 'Sign in to your account to repost your listing.'
      },
      {
        question: 'Do you edit my listing?',
        answer: 'Yes, occasionally we edit listings for clarity.'
      },
      {
        question: 'How do I edit my listing after submitting?',
        answer: 'Sign in to your account to edit your listing. The deadline to edit is Friday at 11:59pm ET.'
      },
      {
        question: 'What if I rent my space before my listing emailed?',
        answer: 'Congratulations! You can sign in to your account to remove your listing.'
      }
    ]
  },
  {
    title: 'Troubleshooting for Listers',
    questions: [
      {
        question: 'Why should I create an account?',
        answer: 'An account is only required to post listings. You do not need it to receive the list. An account allows you to repost listings without filling out the form again. Each time you’d like to post, simply sign in. All your information and posting history will be stored in your account. At the click of a button you can repost, edit and pay. We do not save your credit card information—you’ll need to type this in each time.'
      },
      {
        question: 'What are alias emails and how do they work?',
        answer: 'Once you complete your listing, the form will generate an @on.listingsproject.com email address that will appear as your contact email at the bottom of your listing (unless you specify that you’d like to be contacted by phone only). The @on.listingsproject.com email address will automatically forward any correspondence to the email address you provide on the form.'
      },
      {
        question: 'How do I know you received my listing?',
        answer: 'After you submit your listing the word “Success!” will come up on your screen and you’ll receive a receipt from us. We’ll then personally read your listing and personally email you.'
      }
    ]
  },
  {
    title: 'Advertising',
    questions: [
      {
        question: 'What kinds of ads appear on Listings Project?',
        answer: 'Listings Project and Nectar carefully curate all of our advertising. Check out Nectar for more details.'
      },
      {
        question: 'How do I advertise?',
        answer: '……………………………………………………………………………….'
      }
    ]
  },
  {
    title: 'About Property Listings',
    questions: [
      {
        question: 'How did Listings Project begin?',
        answer: 'Listings Project began as social practice artist Stephanie Diamond’s personal email list, and it’s grown into the leading resource for artists’ studios, creative spaces and beyond in 70+ countries and across the United States. As Listings Project has grown, Stephanie and her team have held onto those personal connections, creating a service that’s rooted in collective self-care and community building.'
      },
      {
        question: 'Is this an art project?',
        answer: 'Yes. Listings Project is both a business and a Social Practice art project. Social Practice art is a method used to engage with communities and the self beyond traditional art-object making; it approaches creating with a community as opposed to creating for a community. As a painter uses paint or a sculptor uses a chisel and stone, social practice artists use social systems, situations, people and public space as their materials.'
      },
      {
        question: 'How has Listings Project evolved?',
        answer: 'Listings Project is the leading resource for artists’ studios and creative spaces around the world. As Listings Project has grown, we’ve held onto those personal connections, creating a service that’s rooted in collective self-care and community building.'
      }
    ]
  },
  {
    title: 'Privacy & Policies',
    questions: [
      {
        question: 'Do you sell my email address?',
        answer: 'No. We never sell or give away your email address.'
      },
      {
        question: 'Do you post links to other real estate and listings websites?',
        answer: 'No.'
      },
      {
        question: 'What if a broker contacts me about my listing?',
        answer: 'Email listings@listingsproject.com with their name and where they work. We will take them off right away.'
      },
      {
        question: 'What if I’m also showing my space with a broker/manager?',
        answer: 'Even if you are the owner or leaseholder, we cannot post spaces that are also being shown by brokers or managers.'
      },
      {
        question: 'Read our Terms of Use, Privacy Policy, and Refund Policy.',
        answer: 'You can see our terms and policies at the following links: Equity & Inclusion, Terms of Use, Privacy Policy and Refund Policy.'
      }
    ]
  }
];

const SingleQuestion = ({question, answer}) => (
  <>
    <div className='faqsPageSingleQuestion'>{question}</div>
    <div className='faqsPageSingleAnswer'>{answer}</div>
  </>
);

const FAQs = (props) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {setShowPage(true)}, []);

  return (
    <CSSTransition
      in={showPage}
      timeout={800}
      classNames="faqsPage-"
      unmountOnExit>
      <div className='faqsPageContainer'>
        <Background />
        <Header color='#403D39' />
        <Row className='faqsPageRow'>
          <Col span={4} className='faqsPageCol'>
            <Menu history={props.history} />
          </Col>
          <Col span={1} className='faqsPageBackButton'>
            <BackButton history={props.history} />
          </Col>
          <Col span={19} className='FAQsCol'>
            <div className='FAQsTitle'>FAQs</div>
            <div className='FAQsSubtitle'>Frequently Asked Questions</div>
            <Row className='FAQsWorksRow'>
              {howItWorksGet.map(({title, image, description}, i) => (
                <Col key={i} span={6} className='faqsPageTileContainerCol'>
                  <Tile title={title} image={image} description={description} />
                </Col>
              ))}

              {howItWorksPost.map(({title, image, description}, i) => (
                <Col key={i} span={6} className='faqsPageTileContainerCol'>
                  <Tile title={title} image={image} description={description} />
                </Col>
              ))}

              <Col span={24} style={{display: 'flex', marginTop: '50px'}}>
                <div className='faqsPageQuestionContainer'>
                  {faqs1.map((faq, i) => <div key={i}><Question question={faq} /></div>)}
                </div>
                <div className='faqsPageQuestionContainer'>
                  {faqs2.map((faq, i) => <div key={i}><Question question={faq} /></div>)}
                </div>
                <div className='faqsPageQuestionContainer'>
                  {faqs3.map((faq, i) => <div key={i} ><Question question={faq} /></div>)}
                </div>
              </Col>

              {otherFaqs.map(({title, questions}, i) =>
                <div key={i}>
                  <div className='FAQsSubtitle'>{title}</div>
                  {questions.map(({question, answer}, i) => <SingleQuestion key={i} question={question} answer={answer} /> )}
                </div>)}
            </Row>
          </Col>
        </Row>
        <div style={{marginTop: '50px'}}><Footer /></div>
      </div>
    </CSSTransition>
  )
}
export default FAQs;
