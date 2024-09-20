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

const serviceData: Record<ServiceTypes, Array<{ name: string; price: number }>> = {
  TiketPesawat: [
    { name: 'Tanpa Tiket Pesawat', price: 0 },
    { name: 'Saudia Economy Class - CGK-JED', price: 5000000 },
    { name: 'Saudia Economy Class - CGK-MED', price: 10000000 },
    { name: 'Etihat Economy Class - CGK-JED', price: 5000000 },
    { name: 'Indigo Economy Class - CGK-JED', price: 10000000 },
    { name: 'Garuda Economy Class - CGK-JED', price: 15000000 },
    { name: 'Garuda Economy Class - CGK-MED', price: 15000000 },
  ],
  HotelMakkah: [
    { name: 'Tanpa Hotel', price: 0 },
    { name: 'Hotel Bintang 3', price: 1000000 },
    { name: 'Hotel Bintang 4', price: 1500000 },
    { name: 'Hotel Bintang 5', price: 2000000 },
  ],
  HotelMadinah: [
    { name: 'Tanpa Hotel', price: 0 },
    { name: 'Hotel Bintang 3', price: 800000 },
    { name: 'Hotel Bintang 4', price: 1200000 },
    { name: 'Hotel Bintang 5', price: 1600000 },
  ],
  Transportasi: [
    { name: 'Tanpa Transportasi', price: 0 },
    { name: 'Dengan Transportasi', price: 500000 },
  ],
  Muthawif: [
    { name: 'Tanpa Muthawwif', price: 0 },
    { name: 'Muthawwif 4D', price: 500000 },
    { name: 'Full Muthawwif', price: 1000000 },
  ],
  Handling: [
    { name: 'Tanpa Handling', price: 0 },
    { name: 'Handling', price: 500000 },
    { name: 'Full Handling', price: 1000000 },
  ],
};

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
          service_name: service.name,
          service_type_id: serviceType.id,
        },
      });

      if (!existingService) {
        await prisma.userService.create({
          data: {
            service_name: service.name,
            service_price: service.price,
            service_type_id: serviceType.id,
          },
        });
        console.log(`Service '${service.name}' under '${serviceType.name}' created`);
      } else {
        console.log(`Service '${service.name}' under '${serviceType.name}' already exists`);
      }
    }
  }
}

async function main() {
  try {
    console.log('Starting seeding process...');
    await createAdminUser();
    await createServiceTypesAndServices();
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
