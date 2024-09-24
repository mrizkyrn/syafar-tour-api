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

const serviceTypes = [
  { name: 'Tiket Pesawat' },
  { name: 'Hotel Makkah' },
  { name: 'Hotel Madinah' },
  { name: 'Transportasi' },
  { name: 'Muthawif' },
  { name: 'Handling' },
];

type ServiceTypes = 'TiketPesawat' | 'HotelMakkah' | 'HotelMadinah' | 'Transportasi' | 'Muthawif' | 'Handling';

const serviceData: Record<ServiceTypes, Array<{ name: string; price: number; order_number?: number }>> = {
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

async function createServiceTypesAndServices() {
  for (const type of serviceTypes) {
    const serviceType = await prisma.serviceType.upsert({
      where: { name: type.name },
      update: {},
      create: { name: type.name },
    });

    console.log(`Service Type: ${serviceType.name} (ID: ${serviceType.id})`);

    const services = serviceData[type.name.replace(/\s/g, '') as keyof typeof serviceData] || [];

    // Upsert each service
    for (const service of services) {
      const existingService = await prisma.userService.findFirst({
        where: {
          name: service.name,
          service_type_id: serviceType.id,
        },
      });

      if (!existingService) {
        await prisma.userService.create({
          data: {
            name: service.name,
            price: service.price,
            service_type_id: serviceType.id,
            order_number: service.order_number || 0,
          },
        });
        console.log(`Service '${service.name}' under '${serviceType.name}' created`);
      } else {
        console.log(`Service '${service.name}' under '${serviceType.name}' already exists`);
      }
    }
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
    await createServiceTypesAndServices();
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
