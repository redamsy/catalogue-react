import React, { useContext } from "react";
import { IAuthAction, IAuthContext, IAuthState } from "./types";

// initial value for the auth context
export const initialContext: IAuthContext = {
  state: {
    isAuthenticated: false,
    userProfile: null,
    initialLoading: true,
    isSigningIn: false,
    signInError: "",
    isSigningUp: false,
    signUpError: "",
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signIn: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signUp: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => {},
  },
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);

// hook for accessing the auth state
export const useAuthState = (): IAuthState => {
  const { state } = useContext(AuthContext);
  return state;
};
// hook for accessing the auth actions
export const useAuthActions = (): IAuthAction => {
  const { actions } = useContext(AuthContext);
  return actions;
};
