import {
  getContacts,
  getIssues,
  getJournals,
  getNews,
  getNewsLetter,
  getPapers,
  getSliders,
  getSubmission,
  getVolumes,
  getAbout,
  getAuthors,
  getReviewers,
  getEditors,
  getVisibilityStatement,
  getCharges,
  getEthics,
  getEditorialProcess,
  getOpenAccess,
} from '../../utils/http';
import { useQuery } from '@tanstack/react-query';

//fetch journals
export function useFetchJournals() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['journals'],
    queryFn: ({ signal }) => getJournals({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
  // Return an object containing the necessary values
  return { data, isLoading, isError };
}

//fetch volumes
export function useFetchVolumes({ id }) {
  const {
    data: volumeData,
    isLoading: isVolumeLoading,
    isError: isVolumeError,
  } = useQuery({
    queryKey: ['volumes', id],
    queryFn: ({ queryKey, signal }) => {
      const journalId = queryKey[1];
      return getVolumes({ signal, journalId });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
    enabled: !!id,
  });

  return { volumeData, isVolumeError, isVolumeLoading };
}

//fetch issues
export function useFetchIssues({ id }) {
  const {
    data: issuesData,
    isLoading: isIssuesLoaing,
    isError: isIssuesError,
  } = useQuery({
    queryKey: ['issues', id],
    queryFn: ({ queryKey, signal }) => {
      const volumeId = queryKey[1];
      return getIssues({ signal, volumeId });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
    enabled: !!id,
  });

  return { issuesData, isIssuesError, isIssuesLoaing };
}

//fetch papers
export function useFetchPapers({ id }) {
  const {
    data: paper,
    isLoading: isPaperLoading,
    isError: isPaperError,
  } = useQuery({
    queryKey: ['papers', id],
    queryFn: ({ signal, queryKey }) => {
      const issueId = queryKey[1];
      return getPapers({ signal, issueId });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
    enabled: !!id,
  });
  return { paper, isPaperError, isPaperLoading };
}

//fetch news
export function useFetchNews() {
  const {
    data: newsData,
    isLoading: isNewsLoading,
    isError: isNewsError,
  } = useQuery({
    queryKey: ['news'],
    queryFn: ({ signal }) => getNews({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { newsData, isNewsError, isNewsLoading };
}

//fetchSlider
export function useFetchSlider() {
  const {
    data: sliderData,
    isPending: isSliderLoading,
    isError: isSliderError,
  } = useQuery({
    queryKey: ['sliders'],
    queryFn: ({ signal }) => getSliders({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { sliderData, isSliderLoading, isSliderError };
}

//fetch Submissions
export function useFetchSubmissions() {
  const {
    data: submissionData,
    isPending: isSubPending,
    isError: isSubError,
  } = useQuery({
    queryKey: ['submissions'],
    queryFn: ({ signal }) => getSubmission({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { submissionData, isSubPending, isSubError };
}

//fetch newsletters
export function useFetchNewsLetters() {
  const {
    data: newsLetterData,
    isPending: isnewsLetterPending,
    isError: isNewsLetterError,
  } = useQuery({
    queryKey: ['news-letter'],
    queryFn: ({ signal }) => getNewsLetter({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { newsLetterData, isnewsLetterPending, isNewsLetterError };
}

//fetch contacts
export function useFetchContacts() {
  const {
    data: contactsData,
    isPending: isContactPending,
    isError: isContactError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: ({ signal }) => getContacts({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { contactsData, isContactError, isContactPending };
}

//fetch abouts
export function useFetchAbouts() {
  const {
    data: aboutData,
    isPending: isAboutPending,
    isError: isAboutError,
  } = useQuery({
    queryKey: ['about'],
    queryFn: ({ signal }) => getAbout({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { aboutData, isAboutError, isAboutPending };
}

//fetch authors
export function useFetchAuthors() {
  const {
    data: authorsData,
    isPending: isAuthorsPending,
    isError: isAuthorsError,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: ({ signal }) => getAuthors({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { authorsData, isAuthorsError, isAuthorsPending };
}

//fetch reviewers
export function useFetchReviewers() {
  const {
    data: reviewersData,
    isPending: isReviewersPending,
    isError: isReviewersError,
  } = useQuery({
    queryKey: ['reviewers'],
    queryFn: ({ signal }) => getReviewers({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { reviewersData, isReviewersError, isReviewersPending };
}

//fetch editors
export function useFetchEditors() {
  const {
    data: editorsData,
    isPending: isEditorsLoading,
    isError: isEditorsError,
  } = useQuery({
    queryKey: ['editors'],
    queryFn: ({ signal }) => getEditors({ signal }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
  });
  return { editorsData, isEditorsError, isEditorsLoading };
}

// Fetch Open Access
export function useFetchOpenAccess() {
  const {
    data: openAccessData,
    isPending: isOpenAccessLoading,
    isError: isOpenAccessError,
  } = useQuery({
    queryKey: ['open-access'],
    queryFn: ({ signal }) => getOpenAccess({ signal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return { openAccessData, isOpenAccessError, isOpenAccessLoading };
}

// Fetch Editorial Processes
export function useFetchEditorialProcesses() {
  const {
    data: editorialProcessesData,
    isPending: isEditorialProcessesLoading,
    isError: isEditorialProcessesError,
  } = useQuery({
    queryKey: ['editorial-processes'],
    queryFn: ({ signal }) => getEditorialProcess({ signal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return {
    editorialProcessesData,
    isEditorialProcessesError,
    isEditorialProcessesLoading,
  };
}

// Fetch Ethics
export function useFetchEthics() {
  const {
    data: ethicsData,
    isPending: isEthicsLoading,
    isError: isEthicsError,
  } = useQuery({
    queryKey: ['ethics'],
    queryFn: ({ signal }) => getEthics({ signal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return { ethicsData, isEthicsError, isEthicsLoading };
}

// Fetch Charges
export function useFetchCharges() {
  const {
    data: chargesData,
    isPending: isChargesLoading,
    isError: isChargesError,
  } = useQuery({
    queryKey: ['charges'],
    queryFn: ({ signal }) => getCharges({ signal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return { chargesData, isChargesError, isChargesLoading };
}

// Fetch Visibility Statements
export function useFetchVisibilityStatements() {
  const {
    data: visibilityStatementsData,
    isPending: isVisibilityStatementsLoading,
    isError: isVisibilityStatementsError,
  } = useQuery({
    queryKey: ['visibility-statements'],
    queryFn: ({ signal }) => getVisibilityStatement({ signal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return {
    visibilityStatementsData,
    isVisibilityStatementsError,
    isVisibilityStatementsLoading,
  };
}
