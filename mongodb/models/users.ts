import { Event } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export type User = {
    _id: string;
    name: string | null;
    wallet: string;
    email: string | null;
    events: Event[] | null;
};

const userSchema = new Schema<User>(
    {
        name: { type: String, default: null },
        wallet: { type: String, required: true },
        email: { type: String, default: null },
        events: { type: Array, of: String, default: null },
    },
    { timestamps: true }
);

const UserModel = models?.User || model("User", userSchema);

export default UserModel;
