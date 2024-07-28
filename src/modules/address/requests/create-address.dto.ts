import { v4 as uuid } from "uuid";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateAddressBody } from "../validation/create-address.schema";

export class CreateAddressDto
{
    public id: string;

    @ApiProperty()
    public country: string;

    @ApiProperty()
    public city: string;

    @ApiProperty()
    public postIndex: string;

    @ApiProperty()
    public street: string;

    @ApiProperty()
    public houseNumber: number;

    @ApiPropertyOptional()
    public apartment?: number;

    public constructor({ country, city, postIndex, apartment, houseNumber, street }: CreateAddressBody)
    {
        this.id = uuid();
        this.country = country;
        this.postIndex = postIndex;
        this.city = city;
        this.apartment = apartment;
        this.houseNumber = houseNumber;
        this.street = street;
    }
}
