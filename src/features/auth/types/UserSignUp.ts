import z from "zod";

export const userSignUpFormSchema = z.object({
    name: z.string().nonempty("El nombre es obligatorio"),
    lastName: z.string().nonempty("El apellido es obligatorio"),
    email: z.email("El correo electrónico no es válido"),
    password: z
        .string()
        .nonempty("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().nonempty("La confirmación de la contraseña es obligatoria"),
});

export type UserSignUpForm = z.infer<typeof userSignUpFormSchema>;

export type UserSignUp = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    photoUrl?: string;
};
