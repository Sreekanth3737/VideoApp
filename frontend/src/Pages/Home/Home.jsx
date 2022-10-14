import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import VideoCards from '../../components/videoCards/VideoCards'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  

  return (
    <div>
      

          <VideoCards /> 
       
    </div>
  )
}

export default Home