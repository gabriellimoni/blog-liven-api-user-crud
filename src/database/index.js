import mongoose from "mongoose";
import { mongoUri } from "../env";

export const connect = () => {
  return mongoose.connect(mongoUri);
};

export const disconnect = () => {
  return mongoose.disconnect();
};
