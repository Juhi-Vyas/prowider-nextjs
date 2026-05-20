import mongoose from "mongoose"

const MONGO_URL =
    process.env.MONGO_URL

if (!MONGO_URL) {

    throw new Error(
        "Please add MONGO_URL in .env.local"
    )

}

// GLOBAL CACHE

let cached =
    global.mongoose

if (!cached) {

    cached = global.mongoose = {

        conn: null,

        promise: null

    }

}

export const connectDB =
async () => {

    // IF ALREADY CONNECTED

    if (cached.conn) {

        return cached.conn

    }

    // IF NO EXISTING PROMISE

    if (!cached.promise) {

        const options = {

            bufferCommands: false

        }

        cached.promise =
            mongoose.connect(
                MONGO_URL,
                options
            )
            .then((mongoose) => {

                console.log(
                    "MongoDB Connected"
                )

                return mongoose

            })

    }

    try {

        cached.conn =
            await cached.promise

    } catch (error) {

        cached.promise = null

        console.log(error)

        throw error

    }

    return cached.conn

}