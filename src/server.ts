import app from "./app.js";
import { config } from "./config.js";

app.listen(config.port, () => {
    console.log('Server is running on port', config.port); // replace with logger later
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server'); // replace with logger later
});