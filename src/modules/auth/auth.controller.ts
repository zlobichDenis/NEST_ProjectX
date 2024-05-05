import { Controller, Get, Param, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { ApiExcludeEndpoint, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { GoogleOauth2Guard } from "src/core";
import { AuthService } from "./auth.service";
import { LoginDto, LoginLinkResponse } from "./dto";

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

    @ApiExcludeEndpoint()
    @ApiResponse({ description: "Token has been set to cookie" })
    @UseGuards(GoogleOauth2Guard)
    @Get("google/redirect")
    async loginRedirect(@Req() request: Request, @Res() res: Response): Promise<Response>
    {
        const token = this.authService.logIn(request.user as LoginDto);

        res.cookie(
            "Authentication",
            token,
            {
                httpOnly: true,
                sameSite: true,
                secure: false,
                maxAge: this.configService.get("jwtExpires"),
            }
        );

        return res.send(request.user);
    }
}
