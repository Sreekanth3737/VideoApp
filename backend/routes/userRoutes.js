const express=require('express')
const {userRegisterCtrl,loginUserCtrl}=require('../controllers/userController')
const router=express.Router()

router.post('/register',userRegisterCtrl)
router.post('/login',loginUserCtrl)



module.exports=router