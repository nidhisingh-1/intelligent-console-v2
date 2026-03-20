import { combineReducers } from '@reduxjs/toolkit'
import enterpriseReducer from './slices/enterpriseSlice'

const rootReducer = combineReducers({ 
  enterprise: enterpriseReducer,
})

export default rootReducer

