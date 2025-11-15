import { GROUP_DETAILS } from "../../mock";

interface useGetGroupsService {
  groupId: string;
  userId: string;
}

export const useGetGroupDetailsService = ({ groupId, userId }: useGetGroupsService) => {
  return GROUP_DETAILS; 
}
