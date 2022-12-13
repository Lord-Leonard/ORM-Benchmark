import {AbstractSqlDriver, EntityManager, MikroORM, SqlEntityManager} from "@mikro-orm/postgresql"; // or any other driver package
import config from './mikro-orm.config';
import {Species, Tree} from "./entities";
import {faker} from "@faker-js/faker";
import {Point} from "./types/Point";
import {Presets, SingleBar} from 'cli-progress'
import {PostgreSqlMikroORM} from "@mikro-orm/postgresql/PostgreSqlMikroORM";
import {Client} from 'pg'


export async function mikroormBenchmark(count: number, iterations: number) {
    const orm = await setupMikroormDb();
    const EntityManager = await getEntityManager(orm)

    const fakeSpecies = new Species(faker.name.firstName())
    createFakeTreeSet(count, EntityManager, fakeSpecies);

    await writeBenchmark(
        count.toLocaleString('de-DE'),
        EntityManager,
        iterations
    );
}

async function setupMikroormDb() {
    const orm = await MikroORM.init(config);
    const client = new Client({
        user: "root",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "mikrodb"
    });
    client.connect();
    await client.query("CREATE EXTENSION IF NOT EXISTS postgis");
    client.end();

    const migrator = orm.getMigrator();
    await migrator.createMigration();
    await migrator.up();
    return orm;
}

async function getEntityManager(orm: PostgreSqlMikroORM) {
    return orm.em.fork() as EntityManager
}

function createFakeTreeSet(count: number, entityManager: SqlEntityManager<AbstractSqlDriver>, fakeSpecies: Species) {
    for (let i = 0; i < count; i++) {
        entityManager.create(Tree, {
            point: new Point(
                faker.datatype.number({min: -90, max: 90, precision: 0.00001}),
                faker.datatype.number({min: -180, max: 180, precision: 0.00001})
            ),
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
        }, {persist: true});
    }
}

async function writeBenchmark(fCount: string, forkEm: SqlEntityManager<AbstractSqlDriver>, iterations1: number) {
    console.log(`Starting the Sequelize Write Benchmark with ${fCount} Entities over ${iterations1} iterations`)
    const progressBar = new SingleBar({}, Presets.shades_classic);
    progressBar.start(iterations1, 0)
    let totlTime = 0

    for (let i = 0; i < iterations1; i++) {
        let hrstart = process.hrtime()

        await forkEm.flush();

        progressBar.update(i + 1)
        let hrend = process.hrtime(hrstart)
        totlTime += hrend[1]
    }

    progressBar.stop();
    console.log(`Sequelize Write Benchmark with ${fCount} Entities over ${iterations1} iterations 
  took a total of ${(totlTime / 1000000).toLocaleString('de-DE')} ms 
  with an average of ${totlTime / 1000000 / iterations1} ms per ${fCount} Entities`)
}
