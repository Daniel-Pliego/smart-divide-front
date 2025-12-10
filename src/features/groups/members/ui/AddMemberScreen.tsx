import { Button, ButtonText } from '@/lib/gluestack-ui/ui/button';
import { HStack } from '@/lib/gluestack-ui/ui/hstack';
import { ScreenLayout, UserAvatar } from '@/shared/components';
import React from 'react';
import { Pressable, Text } from 'react-native';
import useAddMember from '../hooks/useAddMember';

export default function AddMemberScreen() {
  const { availableFriends, selectMember, memberSelected, onSubmit, isSubmitting } = useAddMember();
  return (
    <ScreenLayout>
      {
        availableFriends.map(friend => (
          <Pressable onPress={() => selectMember(friend.friendshipId)} key={friend.friendshipId}>
            <HStack className={`gap-3 items-center p-3 rounded-lg ${memberSelected === friend.friendshipId ? 'bg-gray-100' : 'bg-white'}`}>
              <UserAvatar
                size="md"
                photoUrl={friend?.photoUrl!}
                name={friend?.name!}
              />

              <Text className="text-slate-900 text-lg">{friend?.name} {friend?.lastName}</Text>
            </HStack>

          </Pressable>
        ))
      }

      {
        availableFriends.length === 0 && (
          <Text>No hay más amigos por agregar</Text>
        )
      }
      <Button className={`${availableFriends.length === 0 ? 'border-gray-200 bg-gray-100' : 'bg-purple-700'} py-2 h-auto mt-5`} variant='outline' disabled={!memberSelected || isSubmitting} onPress={onSubmit}>
        <ButtonText className='text-lg text-purple-700'>Agregar nuevo miembro</ButtonText>
      </Button>
    </ScreenLayout>
  )
}
