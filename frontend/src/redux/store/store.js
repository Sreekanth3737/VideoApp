import  {configureStore} from '@reduxjs/toolkit'
import postSlice from '../slices/postSlice'

import userReducer from '../slices/userSlice'

const store=configureStore({
    reducer:{
        users:userReducer,
       posts:postSlice,
       
    }
})
export default store