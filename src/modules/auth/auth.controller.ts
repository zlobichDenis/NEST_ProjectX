import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards, Body, UsePipes } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestWithUser, ZodValidationPipe } from "src/core";
import { JwtAuthGuard, JwtRefreshGuard } from "./guards";
import { AuthService } from "./auth.service";
import { RegisterBody, registerSchema } from "./validation";
import { TokensResponse } from "./responses/tokens.response";
import { RegisterDto } from "./requests/register.request";

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
        return this.authService.login(new RegisterDto(body));
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
