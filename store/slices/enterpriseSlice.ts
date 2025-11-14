import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Enterprise {
  id: string
  name: string
}

export interface Team {
  id: string
  name: string
}

interface EnterpriseState {
  selectedEnterprise: Enterprise | null
  selectedTeam: Team | null
}

const initialState: EnterpriseState = {
  selectedEnterprise: null,
  selectedTeam: null,
}

const enterpriseSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {
    setSelectedEnterprise: (state, action: PayloadAction<Enterprise>) => {
      state.selectedEnterprise = action.payload
    },
    
    setSelectedTeam: (state, action: PayloadAction<Team>) => {
      state.selectedTeam = action.payload
    },
    
    clearSelection: () => initialState,
  },
})

export const {
  setSelectedEnterprise,
  setSelectedTeam,
  clearSelection,
} = enterpriseSlice.actions

export default enterpriseSlice.reducer

