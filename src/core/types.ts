import { Request } from "express";
import { ProfileEntity } from "../modules/profile/entities/profile.entity";

export interface RequestWithUser extends Request
{
    user: {
        id: string,
    }
}
export interface RequestWithProfile extends Request
{
    profile: ProfileEntity;
}
