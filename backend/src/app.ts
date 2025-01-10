import express, { Express } from "express";
import { config } from "./config";
import setupMiddleware from "./middleware";
import { setupRoutes } from "./routes";

class App {
    public app: Express;

    constructor() {
        this.app = express();
        setupMiddleware(this.app);
        setupRoutes(this.app);
    }

    public start(): void {
        const port = config.port;

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }
}

export default App;