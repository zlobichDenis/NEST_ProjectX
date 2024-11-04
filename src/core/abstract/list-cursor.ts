import { ApiProperty } from "@nestjs/swagger";

export abstract class ListCursorResponse {
    @ApiProperty()
    public total: number;

    public constructor(total: number) {
        this.total = total;
    }
}
