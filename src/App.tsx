import { CssBaseline } from "@mui/material";
import buildCustomDataProvider from "ra-data-hasura";
import React, { useEffect, useState } from "react";
import {
  Admin,
  DataProvider,
  Loading,
  Resource,
} from "react-admin";
import { MenuList } from "@app/modules/menu/components/menu-list/menu-list.component";
import { MenuEdit } from "@app/modules/menu/components/menu-edit/menu-edit.component";
import { MenuCreate } from "@app/modules/menu/components/menu-create/menu-create.component";

function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null
  );
  useEffect(() => {
    const buildDataProvider = async () => {
      const dp = await buildCustomDataProvider({
        clientOptions: { uri: "http://localhost:8080/v1/graphql" },
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

      <Admin dataProvider={dataProvider}>
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
