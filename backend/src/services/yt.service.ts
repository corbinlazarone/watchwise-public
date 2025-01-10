import { IYtInterface } from "../interfaces/yt.interface";
import { Channel, Video } from "../schemas/yt.schema";

export class YoutubeSerivce implements IYtInterface {
  private readonly subscriptionUrl: string;
  private readonly likedVideosUrl: string;

  constructor() {
    this.likedVideosUrl =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&maxResults=50";
    this.subscriptionUrl =
      "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50";
  }

  async GrabTopChannels(providerToken: string): Promise<Channel[]> {
    const channelInfoMap = new Map<string, Channel>();

    // get liked videos and update channel info
    await this.FetchLikedVideos(providerToken, channelInfoMap);

    // get subscriptions and filter channels
    const subscribedChannelIds = await this.FetchSubscribedChannels(
      providerToken,
      channelInfoMap
    );

    // filter non-subscribed channels and set Youtube links
    for (const [channelId, channelInfo] of channelInfoMap) {
      if (!subscribedChannelIds.has(channelId)) {
        channelInfoMap.delete(channelId);
      } else {
        channelInfo.channelYoutubeLink = `https://www.youtube.com/channel/${channelId}`;
      }
    }

    return Array.from(channelInfoMap.values());
  }

  async GrabLikedChannelVideoInfo(
    providerToken: string,
    channelId?: string
  ): Promise<Channel[]> {
    const channelInfoMap = new Map<string, Channel>();

    // Fetch liked videos
    await this.FetchLikedVideos(providerToken, channelInfoMap, channelId);

    // Fetch and update subscription information
    await this.FetchSubscribedChannels(
      providerToken,
      channelInfoMap,
      channelId
    );

    return Array.from(channelInfoMap.values());
  }

  async GrabAllLikedVideos(providerToken: string): Promise<Video[]> {
    const channelInfoMap = new Map<string, Channel>();

    // First fetch all liked videos
    await this.FetchLikedVideos(providerToken, channelInfoMap);

    // Then fetch subscriptions to filter
    const subscribedChannelIds = await this.FetchSubscribedChannels(
      providerToken,
      channelInfoMap
    );

    // Collect all videos from subscribed channels
    const allLikedVideos: Video[] = [];

    channelInfoMap.forEach((channelInfo, channelId) => {
      if (subscribedChannelIds.has(channelId)) {
        allLikedVideos.push(...channelInfo.likedVideoInfos);
      }
    });

    // Sort videos by publish date (most recent first)
    return allLikedVideos.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  private async FetchLikedVideos(
    providerToken: string,
    channelInfoMap: Map<string, Channel>,
    filterChannelId?: string
  ): Promise<void> {
    let nextPageToken: string | null = null;

    do {
      let url = this.likedVideosUrl;
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${providerToken}`,
        },
      });

      const data = await response.json();
      const likedVideos = data.items;

      for (const video of likedVideos) {
        const videoChannelId = video.snippet.channelId;

        if (!filterChannelId || filterChannelId === videoChannelId) {
          let channelInfo: Channel = channelInfoMap.get(videoChannelId) || {
            channelId: videoChannelId,
            channelName: video.snippet.channelTitle,
            channelThumbnailUrl: "",
            channelYoutubeLink: "",
            likeCount: 0,
            likedVideoInfos: [],
          };

          const videoInfo: Video = {
            videoId: video.id,
            videoTitle: video.snippet.title,
            videoThumbnailUrl: video.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${video.id}`,
            channelId: videoChannelId,
            channelName: video.snippet.channelTitle,
            publishedAt: video.snippet.publishedAt,
          };

          channelInfo.likedVideoInfos.push(videoInfo);
          channelInfo.likeCount++;
          channelInfoMap.set(videoChannelId, channelInfo);
        }
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);
  }

  private async FetchSubscribedChannels(
    providerToken: string,
    channelInfoMap: Map<string, Channel>,
    filterChannelId?: string
  ): Promise<Set<string>> {
    let nextPageToken: string | null = null;
    const subscribedChannelIds = new Set<string>();

    do {
      let url = this.subscriptionUrl;
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${providerToken}`,
        },
      });

      const data = await response.json();
      const subscriptions = data.items;

      for (const subscription of subscriptions) {
        const subscriptionChannelId = subscription.snippet.resourceId.channelId;

        if (!filterChannelId || filterChannelId === subscriptionChannelId) {
          subscribedChannelIds.add(subscriptionChannelId);

          if (channelInfoMap.has(subscriptionChannelId)) {
            const channelInfo = channelInfoMap.get(subscriptionChannelId)!;
            channelInfo.channelThumbnailUrl =
              subscription.snippet.thumbnails.medium.url;
            channelInfo.channelYoutubeLink = `https://www.youtube.com/channel/${subscriptionChannelId}`;
            channelInfoMap.set(subscriptionChannelId, channelInfo);
          }
        }
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return subscribedChannelIds;
  }
}
