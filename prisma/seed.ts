import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type Role = 'ADMIN' | 'MITRA' | 'USER';

const adminData = {
  email: 'admin@example.com',
  full_name: 'Admin User',
  whatsapp_number: '1234567890',
  password: 'admin123',
  role: 'ADMIN' as Role,
};

const packageTypes = [
  { name: 'Tiket Pesawat' },
  { name: 'Hotel Makkah' },
  { name: 'Hotel Madinah' },
  { name: 'Transportasi' },
  { name: 'Muthawif' },
  { name: 'Handling' },
];

type PackageTypes = 'TiketPesawat' | 'HotelMakkah' | 'HotelMadinah' | 'Transportasi' | 'Muthawif' | 'Handling';

const itemData: Record<PackageTypes, Array<{ name: string; price: number; order_number?: number }>> = {
  TiketPesawat: [
    { name: 'Tanpa Tiket Pesawat', price: 0, order_number: 1 },
    { name: 'Saudia Economy Class - CGK-JED', price: 5000000, order_number: 2 },
    { name: 'Saudia Economy Class - CGK-MED', price: 10000000, order_number: 3 },
    { name: 'Etihat Economy Class - CGK-JED', price: 5000000, order_number: 4 },
    { name: 'Indigo Economy Class - CGK-JED', price: 10000000, order_number: 5 },
    { name: 'Garuda Economy Class - CGK-JED', price: 15000000, order_number: 6 },
    { name: 'Garuda Economy Class - CGK-MED', price: 15000000, order_number: 7 },
  ],
  HotelMakkah: [
    { name: 'Tanpa Hotel', price: 0, order_number: 1 },
    { name: 'Hotel Bintang 3', price: 1000000, order_number: 2 },
    { name: 'Hotel Bintang 4', price: 1500000, order_number: 3 },
    { name: 'Hotel Bintang 5', price: 2000000, order_number: 4 },
  ],
  HotelMadinah: [
    { name: 'Tanpa Hotel', price: 0, order_number: 1 },
    { name: 'Hotel Bintang 3', price: 800000, order_number: 2 },
    { name: 'Hotel Bintang 4', price: 1200000, order_number: 3 },
    { name: 'Hotel Bintang 5', price: 1600000, order_number: 4 },
  ],
  Transportasi: [
    { name: 'Tanpa Transportasi', price: 0, order_number: 1 },
    { name: 'Dengan Transportasi', price: 500000, order_number: 2 },
  ],
  Muthawif: [
    { name: 'Tanpa Muthawwif', price: 0, order_number: 1 },
    { name: 'Muthawwif 4D', price: 500000, order_number: 2 },
    { name: 'Full Muthawwif', price: 1000000, order_number: 3 },
  ],
  Handling: [
    { name: 'Tanpa Handling', price: 0, order_number: 1 },
    { name: 'Handling', price: 500000, order_number: 2 },
    { name: 'Full Handling', price: 1000000, order_number: 3 },
  ],
};

const CategoryData = [
  { name: 'Paket Umroh', has_variation: true },
  { name: 'Visa Umroh', has_variation: false },
  { name: 'Paket Hotel', has_variation: true },
];

async function createAdminUser() {
  const existingAdmin = await prisma.user.findFirst({
    where: { email: adminData.email },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    await prisma.user.create({
      data: {
        email: adminData.email,
        full_name: adminData.full_name,
        whatsapp_number: adminData.whatsapp_number,
        password: hashedPassword,
        role: adminData.role,
      },
    });

    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

async function seedPackageItems() {
  try {
    for (const packageItem of packageTypes) {
      const createdPackageItem = await prisma.packageType.create({
        data: {
          name: packageItem.name,
        },
      });

      console.log(`Seeded Package Item: ${createdPackageItem.name}`);

      const itemKey = packageItem.name.replace(/\s/g, '') as PackageTypes;
      const relatedItems = itemData[itemKey];

      for (const item of relatedItems) {
        await prisma.userPackageOption.create({
          data: {
            name: item.name,
            price: item.price,
            order_number: item.order_number ?? 0,
            package_type_id: createdPackageItem.id,
          },
        });

        console.log(`   Seeded User Package Item: ${item.name} for ${createdPackageItem.name}`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function createCategories() {
  for (const category of CategoryData) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: category.name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: {
          name: category.name,
          has_variation: category.has_variation,
        },
      });

      console.log(`Category '${category.name}' created`);
    } else {
      console.log(`Category '${category.name}' already exists`);
    }
  }
}

async function main() {
  try {
    console.log('Starting seeding process...');
    await createAdminUser();
    await seedPackageItems();
    await createCategories();
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
