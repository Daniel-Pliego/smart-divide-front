import z from "zod";

export const NumberSchema = z
    .string()
    .refine((val) => val !== "" && !isNaN(Number(val)), {
        message: "El monto debe de ser un número válido",
    })
    .refine((val) => Number(val) > 0, {
        message: "El monto debe de ser mayor a 0",
    });

export const ImageFileSchema = z
    .object({
        uri: z.url().or(z.string().startsWith("file://")),
        fileName: z.string().optional(),
        mimeType: z.string().optional(),
        fileSize: z.number().optional(),
        type: z.enum(["image", "video"]).optional(),
    })
    .refine(
        (file) => !file.fileSize || file.fileSize <= 5 * 1024 * 1024,
        "El archivo debe ser menor a 5MB."
    )
    .refine(
        (file) =>
            !file.mimeType || ["image/jpeg", "image/jpg", "image/png"].includes(file.mimeType),
        "Solo se permiten imágenes .jpg, .jpeg, o .png."
    );
