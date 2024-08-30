import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DeleteUserProfilePayload } from "./payloads/delete-user-profile.payload";
import { ProfileEvent } from "./events";

@Injectable()
export class EventDispatcher
{
    public constructor(private readonly eventEmitter: EventEmitter2) {}

    public async sendDeleteUserProfileEvent(payload: DeleteUserProfilePayload): Promise<boolean>
    {
        return this.eventEmitter.emit(ProfileEvent.DELETE_PROFILE, payload);
    }
}
