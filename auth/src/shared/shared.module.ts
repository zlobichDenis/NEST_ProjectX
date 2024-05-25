import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { getAppConfig, getAwsSdkConfig, getDatabaseConfig, getGoogleApiConfig, getJwtConfig } from "src/core/config";
import { PrismaService } from "./prisma-client";
import { CloudWatchService } from "./cloud-watch-client";
import { Logger } from "./logger";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            // separate function for each config is
            // needed cause probably in future I will inject specific config module in features
            load: [getAppConfig, getDatabaseConfig, getGoogleApiConfig, getAwsSdkConfig, getJwtConfig],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("develop", "local").default("develop"),
                DATABASE_URL: Joi.string(),
                DATABASE_USER_SCHEMA_NAME: Joi.string(),
                PORT: Joi.number().default(3000),
                GOOGLE_API_CLIENT_ID: Joi.string(),
                GOOGLE_API_CLIENT_SECRET: Joi.string(),
                GOOGLE_API_REDIRECT_URL: Joi.string(),
                // AWS_REGION: Joi.string().valid().valid("eu-north-1"),
                // AWS_ACCESS_KEY_ID: Joi.string(),
                // AWS_SECRET_ACCESS_KEY: Joi.string(),
                // AWS_CLOUDWATCH_GROUP_NAME: Joi.string().valid("api-projectx-local", "api-projectx-develop"),
                // AWS_CLOUDWATCH_STREAM_NAME: Joi.string(),
                JWT_SECRET: Joi.string(),
                JWT_EXPIRATION_TIME: Joi.number(),
            }),
        }),
    ],
    providers: [PrismaService, CloudWatchService, Logger, ConfigService],
    exports: [PrismaService, CloudWatchService, ConfigService],
})
export class SharedModule {}
