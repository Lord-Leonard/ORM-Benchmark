import {faker} from "@faker-js/faker";
import {AppDataSource} from "./data-source";
import {Tree} from "./entity/tree";
import {Species} from "./entity/species";
import {Repository} from "typeorm";


let treeRepository: Repository<Tree>
let speciesRepository: Repository<Species>

const createManyTrees = async (count: number) => {
  const fCount = count.toLocaleString('de-DE')

  const fakeSpecies = new Species()
  fakeSpecies.name = faker.name.firstName()

  await speciesRepository.save(fakeSpecies)


  const fakeTrees: Tree[] = Array.from({length: count}, () => {
    let tree = new Tree()
    tree.point = {
      type: "Point",
      "coordinates": [faker.datatype.number({min: -90, max: 90, precision: 0.00001}), faker.datatype.number({
        min: -180,
        max: 180,
        precision: 0.00001
      })]
    }
    tree.height = faker.datatype.number({min: 1, max: 5, precision: 0.01})
    tree.trunkCircumference = faker.datatype.number({min: 15, max: 100})
    tree.careState = faker.word.noun()
    tree.strikingForLandscape = faker.datatype.boolean()
    tree.yearOfPlanting = Date.now()
    tree.cropSize = faker.datatype.number({min: 5, max: 20})
    tree.juiceAmount = faker.datatype.number({min: 1, max: 10})
    tree.sponsorSearched = faker.datatype.boolean()
    tree.active = faker.datatype.boolean()
    tree.species = fakeSpecies
    return tree
  })

  console.time(`Create(many) ${fCount} users - TYPEORM`)
  await treeRepository.save(fakeTrees)
  console.timeEnd(`Create(many) ${fCount} users - TYPEORM`)

}

AppDataSource.initialize().then(async () => {
  treeRepository = AppDataSource.getRepository(Tree);
  speciesRepository = AppDataSource.getRepository(Species)

  console.log("start TYPEORM Benchmark")
  await createManyTrees(5000)

}).catch(error => console.log(error))




