# Setup

1. Start Docker (docker-compose up)
2. Setup Prisma
3. Install dependencies (npm i)


## install dependencies
```bash
npm install 
```

## Start Docker
```bash
sudo docker-compose up
```

## 2. Setup Prisma 
```bash
prisma migrate dev --schema src/prisma/schema.prisma
```

## Start Benchmark
```bash
npm run start-all-benchmarks
```

## Stop Docker
```bash
sudo docker-compose down
```
