import { model, Schema } from "mongoose";


export const log = Schema({
  userId: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  timestamps: {
    type: Number
  }
},{timestamps: true});

export const Log = model("Log", log);