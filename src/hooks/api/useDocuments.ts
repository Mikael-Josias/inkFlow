import { documentsAPI } from "@/services/documentService";
import { useAsync } from "../useAsync";

export const useDocuments = () => {
  const {
    data: documentsData,
    loading: documentsLoading,
  } = useAsync(documentsAPI, true);

  return {
    documentsData,
    documentsLoading
  }
}