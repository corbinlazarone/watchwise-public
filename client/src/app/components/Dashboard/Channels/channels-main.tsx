"use client";
import { useState, useEffect } from "react";
import Header from "../header";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUser } from "../../../utils/user-context";
import Loading from "../../loading";
import { ytService } from "../../../utils/services/yt.service";
import { useRouter } from "next/navigation";

interface Channel {
  channelId: string;
  channelName: string;
  channelThumbnailUrl: string;
  channelYoutubeLink: string;
  likeCount: number;
  likedVideoInfos: {
    videoId: string;
    videoTitle: string;
    videoThumbnailUrl: string;
    videoLink: string;
    channelId: string;
    channelName: string;
    publishedAt: string;
  }[];
}

const ChannelSkeleton = () => (
  <div className="bg-white rounded-lg p-5 shadow-md flex flex-col items-center text-center relative animate-pulse">
    <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2.5"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="w-full h-10 bg-gray-200 rounded-full mt-4"></div>
  </div>
);

export default function Channels() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<"highToLow" | "lowToHigh">(
    "highToLow"
  );
  const [sortedChannels, setSortedChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: userLoading } = useUser();
  const { GrabTopChannels } = ytService();

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
    const fetchChannels = async () => {
      if (!userLoading) {
        setIsLoading(true);
        try {
          const response = await GrabTopChannels();

          console.log(response.data);

          if (!response.error && response.data) {
            // Access the validatedResponse from the API response
            const channels = response.data.validatedResponse;

            // Make sure channels is an array before sorting
            if (Array.isArray(channels)) {
              const sorted = [...channels].sort((a, b) => {
                if (sortOrder === "highToLow") {
                  return b.likeCount - a.likeCount;
                }
                return a.likeCount - b.likeCount;
              });
              setSortedChannels(sorted);
            } else {
              console.error("Received invalid channel data:", channels);
            }
          } else {
            console.error("Error fetching channels:", response);
          }
        } catch (error) {
          console.error("Failed to fetch channels:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChannels();
  }, [sortOrder, userLoading]);

  if (userLoading) {
    return <Loading />;
  }

  const handleViewLikedVideos = (channel: Channel) => {
    router.push(`/pages/channels/${channel.channelId}/videos`);
  };

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
            Your Subscribed Channels
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-2.5 mb-5">
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                sortOrder === "highToLow"
                  ? "bg-[#ff5c00] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSortOrder("highToLow")}
            >
              High to Low
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                sortOrder === "lowToHigh"
                  ? "bg-[#ff5c00] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSortOrder("lowToHigh")}
            >
              Low to High
            </button>
          </div>

          {isLoading ? (
            // Skeleton loading grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(6)].map((_, index) => (
                <ChannelSkeleton key={index} />
              ))}
            </div>
          ) : (
            // Actual content with animation
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {sortedChannels.map((channel) => (
                <motion.div
                  key={channel.channelId}
                  variants={item}
                  className="bg-white rounded-lg p-5 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={channel.channelThumbnailUrl}
                      alt={channel.channelName}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5">
                    {channel.channelName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {channel.likeCount} liked videos
                  </p>
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <a
                      href={channel.channelYoutubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-[#ff5c00] hover:text-white transition-colors"
                    >
                      Visit Channel
                    </a>
                    <button
                      onClick={() => handleViewLikedVideos(channel)}
                      className="flex-1 px-3 py-2 bg-[#ff5c00] text-white rounded-full text-sm font-semibold hover:bg-[#ff7c30] transition-colors"
                    >
                      View Liked Videos
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
