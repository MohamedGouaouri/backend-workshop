import dotenv from 'dotenv'

dotenv.config();

export const RCE_SERVER = process.env['RCE_SERVER'] || 'http://localhost:5000/run'
export const PORT = process.env.PORT || 3000;