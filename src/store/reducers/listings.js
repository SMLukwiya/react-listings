import {
  CHOOSELISTING_TYPE, CHOOSELISTING,
  FETCHLISTINGS, FETCHLISTINGS_SUCCESS, FETCHLISTINGS_FAILED,
  UPLOADLISTING, UPLOADLISTING_SUCCESS, UPLOADLISTING_FAILED,
  FETCHLISTING, FETCHLISTING_SUCCESS, FETCHLISTING_FAILED,
  SETPAYMENTTOTAL,
  PAYMENT,
  PAYMENT_SUCCESSFUL,
  PAYMENT_FAILED
 } from '../actions/types';

const initialState = {
  listing: {
    title: '',
    description: '',
    category: '',
    type: '',
    region: '',
    amount: '',
    rate: '',
    location: '',
    availability: '',
    about_lister: '',
    rental_requirements: '',
    images: []
  },
  payment_property_id: '',
  payment_total: '',
  getlisting: {},
  listings: [],
  loading: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHOOSELISTING_TYPE:
      return {
        ...state,
        listing: {
          ...state.listing,
          type: action.payload.type,
          category: action.payload.category,
        }
      };

    case CHOOSELISTING:
      return {
        ...state,
        listing: {
          ...state.listing,
          title: action.payload.title,
          description: action.payload.description,
          region: action.payload.region,
          amount: action.payload.amount,
          rate: action.payload.rate,
          location: action.payload.location,
          availability: action.payload.availability,
          about_lister: action.payload.about_lister,
          rental_requirements: action.payload.rentalrequirements,
          images: action.payload.images
        }
      }

    case FETCHLISTINGS:
      return {
        ...state,
        loading: true
      }

    case FETCHLISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        listings: action.payload
      }

    case FETCHLISTINGS_FAILED:
      return {
        ...state,
        loading: false
      }

    case FETCHLISTING:
      return {
        ...state,
        loading: true
      }

    case FETCHLISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        getlisting: action.payload
      }

    case FETCHLISTING_FAILED:
      return {
        ...state,
        loading: false
      }

    case UPLOADLISTING:
      return {
        ...state,
        loading: true,
      }

    case UPLOADLISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        payment_property_id: action.payload.property_id
      }

    case UPLOADLISTING_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case PAYMENT:
      return {
        ...state,
        loading: true
      }

    case PAYMENT_SUCCESSFUL:
      return {
        ...state,
        loading: false
      }

    case PAYMENT_FAILED:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}
