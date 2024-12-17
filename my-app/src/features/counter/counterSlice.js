import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    id:'',
    editid:'',
  },
  reducers: {
    UserId: (state,action) => {
      state.id = action.payload
    },
    TodoEditId: (state,action) => {
      state.id = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { UserId,TodoEditId } = counterSlice.actions

export default counterSlice.reducer