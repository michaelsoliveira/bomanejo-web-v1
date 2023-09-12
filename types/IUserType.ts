export type SignInRequestDataType = {
    email: string;
    password: string;
}

export type UserType = {
    id: string;
    email: string;
    username: string;
}

type DataResponseUserType = {
    error: boolean;
    errorMessage: string;
    data: {
        user: UserType,
        token: {
            accessToken: string;
            expiresIn: number;
        };
        refreshToken: string;
    };
}