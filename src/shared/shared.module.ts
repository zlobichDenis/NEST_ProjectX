import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import * as Joi from "joi";
import {
    getAppConfig,
    getAwsSdkConfig,
    getBasicAuthConfig,
    getDatabaseConfig,
    getGoogleApiConfig,
    getJwtConfig,
    getYandexConfig,
} from "src/core/config";
import { PrismaService } from "./prisma-client";
import { CloudWatchService } from "./cloud-watch-client";
import { Logger } from "./logger";
import { S3BucketService } from "./s3-bucket-client/s3-bucket.service";

@Global()
@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: [".env"],
            // separate function for each config is
            // needed cause probably in future I will inject specific config module in features
            load: [
                getAppConfig,
                getDatabaseConfig,
                getGoogleApiConfig,
                getAwsSdkConfig,
                getJwtConfig,
                getBasicAuthConfig,
                getYandexConfig,
            ],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("develop", "local").default("develop"),
                DATABASE_URL: Joi.string(),
                DATABASE_USER_SCHEMA_NAME: Joi.string(),
                PORT: Joi.number().default(3000),
                GOOGLE_API_CLIENT_ID: Joi.string(),
                GOOGLE_API_CLIENT_SECRET: Joi.string(),
                GOOGLE_API_REDIRECT_URL: Joi.string(),
                AWS_REGION: Joi.string().valid().valid("eu-north-1"),
                AWS_ACCESS_KEY_ID: Joi.string(),
                AWS_SECRET_ACCESS_KEY: Joi.string(),
                AWS_PUBLIC_BUCKET_NAME: Joi.string(),
                JWT_SECRET: Joi.string(),
                JWT_EXPIRATION_TIME: Joi.number(),
                BASIC_USERNAME: Joi.string(),
                BASIC_PASSWORD: Joi.string(),
                YANDEX_LOGIN_INFO_URL: Joi.string(),
            }),
        }),
    ],
    providers: [PrismaService, CloudWatchService, Logger, ConfigService, S3BucketService],
    exports: [PrismaService, CloudWatchService, ConfigService, S3BucketService],
})
export class SharedModule {}
