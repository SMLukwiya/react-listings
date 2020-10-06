import { CHOOSELISTING } from '../actions/types';

const initialState = {
  listing: {
    title: '',
    description: '',
    images: []
  },
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

    default:
      return state;
  }
}
