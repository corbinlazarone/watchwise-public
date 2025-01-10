import { Express } from "express";
import YoutubeRoutes from "./yt.routes";

export const setupRoutes = (app: Express): void => {
    app.use("/api/yt", YoutubeRoutes);
}