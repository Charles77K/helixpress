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

export const COUNTRIES = [
  { option: 'Afghanistan', value: 'afghanistan' },
  { option: 'Albania', value: 'albania' },
  { option: 'Algeria', value: 'algeria' },
  { option: 'Andorra', value: 'andorra' },
  { option: 'Angola', value: 'angola' },
  { option: 'Antigua and Barbuda', value: 'antigua_and_barbuda' },
  { option: 'Argentina', value: 'argentina' },
  { option: 'Armenia', value: 'armenia' },
  { option: 'Australia', value: 'australia' },
  { option: 'Austria', value: 'austria' },
  { option: 'Azerbaijan', value: 'azerbaijan' },
  { option: 'Bahamas', value: 'bahamas' },
  { option: 'Bahrain', value: 'bahrain' },
  { option: 'Bangladesh', value: 'bangladesh' },
  { option: 'Barbados', value: 'barbados' },
  { option: 'Belarus', value: 'belarus' },
  { option: 'Belgium', value: 'belgium' },
  { option: 'Belize', value: 'belize' },
  { option: 'Benin', value: 'benin' },
  { option: 'Bhutan', value: 'bhutan' },
  { option: 'Bolivia', value: 'bolivia' },
  { option: 'Bosnia and Herzegovina', value: 'bosnia_and_herzegovina' },
  { option: 'Botswana', value: 'botswana' },
  { option: 'Brazil', value: 'brazil' },
  { option: 'Brunei', value: 'brunei' },
  { option: 'Bulgaria', value: 'bulgaria' },
  { option: 'Burkina Faso', value: 'burkina_faso' },
  { option: 'Burundi', value: 'burundi' },
  { option: 'Cabo Verde', value: 'cabo_verde' },
  { option: 'Cambodia', value: 'cambodia' },
  { option: 'Cameroon', value: 'cameroon' },
  { option: 'Canada', value: 'canada' },
  { option: 'Central African Republic', value: 'central_african_republic' },
  { option: 'Chad', value: 'chad' },
  { option: 'Chile', value: 'chile' },
  { option: 'China', value: 'china' },
  { option: 'Colombia', value: 'colombia' },
  { option: 'Comoros', value: 'comoros' },
  {
    option: 'Congo, Democratic Republic of the',
    value: 'congo_democratic_republic',
  },
  { option: 'Congo, Republic of the', value: 'congo_republic' },
  { option: 'Costa Rica', value: 'costa_rica' },
  { option: "Côte d'Ivoire", value: 'cote_divoire' },
  { option: 'Croatia', value: 'croatia' },
  { option: 'Cuba', value: 'cuba' },
  { option: 'Cyprus', value: 'cyprus' },
  { option: 'Czech Republic', value: 'czech_republic' },
  { option: 'Denmark', value: 'denmark' },
  { option: 'Djibouti', value: 'djibouti' },
  { option: 'Dominica', value: 'dominica' },
  { option: 'Dominican Republic', value: 'dominican_republic' },
  { option: 'East Timor (Timor-Leste)', value: 'east_timor' },
  { option: 'Ecuador', value: 'ecuador' },
  { option: 'Egypt', value: 'egypt' },
  { option: 'El Salvador', value: 'el_salvador' },
  { option: 'Equatorial Guinea', value: 'equatorial_guinea' },
  { option: 'Eritrea', value: 'eritrea' },
  { option: 'Estonia', value: 'estonia' },
  { option: 'Eswatini', value: 'eswatini' },
  { option: 'Ethiopia', value: 'ethiopia' },
  { option: 'Fiji', value: 'fiji' },
  { option: 'Finland', value: 'finland' },
  { option: 'France', value: 'france' },
  { option: 'Gabon', value: 'gabon' },
  { option: 'Gambia', value: 'gambia' },
  { option: 'Georgia', value: 'georgia' },
  { option: 'Germany', value: 'germany' },
  { option: 'Ghana', value: 'ghana' },
  { option: 'Greece', value: 'greece' },
  { option: 'Grenada', value: 'grenada' },
  { option: 'Guatemala', value: 'guatemala' },
  { option: 'Guinea', value: 'guinea' },
  { option: 'Guinea-Bissau', value: 'guinea_bissau' },
  { option: 'Guyana', value: 'guyana' },
  { option: 'Haiti', value: 'haiti' },
  { option: 'Honduras', value: 'honduras' },
  { option: 'Hungary', value: 'hungary' },
  { option: 'Iceland', value: 'iceland' },
  { option: 'India', value: 'india' },
  { option: 'Indonesia', value: 'indonesia' },
  { option: 'Iran', value: 'iran' },
  { option: 'Iraq', value: 'iraq' },
  { option: 'Ireland', value: 'ireland' },
  { option: 'Israel', value: 'israel' },
  { option: 'Italy', value: 'italy' },
  { option: 'Jamaica', value: 'jamaica' },
  { option: 'Japan', value: 'japan' },
  { option: 'Jordan', value: 'jordan' },
  { option: 'Kazakhstan', value: 'kazakhstan' },
  { option: 'Kenya', value: 'kenya' },
  { option: 'Kiribati', value: 'kiribati' },
  { option: 'Korea, North', value: 'north_korea' },
  { option: 'Korea, South', value: 'south_korea' },
  { option: 'Kosovo', value: 'kosovo' },
  { option: 'Kuwait', value: 'kuwait' },
  { option: 'Kyrgyzstan', value: 'kyrgyzstan' },
  { option: 'Laos', value: 'laos' },
  { option: 'Latvia', value: 'latvia' },
  { option: 'Lebanon', value: 'lebanon' },
  { option: 'Lesotho', value: 'lesotho' },
  { option: 'Liberia', value: 'liberia' },
  { option: 'Libya', value: 'libya' },
  { option: 'Liechtenstein', value: 'liechtenstein' },
  { option: 'Lithuania', value: 'lithuania' },
  { option: 'Luxembourg', value: 'luxembourg' },
  { option: 'Madagascar', value: 'madagascar' },
  { option: 'Malawi', value: 'malawi' },
  { option: 'Malaysia', value: 'malaysia' },
  { option: 'Maldives', value: 'maldives' },
  { option: 'Mali', value: 'mali' },
  { option: 'Malta', value: 'malta' },
  { option: 'Marshall Islands', value: 'marshall_islands' },
  { option: 'Mauritania', value: 'mauritania' },
  { option: 'Mauritius', value: 'mauritius' },
  { option: 'Mexico', value: 'mexico' },
  { option: 'Micronesia', value: 'micronesia' },
  { option: 'Moldova', value: 'moldova' },
  { option: 'Monaco', value: 'monaco' },
  { option: 'Mongolia', value: 'mongolia' },
  { option: 'Montenegro', value: 'montenegro' },
  { option: 'Morocco', value: 'morocco' },
  { option: 'Mozambique', value: 'mozambique' },
  { option: 'Myanmar', value: 'myanmar' },
  { option: 'Namibia', value: 'namibia' },
  { option: 'Nauru', value: 'nauru' },
  { option: 'Nepal', value: 'nepal' },
  { option: 'Netherlands', value: 'netherlands' },
  { option: 'New Zealand', value: 'new_zealand' },
  { option: 'Nicaragua', value: 'nicaragua' },
  { option: 'Niger', value: 'niger' },
  { option: 'Nigeria', value: 'nigeria' },
  { option: 'North Macedonia', value: 'north_macedonia' },
  { option: 'Norway', value: 'norway' },
  { option: 'Oman', value: 'oman' },
  { option: 'Pakistan', value: 'pakistan' },
  { option: 'Palau', value: 'palau' },
  { option: 'Palestine', value: 'palestine' },
  { option: 'Panama', value: 'panama' },
  { option: 'Papua New Guinea', value: 'papua_new_guinea' },
  { option: 'Paraguay', value: 'paraguay' },
  { option: 'Peru', value: 'peru' },
  { option: 'Philippines', value: 'philippines' },
  { option: 'Poland', value: 'poland' },
  { option: 'Portugal', value: 'portugal' },
  { option: 'Qatar', value: 'qatar' },
  { option: 'Romania', value: 'romania' },
  { option: 'Russia', value: 'russia' },
  { option: 'Rwanda', value: 'rwanda' },
  { option: 'Saint Kitts and Nevis', value: 'saint_kitts_and_nevis' },
  { option: 'Saint Lucia', value: 'saint_lucia' },
  {
    option: 'Saint Vincent and the Grenadines',
    value: 'saint_vincent_and_the_grenadines',
  },
  { option: 'Samoa', value: 'samoa' },
  { option: 'San Marino', value: 'san_marino' },
  { option: 'Sao Tome and Principe', value: 'sao_tome_and_principe' },
  { option: 'Saudi Arabia', value: 'saudi_arabia' },
  { option: 'Senegal', value: 'senegal' },
  { option: 'Serbia', value: 'serbia' },
  { option: 'Seychelles', value: 'seychelles' },
  { option: 'Sierra Leone', value: 'sierra_leone' },
  { option: 'Singapore', value: 'singapore' },
  { option: 'Slovakia', value: 'slovakia' },
  { option: 'Slovenia', value: 'slovenia' },
  { option: 'Solomon Islands', value: 'solomon_islands' },
  { option: 'Somalia', value: 'somalia' },
  { option: 'South Africa', value: 'south_africa' },
  { option: 'South Sudan', value: 'south_sudan' },
  { option: 'Spain', value: 'spain' },
  { option: 'Sri Lanka', value: 'sri_lanka' },
  { option: 'Sudan', value: 'sudan' },
  { option: 'Suriname', value: 'suriname' },
  { option: 'Sweden', value: 'sweden' },
  { option: 'Switzerland', value: 'switzerland' },
  { option: 'Syria', value: 'syria' },
  { option: 'Taiwan', value: 'taiwan' },
  { option: 'Tajikistan', value: 'tajikistan' },
  { option: 'Tanzania', value: 'tanzania' },
  { option: 'Thailand', value: 'thailand' },
  { option: 'Togo', value: 'togo' },
  { option: 'Tonga', value: 'tonga' },
  { option: 'Trinidad and Tobago', value: 'trinidad_and_tobago' },
  { option: 'Tunisia', value: 'tunisia' },
  { option: 'Turkey', value: 'turkey' },
  { option: 'Turkmenistan', value: 'turkmenistan' },
  { option: 'Tuvalu', value: 'tuvalu' },
  { option: 'Uganda', value: 'uganda' },
  { option: 'Ukraine', value: 'ukraine' },
  { option: 'United Arab Emirates', value: 'united_arab_emirates' },
  { option: 'United Kingdom', value: 'united_kingdom' },
  { option: 'United States', value: 'united_states' },
  { option: 'Uruguay', value: 'uruguay' },
  { option: 'Uzbekistan', value: 'uzbekistan' },
  { option: 'Vanuatu', value: 'vanuatu' },
  { option: 'Vatican City', value: 'vatican_city' },
  { option: 'Venezuela', value: 'venezuela' },
  { option: 'Vietnam', value: 'vietnam' },
  { option: 'Yemen', value: 'yemen' },
  { option: 'Zambia', value: 'zambia' },
  { option: 'Zimbabwe', value: 'zimbabwe' },
];

// for topics page
export const TOPICS = [
  '  Biology & Life Sciences',
  'Business & Economics',
  'Chemistry & Materials Science',
  'Computer Science & Mathematics',
  'Engineering',
  'Environmental & Earth Sciences',
  'Medicine & Pharmacology',
  'Physical Sciences',
  'Social Sciences, Arts and Humanities',
  'Public Health & Healthcare',
  'All Disciplines',
];
export const RESULTS = [
  { value: '15', label: '15 Results per Page' },
  { value: '50', label: '50 Results per Page' },
  { value: '100', label: '100 Results per Page' },
];
export const DEADLINE = [
  { value: 'deadline', label: 'Submission Deadline' },
  { value: 'times', label: 'Times Viewed' },
  { value: 'Number', label: 'Number of Articles' },
];
