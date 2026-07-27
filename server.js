import app from "./src/app.js";
import pool from "./src/database/connection.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Database Connection Test
        await pool.query("SELECT 1");

        console.log("✅ Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();