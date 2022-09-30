import { model, Schema } from "mongoose";
import { v4 } from "uuid";

const UserSchema = new Schema({
  id: { type: String, required: true, index: true, default: v4 },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

export default UserModel;
