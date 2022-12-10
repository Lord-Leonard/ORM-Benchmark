import {sequelize} from "./data-source";
import {Species} from "./entity/species";
import {faker} from "@faker-js/faker";

async function main(count:number) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync()

    const fakeSepcies = await Species.create({
      name: faker.name.firstName()
    })

    console.log(fakeSepcies.get("id"));

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main(1000)
  .then(async () => {
    await sequelize.close()
  })
.catch(async (e) =>{
  console.error(e)
  await sequelize.close()
  process.exit(1)
})
