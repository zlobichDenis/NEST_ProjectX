import {  Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthInternalService } from "./auth-internal.service";
import { LocalAuthGuard } from "../guards";
import { RequestWithUser } from "../../../core";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginBasicDto } from "../requests/login-basic.request";

@ApiTags("auth/internal")
@Controller("auth/internal")
export class AuthInternalController
{
    public constructor(private readonly authInternalService: AuthInternalService) {}

    @Post("/basic")
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginBasicDto })
    public async loginBasic(@Req() request: RequestWithUser)
    {
        return this.authInternalService.generateJwtTokens(request.user.id);
    }
}
