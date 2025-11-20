export type ResponseWrapper<T> = {
    ok: boolean;
    message: string;
    body: T;
};
