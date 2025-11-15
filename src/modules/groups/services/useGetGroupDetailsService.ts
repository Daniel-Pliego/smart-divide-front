import { useGetGroupsService } from '@/modules/groups/services';
import { GROUP_DETAILS } from '../mock/groupsWithDetails';
interface useGetGroupsService {
  groupId: string;
  userId: string;
}

export const useGetGroupDetailsService = ({ groupId, userId }: useGetGroupsService) => {
  return GROUP_DETAILS; 
}
