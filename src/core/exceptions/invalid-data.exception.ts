import { BadRequestException } from "@nestjs/common";
import { ExceptionMessages } from "../dictionary";

export class InvalidDataException extends BadRequestException
{
    constructor(response = ExceptionMessages.INVALID_UUID)
    {
        super(response);
    }
}
