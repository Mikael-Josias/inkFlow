import { signUpUser } from "@/services/userService";
import { useAsync } from "../useAsync";

export const useSignUp = () => {
  const {
    error: signUpError,
    act: signUpAct
  } = useAsync(signUpUser)

  return {
    signUpError,
    signUpAct
  }
}