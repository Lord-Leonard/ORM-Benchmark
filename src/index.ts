import {sequelizeBenchmark} from "./SequelizeORM/sequelize-benchmark";
import {prismaBenchmark} from "./prisma/prisma-benchmark";
import {mikroormBenchmark} from "./MikroORM";
import {typeormBenchmark} from "./TypeORM/typeorm-benchmark";

async function main() {
    let entityCount = 10000
    let iterations = 50

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
