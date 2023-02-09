import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createProject = createAsyncThunk('project/createProject', async (input) => {
    const { projectName, token } = input;
    return await fetch("http://localhost:5080/api/Projects", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': projectName
        })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
})

const projectSlice = createSlice({
    name: 'project',
    initialState: {},
    reducers: {},
    extraReducers: {
        [createProject.pending]: (state) => {
            state.isLoading = true;
        },
        [createProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.projectId = action.payload.id;
            state.projectName = action.payload.name;
            state.hasBeenCreated = true;
        },
        [createProject.rejected]: (state) => {
            state.isLoading = false;
            state.hasBeenCreated = false;
        }
    }
})
export default projectSlice.reducer;