import { isAxiosError } from "axios";
import { storeToRefs } from "pinia";
import { mangocatnotesApi } from "@/shared/api/mangocatnotesApi";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { IAuthResponse } from "@/modules/auth/interfaces";

export const useTokenValidation = () => {
  const authStore = useAuthStore();
  const { username, isAuthenticated } = storeToRefs(authStore);

  const setUserData = (data: IAuthResponse) => {
    authStore.setUser(data.username);
    authStore.setAuthenticated(true);
  };

  const validateToken = async (): Promise<IAuthResponse | void> => {
    try {
      const { data } = await mangocatnotesApi.get<IAuthResponse>(
        "/auth/validate-token",
      );
      setUserData(data);
      return data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) authStore.logout();
      }
    }
  };

  return {
    validateToken,
    username,
    isAuthenticated,
  };
};
