import * as process from "node:process";

type JwtConfig = {
    jwtSecret: string;
    jwtExpires: number;
};

export const getJwtConfig = (): JwtConfig =>
{
    return {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpires: Number(process.env.JWT_EXPIRATION_TIME),
    };
};
