import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { exceptionMessages } from "src/core/dictionary";
import { UserRepository } from "./user.repository";
import { LoginDto } from "../auth/dto";
import { UserEntity } from "./entities";

@Injectable()
export class UserService
{
    constructor(private readonly userRepository: UserRepository) {}

    public async createUserWithProfile(dto: LoginDto): Promise<UserEntity>
    {
        const userId = uuidv4();

        return this.userRepository.create({
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

    public async getUserById(id: string): Promise<UserEntity>
    {
        const user = await this.userRepository.getUserById(id);

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        return user;
    }

    public async getUserByEmail(email: string): Promise<UserEntity>
    {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        return user;
    }

    public async getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<UserEntity | void>
    {
        const user = await this.getUserById(userId);

        if (!user) return;

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!isRefreshTokenMatching) return;

        return user;
    }

    public async setCurrentRefreshToken(refreshToken: string, userId: string): Promise<void>
    {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(userId, { current_refresh_token: currentHashedRefreshToken });
    }

    public async removeRefreshToken(userId: string): Promise<UserEntity>
    {
        return this.userRepository.update(userId, { current_refresh_token: null });
    }
}
