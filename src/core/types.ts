import { Request } from "express";
import { user_role as UserRole } from "@prisma/client";
import { ProfileEntity } from "../modules/profile/entities/profile.entity";

export interface RequestWithUser extends Request
{
    user: {
        id: string,
        email: string;
        role: UserRole;
    }
}
export interface RequestWithProfile extends Request
{
    profile: ProfileEntity;
}
