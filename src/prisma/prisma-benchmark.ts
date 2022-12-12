import {Prisma, PrismaClient} from '@prisma/client'
import {faker} from '@faker-js/faker'
import {SingleBar, Presets} from 'cli-progress'

const prisma = new PrismaClient()

export async function prismaBenchmark(entityCount, chunkSice, iterations) {
  const fCount = entityCount.toLocaleString('de-DE')
  const fakeSpecies = await createFakeSpecies();

  const treeDataSet = createFakeTreeSet(entityCount, fakeSpecies);

  await writeBenchmark(fCount, iterations, chunkSice, treeDataSet);
}

async function createFakeSpecies() {
  const fakeSpecies = await prisma.species.create({
    data: {
      name: faker.name.firstName()
    }
  })
  return fakeSpecies;
}

function createFakeTreeSet(entityCount, fakeSpecies) {
  const treeDataSet = Array.from({length: entityCount}, () => {
    return {
      height: faker.datatype.number({min: 1, max: 5, precision: 0.01}),
      trunkCircumference: faker.datatype.number({min: 15, max: 100}),
      careState: faker.word.noun(),
      strikingForLandscape: faker.datatype.boolean(),
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
  return treeDataSet;
}

function getValueSql(treeDataSet: { careState: string; juiceAmount: number; species: { connect: { id: any } }; trunkCircumference: number; cropSize: number; active: boolean; sponsorSearched: boolean; point: number[]; height: number; strikingForLandscape: boolean }[]) {
  let trees = []
  for (let i = 0; i < treeDataSet.length; i++) {
    trees[i] = Prisma.sql`((st_makepoint(${treeDataSet[i].point[0]},${treeDataSet[i].point[1]})), ${treeDataSet[i].height.toFixed(2)}::numeric, ${treeDataSet[i].trunkCircumference}, ${treeDataSet[i].careState}, ${treeDataSet[i].strikingForLandscape}, ${treeDataSet[i].cropSize}, ${treeDataSet[i].juiceAmount}, ${treeDataSet[i].sponsorSearched}, ${treeDataSet[i].active}, ${treeDataSet[i].species.connect.id})`
  }
  return trees;
}

async function writeBenchmark(fCount: string, iterations, chunkSice, treeDataSet: { careState: string; juiceAmount: number; species: { connect: { id: any } }; trunkCircumference: number; cropSize: number; active: boolean; sponsorSearched: boolean; point: number[]; height: number; strikingForLandscape: boolean }[]) {
  console.log(`Starting the Prisma Write Benchmark with ${fCount} Entities over ${iterations} iterations`)
  const progressBar = new SingleBar({}, Presets.shades_classic);
  progressBar.start(iterations, 0)
  let totlTime = 0

  for (let i = 0; i < iterations; i++) {
    let hrstart = process.hrtime()
    for (let i = 0; (i * chunkSice) < treeDataSet.length; i++) {
      const chunk = treeDataSet.slice(i * chunkSice, (i + 1) * chunkSice)

      let valueSql = getValueSql(chunk)

      const sql2 = Prisma.sql`
        INSERT INTO "Tree" ("point", "height", "trunkCircumference", "careState", "strikingForLandscape", "cropSize",
                            "juiceAmount", "sponsorSearched", active, "speciesId")
        VALUES
        ${Prisma.join(valueSql)}`

      // console.log(`Created ${await prisma.$executeRaw(sql2)} Trees`)
      await prisma.$executeRaw(sql2)
    }

    progressBar.update(i+1)
    let hrend = process.hrtime(hrstart)
    totlTime += hrend[1]
  }

  progressBar.stop();
  console.log(`Prisma Write Benchmark with ${fCount} Entities over ${iterations} iterations 
  took a total of ${(totlTime / 1000000).toLocaleString('de-DE')} ms 
  with an average of ${totlTime / 1000000 / iterations} ms per ${fCount} Entities`)
}
