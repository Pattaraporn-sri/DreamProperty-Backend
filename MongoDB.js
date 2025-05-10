const { MongoClient } = require('mongodb');

// เชื่อมต่อกับ MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'real_estate';

async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('property');

    // ค้นหาข้อมูล
    const result = await collection.find({ 'รหัสทรัพย์': '11708372' }).toArray();
    console.log(result);

    await client.close();
}

connectDB();
