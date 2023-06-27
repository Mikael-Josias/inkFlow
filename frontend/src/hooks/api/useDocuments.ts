import { documentsAPI } from "@/services/documentService";
import { useAsync } from "../useAsync";

export const useDocuments = <T>() => {
  const {
    data: documentsData,
    loading: documentsLoading,
  } = useAsync<T>(documentsAPI, true);

  return {
    documentsData,
    documentsLoading
  }
}