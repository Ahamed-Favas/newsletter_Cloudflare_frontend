import { model, Schema, models } from "mongoose";

const usersSchema = new Schema(
    {
        email: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const users = models.users || model("users", usersSchema);
export default users;
