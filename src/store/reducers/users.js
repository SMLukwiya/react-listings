import {
  SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILED,
  SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILED,
  SIGNUP, SIGNUP_SUCCESSFUL, SIGNUP_FAILED,
   AUTOLOGIN } from '../actions/types';

const initialState = {
  user: {
    useremail: '',
    userid: '',
    token: '',
    userrole: '',
    loggedIn: false
  },
  loading: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTOLOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.token,
          userrole: action.payload.user_role,
          loggedIn: false
        }
      }

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
          userrole: action.payload.userrole,
          loggedIn: false
        }
      }

    case SUBSCRIBE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case SIGNIN:
      return {
        ...state,
        loading: true
      }

    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          token: action.payload.token,
          userrole: action.payload.user_role,
          loggedIn: true
        }
      }

    case SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case SIGNUP:
      return {
        ...state,
        loading: true
      }

    case SIGNUP_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          token: action.payload.token,
          userrole: action.payload.user_role,
          loggedIn: true
        }
      }

    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}
