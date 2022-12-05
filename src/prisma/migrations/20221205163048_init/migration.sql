-- CreateTable
CREATE TABLE "Tree" (
    "id" SERIAL NOT NULL,
    "point" point NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "trunkCircumference" DOUBLE PRECISION NOT NULL,
    "careState" TEXT NOT NULL,
    "strikingForLandscape" BOOLEAN NOT NULL,
    "yearOfPlanting" TIMESTAMP(3) NOT NULL,
    "cropSize" DOUBLE PRECISION NOT NULL,
    "juiceAmount" DOUBLE PRECISION NOT NULL,
    "sponsorSearched" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
