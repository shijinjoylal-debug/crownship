import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import User from '../src/models/User';
import Product from '../src/models/Product';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');
const usersFile = path.join(dataDir, 'users.json');

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        // Seed Products
        if (fs.existsSync(productsFile)) {
            const productsData = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
            if (productsData.length > 0) {
                // Clear existing products to prevent duplicates or just upsert?
                // Let's usert checks by ID
                for (const p of productsData) {
                    await Product.findOneAndUpdate({ id: p.id }, p, { upsert: true, new: true });
                }
                console.log(`Synced ${productsData.length} products`);
            }
        }

        // Seed Users
        if (fs.existsSync(usersFile)) {
            const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
            if (usersData.length > 0) {
                for (const u of usersData) {
                    // Check if user exists by email
                    const exists = await User.findOne({ email: u.email });
                    if (!exists) {
                        await User.create(u);
                    }
                }
                console.log(`Synced ${usersData.length} users`);
            }
        }

        console.log('Seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
