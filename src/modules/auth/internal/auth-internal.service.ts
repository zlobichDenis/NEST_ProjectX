import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { TokensResponse } from "../responses/tokens.response";

@Injectable()
export class AuthInternalService
{
    public constructor(private readonly authService: AuthService) {}

    public async generateJwtTokens(userId: string): Promise<TokensResponse>
    {
        return this.authService.generateJwtTokens(userId);
    }
}
