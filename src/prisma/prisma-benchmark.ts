import { PrismaClient, Tree } from '@prisma/client'
import { faker, Faker } from '@faker-js/faker'
import { Species } from '../TypeORM/entity/species'
import { connect } from 'http2'
import { count } from 'console'

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here

    const count = 1000

    const fakeSpecies = await prisma.species.create({
        data: {
            name: faker.name.firstName()
        }
    }
    )
    const Tree = await prisma.tree.create({
        data: {
            height: faker.datatype.number({ min: 1, max: 5, precision: 0.01 }),
            trunkCircumference: faker.datatype.number({ min: 15, max: 100 }),
            careState: faker.word.noun(),
            strikingForLandscape: faker.datatype.boolean(),
            yearOfPlanting: new Date().toISOString(),
            cropSize: faker.datatype.number({ min: 5, max: 20 }),
            juiceAmount: faker.datatype.number({ min: 1, max: 10 }),
            sponsorSearched: faker.datatype.boolean(),
            active: faker.datatype.boolean(),
            species: {
                connect: { id: 1 }
            }
        }
    })

    const point = {
        type: "Point",
        "coordinates": [faker.datatype.number({ min: -90, max: 90, precision: 0.00001 }), faker.datatype.number({
            min: -180,
            max: 180,
            precision: 0.00001
        })]
    }

    const fakeTrees = Array.from({ length: count }).map(() => (
        {
            height: faker.datatype.number({ min: 1, max: 5, precision: 0.01 }),
            trunkCircumference: faker.datatype.number({ min: 15, max: 100 }),
            careState: faker.word.noun(),
            strikingForLandscape: faker.datatype.boolean(),
            yearOfPlanting: new Date().toISOString(),
            cropSize: faker.datatype.number({ min: 5, max: 20 }),
            juiceAmount: faker.datatype.number({ min: 1, max: 10 }),
            sponsorSearched: faker.datatype.boolean(),
            active: faker.datatype.boolean(),
            species: {
                connect: { id: 1 }
            }

        }))

    prisma.tree.createMany({fakeTrees})

    await prisma.$executeRaw`update Tree set point = ${point} WHERE id = ${Tree.id}`

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })