import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ชื่ออสังหาริมทรัพย์: {
      type: String,
      required: true,
    },
    รหัสทรัพย์: {
      type: String,
      required: true,
    },
    ประเภท: {
      type: String,
      required: true,
    },
    ราคา: {
      type: String, 
      required: true,
    },
    ขนาดพื้นที่: {
      type: String,
      required: true,
    },
    ห้องนอน: {
      type: String,
      required: true,
    },
    ห้องน้ำ: {
      type: String,
      required: true,
    },
    ความสะดวกโดยรอบ: {
      type: String,
      required: false,
    },
    รายละเอียดอสังหาฯ: {
      type: String,
      required: true,
    },
    เกี่ยวกับ: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: Object, 
      required: true,
    },
    "lat,lng": {
      type: String, 
      required: true,
    },
    Link: {
      type: String,
      required: false,
    },
  },
  { collection: "property" } // ตั้งค่าให้ตรงกับชื่อคอลเลกชันใน MongoDB
);

const Property = mongoose.model("Property", propertySchema);

export default Property;

// import mongoose from "mongoose";

// // กำหนด schema สำหรับ Property
// const propertySchema = new mongoose.Schema(
//   {

//     ชื่ออสังหาริมทรัพย์: {
//       type: String,
//       required: true,
//     },
//     รหัสทรัพย์: {
//       type: String,
//       required: true,
//     },
//     ประเภท: {
//       type: String,
//       required: true,
//     },
//     ราคา: {
//       type: String,
//       required: true,
//     },
//     ความสะดวกโดยรอบ: {
//       type: String,
//       required: true,
//     },
//     รายละเอียดอสังหาฯ: {
//       type: String,
//       required: true,
//     },
//     เกี่ยวกับ: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: Object,
//       required: true,
//     },
//     ขนาดพื้นที่: {
//       type: String,
//       required: true,
//     },
//     ห้องนอน: {
//       type: String,
//       required: true,
//     },
//     ห้องน้ำ: {
//       type: String,
//       required: true,
//     },
//     latlng: {
//       type: [Number, Number], //เก้บพิกัดเป้น String ที่มีค่า lat,lng
//       required: true,
//     },
//   },
//   { collection: "property" }
// );

// // สร้างโมเดล Property
// const Property = mongoose.model("Property", propertySchema);

// export default Property;
