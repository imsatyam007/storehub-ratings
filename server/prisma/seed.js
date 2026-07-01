import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@storehub.com",
    },
  });

  if (adminExists) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "System Administrator StoreHub",
      email: "admin@storehub.com",
      password: hashedPassword,
      address: "StoreHub Headquarters",
      role: Role.ADMIN,
    },
  });

  console.log("Initial admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });