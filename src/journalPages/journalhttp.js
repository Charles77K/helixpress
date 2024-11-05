import axios from 'axios';
import { baseURL, handleError } from '../utils/http';

export async function getJournal({ signal, journalId }) {
  try {
    const response = await axios.get(`${baseURL}/journal/${journalId}`, {
      signal,
    });
    if (response.status !== 200) {
      throw new Error('Error sending data');
    } else {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}
