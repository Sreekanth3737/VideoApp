import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import axiosInstance from '../../utils/axiosInstance'

const PlayVideo = () => {
    const location=useLocation()
    const id=location.pathname.split('/')[2];
    console.log(id);
    const[video,setVideo]=useState('')
    const [videoPlayer, setVideoPlayer] = useState("");
    const getVideo=async()=>{
        const{data}=await axiosInstance.get(`/api/video/one-video/${id}`)
        console.log(data);
        setVideo(data)
    }
    const noOfViews=async()=>{
        await axiosInstance.put(`/api/video/views/${id}`)
    }
    useEffect(()=>{
        getVideo()
    },[videoPlayer])
console.log(video?.videoUrl);
    useEffect(()=>{
        noOfViews()
    },[])



  return (
    <div>
        <Player 
            autoPlay
            aspectRatio='25:9'
            height={500}
            ref={(player)=>setVideoPlayer(player)}
            src={video?.videoUrl}
        />
    </div>
  )
}

export default PlayVideo