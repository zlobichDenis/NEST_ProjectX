import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { provider as AuthProvider } from "@prisma/client";
import { AuthRepository } from "./auth.repository";
import { GoogleAuthService } from "./services";
import { LoginDto, LoginLinkResponse } from "./dto";
import { UserEntity } from "./entities";

@Injectable()
export class AuthService
{
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly googleAuthService: GoogleAuthService,
        private readonly jwtService: JwtService,
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

        const existingUser = await this.authRepository.getUserByEmail(dto.email);

        if (existingUser)
        {
            return this.generateJwt(existingUser.id, existingUser.email);
        }

        const createdUser = await this.createUserWithProfile(dto);

        return this.generateJwt(createdUser.id, createdUser.email);
    }

    private async createUserWithProfile(dto: LoginDto): Promise<UserEntity>
    {
        const userId = uuidv4();

        return this.authRepository.create({
            id: userId,
            provider: dto.provider,
            email: dto.email,
            original_id: dto.originalId,
            profile: {
                create: {
                    id: uuidv4(),
                    family_name: dto.familyName,
                    given_name: dto.givenName,
                    photos: dto.photos,
                },
            },
        });
    }

    private generateJwt(userId: string, email: string): string
    {
        return this.jwtService.sign({
            userId,
            email,
        });
    }
}
