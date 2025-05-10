import { request } from "express";
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    line: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { collection: "agents" } //กำหนดให้ใช้ collection "agents"
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
