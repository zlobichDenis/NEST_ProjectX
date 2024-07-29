import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";
import { exceptionMessages } from "../dictionary";

@Injectable()
export class ZodValidationPipe implements PipeTransform
{
    public constructor(private readonly schema: ZodSchema) {}

    public transform(value: unknown): any
    {
        try
        {
            return this.schema.parse(value);
        }
        catch (err)
        {
            console.log(err);
            throw new BadRequestException(exceptionMessages.invalidData);
        }
    }
}
