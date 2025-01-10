"use client";
import { useState, useEffect } from 'react';
import Header from '../header';

interface Video {
  id: string;
  videoId: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  videoLink: string;
  channelId: string;
  channelName: string;
  publishedAt: string;
}

export default function Videos() {
  const [sortOrder, setSortOrder] = useState<"mostRecent" | "oldest">("mostRecent");
  const [sortedVideos, setSortedVideos] = useState<Video[]>([]);

  // Mock video data
  const mockVideos: Video[] = [
    {
      id: "1",
      videoId: "video1",
      videoTitle: "I Spent 24 Hours Straight In VR Minecraft",
      videoThumbnailUrl: "https://i.ytimg.com/vi/sample1/maxresdefault.jpg",
      videoLink: "https://youtube.com/watch?v=sample1",
      channelId: "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
      channelName: "PewDiePie",
      publishedAt: "2024-02-10T15:00:00Z"
    },
    // Add more mock videos as needed
  ];

  // Sort videos based on sortOrder
  useEffect(() => {
    const sorted = [...mockVideos].sort((a, b) => {
      if (sortOrder === "mostRecent") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      }
    });
    setSortedVideos(sorted);
  }, [sortOrder]);

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="max-w-[1200px] mx-auto p-5">
          <h1 className="text-4xl font-bold text-center mb-5 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text">
            Your Liked Videos
          </h1>

          <div className="flex flex-wrap justify-center gap-2.5 mb-5">
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                sortOrder === "mostRecent"
                  ? "bg-[#ff5c00] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSortOrder("mostRecent")}
            >
              Most Recent
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                sortOrder === "oldest"
                  ? "bg-[#ff5c00] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSortOrder("oldest")}
            >
              Oldest
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg p-5 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                  <img
                    src={video.videoThumbnailUrl}
                    alt={video.videoTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {video.videoTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{video.channelName}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Posted on: {new Date(video.publishedAt).toLocaleDateString()}
                </p>
                <div className="mt-auto">
                  <a
                    href={video.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-3 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-[#ff5c00] hover:text-white transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}