import {sequelize} from "./data-source";
import {Species} from "./entity/species";
import {faker} from "@faker-js/faker";
import {Tree} from "./entity/tree";
import {Presets, SingleBar} from 'cli-progress'

export async function sequelizeBenchmark(count: number, iterations: number) {
  await setupSequelizeDb();

  const fakeSpecies = await createFakeSpecies();
  const fakeTreesObject = createFakeTreeSet(count, fakeSpecies);

  await writeBenchmark(
    count.toLocaleString('de-DE'),
    iterations,
    fakeTreesObject);
}

async function setupSequelizeDb() {
  await sequelize.authenticate();
  await sequelize.sync({force: true})
}

async function createFakeSpecies() {
  return await Species.create({
    name: faker.name.firstName()
  });
}

function createFakeTreeSet(count: number, fakeSpecies: Species) {
  return Array.from({length: count}, () => {
    return {
      point: {
        type: "Point",
        coordinates: [faker.datatype.number({min: -90, max: 90, precision: 0.00001}), faker.datatype.number({
          min: -180,
          max: 180,
          precision: 0.00001
        })]
      },
      height: faker.datatype.number({min: 1, max: 5, precision: 0.01}),
      trunkCircumference: faker.datatype.number({min: 15, max: 100}),
      careState: faker.word.noun(),
      strikingForLandscape: faker.datatype.boolean(),
      yearOfPlanting: Date.now(),
      cropSize: faker.datatype.number({min: 5, max: 20}),
      juiceAmount: faker.datatype.number({min: 1, max: 10}),
      sponsorSearched: faker.datatype.boolean(),
      active: faker.datatype.boolean(),
      speciesId: fakeSpecies.id
    }
  });
}

async function writeBenchmark(fCount: string, iterations: number, fakeTreesObject: { careState: string; juiceAmount: number; trunkCircumference: number; cropSize: number; active: boolean; speciesId: any; sponsorSearched: boolean; point: { coordinates: number[]; type: string }; height: number; strikingForLandscape: boolean; yearOfPlanting: number }[]) {
  console.log(`Starting the Sequelize Write Benchmark with ${fCount} Entities over ${iterations} iterations`)
  const progressBar = new SingleBar({}, Presets.shades_classic);
  progressBar.start(iterations, 0)
  let totlTime = 0

  for (let i = 0; i < iterations; i++) {
    let hrstart = process.hrtime()

    // @ts-ignore
    await Tree.bulkCreate(fakeTreesObject)

    progressBar.update(i + 1)
    let hrend = process.hrtime(hrstart)
    totlTime += hrend[1]
  }

  progressBar.stop();
  console.log(`Sequelize Write Benchmark with ${fCount} Entities over ${iterations} iterations 
  took a total of ${(totlTime / 1000000).toLocaleString('de-DE')} ms 
  with an average of ${totlTime / 1000000 / iterations} ms per ${fCount} Entities`)
}
