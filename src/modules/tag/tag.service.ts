import { Injectable } from "@nestjs/common";
import { TagResponse } from "./responses/tag.response";
import { TagRepository } from "./tag.repository";

@Injectable()
export class TagService
{
    public constructor(private readonly tagRepository: TagRepository) {}

    public async getAllTags(): Promise<TagResponse[]>
    {
        const entities = await this.tagRepository.getAllTags();

        return entities.map((tag) => new TagResponse(tag));
    }
}
