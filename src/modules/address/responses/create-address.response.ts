import { AddressEntity } from "../entities/address.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAddressResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public country: string;

    @ApiProperty()
    public street: string;

    @ApiProperty()
    public city: string;

    @ApiProperty()
    public postIndex: string;

    @ApiProperty()
    public houseNumber: number;

    @ApiProperty()
    public createdAt: Date;

    @ApiPropertyOptional()
    public apartment: number;

    public constructor({ id, country, createdAt, city, street, postIndex, houseNumber, apartment }: AddressEntity)
    {
        this.id = id;
        this.country = country;
        this.city = city;
        this.houseNumber = houseNumber;
        this.postIndex = postIndex;
        this.createdAt = createdAt;
        this.apartment = apartment;
        this.street = street;
    }
}
