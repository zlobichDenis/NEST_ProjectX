import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards, Body, UsePipes, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { provider as AuthProvider } from "@prisma/client";
import { Response } from "express";
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestWithUser, ZodValidationPipe } from "src/core";
import { GoogleOauth2Guard, JwtAuthGuard, JwtRefreshGuard } from "./guards";
import { AuthService } from "./auth.service";
import { RegisterBody, registerSchema } from "./validation";
import { TokensResponse } from "./responses/tokens.response";
import { RegisterDto } from "./requests/register.request";
import { AuthLinkResponse } from "./responses/oauth-link.response";

@ApiTags("auth")
@Controller("auth")
export class AuthController
{
    public constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @ApiResponse({ type: TokensResponse })
    @ApiBody({ type: RegisterDto })
    @UsePipes(new ZodValidationPipe(registerSchema))
    @Post("login")
    public async register(@Body() body: RegisterBody): Promise<TokensResponse>
    {
        return this.authService.loginViaProvider(new RegisterDto(body));
    }

    @ApiExcludeEndpoint()
    @ApiParam({ name: "provider", enum: AuthProvider })
    @ApiResponse({ type: AuthLinkResponse })
    @Get("log-in/:provider")
    // TODO: add validation for parameters
    public async loginLink(@Param("provider") provider: AuthProvider): Promise<AuthLinkResponse>
    {
        return this.authService.getLoginLink(provider);
    }

    @ApiExcludeEndpoint()
    @ApiResponse({ type: TokensResponse, description: "Token has been set to cookie" })
    @UseGuards(GoogleOauth2Guard)
    @Get("google/redirect")
    public async loginRedirect(@Req() request: RequestWithUser): Promise<TokensResponse>
    {
        return this.authService.createUser(AuthProvider.GOOGLE, request.user.email);
    }

    @ApiBearerAuth()
    @UseGuards(JwtRefreshGuard)
    @Get("refresh")
    public async refresh(@Req() request: RequestWithUser, @Res() response: Response): Promise<Response>
    {
        const accessToken = this.authService.generateJwtAccessToken(request.user.id);

        response.cookie(
            "Authentication",
            accessToken,
            { httpOnly: false, maxAge: this.configService.get("jwtExpires") }
        );

        return response.sendStatus(HttpStatus.OK);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("log-out")
    public async logOut(@Req() request: RequestWithUser, @Res() res: Response): Promise<Response>
    {
        await this.authService.logOut(request.user.id);

        res.cookie(
            "Authentication",
            "",
            { httpOnly: false, maxAge: this.configService.get("jwtExpires") }
        );
        res.cookie(
            "Refresh",
            "",
            { httpOnly: false, maxAge: this.configService.get("jwtExpires") }
        );

        return res.sendStatus(HttpStatus.OK);
    }
}
