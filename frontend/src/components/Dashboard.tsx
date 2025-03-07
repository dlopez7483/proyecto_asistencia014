import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core';
import type { Branding } from '@toolpad/core';
import type { Theme } from '@mui/material';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer'
import { Outlet } from 'react-router-dom';

interface Props {
  branding: Branding;
  navigation: Navigation;
  theme: Theme;
}

export default function Dashboard(props: Props) {

  return (
    <ReactRouterAppProvider
      navigation={props.navigation}
      theme={props.theme}
      branding={props.branding}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
