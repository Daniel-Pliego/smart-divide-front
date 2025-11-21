import { ResponseWrapper } from "@/features/config/types";

export type AuthResponse = {
    token: string;
    userId: string;
    name: string;
    lastName: string;
    photoUrl: string;
};


export type AuthWrappedResponse = ResponseWrapper<AuthResponse>