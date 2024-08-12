import { PrismaClient } from  "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function main()
{
    const tags = [
        {
            id: uuid(),
            name: "computers",
        },
        {
            id: uuid(),
            name: "cars",
        },
    ];

    await prisma.tag.createMany({ data: tags });
}

main()
    .then(async () =>
    {
        await prisma.$disconnect();
    })
    .catch(async (e) =>
    {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
