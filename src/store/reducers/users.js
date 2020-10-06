import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED, SIGNIN } from '../actions/types';

const initialState = {
  user: {
    token: '',
    userrole: ''
  },
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE:
      return {
        ...state,
        loading: true
      }

    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          token: action.payload.token,
          userrole: action.payload.userrole
        }
      }

    case SUBSCRIBE_FAILED:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}
