import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { user_role as UserRole } from "@prisma/client";
import { USER_ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate
{
    public constructor(private readonly reflector: Reflector) {}

    public canActivate(context: ExecutionContext): boolean
    {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(USER_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles)
        {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        console.log(requiredRoles, user);
        return requiredRoles.some((role) => user.role === role);
    }
}
