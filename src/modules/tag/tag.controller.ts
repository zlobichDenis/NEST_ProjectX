import { Controller, Get, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards";
import { TagResponse } from "./responses/tag.response";

@ApiTags("tag")
@Controller("tag")
export class TagController
{
    public constructor(private readonly tagService: TagService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/list")
    public async getTagList(): Promise<TagResponse[]>
    {
        return this.tagService.getAllTags();
    }
}
