import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";
import { exceptionMessages } from "../dictionary";

export class ZodValidationPipe implements PipeTransform
{
    public constructor(private readonly schema: ZodSchema) {}

    public transform(value: unknown): any
    {
        console.log(value);
        try
        {
            return this.schema.parse(value);
        }
        catch (err)
        {
            throw new BadRequestException(exceptionMessages.invalidData);
        }
    }
}
