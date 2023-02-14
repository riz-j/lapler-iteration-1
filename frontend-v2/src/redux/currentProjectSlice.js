import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentProject = createAsyncThunk('currentProject/getCurrentProject', async (input) => {
    const { projectId, token } = input;
    return await fetch(`http://localhost:5080/api/Projects/${projectId}`, {
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

export const updateIssue = createAsyncThunk('currentProject/updateIssue', async (input) => {
    const { issueId, typeOfIssue, priorityOfIssue, statusOfIssue, summary, projectId, reporterId, token } = input;
    return await fetch(`http://localhost:5080/api/Issues/${issueId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'typeOfIssue': typeOfIssue,
            'priorityOfIssue': priorityOfIssue,
            'statusOfIssue': statusOfIssue,
            'summary': summary,
            'projectId': projectId,
            'reporterId': reporterId
        })
    })
})

export const deleteIssue = createAsyncThunk('currentProject/deleteIssue', async (input) => {
    const { projectId, issueId, token } = input;
    return await fetch(`http://localhost:5080/api/Issues/project/${projectId}/issue/${issueId}`, {
        method: 'DELETE',
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
    reducers: {
        emptyCurrentProject: (state) => {
            return {};
        }
    },
    extraReducers: {
        [getCurrentProject.pending]: (state) => {
            state.isLoading = true;
        },
        [getCurrentProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.projectName = action.payload.name;
            state.adminName = action.payload.adminName; // Should be Admin details instead (User ID, name, email)
            state.users = action.payload.users;
            state.issues = action.payload.issues;
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
        },
        
        [updateIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [updateIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateIssue.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [deleteIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [deleteIssue.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
export const { emptyCurrentProject } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;