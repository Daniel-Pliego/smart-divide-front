import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GroupDetails() {
    const { groupId } = useLocalSearchParams();
    return (
        <View>
            <Text>Groupo details {groupId}</Text>
        </View>
    );
}
