import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Shiitake Mushroom",
        img: "https://example.com/img/shiitake.jpg",
        description: "Delicious shiitake mushrooms.",
        price: 5000,
        itemSold: 100,
        rating: 4,
        category: "FUNGI",
      },
      {
        name: "Apple",
        img: "https://example.com/img/apple.jpg",
        description: "Fresh and juicy apple.",
        price: 3000,
        itemSold: 150,
        rating: 5,
        category: "FRUIT",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
