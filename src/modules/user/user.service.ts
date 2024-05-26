import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { exceptionMessages } from "src/core/dictionary";
import { UserRepository } from "./user.repository";
import { UserResponse } from "./responses";
import { OriginProfile } from "../../core";

@Injectable()
export class UserService
{
    public constructor(private readonly userRepository: UserRepository) {}

    public async createIfNotExists(dto: OriginProfile): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserByEmail(dto.email);

        if (user)
        {
            return undefined;
        }

        return this.createUser(dto);
    }

    private async createUser(dto: OriginProfile): Promise<UserResponse>
    {
        const userId = uuidv4();

        const createdUser = await this.userRepository.create({
            id: userId,
            provider: dto.provider,
            email: dto.email,
            original_id: dto.originalId,
        });

        return new UserResponse(createdUser);
    }

    public async getUserById(id: string): Promise<UserResponse>
    {
        const user = await this.userRepository.getUserById(id);

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        return new UserResponse(user);
    }

    public async getUserByEmail(email: string): Promise<UserResponse>
    {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        return new UserResponse(user);
    }

    public async getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserById(userId);

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!isRefreshTokenMatching) return;

        return new UserResponse(user);
    }

    public async setCurrentRefreshToken(refreshToken: string, userId: string): Promise<void>
    {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(userId, { current_refresh_token: currentHashedRefreshToken });
    }

    public async removeRefreshToken(userId: string): Promise<UserResponse>
    {
        const user = await this.userRepository.update(userId, { current_refresh_token: null });

        if (!user)
        {
            throw new NotFoundException(exceptionMessages.entityNotFound);
        }

        return new UserResponse(user);
    }
}
