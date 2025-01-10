import { Router } from "express";
import { YoutubeSerivce } from "../services/yt.service";
import { YoutubeController } from "../controllers/yt.controller";

const router = Router();
const youtubeService = new YoutubeSerivce();
const youtubeController = new YoutubeController(youtubeService);

router.get("/channels", youtubeController.GrabTopChannels);

export default router;