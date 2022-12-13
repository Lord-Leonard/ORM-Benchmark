import {sequelizeBenchmark} from "./SequelizeORM/sequelize-benchmark";
import {prismaBenchmark} from "./prisma/prisma-benchmark";
import {mikroormBenchmark} from "./MikroORM";
import {typeormBenchmark} from "./TypeORM/typeorm-benchmark";
import {Client} from 'pg'

async function setupDatabases() {
    const client = new Client({
        user: "root",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "postgres"
    });
    client.connect();
    try {
        await client.query("CREATE DATABASE mikrodb");
        await client.query("CREATE DATABASE typeormdb");
    } catch (e) {
    }
    client.end();
}

async function main() {
    let entityCount = 10000
    let iterations = 50

    await setupDatabases();

    await prismaBenchmark(entityCount, iterations, 2000)
    await sequelizeBenchmark(entityCount, iterations)
    await mikroormBenchmark(entityCount, iterations)
    await typeormBenchmark(entityCount, iterations, 2000)
}


main()
    .then(() => {
            console.log(
                "----------------------------\n" +
                "Benchmarks finisched")
            process.exit(1)
        }
    );
