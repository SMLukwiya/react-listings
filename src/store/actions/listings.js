import axios from 'axios';
import {store} from '../../App';

import { CHOOSELISTING, UPLOADLISTING, UPLOADLISTING_SUCCESS, UPLOADLISTING_FAILED, FETCHLISTINGS, FETCHLISTINGS_SUCCESS, FETCHLISTINGS_FAILED, FETCHLISTING, FETCHLISTING_SUCCESS, FETCHLISTING_FAILED } from './types';

export const choose_listing = (title, description, images) => {
  return {
    type: CHOOSELISTING,
    payload: {
      listing: {
        title: title,
        description: description,
        images: images
      }
    }
  }
}

export const postlisting = (callback) => {
  return dispatch => {
    dispatch({ type: UPLOADLISTING });

    const listingsData = store.getState().listings;
    const userData = store.getState().user;

    const { listing: { title, description, images, lat, long }} = listingsData;
    const { user: { api_token }} = userData;
    const dummy_api_token = 'QXAcwSfQEZlWJ3yFCFD7ZQt8R69rqBkhnBNuEvEz';

    const formData = new FormData();
    formData.append('user_token', api_token)
    formData.append('title', title)
    formData.append('lat', lat)
    formData.append('long', long)
    formData.append('description', description)

    for (let a = 0; a < images.length; a++) {
      formData.append('images', images[a].file, images[a].file.name);
    }

    console.log(title, description, api_token, formData.getAll('images'))

    return axios.post('https://listings.dsnibro.com/api/v1/api_listings',
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data'
      }
      })
      .then(response => {
        console.log('Response', response);

        dispatch({ type: UPLOADLISTING_SUCCESS });
        callback()
      })
      .catch(err => {
        dispatch({ type: UPLOADLISTING_FAILED });
        callback(err.response)
      })
  }
}

export const fetchlistings = (callback) => {
  return dispatch => {
    dispatch({ type: FETCHLISTINGS });

    return axios.get('https://listings.dsnibro.com/api/v1/api_listings')
      .then(response => {
        console.log(response);
        const { data: { data } } = response;

        dispatch({
          type: FETCHLISTINGS_SUCCESS,
          payload: data
        });

        callback();
      })
      .catch(err => {
        console.log(err.response);

        dispatch({ type: FETCHLISTINGS_FAILED });

        callback(err.response);
      })
  }
}

export const fetchsinglelisting = (id, callback) => {
  return dispatch => {
    dispatch({ type: FETCHLISTING });

    return axios.get('https://listings.dsnibro.com/api/v1/api_listings')
      .then(response => {
        const { data: { data } } = response;

        const listing = data.find((item) => item.property_id === id);
        console.log("@Listing", listing);

        dispatch({
          type: FETCHLISTING_SUCCESS,
          payload: listing
        })

        callback()
      })
      .catch(err => {
        dispatch({ type: FETCHLISTING_FAILED });
        callback(err.response)
      })
  }
}
