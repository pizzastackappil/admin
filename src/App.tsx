import { CssBaseline } from "@mui/material";
import buildCustomDataProvider from "ra-data-hasura";
import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Loading, Resource } from "react-admin";
import { MenuList } from "@app/modules/menu/components/menu-list/menu-list.component";
import { MenuEdit } from "@app/modules/menu/components/menu-edit/menu-edit.component";
import { MenuCreate } from "@app/modules/menu/components/menu-create/menu-create.component";
import { authProvider } from "./core/authProvider";
import { apolloClient } from "./core/apollo-client";
import { theme } from "./core/themes";
import { i18nProvider } from "./core/i18n";

function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null
  );
  useEffect(() => {
    const buildDataProvider = async () => {
      const dp = await buildCustomDataProvider({
        client: apolloClient,
      });
      setDataProvider(dp);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) {
    return <Loading />;
  }

  return (
    <>
      <CssBaseline />

      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        requireAuth
        theme={theme}
      >
        <Resource
          name="menu"
          list={MenuList}
          edit={MenuEdit}
          create={MenuCreate}
        />
      </Admin>
    </>
  );
}

export default App;
