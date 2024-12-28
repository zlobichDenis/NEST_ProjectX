import { CreateAddressDto } from "../../../address/requests/create-address.dto";

export class CreateProfileAddressDto
{
    public readonly profileId: string;
    public readonly createAddressDto: CreateAddressDto;

    public constructor(profileId: string, createAddressDto: CreateAddressDto)
    {
        this.profileId = profileId;
        this.createAddressDto = createAddressDto;
    }
}
