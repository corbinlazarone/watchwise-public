"use client";
import { useEffect, useState } from 'react';
import Videos from '../../../../components/Dashboard/Videos/videos-main';
import { useParams } from 'next/navigation';
import { ytService } from '../../../../utils/services/yt.service';

export default function ChannelVideosPage() {
  const params = useParams();
  const [channelData, setChannelData] = useState(null);
  const { GetChannelById } = ytService();

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await GetChannelById(params.channelId);
        setChannelData(response.data["validatedResponse"][0]);
      } catch (error) {
        console.error("Failed to fetch channel data:", error);
      }
    };

    fetchChannelData();
  }, [params.channelId]);

  if (!channelData) return null;

  return (
    <Videos
      title={`Liked Videos from ${channelData.channelName}`}
      initialVideos={channelData.likedVideoInfos}
      channelView={true}
    />
  );
}
