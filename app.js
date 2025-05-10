import express from "express";
import mongoose from "mongoose";
import Property from "./models/property.js";
import Agent from "./models/agents.js";
import { MongoClient } from "mongodb";
import cors from "cors";
import { Schema, model } from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3002;
// const mongoUrl = "mongodb://localhost:27017/Data_property";
const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URI;
const dbName = "Data_property";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
// const Property = mongoose.model(
//   "property",
//   new mongoose.Schema({}, { strict: false })
// );

// เชื่อมต่อ MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//POST route สำหรับเพิ่มข้อมูลอสังหาริมทรัพย์
app.post("/properties", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET route สำหรับดึงข้อมูลอสังหาริมทรัพย์ทั้งหมด
app.get("/properties", async (req, res) => {
  try {
    const { type } = req.query; //รับค่าประเภทจาก query string เช่น ?type=บ้าน
    const filter = type ? { type } : {}; //ถ้ามี type ให้ filter

    const properties = await Property.find(filter); // ค้นหาเฉพาะประเภทที่เลือก
    res.json(properties); // ส่งข้อมูลกลับไป
  } catch (error) {
    console.error("Error fetching properties:", error); // เพิ่มการตรวจสอบ
    res.status(500).json({ message: "Error fetching properties", error });
  }
});

// Route สำหรับดึงข้อมูล Properties
app.get("/properties/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    // ค้นหาด้วยรหัสทรัพย์ที่เป็น string
    //  const property = await Property.findOne({ "รหัสทรัพย์": propertyId });

    //แปลงค่าที่ได้รับจาก Postman ให้เป็นตัวเลข
    // if (!isNaN(propertyId)) {
    //   propertyId = String(propertyId);
    // }

    let property;
    if (mongoose.Types.ObjectId.isValid(propertyId)) {
      // ถ้าเป็น ObjectId ของ MongoDB ให้ค้นหาด้วย _id
      property = await Property.findById(propertyId);
    } else {
      // หากเป็น string ของ รหัสทรัพย์ ให้ค้นหาด้วย รหัสทรัพย์
      property = await Property.findOne({ รหัสทรัพย์: propertyId });
    }

    if (!property) {
      return res
        .status(404)
        .json({ message: "No properties found with this ID" });
    }

    res.json(property); //ส่งข้อมูลกลับไป frontend
  } catch (error) {
    console.error("Error:", error); // เช็ค error ใน console
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/properties", async (req, res) => {
  const { lng, lat } = req.query;
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("property"); //ชื่อ collection

    //ดึงข้อมูลทั้งหดมดที่มี location (พิกัด)
    const properties = await collection
      .find({ location: { $exists: true } })
      .toArray();

    // const properties = await getProperties(lng, lat);
    //ตรวจสอบว่่า properties มีข้อมูลหรือไม่
    if (properties.length > 0) {
      res.json(properties); //ส่งข้อมูลอสังหาริมทรัพย์เป็น JSON
    } else {
      res.status(404).send("No properties found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching properties");
  } finally {
    client.close();
  }
});

const updateLocation = async () => {
  try {
    const properties = await Property.find(); //ดึงข้อมูลทั้งหมดจากฐานข้อมูล

    for (const property of properties) {
      if (property["lat,lng"]) {
        const [lat, lng] = property["lat,lng"].split(",").map(Number); //แยก lat, lng และเเปลงเป็น number

        //สร้างฟิลด์ location ในรูปแบบ GeoJSON
        const location = {
          type: "Point",
          coordinates: [lng, lat], //MongoDB ต้องการ [logitude, latitude]
        };

        //อัปเดตข้อมูล location ในฐานข้อมูล
        property.location = location;
        await property.save(); //บันทึกข้อมูลที่อัปเดตแล้ว
        console.log(`Updated location for property: ${property["รหัสทรัพย์"]}`);
      }
    }
  } catch (error) {
    console.error("Error updating locations:", error);
  }
};

updateLocation();

// GET route สำหรับดึงข้อมูลนายหน้าทั้งหมด
app.get("/agents", async (req, res) => {
  try {
    const agents = await Agent.find(); //ดึงข้อมูลจาก MongoDB
    res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res
      .status(500)
      .json({ message: "Error fetching agents", error: error.message });
  }
});

// GET route สำหรับดึงข้อมูลนายหน้าตาม ID
app.get("/agents/:id", async (req, res) => {
  try {
    const agent = await agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    res.status(500).json({ message: "Error fetching agent", error });
  }
});

// เปิดเซิร์ฟเวอร์ที่พอร์ตที่กำหนด
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
