const express =require('express')
const router=express.Router()
const authMiddleware=require('../middlewares/authMiddleware')
const {createNewVideo,getOneVedio,getAllVideo,updatevideo,howManyViews,trendingVideos}=require('../controllers/videoController')

//create new video
router.post('/',authMiddleware,createNewVideo)

//update video
router.put('/:id',authMiddleware,updatevideo)

//get one video
router.get('/one-video/:id',getOneVedio)

//get all video
router.get('/get-all-video',getAllVideo)

//no of views
router.put('/views/:id',howManyViews)

//trending videos
router.get('/trending',trendingVideos)


module.exports=router