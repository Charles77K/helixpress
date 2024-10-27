import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

const baseURL = 'https://ogbesomto.pythonanywhere.com/api'; // Use base URL

// Utility function to handle errors
const handleError = (error) => {
  if (axios.isCancel(error)) {
    console.log('Request canceled:', error.message);
  } else if (error.response) {
    // Server responded with a status other than 200 range
    console.error('Server error:', error.response.data || error.message);
    throw new Error(error.response.data?.message || 'Server error occurred');
  } else {
    console.error('Network error:', error.message);
    throw new Error('Network error occurred');
  }
};

// Create journal
export async function PostJournals({ journalsData }) {
  try {
    const response = await axios.post(`${baseURL}/journals`, journalsData);
    if (response.status !== 201) {
      throw new Error('Error sending data');
    }
  } catch (error) {
    handleError(error);
  }
}

// Get journals
export async function getJournals() {
  try {
    const response = await axios.get(`${baseURL}/journals`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete a journal
export async function deleteJournal({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/journal/${id}`);
    if (response.status !== 204) {
      throw new Error('Failed to delete journal');
    }
    console.log('Delete successful');
  } catch (error) {
    handleError(error);
  }
}

// Edit a journal
export async function editJournal({ id, journalData }) {
  try {
    const response = await axios.put(`${baseURL}/journal/${id}`, journalData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to edit journal');
    }
    console.log('Successfully edited', response);
  } catch (error) {
    handleError(error);
  }
}

// Create a volume
export async function createVolume({ journalId, volumeData }) {
  try {
    const response = await axios.post(
      `${baseURL}/journal/${journalId}/volumes`,
      volumeData
    );
    if (response.status !== 201) {
      throw new Error('Error creating volume');
    }
  } catch (error) {
    handleError(error);
  }
}

// View volumes on journals
export async function getVolumes({ journalId, signal }) {
  if (!journalId) return;
  try {
    const response = await axios.get(
      `${baseURL}/journal/${journalId}/volumes`,
      { signal }
    );
    if (response.status !== 200) {
      throw new Error('Error fetching volumes');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Edit a volume
export async function editVolume({ volumeId, volumeData }) {
  try {
    const response = await axios.put(
      `${baseURL}/volume/${volumeId}`,
      volumeData
    );
    if (response.status !== 200) {
      throw new Error('Failed to edit volume');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete a volume
export async function deleteVolume({ volumeId }) {
  try {
    const response = await axios.delete(`${baseURL}/volume/${volumeId}`);
    if (response.status !== 204) {
      throw new Error('Failed to delete volume');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Create issues
export async function createIssue({ volumeId, issueData }) {
  try {
    const response = await axios.post(
      `${baseURL}/volume/${volumeId}/issues`,
      issueData
    );
    if (response.status !== 201) {
      throw new Error('Error creating issue');
    }
  } catch (error) {
    handleError(error);
  }
}

// Get issues
export async function getIssues({ volumeId, signal }) {
  try {
    const response = await axios.get(`${baseURL}/volume/${volumeId}/issues`, {
      signal,
    });
    if (response.status !== 200) {
      throw new Error('Error fetching issues');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Edit issues
export async function editIssues({ issueId, issuesData }) {
  try {
    const response = await axios.put(`${baseURL}/issue/${issueId}`, issuesData);
    if (response.status !== 200) {
      throw new Error('Failed to edit issue');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete issues
export async function deleteIssue({ issueId }) {
  try {
    const response = await axios.delete(`${baseURL}/issue/${issueId}`);
    if (response.status !== 204) {
      throw new Error('Failed to delete issue');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Create paper
export async function createPaper({ issueId, paperData }) {
  try {
    const response = await axios.post(
      `${baseURL}/issue/${issueId}/papers`,
      paperData
    );
    if (response.status !== 201) {
      throw new Error('Error creating paper');
    }
  } catch (error) {
    handleError(error);
  }
}

// Get papers
export async function getPapers({ issueId, signal }) {
  try {
    const response = await axios.get(`${baseURL}/issue/${issueId}/papers`, {
      signal,
    });
    if (response.status !== 200) {
      throw new Error('Error fetching papers');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Edit paper
export async function editPaper({ paperId, paperData }) {
  try {
    const response = await axios.put(`${baseURL}/paper/${paperId}`, paperData);
    if (response.status !== 200) {
      throw new Error('Failed to edit paper');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete paper
export async function deletePaper({ paperId }) {
  try {
    const response = await axios.delete(`${baseURL}/paper/${paperId}`);
    if (response.status !== 204) {
      throw new Error('Failed to delete paper');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Create news
export async function createNews({ newsData }) {
  try {
    const response = await axios.post(`${baseURL}/news/`, newsData);
    if (response.status !== 201) {
      throw new Error('Error creating news');
    }
  } catch (error) {
    handleError(error);
  }
}

// Fetch news
export async function getNews({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/news/`, { signal });
    if (response.status !== 200) {
      throw new Error('Error fetching news');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Edit news
export async function editNews({ newsId, newsData }) {
  try {
    const response = await axios.put(`${baseURL}/news/${newsId}/`, newsData);
    if (response.status !== 200) {
      throw new Error('Failed to edit news');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete news
export async function deleteNews({ newsId }) {
  try {
    const response = await axios.delete(`${baseURL}/news/${newsId}/`);
    if (response.status !== 204) {
      throw new Error('Failed to delete news');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Create slider
export async function createSlider({ sliderData }) {
  try {
    const response = await axios.post(`${baseURL}/home-sliders/`, sliderData);
    if (response.status !== 201) {
      throw new Error('Error creating slider');
    }
  } catch (error) {
    handleError(error);
  }
}

// Get sliders
export async function getSliders({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/home-sliders/`, { signal });
    if (response.status !== 200) {
      throw new Error('Error fetching sliders');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Edit slider
export async function editSlider({ sliderId, sliderData }) {
  try {
    const response = await axios.put(
      `${baseURL}/home-sliders/${sliderId}/`,
      sliderData
    );
    if (response.status !== 200) {
      throw new Error('Failed to edit slider');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Delete slider
export async function deleteSlider({ sliderId }) {
  try {
    const response = await axios.delete(`${baseURL}/home-sliders/${sliderId}/`);
    if (response.status !== 204) {
      throw new Error('Failed to delete slider');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create submission

export async function createSubmission({ submissionData }) {
  try {
    const response = await axios.post(
      `${baseURL}/submissions/`,
      submissionData
    );
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//get Submission
export async function getSubmission({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/submissions/`, { signal });
    if (response.status !== 200) {
      throw new Error('Failed to get submission');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//edit submission
export async function editSubmission({ submissionId, submissionData }) {
  try {
    const response = await axios.put(
      `${baseURL}/submissions/${submissionId}/`,
      submissionData
    );
    if (response.status !== 200) {
      throw new Error('Failed to edit submission');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//delete submission
export async function deleteSubmission({ submissionId }) {
  try {
    const response = await axios.delete(
      `${baseURL}/submissions/${submissionId}/`
    );
    if (response.status !== 204) {
      throw new Error('Failed to delete paper');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create newsletter
export async function createNewsLetter(newsLetterData) {
  try {
    const response = await axios.post(
      `${baseURL}/newsletters/`,
      newsLetterData
    );
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//get newsletter
export async function getNewsLetter({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/newsletters/`, { signal });
    if (response.status !== 200) {
      throw new Error('Failed to get news-letter');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//edit submission
export async function editNewsletter({ newsletterData, newsletterId }) {
  try {
    const response = await axios.put(
      `${baseURL}/newsletters/${newsletterId}/`,
      newsletterData
    );
    if (response.status !== 200) {
      throw new Error('Failed to edit submission');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//delete newsletter
export async function deleteNewsletter({ newsletterId }) {
  try {
    const response = await axios.delete(
      `${baseURL}/newsletters/${newsletterId}/`
    );
    if (response.status !== 204) {
      throw new Error('Failed to delete newsletter');
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create Contact
export async function createContact(contactData) {
  try {
    const response = await axios.post(`${baseURL}/contacts/`, contactData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get Contact
export async function getContacts({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/contacts/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit Contact
export async function editContact({ contactData, contactId }) {
  try {
    const response = await axios.put(
      `${baseURL}/contacts/${contactId}/`,
      contactData
    );
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete Contact
export async function deleteContact({ contactId }) {
  try {
    const response = await axios.delete(`${baseURL}/contacts/${contactId}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create about
export async function createAbout({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/about/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//get about
export async function getAbout({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/about/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit about
export async function editAbout({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/about/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete about
export async function deleteAbout({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/about/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create authors
export async function createAuthors({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/authors/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//view authors
export async function getAuthors({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/authors/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit authors
export async function editAuthors({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/authors/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete authors
export async function deleteAuthors({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/authors/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create reviewers
export async function createReviewers({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/reviewers/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get reviewers
export async function getReviewers({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/reviewers/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit reviewers
export async function editReviewers({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/reviewers/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete reviewers
export async function deleteReviewers({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/reviewers/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create editors
export async function createEditors({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/editors/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get editors
export async function getEditors({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/editors/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit editors
export async function editEditors({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/editors/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit editors
export async function deleteEditors({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/editors/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit open-access
export async function createOpenAccess({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/open-access/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get open-access
export async function getOpenAccess({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/open-access/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit open-access
export async function editOpenAccess({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/open-access/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete open-access
export async function deleteOpenAccess({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/open-access/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create editorial-process
export async function createEditorialProcess({ createData }) {
  try {
    const response = await axios.post(
      `${baseURL}/editorial-processes/`,
      createData
    );
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get editorial-process
export async function getEditorialProcess({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/editorial-processes/`, {
      signal,
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit editorial-process
export async function editEditorialProcess({ data, id }) {
  try {
    const response = await axios.put(
      `${baseURL}/editorial-processes/${id}/`,
      data
    );
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete editorial-process
export async function deleteEditorialProcess({ id }) {
  try {
    const response = await axios.delete(
      `${baseURL}/editorial-processes/${id}/`
    );
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create ethics
export async function createEthics({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/ethics/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get ethics
export async function getEthics({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/ethics/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit ethics
export async function editEthics({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/ethics/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete ethics
export async function deleteEthics({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/ethics/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//Create Charges
export async function createCharges({ createData }) {
  try {
    const response = await axios.post(`${baseURL}/charges/`, createData);
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//Get Charges
export async function getCharges({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/charges/`, { signal });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit Charges
export async function editCharges({ data, id }) {
  try {
    const response = await axios.put(`${baseURL}/charges/${id}/`, data);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete charges
export async function deleteCharges({ id }) {
  try {
    const response = await axios.delete(`${baseURL}/charges/${id}/`);
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

//create visibility-statements
export async function createVisibilityStatement({ createData }) {
  try {
    const response = await axios.post(
      `${baseURL}/visibility-statements/`,
      createData
    );
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//get visibility-statements
export async function getVisibilityStatement({ signal }) {
  try {
    const response = await axios.get(`${baseURL}/visibility-statements/`, {
      signal,
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//edit visibility-statements
export async function editVisibilityStatement({ data, id }) {
  try {
    const response = await axios.put(
      `${baseURL}/visibility-statements/${id}/`,
      data
    );
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//delete visibility-statements
export async function deleteVisibilityStatement({ id }) {
  try {
    const response = await axios.delete(
      `${baseURL}/visibility-statements/${id}/`
    );
    if (response.status !== 204) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
