import { NotFoundException } from "@nestjs/common";
import { exceptionMessages } from "../dictionary";

export class EntityNotFoundException extends NotFoundException
{
    public constructor(message = exceptionMessages.entityNotFound)
    {
        super(message);
    }
}
