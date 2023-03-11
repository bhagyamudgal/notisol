import { Event } from "@/lib/types";
import { model, models, Schema } from "mongoose";

export type Events = {
    devnet: Event[] | null;
    mainnet: Event[] | null;
};

export type User = {
    _id: string;
    name: string | null;
    wallet: string;
    email: string | null;
    events: Events;
};

const eventsSchema = new Schema<Events>(
    {
        devnet: {
            type: Array,
            of: String,
            default: null,
        },
        mainnet: {
            type: Array,
            of: String,
            default: null,
        },
    },
    { _id: false }
);

const userSchema = new Schema<User>(
    {
        name: { type: String, default: null },
        wallet: { type: String, required: true },
        email: { type: String, default: null },
        events: {
            type: eventsSchema,
            default: { devnet: null, mainnet: null },
        },
    },
    { timestamps: true }
);

const UserModel = models?.User || model("User", userSchema);

export default UserModel;
