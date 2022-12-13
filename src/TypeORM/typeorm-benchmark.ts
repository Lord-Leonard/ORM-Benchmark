import {faker} from "@faker-js/faker";
import {typeormDatabaseOptions} from "./data-source";
import {Tree} from "./entity/tree";
import {Species} from "./entity/species";
import {DataSource, Repository} from "typeorm";
import {Presets, SingleBar} from 'cli-progress'
import {Client} from 'pg'

export async function typeormBenchmark(count: number, iterations: number, chunkSize: number) {
    const dataSource = await setupTypeormDb();

    const treeRepository = dataSource.getRepository(Tree);
    const speciesRepository = dataSource.getRepository(Species)

    const fakeSpecies = await createFakeSpecies(speciesRepository);
    const fakeTrees = createFakeTreeSet(count, fakeSpecies);

    await writeBenchmark(count.toLocaleString('de-DE'),
        treeRepository,
        fakeTrees,
        iterations,
        chunkSize
    );
}

async function setupTypeormDb() {
    const client = new Client({
        user: "root",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "postgres"
    });
    client.connect();
    try {
        await client.query("CREATE DATABASE typeormdb")
    } catch (e) {

    }
    await client.query("CREATE EXTENSION IF NOT EXISTS postgis");
    client.end();

    return new DataSource(typeormDatabaseOptions).initialize()
}

async function createFakeSpecies(speciesRepository: Repository<Species>) {
    const fakeSpecies = new Species()
    fakeSpecies.name = faker.name.firstName()

    await speciesRepository.save(fakeSpecies)
    return fakeSpecies;
}

function createFakeTreeSet(count: number, fakeSpecies: Species) {
    return Array.from({length: count}, () => {
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
    });
}

async function writeBenchmark(fCount: string, treeRepository: Repository<Tree>, fakeTrees: Tree[], iterations: number, chunkSize: number,) {
    console.log(`Starting the TypeOrm Write Benchmark with ${fCount} Entities over ${iterations} iterations`)
    const progressBar = new SingleBar({}, Presets.shades_classic);
    progressBar.start(iterations, 0)
    let totlTime = 0

    for (let i = 0; i < iterations; i++) {
        let hrstart = process.hrtime()

        await treeRepository.save(fakeTrees, {chunk: chunkSize})

        progressBar.update(i + 1)
        let hrend = process.hrtime(hrstart)
        totlTime += hrend[1]

    }
    progressBar.stop();

    console.log(`TypeOrm Write Benchmark with ${fCount} Entities over ${iterations} iterations 
  took a total of ${(totlTime / 1000000).toLocaleString('de-DE')} ms 
  with an average of ${totlTime / 1000000 / iterations} ms per ${fCount} Entities`)
}


