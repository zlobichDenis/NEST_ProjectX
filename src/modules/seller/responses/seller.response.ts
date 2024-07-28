import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SellerEntity } from "../entities/seller.entity";
import { UserResponse } from "../../user/responses";
import { AddressEntity } from "../../address/entities/address.entity";
import { PublicFileEntity } from "../../public-file/entities/public-file.entity";

export class SellerResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public displayName: string;

    @ApiProperty()
    public fullName: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public contactPhoneNumber: string;

    @ApiProperty()
    public user: UserResponse;

    @ApiProperty()
    public address: AddressEntity;

    @ApiPropertyOptional()
    public logoFileId?: string;

    @ApiPropertyOptional()
    public logo?: PublicFileEntity;

    @ApiPropertyOptional()
    public updatedAt?: Date;

    public constructor({
        id,
        displayName,
        fullName,
        createdAt,
        description,
        logo,
        contactPhoneNumber,
        user,
        userId,
        updatedAt,
        address,
        logoFileId,
    }: SellerEntity)
    {
        this.id = id;
        this.displayName = displayName;
        this.fullName = fullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.createdAt = createdAt;
        this.logoFileId = logoFileId;
        this.logo = logo;
        this.user = new UserResponse(user);
        this.userId = userId;
        this.updatedAt = updatedAt;
        this.description = description;
        this.address = address;
    }
}
