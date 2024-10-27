import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { handleError } from './http';

export const queryClient = new QueryClient();

const baseURL = 'https://ogbesomto.pythonanywhere.com/api';

export const loginUser = async ({ data }) => {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
    if (response.status == 200) {
      console.log(response);
      return response.data;
    } else {
      console.log('An error occured');
    }
  } catch (error) {
    handleError(error);
  }
};

export const createAdmin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/create_user`, data, {
      headers: {
        Authorization: 'Token ab5e2311a128c40c9cf739945cf80f9dc9946601',
      },
    });

    // Check if the response status is 201
    if (response.status === 201) {
      console.log('Admin created successfully:', response.data);
      return response.data; // Return the response data for further use
    } else {
      console.error('An error occurred:', response.statusText);
      return null; // Return null or handle it as needed
    }
  } catch (error) {
    handleError(error);
  }
};
