import { RxDashboard } from 'react-icons/rx';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { AiOutlineSwap } from 'react-icons/ai';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { CiMedal } from 'react-icons/ci';
import { GiCandleHolder } from 'react-icons/gi';
import { PiPenNib } from 'react-icons/pi';

export const Steps = [
  'Personal Info',
  'Next of Kin',
  'Service Record',
  'Contact Info',
  'Academic',
  'Progression',
  'Deployment',
  'Digital Files',
  'Courses',
  'PM',
];
export const SideList = [
  {
    id: 1,
    title: 'Dashboard',
    icons: <RxDashboard className="w-5 h-5" />,
    path: '/',
    roles: ['ict', 'management', 'registry'],
  },
  {
    id: 2,
    title: 'Register',
    icons: <PiPenNib className="w-5 h-5 rotate-[270deg]" />,
    path: '/register',
    roles: ['registry'],
  },
  {
    id: 3,
    title: 'ICT',
    icons: <RxDashboard className="w-5 h-5" />,
    path: '/ict',
    roles: ['ict'],
  },
  {
    id: 4,
    title: 'Management',
    icons: <RxDashboard className="w-5 h-5" />,
    path: '/management',
    roles: ['management'],
  },
];
export const CardList = [
  {
    id: 1,
    title: 'Registered Personnel',
    figure: 120,
    icons: (
      <PersonAddOutlinedIcon sx={{ color: '#0256C5', fontSize: '17px' }} />
    ),
  },
  {
    id: 2,
    title: 'Out-of-State Transfer',
    icons: <AiOutlineSwap className="w-[17px] text-[#FD7E14]" />,
    figure: 35,
  },
  {
    id: 3,
    title: 'Active Personnel',
    icons: <MdOutlineNotificationsActive className="w-[17px] text-[#28A745]" />,
    figure: 700,
  },
  {
    id: 4,
    title: 'Retired Personnel',
    icons: <CiMedal className="w-[17px] text-[#D2B48C]" />,
    figure: 40,
  },
  {
    id: 4,
    title: 'Deceased Personnel',
    icons: <GiCandleHolder className="w-[17px] text-[#6B6B6B]" />,
    figure: 35,
  },
];
export const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'text-green-100 border-green-100 bg-green-200';
    case 'Pending':
      return 'text-yellow-500 border-yellow-500';
    case 'Suspended':
      return 'text-red-300 border-red-300 bg-red-400';
    case 'Inactive':
      return 'text-red-300 border-red-300 bg-red-400';
    default:
      return 'text-gray-500';
  }
};
export const sampleData = [
  {
    id: 1,
    Date: '30/10/2023',
    Employee: 'Akinala',
    Gender: 'Male',
    ServiceNumber: 'CD/2023/00123',
    status: 'Active',
    rank: 'Lance Corporal',
  },
  {
    id: 2,
    Date: '28/10/2023',
    Employee: 'Bello',
    Gender: 'Male',
    ServiceNumber: 'CD/2023/00124',
    status: 'Inactive',
    rank: 'Corporal',
  },
  {
    id: 3,
    Date: '25/10/2023',
    Employee: 'Chukwu',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00125',
    status: 'Pending',
    rank: 'Sergeant',
  },
  {
    id: 4,
    Date: '22/10/2023',
    Employee: 'Daramola',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00126',
    status: 'Suspended',
    rank: 'Private',
  },
  {
    id: 5,
    Date: '20/10/2023',
    Employee: 'Eze',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00127',
    status: 'Active',
    rank: 'Lieutenant',
  },
  {
    id: 6,
    Date: '18/10/2023',
    Employee: 'Femi',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00128',
    status: 'Inactive',
    rank: 'Captain',
  },
  {
    id: 7,
    Date: '15/10/2023',
    Employee: 'Gambo',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00129',
    status: 'Pending',
    rank: 'Major',
  },
  {
    id: 8,
    Date: '12/10/2023',
    Employee: 'Hassan',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00130',
    status: 'Suspended',
    rank: 'Colonel',
  },
  {
    id: 9,
    Date: '10/10/2023',
    Employee: 'Idris',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00131',
    status: 'Active',
    rank: 'Brigadier',
  },
  {
    id: 10,
    Date: '08/10/2023',
    Employee: 'James',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00132',
    status: 'Inactive',
    rank: 'General',
  },
  {
    id: 11,
    Date: '06/10/2023',
    Employee: 'Kelechi',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00133',
    status: 'Pending',
    rank: 'Lance Corporal',
  },
  {
    id: 12,
    Date: '04/10/2023',
    Employee: 'Lekan',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00134',
    status: 'Suspended',
    rank: 'Corporal',
  },
  {
    id: 13,
    Date: '02/10/2023',
    Employee: 'Musa',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00135',
    status: 'Active',
    rank: 'Sergeant',
  },
  {
    id: 14,
    Date: '30/09/2023',
    Employee: 'Nkechi',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00136',
    status: 'Inactive',
    rank: 'Private',
  },
  {
    id: 15,
    Date: '28/09/2023',
    Employee: 'Okoro',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00137',
    status: 'Pending',
    rank: 'Lieutenant',
  },
  {
    id: 16,
    Date: '26/09/2023',
    Employee: 'Peter',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00138',
    status: 'Suspended',
    rank: 'Captain',
  },
  {
    id: 17,
    Date: '24/09/2023',
    Employee: 'Quasim',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00139',
    status: 'Active',
    rank: 'Major',
  },
  {
    id: 18,
    Date: '22/09/2023',
    Employee: 'Rebecca',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00140',
    status: 'Inactive',
    rank: 'Colonel',
  },
  {
    id: 19,
    Date: '20/09/2023',
    Employee: 'Sani',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00141',
    status: 'Pending',
    rank: 'Brigadier',
  },
  {
    id: 20,
    Date: '18/09/2023',
    Employee: 'Tunde',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00142',
    status: 'Suspended',
    rank: 'General',
  },
  {
    id: 21,
    Date: '16/09/2023',
    Employee: 'Umar',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00143',
    status: 'Active',
    rank: 'Lance Corporal',
  },
  {
    id: 22,
    Date: '14/09/2023',
    Employee: 'Victor',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00144',
    status: 'Inactive',
    rank: 'Corporal',
  },
  {
    id: 23,
    Date: '12/09/2023',
    Employee: 'Wale',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00145',
    status: 'Pending',
    rank: 'Sergeant',
  },
  {
    id: 24,
    Date: '10/09/2023',
    Employee: 'Xavier',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00146',
    status: 'Suspended',
    rank: 'Private',
  },
  {
    id: 25,
    Date: '08/09/2023',
    Employee: 'Yusuf',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00147',
    status: 'Active',
    rank: 'Lieutenant',
  },
  {
    id: 26,
    Date: '06/09/2023',
    Employee: 'Zainab',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00148',
    status: 'Inactive',
    rank: 'Captain',
  },
  {
    id: 27,
    Date: '04/09/2023',
    Employee: 'Aisha',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00149',
    status: 'Pending',
    rank: 'Major',
  },
  {
    id: 28,
    Date: '02/09/2023',
    Employee: 'Bolanle',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00150',
    status: 'Suspended',
    rank: 'Colonel',
  },
  {
    id: 29,
    Date: '31/08/2023',
    Employee: 'Chika',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00151',
    status: 'Active',
    rank: 'Brigadier',
  },
  {
    id: 30,
    Date: '29/08/2023',
    Employee: 'Deborah',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00152',
    status: 'Inactive',
    rank: 'General',
  },
  {
    id: 31,
    Date: '27/08/2023',
    Employee: 'Emeka',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00153',
    status: 'Pending',
    rank: 'Lance Corporal',
  },
  {
    id: 32,
    Date: '25/08/2023',
    Employee: 'Folasade',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00154',
    status: 'Suspended',
    rank: 'Corporal',
  },
  {
    id: 33,
    Date: '23/08/2023',
    Employee: 'Gabriel',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00155',
    status: 'Active',
    rank: 'Sergeant',
  },
  {
    id: 34,
    Date: '21/08/2023',
    Employee: 'Hauwa',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00156',
    status: 'Inactive',
    rank: 'Private',
  },
  {
    id: 35,
    Date: '19/08/2023',
    Employee: 'Ibrahim',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00157',
    status: 'Pending',
    rank: 'Lieutenant',
  },
  {
    id: 36,
    Date: '17/08/2023',
    Employee: 'Joy',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00158',
    status: 'Suspended',
    rank: 'Captain',
  },
  {
    id: 37,
    Date: '15/08/2023',
    Employee: 'Kemi',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00159',
    status: 'Active',
    rank: 'Major',
  },
  {
    id: 38,
    Date: '13/08/2023',
    Employee: 'Lami',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00160',
    status: 'Inactive',
    rank: 'Colonel',
  },
  {
    id: 39,
    Date: '11/08/2023',
    Employee: 'Mike',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00161',
    status: 'Pending',
    rank: 'Brigadier',
  },
  {
    id: 40,
    Date: '09/08/2023',
    Employee: 'Nana',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00162',
    status: 'Suspended',
    rank: 'General',
  },
  {
    id: 41,
    Date: '07/08/2023',
    Employee: 'Oscar',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00163',
    status: 'Active',
    rank: 'Lance Corporal',
  },
  {
    id: 42,
    Date: '05/08/2023',
    Employee: 'Pauline',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00164',
    status: 'Inactive',
    rank: 'Corporal',
  },
  {
    id: 43,
    Date: '03/08/2023',
    Employee: 'Queen',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00165',
    status: 'Pending',
    rank: 'Sergeant',
  },
  {
    id: 44,
    Date: '01/08/2023',
    Employee: 'Remi',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00166',
    status: 'Suspended',
    rank: 'Private',
  },
  {
    id: 45,
    Date: '30/07/2023',
    Employee: 'Sade',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00167',
    status: 'Active',
    rank: 'Lieutenant',
  },
  {
    id: 46,
    Date: '28/07/2023',
    Employee: 'Tina',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00168',
    status: 'Inactive',
    rank: 'Captain',
  },
  {
    id: 47,
    Date: '26/07/2023',
    Employee: 'Uche',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00169',
    status: 'Pending',
    rank: 'Major',
  },
  {
    id: 48,
    Date: '24/07/2023',
    Employee: 'Victoria',
    Gender: 'Female',

    ServiceNumber: 'CD/2023/00170',
    status: 'Suspended',
    rank: 'Colonel',
  },
  {
    id: 49,
    Date: '22/07/2023',
    Employee: 'Wuraola',
    Gender: 'Feale',

    ServiceNumber: 'CD/2023/00171',
    status: 'Active',
    rank: 'Brigadier',
  },
  {
    id: 50,
    Date: '20/07/2023',
    Employee: 'Xolani',
    Gender: 'Male',

    ServiceNumber: 'CD/2023/00172',
    status: 'Inactive',
    rank: 'General',
  },
];
