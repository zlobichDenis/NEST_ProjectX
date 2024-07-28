import { BadRequestException } from "@nestjs/common";
import { exceptionMessages } from "../dictionary";

export class InvalidDataException extends BadRequestException
{
    public constructor(response = exceptionMessages.entityNotFound)
    {
        super(response);
    }
}
