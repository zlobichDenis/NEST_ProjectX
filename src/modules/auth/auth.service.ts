import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { provider as AuthProvider } from "@prisma/client";
import { UserService } from "src/modules/user";
import { LoginDto, LoginLinkResponse } from "./dto";
import { GoogleAuthService } from "./services";

@Injectable()
export class AuthService
{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly googleAuthService: GoogleAuthService,
    ) {}

    public async getLoginLink(provider: AuthProvider): Promise<LoginLinkResponse>
    {
        let authUrl = "";

        switch (provider)
        {
            case AuthProvider.GOOGLE:
                authUrl = await this.googleAuthService.getAuthorizationUrl();
                break;
        }

        return new LoginLinkResponse(authUrl);
    }

    public async logIn(dto: LoginDto): Promise<string>
    {

        const existingUser = await this.userService.getUserByEmail(dto.email);

        if (existingUser)
        {
            return this.generateJwt(existingUser.id, existingUser.email);
        }

        const createdUser = await this.userService.createUserWithProfile(dto);

        return this.generateJwt(createdUser.id, createdUser.email);
    }

    private generateJwt(userId: string, email: string): string
    {
        return this.jwtService.sign({
            userId,
            email,
        });
    }

}
