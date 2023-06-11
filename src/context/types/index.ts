import { ISignInBody } from "../../models/SignIn";
import { ISignUpBody } from "../../models/SignUp";
import { UserProfile } from "../../models/userProfile";

export interface IAuthState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null | undefined;
  initialLoading: boolean;
  isSigningIn: boolean;
  signInError: string;
  isSigningUp: boolean;
  signUpError: string;
}

export interface IAuthAction {
  signIn: ({ userName, password }: ISignInBody) => Promise<void>;
  signUp: ({ name, userName, password }: ISignUpBody) => Promise<void>;
  signOut: () => void;
}

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthAction;
}
