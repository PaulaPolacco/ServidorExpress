import * as dotenv from 'dotenv'


const envi = dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    port: envi.parsed.PORT
}