import { Injectable, PipeTransform } from "@nestjs/common";
import { isObject, isString } from "class-validator";
import { UUID_REGEXP } from "../constants";
import { InvalidDataException } from "../exceptions";

@Injectable()
export class UuidFormatPipe implements PipeTransform
{
    public transform(value: string | Record<string, any>)
    {
        const isValid = this.checkValueValidity(value);

        if (!isValid)
        {
            throw new InvalidDataException();
        }

        return value;
    }

    private checkValueValidity(value: string | Record<string, any>): boolean
    {
        if (isString(value))
        {
            return UUID_REGEXP.test(value);
        }

        if (isObject(value))
        {
            return UUID_REGEXP.test(value?.id);
        }
    }
}
