import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { CreateSellerBody } from "../validation/create-seller.validation";
import { CreateAddressDto } from "../../address/requests/create-address.dto";

export class CreateSellerDto
{
    public id: string;
    public userId: string;

    @ApiProperty()
    public displayName: string;

    @ApiProperty()
    public fullName: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public logo: string;

    @ApiProperty()
    public contactPhoneNumber: string;

    @ApiProperty({ type: CreateAddressDto })
    public address: CreateAddressDto;

    public constructor({
        displayName,
        fullName,
        description,
        logo,
        contactPhoneNumber,
        address,
    }: CreateSellerBody)
    {
        this.id = uuidv4();
        this.displayName = displayName;
        this.fullName = fullName;
        this.description = description;
        this.logo = logo;
        this.contactPhoneNumber = contactPhoneNumber;
        this.address = new CreateAddressDto(address);
    }

    public setUserId(userId: string): CreateSellerDto
    {
        this.userId = userId;

        return this;
    }
}
