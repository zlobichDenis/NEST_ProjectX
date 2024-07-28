import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";

@Injectable()
export class ProductRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createProduct()
    {

    }
}
