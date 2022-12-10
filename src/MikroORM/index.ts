import {EntityManager, MikroORM} from "@mikro-orm/postgresql"; // or any other driver package
import config from './mikro-orm.config';
import {Species, Tree} from "./entities";
import {faker} from "@faker-js/faker";

async function main(count: number) {
  const fCount = count.toLocaleString('de-DE')
  const orm = await MikroORM.init(config)
  const forkEm = orm.em.fork() as EntityManager

  const fakeSpecies = new Species(faker.name.firstName())

  for (let i =0; i < count; i++) {
    forkEm.create(Tree, {
      point: {
        type: "Point",
        "coordinates": [faker.datatype.number({min: -90, max: 90, precision: 0.00001}), faker.datatype.number({
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
      species: fakeSpecies
    }, { persist: true });
  }

  console.time(`Create(many) ${fCount} trees - MikroORM`)
  await forkEm.flush();
  console.timeEnd(`Create(many) ${fCount} trees - MikroORM`)
}

main(10000)
