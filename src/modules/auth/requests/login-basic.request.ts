import { ApiProperty } from "@nestjs/swagger";

export class LoginBasicDto
{
    @ApiProperty()
    public username: string;

    @ApiProperty()
    public password: string;
}
