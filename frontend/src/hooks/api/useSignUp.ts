import { signUpUser } from "@/services/userService";
import { useAsync } from "../useAsync";

export const useSignUp = () => {
  const {
    loading: signUpLoading,
    act: signUpAct
  } = useAsync(signUpUser)

  return {
    signUpLoading,
    signUpAct
  }
}