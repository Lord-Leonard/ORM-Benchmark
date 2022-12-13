# Setup

1. Install dependencies (npm i)
2. Start Database with Docker (docker-compose up)
3. run Benchmark
4. Cleanup Database 

---

## install dependencies
```bash
npm install 
```

---
## Start Docker
### Linux
```bash 
sudo docker-compose up
```

### Windows
```bash
docker-compose up
```

---
## Start Benchmark
```bash
npm run start
```

---
## Stop Docker
### Linux
```bash
sudo docker-compose down
```

### Windows 
```bash
docker-compose down
```