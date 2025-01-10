import { Channel, Video } from "../schemas/yt.schema";

export interface IYtInterface {
    GrabTopChannels(providerToken: string): Promise<Channel[]>;
    GrabLikedChannelVideoInfo(providerToken: string, channelId: string): Promise<Channel[]>;
    GrabAllLikedVideos(providerToken: string): Promise<Video[]>;
}