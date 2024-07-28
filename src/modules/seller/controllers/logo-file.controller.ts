import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { LogoFileService } from "../services/logo-file.service";
import { JwtAuthGuard } from "../../auth/guards";
import { RequestWithUser } from "../../../core";
import { SellerExistsGuard } from "../guards/seller-exists.guard";

@ApiTags("seller/logo")
@Controller("seller/logo")
export class LogoFileController
{
    public constructor(private readonly logoFileService: LogoFileService) {}

    @UseGuards(JwtAuthGuard, SellerExistsGuard)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    public async uploadLogo(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File): Promise<any>
    {
        return this.logoFileService.uploadLogo(request.user.id, file);
    }
}
