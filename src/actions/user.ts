import { AxiosResponse } from "axios";
import otherAxios from "../interceptors/otherAxios";
import { UserProfile } from "../models/userProfile";

export const getCurrentUserProfile = async (): Promise<
  AxiosResponse<UserProfile>
> => {
  const resp = await otherAxios.get<UserProfile>("/api/user/self");
  console.log("getCurrentUserProfile: resp", resp);

  return resp;
};
