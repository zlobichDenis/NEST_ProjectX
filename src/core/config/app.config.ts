type AppConfig = {
    port: number;
    env: "local" | "develop";
};

export const getAppConfig = (): AppConfig =>
{
    return { port: Number(process.env.PORT), env: process.env.NODE_ENV as AppConfig["env"] };
};
