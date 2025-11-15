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
}

export const AccordionUserBalance = ({ title, content }: AccordionUserBalanceProps) => {
    return (
        <Accordion type="multiple">
            <AccordionItem value="a">
                <AccordionHeader>
                    <AccordionTrigger className="p-0">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                            return (
                                <HStack className={`bg-gray-100 items-center p-4 ${isExpanded ? "rounded-s-lg pb-1": "rounded-lg"}`}>
                                    <AccordionTitleText>{title}</AccordionTitleText>
                                    <AccordionIcon
                                        as={ChevronRightIcon}
                                        className={`transition-transform duration-75 ${
                                            isExpanded ? "rotate-90" : ""
                                        }`}
                                    />
                                </HStack>
                            );
                        }}
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="bg-gray-100 rounded-e-lg shadow-lg">
                    <AccordionContentText>{content}</AccordionContentText>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
