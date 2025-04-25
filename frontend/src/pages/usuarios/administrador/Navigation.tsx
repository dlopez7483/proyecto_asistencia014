import type { Navigation } from '@toolpad/core';

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Opciones',
  },
  {
    segment: 'dashboard-admin/tutores',
    title: 'Tutores',
    icon: <PersonIcon />,
  },
  {
    segment: 'dashboard-admin/horarios',
    title: 'Horarios',
    icon: <CalendarMonthIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analítica',
  },
  {
    segment: 'dashboard-admin/reportes',
    title: 'Reportes',
    icon: <BarChartIcon />,
  },
];

export default NAVIGATION;
