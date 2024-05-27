const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const assetTypes = [
  { name: "Area" },
  { name: "Gas" },
  { name: "Steam" },
  { name: "Electricity" },
  { name: "Heat" },
];

const fillTables = async () => {
  try {
    await prisma.assetType.createMany({ data: assetTypes });
    console.log("Asset types created successfully.");
  } catch (err) {
    console.error("Error creating asset types:", err);
  } finally {
    await prisma.$disconnect();
  }
};

fillTables();
