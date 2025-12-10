import z from "zod"

export const FriendFormSchema = z.object({
 friendId: z.string().nonempty("El id del amigo es requerido")
})

export type FriendsForm = z.infer<typeof FriendFormSchema>