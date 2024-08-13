import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:"",
  email:"",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setAuthUser: (state, action) => {
        state.name = action.payload.name,
        state.email = action.payload.email
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser } = authSlice.actions

export default authSlice.reducer