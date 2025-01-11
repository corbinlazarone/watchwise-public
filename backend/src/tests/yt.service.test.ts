import { YoutubeSerivce } from "../services/yt.service";

describe("YoutubeService", () => {
  let youtubeService: YoutubeSerivce;
  const mockToken = "mock-token";

  beforeEach(() => {
    youtubeService = new YoutubeSerivce();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GrabTopChannels", () => {
    it("should return channels with liked videos and subscriptions", async () => {
      // Mock liked videos response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video1",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 1",
                  thumbnails: { medium: { url: "thumbnail1" } },
                  publishedAt: "2023-01-01",
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      // Mock subscriptions response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                snippet: {
                  resourceId: { channelId: "channel1" },
                  thumbnails: { medium: { url: "channelThumb1" } },
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      const result = await youtubeService.GrabTopChannels(mockToken);

      expect(result).toHaveLength(1);
      expect(result[0].channelId).toBe("channel1");
      expect(result[0].likeCount).toBe(1);
      expect(result[0].channelYoutubeLink).toBe("https://www.youtube.com/channel/channel1");
    });

    it("should handle pagination for both liked videos and subscriptions", async () => {
      // Mock first liked videos page
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video1",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 1",
                  thumbnails: { medium: { url: "thumbnail1" } },
                  publishedAt: "2023-01-01",
                },
              },
            ],
            nextPageToken: "token1",
          }),
        })
      );

      // Mock second liked videos page
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video2",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 2",
                  thumbnails: { medium: { url: "thumbnail2" } },
                  publishedAt: "2023-01-02",
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      // Mock first subscriptions page
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                snippet: {
                  resourceId: { channelId: "channel1" },
                  thumbnails: { medium: { url: "channelThumb1" } },
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      const result = await youtubeService.GrabTopChannels(mockToken);

      expect(result).toHaveLength(1);
      expect(result[0].likeCount).toBe(2);
      expect(result[0].likedVideoInfos).toHaveLength(2);
    });

    it("should filter out non-subscribed channels", async () => {
      // Mock liked videos response with multiple channels
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video1",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 1",
                  thumbnails: { medium: { url: "thumbnail1" } },
                  publishedAt: "2023-01-01",
                },
              },
              {
                id: "video2",
                snippet: {
                  channelId: "channel2",
                  channelTitle: "Channel 2",
                  title: "Video 2",
                  thumbnails: { medium: { url: "thumbnail2" } },
                  publishedAt: "2023-01-02",
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      // Mock subscriptions response with only one channel
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                snippet: {
                  resourceId: { channelId: "channel1" },
                  thumbnails: { medium: { url: "channelThumb1" } },
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      const result = await youtubeService.GrabTopChannels(mockToken);

      expect(result).toHaveLength(1);
      expect(result[0].channelId).toBe("channel1");
    });
  });

  describe("GrabLikedChannelVideoInfo", () => {
    it("should return videos for a specific channel", async () => {
      const channelId = "channel1";

      // Mock liked videos response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video1",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 1",
                  thumbnails: { medium: { url: "thumbnail1" } },
                  publishedAt: "2023-01-01",
                },
              },
              {
                id: "video2",
                snippet: {
                  channelId: "channel2",
                  channelTitle: "Channel 2",
                  title: "Video 2",
                  thumbnails: { medium: { url: "thumbnail2" } },
                  publishedAt: "2023-01-02",
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      // Mock subscriptions response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                snippet: {
                  resourceId: { channelId: "channel1" },
                  thumbnails: { medium: { url: "channelThumb1" } },
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      const result = await youtubeService.GrabLikedChannelVideoInfo(mockToken, channelId);

      expect(result).toHaveLength(1);
      expect(result[0].channelId).toBe("channel1");
      expect(result[0].likedVideoInfos).toHaveLength(1);
    });
  });

  describe("GrabAllLikedVideos", () => {
    it("should return all liked videos from subscribed channels sorted by date", async () => {
      // Mock liked videos response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                id: "video1",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 1",
                  thumbnails: { medium: { url: "thumbnail1" } },
                  publishedAt: "2023-01-01",
                },
              },
              {
                id: "video2",
                snippet: {
                  channelId: "channel1",
                  channelTitle: "Channel 1",
                  title: "Video 2",
                  thumbnails: { medium: { url: "thumbnail2" } },
                  publishedAt: "2023-01-02",
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      // Mock subscriptions response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            items: [
              {
                snippet: {
                  resourceId: { channelId: "channel1" },
                  thumbnails: { medium: { url: "channelThumb1" } },
                },
              },
            ],
            nextPageToken: null,
          }),
        })
      );

      const result = await youtubeService.GrabAllLikedVideos(mockToken);

      expect(result).toHaveLength(2);
      expect(result[0].publishedAt).toBe("2023-01-02"); // Most recent first
      expect(result[1].publishedAt).toBe("2023-01-01");
    });
  });

  describe("Error handling", () => {
    it("should handle API errors gracefully", async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error("API Error"))
      );

      await expect(youtubeService.GrabTopChannels(mockToken)).rejects.toThrow("API Error");
    });
  });
});