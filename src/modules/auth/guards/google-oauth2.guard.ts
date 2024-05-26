import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleOauth2Guard extends AuthGuard("google") {}
