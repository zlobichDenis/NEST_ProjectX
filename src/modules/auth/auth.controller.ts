import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards, Body, UsePipes, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestWithUser, ZodValidationPipe } from "src/core";
import { JwtAuthGuard, JwtRefreshGuard } from "./guards";
import { RegisterDto, TokensResponse } from "./dto";
import { AuthService } from "./auth.service";
import {registerSchema } from "./schemas";

@ApiTags("auth")
@Controller("auth")
export class AuthController
{
    public constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    // TODO: after vacation rewrite all auth logic to
    // 1. Change dto to get only tokenId and provider string
    // 2. Validate and get tokenPayload in GoogleJwtGuard
    // 3. Create own tokens and return response to the client
    @ApiResponse({ type: TokensResponse })
    @UsePipes(new ZodValidationPipe(registerSchema))
    @Post("login")
    public async register(@Body() body: RegisterDto): Promise<TokensResponse>
    {
        return this.authService.login(body);
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