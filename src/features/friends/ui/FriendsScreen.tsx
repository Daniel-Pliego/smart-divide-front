import { Button, ButtonText } from "@/lib/gluestack-ui/ui/button";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { EmptyState, InputTextControlled, ScreenLayout, UserAvatar } from "@/shared/components";
import FriendsImage from "@assets/friends.svg";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFriendsScreen } from "../hooks/useFriendsScreen";

export default function FriendsScreen() {
  const { control, errors, handleSubmit, isSubmitting, isLoading, friends, onSubmit } = useFriendsScreen();

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <ScreenLayout>
          <Text className="text-slate-900 text-xl font-medium mb-3 mt-10">Agrega a un amigo</Text>
          <InputTextControlled

            control={control}
            name="friendId"
            error={errors.friendId}
            placeholder="ej: 8736...akl11215f"
          />

          <Button className="bg-purple-700 mt-5" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
            <ButtonText className="text-lg w-full text-center">
              Agregar
            </ButtonText>
          </Button>


         {friends?.length !== 0 && <Text className="text-slate-900 mt-8 text-xl font-medium mb-3">Tus amigos registrados</Text> }

          {
            friends?.map((friend) => (
              <HStack key={friend.friendshipId} className="gap-3 mb-5 items-center">
                <UserAvatar
                  size="md"
                  photoUrl={friend.photoUrl}
                  name={friend.name}
                />

                <VStack>
                  <Text className="text-slate-900 text-lg">{friend.name} {friend.lastName}</Text>
                  <Text className="text-slate-700">{friend.email}</Text>
                </VStack>
              </HStack>
            ))
          }

          <EmptyState title="Agrega a tus amigos" image={<FriendsImage width={300} height={300} />} show={!isLoading && friends?.length === 0} />

        </ScreenLayout>



      </SafeAreaView>
    </>
  )
}
