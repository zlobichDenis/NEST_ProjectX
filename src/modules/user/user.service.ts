import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { UserRepository } from "./user.repository";
import { UserResponse } from "./responses";
import { CreateUserDto } from "./requests/create-user.dto";

@Injectable()
export class UserService
{
    public constructor(private readonly userRepository: UserRepository) {}

    public async createIfNotExists(dto: CreateUserDto): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserByEmail(dto.email);

        if (user)
        {
            return undefined;
        }

        return this.createUser(dto);
    }

    private async createUser(dto: CreateUserDto): Promise<UserResponse>
    {
        const userId = uuidv4();

        const createdUser = await this.userRepository.create({
            id: userId,
            provider: dto.provider,
            email: dto.email,
        });

        return new UserResponse(createdUser);
    }

    public async getUserById(id: string): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserById(id);

        return user ? new UserResponse(user) : null;
    }

    public async getUserByEmail(email: string): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserByEmail(email);

        return user ? new UserResponse(user) : null;
    }

    public async getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<UserResponse | void>
    {
        const user = await this.userRepository.getUserById(userId);

        if (!user) return null;

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

        return new UserResponse(user);
    }
}
