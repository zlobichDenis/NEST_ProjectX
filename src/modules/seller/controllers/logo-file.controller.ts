import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { user_role as UserRole } from "@prisma/client";
import { LogoFileService } from "../services/logo-file.service";
import { JwtAuthGuard } from "../../auth/guards";
import { RequestWithUser } from "../../../core";
import { SellerExistsGuard } from "../guards/seller-exists.guard";
import { Roles } from "../../auth/decorators/role.decorator";
import { RolesGuard } from "../../auth/guards/role.guard";

@ApiTags("seller/logo")
@Roles(UserRole.SELLER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("seller/logo")
export class LogoFileController
{
    public constructor(private readonly logoFileService: LogoFileService) {}

    @UseGuards(SellerExistsGuard)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    public async uploadLogo(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File): Promise<any>
    {
        return this.logoFileService.uploadLogo(request.user.id, file);
    }
}
