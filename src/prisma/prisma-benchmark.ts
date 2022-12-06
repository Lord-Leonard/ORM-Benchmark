import {PrismaClient} from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()


async function main(count: number) {
  const fCount = count.toLocaleString('de-DE')

  const fakeSpecies = await prisma.species.create({
    data: {
      name: faker.name.firstName()
    }
  })

  const treeDataSet = Array.from({length: count}, () => {
    return {
      height: faker.datatype.number({min: 1, max: 5, precision: 0.01}),
      trunkCircumference: faker.datatype.number({min: 15, max: 100}),
      careState: faker.word.noun(),
      strikingForLandscape: faker.datatype.boolean(),
      yearOfPlanting: new Date().toISOString(),
      cropSize: faker.datatype.number({min: 5, max: 20}),
      juiceAmount: faker.datatype.number({min: 1, max: 10}),
      sponsorSearched: faker.datatype.boolean(),
      active: faker.datatype.boolean(),
      species: {
        connect: {id: fakeSpecies.id}
      },
      point: [
        faker.datatype.number({
          min: -90,
          max: 90,
          precision: 0.00001
        }),
        faker.datatype.number({
          min: -180,
          max: 180,
          precision: 0.00001
        })
      ]
    }
  })

  console.time(`Create(many) ${fCount} users - Prisma`)
  for (const treeData of treeDataSet) {
    const {point: treePoint, ...treeCreationData} = treeData

    let tree = await prisma.tree.create({
      data: treeCreationData
    })


    await prisma.$executeRaw`UPDATE "Tree"
                             SET point = ST_MakePoint(${treePoint[0]}, ${treePoint[1]})
                             WHERE id = ${tree.id}`
  }
  console.timeEnd(`Create(many) ${fCount} users - Prisma`)
}

main(1000)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
