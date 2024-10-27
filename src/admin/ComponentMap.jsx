import ViewJournals from './Journals/ViewJournals.jsx';
import EditJournal from './Journals/EditJournal';
import DeleteJournal from './Journals/DeleteJournal.jsx';
import ViewVolumes from './Volumes/ViewVolumes.jsx';
import EditVolumes from './Volumes/EditVolumes.jsx';
import DeleteVolume from './Volumes/DeleteVolume.jsx';
import ViewIssues from './Issues/ViewIssues.jsx';
import EditIssues from './Issues/EditIssues.jsx';
import DeleteIssue from './Issues/DeleteIssue.jsx';
import EditPaper from './Papers/EditPaper.jsx';
import ViewPaper from './Papers/ViewPapers.jsx';
import DeletePaper from './Papers/DeletePaper.jsx';
import CreateNews from './News/CreateNews.jsx';
import EditNews from './News/EditNews';
import ViewNews from './News/ViewNews';
import DeleteNews from './News/DeleteNews';
import CreateSlider from './HomeSlider/CreateSlider.jsx';
import ViewSlider from './HomeSlider/ViewSlider.jsx';
import EditSlider from './HomeSlider/EditSlider.jsx';
import DeleteSlider from './HomeSlider/DeleteSlider.jsx';
import CreateSubmission from './Submission/CreateSubmission.jsx';
import ViewSubmissions from './Submission/ViewSubmissions';
import EditSubmission from './Submission/EditSubmission';
import DeleteSubmission from './Submission/DeleteSubmission';
import CreateNewsLetter from './NewsLetter/CreateNewsLetter.jsx';
import ViewNewsLetter from './NewsLetter/ViewNewsLetter';
import EditNewsLetter from './NewsLetter/EditNewsLetter';
import DeleteNewsletter from './NewsLetter/DeleteNewsLetter';
import CreateIssue from './Issues/CreateIssue.jsx';
import CreatePaper from './Papers/CreatePaper.jsx';
import CreateJournal from './Journals/CreateJournal.jsx';
import CreateVolume from './Volumes/CreateVolume.jsx';
import CreateReviewer from './Reviewer/CreateReviewer';
import ViewReviewers from './Reviewer/ViewReviewers';
import EditReviewer from './Reviewer/EditReviewer';
import DeleteReviewer from './Reviewer/DeleteReviewer';
import CreateEditor from './Editor/CreateEditor';
import ViewEditor from './Editor/ViewEditor';
import EditEditor from './Editor/EditEditor';
import DeleteEditor from './Editor/DeleteEditor';
import CreateOpenAccess from './OpenAccess/CreateOpenAccess';
import ViewOpenAccess from './OpenAccess/ViewOpenAccess';
import EditOpenAccess from './OpenAccess/EditOpenAccess';
import DeleteOpenAccess from './OpenAccess/DeleteOpenAccess';
import CreateEditorialProcess from './EditorialProcess/CreateEditorialProcess';
import ViewEditorialProcess from './EditorialProcess/ViewEditorialProcess';
import EditEditorialProcess from './EditorialProcess/EditEditorialProcess';
import DeleteEditorialProcess from './EditorialProcess/DeleteEditorialProcess';
import CreateEthics from './Ethics/CreateEthics';
import ViewEthics from './Ethics/ViewEthics';
import EditEthics from './Ethics/EditEthics';
import DeleteEthics from './Ethics/DeleteEthics';
import CreateCharges from './Charges/CreateCharges';
import ViewCharges from './Charges/ViewCharges';
import EditCharges from './Charges/EditCharges';
import DeleteCharges from './Charges/DeleteCharges';
import CreateVisibilityStatement from './VisibilityStatements/CreateVisibilityStatement';
import ViewVisibilityStatement from './VisibilityStatements/ViewVisibilityStatement';
import EditVisiblityStatement from './VisibilityStatements/EditVisiblityStatement';
import DeleteVisibilityStatement from './VisibilityStatements/DeleteVisibilityStatement';
import CreateContact from './Contact/CreateContact';
import ViewContacts from './Contact/ViewContacts';
import EditContact from './Contact/EditContact';
import DeleteContact from './Contact/DeleteContact';
import CreateAuthor from './Author/CreateAuthor';
import ViewAuthors from './Author/ViewAuthors';
import EditAuthor from './Author/EditAuthor';
import DeleteAuthor from './Author/DeleteAuthor';
import CreateAbout from './About/CreateAbout';
import ViewAbouts from './About/ViewAbouts';
import EditAbout from './About/EditAbout';
import DeleteAbout from './About/DeleteAbout';
import Dashboard from './Dashboard.jsx';
import CreateAdmin from './Admin-actions/CreateAdmin.jsx';
import DeleteAdmin from './Admin-actions/DeleteAdmin';

export const COMPONENT_MAP = {
  //Dashboard default
  Dashboard: <Dashboard />,

  // Papers
  'Create Paper': <CreatePaper />,
  'View Papers': <ViewPaper />,
  'Edit Paper': <EditPaper />,
  'Delete Paper': <DeletePaper />,

  // Journals
  'Create Journal': <CreateJournal />,
  'View Journals': <ViewJournals />,
  'Edit Journal': <EditJournal />,
  'Delete Journal': <DeleteJournal />,

  // Volumes
  'Create Volume': <CreateVolume />,
  'View Volumes': <ViewVolumes />,
  'Edit Volume': <EditVolumes />,
  'Delete Volume': <DeleteVolume />,

  // Issues
  'Create Issue': <CreateIssue />,
  'View Issues': <ViewIssues />,
  'Edit Issue': <EditIssues />,
  'Delete Issue': <DeleteIssue />,

  // News
  'Create News': <CreateNews />,
  'View News': <ViewNews />,
  'Edit News': <EditNews />,
  'Delete News': <DeleteNews />,

  // Slider
  'Create Slider': <CreateSlider />,
  'View Sliders': <ViewSlider />,
  'Edit Slider': <EditSlider />,
  'Delete Slider': <DeleteSlider />,

  //Admin
  'Create Admin': <CreateAdmin />,
  'Delete Admin': <DeleteAdmin />,

  // Submissions
  'Create Submission': <CreateSubmission />,
  'View Submissions': <ViewSubmissions />,
  'Edit Submission': <EditSubmission />,
  'Delete Submission': <DeleteSubmission />,

  // Newsletters
  'Create NewsLetter': <CreateNewsLetter />,
  'View NewsLetter': <ViewNewsLetter />,
  'Edit NewsLetter': <EditNewsLetter />,
  'Delete NewsLetter': <DeleteNewsletter />,

  // About
  'Create About': <CreateAbout />,
  'View Abouts': <ViewAbouts />,
  'Edit About': <EditAbout />,
  'Delete About': <DeleteAbout />,

  // Contact
  'Create Contact': <CreateContact />,
  'View Contacts': <ViewContacts />,
  'Edit Contact': <EditContact />,
  'Delete Contact': <DeleteContact />,

  // Author
  'Create Author': <CreateAuthor />,
  'View Authors': <ViewAuthors />,
  'Edit Author': <EditAuthor />,
  'Delete Author': <DeleteAuthor />,

  // Reviewers
  'Create Reviewer': <CreateReviewer />,
  'View Reviewers': <ViewReviewers />,
  'Edit Reviewer': <EditReviewer />,
  'Delete Reviewer': <DeleteReviewer />,

  // Editors
  'Create Editor': <CreateEditor />,
  'View Editors': <ViewEditor />,
  'Edit Editor': <EditEditor />,
  'Delete Editor': <DeleteEditor />,

  // Open Access
  'Create OpenAccess': <CreateOpenAccess />,
  'View OpenAccess': <ViewOpenAccess />,
  'Edit OpenAccess': <EditOpenAccess />,
  'Delete OpenAccess': <DeleteOpenAccess />,

  // Editorial Process
  'Create EditorialProcess': <CreateEditorialProcess />,
  'View EditorialProcesses': <ViewEditorialProcess />,
  'Edit EditorialProcess': <EditEditorialProcess />,
  'Delete EditorialProcess': <DeleteEditorialProcess />,

  // Ethics
  'Create Ethics': <CreateEthics />,
  'View Ethics': <ViewEthics />,
  'Edit Ethics': <EditEthics />,
  'Delete Ethics': <DeleteEthics />,

  // Charges
  'Create Charges': <CreateCharges />,
  'View Charges': <ViewCharges />,
  'Edit Charges': <EditCharges />,
  'Delete Charges': <DeleteCharges />,

  // Visibility Statements
  'Create VisibilityStatement': <CreateVisibilityStatement />,
  'View VisibilityStatements': <ViewVisibilityStatement />,
  'Edit VisibilityStatement': <EditVisiblityStatement />,
  'Delete VisibilityStatement': <DeleteVisibilityStatement />,
};
