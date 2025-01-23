import { ProfileAddressRepository } from "./profile-address.repository";
import { ProfileAddressEntity } from "./entities/profile-address.entity";
import { GetProfileAddressListDto } from "./dto/get-profile-adress-list.dto";
import { Injectable } from "@nestjs/common";
import { CreateProfileAddressDto } from "./dto/create-profile-address.dto";

@Injectable()
export class ProfileAddressService
{
    public constructor(private readonly profileAddressRepository: ProfileAddressRepository) {}

    public async getProfileAdressList(dto: GetProfileAddressListDto): Promise<ProfileAddressEntity[]>
    {
        try
        {
            const profileAddresses = await this.profileAddressRepository.getProfileAddressList(dto);

            return profileAddresses;
        }
        catch (error)
        {
            console.log(error);

            throw error;
        }
    }

    public async createProfileAddress(dto: CreateProfileAddressDto): Promise<ProfileAddressEntity>
    {
        return this.profileAddressRepository.createProfileAddress(dto);
    }
}
