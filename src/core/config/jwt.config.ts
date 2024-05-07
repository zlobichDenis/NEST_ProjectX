import * as process from "node:process";

type JwtConfig = {
    jwtSecret: string;
    jwtExpires: number;
    jwtRefreshSecret: string;
    jwtRefreshExpires: number;
};

export const getJwtConfig = (): JwtConfig =>
{
    return {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpires: Number(process.env.JWT_EXPIRATION_TIME),
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        jwtRefreshExpires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    };
};
