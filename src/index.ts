import {prismaBenchmark} from "./Prisma/prisma-benchmark";
import {sequelizeBenchmark} from "./SequelizeORM/sequelize-benchmark";

async function main() {
  let entityCount = 10000
  let iterations = 50

  //await prismaBenchmark(entityCount, 2000, iterations)

  await sequelizeBenchmark(entityCount, iterations)
}


main()
  .then(() =>
    console.log(
      "----------------------------\n" +
      "Benchmarks finisched")
  );
