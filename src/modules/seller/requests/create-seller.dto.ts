import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { CreateSellerBody } from "../validation/create-seller.validation";

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

    public constructor({
        displayName,
        fullName,
        description,
        logo,
        contactPhoneNumber,
    }: CreateSellerBody)
    {
        this.id = uuidv4();
        this.displayName = displayName;
        this.fullName = fullName;
        this.description = description;
        this.logo = logo;
        this.contactPhoneNumber = contactPhoneNumber;
    }

    public setUserId(userId: string): CreateSellerDto
    {
        this.userId = userId;

        return this;
    }
}
