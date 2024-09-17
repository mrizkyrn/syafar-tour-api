import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        full_name: 'Admin User',
        whatsapp_number: '1234567890',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created:', admin);
  }

  const flightTicketData = [
    { name: 'Tanpa Tiket Pesawat', price: 0 },
    { name: 'Saudia Economy Class - CGK-JED', price: 5000000 },
    { name: 'Saudia Economy Class - CGK-MED', price: 10000000 },
    { name: 'Etihat Economy Class - CGK-JED', price: 5000000 },
    { name: 'Indigo Economy Class - CGK-JED', price: 10000000 },
    { name: 'Garuda Economy Class - CGK-JED', price: 15000000 },
    { name: 'Garuda Economy Class - CGK-MED', price: 15000000 },
  ];

  // Insert flight tickets if they do not already exist
  for (const ticket of flightTicketData) {
    const existingTicket = await prisma.flight.findFirst({
      where: { name: ticket.name },
    });

    if (!existingTicket) {
      await prisma.flight.create({
        data: ticket,
      });
      console.log(`Flight ticket for ${ticket.name} created`);
    } else {
      console.log(`Flight ticket for ${ticket.name} already exists`);
    }
  }

  const hotelMekkahData = [
    { name: 'Tanpa Hotel', price: 0 },
    { name: 'Hotel Bintang 3', price: 1000000 },
    { name: 'Hotel Bintang 4', price: 1500000 },
    { name: 'Hotel Bintang 5', price: 2000000 },
  ];

  // Insert Mekkah hotels if they do not already exist
  for (const hotel of hotelMekkahData) {
    const existingHotel = await prisma.hotelMekkah.findFirst({
      where: { name: hotel.name },
    });

    if (!existingHotel) {
      await prisma.hotelMekkah.create({
        data: hotel,
      });
      console.log(`Mekkah hotel for ${hotel.name} created`);
    } else {
      console.log(`Mekkah hotel for ${hotel.name} already exists`);
    }
  }

  const hotelMaddinahData = [
    { name: 'Tanpa Hotel', price: 0 },
    { name: 'Hotel Bintang 3', price: 800000 },
    { name: 'Hotel Bintang 4', price: 1200000 },
    { name: 'Hotel Bintang 5', price: 1600000 },
  ];

  // Insert Maddinah hotels if they do not already exist
  for (const hotel of hotelMaddinahData) {
    const existingHotel = await prisma.hotelMaddinah.findFirst({
      where: { name: hotel.name },
    });

    if (!existingHotel) {
      await prisma.hotelMaddinah.create({
        data: hotel,
      });
      console.log(`Maddinah hotel for ${hotel.name} created`);
    } else {
      console.log(`Maddinah hotel for ${hotel.name} already exists`);
    }
  }

  const transportationData = [
    { name: 'Tanpa Transportasi', price: 0 },
    { name: 'Dengan Transportasi', price: 500000 },
  ];

  // Insert transportation options if they do not already exist
  for (const transport of transportationData) {
    const existingTransport = await prisma.transportation.findFirst({
      where: { name: transport.name },
    });

    if (!existingTransport) {
      await prisma.transportation.create({
        data: transport,
      });
      console.log(`Transportation option for ${transport.name} created`);
    } else {
      console.log(`Transportation option for ${transport.name} already exists`);
    }
  }

  const muthawwifData = [
    { name: 'Tanpa Muthawwif', price: 0 },
    { name: 'Muthawwif 4D', price: 500000 },
    { name: 'Full Muthawwif', price: 1000000 },
  ];

  // Insert muthawwif options if they do not already exist
  for (const muthawwif of muthawwifData) {
    const existingMuthawwif = await prisma.muthawwif.findFirst({
      where: { name: muthawwif.name },
    });

    if (!existingMuthawwif) {
      await prisma.muthawwif.create({
        data: muthawwif,
      });
      console.log(`Muthawwif option for ${muthawwif.name} created`);
    } else {
      console.log(`Muthawwif option for ${muthawwif.name} already exists`);
    }
  }

  const handlingData = [
    { name: 'Tanpa Handling', price: 0 },
    { name: 'Handling', price: 500000 },
    { name: 'Full Handling', price: 1000000 },
  ];

  // Insert handling options if they do not already exist
  for (const handling of handlingData) {
    const existingHandling = await prisma.handling.findFirst({
      where: { name: handling.name },
    });

    if (!existingHandling) {
      await prisma.handling.create({
        data: handling,
      });
      console.log(`Handling option for ${handling.name} created`);
    } else {
      console.log(`Handling option for ${handling.name} already exists`);
    }
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
