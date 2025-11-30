import { Avatar, AvatarFallbackText, AvatarImage } from "@/lib/gluestack-ui/ui/avatar";
import React from "react";

export const UserAvatar = ({
    photoUrl,
    name,
    className = "", 
    size
}: {
    photoUrl: string;
    name: string;
    className?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}) => {
    return (
        <Avatar className={`w-10 h-10 ${className}`} size={size}>
            {photoUrl ? (
                <AvatarImage
                    source={{
                        uri: photoUrl,
                    }}
                />
            ) : (
                <AvatarFallbackText>{name?.[0] ?? "U"}</AvatarFallbackText>
            )}
        </Avatar>
    );
};
