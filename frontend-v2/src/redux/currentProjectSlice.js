import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const createIssue = createAsyncThunk('currentProject/createIssue', async (input) => {
    const { token, projectId, typeOfIssue, priorityOfIssue, statusOfIssue, summary } = input;
    return await fetch("http://localhost:5080/api/Issues", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            typeOfIssue: typeOfIssue,
            priorityOfIssue: priorityOfIssue,
            statusOfIssue: statusOfIssue,
            summary: summary,
            projectId: projectId
        })
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
        },

        [createIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [createIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createIssue.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
export default currentProjectSlice.reducer;