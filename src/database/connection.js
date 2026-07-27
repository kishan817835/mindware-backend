import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // to access .env variables

const pool = mysql.createPool({
    host: process.env.DB_HOST,  // hostname of database
    port: process.env.DB_PORT, // port of your database
    user: process.env.DB_USER,  //user of database
    password: process.env.DB_PASSWORD, //database password
    database: process.env.DB_NAME, // database name
    waitForConnections: true, // means don't through error while connection are full
    connectionLimit: 40,// maximum connection at a particular time depends on the platform where you have deployed your db
    queueLimit: 0 // other request through to queue donot thorugh error infinite queues
});

export default pool;