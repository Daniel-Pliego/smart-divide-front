import {
    Accordion,
    AccordionContent,
    AccordionContentText,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger,
} from "@/lib/gluestack-ui/ui/accordion";
import { HStack } from "@/lib/gluestack-ui/ui/hstack";
import { ChevronRightIcon } from "lucide-react-native";

interface AccordionUserBalanceProps {
    title: string | React.ReactNode;
    content: string | React.ReactNode;
    isDefaultExpanded?: boolean;
    summaryStyles?: string,
    contentStyles?: string,
}

export const AccordionUserBalance = ({
    title,
    content,
    isDefaultExpanded,
    summaryStyles = "",
    contentStyles = ""
}: AccordionUserBalanceProps) => {
    return (
        <Accordion type="multiple" defaultValue={isDefaultExpanded ? ["a"] : []} className="shadow-none">
            <AccordionItem value="a">
                <AccordionHeader>
                    <AccordionTrigger className="p-0">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                            return (
                                <HStack className={`bg-gray-100 items-center p-4 ${isExpanded ? "rounded-s-lg pb-1" : "rounded-lg"} ${summaryStyles}`}>
                                    <AccordionTitleText>{title}</AccordionTitleText>
                                    <AccordionIcon
                                        as={ChevronRightIcon}
                                        className={`transition-transform duration-75 ${isExpanded ? "rotate-90" : ""
                                            }`}
                                    />
                                </HStack>
                            );
                        }}
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className={`bg-gray-100 rounded-e-lg ${contentStyles}`}>
                    <AccordionContentText>{content}</AccordionContentText>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
