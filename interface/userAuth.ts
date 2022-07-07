export type UserRegister = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}