import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { TagEntity } from "./entites/tag.entity";

@Injectable()
export class TagRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async getAllTags(): Promise<TagEntity[]>
    {
        const tags = await this.prismaService.tag.findMany();

        return tags.map(tag =>  new TagEntity(tag));
    }
}
