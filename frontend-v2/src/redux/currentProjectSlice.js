import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    const { token, projectId, typeOfIssue, priorityOfIssue, statusOfIssue, summary, assigneeId } = input;
    return await fetch('http://localhost:5080/api/Issues', {
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
            projectId: projectId,
            assigneeId: assigneeId
        })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
})

export const updateIssue = createAsyncThunk('currentProject/updateIssue', async (input) => {
    const { issueId, typeOfIssue, priorityOfIssue, statusOfIssue, summary, dueDate, assigneeId, reporterId, token, projectId } = input;
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
            'dueDate': dueDate,
            'assigneeId': assigneeId,
            'reporterId': reporterId,
            'projectId': projectId
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

export const addUsersToProject = createAsyncThunk('currentProject/addUsersToProject', async (input) => {
    const { projectId, emailList, token } = input;
    return await fetch(`http://localhost:5080/api/Projects/${projectId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            emailList
        )
    })
})

export const removeUserFromProject = createAsyncThunk('currentProject/removeUserFromProject', async (input) => {
    const { projectId, userIdToRemove, token } = input;
    return await fetch(`http://localhost:5080/api/Projects/${projectId}/remove/${userIdToRemove}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
})

export const updateProject = createAsyncThunk('currentProject/updateProject', async (input) => {
    const { projectId, name, displayPicture, adminId, token } = input;
    return await fetch(`http://localhost:5080/api/Projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'name': name,
            'displayPicture': displayPicture,
            'adminId': adminId
        })
    })
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
        /*  getCurrentProject   */
        [getCurrentProject.pending]: (state) => {
            state.isLoading = true;
        },
        [getCurrentProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.id = action.payload.id;
            state.projectName = action.payload.name;
            state.displayPicture = action.payload.displayPicture;
            state.adminId = action.payload.adminId; // Should be Admin details instead (User ID, name, email)
            state.users = action.payload.users;
            state.issues = action.payload.issues;
        },
        [getCurrentProject.rejected]: (state) => {
            state.isLoading = false;
        },

        /*  createIssue   */
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
        
        /*  updateIssue   */
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

        /*  deleteIssue   */
        [deleteIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [deleteIssue.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /*  addUsersToProject   */
        [addUsersToProject.pending]: (state) => {
            state.isLoading = true;
        },
        [addUsersToProject.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [addUsersToProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /*  removeUserFromProject   */
        [removeUserFromProject.pending]: (state) => {
            state.isLoading = true;
        },
        [removeUserFromProject.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [removeUserFromProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }        
    }
})

export const { emptyCurrentProject } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;