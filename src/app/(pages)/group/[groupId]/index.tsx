import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Group() {
    const { groupId } = useLocalSearchParams();
    return (
        <View>
            <Text>Group {groupId}</Text>
        </View>
    );
}
