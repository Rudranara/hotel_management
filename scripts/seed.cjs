'use strict';
require('../dns-preload.cjs');

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Parse .env.local without dotenv
const envPath = path.resolve(__dirname, '../.env.local');
fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eq = trimmed.indexOf('=');
  if (eq === -1) return;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
  if (!process.env[key]) process.env[key] = val;
});

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) { console.error('MONGODB_URI not set in .env.local'); process.exit(1); }

const roomSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    type: String,
    location: String,
    images: [String],
    price: Number,
    capacity: Number,
    amenities: [String],
    availabilityStatus: { type: String, default: 'available' },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

const ROOMS = [
  {
    name: 'Oceanfront Deluxe King',
    slug: 'oceanfront-deluxe-king',
    description: 'Wake up to panoramic ocean views from this beautifully appointed king room. Floor-to-ceiling windows, a private balcony, and premium linens make every stay unforgettable.',
    type: 'Deluxe',
    location: 'Puri, Odisha',
    price: 12500,
    capacity: 2,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    amenities: ['Ocean View', 'Private Balcony', 'Breakfast Included', 'Wi-Fi', 'Air Conditioning'],
  },
  {
    name: 'Garden Pool Villa',
    slug: 'garden-pool-villa',
    description: 'A secluded villa nestled in lush gardens with your own private plunge pool. Perfect for couples seeking peace and indulgence.',
    type: 'Villa',
    location: 'Bhubaneswar, Odisha',
    price: 28000,
    capacity: 3,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.9,
    reviewCount: 87,
    featured: true,
    amenities: ['Private Pool', 'Private Balcony', 'Mini Bar', 'Airport Pickup', 'Breakfast Included'],
  },
  {
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    description: 'The pinnacle of luxury. An expansive suite featuring a private terrace, a jacuzzi, butler service, and breathtaking ocean panoramas.',
    type: 'Suite',
    location: 'Konark, Odisha',
    price: 45000,
    capacity: 4,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 5.0,
    reviewCount: 43,
    featured: true,
    amenities: ['Ocean View', 'Jacuzzi', 'Breakfast Included', 'Mini Bar', 'Butler Service', 'Airport Pickup'],
  },
  {
    name: 'Cozy Forest Cabin',
    slug: 'cozy-forest-cabin',
    description: 'Unplug and reconnect with nature in this charming wooden cabin surrounded by ancient forests. Ideal for a quiet getaway.',
    type: 'Cabin',
    location: 'Chilika, Odisha',
    price: 8500,
    capacity: 2,
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.6,
    reviewCount: 211,
    featured: false,
    amenities: ['Wi-Fi', 'Air Conditioning', 'Workspace', 'Breakfast Included'],
  },
  {
    name: 'Family Beach Retreat',
    slug: 'family-beach-retreat',
    description: 'Spacious and bright, this family suite sits just steps from the beach. Multiple bedrooms, a kitchenette, and a large living area for the whole family.',
    type: 'Family',
    location: 'Gopalpur, Odisha',
    price: 18000,
    capacity: 6,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.7,
    reviewCount: 159,
    featured: false,
    amenities: ['Ocean View', 'Breakfast Included', 'Air Conditioning', 'Kitchenette', 'Wi-Fi'],
  },
  {
    name: 'Heritage Luxury Suite',
    slug: 'heritage-luxury-suite',
    description: 'Steeped in history, this opulent suite blends colonial architecture with modern comforts. Curated antiques and hand-woven textiles adorn every corner.',
    type: 'Suite',
    location: 'Puri, Odisha',
    price: 32000,
    capacity: 3,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.9,
    reviewCount: 76,
    featured: true,
    amenities: ['Private Balcony', 'Mini Bar', 'Airport Pickup', 'Breakfast Included', 'Butler Service'],
  },
  {
    name: 'Lakeside Studio',
    slug: 'lakeside-studio',
    description: 'A compact, stylish studio perched on the edge of a tranquil lake. Modern interiors, a kayak dock, and stunning sunrise views.',
    type: 'Studio',
    location: 'Chilika Lake, Odisha',
    price: 6500,
    capacity: 2,
    images: ['https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'available',
    rating: 4.5,
    reviewCount: 98,
    featured: false,
    amenities: ['Lake View', 'Wi-Fi', 'Air Conditioning', 'Workspace'],
  },
  {
    name: 'Clifftop Infinity Room',
    slug: 'clifftop-infinity-room',
    description: 'Perched dramatically on a sea cliff, this room features an infinity-edge terrace that merges seamlessly with the horizon. Pure drama, unmatched views.',
    type: 'Deluxe',
    location: 'Rishikesh Beach, Odisha',
    price: 22000,
    capacity: 2,
    images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'limited',
    rating: 4.8,
    reviewCount: 63,
    featured: false,
    amenities: ['Ocean View', 'Private Balcony', 'Breakfast Included', 'Mini Bar', 'Wi-Fi'],
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI, { dbName: 'huts4u', bufferCommands: false });
  console.log('Connected.');

  const existing = await Room.countDocuments();
  if (existing > 0) {
    console.log(`Database already has ${existing} room(s). Skipping seed.`);
    console.log('To re-seed, drop the rooms collection first from MongoDB Atlas.');
    await mongoose.disconnect();
    return;
  }

  await Room.insertMany(ROOMS);
  console.log(`Seeded ${ROOMS.length} rooms successfully.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
