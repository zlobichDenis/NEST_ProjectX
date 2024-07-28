import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { Config, Credentials } from "aws-sdk";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { Logger } from "./shared/logger";


async function bootstrap()
{
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const swaggerConfig = new DocumentBuilder()
        .setTitle("ProjectX API")
        .setDescription("")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    new Config({
        credentials: new Credentials({
            accessKeyId: configService.get("awsAccessKeyId"),
            secretAccessKey: configService.get("awsSecretAccessKey"),
        }),
        region: configService.get("awsRegion"),
    });

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, document);
    const port = configService.get("port");

    app.useLogger(app.get(Logger));

    app.enableCors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
    });
    app.use(cookieParser());
    await app.listen(port);

    console.log(`Server has been starten on ${port} port`);
}

bootstrap();
