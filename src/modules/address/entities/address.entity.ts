import { address as AddressBaseEntity } from "@prisma/client";

export class AddressEntity
{
    public id: string;
    public street: string;
    public country: string;
    public city: string;
    public houseNumber: number;
    public createdAt: Date;
    public postIndex: string;
    public apartment?: number;

    public constructor({
        street,
        country,
        id,
        city,
        created_at,
        apartment,
        post_index,
        house_number,
    }: AddressBaseEntity)
    {
        this.id = id;
        this.street = street;
        this.country = country;
        this.city = city;
        this.houseNumber = house_number;
        this.createdAt = new Date(created_at);
        this.apartment = apartment;
        this.postIndex = post_index;
    }
}
