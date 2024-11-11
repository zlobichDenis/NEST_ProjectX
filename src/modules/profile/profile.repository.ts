import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../../shared/prisma-client";
import { ProfileEntity } from "./entities/profile.entity";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { AddressEntity } from "../address/entities/address.entity";
import { UserEntity } from "../user/entities";
import { ImageEntity } from "../image/entities/image.entity";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { CreateCartDto } from "../cart/dtos/create-cart.dto";

@Injectable()
export class ProfileRepository
{
    public constructor(private readonly prismaService: PrismaService,) {}

    public async getProfileById(profileId: string): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.findUnique({
            where: { id: profileId },
            include: {
                user: true,
                photo: { include: { file: true } },
                profile_address: { include: { address: true } },
            },
        });

        const addressEntities = profile.profile_address.map(({ address }) => new AddressEntity(address));
        const userEntity = new UserEntity(profile.user);
        const photoImageFileEntity = new PublicFileEntity(profile.photo.file);
        const profilePhoto = new ImageEntity(profile.photo).setFile(photoImageFileEntity);

        return profile
            ? new ProfileEntity(profile)
                .setAddresses(addressEntities)
                .setUser(userEntity)
                .setPhoto(profilePhoto)
            : null;
    }

    public async getProfileByUserId(userId: string): Promise<ProfileEntity | null>
    {
        try
        {
            const profile = await this.prismaService.profile.findUnique({
                where: { user_id: userId },
                include: {
                    user: true,
                    photo: { include: { file: true } },
                    profile_address: { include: { address: true } },
                },
            });

            if (!profile) return null;

            const addressEntities = profile.profile_address?.map(({ address }) => new AddressEntity(address));
            const userEntity = new UserEntity(profile.user);
            const photoImageFileEntity = profile.photo ? new PublicFileEntity(profile.photo.file) : undefined;
            const profilePhoto = photoImageFileEntity
                ? new ImageEntity(profile.photo).setFile(photoImageFileEntity)
                : undefined;

            return new ProfileEntity(profile)
                .setAddresses(addressEntities ? addressEntities : [])
                .setUser(userEntity)
                .setPhoto(profilePhoto);
        }
        catch(err)
        {
            // TODO: replace with logger
            console.log(err);
            throw err;
        }
    }

    public async createProfile(
        {
            id,
            displayName,
            userId,
            avatarImageId,
        }: CreateProfileDto,
        transaction?: PrismaTransaction,
    ): Promise<ProfileEntity | null>
    {
        if (transaction)
        {
            const profile = await transaction.profile.create({
                data: {
                    id,
                    display_name:  displayName,
                    user_id: userId,
                    photo_id: avatarImageId,
                },
            });

            await transaction.cart.create({
                data: {
                    id: uuidv4(),
                    customer_id: profile.id,
                },
            });

            return profile ? new ProfileEntity(profile) : null;
        }
        else
        {
            return this.prismaService.$transaction(async (db) =>
            {
                const profile = await db.profile.create({
                    data: {
                        id,
                        display_name:  displayName,
                        user_id: userId,
                        photo_id: avatarImageId,
                    },
                });

                await db.cart.create({
                    data: {
                        id: uuidv4(),
                        customer_id: profile.id,
                    },
                });

                return profile ? new ProfileEntity(profile) : null;
            });
        }
    }

    public async deleteProfileById(
        id: string,
        transaction: PrismaTransaction = this.prismaService
    ): Promise<ProfileEntity | null>
    {
        const profile = await transaction.profile.delete({
            where: { id },
            include: {
                user: true,
                photo: { include: { file: true } },
                profile_address: { include: { address: true } },
            },
        });

        const addressEntities = profile.profile_address.map(({ address }) => new AddressEntity(address));
        const userEntity = new UserEntity(profile.user);
        const photoImageFileEntity = new PublicFileEntity(profile.photo.file);
        const profilePhoto = new ImageEntity(profile.photo).setFile(photoImageFileEntity);

        return profile
            ? new ProfileEntity(profile)
                .setAddresses(addressEntities)
                .setUser(userEntity)
                .setPhoto(profilePhoto)
            : null;
    }
}
