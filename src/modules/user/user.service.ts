import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "./user.repository";
import { LoginDto } from "../auth/dto";
import { UserEntity } from "./entities";

@Injectable()
export class UserService
{
    constructor(private readonly userRepository: UserRepository) {}

    public async createUserWithProfile(dto: LoginDto): Promise<UserEntity>
    {
        const userId = uuidv4();

        return this.userRepository.create({
            id: userId,
            provider: dto.provider,
            email: dto.email,
            original_id: dto.originalId,
            profile: {
                create: {
                    id: uuidv4(),
                    family_name: dto.familyName,
                    given_name: dto.givenName,
                    photos: dto.photos,
                },
            },
        });
    }

    public getUserById(id: string): Promise<UserEntity | void>
    {
        return this.userRepository.getUserById(id);
    }

    public getUserByEmail(email: string): Promise<UserEntity | void>
    {
        return this.userRepository.getUserByEmail(email);
    }
}
