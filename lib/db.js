import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function dbConnect(){

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST, 
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log('Connected to database');
        return connection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}
