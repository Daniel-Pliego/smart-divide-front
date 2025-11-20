import z from "zod";

export const UserSignInSchema = z.object({
    email: z.email("El correo electrónico no es válido"),
    password: z.string().nonempty("La contraseña es obligatoria")
});

export type UserSignIn = z.infer<typeof UserSignInSchema>;
