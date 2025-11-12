import { Box } from "@/lib/gluestack-ui/ui/box";

interface ScreenLayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export const ScreenLayout = ({ children, header }: ScreenLayoutProps) => {
    return (
        <>
            {header || null}
            <Box className="mx-5">{children}</Box>
        </>
    );
};
