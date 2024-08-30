import { PrismaClient, provider, user_role } from "@prisma/client";
import { currency as Currency, region_key as RegionKey } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function seedUsers()
{
    const users = [
        {
            id: uuid(),
            email: "sgsdgk9232@gmail.com",
            provider: provider.GOOGLE,
            role: user_role.SELLER,
        },
    ];

    await prisma.user.createMany({ data: users });
}

async function seedTags()
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

async function seedRegions()
{
    const regions = [
        {
            id: uuid(),
            currency: Currency.RUB,
            key: RegionKey.RU,
            display_name: "Russia",
        },
    ];

    await prisma.region.createMany({ data: regions });
}

async function main()
{
    await seedUsers();
    await seedTags();
    await seedRegions();
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
