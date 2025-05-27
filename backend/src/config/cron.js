// cronJob.js
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const job = cron.schedule(
  "*/14 * * * *",
  async () => {
    try {
      const response = await axios.get(process.env.PUBLIC_URL + "/api/ping");
      console.log("Pinged successfully at", new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to ping the server:", err.message);
    }
  },
  {
    scheduled: false,
  }
);

export default job;
