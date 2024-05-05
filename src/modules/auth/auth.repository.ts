import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/prisma-client";
import { UserEntity } from "./entities";

@Injectable()
export class AuthRepository
{
    constructor(private readonly prismaService: PrismaService) {}

    public async getUserById(id: string): Promise<UserEntity | void>
    {
        const user = await this.prismaService.user.findUnique({ where: { id } });

        if (!user) return undefined;

        return new UserEntity(user);
    }

    public async getUserByEmail(email: string): Promise<UserEntity | void>
    {
        const userWithProfile = await this.prismaService.user.findUnique({
            where: { email },
            include: { profile: true },
        });

        if (!userWithProfile) return undefined;

        const { profile, ...user } = userWithProfile;

        return new UserEntity(user).setProfile(profile);
    }

    public async create(data: Prisma.userCreateInput): Promise<UserEntity>
    {

        const createdUser = await this.prismaService.user.create({ data });

        return new UserEntity(createdUser);
    }
}
