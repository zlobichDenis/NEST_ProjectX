import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SellerEntity } from "../entities/seller.entity";
import { UserResponse } from "../../user/responses";
import { AddressResponse } from "../../address/responses/address.response";
import { PublicFileResponse } from "../../public-file/responses/public-file.response";

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

    @ApiProperty({ isArray: true, type: AddressResponse })
    public addresses: AddressResponse[];

    @ApiPropertyOptional()
    public logoImageId?: string;

    @ApiPropertyOptional()
    public logo?: PublicFileResponse;

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
        addresses,
        logoImageId,
    }: SellerEntity)
    {
        this.id = id;
        this.displayName = displayName;
        this.fullName = fullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.createdAt = createdAt;
        this.logoImageId = logoImageId;
        this.logo = logo ? new PublicFileResponse(logo) : null;
        this.user = new UserResponse(user);
        this.userId = userId;
        this.updatedAt = updatedAt;
        this.description = description;
        this.addresses = addresses.map((address) => new AddressResponse(address));
    }
}
