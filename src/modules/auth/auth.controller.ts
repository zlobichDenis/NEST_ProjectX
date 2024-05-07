import { Controller, Get, HttpStatus, Param, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { ApiExcludeEndpoint, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { RequestWithUser } from "src/core";
import { GoogleOauth2Guard, JwtAuthGuard, JwtRefreshGuard } from "./guards";
import { LoginDto, LoginLinkResponse } from "./dto";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController
{
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @ApiParam({ name: "provider", enum: AuthProvider })
    @ApiResponse({ type: LoginLinkResponse })
    @Get("log-in/:provider")
    // TODO: add validation for parameters
    async logIn(@Param("provider") provider: AuthProvider): Promise<LoginLinkResponse>
    {
        return this.authService.getLoginLink(provider);
    }

    @UseGuards(JwtRefreshGuard)
    @Get("refresh")
    async refresh(@Req() request: RequestWithUser, @Res() response: Response): Promise<Response>
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

        return response.send(HttpStatus.OK);
    }

    @ApiExcludeEndpoint()
    @ApiResponse({ description: "Token has been set to cookie" })
    @UseGuards(GoogleOauth2Guard)
    @Get("google/redirect")
    async loginRedirect(@Req() request: Request, @Res() res: Response): Promise<Response>
    {
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
        } = await this.authService.loginOAuth(request.user as LoginDto);

        res.cookie(
            "Authentication",
            accessToken,
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );
        res.cookie(
            "Refresh", refreshToken,
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );

        return res.send(HttpStatus.OK);
    }

    @UseGuards(JwtAuthGuard)
    @Get("log-out")
    async logOut(@Req() request: RequestWithUser, @Res() res: Response): Promise<Response>
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

        return res.send(HttpStatus.OK);
    }
}
