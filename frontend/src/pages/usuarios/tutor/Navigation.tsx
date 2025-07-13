import type { Navigation } from '@toolpad/core';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Opciones',
  },
  {
    segment: 'dashboard-tutor/horarios',
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
    segment: 'dashboard-tutor/reportes',
    title: 'Reportes',
    icon: <BarChartIcon />,
  },
];

export default NAVIGATION;
