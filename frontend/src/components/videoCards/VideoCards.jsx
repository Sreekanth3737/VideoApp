import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Player } from "video-react";
import VidioPlayer from "./VidioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../../redux/slices/postSlice";
import Spinner from "../Spinner/Spinner";

const VideoCards = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const post = useSelector((state) => state?.posts);
  const { postLists, loading, appErr, serverErr } = post;
  console.log(postLists);
  const [videoPlayerShow, setVideoPlayerShow] = useState(false);
  const [videoPlayers, setVideoPlayers] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const playVideo = (index) => {
    videoPlayers[index].playbackRate = 3;
    videoPlayers[index].actions.play();
  };
  const reloadVideo = (index) => {
    videoPlayers[index].load();
  };
  const updateNoOfViews = async (id) => {
    try {
      const result = await axiosInstance.put(`/api/video/views/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickVideo = (url, id) => {
    // setVideoPlayers(true);
    console.log('clickll');
    setVideoUrl(url);
    setVideoId(id);
    updateNoOfViews(id);
    navigate(`/play-video/${id}`)
  };
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);

  return (
    <>
      <VidioPlayer
        backdrop="static"
        keyboard
        url={videoUrl}
        id={videoId}
        show={videoPlayerShow}
        onHide={() => setVideoPlayerShow(false)}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="p-10 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {postLists?.map((video,index)=>(

          <div
            
            onClick={() => {
              handleClickVideo(video.videoUrl, video._id);
            }}
            className="rounded overflow-hidden shadow-lg hover:scale-105 duration-300"
          >
            <h2 className="text-center text-indigo-700 p-3">{video.title}</h2>
            
            <video className="w-full" src={video.videoUrl} alt="" />
            <div className="flex ">
            <p className="px-3 bg-zinc-50 text-zinc-700">{video.views +"  views "}</p>
              <p className="px-3 text-zinc-600 bg-zinc-50"> {video.likes + "  likes"}</p>
            </div>
          </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VideoCards;
