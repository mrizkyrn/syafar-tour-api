import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Admin
type Role = 'ADMIN' | 'MITRA' | 'USER';
const adminData = {
  email: 'admin@example.com',
  full_name: 'Admin User',
  whatsapp_number: '1234567890',
  password: 'admin123',
  role: 'ADMIN' as Role,
};

// Package Types
const packageTypes = [
  { name: 'Tiket Pesawat' },
  { name: 'Hotel Makkah' },
  { name: 'Hotel Madinah' },
  { name: 'Transportasi' },
  { name: 'Muthawif' },
  { name: 'Handling' },
];

// User Package Options
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

// Categories
const CategoryData = [{ name: 'Paket Umroh' }, { name: 'Visa Umroh' }, { name: 'Paket Hotel' }];

// Periods
type PeriodCategory = 'LOW' | 'MID' | 'HIGH' | 'RAMADHAN' | 'ITIKAF';
const periods = [
  { cateogry: 'LOW' as PeriodCategory, start_date: new Date('2024-09-01'), end_date: new Date('2024-11-30') },
  { cateogry: 'MID' as PeriodCategory, start_date: new Date('2024-12-01'), end_date: new Date('2024-12-16') },
  { cateogry: 'HIGH' as PeriodCategory, start_date: new Date('2024-12-17'), end_date: new Date('2025-01-11') },
  { cateogry: 'MID' as PeriodCategory, start_date: new Date('2025-01-12'), end_date: new Date('2025-02-28') },
  { cateogry: 'RAMADHAN' as PeriodCategory, start_date: new Date('2025-03-01'), end_date: new Date('2025-03-15') },
  { cateogry: 'ITIKAF' as PeriodCategory, start_date: new Date('2025-03-16'), end_date: new Date('2025-03-31') },
  { cateogry: 'MID' as PeriodCategory, start_date: new Date('2025-04-01'), end_date: new Date('2025-04-10') },
  { cateogry: 'LOW' as PeriodCategory, start_date: new Date('2025-04-11'), end_date: new Date('2025-04-30') },
];

// Vendors
const vendors = [{ name: 'MKM' }, { name: 'ALH' }, { name: 'HVN' }, { name: 'ALK' }];

// Hotels
type City = 'MEKKAH' | 'MADINAH';
const hotels = [
  {
    vendor: 'MKM',
    hotels: [
      { name: 'TIDAK', city: 'MEKKAH', prices: { double: 0, triple: 0, quad: 0 } },
      { name: 'AKABER AL HIJRAH', city: 'MEKKAH', prices: { double: 250, triple: 290, quad: 340 } },
      { name: 'SNOOD AJYAD', city: 'MEKKAH', prices: { double: 420, triple: 460, quad: 500 } },
      { name: 'GRAND AL MASSA', city: 'MEKKAH', prices: { double: 490, triple: 540, quad: 590 } },
      { name: 'RAYYANA AJYAD', city: 'MEKKAH', prices: { double: 660, triple: 670, quad: 770 } },
      { name: 'MARRIOT JABAL OMAR', city: 'MEKKAH', prices: { double: 660, triple: 760, quad: 860 } },
      { name: 'MAKAREM AJYAD', city: 'MEKKAH', prices: { double: 660, triple: 790, quad: 920 } },
      { name: 'SOFWAH DURRAR AL EIMAN', city: 'MEKKAH', prices: { double: 980, triple: 1160, quad: 1325 } },
      { name: 'PULLMAN ZAM ZAM', city: 'MEKKAH', prices: { double: 1080, triple: 1225, quad: 1450 } },
      { name: 'HYAT REGENCY MAKKAH', city: 'MEKKAH', prices: { double: 1150, triple: 1450, quad: 1750 } },
      { name: 'TIDAK', city: 'MADINAH', prices: { double: 0, triple: 0, quad: 0 } },
      { name: 'SAMA AL MASI', city: 'MADINAH', prices: { double: 390, triple: 430, quad: 470 } },
      { name: 'JAWHARAT RASHEED', city: 'MADINAH', prices: { double: 360, triple: 400, quad: 440 } },
      { name: 'HAYAH PLAZA', city: 'MADINAH', prices: { double: 380, triple: 420, quad: 460 } },
      { name: 'AL MADINAH CONCORDE', city: 'MADINAH', prices: { double: 425, triple: 470, quad: 515 } },
      { name: 'RUA INTERNATIONAL', city: 'MADINAH', prices: { double: 430, triple: 475, quad: 520 } },
      { name: 'DAR AL NAEM', city: 'MADINAH', prices: { double: 445, triple: 490, quad: 535 } },
      { name: 'SAFWAT AL MADINAH', city: 'MADINAH', prices: { double: 480, triple: 525, quad: 570 } },
      { name: 'GRAND PLAZA', city: 'MADINAH', prices: { double: 490, triple: 560, quad: 620 } },
      { name: 'FRONT TAIBA', city: 'MADINAH', prices: { double: 720, triple: 845, quad: 970 } },
    ],
  },
  {
    vendor: 'ALH',
    hotels: [
      { name: 'SARAYA ALTAJ', city: 'MEKKAH', prices: { double: 240, triple: 255, quad: 290 } },
      { name: 'AMJAD AJYAD', city: 'MEKKAH', prices: { double: 220, triple: 260, quad: 300 } },
      { name: 'RAWABI ZAM ZAM', city: 'MEKKAH', prices: { double: 280, triple: 315, quad: 350 } },
      { name: 'PARK REGIS', city: 'MEKKAH', prices: { double: 260, triple: 310, quad: 360 } },
      { name: 'MATHER AL JEWAR', city: 'MEKKAH', prices: { double: 285, triple: 325, quad: 365 } },
      { name: 'AL MASSA BADR', city: 'MEKKAH', prices: { double: 305, triple: 345, quad: 385 } },
      { name: 'REHAB AL TAQWA', city: 'MEKKAH', prices: { double: 305, triple: 345, quad: 385 } },
      { name: 'MILLENIUM HOTEL', city: 'MEKKAH', prices: { double: 320, triple: 380, quad: 440 } },
      { name: 'VOCO MAKKAH', city: 'MEKKAH', prices: { double: 330, triple: 385, quad: 440 } },
      { name: 'LE MERIDIEN TOWER', city: 'MEKKAH', prices: { double: 350, triple: 400, quad: 460 } },
      { name: 'DAR ELIMAN AL HARAM', city: 'MADINAH', prices: { double: 1000, triple: 1250, quad: 3000 } },
      { name: 'GOLDEN TULIP ZAHABI', city: 'MADINAH', prices: { double: 1065, triple: 1115, quad: 1180 } },
    ],
  },
];

// Airlines
const airlines = [
  { name: 'TIDAK', price: 0 },
  { name: 'GARUDA', price: 15600000 },
  { name: 'SAUDIA', price: 14600000 },
  { name: 'QATAR', price: 14500000 },
  { name: 'ETIHAD', price: 14500000 },
  { name: 'OMAN', price: 13500000 },
  { name: 'SCOOT', price: 13500000 },
  { name: 'LION', price: 12500000 },
  { name: 'INDIGO', price: 11900000 },
  { name: 'AIR ASIA KUL', price: 11500000 },
  { name: '9 JUTA', price: 9000000 },
  { name: '10 JUTA', price: 10000000 },
  { name: '11 JUTA', price: 11000000 },
  { name: '12 JUTA', price: 12000000 },
  { name: '13 JUTA', price: 13000000 },
  { name: '14 JUTA', price: 14000000 },
  { name: '15 JUTA', price: 15000000 },
  { name: '16 JUTA', price: 16000000 },
  { name: '17 JUTA', price: 17000000 },
  { name: 'SV JED JED DEC', price: 16400000 },
  { name: 'SV MED JED DEC', price: 17400000 },
];

const visa = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'VISA ONLY', price_idr: 2106000 },
  { name: 'VISA & BUS (35)', price_idr: 2184000 },
  { name: 'VISA & BUS THAIF (35)', price_idr: 2324400 },
  { name: 'VISA BUS 1', price_idr: 15444000 },
  { name: 'VISA BUS 2', price_idr: 8626800 },
  { name: 'VISA BUS 3', price_idr: 6349200 },
  { name: 'VISA BUS 4', price_idr: 5210400 },
  { name: 'VISA BUS 5', price_idr: 4524000 },
  { name: 'VISA BUS 6', price_idr: 4071600 },
  { name: 'VISA BUS 7', price_idr: 3744000 },
  { name: 'VISA BUS 8', price_idr: 3494400 },
  { name: 'VISA BUS 9', price_idr: 3307200 },
  { name: 'VISA BUS 10', price_idr: 3166800 },
  { name: 'VISA BUS 11', price_idr: 3042000 },
  { name: 'VISA BUS 12', price_idr: 2932800 },
  { name: 'VISA BUS 13', price_idr: 2839200 },
  { name: 'VISA BUS 14', price_idr: 2776800 },
  { name: 'VISA BUS 15', price_idr: 2698800 },
  { name: 'VISA BUS 16', price_idr: 2652000 },
  { name: 'VISA BUS 17', price_idr: 2589600 },
  { name: 'VISA BUS 18', price_idr: 2558400 },
  { name: 'VISA BUS 19', price_idr: 2511600 },
  { name: 'VISA BUS 20', price_idr: 2480400 },
  { name: 'VISA BUS 21', price_idr: 2449200 },
  { name: 'VISA BUS 22', price_idr: 2418000 },
  { name: 'VISA BUS 23', price_idr: 2386800 },
  { name: 'VISA BUS 24', price_idr: 2355600 },
  { name: 'VISA BUS 25', price_idr: 2340000 },
  { name: 'VISA BUS 26', price_idr: 2324400 },
  { name: 'VISA BUS 27', price_idr: 2293200 },
  { name: 'VISA BUS 28', price_idr: 2277600 },
  { name: 'VISA BUS 29', price_idr: 2262000 },
  { name: 'VISA BUS 30', price_idr: 2246400 },
  { name: 'VISA BUS 31', price_idr: 2230800 },
  { name: 'VISA BUS 32', price_idr: 2215200 },
  { name: 'VISA BUS 33', price_idr: 2215200 },
  { name: 'VISA BUS 34', price_idr: 2199600 },
  { name: 'VISA BUS 35', price_idr: 2184000 },
  { name: 'VISA BUS + THAIF 1', price_idr: 20888400 },
  { name: 'VISA BUS + THAIF 2', price_idr: 11341200 },
  { name: 'VISA BUS + THAIF 3', price_idr: 8143200 },
  { name: 'VISA BUS + THAIF 4', price_idr: 6552000 },
  { name: 'VISA BUS + THAIF 5', price_idr: 5600400 },
  { name: 'VISA BUS + THAIF 6', price_idr: 4960800 },
  { name: 'VISA BUS + THAIF 7', price_idr: 4508400 },
  { name: 'VISA BUS + THAIF 8', price_idr: 4165200 },
  { name: 'VISA BUS + THAIF 9', price_idr: 3900000 },
  { name: 'VISA BUS + THAIF 10', price_idr: 3697200 },
  { name: 'VISA BUS + THAIF 11', price_idr: 3510000 },
  { name: 'VISA BUS + THAIF 12', price_idr: 3369600 },
  { name: 'VISA BUS + THAIF 13', price_idr: 3244800 },
  { name: 'VISA BUS + THAIF 14', price_idr: 3151200 },
  { name: 'VISA BUS + THAIF 15', price_idr: 3057600 },
  { name: 'VISA BUS + THAIF 16', price_idr: 2979600 },
  { name: 'VISA BUS + THAIF 17', price_idr: 2901600 },
  { name: 'VISA BUS + THAIF 18', price_idr: 2839200 },
  { name: 'VISA BUS + THAIF 19', price_idr: 2776800 },
  { name: 'VISA BUS + THAIF 20', price_idr: 2730000 },
  { name: 'VISA BUS + THAIF 21', price_idr: 2683200 },
  { name: 'VISA BUS + THAIF 22', price_idr: 2652000 },
  { name: 'VISA BUS + THAIF 23', price_idr: 2605200 },
  { name: 'VISA BUS + THAIF 24', price_idr: 2574000 },
  { name: 'VISA BUS + THAIF 25', price_idr: 2542800 },
  { name: 'VISA BUS + THAIF 26', price_idr: 2511600 },
  { name: 'VISA BUS + THAIF 27', price_idr: 2480400 },
  { name: 'VISA BUS + THAIF 28', price_idr: 2464800 },
];

const transportations = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'HIACE JED MED', price_idr: 2795000 },
  { name: 'HIACE MED ZIARAH', price_idr: 1290000 },
  { name: 'HIACE MED MAK', price_idr: 2795000 },
  { name: 'HIACE MAK ZIARAH', price_idr: 1720000 },
  { name: 'HIACE MAK JED', price_idr: 1935000 },
  { name: 'HIACE THAIF', price_idr: 3440000 },
  { name: 'GMC JED MED', price_idr: 5160000 },
  { name: 'GMC MED ZIARAH', price_idr: 2042500 },
  { name: 'GMC MED MAK', price_idr: 5160000 },
  { name: 'GMC MAK ZIARAH', price_idr: 2257500 },
  { name: 'GMC MAK JED', price_idr: 2472500 },
  { name: 'GMC THAIF', price_idr: 4085000 },
  { name: 'SEDAN JED MED', price_idr: 2150000 },
  { name: 'SEDAN MED ZIARAH', price_idr: 1075000 },
  { name: 'SEDAN MED MAK', price_idr: 2150000 },
  { name: 'SEDAN MAK ZIARAH', price_idr: 1612500 },
  { name: 'SEDAN MAK JED', price_idr: 1397500 },
  { name: 'SEDAN THAIF', price_idr: 2064000 },
  { name: 'HIACE 5X', price_idr: 9245000 },
];

const muthawif = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'UMROH SAJA', price_idr: 1075000 },
  { name: '2 HARI', price_idr: 2150000 },
  { name: '3 HARI', price_idr: 3225000 },
  { name: '4 HARI', price_idr: 4300000 },
  { name: '5 HARI', price_idr: 5375000 },
  { name: '6 HARI', price_idr: 6450000 },
  { name: '7 HARI', price_idr: 7525000 },
  { name: '8 HARI', price_idr: 8600000 },
  { name: '9 HARI', price_idr: 9675000 },
  { name: '10 HARI', price_idr: 10750000 },
  { name: '11 HARI', price_idr: 11825000 },
  { name: '12 HARI', price_idr: 12900000 },
  { name: '13 HARI', price_idr: 13975000 },
  { name: '14 HARI', price_idr: 15050000 },
  { name: '15 HARI', price_idr: 16125000 },
  { name: '16 HARI', price_idr: 17200000 },
];

const handlingSaudi = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'ONLY 4-7', price_idr: 3837600 },
  { name: 'ONLY 8-11', price_idr: 2074800 },
  { name: 'ONLY 12-15', price_idr: 1482000 },
  { name: 'ONLY 16-19', price_idr: 1185600 },
  { name: 'ONLY 20-23', price_idr: 1014000 },
  { name: 'ONLY 24-27', price_idr: 936000 },
  { name: 'ONLY 30', price_idr: 858000 },
  { name: 'FULL 4-7', price_idr: 5928000 },
  { name: 'FULL 8-11', price_idr: 3120000 },
  { name: 'FULL 12-15', price_idr: 2184000 },
  { name: 'FULL 16-19', price_idr: 1716000 },
  { name: 'FULL 20-23', price_idr: 1435200 },
  { name: 'FULL 24-27', price_idr: 1248000 },
  { name: 'FULL 30', price_idr: 1092000 },
  { name: 'BANDARA & DAR', price_idr: 1548000 },
  { name: 'SNACK', price_idr: 129000 },
  { name: 'TIP', price_idr: 1720000 },
  { name: 'TIP & SNACK PRIVATE', price_idr: 1849000 },
];

const handlingDomestik = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'NASI BOX & BAGASI', price_idr: 250000 },
  { name: 'ZUKAVIA & BAGASI', price_idr: 350000 },
  { name: 'BAGASI ONLY', price_idr: 150000 },
];

const siskopatuh = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'SISKOPATUH & ASURANSI', price_idr: 500000 },
];

const equipments = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'AKSESORIS', price_idr: 350000 },
  { name: 'FULL PAKET KOPER', price_idr: 1000000 },
];

const tourPlus = [
  { name: 'TIDAK', price_idr: 0 },
  { name: '1D MESIR', price_idr: 2262000 },
  { name: '2D1N MESIR *3', price_idr: 3276000 },
  { name: '2D1N MESIR *4', price_idr: 3510000 },
  { name: '2D1N MESIR *5', price_idr: 3978000 },
  { name: '3D2N MESIR *3', price_idr: 3588000 },
  { name: '3D2N MESIR *4', price_idr: 3978000 },
  { name: '3D2N MESIR *5', price_idr: 4992000 },
  { name: '4D3N MESIR *3', price_idr: 4056000 },
  { name: '4D3N MESIR *4', price_idr: 4680000 },
  { name: '4D3N MESIR *5', price_idr: 5928000 },
  { name: '5D3N MESIR *3', price_idr: 4680000 },
  { name: '5D3N MESIR *4', price_idr: 5928000 },
  { name: '5D3N MESIR *5', price_idr: 6864000 },
];

const manasik = [
  { name: 'TIDAK', price_idr: 0 },
  { name: 'MANASIK ONLINE', price_idr: 150000 },
  { name: 'MANASIK HOTEL', price_idr: 250000 },
];

const exchangeRates = [
  { name: 'USD', rate_idr: 15000 },
  { name: 'SAR', rate_idr: 4000 },
];

const contact = [
  { name: 'whatsapp', value: '083133344897' },
  { name: 'email', value: 'syafarmedia@gmail.com' },
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
        },
      });

      console.log(`Category '${category.name}' created`);
    } else {
      console.log(`Category '${category.name}' already exists`);
    }
  }
}

async function createPeriods() {
  for (const period of periods) {
    const existingPeriod = await prisma.period.findFirst({
      where: { start_date: period.start_date, end_date: period.end_date },
    });

    if (!existingPeriod) {
      await prisma.period.create({
        data: {
          category: period.cateogry,
          start_date: period.start_date,
          end_date: period.end_date,
        },
      });

      console.log(`Period from ${period.start_date} to ${period.end_date} created`);
    } else {
      console.log(`Period from ${period.start_date} to ${period.end_date} already exists`);
    }
  }
}

async function createVendors() {
  for (const vendor of vendors) {
    const existingVendor = await prisma.vendor.findFirst({
      where: { name: vendor.name },
    });

    if (!existingVendor) {
      await prisma.vendor.create({
        data: {
          name: vendor.name,
        },
      });

      console.log(`Vendor '${vendor.name}' created`);
    } else {
      console.log(`Vendor '${vendor.name}' already exists`);
    }
  }
}

async function seedHotels() {
  for (const vendorGroup of hotels) {
    const vendor = await prisma.vendor.findFirst({
      where: { name: vendorGroup.vendor },
    });

    if (!vendor) {
      console.error(`Vendor ${vendorGroup.vendor} not found. Skipping...`);
      continue;
    }

    for (const hotel of vendorGroup.hotels) {
      const newHotel = await prisma.hotel.create({
        data: {
          vendor_id: vendor.id,
          name: hotel.name,
          city: hotel.city as City,
          order_number: 0,
        },
      });

      const periods = await prisma.period.findMany();

      const periodPrices = periods.map((period) => ({
        hotel_id: newHotel.id,
        period_id: period.id,
        price_double: hotel.prices.double,
        price_triple: hotel.prices.triple,
        price_quad: hotel.prices.quad,
      }));

      await prisma.hotelPeriodPrice.createMany({
        data: periodPrices,
      });
    }
  }
}

async function createAirlines() {
  for (const airline of airlines) {
    const existingAirline = await prisma.airline.findFirst({
      where: { name: airline.name },
    });

    if (!existingAirline) {
      await prisma.airline.create({
        data: {
          name: airline.name,
          price_idr: airline.price,
          order_number: 0,
        },
      });

      console.log(`Airline '${airline.name}' created`);
    } else {
      console.log(`Airline '${airline.name}' already exists`);
    }
  }
}

async function seedVisa() {
  for (const visaItem of visa) {
    const existingVisa = await prisma.visa.findFirst({
      where: { name: visaItem.name },
    });

    if (!existingVisa) {
      await prisma.visa.create({
        data: {
          name: visaItem.name,
          price_idr: visaItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Visa '${visaItem.name}' created`);
    } else {
      console.log(`Visa '${visaItem.name}' already exists`);
    }
  }
}

async function seedTransportations() {
  for (const transportation of transportations) {
    const existingTransportation = await prisma.transportation.findFirst({
      where: { name: transportation.name },
    });

    if (!existingTransportation) {
      await prisma.transportation.create({
        data: {
          name: transportation.name,
          price_idr: transportation.price_idr,
          order_number: 0,
        },
      });

      console.log(`Transportation '${transportation.name}' created`);
    } else {
      console.log(`Transportation '${transportation.name}' already exists`);
    }
  }
}

async function seedMuthawwif() {
  for (const muthawwifItem of muthawif) {
    const existingMuthawwif = await prisma.muthawif.findFirst({
      where: { name: muthawwifItem.name },
    });

    if (!existingMuthawwif) {
      await prisma.muthawif.create({
        data: {
          name: muthawwifItem.name,
          price_idr: muthawwifItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Muthawwif '${muthawwifItem.name}' created`);
    } else {
      console.log(`Muthawwif '${muthawwifItem.name}' already exists`);
    }
  }
}

async function seedHandlingSaudi() {
  for (const handlingItem of handlingSaudi) {
    const existingHandling = await prisma.handlingSaudi.findFirst({
      where: { name: handlingItem.name },
    });

    if (!existingHandling) {
      await prisma.handlingSaudi.create({
        data: {
          name: handlingItem.name,
          price_idr: handlingItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Handling '${handlingItem.name}' created`);
    } else {
      console.log(`Handling '${handlingItem.name}' already exists`);
    }
  }
}

async function seedHandlingDomestik() {
  for (const handlingItem of handlingDomestik) {
    const existingHandling = await prisma.handlingDomestic.findFirst({
      where: { name: handlingItem.name },
    });

    if (!existingHandling) {
      await prisma.handlingDomestic.create({
        data: {
          name: handlingItem.name,
          price_idr: handlingItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Handling '${handlingItem.name}' created`);
    } else {
      console.log(`Handling '${handlingItem.name}' already exists`);
    }
  }
}

async function seedSiskopatuh() {
  for (const siskopatuhItem of siskopatuh) {
    const existingSiskopatuh = await prisma.siskopatuh.findFirst({
      where: { name: siskopatuhItem.name },
    });

    if (!existingSiskopatuh) {
      await prisma.siskopatuh.create({
        data: {
          name: siskopatuhItem.name,
          price_idr: siskopatuhItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Siskopatuh '${siskopatuhItem.name}' created`);
    } else {
      console.log(`Siskopatuh '${siskopatuhItem.name}' already exists`);
    }
  }
}

async function seedEquipments() {
  for (const equipment of equipments) {
    const existingEquipment = await prisma.equipment.findFirst({
      where: { name: equipment.name },
    });

    if (!existingEquipment) {
      await prisma.equipment.create({
        data: {
          name: equipment.name,
          price_idr: equipment.price_idr,
          order_number: 0,
        },
      });

      console.log(`Equipment '${equipment.name}' created`);
    } else {
      console.log(`Equipment '${equipment.name}' already exists`);
    }
  }
}

async function seedTourPlus() {
  for (const tourPlusItem of tourPlus) {
    const existingTourPlus = await prisma.tourPlus.findFirst({
      where: { name: tourPlusItem.name },
    });

    if (!existingTourPlus) {
      await prisma.tourPlus.create({
        data: {
          name: tourPlusItem.name,
          price_idr: tourPlusItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Tour Plus '${tourPlusItem.name}' created`);
    } else {
      console.log(`Tour Plus '${tourPlusItem.name}' already exists`);
    }
  }
}

async function seedManasik() {
  for (const manasikItem of manasik) {
    const existingManasik = await prisma.manasik.findFirst({
      where: { name: manasikItem.name },
    });

    if (!existingManasik) {
      await prisma.manasik.create({
        data: {
          name: manasikItem.name,
          price_idr: manasikItem.price_idr,
          order_number: 0,
        },
      });

      console.log(`Manasik '${manasikItem.name}' created`);
    } else {
      console.log(`Manasik '${manasikItem.name}' already exists`);
    }
  }
}

async function seedExchangeRates() {
  for (const exchangeRate of exchangeRates) {
    const existingExchangeRate = await prisma.exchangeRate.findFirst({
      where: { currency: exchangeRate.name },
    });

    if (!existingExchangeRate) {
      await prisma.exchangeRate.create({
        data: {
          currency: exchangeRate.name,
          rate_idr: exchangeRate.rate_idr,
        },
      });

      console.log(`Exchange Rate '${exchangeRate.name}' created`);
    } else {
      console.log(`Exchange Rate '${exchangeRate.name}' already exists`);
    }
  }
}

async function seedContact() {
  for (const contactItem of contact) {
    const existingContact = await prisma.contact.findFirst({
      where: { name: contactItem.name },
    });

    if (!existingContact) {
      await prisma.contact.create({
        data: {
          name: contactItem.name,
          value: contactItem.value,
        },
      });

      console.log(`Contact '${contactItem.name}' created`);
    } else {
      console.log(`Contact '${contactItem.name}' already exists`);
    }
  }
}

async function main() {
  try {
    console.log('Starting seeding process...');
    await createAdminUser();
    await seedPackageItems();
    await createCategories();
    await createPeriods();
    await createVendors();
    await seedHotels();
    await createAirlines();
    await seedVisa();
    await seedTransportations();
    await seedMuthawwif();
    await seedHandlingSaudi();
    await seedHandlingDomestik();
    await seedSiskopatuh();
    await seedEquipments();
    await seedTourPlus();
    await seedManasik();
    await seedExchangeRates();
    await seedContact();
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
