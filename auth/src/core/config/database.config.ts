type DatabaseConfig = {
    databaseUrl: string;
    shadowDatabaseUrl: string;
    name: string;
    username: string;
    password: string;
    userSchemaName: string;
};

export const getDatabaseConfig = (): DatabaseConfig =>
{
    return {
        databaseUrl: process.env.DATABASE_URL,
        shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        userSchemaName: process.env.DATABASE_USER_SCHEMA_NAME,
    };
};
