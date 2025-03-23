import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newRequests = state.filter(request => request._id !== action.payload)
            return newRequests
        }
    }
})

export const { addRequests, removeRequest } = requestSlice.actions
export default requestSlice.reducer