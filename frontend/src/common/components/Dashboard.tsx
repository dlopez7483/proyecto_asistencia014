import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { type Navigation } from "@toolpad/core";
import type { Branding } from "@toolpad/core";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router-dom";
import { OutherTheme } from "../styles/OutherTheme";
import { ThemeProvider } from "@mui/material";
import { InnerTheme } from "../styles/InnerTheme";
import React from "react";
import { useAppSelector } from "@common/store/hooks/useStoreHooks";
import { useAuthActions } from "@common/store/hooks/useAuthActions";
import CustomAccount from "./CustomAccount";
import logoutFunction from "@common/services/logoutFunction";

interface Props {
  branding: Branding;
  navigation: Navigation;
}

export default function Dashboard(props: Props) {
  const { deleteAuthAction } = useAuthActions();
  const currentAuth = useAppSelector((state) => state.auth);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        logoutFunction()
          .then((res) => {
            console.log(res);
            deleteAuthAction();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    };
  }, [deleteAuthAction]);

  return (
    <ReactRouterAppProvider
      navigation={props.navigation}
      theme={OutherTheme}
      branding={props.branding}
      authentication={authentication}
      session={{
        user: {
          name: currentAuth.carne,
        },
      }}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: CustomAccount,
        }}
      >
        <PageContainer>
          <ThemeProvider theme={InnerTheme}>
            <Outlet />
          </ThemeProvider>
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
