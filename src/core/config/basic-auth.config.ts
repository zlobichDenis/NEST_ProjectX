type BasicAuthConfig = {
    basicUsername: string;
    basicPassword: string;
};

export const getBasicAuthConfig = (): BasicAuthConfig =>
{
    return {
        basicUsername: process.env.BASIC_USERNAME,
        basicPassword: process.env.BASIC_PASSWORD,
    };
};
