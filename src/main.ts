import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { Logger } from "./shared/logger";


async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("ProjectX API")
        .setDescription("")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const configService = app.get(ConfigService);

    const port = configService.get("port");

    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));

    app.enableCors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
    });
    await app.listen(port);

    console.log(`Server has been starten on ${port} port`);
}

bootstrap();
