import { UserSignUp, UserSignUpForm } from "../types";

export const mapSignUpFormToUserSignUp = (user: UserSignUpForm): UserSignUp => {
    return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        photoUrl: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.name}+${user.lastName}`,
    };

}