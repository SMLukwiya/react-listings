import { CHOOSELISTING, FETCHLISTINGS, FETCHLISTINGS_SUCCESS, FETCHLISTINGS_FAILED, FETCHLISTING, FETCHLISTING_SUCCESS, FETCHLISTING_FAILED } from '../actions/types';

const initialState = {
  listing: {
    title: '',
    description: '',
    images: []
  },
  getlisting: {},
  listings: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHOOSELISTING:
      return {
        ...state,
        listing: {
          ...state.listing,
          title: action.payload.listing.title,
          description: action.payload.listing.description,
          images: action.payload.listing.images
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

    default:
      return state;
  }
}
