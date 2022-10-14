const Video = require("../models/videoModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createNewVideo = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.user.id);
  const video = await Video.create(
     req.body,
    );
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(400);
    throw new Error("Invalid  data");
  }
});

const getOneVedio = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
      res.status(200).json(video);
   
  } catch (error) {
    res.status(40).json(error)
  }
});

const getAllVideo = asyncHandler(async (req, res) => {
  try {
    const video = await Video.find();
    res.status(200).json(video);
  } catch (error) {
    res.status(404).json(error);
  }
});

const updatevideo = asyncHandler(async (req, res) => {
    const {id}=req.params;
  try {
    const video= await Video.findByIdAndUpdate(id,
       {
        $set:req.body
       },{new:true} );
       res.status(200).json(video)
  } catch (error) {
    res.status(400).json(error)
  }
});

const trendingVideos=asyncHandler(async(req,res)=>{
    try {
        const video= await Video.find().sort({views:-1})
        res.status(200).json(video)
    } catch (error) {
        res.status(400).json(error)
    }
})

const howManyViews=asyncHandler(async(req,res)=>{
    const {id}=req.params;
try {
    
    const video=await Video.findByIdAndUpdate(id,{
        $inc:{views:1}
    },{new:true} );
    res.status(200).json(video)
} catch (error) {
    res.status(400).json(error)
}
});





module.exports = { createNewVideo,getOneVedio, getAllVideo, updatevideo,howManyViews ,trendingVideos};
