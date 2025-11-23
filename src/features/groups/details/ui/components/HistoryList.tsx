import { VStack } from "@/lib/gluestack-ui/ui/vstack";
import { Text } from "react-native";
import { ExpenseRecord, PaymentRecord } from "../../types";
import { ExpenseItem } from "./ExpenseItem";
import { PaymentItem } from "./PaymentItem";

interface HistoryListProps {
    date: string;
    items: (ExpenseRecord | PaymentRecord)[];
    userId: string;
}

export const HistoryList = ({ date, items, userId }: HistoryListProps) => {
    return (
        <>
            <Text className="mb-2 mt-5 text-lg">{date}</Text>
            <VStack className="gap-5">
                {items.map((item) =>
                    "fromUser" in item ? (
                        <PaymentItem key={item.id + "payment"} payment={item} />
                    ) : (
                        <ExpenseItem key={item.id + "expense"} expense={item} userId={userId} />
                    )
                )}
            </VStack>
        </>
    );
};
