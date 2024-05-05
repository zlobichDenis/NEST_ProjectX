import { NotFoundException } from "@nestjs/common";
import { ExceptionMessages } from "../dictionary";

export class EntityNotFoundException extends NotFoundException
{
    constructor(message = ExceptionMessages.ENTITY_NOT_FOUND)
    {
        super(message);
    }
}
