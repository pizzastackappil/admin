import { apolloClient } from "./apollo-client";
import { JWT_ADMIN_TOKEN } from "./constants";
import { AdminLoginQuery, AdminLoginQueryVariables } from "./types";
import AdminLoginQueryGql from "@app/core/graphql/admin-login.gql";
export const authProvider = {
    login: async (variables: AdminLoginQueryVariables) => {
      const { data } = await apolloClient.query<
        AdminLoginQuery,
        AdminLoginQueryVariables
      >({
        query: AdminLoginQueryGql,
        variables,
      });
  
      if (!data.adminLogin?.accessToken) {
        return Promise.reject();
      }
  
      localStorage.setItem(JWT_ADMIN_TOKEN, data.adminLogin.accessToken);
    },
    logout: () => {
      localStorage.removeItem(JWT_ADMIN_TOKEN);
      return Promise.resolve();
    },
    checkAuth: () => {
      if (!localStorage.getItem(JWT_ADMIN_TOKEN)) {
        return Promise.reject();
      }
  
      return Promise.resolve();
    },
    checkError: (error: any) => {
      return Promise.resolve();
    },
  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName: "John Doe",
    }),
  getPermissions: () => Promise.resolve(""),
};
