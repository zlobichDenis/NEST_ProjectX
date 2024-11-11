import { ApiHideProperty } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

export class CreateCartDto
{
    @ApiHideProperty()
    public readonly id: string;

    @ApiHideProperty()
    public readonly customerId: string;

    public constructor(customerId: string)
    {
        this.id = uuid();
        this.customerId = customerId;
    }
}
