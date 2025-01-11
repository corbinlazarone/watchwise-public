import { Router } from "express";
import { YoutubeSerivce } from "../services/yt.service";
import { YoutubeController } from "../controllers/yt.controller";

const router = Router();
const youtubeService = new YoutubeSerivce();
const youtubeController = new YoutubeController(youtubeService);

router.get("/channels", youtubeController.GrabTopChannels);
router.get("/channels/:channelid/videos", youtubeController.GrabChannelLikedVideos);
router.get("/videos", youtubeController.GrabAllLikedVideos);

export default router;