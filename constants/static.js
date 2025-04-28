export const NAV_LINKS = [
  {
    title: 'Journals',
    path: '/journals',
    dropdown: [
      { title: 'Active Journals', path: '/journals' },
      { title: 'Find a Journal', path: '/journals/find' },
      { title: 'Journal Proposal', path: '/journals/proposal' },
      { title: 'Proceeding Series', path: '/journals/proceeding' },
    ],
  },
  {
    title: 'Topics',
    path: '/topics',
    dropdown: null,
  },
  {
    title: 'Information',
    path: '/information',
    dropdown: [
      // First section
      [
        { title: 'For Authors', path: '/information' },
        { title: 'For Reviewers', path: '/information/reviewers' },
        { title: 'For Editors', path: '/information/editors' },
        { title: 'For Librarians', path: '/information/librarians' },
        { title: 'For Publishers', path: '/information/publishers' },
        { title: 'For Societies', path: '/information/societies' },
        { title: 'For Conference Organizers', path: '/information/conference' },
      ],
      // Second section
      [
        { title: 'Open Access Policy', path: '/information/access' },
        {
          title: 'Institutional Open Access Program',
          path: '/information/program',
        },
        { title: 'Special Issues Guidelines', path: '/information/special' },
        { title: 'Editorial Process', path: '/information/editorial' },
        {
          title: 'Research and Publication Ethics',
          path: '/information/research',
        },
        { title: 'Article Processing Charges', path: '/information/article' },
        { title: 'Awards', path: '/information/awards' },
        { title: 'Testimonials', path: '/information/testimonials' },
      ],
    ],
    isMultiColumn: true,
  },
  {
    title: 'Author Services',
    path: '/about',
    dropdown: null,
  },
  {
    title: 'About',
    path: '/about',
    dropdown: [
      { title: 'Overview', path: '/about' },
      { title: 'Contact', path: '/about/contact' },
      { title: 'Careers', path: '/journals/sub3' },
      { title: 'News', path: '/about/news' },
      { title: 'Press', path: '/journals/sub3' },
      { title: 'Blogs', path: 'blogs' },
    ],
  },
];
