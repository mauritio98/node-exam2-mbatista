import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

console.log(`Your port is ${port}`);
app.listen(port,()=>console.log(`Server is running on http://${host}:${port}`));

