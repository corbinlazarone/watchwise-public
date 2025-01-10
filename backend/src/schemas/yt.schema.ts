import { z } from "zod";

export const VideoSchema = z.array(z.object({
  videoId: z.string(),
  videoTitle: z.string(),
  videoThumbnailUrl: z.string(),
  videoLink: z.string(),
  channelId: z.string(),
  channelName: z.string(),
  publishedAt: z.string()
}));

export const ChannelSchema = z.array(z.object({
  channelId: z.string(),
  channelName: z.string(),
  channelThumbnailUrl: z.string(),
  channelYoutubeLink: z.string(),
  likeCount: z.number(),
  likedVideoInfos: VideoSchema
}));

export type Video = z.infer<typeof VideoSchema>[number];
export type Channel = z.infer<typeof ChannelSchema>[number];
