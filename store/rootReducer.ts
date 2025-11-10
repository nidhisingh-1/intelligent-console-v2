import { combineReducers } from '@reduxjs/toolkit'
import callsReducer from './slices/callsSlice'
import issuesReducer from './slices/issuesSlice'
import dashboardReducer from './slices/dashboardSlice'
import enterpriseReducer from './slices/enterpriseSlice'
import enumsReducer from './slices/enumsSlice'
import filtersReducer from './slices/filtersSlice'

const rootReducer = combineReducers({ 
  calls: callsReducer,
  issues: issuesReducer,
  dashboard: dashboardReducer,
  enterprise: enterpriseReducer,
  enums: enumsReducer,
  filters: filtersReducer,
})

export default rootReducer

