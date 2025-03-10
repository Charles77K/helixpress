import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { handleError } from './http';
import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const queryClient = new QueryClient();

const baseURL = 'https://ogbesomto.pythonanywhere.com/api';

// export function getAuthToken() {
//   const token = localStorage.getItem('authToken');
//   return token;
// }

export function useAuthLoader() {
  const token = useSelector((state) => state.authentication.token);
  console.log(token);
  if (!token) {
    console.log('redirecting to loginn');
    return redirect('/login');
  }
  return null;
}

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

export const createAdmin = async ({data, token}) => {
  console.log('authtokwn:', token);
  try {
    const response = await axios.post(`${baseURL}/create_user`, data, {
      headers: {
        Authorization: `Token ${token}`,
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

export const logout = async (token) => {
  try {
    const response = await axios.post(`${baseURL}/logout`, null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    // Check if the response status is 201
    if (response.status == 200) {
      console.log('successfully logged out:', response.data);
      return response.data; // Return the response data for further use
    } else {
      console.error('An error occurred:', response.statusText);
      return null; // Return null or handle it as needed
    }
  } catch (error) {
    handleError(error);
  }
};
