"use client";
import { useState, useEffect } from "react";
import Header from "../header";
import { motion } from "framer-motion";
import { useUser } from "../../../utils/user-context";
import Loading from "../../loading";

interface Channel {
  id: number;
  channelId: string;
  channelName: string;
  channelThumbnailUrl: string;
  channelYoutubeLink: string;
  likeCount: number;
  likedVideos: string[];
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
  const [sortOrder, setSortOrder] = useState<"highToLow" | "lowToHigh">(
    "highToLow"
  );
  const [sortedChannels, setSortedChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: userLoading } = useUser();

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

  // Mock channel data
  const mockChannels: Channel[] = [
    {
      id: 1,
      channelId: "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
      channelName: "PewDiePie",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZTHFGiI6NJzttv6x3T99mH7fOF4mX5gE1B6YqbxFA=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@PewDiePie",
      likeCount: 1500,
      likedVideos: Array(150).fill("video"),
    },
    {
      id: 2,
      channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
      channelName: "MrBeast",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZRdMBVPmqZ5KF5klPNGKW_reZQ6RSyXB5qDdidyeg=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@MrBeast",
      likeCount: 2000,
      likedVideos: Array(200).fill("video"),
    },
    {
      id: 3,
      channelId: "UC7_YxT-KID8kRbqZo7MyscQ",
      channelName: "Markiplier",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZTLtqQoL-YR-REjT9mZeqLPMBvaBB5LGtWCoxOi=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@markiplier",
      likeCount: 1200,
      likedVideos: Array(120).fill("video"),
    },
    {
      id: 4,
      channelId: "UCY1kMZp36IQSyNx_9h4mpCg",
      channelName: "Mark Rober",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZRCpJgqsPR5K8ZNK1S_v1ZHviYcrH_TqIE9nG4SOw=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@MarkRober",
      likeCount: 800,
      likedVideos: Array(80).fill("video"),
    },
    {
      id: 5,
      channelId: "UCBJycsmduvYEL83R_U4JriQ",
      channelName: "MKBHD",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZQjBpLgFBXC7YjEUDmtA6MoNvxd_sT36pYnjNsD=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@MKBHD",
      likeCount: 1000,
      likedVideos: Array(100).fill("video"),
    },
    {
      id: 6,
      channelId: "UCXuqSBlHAE6Xw-yeJA0Tunw",
      channelName: "Linus Tech Tips",
      channelThumbnailUrl:
        "https://yt3.googleusercontent.com/ytc/AIf8zZS_PrACqLHDrpK1K6z5R6KuJi2YHGpcFucHW9wY=s176-c-k-c0x00ffffff-no-rj",
      channelYoutubeLink: "https://www.youtube.com/@LinusTechTips",
      likeCount: 900,
      likedVideos: Array(90).fill("video"),
    },
  ];

  useEffect(() => {
    // Only start loading channels after user data is loaded
    if (!userLoading) {
      setIsLoading(true);

      const sorted = [...mockChannels].sort((a, b) => {
        if (sortOrder === "highToLow") {
          return b.likeCount - a.likeCount;
        } else {
          return a.likeCount - b.likeCount;
        }
      });

      setTimeout(() => {
        setSortedChannels(sorted);
        setIsLoading(false);
      }, 1000);
    }
  }, [sortOrder, userLoading]);

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
                  key={channel.id}
                  variants={item}
                  className="bg-white rounded-lg p-5 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src={channel.channelThumbnailUrl}
                      alt={channel.channelName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5">
                    {channel.channelName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {channel.likedVideos.length} liked videos
                  </p>
                  <div className="flex justify-between w-full mt-4">
                    <a
                      href={channel.channelYoutubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 mx-1 px-3 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-[#ff5c00] hover:text-white transition-colors"
                    >
                      Visit Channel
                    </a>
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
