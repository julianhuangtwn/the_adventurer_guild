import mysql from 'mysql2/promise';
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const caCert = fs.readFileSync('./src/app/certificates/ca.pem')

export async function queryDB(query: string, data: any = null) {
    try{
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                ca: caCert 
            }
        });
        
        const [result] = await db.execute(query, data);
        await db.end();

        return result;
    } catch(err){
        console.error(err);
        return null;
    }
}   
