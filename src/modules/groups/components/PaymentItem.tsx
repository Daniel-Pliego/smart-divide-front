import { Box } from "@/lib/gluestack-ui/ui/box";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { Icon } from "@/lib/gluestack-ui/ui/icon";
import { toMoney } from "@/shared/utils";
import { HandCoins } from "lucide-react-native";
import { Text } from "react-native";
import { PaymentRecord } from "../types";

export const PaymentItem = ({ payment }: { payment: PaymentRecord }) => {
    const { fromUser, toUser, amount } = payment;

    return (
        <HStack className="gap-3 bg-gray-100 rounded-md p-5 shadow-lg items-center">
            <Box
                className={`p-2 mt-1 w-12 h-12 items-center justify-center rounded-xl bg-teal-500/70`}
            >
                <Icon as={HandCoins} className="text-white w-[70%] h-[70%]" />
            </Box>

            <Box>
                <Text className="text-lg line-clamp-2 leading-tight font-medium text-wrap">
                    Pago realizado
                </Text>
                <Text className="text-slate-700">
                    {fromUser.name} pagó {toMoney(amount)} a {toUser.name}
                </Text>
            </Box>
        </HStack>
    );
};
