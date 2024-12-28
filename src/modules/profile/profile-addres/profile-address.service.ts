import { ProfileAddressRepository } from "./profile-address.repository";
import { ProfileAddressEntity } from "./entities/profile-address.entity";
import { GetProfileAddressListDto } from "./dto/get-profile-adress-list.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileAddressService
{
    public constructor(private readonly profileAddressRepository: ProfileAddressRepository) {}

    public async getProfileAdressList(dto: GetProfileAddressListDto): Promise<ProfileAddressEntity[]>
    {
        try {
            const profileAddresses = await this.profileAddressRepository.getProfileAddressList(dto);

            return profileAddresses;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }
}
