import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const getCurrentProject = createAsyncThunk('currentProject/getCurrentProject', async (input) => {
    const { projectId, token } = input;
    return await fetch(`http://localhost:5080/api/Issues/${projectId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
})

const currentProjectSlice = createSlice({
    name: 'currentProject',
    initialState: {},
    reducers: {},
    extraReducers: {
        [getCurrentProject.pending]: (state) => {
            state.isLoading = true;
        },
        [getCurrentProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.issues = action.payload;
        },
        [getCurrentProject.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})
export default currentProjectSlice.reducer;