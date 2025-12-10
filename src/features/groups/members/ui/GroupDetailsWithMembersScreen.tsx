import { Box } from '@/lib/gluestack-ui/ui/box'
import { Button, ButtonText } from '@/lib/gluestack-ui/ui/button'
import { HStack } from '@/lib/gluestack-ui/ui/hstack'
import { Icon } from '@/lib/gluestack-ui/ui/icon'
import { ScreenLayout, UserAvatar } from '@/shared/components'
import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import { ICON_BY_GROUP_TYPE } from '../../config'
import useGroupDetailsWithMembers from '../hooks/useGroupDetailsWithMembers'

export default function GroupDetailsWithMembersScreen() {
  const groupDetail = useLocalSearchParams()
  const { owner, members, isOwner } = useGroupDetailsWithMembers(groupDetail.ownerId as string, groupDetail.id as string);
  const groupIconType = ICON_BY_GROUP_TYPE[groupDetail.type as keyof typeof ICON_BY_GROUP_TYPE];

  return (
    <ScreenLayout>
      <HStack className='gap-3 items-center'>
        <Box className="p-[2px] rounded-2xl mt-2">
          <Box
            className={`p-2 ${groupIconType?.color} w-20 h-20 rounded-2xl justify-center items-center border-2 border-white`}
          >
            <Icon
              as={groupIconType?.icon}
              className="text-white w-12 h-12"
            />
          </Box>
        </Box>

        <Box>
          <Text className="text-2xl font-semibold text-slate-900">
            {groupDetail?.name}
          </Text>
          {groupDetail?.description && (
            <Text
              className="text-slate-700 text-lg mt-1"
            >
              {groupDetail?.description}
            </Text>
          )}
        </Box>
      </HStack>

      <Box>
        <Text className='text-slate-900 text-xl font-medium mt-5 mb-3'>Creado por</Text>

        <HStack className="gap-3 items-center">
          <UserAvatar
            size="md"
            photoUrl={owner?.photoUrl!}
            name={owner?.name!}
          />

          <Text className="text-slate-900 text-lg">{owner?.name} {owner?.lastName}</Text>
        </HStack>
      </Box>

      <Box>
        <Text className='text-slate-900 text-xl font-medium mt-5 mb-3'>Miembros</Text>
        {
          members.map(member => (
            <HStack key={member.userId} className="gap-3 mb-5 items-center">
              <UserAvatar
                size="md"
                photoUrl={member?.photoUrl!}
                name={member?.name!}
              />

              <Text className="text-slate-900 text-lg">{member?.name} {member?.lastName}</Text>
            </HStack>
          ))
        }
      </Box>

      {
        <Link href={`/sections/group/${groupDetail.id}/member/add`} asChild disabled={!isOwner}>
          <Button className='border-purple-700 py-2 h-auto' variant='outline'>
            <ButtonText className='text-lg text-purple-700'>Agregar nuevo miembro</ButtonText>
          </Button>
        </Link>
      }
      {
        !isOwner && <Text className='text-slate-700 mt-1'>Solo el dueño del grupo puede agregar nuevos miembros</Text>
      }
    </ScreenLayout>

  )
}
