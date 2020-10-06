import axios from 'axios';
import {store} from '../../App';

import { CHOOSELISTING, UPLOADLISTING, UPLOADLISTING_SUCCESS, UPLOADLISTING_FAILED } from './types';

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
    const dummy_api_token = 'G95kO789jVfFzipLK14EFZ7hjPMuUjiqxjuLjVak';

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
        console.log('Response', response)
        callback(null)
      })
      .catch(err => {
        // console.log(err.response)
        callback(err.response)
      })
  }
}
