import { serviceAPI } from "@/services/sessionService";
import { useAsync } from "../useAsync";

export const useSignIn = () => {
  const {
    loading: signInLoading,
    act: signInAct,
  } = useAsync(serviceAPI);

  return {
    signInLoading,
    signInAct,
  }
}