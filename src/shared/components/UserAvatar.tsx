import { Avatar, AvatarFallbackText, AvatarImage } from "@/lib/gluestack-ui/ui/avatar";
import React from "react";

export const UserAvatar = ({
    photoUrl,
    name,
    className = ""
}: {
    photoUrl: string;
    name: string;
    className?: string;
}) => {
    return (
        <Avatar className={`w-10 h-10 ${className}`}>
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
