import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allTasks:[]
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    setTasks: (state, action) => {
        state.allTasks = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTasks } = taskSlice.actions

export default taskSlice.reducer