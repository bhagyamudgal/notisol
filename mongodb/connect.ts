import mongoose, { Mongoose } from "mongoose";
import { MONGODB_URI } from "@/lib/env";

declare global {
    var mongo: {
        promise: Promise<Mongoose> | null;
        conn: Mongoose | null;
    };
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: "notisol",
            bufferCommands: false,
            retryWrites: true,
            autoCreate: true,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
