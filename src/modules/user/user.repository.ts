import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/prisma-client";
import { UserEntity } from "./entities";

@Injectable()
export class UserRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async getUserById(id: string): Promise<UserEntity | void>
    {
        const user = await this.prismaService.user.findUnique({ where: { id } });

        if (!user) return undefined;

        return new UserEntity(user);
    }

    public async getUserByEmail(email: string): Promise<UserEntity | void>
    {
        const user = await this.prismaService.user.findUnique({ where: { email } });

        return user ? new UserEntity(user) : null;
    }

    public async create(data: Prisma.userCreateInput): Promise<UserEntity>
    {
        const user = await this.prismaService.user.create({ data });

        return new UserEntity(user);
    }

    public async update(userId: string, data: Prisma.userUpdateInput): Promise<UserEntity>
    {
        const updatedUser = await this.prismaService.user.update({
            data,
            where: { id: userId },
        });

        return new UserEntity(updatedUser);
    }
}
