import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { ApiExcludeEndpoint, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { OriginProfile, RequestWithUser, ZodValidationPipe } from "src/core";
import { GoogleOauth2Guard, JwtAuthGuard, JwtRefreshGuard } from "./guards";
import { LoginLinkResponse } from "./dto";
import { AuthService } from "./auth.service";
import { LoginQuery, loginSchema } from "./schemas";

@ApiTags("auth")
@Controller("auth")
export class AuthController
{
    public constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @ApiQuery({ name: "provider", enum: AuthProvider })
    @ApiResponse({ type: LoginLinkResponse })
    @Get("log-in")
    // TODO: add validation for parameters
    public async logIn(@Query(new ZodValidationPipe(loginSchema)) provider: LoginQuery): Promise<LoginLinkResponse>
    {
        return this.authService.getLoginLink(provider);
    }

    @UseGuards(JwtRefreshGuard)
    @Get("refresh")
    public async refresh(@Req() request: RequestWithUser, @Res() response: Response): Promise<Response>
    {
        const accessToken = this.authService.generateJwtAccessToken(request.user.id);

        response.cookie(
            "Authentication",
            accessToken,
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );

        return response.sendStatus(HttpStatus.OK);
    }

    @ApiExcludeEndpoint()
    @ApiResponse({ description: "Token has been set to cookie" })
    @UseGuards(GoogleOauth2Guard)
    @Get("google/redirect")
    public async loginRedirect(@Req() request: Request, @Res() res: Response): Promise<Response>
    {
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
        } = await this.authService.loginOAuth(request.user as OriginProfile);

        res.cookie(
            "Authentication",
            accessToken,
            {
                httpOnly: true,
                sameSite: false,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );
        res.cookie(
            "Refresh",
            refreshToken,
            {
                httpOnly: true,
                sameSite: false,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );

        return res.sendStatus(HttpStatus.OK);
    }

    @UseGuards(JwtAuthGuard)
    @Get("log-out")
    public async logOut(@Req() request: RequestWithUser, @Res() res: Response): Promise<Response>
    {
        await this.authService.logOut(request.user.id);

        res.cookie(
            "Authentication",
            "",
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );
        res.cookie(
            "Refresh",
            "",
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );

        return res.sendStatus(HttpStatus.OK);
    }
}
