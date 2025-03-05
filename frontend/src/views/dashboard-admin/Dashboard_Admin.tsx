import { createTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet } from 'react-router-dom';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Opciones',
  },
  {
    segment: 'dashboard-admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
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

const BRANDING = {
  logo: <img src="/src/assets/logo-ecys-fiusac-min.png" alt="DTT USAC" style={{height:'100%', width:'auto'}}/>,
  title: '',
  homeUrl: '/dashboard-admin',
};

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {},
    dark: false,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


export default function Dashboard_Admin() {

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      theme={Theme}
      branding={BRANDING}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
