import { useGetUserDetailsService } from "../services/useGetUserDetailsService";

export const useGetUserDetails = () => {

    const { data, error, isLoading } = useGetUserDetailsService();


  return {
    user: data,
    error,
    isLoading,
  }
}
