import * as z from "zod";
export const GroupFormDataSchema = z.object({
    name: z
        .string()
        .refine((val) => val.trim().length > 0, {
            message: "El nombre del grupo es obligatorio",
        }),
    description: z.string().optional(),
    type: z.string().refine((val) => val.trim().length > 0, {
        message: "El tipo del grupo es obligatorio",
    }),
});
