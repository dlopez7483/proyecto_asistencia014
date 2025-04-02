import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { type Navigation } from "@toolpad/core";
import type { Branding } from "@toolpad/core";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import React, { useEffect } from "react";
import { useAppSelector, useAuthActions } from "@common/store/hooks";
import logoutFunction from "@common/services/logoutFunction";
import CustomAccount from "./CustomAccount";
import { InnerTheme, OutherTheme } from "@common/styles";

interface Props {
  branding: Branding;
  navigation: Navigation;
}

export default function Dashboard(props: Props) {
  const { deleteAuthAction } = useAuthActions();
  const { auth } = useAppSelector((state) => state);

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
          name: auth.carne,
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
