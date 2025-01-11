"use client";
import { useState, useEffect } from "react";
import Header from "../header";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUser } from "../../../utils/user-context";
import Loading from "../../loading";
import { ytService } from "../../../utils/services/yt.service";

interface Video {
  videoId: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  videoLink: string;
  channelId: string;
  channelName: string;
  publishedAt: string;
}

interface VideosProps {
  title?: string;
  initialVideos?: Video[];
  channelView?: boolean;
}

const VideoSkeleton = () => (
  <div className="bg-white rounded-lg p-5 shadow-md flex flex-col animate-pulse">
    <div className="aspect-video w-full mb-4 rounded-lg bg-gray-200"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="w-full h-10 bg-gray-200 rounded-full mt-auto"></div>
  </div>
);

export default function Videos({
  title = "Your Liked Videos",
  initialVideos,
  channelView = false,
}: VideosProps) {
  const [sortOrder, setSortOrder] = useState<"mostRecent" | "oldest">(
    "mostRecent"
  );
  const [sortedVideos, setSortedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: userLoading } = useUser();
  const { GrabLikedVideos } = ytService();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchVideos = async () => {
      if (!userLoading) {
        setIsLoading(true);
        try {
          let videos;
          if (initialVideos) {
            // If videos are passed as props (channel view), use those
            videos = initialVideos;
          } else {
            // Otherwise fetch all liked videos
            const response = await GrabLikedVideos();
            videos = response.data?.validatedResponse;
          }

          const sorted = [...videos].sort((a, b) => {
            if (sortOrder === "mostRecent") {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            }
            return (
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime()
            );
          });

          setSortedVideos(sorted);
        } catch (error) {
          console.error("Failed to fetch videos:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchVideos();
  }, [sortOrder, userLoading, initialVideos]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="max-w-[1200px] mx-auto p-5">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-5 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text"
          >
            {title}
          </motion.h1>

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

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <VideoSkeleton key={index} />
              ))}
            </div>
          ) : sortedVideos.length === 0 ? (
            // No videos message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                No Videos Found
              </h2>
              <p className="text-gray-500">
                We couldn't find any liked videos. Try liking some YouTube
                videos and check back here!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {sortedVideos.map((video) => (
                <motion.div
                  key={video.videoId}
                  variants={item}
                  className="bg-white rounded-lg p-5 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                >
                  <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={video.videoThumbnailUrl}
                      alt={video.videoTitle}
                      height={240}
                      width={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {video.videoTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {video.channelName}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Posted on:{" "}
                    {new Date(video.publishedAt).toLocaleDateString()}
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
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      s
    </>
  );
}
